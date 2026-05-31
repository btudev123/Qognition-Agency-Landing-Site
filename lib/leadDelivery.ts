import type { NextRequest } from 'next/server';
import type { LeadPayload } from './validation';

const SPOKE_LABELS: Record<string, string> = {
  marketing: 'Marketing',
  tech: 'Tech',
  finance: 'Finance',
  automation: 'Automation',
  unsure: 'Unsure',
};

const INTENT_LABELS: Record<string, string> = {
  audit: 'Free Audit Request',
  consultation: 'Strategy Call',
  pricing: 'Pricing Inquiry',
  contact: 'General Contact',
  newsletter: 'Newsletter Signup',
};

function escapeHtml(value: string) {
  return value
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;');
}

function leadNotificationHtml(lead: LeadPayload): string {
  const spoke = SPOKE_LABELS[lead.service] || lead.service;
  const intent = INTENT_LABELS[lead.intent] || lead.intent;

  return `
<div style="font-family:-apple-system,BlinkMacSystemFont,sans-serif;max-width:600px;margin:0 auto;background:#ffffff;border-radius:12px;overflow:hidden;border:1px solid #e5e7eb">
  <div style="background:#7C3AED;padding:24px 32px">
    <span style="color:#fff;font-size:20px;font-weight:700">Qognition</span>
    <span style="color:rgba(255,255,255,0.7);font-size:14px;margin-left:8px">New Lead</span>
  </div>
  <div style="padding:32px">
    <table style="width:100%;border-collapse:collapse;margin-bottom:24px">
      <tr>
        <td style="padding:8px 12px;color:#6b7280;font-size:13px;font-weight:600;text-transform:uppercase;letter-spacing:0.5px">Name</td>
        <td style="padding:8px 12px;font-size:15px">${escapeHtml(lead.contact.name)}</td>
      </tr>
      <tr>
        <td style="padding:8px 12px;color:#6b7280;font-size:13px;font-weight:600;text-transform:uppercase;letter-spacing:0.5px">Email</td>
        <td style="padding:8px 12px;font-size:15px"><a href="mailto:${escapeHtml(lead.contact.email)}" style="color:#7C3AED">${escapeHtml(lead.contact.email)}</a></td>
      </tr>
      ${lead.contact.company ? `<tr><td style="padding:8px 12px;color:#6b7280;font-size:13px;font-weight:600;text-transform:uppercase;letter-spacing:0.5px">Company</td><td style="padding:8px 12px;font-size:15px">${escapeHtml(lead.contact.company)}</td></tr>` : ''}
      ${lead.contact.company_url ? `<tr><td style="padding:8px 12px;color:#6b7280;font-size:13px;font-weight:600;text-transform:uppercase;letter-spacing:0.5px">Website</td><td style="padding:8px 12px;font-size:15px"><a href="${escapeHtml(lead.contact.company_url)}" style="color:#7C3AED">${escapeHtml(lead.contact.company_url)}</a></td></tr>` : ''}
      ${lead.contact.phone ? `<tr><td style="padding:8px 12px;color:#6b7280;font-size:13px;font-weight:600;text-transform:uppercase;letter-spacing:0.5px">Phone</td><td style="padding:8px 12px;font-size:15px">${escapeHtml(lead.contact.phone)}</td></tr>` : ''}
      <tr>
        <td style="padding:8px 12px;color:#6b7280;font-size:13px;font-weight:600;text-transform:uppercase;letter-spacing:0.5px">Spoke</td>
        <td style="padding:8px 12px;font-size:15px">${spoke}</td>
      </tr>
      <tr>
        <td style="padding:8px 12px;color:#6b7280;font-size:13px;font-weight:600;text-transform:uppercase;letter-spacing:0.5px">Intent</td>
        <td style="padding:8px 12px;font-size:15px">${intent}</td>
      </tr>
      <tr>
        <td style="padding:8px 12px;color:#6b7280;font-size:13px;font-weight:600;text-transform:uppercase;letter-spacing:0.5px">Source</td>
        <td style="padding:8px 12px;font-size:15px">${escapeHtml(lead.source_page)}</td>
      </tr>
    </table>
    ${lead.contact.message ? `<div style="background:#f9fafb;padding:16px;border-radius:8px;margin-bottom:24px"><p style="color:#6b7280;font-size:12px;font-weight:600;text-transform:uppercase;letter-spacing:0.5px;margin:0 0 8px">Message</p><p style="margin:0;font-size:14px;line-height:1.6">${escapeHtml(lead.contact.message)}</p></div>` : ''}
    ${lead.utm?.source ? `<div style="font-size:12px;color:#9ca3af;margin-bottom:16px">UTM: ${escapeHtml([lead.utm.source, lead.utm.medium, lead.utm.campaign, lead.utm.term, lead.utm.content].filter(Boolean).join(' / '))}</div>` : ''}
    <a href="mailto:${escapeHtml(lead.contact.email)}" style="display:inline-block;background:#7C3AED;color:#fff;padding:12px 24px;border-radius:8px;text-decoration:none;font-weight:600;font-size:14px">Reply to ${escapeHtml(lead.contact.name.split(' ')[0])}</a>
  </div>
</div>`;
}

function leadConfirmationHtml(lead: LeadPayload): string {
  const firstName = escapeHtml(lead.contact.name.split(' ')[0]);
  const spoke = SPOKE_LABELS[lead.service];
  const isAudit = lead.intent === 'audit';

  return `
<div style="font-family:-apple-system,BlinkMacSystemFont,sans-serif;max-width:560px;margin:0 auto;background:#ffffff;border-radius:12px;overflow:hidden;border:1px solid #e5e7eb">
  <div style="padding:40px 32px 24px;text-align:center">
    <div style="background:#7C3AED;width:48px;height:48px;border-radius:12px;display:inline-flex;align-items:center;justify-content:center;color:#fff;font-weight:900;font-size:24px;margin-bottom:16px">Q</div>
    <h1 style="font-size:22px;margin:0 0 8px;color:#111827">${isAudit ? 'Your audit request is in motion' : 'We received your message'}</h1>
    <p style="color:#6b7280;font-size:15px;line-height:1.6;margin:0 0 24px">
      ${isAudit
        ? `Hey ${firstName} — we're reviewing your ${spoke} info now. A real person (not a bot) will analyze your situation and send back a personalized audit within <strong>48 hours</strong>.`
        : `Hey ${firstName} — a real person on the ${spoke} team will read your message and respond within <strong>one business day</strong>.`}
    </p>
    <div style="background:#f9fafb;border-radius:8px;padding:20px;text-align:left;margin-bottom:24px">
      <p style="color:#6b7280;font-size:12px;font-weight:600;text-transform:uppercase;letter-spacing:0.5px;margin:0 0 12px">What happens next</p>
      <ol style="margin:0;padding-left:20px;color:#374151;font-size:14px;line-height:2">
        ${isAudit
          ? '<li>We review your submission (within 24 hours)</li><li>You receive your personalized audit + Loom walkthrough (within 48 hours)</li><li>Optional: book a 30-minute strategy call to review findings together</li>'
          : '<li>Your message lands in the right team inbox</li><li>A team member reads and reviews your situation</li><li>You get a personal response within one business day</li>'}
      </ol>
    </div>
    ${isAudit ? `<a href="https://cal.com/hello-qognitionagency/30min" style="display:inline-block;background:#7C3AED;color:#fff;padding:14px 32px;border-radius:8px;text-decoration:none;font-weight:600;font-size:15px">Book a strategy call now</a>` : ''}
    <p style="color:#9ca3af;font-size:12px;margin-top:24px">Qognition Agency &mdash; The operating partner for founders.</p>
  </div>
</div>`;
}

export async function sendResendEmail({
  to,
  subject,
  html,
  attachments,
}: {
  to: string | string[];
  subject: string;
  html: string;
  attachments?: { filename: string; content: string }[];
}) {
  const apiKey = process.env.RESEND_API_KEY;
  const from = process.env.RESEND_FROM;

  if (!apiKey || !from) {
    return { ok: false, skipped: true, status: 503, error: 'Resend not configured. Add RESEND_API_KEY and RESEND_FROM.' };
  }

  const response = await fetch('https://api.resend.com/emails', {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${apiKey}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ from, to, subject, html, attachments }),
    cache: 'no-store',
  });

  const data = await response.json().catch(() => ({}));
  if (!response.ok) {
    return { ok: false, skipped: false, status: response.status, error: data?.message || 'Resend email failed.' };
  }

  return { ok: true, skipped: false, status: response.status, data };
}

export async function sendLeadNotification(lead: LeadPayload) {
  const subject = `[${lead.service}] ${lead.contact.name} — ${lead.intent} from ${lead.source_page}`;
  const notifyEmail = process.env.AUDIT_NOTIFY_EMAIL || 'hello@qognitionagency.com';

  return sendResendEmail({
    to: notifyEmail,
    subject,
    html: leadNotificationHtml(lead),
  });
}

type LeadFieldValue = string | number | boolean | undefined | null;
type HubSpotFieldMode = 'full' | 'core' | 'email';

type HubSpotLeadSubmission = {
  source?: string;
  resource?: string;
  pageUri?: string;
  pageName?: string;
  fields: Record<string, LeadFieldValue>;
};

const hubspotFieldNames: Record<string, string> = {
  firstname: process.env.HUBSPOT_FIELD_FIRSTNAME || 'firstname',
  email: process.env.HUBSPOT_FIELD_EMAIL || 'email',
  company: process.env.HUBSPOT_FIELD_COMPANY || 'company',
  website: process.env.HUBSPOT_FIELD_WEBSITE || 'website',
  message: process.env.HUBSPOT_FIELD_MESSAGE || 'message',
  auditType: process.env.HUBSPOT_FIELD_AUDIT_TYPE || 'audit_type',
  score: process.env.HUBSPOT_FIELD_AUDIT_SCORE || 'audit_score',
  reportSummary: process.env.HUBSPOT_FIELD_AUDIT_SUMMARY || 'audit_summary',
  sourceUrl: process.env.HUBSPOT_FIELD_SOURCE_URL || 'source_url',
};

const coreLeadFields = new Set(['firstname', 'email', 'company', 'website', 'message']);

function getAllowedFields(mode: HubSpotFieldMode) {
  if (mode === 'email') return new Set(['email', 'message']);
  if (mode === 'core') return coreLeadFields;
  return new Set(Object.keys(hubspotFieldNames));
}

function makeSourceNote(payload: HubSpotLeadSubmission) {
  const fields = payload.fields || {};
  const details = [
    `Source: ${payload.source || 'Website'}`,
    payload.resource ? `Resource: ${payload.resource}` : '',
    fields.auditType ? `Audit type: ${fields.auditType}` : '',
    fields.score !== undefined && fields.score !== null ? `Audit score: ${fields.score}` : '',
    fields.sourceUrl ? `Source URL: ${fields.sourceUrl}` : '',
    fields.reportSummary ? `Summary: ${fields.reportSummary}` : '',
  ].filter(Boolean);

  return details.join('\n');
}

function buildHubSpotFields(payload: HubSpotLeadSubmission, mode: HubSpotFieldMode) {
  const allowedFields = getAllowedFields(mode);
  const sourceNote = makeSourceNote(payload);

  const fields = Object.entries(payload.fields || {})
    .filter(
      ([key, value]) =>
        allowedFields.has(key) && hubspotFieldNames[key] && value !== undefined && value !== null && String(value).trim().length > 0,
    )
    .map(([key, value]) => ({
      name: hubspotFieldNames[key],
      value: String(value),
    }));

  const messageFieldName = hubspotFieldNames.message;
  const messageField = fields.find((field) => field.name === messageFieldName);
  if (messageField) {
    messageField.value = `${messageField.value}\n\n${sourceNote}`;
  } else if (sourceNote && allowedFields.has('message')) {
    fields.push({ name: messageFieldName, value: sourceNote });
  }

  return fields;
}

async function postHubSpotForm(
  payload: HubSpotLeadSubmission,
  request: NextRequest | undefined,
  mode: HubSpotFieldMode,
) {
  const portalId = process.env.HUBSPOT_PORTAL_ID;
  const formGuid = process.env.HUBSPOT_LEAD_FORM_GUID;

  if (!portalId || !formGuid) {
    return { ok: false, skipped: true, status: 503, error: 'HubSpot not configured.' };
  }

  const fields = buildHubSpotFields(payload, mode);

  if (!fields.some((field) => field.name === hubspotFieldNames.email)) {
    return { ok: false, skipped: false, status: 400, error: 'Email is required.' };
  }

  const hutk = request?.cookies.get('hubspotutk')?.value;
  const response = await fetch(
    `https://api.hsforms.com/submissions/v3/integration/submit/${portalId}/${formGuid}`,
    {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        submittedAt: Date.now().toString(),
        fields,
        context: { hutk, pageUri: payload.pageUri, pageName: payload.pageName },
      }),
      cache: 'no-store',
    },
  );

  const data = await response.json().catch(() => ({}));
  if (!response.ok) {
    return { ok: false, skipped: false, status: response.status, error: data?.message || 'HubSpot submission failed.' };
  }

  return { ok: true, skipped: false, status: response.status, data };
}

export async function submitHubSpotLead(payload: HubSpotLeadSubmission, request?: NextRequest) {
  const fullResult = await postHubSpotForm(payload, request, 'full');
  if (fullResult.ok || fullResult.skipped || fullResult.status === 400) {
    return fullResult;
  }

  const coreResult = await postHubSpotForm(payload, request, 'core');
  if (coreResult.ok) {
    return { ...coreResult, fallbackUsed: true, originalError: fullResult.error };
  }

  const emailResult = await postHubSpotForm(payload, request, 'email');
  if (emailResult.ok) {
    return { ...emailResult, fallbackUsed: true, originalError: coreResult.error || fullResult.error };
  }

  return {
    ...emailResult,
    error: emailResult.error || coreResult.error || fullResult.error || 'HubSpot submission failed.',
  };
}

export async function sendLeadConfirmation(lead: LeadPayload) {
  const isAudit = lead.intent === 'audit';
  const subject = isAudit
    ? 'Your audit request is in motion — expect results in 48 hours'
    : 'We received your message — expect a response soon';

  return sendResendEmail({
    to: lead.contact.email,
    subject,
    html: leadConfirmationHtml(lead),
  });
}
