import { createHash, randomUUID } from 'node:crypto';
import { isAuditLead, type LeadPayload, type ServerConsentEvidence } from './validation';
import { qualifyLead } from './leadQualification';
import { createLeadLedger, createDisabledLeadLedger, ledgerAbsent, ledgerConfiguration, LeadLedgerError, type LeadEnv, type LeadLedger, type LeadLease, type LeadReceipt } from './leadLedger';

const ORIGIN = 'https://services.leadconnectorhq.com';
type Contact = { id: string; email?: string; locationId?: string; dnd?: boolean; dndSettings?: Record<string, { status?: string }>; customFields?: { id: string; value?: unknown; fieldValue?: unknown }[] };
type Note = { id: string; body?: string; contactId?: string };
const REQUIRED = ['GHL_PRIVATE_INTEGRATION_TOKEN', 'GHL_LOCATION_ID', 'GHL_INQUIRY_FIELD_ID', 'GHL_SUBMISSION_FIELD_ID', 'GHL_QUALIFICATION_FIELD_ID', 'GHL_MARKETING_CONSENT_FIELD_ID', 'GHL_LOCALE_FIELD_ID'] as const;

const OPTIONAL_FIELDS = ['GHL_CONSENT_BASIS_FIELD_ID'] as const;

export class LeadCrmError extends Error {
  constructor(public code: 'not_configured' | 'misconfigured' | 'ledger_unavailable' | 'unavailable' | 'invalid_response' | 'submission_conflict' | 'busy' | 'lease_lost' | 'reconciliation_required') { super(code); }
}
export const crmConfiguration = (env: LeadEnv = process.env) => {
  const missing = REQUIRED.filter(key => !env[key]?.trim());
  // Optional fields join the distinctness check only when set.
  const fieldIds = [...REQUIRED.filter(key => key.endsWith('_FIELD_ID')).map(key => env[key]), ...OPTIONAL_FIELDS.map(key => env[key]?.trim()).filter(Boolean)];
  const uniqueFields = new Set(fieldIds).size === fieldIds.length;
  return { configured: missing.length === 0 && uniqueFields, missing, distinctFieldIds: uniqueFields };
};
// The ledger is optional: absent is valid, partially configured is not.
export const leadCaptureConfiguration = (env: LeadEnv = process.env) => ({ crm: crmConfiguration(env), ledger: { ...ledgerConfiguration(env), optional: true, absent: ledgerAbsent(env) }, configured: crmConfiguration(env).configured && (ledgerConfiguration(env).configured || ledgerAbsent(env)) });
let ledgerDisabledLogged = false;

function stable(value: unknown): unknown {
  if (Array.isArray(value)) return value.map(stable);
  if (value && typeof value === 'object') return Object.fromEntries(Object.entries(value).filter(([, v]) => v !== undefined).sort(([a], [b]) => a.localeCompare(b)).map(([k, v]) => [k, stable(v)]));
  return value;
}
const hash = (value: string) => createHash('sha256').update(value).digest('hex');
export function leadSubmissionIdentity(lead: LeadPayload, now = new Date()) {
  const { submission_id: _id, event_id: _event, honeypot: _trap, ...content } = lead;
  const normalized = { ...content, contact: { ...content.contact, email: content.contact.email.trim().toLowerCase() } };
  const digest = hash(JSON.stringify(stable(normalized)));
  // Legacy callers without a stable ID deduplicate identical payloads for one UTC day.
  const submissionId = lead.submission_id || (lead.event_id && /^[a-zA-Z0-9_-]{8,64}$/.test(lead.event_id) ? lead.event_id : undefined) || `legacy-${hash(`${digest}:${now.toISOString().slice(0, 10)}`).slice(0, 40)}`;
  return { submissionId, digest, content: normalized };
}
const fieldValue = (contact: Contact | undefined, id: string) => {
  const field = contact?.customFields?.find(f => f.id === id); return field?.value ?? field?.fieldValue;
};
function previousAttribution(contact: Contact | undefined, env: LeadEnv): LeadPayload['attribution'] {
  try {
    const saved = JSON.parse(String(fieldValue(contact, env.GHL_INQUIRY_FIELD_ID!) || '{}'));
    return saved.attribution && typeof saved.attribution === 'object' ? saved.attribution : undefined;
  } catch { return undefined; }
}

export async function captureLeadInCrm(lead: LeadPayload, options: { env?: LeadEnv; fetch?: typeof fetch; now?: Date; ledger?: LeadLedger; consentEvidence?: ServerConsentEvidence } = {}) {
  const env = options.env || process.env;
  // not_configured = credentials absent. misconfigured = present but unusable (duplicate
  // field IDs, a partial or invalid ledger, a rejected token): someone has to fix it.
  const crm = crmConfiguration(env);
  if (crm.missing.length) throw new LeadCrmError('not_configured');
  if (!crm.configured) throw new LeadCrmError('misconfigured');
  const request = options.fetch || fetch;
  let ledgerEnabled = Boolean(options.ledger) || !ledgerAbsent(env);
  let ledger: LeadLedger;
  try { ledger = options.ledger || (ledgerEnabled ? createLeadLedger(env, request) : createDisabledLeadLedger()); }
  catch { throw new LeadCrmError('misconfigured'); }
  if (!ledgerEnabled && !ledgerDisabledLogged) { ledgerDisabledLogged = true; console.warn('[Lead] ledger_disabled'); }
  const now = options.now || new Date();
  const identity = leadSubmissionIdentity(lead, now);
  const email = identity.content.contact.email;
  const marker = `[qognition-enquiry:v1:${identity.submissionId}:${identity.digest}]`;
  let lease: LeadLease | undefined;
  let degraded = false;
  const qualification = qualifyLead(lead);
  // Shown to the team in GHL. Derived from the payload, so it is also inside the digest.
  const audit = isAuditLead(lead);
  const requestType = audit ? 'free-ai-visibility-audit' : 'enquiry';
  const initialReceipt: LeadReceipt = {
    version: 1, submissionId: identity.submissionId, digest: identity.digest,
    eventId: lead.event_id && /^[a-zA-Z0-9_-]{8,64}$/.test(lead.event_id) ? lead.event_id : randomUUID(),
    state: 'pending', createdAt: now.toISOString(), updatedAt: now.toISOString(), deliveries: {},
  };
  try {
    try { lease = await ledger.begin(email, initialReceipt); }
    catch (error) {
      // An unreachable ledger must not cost the GHL write: continue exactly as if none were
      // configured. Only before a lease is held; a lease lost mid-write still fails closed.
      if (!(error instanceof LeadLedgerError && error.code === 'unavailable')) throw error;
      console.error('[Lead] ledger_unavailable_degraded');
      ledger = createDisabledLeadLedger(); ledgerEnabled = false; degraded = true;
      lease = await ledger.begin(email, initialReceipt);
    }
    const result = (duplicate: boolean, contact?: Contact) => ({
      contactId: lease!.receipt.contactId!, noteId: lease!.receipt.noteId!,
      submissionId: lease!.receipt.submissionId, eventId: lease!.receipt.eventId,
      digest: identity.digest, duplicate, qualification, ledger,
      // Existing DND is never changed, including for a requested confirmation.
      emailSuppressed: Boolean(contact?.dnd || Object.entries(contact?.dndSettings || {}).some(([channel, setting]) => channel.toLowerCase() === 'email' && setting.status === 'active')),
    });
    if (lease.receipt.state === 'captured') {
      if (!lease.receipt.contactId || !lease.receipt.noteId) throw new LeadCrmError('invalid_response');
      return result(true);
    }
    const startedAt = Date.now();
    const save = async (changes: Partial<LeadReceipt>) => ledger.save(lease!, { ...lease!.receipt, ...changes, updatedAt: new Date().toISOString() });
    const call = async (path: string, init?: RequestInit, noteApi = false, allowNotFound = false) => {
      // A stale worker stops before every provider request and before receipt commit.
      if (Date.now() - startedAt > 38_000) throw new LeadCrmError('unavailable');
      await ledger.renew(lease!);
      try {
        const response = await request(`${ORIGIN}${path}`, {
          ...init, headers: { Authorization: `Bearer ${env.GHL_PRIVATE_INTEGRATION_TOKEN}`, Version: noteApi ? 'v3' : '2021-07-28', 'Content-Type': 'application/json' },
          cache: 'no-store', signal: AbortSignal.timeout(7_000), redirect: 'error',
        });
        if (allowNotFound && response.status === 404) return {} as { contact?: Contact; note?: Note; notes?: Note[] };
        if (response.status === 401) throw new LeadCrmError('misconfigured');
        if (!response.ok) throw new LeadCrmError('unavailable');
        const body = await response.json();
        if (!body || typeof body !== 'object') throw new LeadCrmError('invalid_response');
        return body as { contact?: Contact; note?: Note; notes?: Note[] };
      } catch (error) {
        if (error instanceof LeadCrmError) throw error;
        throw new LeadCrmError('unavailable');
      }
    };
    const confirmContact = (contact?: Contact) => {
      if (!contact?.id || contact.locationId !== env.GHL_LOCATION_ID || contact.email?.trim().toLowerCase() !== email) throw new LeadCrmError('invalid_response');
      return contact;
    };
    let contact: Contact;
    if (lease.receipt.contactId) {
      contact = confirmContact((await call(`/contacts/${encodeURIComponent(lease.receipt.contactId)}`)).contact);
    } else {
      // All provider queries use the server-owned location. Public input cannot select tenancy.
      const found = await call(`/contacts/search/duplicate?${new URLSearchParams({ locationId: env.GHL_LOCATION_ID!, email })}`, undefined, false, true);
      const existing = found.contact?.id ? confirmContact((await call(`/contacts/${encodeURIComponent(found.contact.id)}`)).contact) : undefined;
      if (!ledgerEnabled && existing) {
        // Without a ledger the enquiry note marker is the only trace of an earlier attempt.
        // Checked before any write, so a retry never overwrites fields or appends again.
        const listed = await call(`/contacts/${encodeURIComponent(existing.id)}/notes`, undefined, true);
        if (!Array.isArray(listed.notes)) throw new LeadCrmError('invalid_response');
        const prior = listed.notes.filter(note => note.body?.startsWith(`[qognition-enquiry:v1:${identity.submissionId}:`));
        if (prior.some(note => !note.body!.startsWith(`${marker}\n`))) throw new LeadCrmError('submission_conflict');
        if (prior[0]?.id) {
          lease.receipt = { ...lease.receipt, state: 'captured', contactId: existing.id, noteId: prior[0].id };
          return result(true, existing);
        }
      }
      const previous = previousAttribution(existing, env);
      const snapshot = JSON.stringify({
        submission_id: identity.submissionId, received_at: lease.receipt.createdAt, ...identity.content,
        attribution: { ...lead.attribution, first_touch: previous?.first_touch || lead.attribution?.first_touch, landing_page: previous?.landing_page || lead.attribution?.landing_page },
        qualification_result: qualification, consent_evidence: options.consentEvidence, request_type: requestType,
      });
      const fields = [
        { id: env.GHL_INQUIRY_FIELD_ID!, fieldValue: snapshot },
        { id: env.GHL_SUBMISSION_FIELD_ID!, fieldValue: JSON.stringify({ id: identity.submissionId, hash: identity.digest }) },
        { id: env.GHL_QUALIFICATION_FIELD_ID!, fieldValue: qualification.eligibility },
        { id: env.GHL_LOCALE_FIELD_ID!, fieldValue: lead.context?.locale || 'en' },
        ...(lead.consent && options.consentEvidence && env.GHL_CONSENT_BASIS_FIELD_ID?.trim() ? [{ id: env.GHL_CONSENT_BASIS_FIELD_ID.trim(), fieldValue: JSON.stringify(options.consentEvidence) }] : []),
        ...(lead.consent ? [{ id: env.GHL_MARKETING_CONSENT_FIELD_ID!, fieldValue: lead.consent.email_marketing ? 'opt-in-requested' : 'not-opted-in' }] : []),
      ];
      await save({ state: 'contact_write_started' });
      // Identity, ownership, DND, tags and sales lifecycle are never patched. Even
      // an upsert racing a newly created external contact only changes dedicated website fields.
      const saved = existing
        ? await call(`/contacts/${encodeURIComponent(existing.id)}`, { method: 'PUT', body: JSON.stringify({ customFields: fields }) })
        : await call('/contacts/upsert', { method: 'POST', body: JSON.stringify({ locationId: env.GHL_LOCATION_ID, email, createNewIfDuplicateAllowed: false, customFields: fields }) });
      if (!saved.contact?.id || (existing && saved.contact.id !== existing.id)) throw new LeadCrmError('invalid_response');
      contact = confirmContact((await call(`/contacts/${encodeURIComponent(saved.contact.id)}`)).contact);
      if (!fields.every(field => fieldValue(contact, field.id) === field.fieldValue)) throw new LeadCrmError('invalid_response');
      await save({ state: 'contact_saved', contactId: contact.id });
    }
    const notesPath = `/contacts/${encodeURIComponent(contact.id)}/notes`;
    let noteId = lease.receipt.noteId;
    if (['note_write_started', 'reconciliation_required'].includes(lease.receipt.state)) {
      // A timed-out append may already exist. Adopt exactly one matching note;
      // never repeat an ambiguous append, even if its first read has no result.
      const listed = await call(notesPath, undefined, true);
      if (!Array.isArray(listed.notes)) throw new LeadCrmError('invalid_response');
      const matches = listed.notes.filter(note => note.body?.startsWith(`${marker}\n`));
      if (matches.length !== 1 || !matches[0].id) {
        await save({ state: 'reconciliation_required' });
        throw new LeadCrmError('reconciliation_required');
      }
      noteId = matches[0].id;
    } else if (!noteId) {
      const body = `${marker}\n${JSON.stringify({ schema_version: 1, submission_id: identity.submissionId, received_at: lease.receipt.createdAt, ...identity.content, qualification_result: qualification, consent_evidence: options.consentEvidence, request_type: requestType })}`;
      await save({ state: 'note_write_started', noteBodyHash: hash(body) });
      const created = await call(notesPath, { method: 'POST', body: JSON.stringify({ body, title: audit ? 'Website enquiry: Free AI visibility audit' : 'Website enquiry' }) }, true);
      if (!created.note?.id) throw new LeadCrmError('invalid_response');
      noteId = created.note.id;
    }
    if (!noteId) throw new LeadCrmError('invalid_response');
    const confirmed = (await call(`${notesPath}/${encodeURIComponent(noteId)}`, undefined, true)).note;
    if (confirmed?.id !== noteId || confirmed.contactId !== contact.id || !confirmed.body?.startsWith(`${marker}\n`) || hash(confirmed.body) !== lease.receipt.noteBodyHash) throw new LeadCrmError('invalid_response');
    await ledger.renew(lease);
    await save({ state: 'captured', noteId, contactId: contact.id });
    return result(false, contact);
  } catch (error) {
    const code = error instanceof LeadCrmError || error instanceof LeadLedgerError ? error.code : 'unavailable';
    // Ledger and GHL both unreachable: its own code, so the email fallback log says so.
    if (degraded && code === 'unavailable') throw new LeadCrmError('ledger_unavailable');
    throw error instanceof LeadCrmError ? error : new LeadCrmError(code);
  } finally {
    // Never replace a durable capture result with a best-effort lock-release error.
    if (lease) await ledgerOrRelease(ledger, lease);
  }
}
async function ledgerOrRelease(ledger: LeadLedger, lease: LeadLease) { try { await ledger.release(lease); } catch { /* bounded leases expire; never log provider content */ } }
