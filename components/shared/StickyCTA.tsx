'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { ArrowRight, X, Phone, MessageCircle, Calendar } from 'lucide-react';
import { PHONE_LINK, WHATSAPP_LINK, BOOKING_LINK } from '../../data/siteConfig';
import { getFunnelStage, getFunnelCTA } from '../../lib/funnel';

function track(action: string, stage: string) {
  if (typeof window === 'undefined') return;
  (window as unknown as { dataLayer?: unknown[] }).dataLayer?.push({
    event: 'sticky_cta_click',
    cta_action: action,
    cta_stage: stage,
  });
}

const StickyCTA = () => {
  const [scrolled, setScrolled] = useState(false);
  const [dismissed, setDismissed] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 400);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const stage = getFunnelStage(pathname || '/');
  const cta = getFunnelCTA(stage);
  const primaryExternal = cta.primary.href.startsWith('http');
  const Primary = primaryExternal ? 'a' : Link;

  return (
    <>
      {/* Mobile bottom bar — always present on phones/tablets */}
      <div
        className="lg:hidden fixed bottom-0 left-0 right-0 z-50 grid grid-cols-3"
        style={{
          background: 'rgba(8,8,8,0.96)',
          backdropFilter: 'blur(16px)',
          WebkitBackdropFilter: 'blur(16px)',
          borderTop: '1px solid rgba(255,255,255,0.1)',
        }}
      >
        <a
          href={PHONE_LINK}
          onClick={() => track('call', stage)}
          className="flex flex-col items-center justify-center gap-1 py-2.5"
          style={{ color: '#F3F0EA', borderRight: '1px solid rgba(255,255,255,0.08)' }}
        >
          <Phone size={18} />
          <span style={{ fontSize: 11 }}>Call</span>
        </a>
        <a
          href={WHATSAPP_LINK}
          target="_blank"
          rel="noopener noreferrer"
          onClick={() => track('whatsapp', stage)}
          className="flex flex-col items-center justify-center gap-1 py-2.5"
          style={{ color: '#25D366', borderRight: '1px solid rgba(255,255,255,0.08)' }}
        >
          <MessageCircle size={18} />
          <span style={{ fontSize: 11 }}>WhatsApp</span>
        </a>
        <a
          href={BOOKING_LINK}
          target="_blank"
          rel="noopener noreferrer"
          onClick={() => track('book', stage)}
          className="flex flex-col items-center justify-center gap-1 py-2.5"
          style={{ background: 'var(--accent)', color: '#04221E', fontWeight: 600 }}
        >
          <Calendar size={18} />
          <span style={{ fontSize: 11 }}>Book</span>
        </a>
      </div>

      {/* Desktop dismissible pill (bottom-left to avoid the WhatsApp float) */}
      {scrolled && !dismissed && (
        <div
          className="hidden lg:flex fixed bottom-6 left-6 z-50 items-center gap-3 animate-slide-up"
          style={{
            background: 'rgba(8,8,8,0.96)',
            backdropFilter: 'blur(16px)',
            border: '1px solid rgba(255,255,255,0.12)',
            borderRadius: 9999,
            padding: '10px 10px 10px 22px',
            boxShadow: '0 12px 40px rgba(0,0,0,0.45)',
          }}
        >
          <span style={{ color: 'rgba(243,240,234,0.85)', fontSize: 14 }}>{cta.headline}</span>
          <Primary
            href={cta.primary.href}
            onClick={() => track('primary', stage)}
            {...(primaryExternal ? { target: '_blank', rel: 'noopener noreferrer' } : {})}
            className="inline-flex items-center gap-2 font-semibold transition-all"
            style={{ background: 'var(--accent)', color: '#04221E', borderRadius: 9999, padding: '10px 18px', fontSize: 13, whiteSpace: 'nowrap' }}
          >
            {cta.primary.label} <ArrowRight size={15} />
          </Primary>
          <button
            onClick={() => setDismissed(true)}
            className="p-1 transition-colors"
            style={{ color: 'rgba(243,240,234,0.5)' }}
            aria-label="Dismiss"
          >
            <X size={18} />
          </button>
        </div>
      )}
    </>
  );
};

export default StickyCTA;
