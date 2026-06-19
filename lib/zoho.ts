// Zoho CRM lead push. Every form on the site → /api/lead → here. Creates a Lead
// record and tags it so each funnel (audit, AI-readiness, ROI calculator, etc.)
// is filterable in Zoho. Reads creds from env; if any are missing it cleanly
// no-ops (skipped) so the site keeps working before Zoho is connected.
//
// Setup: create a Self Client in the Zoho API console (scope
// ZohoCRM.modules.ALL), mint a refresh token, and set ZOHO_CLIENT_ID,
// ZOHO_CLIENT_SECRET, ZOHO_REFRESH_TOKEN. ZOHO_ACCOUNTS_DOMAIN / ZOHO_API_DOMAIN
// default to the .com data center.

import type { LeadPayload } from './validation';

const SPOKE_LABELS: Record<string, string> = {
  marketing: 'Marketing',
  tech: 'Tech',
  finance: 'Finance',
  automation: 'Automation',
  unsure: 'Unsure',
};

type ZohoConfig = {
  clientId: string;
  clientSecret: string;
  refreshToken: string;
  accountsDomain: string;
  apiDomain: string;
};

function getConfig(): ZohoConfig | null {
  const clientId = process.env.ZOHO_CLIENT_ID;
  const clientSecret = process.env.ZOHO_CLIENT_SECRET;
  const refreshToken = process.env.ZOHO_REFRESH_TOKEN;
  if (!clientId || !clientSecret || !refreshToken) return null;
  return {
    clientId,
    clientSecret,
    refreshToken,
    accountsDomain: process.env.ZOHO_ACCOUNTS_DOMAIN || 'https://accounts.zoho.com',
    apiDomain: process.env.ZOHO_API_DOMAIN || 'https://www.zohoapis.com',
  };
}

// Access tokens live ~1h. Cache in module scope so warm serverless instances
// reuse them instead of refreshing on every lead.
let cachedToken: { token: string; expiresAt: number } | null = null;

async function getAccessToken(config: ZohoConfig): Promise<string | null> {
  if (cachedToken && cachedToken.expiresAt > Date.now() + 60_000) {
    return cachedToken.token;
  }

  const params = new URLSearchParams({
    refresh_token: config.refreshToken,
    client_id: config.clientId,
    client_secret: config.clientSecret,
    grant_type: 'refresh_token',
  });

  const res = await fetch(`${config.accountsDomain}/oauth/v2/token?${params.toString()}`, {
    method: 'POST',
    cache: 'no-store',
  });
  const data = await res.json().catch(() => ({}));
  if (!res.ok || !data.access_token) return null;

  const expiresInSec = typeof data.expires_in === 'number' ? data.expires_in : 3600;
  cachedToken = { token: data.access_token, expiresAt: Date.now() + expiresInSec * 1000 };
  return data.access_token;
}

function buildLeadRecord(lead: LeadPayload, tag: string | undefined) {
  const [firstName, ...rest] = lead.contact.name.trim().split(/\s+/);
  const lastName = rest.join(' ') || firstName || 'Lead';
  const spoke = SPOKE_LABELS[lead.service] || lead.service;

  const descriptionLines = [
    `Source page: ${lead.source_page}`,
    `Spoke: ${spoke}`,
    `Intent: ${lead.intent}`,
    lead.contact.company_url ? `Website: ${lead.contact.company_url}` : '',
    lead.contact.message ? `Message: ${lead.contact.message}` : '',
    lead.utm?.source
      ? `UTM: ${[lead.utm.source, lead.utm.medium, lead.utm.campaign, lead.utm.term, lead.utm.content].filter(Boolean).join(' / ')}`
      : '',
  ].filter(Boolean);

  const record: Record<string, unknown> = {
    Last_Name: lastName,
    First_Name: rest.length ? firstName : undefined,
    Email: lead.contact.email,
    Company: lead.contact.company || lead.contact.company_url || 'Unknown',
    Phone: lead.contact.phone || undefined,
    Website: lead.contact.company_url || undefined,
    Lead_Source: `Website · ${spoke}`,
    Description: descriptionLines.join('\n'),
  };

  // Tags can be attached inline on create via the `Tag` array.
  if (tag) {
    record.Tag = [{ name: tag }];
  }

  // Strip undefineds so Zoho doesn't reject the payload.
  Object.keys(record).forEach((k) => record[k] === undefined && delete record[k]);
  return record;
}

export async function pushLeadToZoho(
  lead: LeadPayload,
  options?: { tag?: string },
): Promise<{ ok: boolean; skipped: boolean; status: number; error?: string; id?: string }> {
  const config = getConfig();
  if (!config) {
    return { ok: false, skipped: true, status: 503, error: 'Zoho not configured.' };
  }

  const token = await getAccessToken(config);
  if (!token) {
    return { ok: false, skipped: false, status: 401, error: 'Zoho token refresh failed.' };
  }

  const res = await fetch(`${config.apiDomain}/crm/v2/Leads`, {
    method: 'POST',
    headers: {
      Authorization: `Zoho-oauthtoken ${token}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      data: [buildLeadRecord(lead, options?.tag)],
      trigger: ['workflow'],
    }),
    cache: 'no-store',
  });

  const data = await res.json().catch(() => ({}));
  const detail = Array.isArray(data?.data) ? data.data[0] : undefined;

  if (!res.ok || detail?.code !== 'SUCCESS') {
    return {
      ok: false,
      skipped: false,
      status: res.status,
      error: detail?.message || data?.message || 'Zoho lead create failed.',
    };
  }

  return { ok: true, skipped: false, status: res.status, id: detail?.details?.id };
}
