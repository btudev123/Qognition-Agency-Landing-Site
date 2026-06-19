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
  Tally?: {
    loadEmbeds: () => void;
    openPopup: (formId: string, options?: Record<string, unknown>) => void;
  };
};

// Opens the Tally lead form in a modal, carrying context (note/source/email) as
// hidden/URL fields so ROI-calculator and audit leads are recorded in Tally too.
export function openTallyPopup(hiddenFields: Record<string, string | undefined>) {
  if (!TALLY_FORM_ID || typeof window === 'undefined') return false;
  const fields: Record<string, string> = {};
  for (const [k, v] of Object.entries(hiddenFields)) if (v) fields[k] = v;
  const open = () =>
    (window as TallyWindow).Tally?.openPopup(TALLY_FORM_ID, {
      layout: 'modal',
      width: 560,
      hiddenFields: fields,
      ...fields,
    });
  ensureTallyScript(open);
  // If the script was already loaded, ensureTallyScript calls open synchronously;
  // otherwise open fires on load.
  return true;
}

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
