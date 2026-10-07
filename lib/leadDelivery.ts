import type { LeadPayload, ServerConsentEvidence } from './validation';
import { leadCopy } from './leadCopy';
import { BOOKING_LINK, CONTACT_EMAIL } from '../data/siteConfig';

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

/** Allowlisted diagnostics only. Enquiry contents belong in GHL, never logs. */
export function recordFailedLead(_lead: LeadPayload, failures: Record<string, string | undefined>) {
  const allowed = new Set(['not_configured', 'misconfigured', 'ledger_unavailable', 'unavailable', 'invalid_response', 'submission_conflict', 'busy', 'lease_lost', 'reconciliation_required']);
  console.error('[Lead] capture_failed', { codes: [...new Set(Object.values(failures).map(code => code && allowed.has(code) ? code : 'unavailable'))] });
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

const row = (label: string, value: string) =>
  `<tr><td style="padding:8px 12px;color:#6b7280;font-size:13px;font-weight:600;text-transform:uppercase;letter-spacing:0.5px">${escapeHtml(label)}</td><td style="padding:8px 12px;font-size:15px">${escapeHtml(value)}</td></tr>`;
// Marketing email is a request until double opt-in confirms it; see .env.example.
const consentLabel = (value: boolean | undefined) => value === true ? 'yes (opt-in requested)' : value === false ? 'no' : 'not recorded';
// Cookie categories: a yes is only "explicit" when the visitor chose it; otherwise it is the region default.
const cookieConsentLabel = (value: boolean | undefined, basis: ServerConsentEvidence['basis']) =>
  value === false ? 'no' : value !== true ? 'not recorded' : basis === 'explicit' ? 'explicit yes' : basis === 'region_default' ? 'region default' : 'yes (basis not recorded)';
const BASIS_LABELS: Record<ServerConsentEvidence['basis'], string> = { explicit: 'explicit', region_default: 'region default', unknown: 'not recorded' };

function leadNotificationHtml(lead: LeadPayload, evidence: ServerConsentEvidence): string {
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
      ${row('Submission', lead.submission_id || 'not supplied')}
      ${row('Marketing email', consentLabel(lead.consent?.email_marketing))}
      ${row('Analytics', cookieConsentLabel(lead.consent?.analytics, evidence.basis))}
      ${row('Advertising', cookieConsentLabel(lead.consent?.advertising, evidence.basis))}
      ${row('Consent basis', BASIS_LABELS[evidence.basis])}
      ${row('Visitor country', evidence.country || 'unknown')}
      ${row('Global Privacy Control', evidence.gpc ? 'yes (advertising withheld)' : 'no')}
      ${row('Consent policy', lead.consent?.policy_version || 'not recorded')}
      ${row('Consent recorded', lead.consent?.recorded_at || (evidence.basis === 'region_default' ? 'no explicit choice' : 'not recorded'))}
    </table>
    ${lead.contact.message ? `<div style="background:#f9fafb;padding:16px;border-radius:8px;margin-bottom:24px"><p style="color:#6b7280;font-size:12px;font-weight:600;text-transform:uppercase;letter-spacing:0.5px;margin:0 0 8px">Message</p><p style="margin:0;font-size:14px;line-height:1.6">${escapeHtml(lead.contact.message)}</p></div>` : ''}
    ${lead.utm?.source ? `<div style="font-size:12px;color:#9ca3af;margin-bottom:16px">UTM: ${escapeHtml([lead.utm.source, lead.utm.medium, lead.utm.campaign, lead.utm.term, lead.utm.content].filter(Boolean).join(' / '))}</div>` : ''}
    <a href="mailto:${escapeHtml(lead.contact.email)}" style="display:inline-block;background:#14B8A6;color:#fff;padding:12px 24px;border-radius:8px;text-decoration:none;font-weight:600;font-size:14px">Reply to ${escapeHtml(lead.contact.name.split(' ')[0])}</a>
  </div>
</div>`;
}

// TODO(operator): postal address for CASL. Supply it before any non-transactional send;
// never render a placeholder in its place.
const CONFIRMATION_FOOTER = `<p style="margin-top:32px;font-size:12px;color:#6b7280">Qognition Agency | <a href="mailto:${CONTACT_EMAIL}" style="color:#6b7280">${CONTACT_EMAIL}</a></p><p style="font-size:12px;color:#6b7280">You received this because this address was used to submit an enquiry on qognitionagency.com. If that wasn't you, ignore this email.</p>`;

function leadConfirmationHtml(lead: LeadPayload): string {
  const c = leadCopy(lead.context?.locale || 'en');
  return `<div lang="${lead.context?.locale || 'en'}" dir="${lead.context?.locale === 'ar' ? 'rtl' : 'ltr'}" style="font-family:Arial,sans-serif;max-width:560px;margin:auto;padding:32px"><h1>${escapeHtml(c.received)}</h1><p>${escapeHtml(c.next)}</p><a href="${BOOKING_LINK}">${escapeHtml(c.booking)}</a>${CONFIRMATION_FOOTER}</div>`;
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
    console.error('[Lead] email_skipped', { reason: !apiKey ? 'missing_api_key' : 'missing_from' });
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
    // Resend's `message` can echo recipients, so only the status and the error class are logged.
    const name = typeof data?.name === 'string' && /^[a-z_]{1,64}$/.test(data.name) ? data.name : 'unknown';
    console.error('[Lead] email_rejected', { status: response.status, name });
    return { ok: false, skipped: false, status: response.status, error: 'Email provider rejected delivery.' };
  }

  return { ok: true, skipped: false, status: response.status, data };
}

/** Visitor text in a header: no control or line-separator characters, so nothing can inject a header. */
const subjectText = (value: string) => value.replace(/[\u0000-\u001f\u007f\u2028\u2029]/g, '').replace(/\s+/g, ' ').trim();

export async function sendLeadNotification(lead: LeadPayload, evidence: ServerConsentEvidence = { basis: lead.consent?.basis || 'unknown', country: null, gpc: false }) {
  const subject = `[${lead.service}] ${subjectText(lead.contact.name)}: ${lead.intent} from ${subjectText(lead.source_page)}`.slice(0, 120);
  return sendResendEmail({
    to: notifyEmailAddress(),
    subject,
    html: leadNotificationHtml(lead, evidence),
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
