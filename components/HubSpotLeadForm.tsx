'use client';

import React, { useState } from 'react';

type Props = {
  source: string;
  resource?: string;
  buttonLabel?: string;
};

const HubSpotLeadForm: React.FC<Props> = ({ source, resource, buttonLabel = 'Get the Resource' }) => {
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');
  const [message, setMessage] = useState('');

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setStatus('loading');
    setMessage('');

    const form = event.currentTarget;
    const formData = new FormData(form);

    try {
      const response = await fetch('/api/hubspot', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          source,
          resource,
          pageUri: window.location.href,
          pageName: document.title,
          fields: {
            firstname: formData.get('firstname'),
            email: formData.get('email'),
            company: formData.get('company'),
            website: formData.get('website'),
            message: formData.get('message'),
            consent: formData.get('consent') === 'on'
          }
        })
      });

      if (!response.ok) {
        const data = await response.json().catch(() => null);
        throw new Error(data?.error || 'Submission failed');
      }

      setStatus('success');
      setMessage('Thanks. We received it and will send the resource details to your email.');
      form.reset();
    } catch (error) {
      setStatus('error');
      setMessage(error instanceof Error ? error.message : 'Something went wrong. Please email hello@qognitionagency.com.');
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-5 rounded-2xl border border-white/10 bg-white/[0.04] p-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <label className="block">
          <span className="text-xs uppercase tracking-widest text-gray-500">Name</span>
          <input
            name="firstname"
            required
            className="mt-2 w-full rounded-lg border border-white/10 bg-black px-4 py-3 text-white outline-none focus:border-teal-400"
            placeholder="Your name"
          />
        </label>
        <label className="block">
          <span className="text-xs uppercase tracking-widest text-gray-500">Work Email</span>
          <input
            name="email"
            type="email"
            required
            className="mt-2 w-full rounded-lg border border-white/10 bg-black px-4 py-3 text-white outline-none focus:border-teal-400"
            placeholder="you@company.com"
          />
        </label>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <label className="block">
          <span className="text-xs uppercase tracking-widest text-gray-500">Company</span>
          <input
            name="company"
            className="mt-2 w-full rounded-lg border border-white/10 bg-black px-4 py-3 text-white outline-none focus:border-teal-400"
            placeholder="Company"
          />
        </label>
        <label className="block">
          <span className="text-xs uppercase tracking-widest text-gray-500">Website</span>
          <input
            name="website"
            type="url"
            className="mt-2 w-full rounded-lg border border-white/10 bg-black px-4 py-3 text-white outline-none focus:border-teal-400"
            placeholder="https://example.com"
          />
        </label>
      </div>
      <label className="block">
        <span className="text-xs uppercase tracking-widest text-gray-500">What are you trying to improve?</span>
        <textarea
          name="message"
          rows={3}
          className="mt-2 w-full resize-none rounded-lg border border-white/10 bg-black px-4 py-3 text-white outline-none focus:border-teal-400"
          placeholder="SEO, Google Ads, AI search visibility, lead quality..."
        />
      </label>
      <label className="flex items-start gap-3 text-sm text-gray-400">
        <input name="consent" type="checkbox" required className="mt-1" />
        <span>I agree to be contacted by Qognition about this resource and related growth strategy.</span>
      </label>
      <button
        type="submit"
        disabled={status === 'loading'}
        className="w-full rounded-full bg-teal-400 px-8 py-4 font-display text-sm font-medium uppercase tracking-wider text-black transition-colors hover:bg-white disabled:cursor-not-allowed disabled:opacity-60"
      >
        {status === 'loading' ? 'Submitting...' : buttonLabel}
      </button>
      {message && <p className={`text-sm ${status === 'success' ? 'text-teal-300' : 'text-red-300'}`}>{message}</p>}
    </form>
  );
};

export default HubSpotLeadForm;
