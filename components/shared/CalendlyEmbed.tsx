'use client';

import { useState } from 'react';
import type { SpokeId } from '../../lib/spokes';
import { getSpoke } from '../../lib/spokes';

interface CalendlyEmbedProps {
  spoke?: SpokeId;
  url?: string;
  className?: string;
}

const DEFAULT_CALENDLY = 'https://calendly.com/hello-qognitionagency/30min';

export default function CalendlyEmbed({ spoke, url, className = '' }: CalendlyEmbedProps) {
  const [loaded, setLoaded] = useState(false);
  const config = spoke ? getSpoke(spoke) : null;
  const calendlyUrl = url || config?.calLink || DEFAULT_CALENDLY;

  return (
    <div className={`relative ${className}`}>
      {!loaded && (
        <div className="absolute inset-0 flex items-center justify-center bg-[var(--surface)] rounded-xl border border-[var(--border)]">
          <div className="text-center">
            <div className="w-8 h-8 border-2 border-[var(--accent)] border-t-transparent rounded-full animate-spin mx-auto mb-3" />
            <p className="text-sm text-[var(--text-muted)]">Loading scheduler...</p>
            <span className="sr-only">Loading booking calendar, please wait</span>
          </div>
        </div>
      )}
      <iframe
        src={calendlyUrl}
        className="w-full min-h-[500px] sm:min-h-[600px] md:min-h-[700px] max-h-[85vh] rounded-xl border border-[var(--accent)]/20 shadow-lg shadow-[var(--accent)]/5"
        onLoad={() => setLoaded(true)}
        title="Book a strategy call"
      />
    </div>
  );
}
