'use client';

import { useEffect, useRef } from 'react';

// All lead forms route to a single Tally form (env: NEXT_PUBLIC_TALLY_FORM_ID).
// Submissions land in Tally; spoke/intent/source ride along as query params
// (captured if matching hidden fields exist on the Tally form).

const TALLY_FORM_ID = process.env.NEXT_PUBLIC_TALLY_FORM_ID;

export function isTallyConfigured() {
  return Boolean(TALLY_FORM_ID);
}

type TallyWindow = Window & {
  Tally?: { loadEmbeds: () => void };
};

function ensureTallyScript(onReady: () => void) {
  const w = window as TallyWindow;
  if (w.Tally) {
    w.Tally.loadEmbeds();
    onReady();
    return;
  }
  const existing = document.querySelector<HTMLScriptElement>('script[src="https://tally.so/widgets/embed.js"]');
  if (existing) {
    existing.addEventListener('load', onReady, { once: true });
    return;
  }
  const s = document.createElement('script');
  s.src = 'https://tally.so/widgets/embed.js';
  s.async = true;
  s.onload = onReady;
  document.body.appendChild(s);
}

export default function TallyForm({
  hidden,
  className = '',
  minHeight = 460,
}: {
  hidden?: Record<string, string | undefined>;
  className?: string;
  minHeight?: number;
}) {
  const ref = useRef<HTMLIFrameElement>(null);

  useEffect(() => {
    if (!TALLY_FORM_ID) return;
    ensureTallyScript(() => {
      (window as TallyWindow).Tally?.loadEmbeds();
    });
  }, []);

  if (!TALLY_FORM_ID) return null;

  const params = new URLSearchParams({
    alignLeft: '1',
    hideTitle: '1',
    transparentBackground: '1',
    dynamicHeight: '1',
  });
  if (hidden) {
    for (const [k, v] of Object.entries(hidden)) {
      if (v) params.set(k, v);
    }
  }
  const src = `https://tally.so/embed/${TALLY_FORM_ID}?${params.toString()}`;

  return (
    <iframe
      ref={ref}
      data-tally-src={src}
      src={src}
      loading="lazy"
      width="100%"
      height={minHeight}
      title="Qognition — Get started"
      className={className}
      style={{ border: 0, margin: 0, width: '100%', background: 'transparent' }}
    />
  );
}
