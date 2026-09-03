import { NextRequest, NextResponse, after } from 'next/server';
import { randomUUID } from 'crypto';
import { leadSchema, type LeadPayload } from '../../../lib/validation';
import {
  sendLeadNotification,
  sendLeadConfirmation,
  sendResendEmail,
  recordFailedLead,
  withNotifyCopy,
} from '../../../lib/leadDelivery';
import {
  checkAuditRateLimit,
  getAuditClientIp,
  getAuditDeviceCookie,
  releaseAuditRateLimit,
} from '../../../lib/auditRateLimit';
import { sendMetaCapiEvent, metaCookiesFromRequest } from '../../../lib/metaCapi';
import { auditTypeForSourcePage, runAudit, reportEmailHtml } from '../../../lib/auditEngine';
import { buildAuditReportPdf } from '../../../lib/auditPdf';

export const dynamic = 'force-dynamic';

const SITE_ORIGIN = 'https://www.qognitionagency.com';

type DeliveryResult = { ok: boolean; skipped: boolean; status: number; error?: string };

const FAILED = (error: string): DeliveryResult => ({ ok: false, skipped: false, status: 500, error });

/** Unwrap allSettled so an unexpected throw becomes a reportable failure, not a 500. */
const settled = (result: PromiseSettledResult<DeliveryResult>): DeliveryResult =>
  result.status === 'fulfilled'
    ? result.value
    : FAILED(result.reason instanceof Error ? result.reason.message : 'Unexpected delivery error.');

/** A channel that was never attempted because it is unconfigured is not a failure. */
const isFailure = (result: DeliveryResult) => !result.ok && !result.skipped;

const logFailure = (channel: string, result: DeliveryResult, lead: LeadPayload) => {
  if (!isFailure(result)) return;
  console.error(
    '[Lead] delivery_failure',
    JSON.stringify({
      channel,
      status: result.status,
      error: result.error,
      email: lead.contact.email,
      source_page: lead.source_page,
    }),
  );
};

export async function POST(request: NextRequest) {
  try {
    const body = await request.json().catch(() => null);
    if (!body || typeof body !== 'object') {
      return NextResponse.json({ error: 'Invalid request body.' }, { status: 400 });
    }

    const parsed = leadSchema.safeParse(body);
    if (!parsed.success) {
      const errors = parsed.error.flatten().fieldErrors;
      return NextResponse.json({ error: 'Validation failed.', fields: errors }, { status: 400 });
    }

    const lead = parsed.data;

    if (lead.honeypot && lead.honeypot.length > 0) {
      return NextResponse.json({ success: true, message: 'Thank you.' }, { status: 200 });
    }

    // Only the audit funnel gets the strict daily policy — a contact message
    // must never be refused because a stranger on the same office IP or
    // mobile carrier NAT happened to write to us first.
    const rateLimit = checkAuditRateLimit(
      request,
      lead.contact.email,
      lead.intent === 'audit' ? 'audit' : 'lead',
    );
    if (!rateLimit.allowed) {
      const response = NextResponse.json(
        {
          error:
            rateLimit.reason === 'burst'
              ? 'Too many submissions from your network right now. Please try again in a few minutes, or email hello@qognitionagency.com.'
              : rateLimit.policy === 'audit'
                ? 'We already have an audit request for this email. We will be in touch — or email hello@qognitionagency.com if it is urgent.'
                : 'We just received your message. Give us a moment before sending another.',
          retryAfterSeconds: rateLimit.retryAfterSeconds,
        },
        {
          status: 429,
          headers: { 'Retry-After': String(rateLimit.retryAfterSeconds) },
        },
      );
      response.cookies.set(getAuditDeviceCookie(), rateLimit.deviceId, {
        maxAge: 60 * 60 * 24 * 365,
        httpOnly: true,
        sameSite: 'lax',
        secure: process.env.NODE_ENV === 'production',
        path: '/',
      });
      return response;
    }

    const isAudit = lead.intent === 'audit';
    // An audit request that told us the site can get a real scored report,
    // generated after the response so the form is never held open for it.
    const auditUrl = isAudit ? lead.contact.company_url : undefined;
    const runsInstantAudit = Boolean(auditUrl);

    // Same id the browser pixel used for its `Lead` event, so Meta dedups the pair.
    const eventId = lead.event_id || randomUUID();
    const metaCookies = metaCookiesFromRequest(request);
    const [firstName, ...restName] = lead.contact.name.trim().split(/\s+/);

    const [notifySettled, confirmSettled, capiSettled] = await Promise.allSettled([
      sendLeadNotification(lead),
      // When an instant report is coming, that email IS the confirmation.
      // Sending both would promise results in 48 hours moments before they arrive.
      runsInstantAudit
        ? Promise.resolve<DeliveryResult>({ ok: true, skipped: true, status: 202 })
        : sendLeadConfirmation(lead),
      sendMetaCapiEvent({
        eventName: 'Lead',
        eventId,
        eventSourceUrl: `${SITE_ORIGIN}${lead.source_page}`,
        userData: {
          email: lead.contact.email,
          phone: lead.contact.phone,
          firstName,
          lastName: restName.join(' ') || undefined,
          clientIp: getAuditClientIp(request),
          userAgent: request.headers.get('user-agent') || undefined,
          fbp: metaCookies.fbp,
          fbc: metaCookies.fbc,
        },
        customData: {
          content_name: lead.tag || lead.source_page,
          content_category: lead.service,
          lead_intent: lead.intent,
        },
      }),
    ]);

    const delivery = {
      notify: settled(notifySettled),
      confirm: settled(confirmSettled),
      capi: settled(capiSettled),
    };

    logFailure('resend_notification', delivery.notify, lead);
    logFailure('resend_confirmation', delivery.confirm, lead);
    logFailure('meta_capi', delivery.capi, lead);

    // The internal notification is the one that must land — it is the only
    // thing that puts this lead in front of a human. Park it if it did not.
    if (!delivery.notify.ok) {
      recordFailedLead(lead, {
        notify: delivery.notify.error,
        confirm: delivery.confirm.error,
      });
      // Nobody heard about this lead, so it must not cost them their retry.
      releaseAuditRateLimit(rateLimit);
    }


    if (runsInstantAudit && auditUrl) {
      after(() => deliverInstantAudit(lead, auditUrl));
    }

    const response = NextResponse.json({
      success: true,
      message: isAudit
        ? 'Audit request received. Expect results within 48 hours.'
        : 'Message received. Expect a response within one business day.',
      nextStep: isAudit ? { calendly: 'https://cal.com/qognition-agency/15min' } : undefined,
      event_id: eventId,
      delivery,
    });

    response.cookies.set(getAuditDeviceCookie(), rateLimit.deviceId, {
      maxAge: 60 * 60 * 24 * 365,
      httpOnly: true,
      sameSite: 'lax',
      secure: process.env.NODE_ENV === 'production',
      path: '/',
    });

    return response;
  } catch (error) {
    console.error('[Lead] Unhandled error:', error);
    return NextResponse.json({ error: 'Something went wrong. Please try again.' }, { status: 500 });
  }
}

/**
 * Score the lead's site and email them the report + PDF.
 *
 * Runs after the response via `after()` — the audit fetches the target page
 * plus its robots.txt, sitemap.xml and llm.txt, which is far too slow to hold a
 * form submission open for. If it fails, fall back to the standard confirmation
 * so the lead still hears from us.
 */
async function deliverInstantAudit(lead: LeadPayload, auditUrl: string) {
  try {
    const { report, offer } = await runAudit({
      url: auditUrl,
      email: lead.contact.email,
      auditType: auditTypeForSourcePage(lead.source_page),
    });

    const to = withNotifyCopy(lead.contact.email);

    const email = await sendResendEmail({
      to,
      subject: `Your Qognition ${offer.shortTitle} report: ${report.score}/100`,
      html: reportEmailHtml(report),
      attachments: [{ filename: report.pdfFilename, content: buildAuditReportPdf(report, offer) }],
    });

    logFailure('resend_audit_report', email, lead);

    // The report never landed — make sure they at least get the confirmation.
    if (isFailure(email)) await sendLeadConfirmation(lead);
  } catch (error) {
    console.error(
      '[Lead] instant_audit_failed',
      JSON.stringify({
        email: lead.contact.email,
        url: auditUrl,
        error: error instanceof Error ? error.message : String(error),
      }),
    );
    await sendLeadConfirmation(lead).catch(() => undefined);
  }
}
