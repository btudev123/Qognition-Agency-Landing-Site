import { NextRequest, NextResponse, after } from 'next/server';
import { randomUUID } from 'node:crypto';
import { leadSchema } from '../../../lib/validation';
import { captureLeadInCrm, LeadCrmError } from '../../../lib/leadCrm';
import { sendLeadNotification, sendLeadConfirmation, recordFailedLead } from '../../../lib/leadDelivery';
import { checkAuditRateLimit, getAuditClientIp, releaseAuditRateLimit } from '../../../lib/auditRateLimit';
import { sendMetaCapiEvent, metaCookiesFromRequest } from '../../../lib/metaCapi';

export const dynamic = 'force-dynamic';
export const maxDuration = 60;

export async function POST(request: NextRequest) {
  const raw = await request.text();
  if (raw.length > 40_000) return NextResponse.json({ error: 'Request is too large.' }, { status: 413 });
  let body: unknown;
  try { body = JSON.parse(raw); }
  catch { return NextResponse.json({ error: 'Invalid request body.' }, { status: 400 }); }
  const parsed = leadSchema.safeParse(body);
  if (!parsed.success) return NextResponse.json({ error: 'Please check the form fields.', fields: parsed.error.flatten().fieldErrors }, { status: 400 });
  const lead = parsed.data;
  if (lead.honeypot) return NextResponse.json({ success: true, message: 'Thank you.' });
  if (lead.intent === 'newsletter' && !lead.consent?.email_marketing) return NextResponse.json({ error: 'Please opt in to receive the newsletter.' }, { status: 400 });
  // Lost responses must be retryable; the agency-inbox receipt is the durable record.
  const rate = checkAuditRateLimit(request, lead.contact.email, 'lead', true);
  if (!rate.allowed) return NextResponse.json({ error: 'Too many requests. Please try again shortly.', retryAfterSeconds: rate.retryAfterSeconds }, { status: 429, headers: { 'Retry-After': String(rate.retryAfterSeconds) } });
  const eventId = lead.event_id || randomUUID();
  try {
    // Primary delivery: email the agency inbox. Required for acceptance.
    const notification = await sendLeadNotification(lead);

    // GoHighLevel is now optional. Capture best-effort as a fallback record so a
    // missing CRM never turns a real prospect away. Its duplicate flag also
    // suppresses the confirmation email and Meta event on a retry.
    let crmCaptured = false;
    let duplicate = false;
    let crmError: string | undefined;
    try {
      const captured = await captureLeadInCrm(lead);
      crmCaptured = Boolean(captured?.contactId);
      duplicate = Boolean(captured?.duplicate);
    } catch (error) {
      crmError = error instanceof LeadCrmError ? error.code : error instanceof Error ? error.message : 'unavailable';
    }

    const delivered = notification.ok || crmCaptured;
    if (!delivered) {
      releaseAuditRateLimit(rate);
      recordFailedLead(lead, {
        resend: notification.ok ? undefined : notification.error || 'not configured',
        ghl: crmCaptured ? undefined : crmError,
      });
      return NextResponse.json(
        { success: false, retryable: true, error: 'We could not confirm receipt of your request. Please try again, or book a call directly.' },
        { status: 503, headers: { 'Retry-After': '30' } },
      );
    }

    // Best-effort downstream tasks after durable delivery; this is not a replay queue.
    // A duplicate retry has already delivered these once, so skip them entirely.
    if (!duplicate) {
      const cookies = metaCookiesFromRequest(request);
      const ip = getAuditClientIp(request);
      const userAgent = request.headers.get('user-agent') || undefined;
      after(async () => {
        const tasks: Promise<unknown>[] = [sendLeadConfirmation(lead)];
        if (lead.consent?.advertising === true) {
          const [firstName, ...names] = lead.contact.name.trim().split(/\s+/);
          tasks.push(sendMetaCapiEvent({
            eventName: 'Lead', eventId,
            eventSourceUrl: `https://www.qognitionagency.com${lead.source_page.startsWith('/') ? lead.source_page : '/'}`,
            userData: { email: lead.contact.email, phone: lead.contact.phone, firstName, lastName: names.join(' ') || undefined, clientIp: ip, userAgent, ...cookies },
            customData: { content_category: lead.context?.pillar || lead.service, lead_intent: lead.intent },
          }));
        }
        const results = await Promise.allSettled(tasks);
        if (results.some(r => r.status === 'rejected' || (r.status === 'fulfilled' && (r.value as { ok?: boolean })?.ok === false))) console.error('[Lead] downstream_delivery_failed', { submission_id: lead.submission_id || eventId });
      });
    }

    return NextResponse.json({ success: true, status: 'captured', message: 'Your request has been received.', duplicate, submission_id: lead.submission_id || eventId, event_id: eventId });
  } catch (error) {
    releaseAuditRateLimit(rate);
    console.error('[Lead] capture_failed', { code: error instanceof LeadCrmError ? error.code : 'unavailable' });
    return NextResponse.json({ success: false, retryable: true, error: 'We could not confirm receipt of your request. Please try again, or book a call directly.' }, { status: 503, headers: { 'Retry-After': '30' } });
  }
}
