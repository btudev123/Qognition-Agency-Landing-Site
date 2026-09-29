'use client';

import { useState, useRef, useEffect, useId, type FormEvent } from 'react';
import { usePathname } from 'next/navigation';
import { contactSchema, type SpokeId, type LeadIntent, type LeadPayload } from '../../lib/validation';
import { getAttribution, newEventId, track } from '../../lib/analytics';
import { CONSENT_POLICY_VERSION, effectiveConsent } from '../../lib/consent';
import { leadCopy, resolveLeadLocale, type LeadLocale } from '../../lib/leadCopy';
import { BOOKING_LINK } from '../../data/siteConfig';
import Button from '../ui/Button';

interface LeadFormProps {
  spoke: SpokeId;
  intent: LeadIntent;
  sourcePage: string;
  ctaLabel?: string;
  qualifyingQuestion?: string;
  onSuccess?: () => void;
  className?: string;
  locale?: LeadLocale;
  context?: LeadPayload['context'];
}

export default function LeadForm({ spoke, intent, sourcePage, ctaLabel, qualifyingQuestion, onSuccess, className = '', locale: localeProp, context }: LeadFormProps) {
  const pathname = usePathname();
  const id = useId();
  const [locale, setLocale] = useState<LeadLocale>(localeProp || resolveLeadLocale(sourcePage.split('/')[1]));
  const [contact, setContact] = useState({ name: '', email: '', company: '', company_url: '', message: '' });
  const [qualification, setQualification] = useState<NonNullable<LeadPayload['qualification']>>({});
  const [emailMarketing, setEmailMarketing] = useState(false);
  const [honeypot, setHoneypot] = useState('');
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [status, setStatus] = useState<'idle' | 'submitting' | 'success' | 'error'>('idle');
  const [serverError, setServerError] = useState('');
  const inFlight = useRef(false);
  const attempt = useRef<{ fingerprint: string; payload: LeadPayload } | null>(null);
  const formRef = useRef<HTMLFormElement>(null);
  const successRef = useRef<HTMLDivElement>(null);
  useEffect(() => { setLocale(localeProp || resolveLeadLocale(pathname?.split('/')[1])); }, [localeProp, pathname]);
  useEffect(() => { if (status === 'success') successRef.current?.focus(); }, [status]);
  const c = leadCopy(locale);
  const fieldClass = 'w-full rounded-lg border border-[var(--border)] bg-[var(--surface)] px-3 py-3 text-sm text-[var(--text)] outline-none focus:ring-2 focus:ring-[var(--accent)]';

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
    const preferences = effectiveConsent();
    const source = window.location.pathname || sourcePage;
    const fingerprint = JSON.stringify({ contact: validated.data, qualification, emailMarketing, source, preferences, context });
    if (!attempt.current || attempt.current.fingerprint !== fingerprint) {
      const attribution = getAttribution();
      const submissionId = newEventId();
      attempt.current = { fingerprint, payload: {
        service: spoke, intent, source_page: source,
        submission_id: submissionId, event_id: submissionId,
        contact: validated.data, honeypot, attribution, utm: attribution?.first_touch,
        context: { ...context, locale, page_id: context?.page_id || sourcePage, stage: context?.stage || (intent === 'newsletter' ? 'tofu' : 'bofu') },
        qualification: { ...qualification, revenue_basis: 'annual-revenue' },
        consent: { email_marketing: emailMarketing, analytics: preferences?.analytics === true, advertising: preferences?.advertising === true, policy_version: CONSENT_POLICY_VERSION, recorded_at: new Date().toISOString() },
      } };
    }
    track('lead_submit_attempt', { intent, source_page: source, locale });
    try {
      const response = await fetch('/api/lead', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(attempt.current.payload) });
      const result = await response.json().catch(() => ({}));
      if (!response.ok || result.success !== true) {
        if (response.status === 409) attempt.current = null;
        setServerError(c.failed);
        setStatus('error');
        return;
      }
      if (!result.duplicate) track('lead_submit_success', { intent, source_page: source, locale }, { event: 'Lead', eventId: result.event_id || attempt.current.payload.event_id, params: { lead_intent: intent } });
      setStatus('success');
      onSuccess?.();
    } catch { setServerError(c.failed); setStatus('error'); }
    finally { inFlight.current = false; }
  }

  if (status === 'success') return <div ref={successRef} tabIndex={-1} role="status" aria-live="polite" className={`rounded-xl border border-[var(--border)] bg-[var(--card-bg)] p-8 ${className}`} dir={locale === 'ar' ? 'rtl' : undefined}>
    <h3 className="text-h3 mb-3 font-semibold">{c.received}</h3><p className="text-body mb-6">{c.next}</p><a href={BOOKING_LINK} className="inline-block rounded-full bg-[var(--accent)] px-5 py-3 text-sm font-medium text-[var(--accent-deep)]">{c.booking}</a>
  </div>;

  return <form ref={formRef} onSubmit={submit} className={`space-y-5 ${className}`} noValidate dir={locale === 'ar' ? 'rtl' : undefined}>
    <div className="absolute opacity-0 pointer-events-none" aria-hidden="true"><input name="website_trap" type="text" tabIndex={-1} autoComplete="off" value={honeypot} onChange={e => setHoneypot(e.target.value)} /></div>
    {(['name', 'email', 'company', 'company_url'] as const).map(field => <div key={field}>
      <label htmlFor={`${id}-${field}`} className="mb-1 block text-sm font-medium">{field === 'company_url' ? c.website : c[field]}{['name', 'email'].includes(field) ? ' *' : ''}</label>
      <input id={`${id}-${field}`} name={field} type={field === 'email' ? 'email' : field === 'company_url' ? 'url' : 'text'} dir={field === 'email' || field === 'company_url' ? 'ltr' : undefined} value={contact[field]} onChange={e => setContact(current => ({ ...current, [field]: e.target.value }))} autoComplete={field === 'name' ? 'name' : field === 'email' ? 'email' : field === 'company' ? 'organization' : 'url'} required={['name', 'email'].includes(field)} aria-invalid={Boolean(errors[field])} aria-describedby={errors[field] ? `${id}-${field}-error` : undefined} className={fieldClass} />
      {errors[field] && <p id={`${id}-${field}-error`} className="text-meta mt-1 text-red-700">{errors[field]}</p>}
    </div>)}
    <div><label htmlFor={`${id}-message`} className="mb-1 block text-sm font-medium">{qualifyingQuestion || c.message}</label><textarea id={`${id}-message`} name="message" value={contact.message} onChange={e => setContact(current => ({ ...current, message: e.target.value }))} className={fieldClass} rows={3} maxLength={5000} /></div>
    <details className="rounded-lg border border-[var(--border)] p-4"><summary className="cursor-pointer text-sm font-medium">{c.details}</summary><div className="mt-4 space-y-4">
      <label className="block text-sm">{c.model}<select className={`${fieldClass} mt-1`} value={qualification.business_model || 'unknown'} onChange={e => setQualification(q => ({ ...q, business_model: e.target.value as NonNullable<LeadPayload['qualification']>['business_model'] }))}><option value="unknown">{c.unknown}</option><option value="b2b">B2B</option><option value="b2c">B2C</option><option value="mixed">{c.mixed}</option></select></label>
      <label className="block text-sm">{c.employees}<select className={`${fieldClass} mt-1`} value={qualification.employee_band || 'unknown'} onChange={e => setQualification(q => ({ ...q, employee_band: e.target.value as NonNullable<LeadPayload['qualification']>['employee_band'] }))}><option value="unknown">{c.unknown}</option>{['1-19', '20-99', '100-300', '301+'].map(v => <option key={v} value={v}>{v}</option>)}</select></label>
      <label className="block text-sm">{c.revenue}<select className={`${fieldClass} mt-1`} value={qualification.revenue_band || 'unknown'} onChange={e => setQualification(q => ({ ...q, revenue_band: e.target.value as NonNullable<LeadPayload['qualification']>['revenue_band'] }))}><option value="unknown">{c.unknown}</option>{[['under-3m', '< $3M'], ['3m-10m', '$3M-$10M'], ['10m-50m', '$10M-$50M'], ['50m-500m', '$50M-$500M'], ['over-500m', '> $500M']].map(([v, label]) => <option key={v} value={v}>{label}</option>)}</select></label>
    </div></details>
    <label className="flex items-start gap-3 text-sm"><input type="checkbox" checked={emailMarketing} onChange={e => setEmailMarketing(e.target.checked)} className="mt-1" /><span>{c.marketing}</span></label>
    {errors.consent && <p className="text-meta text-red-700">{errors.consent}</p>}
    {serverError && <div role="alert" className="rounded-lg border border-red-300 p-3 text-sm">{serverError} <a className="underline" href={BOOKING_LINK}>{c.booking}</a></div>}
    <Button type="submit" className="w-full" size="lg" disabled={status === 'submitting'}>{status === 'submitting' ? c.sending : ctaLabel || (intent === 'audit' ? c.audit : c.send)}</Button>
    <p className="text-meta">{c.note} <a href="/legal/privacy" className="underline">{c.privacy}</a></p>
  </form>;
}
