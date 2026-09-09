'use client';

import { useState, useRef, useEffect, type FormEvent } from 'react';
import type { SpokeId, LeadIntent } from '../../lib/validation';
import { contactSchema } from '../../lib/validation';
import { getUtmParams, newEventId, track } from '../../lib/analytics';
import Button from '../ui/Button';
import TallyForm, { isTallyConfigured } from './TallyForm';

interface LeadFormProps {
  spoke: SpokeId;
  intent: LeadIntent;
  sourcePage: string;
  ctaLabel?: string;
  qualifyingQuestion?: string;
  onSuccess?: () => void;
  className?: string;
}

export default function LeadForm({
  spoke,
  intent,
  sourcePage,
  ctaLabel,
  qualifyingQuestion,
  onSuccess,
  className = '',
}: LeadFormProps) {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [company, setCompany] = useState('');
  const [companyUrl, setCompanyUrl] = useState('');
  const [message, setMessage] = useState('');
  const [honeypot, setHoneypot] = useState('');
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [status, setStatus] = useState<'idle' | 'submitting' | 'success' | 'error'>('idle');
  const [serverError, setServerError] = useState('');
  // A 429 is not a breakage: it usually means the message already went
  // through. Shown as a calm notice so nobody re-clicks in a panic.
  const [serverNotice, setServerNotice] = useState('');
  const formRef = useRef<HTMLFormElement>(null);
  const successRef = useRef<HTMLDivElement>(null);
  const fieldRefs = {
    name: useRef<HTMLInputElement>(null),
    email: useRef<HTMLInputElement>(null),
    companyUrl: useRef<HTMLInputElement>(null),
  };
  // State updates are batched, so a second Enter press can re-enter
  // handleSubmit before `status` has committed. A ref settles it in the
  // same tick and stops the duplicate POST.
  const inFlight = useRef(false);

  // The form unmounts on success, so focus would otherwise fall to <body>
  // and a screen reader would never learn the submission worked.
  useEffect(() => {
    if (status === 'success') successRef.current?.focus();
  }, [status]);

  const isAudit = intent === 'audit';
  const defaultCta = isAudit
    ? 'Get My Free Audit'
    : intent === 'consultation'
      ? 'Book a Strategy Call'
      : intent === 'pricing'
        ? 'Get Pricing Details'
        : 'Send Message';

  const finalCta = ctaLabel || defaultCta;

  // Leads are delivered by Resend via /api/lead (notification + confirmation).
  // Tally stays available as an explicit opt-out for forms we want hosted
  // externally — set NEXT_PUBLIC_LEAD_TRANSPORT=tally to route through it.
  if (process.env.NEXT_PUBLIC_LEAD_TRANSPORT === 'tally' && isTallyConfigured()) {
    return (
      <TallyForm
        className={className}
        hidden={{ spoke, intent, source: sourcePage }}
      />
    );
  }

  const validate = () => {
    const normalizedCompanyUrl = companyUrl.trim();
    const result = contactSchema.safeParse({
      name,
      email,
      company: company || undefined,
      company_url: normalizedCompanyUrl || undefined,
      message: message || undefined,
    });
    if (!result.success) {
      const flat = result.error.flatten().fieldErrors;
      const errs: Record<string, string> = {};
      if (flat.name) errs.name = flat.name[0];
      if (flat.email) errs.email = flat.email[0];
      if (flat.company_url) errs.companyUrl = flat.company_url[0];
      setErrors(errs);
      // Send the caret to the problem instead of making them hunt for it.
      const firstBad = (['name', 'email', 'companyUrl'] as const).find((key) => errs[key]);
      if (firstBad) fieldRefs[firstBad].current?.focus();
      return null;
    }
    setErrors({});
    return result.data;
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    if (inFlight.current) return;

    const contact = validate();
    if (!contact) return;

    inFlight.current = true;
    setStatus('submitting');
    setServerError('');
    setServerNotice('');

    // Generated before the request so the browser pixel and the server-side
    // Conversions API call can both report this one action under the same id.
    // Meta then counts it once. See lib/metaCapi.ts.
    const eventId = newEventId();

    track('lead_submit_attempt', { spoke, intent, source_page: sourcePage });

    try {
      const res = await fetch('/api/lead', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          service: spoke,
          intent,
          source_page: sourcePage,
          event_id: eventId,
          utm: getUtmParams(),
          contact: {
            name: contact.name,
            email: contact.email,
            company: contact.company,
            company_url: contact.company_url,
            message: isAudit
              ? `${qualifyingQuestion || 'Biggest challenge'}: ${contact.message || '(not provided)'}`
              : contact.message,
          },
          honeypot,
          metadata: {
            referrer: document.referrer || undefined,
          },
        }),
      });

      const data = await res.json().catch(() => ({}) as Record<string, unknown>);

      if (!res.ok) {
        // 429 means the throttle recognised this person, not that anything
        // broke — most often their message already landed. Saying so plainly
        // stops the panic re-clicking that a red error box invites.
        if (res.status === 429) {
          const seconds = Number(data?.retryAfterSeconds) || 0;
          const minutes = Math.max(1, Math.ceil(seconds / 60));
          setServerNotice(
            `${data?.error || 'We just received a submission from you.'} You can try again in about ${minutes} minute${minutes === 1 ? '' : 's'}.`,
          );
          setStatus('error');
          return;
        }

        // The server validates with the same schema as the client, so a 400
        // here is a case the client could not see. Put it on the field it
        // belongs to rather than in a generic banner.
        const fields = data?.fields as Record<string, string[] | undefined> | undefined;
        if (res.status === 400 && fields) {
          const mapped: Record<string, string> = {};
          if (fields.name?.[0]) mapped.name = fields.name[0];
          if (fields.email?.[0]) mapped.email = fields.email[0];
          if (fields.company_url?.[0]) mapped.companyUrl = fields.company_url[0];
          if (Object.keys(mapped).length > 0) {
            setErrors(mapped);
            const firstBad = (['name', 'email', 'companyUrl'] as const).find((key) => mapped[key]);
            if (firstBad) fieldRefs[firstBad].current?.focus();
            setStatus('idle');
            return;
          }
        }

        setServerError((data?.error as string) || 'Something went wrong. Please try again.');
        setStatus('error');
        return;
      }

      track(
        'lead_submit_success',
        { spoke, intent, source_page: sourcePage },
        {
          event: 'Lead',
          // The server echoes the id it actually used, so trust that over ours.
          eventId: data?.event_id || eventId,
          params: { content_name: sourcePage, content_category: spoke, lead_intent: intent },
        },
      );

      setStatus('success');
      onSuccess?.();
    } catch {
      setServerError('Network error. Please check your connection and try again.');
      setStatus('error');
    } finally {
      inFlight.current = false;
    }
  };

  if (status === 'success') {
    return (
      <div
        ref={successRef}
        tabIndex={-1}
        role="status"
        aria-live="polite"
        className={`bg-[var(--card-bg)] border border-[var(--border)] rounded-xl p-8 text-center outline-none ${className}`}
      >
        <div className="w-12 h-12 bg-[var(--accent)] text-[var(--accent-deep)] rounded-full flex items-center justify-center mx-auto mb-4 text-xl font-bold">
          ✓
        </div>
        <h3 className="text-h3 text-[var(--text)] mb-2 font-semibold">
          {isAudit ? 'Audit request received!' : 'Message sent!'}
        </h3>
        <p className="text-body text-[var(--text-muted)] mb-6">
          {isAudit
            ? 'We review your submission and send a personalized audit within 48 hours. Want to jump the line?'
            : 'A real person will read your message and respond within one business day. Want to talk sooner?'}
        </p>
        <a
          href="https://api.leadconnectorhq.com/widget/bookings/discovery-call-qognition-agency"
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center justify-center px-6 py-3 text-sm font-medium bg-[var(--accent)] text-[var(--accent-deep)] rounded-lg hover:brightness-110 transition-all"
        >
          Book a 30-Min Strategy Call
        </a>
        <p className="text-meta text-[var(--text-muted)] mt-4">
          You'll also receive a confirmation email shortly.
        </p>
      </div>
    );
  }

  return (
    <form ref={formRef} onSubmit={handleSubmit} className={`space-y-4 ${className}`} noValidate>
      {/* Honeypot — hidden from humans */}
      <div className="absolute opacity-0 pointer-events-none" aria-hidden="true">
        <input
          type="text"
          name="website"
          tabIndex={-1}
          autoComplete="off"
          value={honeypot}
          onChange={(e) => setHoneypot(e.target.value)}
        />
      </div>

      <div>
        <label htmlFor="lead-name" className="block text-sm font-medium text-[var(--text)] mb-1">
          Name <span className="text-red-500">*</span>
        </label>
        <input
          id="lead-name"
          ref={fieldRefs.name}
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          aria-invalid={Boolean(errors.name)}
          aria-describedby={errors.name ? 'lead-name-error' : undefined}
          className={`w-full px-3 py-2.5 text-sm rounded-lg border bg-[var(--surface)] text-[var(--text)] placeholder:text-[var(--text-faint)] transition-colors outline-none focus:ring-2 focus:ring-[var(--accent)]/20 focus:border-[var(--accent)] ${
            errors.name ? 'border-red-500/50' : 'border-[var(--border)]'
          }`}
          placeholder="Your full name"
          required
        />
        {errors.name && (
          <p id="lead-name-error" className="text-meta text-red-500 mt-1">
            {errors.name}
          </p>
        )}
      </div>

      <div>
        <label htmlFor="lead-email" className="block text-sm font-medium text-[var(--text)] mb-1">
          Work Email <span className="text-red-500">*</span>
        </label>
        <input
          id="lead-email"
          ref={fieldRefs.email}
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          aria-invalid={Boolean(errors.email)}
          aria-describedby={errors.email ? 'lead-email-error' : undefined}
          className={`w-full px-3 py-2.5 text-sm rounded-lg border bg-[var(--surface)] text-[var(--text)] placeholder:text-[var(--text-faint)] transition-colors outline-none focus:ring-2 focus:ring-[var(--accent)]/20 focus:border-[var(--accent)] ${
            errors.email ? 'border-red-500/50' : 'border-[var(--border)]'
          }`}
          placeholder="you@company.com"
          required
        />
        {errors.email && (
          <p id="lead-email-error" className="text-meta text-red-500 mt-1">
            {errors.email}
          </p>
        )}
      </div>

      <div>
        <label htmlFor="lead-company" className="block text-sm font-medium text-[var(--text)] mb-1">
          Company
        </label>
        <input
          id="lead-company"
          type="text"
          value={company}
          onChange={(e) => setCompany(e.target.value)}
          className="w-full px-3 py-2.5 text-sm rounded-lg border border-[var(--border)] bg-[var(--surface)] text-[var(--text)] placeholder:text-[var(--text-faint)] transition-colors outline-none focus:ring-2 focus:ring-[var(--accent)]/20 focus:border-[var(--accent)]"
          placeholder="Your company name"
        />
      </div>

      <div>
        <label htmlFor="lead-company-url" className="block text-sm font-medium text-[var(--text)] mb-1">
          Company URL
        </label>
        <input
          id="lead-company-url"
          ref={fieldRefs.companyUrl}
          type="url"
          value={companyUrl}
          onChange={(e) => setCompanyUrl(e.target.value)}
          aria-invalid={Boolean(errors.companyUrl)}
          aria-describedby={errors.companyUrl ? 'lead-company-url-error' : undefined}
          className={`w-full px-3 py-2.5 text-sm rounded-lg border bg-[var(--surface)] text-[var(--text)] placeholder:text-[var(--text-faint)] transition-colors outline-none focus:ring-2 focus:ring-[var(--accent)]/20 focus:border-[var(--accent)] ${
            errors.companyUrl ? 'border-red-500/50' : 'border-[var(--border)]'
          }`}
          placeholder="https://yourcompany.com"
        />
        {errors.companyUrl && (
          <p id="lead-company-url-error" className="text-meta text-red-500 mt-1">
            {errors.companyUrl}
          </p>
        )}
      </div>

      <div>
        <label htmlFor="lead-message" className="block text-sm font-medium text-[var(--text)] mb-1">
          {qualifyingQuestion || (isAudit ? "What's your biggest challenge?" : 'Message')}
        </label>
        <textarea
          id="lead-message"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          rows={3}
          className="w-full px-3 py-2.5 text-sm rounded-lg border border-[var(--border)] bg-[var(--surface)] text-[var(--text)] placeholder:text-[var(--text-faint)] transition-colors outline-none focus:ring-2 focus:ring-[var(--accent)]/20 focus:border-[var(--accent)] resize-y"
          placeholder={isAudit ? 'Tell us about your current situation...' : 'How can we help?'}
        />
      </div>

      {serverNotice && (
        <div
          role="status"
          aria-live="polite"
          className="p-3 text-sm text-amber-300 bg-amber-500/10 border border-amber-500/30 rounded-lg"
        >
          {serverNotice}
        </div>
      )}

      {serverError && (
        <div
          role="alert"
          aria-live="assertive"
          className="p-3 text-sm text-red-400 bg-red-500/10 border border-red-500/30 rounded-lg"
        >
          {serverError}
        </div>
      )}

      <Button type="submit" className="w-full" size="lg" disabled={status === 'submitting'}>
        {status === 'submitting' ? 'Sending...' : finalCta}
      </Button>

      <p className="text-meta text-[var(--text-muted)] text-center">
        No spam. No auto-sequences. A real human reviews every submission.
      </p>
    </form>
  );
}
