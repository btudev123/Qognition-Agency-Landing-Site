'use client';

import { WHATSAPP_LINK, WHATSAPP_DISPLAY } from '../../data/siteConfig';

// Persistent click-to-chat button. Bottom-right, above the mobile sticky bar.
// Fires a `whatsapp_click` event into dataLayer/gtag when available.
function track() {
  if (typeof window === 'undefined') return;
  const w = window as unknown as {
    dataLayer?: unknown[];
    gtag?: (...args: unknown[]) => void;
  };
  w.dataLayer?.push({ event: 'whatsapp_click' });
  w.gtag?.('event', 'whatsapp_click');
}

export default function FloatingWhatsApp() {
  return (
    <a
      href={WHATSAPP_LINK}
      target="_blank"
      rel="noopener noreferrer"
      onClick={track}
      aria-label={`Chat on WhatsApp ${WHATSAPP_DISPLAY}`}
      className="rf-wa"
    >
      <svg width="28" height="28" viewBox="0 0 32 32" fill="none" aria-hidden="true">
        <path
          fill="currentColor"
          d="M16.04 4C9.93 4 4.98 8.95 4.98 15.06c0 2.13.6 4.12 1.64 5.81L4.5 28l7.31-2.06a11 11 0 0 0 4.23.84h.01c6.11 0 11.06-4.95 11.06-11.06C27.12 8.95 22.16 4 16.04 4Zm0 20.2h-.01a9.1 9.1 0 0 1-4.64-1.27l-.33-.2-3.45.97.92-3.37-.22-.35a9.13 9.13 0 0 1-1.4-4.85c0-5.06 4.12-9.18 9.19-9.18 2.45 0 4.76.96 6.49 2.7a9.13 9.13 0 0 1 2.69 6.49c0 5.07-4.12 9.19-9.18 9.19Zm5.04-6.88c-.28-.14-1.64-.81-1.89-.9-.25-.09-.43-.14-.62.14-.18.28-.71.9-.87 1.08-.16.18-.32.21-.6.07-.28-.14-1.17-.43-2.22-1.37-.82-.73-1.38-1.64-1.54-1.92-.16-.28-.02-.43.12-.57.13-.13.28-.32.42-.49.14-.16.18-.28.28-.46.09-.18.05-.35-.02-.49-.07-.14-.62-1.5-.85-2.05-.22-.54-.45-.47-.62-.48l-.53-.01c-.18 0-.47.07-.72.35-.25.28-.95.93-.95 2.26 0 1.33.97 2.62 1.1 2.8.14.18 1.91 2.92 4.63 4.09.65.28 1.15.45 1.54.57.65.21 1.24.18 1.71.11.52-.08 1.64-.67 1.87-1.32.23-.65.23-1.2.16-1.32-.07-.12-.25-.19-.53-.33Z"
        />
      </svg>
      <span className="rf-wa-label">Chat with us</span>
      <style>{`
        .rf-wa {
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
          .rf-wa:hover { width: 184px; box-shadow: 0 10px 32px rgba(37, 211, 102, 0.55); }
          .rf-wa:hover .rf-wa-label { max-width: 120px; opacity: 1; margin-left: 10px; }
        }
        /* Below lg the mobile [Call][WhatsApp][Book] bar covers WhatsApp. */
        @media (max-width: 1023px) { .rf-wa { display: none; } }
        @media (prefers-reduced-motion: reduce) {
          .rf-wa, .rf-wa-label { transition: none; }
        }
      `}</style>
    </a>
  );
}
