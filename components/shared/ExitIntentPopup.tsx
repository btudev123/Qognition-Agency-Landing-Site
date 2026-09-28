'use client';

import { useState, useEffect, useCallback, useRef } from 'react';
import Link from 'next/link';
import { X } from 'lucide-react';

/* Exit-intent capture. The operator asked for this to be retained; it was in
 * the repo but imported by nothing, so it has never actually run.
 *
 * Same mechanic as before — pointer leaves through the top of the viewport,
 * armed only after 5 seconds of engagement, once per session — and the same
 * destination, /free-ai-audit. What changed is everything that would have made
 * it fail review:
 *
 * ACCESSIBILITY. It was a div with no role, no accessible name, no focus
 * management and no focus trap, so a keyboard user got a dialog they could not
 * reach and a screen reader user got one that was never announced. It is now
 * role="dialog" aria-modal with a labelled heading; focus moves to the close
 * button on open, Tab cycles inside the panel, Escape closes, and focus returns
 * to whatever held it before.
 *
 * DISMISSAL. `dismissed` was only set by the X, so clicking the backdrop closed
 * the dialog and re-armed it for the next exit gesture. Every close path now
 * dismisses for the session. It is a ref rather than state because the listener
 * closure has to see the current value without the effect re-subscribing.
 *
 * CONTRAST. The CTA was bg-[var(--accent)] text-[var(--accent-deep)] — teal-500
 * under teal-700 at 2.20:1. It uses .rf-btn--primary now, which resolves to ink
 * on teal-400 at 10.64:1 inside the dark subtree this dialog declares.
 *
 * NO GLASSMORPHISM, NO rounded-2xl. The backdrop was bg-black/60 with
 * backdrop-blur-sm and the panel was rounded-2xl with shadow-2xl. backdrop-filter
 * on a full-viewport layer repaints the whole page on a device that may be doing
 * other work, and --radius is 0 by decision. Square bordered card, opaque scrim.
 *
 * COPY. "Before you go..." says nothing, and the old body promised a report
 * "within 48 hours" — an SLA nobody has confirmed (CLAUDE.md §4). The offer now
 * describes what the snapshot is and states its one real condition.
 *
 * TOUCH. There is no exit intent on a touch device, so the listener simply
 * never fires. That is correct and deliberate: substituting a scroll or timer
 * trigger produces an interstitial a mobile reader did not ask for, which is a
 * Google mobile-interstitial penalty and an annoyance in the same move.
 */

const OFFER = {
  title: 'See what the assistants say about your firm',
  body: 'We run a sample of your buyers’ prompts across ChatGPT, Perplexity, Gemini and Google AI Mode, crawl your site, and send you what we saw with the date attached.',
  cta: 'Get your free snapshot',
  href: '/free-ai-audit',
  note: 'No card, no contract. If you are already well positioned, we will tell you that too.',
};

export default function ExitIntentPopup() {
  const [show, setShow] = useState(false);
  const dismissed = useRef(false);
  const panelRef = useRef<HTMLDivElement>(null);
  const closeRef = useRef<HTMLButtonElement>(null);
  const restoreTo = useRef<HTMLElement | null>(null);

  const dismiss = useCallback(() => {
    dismissed.current = true;
    setShow(false);
  }, []);

  const handleMouseOut = useCallback((e: MouseEvent) => {
    // Only a gesture through the top edge. A null relatedTarget filters out the
    // pointer merely crossing between elements inside the page.
    if (e.clientY <= 0 && !e.relatedTarget && !dismissed.current) setShow(true);
  }, []);

  useEffect(() => {
    // Armed after five seconds. Firing at two seconds interrupts a reader
    // rather than recovering one.
    const timer = setTimeout(() => {
      document.addEventListener('mouseout', handleMouseOut);
    }, 5000);
    return () => {
      clearTimeout(timer);
      document.removeEventListener('mouseout', handleMouseOut);
    };
  }, [handleMouseOut]);

  useEffect(() => {
    if (!show) {
      restoreTo.current?.focus();
      restoreTo.current = null;
      return;
    }
    restoreTo.current = document.activeElement as HTMLElement | null;
    closeRef.current?.focus();

    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        dismiss();
        return;
      }
      if (e.key !== 'Tab') return;
      const focusable = panelRef.current?.querySelectorAll<HTMLElement>(
        'a[href], button:not([disabled])'
      );
      if (!focusable?.length) return;
      const first = focusable[0];
      const last = focusable[focusable.length - 1];
      if (e.shiftKey && document.activeElement === first) {
        e.preventDefault();
        last.focus();
      } else if (!e.shiftKey && document.activeElement === last) {
        e.preventDefault();
        first.focus();
      }
    };

    document.addEventListener('keydown', onKey);
    return () => document.removeEventListener('keydown', onKey);
  }, [show, dismiss]);

  if (!show) return null;

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4" data-theme="dark">
      <button
        type="button"
        className="absolute inset-0 w-full h-full cursor-default"
        style={{ background: 'rgba(10,10,9,0.82)' }}
        aria-label="Close and continue reading"
        tabIndex={-1}
        onClick={dismiss}
      />

      <div
        ref={panelRef}
        role="dialog"
        aria-modal="true"
        aria-labelledby="exit-intent-title"
        aria-describedby="exit-intent-body"
        className="relative w-full max-w-md p-8"
        style={{
          background: 'var(--s-surface-1)',
          border: '1px solid var(--s-rule)',
          boxShadow: 'var(--d-elev-overlay)',
        }}
      >
        <button
          ref={closeRef}
          type="button"
          onClick={dismiss}
          className="absolute top-2 right-2 inline-flex items-center justify-center w-11 h-11"
          style={{ color: 'var(--s-text-muted)' }}
          aria-label="Close"
        >
          <X size={18} aria-hidden="true" />
        </button>

        <h2 id="exit-intent-title" className="text-h3 font-sans m-0 pr-10 font-semibold">
          {OFFER.title}
        </h2>
        <p id="exit-intent-body" className="text-body mt-4 m-0" style={{ color: 'var(--s-text-muted)' }}>
          {OFFER.body}
        </p>

        <Link href={OFFER.href} onClick={dismiss} className="rf-btn rf-btn--primary w-full mt-7">
          {OFFER.cta}
        </Link>

        <p className="text-meta mt-4 m-0" style={{ color: 'var(--s-text-faint)' }}>
          {OFFER.note}
        </p>
      </div>
    </div>
  );
}
