import type { LeadPayload } from './validation';
import { leadCopy } from './leadCopy';
import { BOOKING_LINK } from '../data/siteConfig';

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
 * Last-resort record of a lead that reached no delivery channel.
 *
 * Resend fails silently by design so a prospect never sees an error — which is
 * exactly how leads went missing unnoticed. There is no external store here, so
 * the record is a structured log line: it is greppable in the platform logs and
 * carries every field needed to contact the person by hand.
 *
 * This is a backstop, not a recovery queue. Nothing replays it automatically.
 */
export function recordFailedLead(lead: LeadPayload, failures: Record<string, string | undefined>) {
  console.error(
    '[Lead] UNDELIVERED_LEAD',
    JSON.stringify({
      failedAt: new Date().toISOString(),
      name: lead.contact.name,
      email: lead.contact.email,
      phone: lead.contact.phone,
      company: lead.contact.company,
      company_url: lead.contact.company_url,
      message: lead.contact.message,
      service: lead.service,
      intent: lead.intent,
      source_page: lead.source_page,
      failures,
    }),
  );
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
  const c = leadCopy(lead.context?.locale || 'en');
  return `<div lang="${lead.context?.locale || 'en'}" dir="${lead.context?.locale === 'ar' ? 'rtl' : 'ltr'}" style="font-family:Arial,sans-serif;max-width:560px;margin:auto;padding:32px"><h1>${escapeHtml(c.received)}</h1><p>${escapeHtml(c.next)}</p><a href="${BOOKING_LINK}">${escapeHtml(c.booking)}</a><p>Qognition Agency</p></div>`;
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
    signal: AbortSignal.timeout(10_000),
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
  const subject = leadCopy(lead.context?.locale || 'en').received;

  return sendResendEmail({
    to: lead.contact.email,
    subject,
    html: leadConfirmationHtml(lead),
  });
}
