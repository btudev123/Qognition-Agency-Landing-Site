import { NextRequest, NextResponse } from 'next/server';
import { randomUUID } from 'crypto';
import { sendResendEmail, withNotifyCopy, notifyEmailAddress } from '../../../lib/leadDelivery';
import { buildAuditReportPdf } from '../../../lib/auditPdf';
import { AuditError, runAudit, reportEmailHtml } from '../../../lib/auditEngine';
import {
  checkAuditRateLimit,
  getAuditClientIp,
  getAuditDeviceCookie,
  recordAuditRateLimit,
} from '../../../lib/auditRateLimit';
import { sendMetaCapiEvent, metaCookiesFromRequest } from '../../../lib/metaCapi';
import { AuditType } from '../../../types';

export const dynamic = 'force-dynamic';

const esc = (v: string) =>
  v.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');

/** Internal "new lead" alert, so an agent-driven audit lands in the inbox like a form submission. */
const auditLeadAlertHtml = (
  email: string,
  report: { score: number; normalizedUrl: string; summary: string; recommendations: string[] },
  offerTitle: string,
  source?: unknown,
) => `
<div style="font-family:-apple-system,BlinkMacSystemFont,sans-serif;max-width:600px;margin:0 auto;background:#ffffff;border-radius:12px;overflow:hidden;border:1px solid #e5e7eb">
  <div style="background:#14B8A6;padding:24px 32px">
    <span style="color:#fff;font-size:20px;font-weight:700">Qognition</span>
    <span style="color:rgba(255,255,255,0.7);font-size:14px;margin-left:8px">New Audit Lead</span>
  </div>
  <div style="padding:32px">
    <p style="margin:0 0 16px;font-size:15px"><strong>${esc(offerTitle)}</strong> &mdash; scored <strong>${report.score}/100</strong></p>
    <table style="width:100%;border-collapse:collapse;margin-bottom:24px">
      <tr><td style="padding:8px 12px;color:#6b7280;font-size:13px;font-weight:600;text-transform:uppercase">Email</td><td style="padding:8px 12px;font-size:15px"><a href="mailto:${esc(email)}" style="color:#14B8A6">${esc(email)}</a></td></tr>
      <tr><td style="padding:8px 12px;color:#6b7280;font-size:13px;font-weight:600;text-transform:uppercase">Website</td><td style="padding:8px 12px;font-size:15px">${esc(report.normalizedUrl)}</td></tr>
      <tr><td style="padding:8px 12px;color:#6b7280;font-size:13px;font-weight:600;text-transform:uppercase">Source</td><td style="padding:8px 12px;font-size:15px">${esc(String(source || 'Instant Audit'))}</td></tr>
    </table>
    <div style="background:#f9fafb;padding:16px;border-radius:8px;margin-bottom:24px">
      <p style="color:#6b7280;font-size:12px;font-weight:600;text-transform:uppercase;margin:0 0 8px">Summary</p>
      <p style="margin:0;font-size:14px;line-height:1.6">${esc(report.summary)}</p>
    </div>
    <p style="color:#6b7280;font-size:12px;font-weight:600;text-transform:uppercase;margin:0 0 8px">Top recommendations</p>
    <ul style="margin:0 0 24px;padding-left:20px;font-size:14px;line-height:1.8">${report.recommendations.map((r) => `<li>${esc(r)}</li>`).join('')}</ul>
    <a href="mailto:${esc(email)}" style="display:inline-block;background:#14B8A6;color:#fff;padding:12px 24px;border-radius:8px;text-decoration:none;font-weight:600;font-size:14px">Reply to this lead</a>
  </div>
</div>`;

/**
 * Public instant-audit endpoint.
 *
 * Documented in /.well-known/openapi.json and exposed to AI agents via the
 * WebMCP `run_qognition_audit` tool. Human form submissions reach the same
 * scoring through /api/lead — both call lib/auditEngine so the report is
 * identical whichever door it comes in.
 */
export async function POST(request: NextRequest) {
  try {
    const payload = await request.json().catch(() => ({}));
    const auditType = (payload?.auditType || 'seo') as AuditType;
    const email = String(payload?.email || '').trim().toLowerCase();
    const urlValue = String(payload?.url || '').trim();

    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      return NextResponse.json({ error: 'A valid work email is required.' }, { status: 400 });
    }

    const rateLimit = await checkAuditRateLimit(request, email);
    if (!rateLimit.allowed) {
      const limited = NextResponse.json(
        {
          error:
            'You already requested an audit from this email, IP, or device today. Please try again tomorrow or book a strategy call.',
          retryAfterSeconds: rateLimit.retryAfterSeconds,
        },
        {
          status: 429,
          headers: { 'Retry-After': String(rateLimit.retryAfterSeconds) },
        },
      );
      limited.cookies.set(getAuditDeviceCookie(), rateLimit.deviceId, {
        maxAge: 60 * 60 * 24 * 365,
        httpOnly: true,
        sameSite: 'lax',
        secure: process.env.NODE_ENV === 'production',
        path: '/',
      });
      return limited;
    }

    const { report, offer } = await runAudit({ url: urlValue, email, auditType });

    const metaCookies = metaCookiesFromRequest(request);
    const pdf = buildAuditReportPdf(report, offer);

    // Two emails, same as every other capture path: the report to the
    // requester (copied to us), and a plain internal "new lead" alert so this
    // shows up in the inbox the same way a form submission does.
    const [resend, notify] = await Promise.all([
      sendResendEmail({
        to: withNotifyCopy(email),
        subject: `Your Qognition ${offer.shortTitle} report: ${report.score}/100`,
        html: reportEmailHtml(report),
        attachments: [{ filename: report.pdfFilename, content: pdf }],
      }),
      sendResendEmail({
        to: notifyEmailAddress(),
        subject: `[audit] ${email} — ${offer.shortTitle} ${report.score}/100 for ${report.normalizedUrl}`,
        html: auditLeadAlertHtml(email, report, offer.shortTitle, payload?.source),
      }),
    ]);

    if (!resend.ok && !resend.skipped) {
      console.error('[Audit] delivery_failure', JSON.stringify({ channel: 'resend_report', error: resend.error, email }));
    }
    if (!notify.ok && !notify.skipped) {
      console.error('[Audit] delivery_failure', JSON.stringify({ channel: 'resend_notify', error: notify.error, email }));
    }

    // No browser pixel on this path (it is called by agents and integrations),
    // so there is no twin event to dedup against — a fresh id is correct.
    await sendMetaCapiEvent({
      eventName: 'Lead',
      eventId: randomUUID(),
      eventSourceUrl: `https://www.qognitionagency.com/${offer.slug}`,
      userData: {
        email,
        clientIp: getAuditClientIp(request),
        userAgent: request.headers.get('user-agent') || undefined,
        fbp: metaCookies.fbp,
        fbc: metaCookies.fbc,
      },
      customData: { content_name: offer.slug, content_category: 'audit', audit_score: report.score },
    });

    await recordAuditRateLimit(rateLimit.keys);

    const response = NextResponse.json({
      ok: true,
      report,
      delivery: { resend, notify },
      rateLimit: { allowed: true, nextAuditAfterSeconds: 86400 },
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
    if (error instanceof AuditError) {
      return NextResponse.json({ error: error.message }, { status: error.status });
    }
    console.error('[Audit] Unhandled error:', error);
    return NextResponse.json({ error: 'Failed to run audit.' }, { status: 500 });
  }
}
