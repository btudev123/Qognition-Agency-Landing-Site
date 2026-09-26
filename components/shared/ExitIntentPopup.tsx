'use client';

import { useState, useEffect, useCallback } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { ArrowRight, X } from 'lucide-react';

function getSpokePopup(pathname: string): { title: string; body: string; cta: string; href: string; note: string } {
  return {
    title: 'Before you go...',
    body: 'Get a free AI Search Visibility Report within 48 hours. See how visible and citable your brand is across AI search.',
    cta: 'Get My AI Search Visibility Report',
    href: '/free-ai-audit',
    note: 'Delivered within 48 hours. No credit card required.',
  };
}

const ExitIntentPopup = () => {
  const [show, setShow] = useState(false);
  const [dismissed, setDismissed] = useState(false);
  const pathname = usePathname();

  const handleMouseLeave = useCallback((e: MouseEvent) => {
    // Only trigger when mouse leaves through the top of the page
    if (e.clientY <= 0 && !dismissed && !show) {
      setShow(true);
    }
  }, [dismissed, show]);

  useEffect(() => {
    // Only attach after some engagement (5 seconds on page)
    const timer = setTimeout(() => {
      document.addEventListener('mouseleave', handleMouseLeave);
    }, 5000);

    return () => {
      clearTimeout(timer);
      document.removeEventListener('mouseleave', handleMouseLeave);
    };
  }, [handleMouseLeave]);

  // Close on Escape
  useEffect(() => {
    const handleEsc = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setShow(false);
    };
    window.addEventListener('keydown', handleEsc);
    return () => window.removeEventListener('keydown', handleEsc);
  }, []);

  if (!show) return null;

  const popup = getSpokePopup(pathname);

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-black/60 backdrop-blur-sm"
        onClick={() => setShow(false)}
      />

      {/* Modal */}
      <div className="relative w-full max-w-md rounded-2xl border border-[var(--accent)]/20 bg-[var(--bg)] p-8 shadow-2xl animate-scale-in">
        <button
          onClick={() => { setShow(false); setDismissed(true); }}
          className="absolute top-4 right-4 text-[var(--text-muted)] hover:text-[var(--text)] transition-colors"
          aria-label="Close"
        >
          <X size={20} />
        </button>

        <div className="text-center">
          <h3 className="text-h3 text-[var(--text)] mb-3 font-semibold">
            {popup.title}
          </h3>
          <p className="text-body text-[var(--text-muted)] mb-8">
            {popup.body}
          </p>

          <Link
            href={popup.href}
            onClick={() => setShow(false)}
            className="inline-flex items-center gap-2 rounded-lg bg-[var(--accent)] text-[var(--accent-deep)] font-medium px-8 py-4 text-sm hover:brightness-110 transition-all w-full justify-center"
          >
            {popup.cta} <ArrowRight size={16} />
          </Link>

          <p className="text-meta text-[var(--text-muted)] mt-4">
            {popup.note}
          </p>
        </div>
      </div>
    </div>
  );
};

export default ExitIntentPopup;
