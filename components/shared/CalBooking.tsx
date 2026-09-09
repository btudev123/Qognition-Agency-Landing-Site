'use client';

import { useEffect, useRef } from 'react';
import Script from 'next/script';
import { BOOKING_LINK, BOOKING_EMBED_SCRIPT } from '../../data/siteConfig';
import { pushDataLayer, trackMeta } from '../../lib/analytics';

// Seamless, responsive LeadConnector (GoHighLevel) booking widget. Inline by
// default (no extra click on BOFU pages). form_embed.js posts height messages
// back to the parent so the iframe grows with the calendar instead of scrolling.
export default function CalBooking({ minHeight = 620 }: { minHeight?: number }) {
  const fired = useRef(false);

  useEffect(() => {
    if (fired.current) return;
    fired.current = true;
    pushDataLayer('cal_loaded');
    // Browser-only: a booking view has no server-side twin to dedup against.
    trackMeta('Schedule', { content_name: BOOKING_LINK });
  }, []);

  return (
    <>
      <iframe
        src={BOOKING_LINK}
        title="Book a discovery call with Qognition"
        scrolling="no"
        style={{ width: '100%', height: '100%', minHeight, border: 'none', overflow: 'hidden' }}
      />
      <Script src={BOOKING_EMBED_SCRIPT} strategy="lazyOnload" />
    </>
  );
}
