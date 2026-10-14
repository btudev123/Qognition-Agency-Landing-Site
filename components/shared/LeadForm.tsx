'use client';

import { useState, useRef, useEffect, useId, type FormEvent } from 'react';
import { usePathname } from 'next/navigation';
import { contactSchema, type SpokeId, type LeadIntent, type LeadPayload } from '../../lib/validation';
import { getAttribution, newEventId, track } from '../../lib/analytics';
import { CONSENT_POLICY_VERSION, consentEvidence } from '../../lib/consent';
import { leadCopy, resolveLeadLocale, type LeadLocale } from '../../lib/leadCopy';
import { appendFunnelContext, readFunnelContext, type FunnelContext } from '../../lib/funnelContext';
import Button from '../ui/Button';

interface LeadFormProps {
  spoke: SpokeId;
  intent: LeadIntent;
  sourcePage: string;
  ctaLabel?: string;
  /** Ignored. The message label is fixed: "What do you want help with?" (leadCopy `message`).
   *  Kept only so the retired, unreachable components/spokes/SpokeHomepage.tsx still type-checks. */
  qualifyingQuestion?: string;
  onSuccess?: () => void;
  className?: string;
  locale?: LeadLocale;
  context?: LeadPayload['context'];
}

type EmployeeBand = NonNullable<NonNullable<LeadPayload['qualification']>['employee_band']>;

/** The qualification block every submission sends. Company size is the one asked
 *  question; business model and revenue are no longer asked, so they go as 'unknown',
 *  the value an untouched select always meant. Pinned by scripts/check-funnel.cjs. */
export function enquiryQualification(employeeBand: EmployeeBand): NonNullable<LeadPayload['qualification']> {
  return { business_model: 'unknown', employee_band: employeeBand, revenue_band: 'unknown', revenue_basis: 'annual-revenue' };
}

/** Which language the form speaks. An explicit prop wins, then the funnel context
 *  (/contact?locale=de from a translated page), then the first path segment. Before
 *  2026-10-14 the context was skipped, so /contact always resolved 'en': English labels,
 *  no RTL for Arabic, an English confirmation email and 'en' on the lead record (Owen F1). */
export function resolveFormLocale(localeProp: LeadLocale | undefined, contextLocale: string | undefined, path: string | null | undefined): LeadLocale {
  if (localeProp) return localeProp;
  if (contextLocale && resolveLeadLocale(contextLocale) === contextLocale) return contextLocale as LeadLocale;
  return resolveLeadLocale(path?.split('/')[1]);
}

/** The context a submission carries. `locale` is the resolved form locale, so it equals
 *  the context locale whenever one was supplied. */
export function submissionContextFor({ inherited, context, locale, sourcePage, intent }: {
  inherited?: FunnelContext; context?: LeadPayload['context']; locale: LeadLocale; sourcePage: string; intent: LeadIntent;
}): NonNullable<LeadPayload['context']> {
  return { ...inherited, ...context, locale, page_id: context?.page_id || inherited?.page_id || sourcePage, stage: context?.stage || inherited?.stage || (intent === 'newsletter' ? 'tofu' as const : 'bofu' as const) };
}

/* Five fields, operator 2026-10-14: name, work email, company website, one message
 * and company size. Only /contact renders this form (scripts/check-funnel.cjs).
 *
 * The removed fields keep their keys in the payload with the defaults an untouched
 * form always sent: contact.company '', business_model and revenue_band 'unknown',
 * consent.email_marketing false. The newsletter opt-in checkbox renders only on
 * intent="newsletter", because the server rejects a newsletter lead without it. */
export default function LeadForm({ spoke, intent, sourcePage, ctaLabel, onSuccess, className = '', locale: localeProp, context }: LeadFormProps) {
  const pathname = usePathname();
  const id = useId();
  const [locale, setLocale] = useState<LeadLocale>(resolveFormLocale(localeProp, context?.locale, sourcePage));
  const [contact, setContact] = useState({ name: '', email: '', company: '', company_url: '', message: '' });
  const [employeeBand, setEmployeeBand] = useState<EmployeeBand>('unknown');
  const [emailMarketing, setEmailMarketing] = useState(false);
  const [honeypot, setHoneypot] = useState('');
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [status, setStatus] = useState<'idle' | 'submitting' | 'success' | 'error' | 'preview'>('idle');
  const [serverError, setServerError] = useState('');
  const [bookingHref, setBookingHref] = useState('/book');
  useEffect(() => { setBookingHref(appendFunnelContext('/book', { ...readFunnelContext(new URLSearchParams(window.location.search)), ...context, page_id: context?.page_id || sourcePage })); }, [context, sourcePage]);
  const inFlight = useRef(false);
  const attempt = useRef<{ fingerprint: string; payload: LeadPayload } | null>(null);
  const formRef = useRef<HTMLFormElement>(null);
  const successRef = useRef<HTMLDivElement>(null);
  useEffect(() => { setLocale(resolveFormLocale(localeProp, context?.locale, pathname)); }, [localeProp, context?.locale, pathname]);
  useEffect(() => { if (status === 'success') successRef.current?.focus(); }, [status]);
  const c = leadCopy(locale);
  // Ring is --accent-deep (5.47:1), never --accent (2.49:1, fails SC 1.4.11). CLAUDE.md §9.
  const fieldClass = 'w-full rounded-lg border border-[var(--border-strong)] bg-[var(--surface)] px-3 py-3 text-sm text-[var(--text)] outline-none focus:ring-2 focus:ring-[var(--accent-deep)]';

  async function submit(event: FormEvent) {
    event.preventDefault();
    if (inFlight.current) return;
    const validated = contactSchema.safeParse({ ...contact, name: contact.name.trim(), email: contact.email.trim() });
    if (!validated.success) {
      const invalid = Object.fromEntries(validated.error.issues.map(issue => [String(issue.path[0]), c.validation]));
      setErrors(invalid);
      formRef.current?.querySelector<HTMLInputElement>(`[name="${Object.keys(invalid)[0]}"]`)?.focus();
      return;
    }
    if (intent === 'newsletter' && !emailMarketing) { setErrors({ consent: c.marketing }); return; }
    setErrors({});
    setServerError('');
    inFlight.current = true;
    setStatus('submitting');
    const preferences = consentEvidence();
    const source = window.location.pathname || sourcePage;
    const inherited = readFunnelContext(new URLSearchParams(window.location.search));
    const submissionContext = submissionContextFor({ inherited, context, locale, sourcePage, intent });
    const qualification = enquiryQualification(employeeBand);
    const fingerprint = JSON.stringify({ contact: validated.data, qualification, emailMarketing, source, preferences, context: submissionContext });
    if (!attempt.current || attempt.current.fingerprint !== fingerprint) {
      const attribution = getAttribution();
      const submissionId = newEventId();
      attempt.current = { fingerprint, payload: {
        service: spoke, intent, source_page: source,
        submission_id: submissionId, event_id: submissionId,
        contact: validated.data, hp_field_q: honeypot, attribution, utm: attribution?.first_touch,
        context: submissionContext,
        qualification,
        consent: { email_marketing: emailMarketing, analytics: preferences.analytics, advertising: preferences.advertising, basis: preferences.basis, policy_version: CONSENT_POLICY_VERSION, recorded_at: preferences.recorded_at },
      } };
    }
    track('lead_submit_attempt', { intent, source_page: source, locale });
    try {
      const response = await fetch('/api/lead', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(attempt.current.payload) });
      const result = await response.json().catch(() => ({}));
      if (result.status === 'validated' && process.env.NEXT_PUBLIC_QOGNITION_PREVIEW === '1') {
        setServerError('Preview test validated. No enquiry was sent and no marketing workflow was started.');
        setStatus('preview');
        return;
      }
      if (!response.ok || result.success !== true) {
        if (response.status === 409) attempt.current = null;
        setServerError(c.failed);
        setStatus('error');
        return;
      }
      // Success is success===true on a 2xx, whatever `status` says. /api/lead
      // reports it only once Resend accepts the notification (operator, 2026-10-14).
      // contact_submitted is the canonical §8 name. lead_submit_success stays
      // for one release so GA4 history joins up; only it mirrors to Meta, so the
      // pixel still counts one Lead per submission. Neither carries PII.
      if (!result.duplicate) {
        track('lead_submit_success', { intent, source_page: source, locale }, { event: 'Lead', eventId: result.event_id || attempt.current.payload.event_id, params: { lead_intent: intent } });
        track('contact_submitted', { intent, source_page: source, locale, lead_status: typeof result.status === 'string' ? result.status : 'unknown' });
      }
      setStatus('success');
      onSuccess?.();
    } catch { setServerError(c.failed); setStatus('error'); }
    finally { inFlight.current = false; }
  }

  if (status === 'success') return <div ref={successRef} tabIndex={-1} role="status" aria-live="polite" className={`rounded-xl border border-[var(--border)] bg-[var(--card-bg)] p-8 ${className}`} dir={locale === 'ar' ? 'rtl' : undefined}>
    <h3 className="text-h3 mb-3 font-semibold">{c.received}</h3><p className="text-body mb-6">{c.next}</p><a href={bookingHref} className="inline-block rounded-full bg-[var(--btn-primary-bg)] px-5 py-3 text-sm font-medium text-[var(--btn-primary-fg)]">{c.booking}</a>
  </div>;

  return <form ref={formRef} data-clarity-mask="true" onSubmit={submit} className={`space-y-5 ${className}`} noValidate dir={locale === 'ar' ? 'rtl' : undefined}>
    <p className="text-meta m-0 text-[var(--text-muted)]" aria-hidden="true">* {c.required}</p>
    <div className="absolute opacity-0 pointer-events-none" aria-hidden="true"><input name="hp_field_q" type="text" tabIndex={-1} autoComplete="off" value={honeypot} onChange={e => setHoneypot(e.target.value)} /></div>
    {(['name', 'email', 'company_url'] as const).map(field => <div key={field}>
      <label htmlFor={`${id}-${field}`} className="mb-1 block text-sm font-medium">{field === 'company_url' ? c.website : c[field]}{field !== 'company_url' && <span aria-hidden="true"> *</span>}</label>
      <input id={`${id}-${field}`} name={field} type={field === 'email' ? 'email' : field === 'company_url' ? 'url' : 'text'} dir={field === 'name' ? undefined : 'ltr'} value={contact[field]} onChange={e => setContact(current => ({ ...current, [field]: e.target.value }))} autoComplete={field === 'name' ? 'name' : field === 'email' ? 'email' : 'url'} required={field !== 'company_url'} aria-invalid={Boolean(errors[field])} aria-describedby={errors[field] ? `${id}-${field}-error` : undefined} className={fieldClass} />
      {errors[field] && <p id={`${id}-${field}-error`} className="text-meta mt-1 text-red-700">{errors[field]}</p>}
    </div>)}
    <div><label htmlFor={`${id}-message`} className="mb-1 block text-sm font-medium">{c.message}</label><textarea id={`${id}-message`} name="message" value={contact.message} onChange={e => setContact(current => ({ ...current, message: e.target.value }))} className={fieldClass} rows={4} maxLength={5000} /></div>
    <div><label htmlFor={`${id}-employee_band`} className="mb-1 block text-sm font-medium">{c.employees}</label><select id={`${id}-employee_band`} name="employee_band" className={fieldClass} value={employeeBand} onChange={e => setEmployeeBand(e.target.value as typeof employeeBand)}><option value="unknown">{c.unknown}</option>{(['1-19', '20-99', '100-300', '301+'] as const).map(v => <option key={v} value={v}>{v}</option>)}</select></div>
    {intent === 'newsletter' && <label className="flex items-start gap-3 text-sm"><input type="checkbox" name="email_marketing" checked={emailMarketing} onChange={e => setEmailMarketing(e.target.checked)} aria-describedby={errors.consent ? `${id}-consent-error` : undefined} className="mt-1" /><span>{c.marketing}</span></label>}
    {errors.consent && <p id={`${id}-consent-error`} className="text-meta text-red-700">{errors.consent}</p>}
    {serverError && <div role={status === 'preview' ? 'status' : 'alert'} className={`rounded-lg border p-3 text-sm ${status === 'preview' ? 'border-[var(--border)]' : 'border-red-300'}`}>{serverError} {status !== 'preview' && <a className="underline" href={bookingHref}>{c.booking}</a>}</div>}
    <Button type="submit" className="w-full" size="lg" disabled={status === 'submitting'}>{status === 'submitting' ? c.sending : ctaLabel || (intent === 'audit' ? c.audit : c.send)}</Button>
    <p className="text-meta">{c.note} <a href="/legal/privacy" className="underline">{c.privacy}</a></p>
  </form>;
}
