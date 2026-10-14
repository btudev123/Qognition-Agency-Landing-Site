import { randomUUID } from 'node:crypto';
import { NextRequest, NextResponse, after } from 'next/server';
import { leadSchema, type LeadPayload, type ServerConsentEvidence } from '../../../lib/validation';
import { consentDefaultFor } from '../../../lib/consent';
import { normalizeLeadContext } from '../../../lib/leadTaxonomy';
import { sendLeadNotification, sendLeadConfirmation, recordFailedLead, confirmationRateKey } from '../../../lib/leadDelivery';
import { checkAuditRateLimit, getAuditClientIp, releaseAuditRateLimit } from '../../../lib/auditRateLimit';
import { sendMetaCapiEvent, metaCookiesFromRequest } from '../../../lib/metaCapi';
import { liveLeadWritesAllowed } from '../../../lib/deploymentMode';

export const dynamic = 'force-dynamic';
export const maxDuration = 60;

/**
 * Resend is the only acceptance boundary (operator, 2026-10-14). The hello@ notification is
 * sent before the response, and success is reported only when Resend accepts it. There is no
 * CRM and no shared store, so nothing here can recognise a retry: a retry after a lost 200
 * sends hello@ a second notification. The client reuses submission_id and event_id on a
 * retry, so Meta collapses a repeated CAPI Lead, and the browser fires its success events
 * only on the one response it sees.
 */
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

/**
 * One prospect confirmation per mailbox per day (in-memory, per instance). Keyed on the
 * normalised mailbox, so +tags and Gmail dots cannot mail one stranger many times (Anton F2).
 */
const confirmationAllowed = (request: NextRequest, lead: LeadPayload) =>
  checkAuditRateLimit(request, confirmationRateKey(lead.contact.email), 'confirmation').allowed;

/**
 * Anton F1.1: a cross-site page could POST text/plain in no-cors mode and make us mail hello@
 * and the address it typed. JSON forces a CORS preflight that this route never answers, and
 * Origin / Sec-Fetch-Site (set by the browser, not scriptable by the page) refuse what slips past.
 * A request with neither header is not a browser, so it is not CSRF and is not refused here.
 */
const SITE_ORIGINS = ['https://www.qognitionagency.com', 'https://qognitionagency.com'];
function crossSite(request: NextRequest) {
  if (request.headers.get('sec-fetch-site')?.trim().toLowerCase() === 'cross-site') return true;
  const origin = request.headers.get('origin');
  if (origin === null) return false;
  // This deployment's own hosts and the project's production .vercel.app alias, from Vercel's
  // system env (no scheme), never a list of previews.
  const own = [process.env.VERCEL_URL, process.env.VERCEL_BRANCH_URL, process.env.VERCEL_PROJECT_PRODUCTION_URL].map(host => host?.trim()).filter(Boolean).map(host => `https://${host}`);
  if ([...SITE_ORIGINS, ...own].includes(origin.trim())) return false;
  // Local `next dev` (VERCEL_ENV unset or not production) only. Production never accepts it.
  // Outside production liveLeadWritesAllowed() is false, so this unlocks validate mode, never a send.
  return !(process.env.VERCEL_ENV !== 'production' && /^http:\/\/(localhost|127\.0\.0\.1):\d{1,5}$/.test(origin.trim()));
}

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
  if (request.headers.get('content-type')?.split(';')[0]?.trim().toLowerCase() !== 'application/json') return NextResponse.json({ error: 'Send the form as JSON.' }, { status: 415 });
  if (crossSite(request)) return NextResponse.json({ error: 'Cross-site requests are not accepted.' }, { status: 403 });
  const raw = await request.text();
  if (raw.length > 40_000) return NextResponse.json({ error: 'Request is too large.' }, { status: 413 });
  let body: unknown;
  try { body = JSON.parse(raw); }
  catch { return NextResponse.json({ error: 'Invalid request body.' }, { status: 400 }); }
  // Ad click IDs are validated inside leadSchema (lib/clickIds.ts): an invalid one is dropped,
  // never a 400. So is any attribution field that does not parse (Owen F1). Click IDs reach only
  // the hello@ notification, never Meta CAPI, and only when advertising is allowed (below).
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
  const submissionId = lead.submission_id || randomUUID();
  const eventId = lead.event_id || submissionId;
  const accepted = { success: true, status: 'emailed', message: RECEIVED, submission_id: submissionId, event_id: eventId };
  // In-memory, per instance (lib/auditRateLimit.ts). It never used a shared store. Runs before
  // the trap, so a flooding bot meets the same ceiling as anyone else (Anton F4).
  const rate = checkAuditRateLimit(request, lead.contact.email, 'lead', true);
  if (!rate.allowed) return NextResponse.json({ error: 'Too many requests. Please try again shortly.', retryAfterSeconds: rate.retryAfterSeconds }, { status: 429, headers: { 'Retry-After': String(rate.retryAfterSeconds) } });
  // A bot that filled the trap gets exactly what a real send returns, so the trap is invisible.
  // hp_field_q is the current field; honeypot is what cached clients still send. No fields logged.
  if (lead.hp_field_q || lead.honeypot) {
    console.info('[Lead] honeypot_hit');
    return NextResponse.json(accepted);
  }
  const evidence = consentEvidenceFrom(request, lead);
  // Decided before the notification, because it also governs what the notification may show.
  const advertise = advertisingAllowed(lead, evidence);
  // Anton F2: the browser keeps click IDs only with advertising consent, but the server does not
  // take the body's word for it. The same rule as Meta CAPI decides: no advertising, no IDs.
  // Campaign context is left alone.
  if (!advertise && lead.attribution) {
    delete lead.attribution.first_click_ids;
    delete lead.attribution.last_click_ids;
    if (!Object.values(lead.attribution).some(value => value !== undefined)) lead.attribution = undefined;
  }
  // The acceptance boundary: hello@ is told before the visitor is.
  const notified = await sendLeadNotification(lead, evidence).catch(() => ({ ok: false, skipped: false }));
  if (!notified.ok) {
    const code = notified.skipped ? 'not_configured' : 'unavailable';
    releaseAuditRateLimit(rate);
    recordFailedLead(lead, { notification: code });
    return NextResponse.json({ success: false, retryable: true, code, error: 'We could not confirm receipt of your enquiry. Please try again, or book a call directly.' }, { status: 503, headers: { 'Retry-After': '30' } });
  }
  // Decided now, while the request is in scope. The lead is accepted either way.
  const confirm = confirmationAllowed(request, lead);
  const cookies = metaCookiesFromRequest(request);
  const ip = getAuditClientIp(request);
  const userAgent = request.headers.get('user-agent') || undefined;
  // after() hands the follow-ups to the platform's waitUntil, so Vercel keeps the function
  // alive (within maxDuration) after the response. Each is attempted once and never replayed.
  after(async () => {
    const once = async (kind: 'confirmation' | 'advertising', send: () => Promise<{ ok?: boolean; skipped?: boolean }>) => {
      try {
        const outcome = await send();
        if (!outcome.ok && !outcome.skipped) console.error('[Lead] downstream_delivery_failed', { kind });
      } catch { console.error('[Lead] downstream_delivery_unconfirmed', { kind }); }
    };
    const tasks: Promise<void>[] = [];
    if (confirm) tasks.push(once('confirmation', () => sendLeadConfirmation(lead)));
    if (advertise) tasks.push(once('advertising', () => sendMetaCapiEvent(metaLeadEvent(lead, eventId, { ip, userAgent, cookies }))));
    await Promise.allSettled(tasks);
  });
  return NextResponse.json(accepted);
}
