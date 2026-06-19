'use client';

import { useState, useRef, type FormEvent } from 'react';
import type { SpokeId, LeadIntent } from '../../lib/validation';
import { contactSchema } from '../../lib/validation';
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
  const formRef = useRef<HTMLFormElement>(null);

  const isAudit = intent === 'audit';
  const defaultCta = isAudit
    ? 'Get My Free Audit'
    : intent === 'consultation'
      ? 'Book a Strategy Call'
      : intent === 'pricing'
        ? 'Get Pricing Details'
        : 'Send Message';

  const finalCta = ctaLabel || defaultCta;

  // When a Tally form is configured, every lead form routes to Tally.
  // Falls back to the native form + /api/lead when it's not set.
  if (isTallyConfigured()) {
    return (
      <TallyForm
        className={className}
        hidden={{ spoke, intent, source: sourcePage }}
      />
    );
  }

  const validate = () => {
    const result = contactSchema.safeParse({ name, email, company: company || undefined, company_url: companyUrl || undefined, message: message || undefined });
    if (!result.success) {
      const flat = result.error.flatten().fieldErrors;
      const errs: Record<string, string> = {};
      if (flat.name) errs.name = flat.name[0];
      if (flat.email) errs.email = flat.email[0];
      if (flat.company_url) errs.companyUrl = flat.company_url[0];
      setErrors(errs);
      return null;
    }
    setErrors({});
    return result.data;
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    const contact = validate();
    if (!contact) return;

    setStatus('submitting');
    setServerError('');

    try {
      const res = await fetch('/api/lead', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          service: spoke,
          intent,
          source_page: sourcePage,
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

      const data = await res.json();

      if (!res.ok) {
        setServerError(data.error || 'Something went wrong. Please try again.');
        setStatus('error');
        return;
      }

      setStatus('success');
      onSuccess?.();
    } catch {
      setServerError('Network error. Please check your connection and try again.');
      setStatus('error');
    }
  };

  if (status === 'success') {
    return (
      <div className={`bg-[var(--card-bg)] border border-[var(--border)] rounded-xl p-8 text-center ${className}`}>
        <div className="w-12 h-12 bg-[var(--accent)] text-[var(--accent-deep)] rounded-full flex items-center justify-center mx-auto mb-4 text-xl font-bold">
          ✓
        </div>
        <h3 className="text-lg font-semibold text-[var(--text)] mb-2">
          {isAudit ? 'Audit request received!' : 'Message sent!'}
        </h3>
        <p className="text-sm text-[var(--text-muted)] mb-6 leading-relaxed">
          {isAudit
            ? 'We review your submission and send a personalized audit within 48 hours. Want to jump the line?'
            : 'A real person will read your message and respond within one business day. Want to talk sooner?'}
        </p>
        <a
          href="https://cal.com/qognition-agency/15min"
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center justify-center px-6 py-3 text-sm font-medium bg-[var(--accent)] text-[var(--accent-deep)] rounded-lg hover:brightness-110 transition-all"
        >
          Book a 30-Min Strategy Call
        </a>
        <p className="text-xs text-[var(--text-muted)] mt-4">
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
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          className={`w-full px-3 py-2.5 text-sm rounded-lg border bg-[var(--surface)] text-[var(--text)] placeholder:text-[var(--text-faint)] transition-colors outline-none focus:ring-2 focus:ring-[var(--accent)]/20 focus:border-[var(--accent)] ${
            errors.name ? 'border-red-500/50' : 'border-[var(--border)]'
          }`}
          placeholder="Your full name"
          required
        />
        {errors.name && <p className="text-xs text-red-500 mt-1">{errors.name}</p>}
      </div>

      <div>
        <label htmlFor="lead-email" className="block text-sm font-medium text-[var(--text)] mb-1">
          Work Email <span className="text-red-500">*</span>
        </label>
        <input
          id="lead-email"
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className={`w-full px-3 py-2.5 text-sm rounded-lg border bg-[var(--surface)] text-[var(--text)] placeholder:text-[var(--text-faint)] transition-colors outline-none focus:ring-2 focus:ring-[var(--accent)]/20 focus:border-[var(--accent)] ${
            errors.email ? 'border-red-500/50' : 'border-[var(--border)]'
          }`}
          placeholder="you@company.com"
          required
        />
        {errors.email && <p className="text-xs text-red-500 mt-1">{errors.email}</p>}
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
          type="url"
          value={companyUrl}
          onChange={(e) => setCompanyUrl(e.target.value)}
          className={`w-full px-3 py-2.5 text-sm rounded-lg border bg-[var(--surface)] text-[var(--text)] placeholder:text-[var(--text-faint)] transition-colors outline-none focus:ring-2 focus:ring-[var(--accent)]/20 focus:border-[var(--accent)] ${
            errors.companyUrl ? 'border-red-500/50' : 'border-[var(--border)]'
          }`}
          placeholder="https://yourcompany.com"
        />
        {errors.companyUrl && <p className="text-xs text-red-500 mt-1">{errors.companyUrl}</p>}
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

      {serverError && (
        <div className="p-3 text-sm text-red-400 bg-red-500/10 border border-red-500/30 rounded-lg">
          {serverError}
        </div>
      )}

      <Button type="submit" className="w-full" size="lg" disabled={status === 'submitting'}>
        {status === 'submitting' ? 'Sending...' : finalCta}
      </Button>

      <p className="text-xs text-[var(--text-muted)] text-center">
        No spam. No auto-sequences. A real human reviews every submission.
      </p>
    </form>
  );
}
