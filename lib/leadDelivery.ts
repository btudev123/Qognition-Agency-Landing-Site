import { NextRequest } from 'next/server';

type LeadFieldValue = string | number | boolean | undefined | null;
type HubSpotFieldMode = 'full' | 'core' | 'email';

export type LeadSubmission = {
  source?: string;
  resource?: string;
  pageUri?: string;
  pageName?: string;
  fields: Record<string, LeadFieldValue>;
};

const fieldNames: Record<string, string> = {
  firstname: process.env.HUBSPOT_FIELD_FIRSTNAME || 'firstname',
  email: process.env.HUBSPOT_FIELD_EMAIL || 'email',
  company: process.env.HUBSPOT_FIELD_COMPANY || 'company',
  website: process.env.HUBSPOT_FIELD_WEBSITE || 'website',
  message: process.env.HUBSPOT_FIELD_MESSAGE || 'message',
  auditType: process.env.HUBSPOT_FIELD_AUDIT_TYPE || 'audit_type',
  score: process.env.HUBSPOT_FIELD_AUDIT_SCORE || 'audit_score',
  reportSummary: process.env.HUBSPOT_FIELD_AUDIT_SUMMARY || 'audit_summary',
  sourceUrl: process.env.HUBSPOT_FIELD_SOURCE_URL || 'source_url'
};

const coreLeadFields = new Set(['firstname', 'email', 'company', 'website', 'message']);

const getAllowedFields = (mode: HubSpotFieldMode) => {
  if (mode === 'email') return new Set(['email', 'message']);
  if (mode === 'core') return coreLeadFields;
  return new Set(Object.keys(fieldNames));
};

const makeSourceNote = (payload: LeadSubmission) => {
  const fields = payload.fields || {};
  const details = [
    `Source: ${payload.source || 'Website'}`,
    payload.resource ? `Resource: ${payload.resource}` : '',
    fields.auditType ? `Audit type: ${fields.auditType}` : '',
    fields.score !== undefined && fields.score !== null ? `Audit score: ${fields.score}` : '',
    fields.sourceUrl ? `Source URL: ${fields.sourceUrl}` : '',
    fields.reportSummary ? `Summary: ${fields.reportSummary}` : ''
  ].filter(Boolean);

  return details.join('\n');
};

const buildHubSpotFields = (payload: LeadSubmission, mode: HubSpotFieldMode) => {
  const allowedFields = getAllowedFields(mode);
  const sourceNote = makeSourceNote(payload);

  const fields = Object.entries(payload.fields || {})
    .filter(([key, value]) => allowedFields.has(key) && fieldNames[key] && value !== undefined && value !== null && String(value).trim().length > 0)
    .map(([key, value]) => ({
      name: fieldNames[key],
      value: String(value)
    }));

  const messageFieldName = fieldNames.message;
  const messageField = fields.find((field) => field.name === messageFieldName);
  if (messageField) {
    messageField.value = `${messageField.value}\n\n${sourceNote}`;
  } else if (sourceNote && allowedFields.has('message')) {
    fields.push({ name: messageFieldName, value: sourceNote });
  }

  return fields;
};

const postHubSpotForm = async (payload: LeadSubmission, request: NextRequest | undefined, mode: HubSpotFieldMode) => {
  const portalId = process.env.HUBSPOT_PORTAL_ID;
  const formGuid = process.env.HUBSPOT_LEAD_FORM_GUID;

  if (!portalId || !formGuid) {
    return {
      ok: false,
      skipped: true,
      status: 503,
      error: 'HubSpot is not configured. Add HUBSPOT_PORTAL_ID and HUBSPOT_LEAD_FORM_GUID.'
    };
  }

  const fields = buildHubSpotFields(payload, mode);

  if (!fields.some((field) => field.name === fieldNames.email)) {
    return { ok: false, skipped: false, status: 400, error: 'Email is required.' };
  }

  const hutk = request?.cookies.get('hubspotutk')?.value;
  const hubspotResponse = await fetch(`https://api.hsforms.com/submissions/v3/integration/submit/${portalId}/${formGuid}`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      submittedAt: Date.now().toString(),
      fields,
      context: {
        hutk,
        pageUri: payload.pageUri,
        pageName: payload.pageName
      }
    }),
    cache: 'no-store'
  });

  const data = await hubspotResponse.json().catch(() => ({}));
  if (!hubspotResponse.ok) {
    return { ok: false, skipped: false, status: hubspotResponse.status, error: data?.message || 'HubSpot submission failed.' };
  }

  return { ok: true, skipped: false, status: hubspotResponse.status, data };
};

export const submitHubSpotLead = async (payload: LeadSubmission, request?: NextRequest) => {
  const fullResult = await postHubSpotForm(payload, request, 'full');
  if (fullResult.ok || fullResult.skipped || fullResult.status === 400) {
    return fullResult;
  }

  const coreResult = await postHubSpotForm(payload, request, 'core');
  if (coreResult.ok) {
    return {
      ...coreResult,
      fallbackUsed: true,
      originalError: fullResult.error
    };
  }

  const emailResult = await postHubSpotForm(payload, request, 'email');
  if (emailResult.ok) {
    return {
      ...emailResult,
      fallbackUsed: true,
      originalError: coreResult.error || fullResult.error
    };
  }

  return {
    ...emailResult,
    error: emailResult.error || coreResult.error || fullResult.error || 'HubSpot submission failed.'
  };
};

export const sendResendEmail = async ({
  to,
  subject,
  html
}: {
  to: string | string[];
  subject: string;
  html: string;
}) => {
  const apiKey = process.env.RESEND_API_KEY;
  const from = process.env.RESEND_FROM;

  if (!apiKey || !from) {
    return { ok: false, skipped: true, status: 503, error: 'Resend is not configured. Add RESEND_API_KEY and RESEND_FROM.' };
  }

  const response = await fetch('https://api.resend.com/emails', {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${apiKey}`,
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({ from, to, subject, html }),
    cache: 'no-store'
  });

  const data = await response.json().catch(() => ({}));
  if (!response.ok) {
    return { ok: false, skipped: false, status: response.status, error: data?.message || 'Resend email failed.' };
  }

  return { ok: true, skipped: false, status: response.status, data };
};
