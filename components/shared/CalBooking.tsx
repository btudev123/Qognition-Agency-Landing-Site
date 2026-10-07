'use client';

import { useEffect, useRef } from 'react';
import { usePathname } from 'next/navigation';
import Script from 'next/script';
import { BOOKING_LINK, BOOKING_EMBED_SCRIPT } from '../../data/siteConfig';
import { pushDataLayer } from '../../lib/analytics';
import { useEffectiveConsent } from './ConsentManager';
import Link from 'next/link';

// Seamless, responsive LeadConnector (GoHighLevel) booking widget. Inline by
// default (no extra click on BOFU pages). form_embed.js posts height messages
// back to the parent so the iframe grows with the calendar instead of scrolling.
//
// Consent gate (Owen, round-2 FIX, 2026-10-07): the GHL booking app loads Meta's
// pixel (connect.facebook.net/fbevents.js) inside its iframe, and our consent
// gate cannot reach into a third-party frame. So the iframe itself is the
// tracker as far as consent is concerned: it mounts only when 'advertising' is
// in effect (stored choice, else the region default on <html>). The decision is
// made after mount, so the server never renders the iframe. Without consent the
// whole component is one link-button to the hosted calendar in a new tab.
//
// Loading (Marcus, docs/strategy/2026-10/05-booking-path.md):
//   - data-initial-iframe-hidden="true" makes form_embed.js skip its hide step,
//     so the calendar paints as soon as GHL renders. Resize still runs. This is
//     an internal attribute of a minified script; if GHL renames it we fall back
//     to the old hidden-until-handshake behaviour, and the new-tab link above
//     the frame still gets a visitor to a slot.
//   - No scrolling="no" / overflow:hidden: if the resizer never attaches, the
//     calendar scrolls inside its frame instead of clipping the confirm button.
//   - afterInteractive, not lazyOnload: the message listener exists before the
//     booking app posts its handshake.
//   - No preconnect: it would open a connection to GHL before consent, and once
//     consent is known the iframe fetches immediately, so it would buy nothing.
export default function CalBooking({ minHeight = 620 }: { minHeight?: number }) {
  const fired = useRef(false);
  const pathname = usePathname() || '/';
  const consent = useEffectiveConsent();
  const showIframe = consent?.advertising === true;

  useEffect(() => {
    if (!showIframe || fired.current || process.env.NEXT_PUBLIC_QOGNITION_PREVIEW === '1') return;
    fired.current = true;
    pushDataLayer('booking_widget_view');
    // Completed bookings are recorded in GHL. An iframe view is not a meeting.
  }, [showIframe]);

  // A click to the hosted calendar is intent, never a booking (CLAUDE.md §8).
  const linkClick = (surface: 'calendar_button' | 'calendar_fallback_link') => () =>
    pushDataLayer('booking_link_click', { location: surface, page_path: pathname });

  if (process.env.NEXT_PUBLIC_QOGNITION_PREVIEW === '1') return (
    <div className="flex flex-col items-center justify-center gap-5 p-8 text-center" style={{ minHeight }}>
      <p className="text-h3">Calendar preview</p>
      <p className="text-body max-w-xl">The existing LeadConnector calendar will appear here in production. Live bookings are disabled in this preview so testing cannot create appointments.</p>
      <Link href="/contact#enquiry" className="underline">Preview the enquiry form</Link>
    </div>
  );

  // Server render, first client render, and every visitor without advertising
  // consent. Also the no-JS path: it is a plain link that works on its own.
  if (!showIframe) return (
    <div className="p-6">
      <a
        href={BOOKING_LINK}
        target="_blank"
        rel="noopener noreferrer"
        onClick={linkClick('calendar_button')}
        className="rf-btn rf-btn--primary"
      >
        Open the calendar<span className="sr-only"> (opens in a new tab)</span>
      </a>
    </div>
  );

  return (
    <>
      <p className="text-meta m-0 px-4 py-3">
        <a href={BOOKING_LINK} target="_blank" rel="noopener noreferrer" onClick={linkClick('calendar_fallback_link')} className="underline">
          Calendar not showing? Open it in a new tab.
        </a>
      </p>
      <iframe
        src={BOOKING_LINK}
        title="Book a discovery call with Qognition"
        data-initial-iframe-hidden="true"
        style={{ display: 'block', width: '100%', minHeight, border: 'none' }}
      />
      <Script src={BOOKING_EMBED_SCRIPT} strategy="afterInteractive" />
    </>
  );
}
