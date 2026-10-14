import { randomUUID } from 'node:crypto';
import { NextRequest, NextResponse, after } from 'next/server';
import { leadSchema, type LeadPayload, type ServerConsentEvidence } from '../../../lib/validation';
import { consentDefaultFor } from '../../../lib/consent';
import { captureLeadInCrm, LeadCrmError } from '../../../lib/leadCrm';
import { normalizeLeadContext } from '../../../lib/leadTaxonomy';
import { sendLeadNotification, sendLeadConfirmation, recordFailedLead } from '../../../lib/leadDelivery';
import { checkAuditRateLimit, getAuditClientIp, releaseAuditRateLimit } from '../../../lib/auditRateLimit';
import { sendMetaCapiEvent, metaCookiesFromRequest } from '../../../lib/metaCapi';
import { liveLeadWritesAllowed } from '../../../lib/deploymentMode';
import type { DeliveryKind, DeliveryState } from '../../../lib/leadLedger';

export const dynamic = 'force-dynamic';
export const maxDuration = 60;

/**
 * CRM failures that fall back to email. not_configured and misconfigured never reach a
 * GHL write. unavailable and invalid_response can happen after one, so falling back can
 * duplicate a lead in GHL plus email; the cost is duplication, never loss.
 * ledger_unavailable = Upstash and GHL both unreachable (see captureLeadInCrm).
 */
const EMAIL_FALLBACK_CODES = new Set(['not_configured', 'misconfigured', 'ledger_unavailable', 'unavailable', 'invalid_response']);
const RECEIVED = 'Your enquiry has been received.';

/** Country and GPC come from request headers the browser does not script, never from the body. */
function consentEvidenceFrom(request: NextRequest, lead: LeadPayload): ServerConsentEvidence {
  const country = request.headers.get('x-vercel-ip-country')?.trim().toUpperCase() || '';
  return { basis: lead.consent?.basis || 'unknown', country: /^[A-Z]{2}$/.test(country) ? country : null, gpc: request.headers.get('sec-gpc')?.trim() === '1' };
}

/**
 * Meta CAPI only on a real advertising yes. GPC always wins. A region default (or a legacy
 * payload with no basis) only counts where this server also resolves the region as opt-out.
 */
function advertisingAllowed(lead: LeadPayload, evidence: ServerConsentEvidence) {
  if (lead.consent?.advertising !== true || evidence.gpc) return false;
  return evidence.basis === 'explicit' || consentDefaultFor(evidence.country);
}

/** One prospect confirmation per address per day (in-memory, per instance). */
const confirmationAllowed = (request: NextRequest, lead: LeadPayload) =>
  checkAuditRateLimit(request, lead.contact.email, 'confirmation').allowed;

function metaLeadEvent(lead: LeadPayload, eventId: string, client: { ip: string; userAgent?: string; cookies: ReturnType<typeof metaCookiesFromRequest> }) {
  const [firstName, ...names] = lead.contact.name.trim().split(/\s+/);
  return {
    eventName: 'Lead', eventId,
    eventSourceUrl: `https://www.qognitionagency.com${/^\/[a-z0-9\/-]*$/.test(lead.source_page) && !lead.source_page.startsWith('//') ? lead.source_page : '/contact'}`,
    userData: { email: lead.contact.email, phone: lead.contact.phone, firstName, lastName: names.join(' ') || undefined, clientIp: client.ip, userAgent: client.userAgent, ...client.cookies },
    customData: { content_category: lead.context?.pillar || lead.service, lead_intent: lead.intent },
  };
}

export async function POST(request: NextRequest) {
  const raw = await request.text();
  if (raw.length > 40_000) return NextResponse.json({ error: 'Request is too large.' }, { status: 413 });
  let body: unknown;
  try { body = JSON.parse(raw); }
  catch { return NextResponse.json({ error: 'Invalid request body.' }, { status: 400 }); }
  const parsed = leadSchema.safeParse(body);
  if (!parsed.success) return NextResponse.json({ error: 'Please check the form fields.', fields: parsed.error.flatten().fieldErrors }, { status: 400 });
  const lead = parsed.data;
  try { lead.context = normalizeLeadContext(lead.context); }
  catch {
    // Owen L4, 2026-10-14: /contact is the only form, so page context that does not resolve
    // never costs the lead. Only the taxonomy keys go (they are reporting, not qualification);
    // the audit tag, page and locale stay. The supplied IDs are never logged.
    console.warn('[Lead] context_taxonomy_dropped', { code: 'invalid_taxonomy' });
    const { industry_id: _industry, subindustry_id: _sub, niche_id: _niche, subniche_id: _leaf, ...kept } = lead.context || {};
    lead.context = Object.keys(kept).length ? kept : undefined;
  }
  if (lead.intent === 'newsletter' && !lead.consent?.email_marketing) return NextResponse.json({ error: 'Please opt in to receive the newsletter.' }, { status: 400 });
  // NODE_ENV=production also occurs in Vercel previews; it never grants write access.
  if (!liveLeadWritesAllowed()) {
    if (process.env.QOGNITION_LEAD_MODE === 'validate') return NextResponse.json({ success: false, status: 'validated', preview: true, message: 'Test validated; no enquiry sent.' });
    return NextResponse.json({ success: false, status: 'preview_disabled', error: 'This preview does not send enquiries or trigger follow-up.' }, { status: 503 });
  }
  // A bot that filled the trap gets exactly what a real capture returns, so the trap is invisible.
  if (lead.honeypot) {
    const submissionId = lead.submission_id || randomUUID();
    return NextResponse.json({ success: true, status: 'captured', message: RECEIVED, duplicate: false, submission_id: submissionId, event_id: lead.event_id || submissionId });
  }
  const rate = checkAuditRateLimit(request, lead.contact.email, 'lead', true);
  if (!rate.allowed) return NextResponse.json({ error: 'Too many requests. Please try again shortly.', retryAfterSeconds: rate.retryAfterSeconds }, { status: 429, headers: { 'Retry-After': String(rate.retryAfterSeconds) } });
  const evidence = consentEvidenceFrom(request, lead);
  try {
    // GHL contact + verified enquiry note are the acceptance boundary (plus the ledger receipt when configured).
    const captured = await captureLeadInCrm(lead, { consentEvidence: evidence });
    if (!captured.duplicate) {
      // Decided now, while the request is in scope. The lead is accepted either way.
      const confirm = !captured.emailSuppressed && confirmationAllowed(request, lead);
      const cookies = metaCookiesFromRequest(request);
      const ip = getAuditClientIp(request);
      const userAgent = request.headers.get('user-agent') || undefined;
      // after() hands the task to the platform's waitUntil, so Vercel keeps the function
      // alive (within maxDuration) after the response. With no Upstash ledger the stand-in
      // claim always succeeds (createDisabledLeadLedger), so the notification still sends.
      after(async () => {
        const deliver = async (kind: DeliveryKind, send: () => Promise<{ ok?: boolean; skipped?: boolean }>, sendIfLedgerDown = false) => {
          let claimed = false;
          try {
            try { claimed = await captured.ledger.claimDelivery(captured.submissionId, captured.digest, kind); }
            catch (error) {
              // The ledger only adds exactly-once (operator 2026-10-06). If it fails after a
              // confirmed GHL capture, hello@ is still told: the cost is a possible repeat
              // notification, never a lead nobody hears about. Prospect email and CAPI stay
              // claimed-only, so a ledger outage never sends them twice.
              if (!sendIfLedgerDown) throw error;
              console.error('[Lead] delivery_claim_unavailable', { kind });
              const outcome = await send();
              if (!outcome.ok && !outcome.skipped) console.error('[Lead] downstream_delivery_failed', { kind });
              return;
            }
            if (!claimed) return;
            const outcome = await send();
            const state: DeliveryState = outcome.skipped ? 'skipped' : outcome.ok ? 'sent' : 'failed';
            await captured.ledger.finishDelivery(captured.submissionId, captured.digest, kind, state);
            if (state === 'failed') console.error('[Lead] downstream_delivery_failed', { kind });
          } catch {
            // A claimed send with a lost response is never automatically resent.
            if (claimed) try { await captured.ledger.finishDelivery(captured.submissionId, captured.digest, kind, 'unknown'); } catch { /* claim remains durable */ }
            console.error('[Lead] downstream_delivery_unconfirmed', { kind });
          }
        };
        const tasks: Promise<void>[] = [deliver('notification', () => sendLeadNotification(lead, evidence), true)];
        if (confirm) tasks.push(deliver('confirmation', () => sendLeadConfirmation(lead)));
        if (advertisingAllowed(lead, evidence)) tasks.push(deliver('advertising', () => sendMetaCapiEvent(metaLeadEvent(lead, captured.eventId, { ip, userAgent, cookies }))));
        await Promise.allSettled(tasks);
      });
    }
    return NextResponse.json({ success: true, status: 'captured', message: RECEIVED, duplicate: captured.duplicate, submission_id: captured.submissionId, event_id: captured.eventId });
  } catch (error) {
    const code = error instanceof LeadCrmError ? error.code : 'unavailable';
    if (code === 'submission_conflict') {
      releaseAuditRateLimit(rate);
      return NextResponse.json({ success: false, retryable: false, code, error: 'This submission reference already belongs to a different enquiry. Please start a new enquiry.' }, { status: 409 });
    }
    // Operator decision 2026-10-06: until GHL credentials exist, a confirmed internal
    // email is an accepted lead. LEAD_EMAIL_FALLBACK=off restores strict GHL-first.
    // busy / lease_lost / reconciliation_required may already be in GHL, so they never fall back.
    if (EMAIL_FALLBACK_CODES.has(code) && process.env.LEAD_EMAIL_FALLBACK !== 'off') {
      if (code === 'misconfigured') console.error('[Lead] crm_misconfigured_fallback', { code });
      const notified = await sendLeadNotification(lead, evidence).catch(() => ({ ok: false }));
      if (notified.ok) {
        console.info('[Lead] crm_fallback_email', { code });
        const submissionId = lead.submission_id || randomUUID();
        const eventId = lead.event_id || submissionId;
        const confirm = confirmationAllowed(request, lead);
        const cookies = metaCookiesFromRequest(request);
        const ip = getAuditClientIp(request);
        const userAgent = request.headers.get('user-agent') || undefined;
        // No ledger on this path: each follow-up is attempted once and never replayed.
        after(async () => {
          const once = async (kind: DeliveryKind, send: () => Promise<{ ok?: boolean; skipped?: boolean }>) => {
            try {
              const outcome = await send();
              if (!outcome.ok && !outcome.skipped) console.error('[Lead] downstream_delivery_failed', { kind });
            } catch { console.error('[Lead] downstream_delivery_unconfirmed', { kind }); }
          };
          const tasks: Promise<void>[] = [];
          if (confirm) tasks.push(once('confirmation', () => sendLeadConfirmation(lead)));
          if (advertisingAllowed(lead, evidence)) tasks.push(once('advertising', () => sendMetaCapiEvent(metaLeadEvent(lead, eventId, { ip, userAgent, cookies }))));
          await Promise.allSettled(tasks);
        });
        return NextResponse.json({ success: true, status: 'emailed', fallback: true, message: RECEIVED, submission_id: submissionId, event_id: eventId });
      }
    }
    releaseAuditRateLimit(rate);
    recordFailedLead(lead, { capture: code });
    return NextResponse.json({ success: false, retryable: true, code, error: 'We could not confirm receipt of your enquiry. Please try again, or book a call directly.' }, { status: 503, headers: { 'Retry-After': '30' } });
  }
}
