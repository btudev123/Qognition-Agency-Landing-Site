'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { ArrowRight, X } from 'lucide-react';

function getSpokeCTA(pathname: string): { text: string; href: string; subtext: string } {
  if (pathname.startsWith('/marketing')) {
    return { text: 'Get Free Marketing Audit', href: '/marketing/audit', subtext: 'Get a 12-page diagnostic within 48 hours.' };
  }
  if (pathname.startsWith('/tech')) {
    return { text: 'Get Free Tech Audit', href: '/tech/audit', subtext: 'Get a performance & stack audit within 48 hours.' };
  }
  if (pathname.startsWith('/finance')) {
    return { text: 'Get Free Finance Health Check', href: '/finance/audit', subtext: 'Get a benchmark report within 48 hours.' };
  }
  if (pathname.startsWith('/automation')) {
    return { text: 'Get Free Automation Map', href: '/automation/audit', subtext: 'Get a prioritized roadmap within 72 hours.' };
  }
  return { text: 'Get Free Audit', href: '/free-seo-audit', subtext: 'Get a free audit within 48 hours.' };
}

const StickyCTA = () => {
  const [visible, setVisible] = useState(false);
  const [dismissed, setDismissed] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    const handleScroll = () => {
      // Show after scrolling past the hero (roughly 400px)
      if (window.scrollY > 400 && !dismissed) {
        setVisible(true);
      } else {
        setVisible(false);
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, [dismissed]);

  if (!visible) return null;

  const cta = getSpokeCTA(pathname);

  return (
    <div className="fixed bottom-0 left-0 right-0 z-50 animate-slide-up">
      <div className="bg-[var(--bg)]/95 backdrop-blur-xl border-t border-[var(--border)] px-4 py-3">
        <div className="max-w-7xl mx-auto flex items-center justify-between gap-4">
          <div className="hidden sm:block">
            <p className="text-sm text-[var(--text)] font-medium">Ready to grow?</p>
            <p className="text-xs text-[var(--text-muted)]">{cta.subtext}</p>
          </div>
          <div className="flex items-center gap-3">
            <Link
              href={cta.href}
              className="inline-flex items-center gap-2 rounded-lg bg-[var(--accent)] text-[var(--accent-deep)] font-medium px-5 py-2.5 text-sm hover:brightness-110 transition-all whitespace-nowrap"
            >
              {cta.text} <ArrowRight size={16} />
            </Link>
            <button
              onClick={() => { setDismissed(true); setVisible(false); }}
              className="text-[var(--text-muted)] hover:text-[var(--text)] transition-colors p-1"
              aria-label="Dismiss"
            >
              <X size={18} />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default StickyCTA;
