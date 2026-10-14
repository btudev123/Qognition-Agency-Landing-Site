'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { ArrowRight, X, Phone, MessageCircle, Mail, Calendar } from 'lucide-react';
import { PHONE_LINK, WHATSAPP_CHAT_LINK } from '../../data/siteConfig';
import { getFunnelStage, getFunnelCTA } from '../../lib/funnel';
import { pushDataLayer } from '../../lib/analytics';
import { AUDIT_ASSET_ID, appendFunnelContext } from '../../lib/funnelContext';
import { trackContactChannel } from './ContactChannelLink';

const track = (action: string, stage: string) =>
  pushDataLayer('sticky_cta_click', { cta_action: action, cta_stage: stage });

// One slot. h-14 is load-bearing: FloatingWhatsApp lifts itself by 56px plus the
// safe-area inset to clear this bar. Change one, change the other.
const slot = 'flex h-14 min-w-0 flex-col items-center justify-center gap-1 px-1';
const divider = '1px solid rgba(255,255,255,0.08)';

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

  const path = pathname || '/';
  const stage = getFunnelStage(path);
  const cta = getFunnelCTA(stage);
  const bookHref = path === '/' ? '#book' : appendFunnelContext('/book', { page_id: path, stage });
  const primaryIsBooking = cta.primary.href === '/book';
  const primaryHref = primaryIsBooking ? bookHref : appendFunnelContext(cta.primary.href, { page_id: path, stage });
  const primaryExternal = primaryHref.startsWith('http');
  // On /free-ai-audit the enquiry is an audit request, so it carries the audit tag (Owen L2).
  const enquiryHref = appendFunnelContext('/contact#enquiry', { page_id: path, stage, ...(path === '/free-ai-audit' ? { asset_id: AUDIT_ASSET_ID } : {}) });
  const Primary = primaryExternal ? 'a' : Link;

  return (
    <>
      {/* Mobile bottom bar, always present on phones and tablets.
          Four slots, not three with Call replaced: at 360px each slot is 90px
          and the longest label ("Book a call", 11px) needs about 56px, so all
          four fit on one line. Call stays because it is a working contact path
          and removing it loses visitors who will not install or open WhatsApp.
          Book a call stays rightmost, in the thumb zone, as the primary. */}
      <nav
        aria-label="Contact options"
        data-theme="dark"
        className="lg:hidden fixed bottom-0 left-0 right-0 z-50 grid grid-cols-4"
        style={{
          background: 'rgba(8,8,8,0.96)',
          backdropFilter: 'blur(16px)',
          WebkitBackdropFilter: 'blur(16px)',
          borderTop: '1px solid rgba(255,255,255,0.1)',
          paddingBottom: 'env(safe-area-inset-bottom, 0px)',
        }}
      >
        <a
          href={PHONE_LINK}
          onClick={() => { track('call', stage); trackContactChannel('phone', 'sticky_bar', path); }}
          className={slot}
          style={{ color: 'var(--on-dark)', borderRight: divider }}
        >
          <Phone size={18} aria-hidden="true" />
          <span style={{ fontSize: 11 }}>Call</span>
        </a>
        <a
          href={WHATSAPP_CHAT_LINK}
          target="_blank"
          rel="noopener noreferrer"
          aria-label="WhatsApp (opens in a new tab)"
          onClick={() => { track('whatsapp', stage); trackContactChannel('whatsapp', 'sticky_bar', path); }}
          className={slot}
          style={{ color: '#25D366', borderRight: divider }}
        >
          <MessageCircle size={18} aria-hidden="true" />
          <span style={{ fontSize: 11 }}>WhatsApp</span>
        </a>
        <a
          href={enquiryHref}
          onClick={() => track('enquiry', stage)}
          className={slot}
          style={{ color: 'var(--on-dark)', borderRight: divider }}
        >
          <Mail size={18} aria-hidden="true" />
          <span style={{ fontSize: 11 }}>Enquiry</span>
        </a>
        <a
          href={bookHref}
          onClick={() => track('book', stage)}
          className={slot}
          style={{ background: 'var(--accent)', color: '#04221E', fontWeight: 600 }}
        >
          <Calendar size={18} aria-hidden="true" />
          <span style={{ fontSize: 11, whiteSpace: 'nowrap' }}>Book a call</span>
        </a>
      </nav>

      {/* Desktop dismissible pill (bottom-left, clear of the WhatsApp button).
          The primary stays stage-aware. Book a call is in the pill on every
          stage: as the primary on MOFU and BOFU, as the secondary on TOFU.
          It is not repeated when the primary already is Book a call. */}
      {scrolled && !dismissed && (
        <div
          role="region"
          aria-label="Next step"
          data-theme="dark"
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
            href={primaryHref}
            onClick={() => track('primary', stage)}
            {...(primaryExternal ? { target: '_blank', rel: 'noopener noreferrer' } : {})}
            className="inline-flex items-center gap-2 font-semibold transition-all"
            style={{ background: 'var(--accent)', color: '#04221E', borderRadius: 9999, padding: '10px 18px', fontSize: 13, whiteSpace: 'nowrap' }}
          >
            {cta.primary.label} <ArrowRight size={15} aria-hidden="true" />
          </Primary>
          {!primaryIsBooking && (
            <Link
              href={bookHref}
              onClick={() => track('book_secondary', stage)}
              className="inline-flex items-center gap-2 font-semibold"
              style={{ color: 'var(--on-dark)', border: '1px solid var(--d-rule-strong)', borderRadius: 9999, padding: '9px 17px', fontSize: 13, whiteSpace: 'nowrap' }}
            >
              Book a call
            </Link>
          )}
          <button
            onClick={() => setDismissed(true)}
            className="p-1 transition-colors"
            style={{ color: 'rgba(243,240,234,0.5)' }}
            aria-label="Dismiss"
          >
            <X size={18} aria-hidden="true" />
          </button>
        </div>
      )}
    </>
  );
};

export default StickyCTA;
