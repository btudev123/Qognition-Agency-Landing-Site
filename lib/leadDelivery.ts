import type { LeadPayload } from './validation';
import { redisCommand } from './redis';

export const DEAD_LETTER_KEY = 'leads:deadletter';

/**
 * Where every lead, audit, and lead-magnet submission gets emailed.
 *
 * Hardcoded fallback on purpose: an unset or empty AUDIT_NOTIFY_EMAIL must
 * never mean "send the internal copy nowhere". Always resolve through this,
 * never `process.env.AUDIT_NOTIFY_EMAIL` directly.
 */
export const notifyEmailAddress = () =>
  process.env.AUDIT_NOTIFY_EMAIL || 'hello@qognitionagency.com';

/** Recipients for a report: the lead, plus our inbox (deduped). */
export const withNotifyCopy = (leadEmail: string) => {
  const notify = notifyEmailAddress();
  return notify.toLowerCase() === leadEmail.toLowerCase() ? [leadEmail] : [leadEmail, notify];
};

/**
 * Last-resort capture for a lead that reached no delivery channel.
 *
 * Resend fails silently by design so a prospect never sees an error — which is
 * exactly how leads went missing unnoticed. When delivery fails, park the raw
 * payload in Redis so it can be replayed instead of lost.
 * Best-effort: if Redis is unconfigured this is a no-op, and the structured
 * console.error in the route remains the backstop.
 */
export async function recordFailedLead(lead: LeadPayload, failures: Record<string, string | undefined>) {
  const entry = JSON.stringify({ lead, failures, failedAt: new Date().toISOString() });
  const result = await redisCommand(['LPUSH', DEAD_LETTER_KEY, entry]);
  if (result) {
    // Keep the queue bounded; the newest 500 are what anyone would ever replay.
    await redisCommand(['LTRIM', DEAD_LETTER_KEY, 0, 499]);
  }
  return Boolean(result);
}

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
  <div style="background:#14B8A6;padding:24px 32px">
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
        <td style="padding:8px 12px;font-size:15px"><a href="mailto:${escapeHtml(lead.contact.email)}" style="color:#14B8A6">${escapeHtml(lead.contact.email)}</a></td>
      </tr>
      ${lead.contact.company ? `<tr><td style="padding:8px 12px;color:#6b7280;font-size:13px;font-weight:600;text-transform:uppercase;letter-spacing:0.5px">Company</td><td style="padding:8px 12px;font-size:15px">${escapeHtml(lead.contact.company)}</td></tr>` : ''}
      ${lead.contact.company_url ? `<tr><td style="padding:8px 12px;color:#6b7280;font-size:13px;font-weight:600;text-transform:uppercase;letter-spacing:0.5px">Website</td><td style="padding:8px 12px;font-size:15px"><a href="${escapeHtml(lead.contact.company_url)}" style="color:#14B8A6">${escapeHtml(lead.contact.company_url)}</a></td></tr>` : ''}
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
    <a href="mailto:${escapeHtml(lead.contact.email)}" style="display:inline-block;background:#14B8A6;color:#fff;padding:12px 24px;border-radius:8px;text-decoration:none;font-weight:600;font-size:14px">Reply to ${escapeHtml(lead.contact.name.split(' ')[0])}</a>
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
    <div style="background:#14B8A6;width:48px;height:48px;border-radius:12px;display:inline-flex;align-items:center;justify-content:center;color:#fff;font-weight:900;font-size:24px;margin-bottom:16px">Q</div>
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
    ${isAudit ? `<a href="https://cal.com/qognition-agency/15min" style="display:inline-block;background:#14B8A6;color:#fff;padding:14px 32px;border-radius:8px;text-decoration:none;font-weight:600;font-size:15px">Book a strategy call now</a>` : ''}
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
  return sendResendEmail({
    to: notifyEmailAddress(),
    subject,
    html: leadNotificationHtml(lead),
  });
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
