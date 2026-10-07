'use client';

import { MessageCircle } from 'lucide-react';
import ContactChannelLink from './ContactChannelLink';

/* The real WhatsApp button. It previously linked to /contact#enquiry under a
 * WhatsApp-green circle, so a visitor who wanted to message us landed on a form.
 * It now opens wa.me with a generic pre-filled line (data/siteConfig.ts).
 *
 * Below lg it sits above the StickyCTA mobile bar, which is h-14 (56px) plus the
 * safe-area inset, so the two never overlap. Keep --wa-bar-h in step with the
 * bar's item height in StickyCTA.tsx. */
export default function FloatingWhatsApp() {
  return (
    <ContactChannelLink channel="whatsapp" location="floating" aria-label="Chat on WhatsApp (opens in a new tab)" className="rf-wa">
      <MessageCircle size={28} aria-hidden="true" />
      <span className="rf-wa-label" aria-hidden="true">Chat on WhatsApp</span>
      <style>{`
        .rf-wa {
          --wa-bar-h: 56px;
          position: fixed;
          right: 20px;
          bottom: 88px;
          z-index: 60;
          display: inline-flex;
          align-items: center;
          gap: 0;
          height: 56px;
          width: 56px;
          padding: 0 16px;
          border-radius: 9999px;
          background: #25D366;
          color: #04221E;
          box-shadow: 0 8px 28px rgba(37, 211, 102, 0.4);
          overflow: hidden;
          transition: width 0.28s ease, box-shadow 0.28s ease;
          white-space: nowrap;
        }
        .rf-wa svg { flex: 0 0 auto; }
        .rf-wa-label {
          font-size: 14px;
          font-weight: 600;
          max-width: 0;
          opacity: 0;
          margin-left: 0;
          transition: max-width 0.28s ease, opacity 0.2s ease, margin-left 0.28s ease;
        }
        @media (hover: hover) {
          .rf-wa:hover { width: 200px; box-shadow: 0 10px 32px rgba(37, 211, 102, 0.55); }
          .rf-wa:hover .rf-wa-label { max-width: 136px; opacity: 1; margin-left: 10px; }
        }
        /* Below lg: smaller, and lifted clear of the mobile action bar. 48px keeps
           the target above the 44px minimum while covering less of the page. */
        @media (max-width: 1023px) {
          .rf-wa {
            right: 16px;
            bottom: calc(var(--wa-bar-h) + 12px + env(safe-area-inset-bottom, 0px));
            height: 48px;
            width: 48px;
            padding: 0 12px;
          }
          .rf-wa svg { width: 24px; height: 24px; }
        }
        @media (prefers-reduced-motion: reduce) {
          .rf-wa, .rf-wa-label { transition: none; }
        }
      `}</style>
    </ContactChannelLink>
  );
}
