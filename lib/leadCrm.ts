import { createHash } from 'node:crypto';
import type { LeadPayload } from './validation';
import { qualifyLead } from './leadQualification';

const ORIGIN = 'https://services.leadconnectorhq.com';
type Env = Record<string, string | undefined>;
type Receipt = { id: string; hash: string };
type Contact = { id: string; customFields?: { id: string; value?: unknown; fieldValue?: unknown }[] };
const REQUIRED = ['GHL_PRIVATE_INTEGRATION_TOKEN', 'GHL_LOCATION_ID', 'GHL_INQUIRY_FIELD_ID', 'GHL_SUBMISSION_FIELD_ID', 'GHL_QUALIFICATION_FIELD_ID', 'GHL_MARKETING_CONSENT_FIELD_ID', 'GHL_LOCALE_FIELD_ID'] as const;

export class LeadCrmError extends Error {
  constructor(public code: 'not_configured' | 'unavailable' | 'invalid_response' | 'submission_conflict') {
    super(code);
  }
}

export const crmConfiguration = (env: Env = process.env) => {
  const missing = REQUIRED.filter(key => !env[key]?.trim());
  const fieldIds = REQUIRED.filter(key => key.endsWith('_FIELD_ID')).map(key => env[key]);
  const uniqueFields = new Set(fieldIds).size === fieldIds.length;
  return { configured: missing.length === 0 && uniqueFields, missing, distinctFieldIds: uniqueFields };
};

function receiptList(value: unknown): Receipt[] {
  try {
    const parsed = typeof value === 'string' ? JSON.parse(value) : [];
    return Array.isArray(parsed) ? parsed.filter(r => typeof r?.id === 'string' && typeof r?.hash === 'string').slice(-20) : [];
  } catch { return []; }
}

function savedInquiryReceipt(value: unknown): Receipt | null {
  try {
    const saved = typeof value === 'string' ? JSON.parse(value) : null;
    if (!saved || typeof saved.submission_id !== 'string' || typeof saved.received_at !== 'string' || !saved.contact?.email) return null;
    const { submission_id: id, received_at: _received, qualification_result: _qualification, ...content } = saved;
    return { id, hash: createHash('sha256').update(JSON.stringify(content)).digest('hex') };
  } catch { return null; }
}

// Local serialization prevents double-click races within a process. The GHL
// dedup policy and workflow re-entry settings remain essential across instances.
const active = new Map<string, Promise<unknown>>();

export async function captureLeadInCrm(lead: LeadPayload, options: { env?: Env; fetch?: typeof fetch; now?: Date } = {}) {
  const env = options.env || process.env;
  if (!crmConfiguration(env).configured) throw new LeadCrmError('not_configured');
  const email = lead.contact.email.trim().toLowerCase();
  const key = `${env.GHL_LOCATION_ID}:${email}`;
  const previous = active.get(key);
  const run = (async () => {
    if (previous) await previous.catch(() => undefined);
    return persist(lead, email, env, options.fetch || fetch, options.now || new Date());
  })();
  active.set(key, run);
  try { return await run; }
  finally { if (active.get(key) === run) active.delete(key); }
}

async function persist(lead: LeadPayload, email: string, env: Env, request: typeof fetch, now: Date) {
  const headers = { Authorization: `Bearer ${env.GHL_PRIVATE_INTEGRATION_TOKEN}`, Version: '2021-07-28', 'Content-Type': 'application/json' };
  const call = async (path: string, init?: RequestInit, allowNotFound = false) => {
    try {
      const response = await request(`${ORIGIN}${path}`, { ...init, headers, cache: 'no-store', signal: AbortSignal.timeout(10_000) });
      if (allowNotFound && response.status === 404) return {} as { contact?: Contact };
      if (!response.ok) throw new LeadCrmError('unavailable');
      const body = await response.json();
      if (!body || typeof body !== 'object') throw new LeadCrmError('invalid_response');
      return body as { contact?: Contact };
    } catch (error) {
      if (error instanceof LeadCrmError) throw error;
      throw new LeadCrmError('unavailable');
    }
  };
  const lookup = await call(`/contacts/search/duplicate?${new URLSearchParams({ locationId: env.GHL_LOCATION_ID!, email })}`, undefined, true);
  // Fetch the complete record: duplicate lookup does not promise custom fields.
  const existing = lookup.contact?.id ? (await call(`/contacts/${encodeURIComponent(lookup.contact.id)}`)).contact : undefined;
  if (lookup.contact?.id && !existing?.id) throw new LeadCrmError('invalid_response');
  const oldValue = (id: string) => existing?.customFields?.find(f => f.id === id)?.value ?? existing?.customFields?.find(f => f.id === id)?.fieldValue;
  const { submission_id: _submission, event_id: _event, honeypot: _honeypot, ...content } = lead;
  // Server time is not part of the digest, so a network retry has the same hash.
  const digest = createHash('sha256').update(JSON.stringify({ ...content, contact: { ...content.contact, email } })).digest('hex');
  const submissionId = lead.submission_id || lead.event_id || `legacy-${createHash('sha256').update(`${digest}:${now.toISOString().slice(0, 10)}`).digest('hex').slice(0, 40)}`;
  const receipts = receiptList(oldValue(env.GHL_SUBMISSION_FIELD_ID!));
  const receipt = receipts.find(r => r.id === submissionId);
  if (receipt && receipt.hash !== digest) throw new LeadCrmError('submission_conflict');
  const savedReceipt = savedInquiryReceipt(oldValue(env.GHL_INQUIRY_FIELD_ID!));
  // A receipt alone is insufficient: a provider may have dropped another
  // field. Verify the saved inquiry; otherwise repair it on the same retry.
  if (receipt && existing && savedReceipt && receipts.some(r => r.id === savedReceipt.id && r.hash === savedReceipt.hash)) return { contactId: existing.id, submissionId, duplicate: true, qualification: qualifyLead(lead) };

  const qualification = qualifyLead(lead);
  const snapshot = JSON.stringify({ submission_id: submissionId, received_at: now.toISOString(), ...content, contact: { ...content.contact, email }, qualification_result: qualification });
  // Only patch dedicated website fields. Replaying unrelated values from a
  // previous read could overwrite a concurrent sales update.
  const fields = new Map<string, unknown>();
  fields.set(env.GHL_INQUIRY_FIELD_ID!, snapshot);
  fields.set(env.GHL_SUBMISSION_FIELD_ID!, JSON.stringify([...receipts.filter(r => r.id !== submissionId), { id: submissionId, hash: digest }].slice(-20)));
  // These are dedicated website-eligibility fields, not the CRM lifecycle.
  fields.set(env.GHL_QUALIFICATION_FIELD_ID!, qualification.eligibility);
  fields.set(env.GHL_LOCALE_FIELD_ID!, lead.context?.locale || 'en');
  if (lead.consent) fields.set(env.GHL_MARKETING_CONSENT_FIELD_ID!, lead.consent.email_marketing ? 'opted-in' : 'not-opted-in');

  const payload = {
    locationId: env.GHL_LOCATION_ID,
    email,
    // Unauthenticated inquiry forms must not overwrite a known contact's
    // verified identity. Changed details remain in the inquiry for review.
    ...(!existing ? {
      name: lead.contact.name.trim(),
      ...(lead.contact.company?.trim() ? { companyName: lead.contact.company.trim() } : {}),
      ...(lead.contact.company_url ? { website: lead.contact.company_url } : {}),
      source: 'Qognition website',
    } : {}),
    // Keep a supplied phone in the inquiry, not the upsert matching fields:
    // a shared phone must not merge two different email contacts.
    createNewIfDuplicateAllowed: false,
    // Do not send tags, assignedTo, DND, pipeline, or opportunity stages.
    customFields: [...fields].filter(([, value]) => value !== undefined).map(([id, fieldValue]) => ({ id, fieldValue })),
  };
  const saved = await call('/contacts/upsert', { method: 'POST', body: JSON.stringify(payload) });
  if (!saved.contact?.id || (existing && saved.contact.id !== existing.id)) throw new LeadCrmError('invalid_response');
  // Do not acknowledge a write until the required inquiry fields can be read.
  const confirmed = (await call(`/contacts/${encodeURIComponent(saved.contact.id)}`)).contact;
  const confirmedFields = confirmed?.customFields || [];
  const read = (id: string) => confirmedFields.find(f => f.id === id)?.value ?? confirmedFields.find(f => f.id === id)?.fieldValue;
  if (read(env.GHL_INQUIRY_FIELD_ID!) !== snapshot || !receiptList(read(env.GHL_SUBMISSION_FIELD_ID!)).some(r => r.id === submissionId && r.hash === digest)) {
    throw new LeadCrmError('invalid_response');
  }
  return { contactId: saved.contact.id, submissionId, duplicate: false, qualification };
}
