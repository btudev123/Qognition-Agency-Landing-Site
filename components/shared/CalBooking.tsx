'use client';

import { useEffect } from 'react';
import Cal, { getCalApi } from '@calcom/embed-react';
import { CAL_LINK } from '../../data/siteConfig';

// Seamless, responsive Cal.com booking. Inline by default (no extra click on
// BOFU pages). CAL_LINK = "qognition-agency/15min"; namespace = the event slug.
const NAMESPACE = (CAL_LINK.split('/')[1] || 'booking').trim();

export default function CalBooking({ minHeight = 620 }: { minHeight?: number }) {
  useEffect(() => {
    (async () => {
      const cal = await getCalApi({ namespace: NAMESPACE });
      cal('ui', {
        theme: 'dark',
        cssVarsPerTheme: {
          light: { 'cal-brand': '#14B8A6' },
          dark: { 'cal-brand': '#14B8A6' },
        },
        hideEventTypeDetails: false,
        layout: 'month_view',
      });
      const w = window as unknown as { dataLayer?: unknown[] };
      w.dataLayer?.push({ event: 'cal_loaded' });
    })();
  }, []);

  return (
    <Cal
      namespace={NAMESPACE}
      calLink={CAL_LINK}
      style={{ width: '100%', height: '100%', minHeight, overflow: 'scroll' }}
      config={{ layout: 'month_view', theme: 'dark' }}
    />
  );
}
