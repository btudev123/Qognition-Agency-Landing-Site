'use client';

import React, { useState } from 'react';
import { AUDIT_OFFERS } from '../data/auditOffers';
import { CALENDLY_LINK } from '../data/siteConfig';
import { AuditReport, AuditType } from '../types';

type Props = {
  defaultType?: AuditType;
  compact?: boolean;
  source?: string;
};

const AuditWidget: React.FC<Props> = ({ defaultType = 'seo', compact = false, source = 'Website Audit Widget' }) => {
  const [auditType, setAuditType] = useState<AuditType>(defaultType);
  const [url, setUrl] = useState('');
  const [email, setEmail] = useState('');
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');
  const [message, setMessage] = useState('');
  const [report, setReport] = useState<AuditReport | null>(null);

  const selectedOffer = AUDIT_OFFERS.find((offer) => offer.type === auditType) || AUDIT_OFFERS[0];

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setStatus('loading');
    setMessage('');
    setReport(null);

    try {
      const response = await fetch('/api/audit', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ auditType, url, email, source })
      });
      const data = await response.json().catch(() => null);
      if (!response.ok) {
        throw new Error(data?.error || 'Audit failed. Please try again.');
      }
      setReport(data.report);
      setStatus('success');
      setMessage('Your audit is ready. We also sent the report details by email when email delivery is configured.');
    } catch (error) {
      setStatus('error');
      setMessage(error instanceof Error ? error.message : 'Something went wrong. Please try again.');
    }
  };

  return (
    <div className={`mx-auto w-full rounded-2xl border border-teal-400/20 bg-black/75 p-5 shadow-2xl shadow-black/30 backdrop-blur-xl md:p-6 ${compact ? '' : 'max-w-4xl'}`}>
      <div className="mb-5">
        <p className="text-xs font-bold uppercase tracking-widest text-teal-300">{selectedOffer.eyebrow}</p>
        <h2 className="mt-2 font-display text-2xl md:text-3xl text-white">Get your instant Qognition audit</h2>
        <p className="mt-2 text-sm leading-relaxed text-gray-400">
          Enter your URL and work email. We check the page, score the gaps, and show the next actions instantly.
        </p>
      </div>
      <form onSubmit={handleSubmit} className="grid grid-cols-1 gap-3 lg:grid-cols-[1.1fr_1fr_.9fr_auto]">
        <label className="block">
          <span className="sr-only">Website URL</span>
          <input
            value={url}
            onChange={(event) => setUrl(event.target.value)}
            required
            type="url"
            placeholder="https://yourcompany.com"
            className="h-12 w-full rounded-xl border border-white/10 bg-white/[0.04] px-4 text-white outline-none transition-colors placeholder:text-gray-500 focus:border-teal-400"
          />
        </label>
        <label className="block">
          <span className="sr-only">Work email</span>
          <input
            value={email}
            onChange={(event) => setEmail(event.target.value)}
            required
            type="email"
            placeholder="you@company.com"
            className="h-12 w-full rounded-xl border border-white/10 bg-white/[0.04] px-4 text-white outline-none transition-colors placeholder:text-gray-500 focus:border-teal-400"
          />
        </label>
        <label className="block">
          <span className="sr-only">Audit type</span>
          <select
            value={auditType}
            onChange={(event) => setAuditType(event.target.value as AuditType)}
            className="h-12 w-full rounded-xl border border-white/10 bg-white/[0.04] px-4 text-white outline-none transition-colors focus:border-teal-400"
          >
            {AUDIT_OFFERS.map((offer) => (
              <option key={offer.type} value={offer.type} className="bg-black text-white">
                {offer.shortTitle}
              </option>
            ))}
          </select>
        </label>
        <button
          type="submit"
          disabled={status === 'loading'}
          className="h-12 rounded-xl bg-teal-400 px-6 font-display text-xs font-bold uppercase tracking-widest text-black transition-colors hover:bg-white disabled:cursor-not-allowed disabled:opacity-60"
        >
          {status === 'loading' ? 'Auditing...' : 'Get Audit'}
        </button>
      </form>
      {message && <p className={`mt-4 text-sm ${status === 'error' ? 'text-red-300' : 'text-teal-200'}`}>{message}</p>}
      {report && (
        <div className="mt-6 rounded-xl border border-white/10 bg-white/[0.04] p-5">
          <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
            <div>
              <p className="text-xs uppercase tracking-widest text-gray-500">Audit score</p>
              <p className="mt-1 font-display text-5xl text-white">{report.score}/100</p>
            </div>
            <a
              href={CALENDLY_LINK}
              target="_blank"
              rel="noopener noreferrer"
              className="rounded-full bg-white px-5 py-3 text-center text-xs font-bold uppercase tracking-widest text-black hover:bg-teal-300"
            >
              Book Strategy Call
            </a>
          </div>
          <p className="mt-4 text-sm leading-relaxed text-gray-300">{report.summary}</p>
          <div className="mt-5 grid grid-cols-1 gap-3 md:grid-cols-2">
            {report.checks.slice(0, 6).map((check) => (
              <div key={check.id} className="rounded-lg border border-white/10 bg-black/40 p-3">
                <div className="flex items-center justify-between gap-3">
                  <p className="text-sm font-medium text-white">{check.label}</p>
                  <span className={`text-xs uppercase tracking-wider ${check.status === 'pass' ? 'text-teal-300' : check.status === 'warning' ? 'text-amber-300' : 'text-red-300'}`}>
                    {check.status}
                  </span>
                </div>
                <p className="mt-2 text-xs leading-relaxed text-gray-400">{check.detail}</p>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default AuditWidget;
