'use client';

import { useEffect, useId, useRef, useState } from 'react';
import { usePathname } from 'next/navigation';
import Script from 'next/script';
import Link from 'next/link';
import { BOOKING_LINK, CAL_EMBED_ORIGIN, CAL_EMBED_SCRIPT, CAL_LINK } from '../../data/siteConfig';
import { pushDataLayer } from '../../lib/analytics';
import { useEffectiveConsent } from './ConsentManager';

// Cal.com inline booking calendar (operator, 2026-10-14). The event is CAL_LINK in data/siteConfig.ts.
//
// Embed method: Cal.com's official embed.js, loaded with next/script. Cal's own
// snippet does two things: it installs a command queue on window.Cal, and it
// appends embed.js. We install the same queue (ensureCalQueue below, same shape
// as the snippet: Cal.q, Cal.ns, "initNamespace") and let next/script load the
// file, so loading is deduped across client navigations and we get load and
// error callbacks for the loading and error states. No npm dependency.
//
// Consent gate (Owen, round-2 FIX, 2026-10-07, carried over from the previous
// calendar): the booking app runs in a third-party frame that our consent gate
// cannot reach into, so the frame itself is treated as the tracker. It mounts
// only when 'advertising' is in effect (stored choice, else the region default
// on <html>). The decision is made after mount, so the server never renders the
// frame. Without consent the whole component is one link-button to the hosted
// booking page in a new tab.
// [UNVERIFIED: whether the qognition-agency Cal.com account has GA4 or Meta
// tracking apps on this event type. If it has none, the gate could move to
// 'analytics' or go; that is an Anton/operator decision, not a code one.]
//
// One inline embed per Cal.com namespace ("Inline embed already exists.
// Ignoring this call" in embed.js), so every mounted instance gets its own.
//
// Loading: the host box reserves minHeight before anything loads, so the page
// does not jump when the frame arrives. Until embed.js is ready we show a
// loading line; after that Cal.com paints its own skeleton in the same box.
//
// Measurement (CLAUDE.md §8). None of the events below is a booking:
//   - booking_widget_view: the calendar was shown. A view is not a meeting.
//   - booking_link_click: a click to the hosted calendar is intent, never a booking.
//   - booking_completed_client: Cal.com's in-frame "booking successful" signal,
//     for diagnostics only. It is not the North Star and carries no PII: the
//     event payload is never read. walkthrough_booked is server-side only, from
//     the Cal.com webhook.

type CalQueue = ((...args: unknown[]) => void) & { q: unknown[][] };
type CalGlobal = CalQueue & { ns: Record<string, CalQueue>; loaded?: boolean };

const IFRAME_TITLE = 'Book a 15-minute call with Qognition';
const BOOKED_SIGNALS = ['bookingSuccessfulV2', 'bookingSuccessful'] as const;

function ensureCalQueue(): CalGlobal {
  const w = window as Window & { Cal?: CalGlobal };
  if (w.Cal) return w.Cal;
  const makeQueue = (): CalQueue => {
    const api = ((...args: unknown[]) => { api.q.push(args); }) as CalQueue;
    api.q = [];
    return api;
  };
  const cal = ((...args: unknown[]) => {
    if (args[0] === 'init' && typeof args[1] === 'string') {
      const ns = args[1];
      const api = cal.ns[ns] ?? (cal.ns[ns] = makeQueue());
      api.q.push(args);
      cal.q.push(['initNamespace', ns]);
      return;
    }
    cal.q.push(args);
  }) as CalGlobal;
  cal.q = [];
  cal.ns = {};
  // next/script appends embed.js. `loaded` tells any other copy of Cal's snippet not to.
  cal.loaded = true;
  w.Cal = cal;
  return cal;
}

type EmbedStatus = 'loading' | 'embedding' | 'ready' | 'failed';

const STATUS_TEXT: Record<EmbedStatus, string> = {
  loading: 'Loading the calendar.',
  embedding: 'Loading the calendar.',
  ready: 'Calendar loaded.',
  failed: 'The calendar did not load.',
};

export default function CalBooking({ minHeight = 620 }: { minHeight?: number }) {
  const fired = useRef(false);
  const hostRef = useRef<HTMLDivElement>(null);
  const pathname = usePathname() || '/';
  const pathRef = useRef(pathname);
  useEffect(() => { pathRef.current = pathname; }, [pathname]);
  const namespace = `qcal${useId().replace(/[^a-zA-Z0-9]/g, '')}`;
  const consent = useEffectiveConsent();
  const preview = process.env.NEXT_PUBLIC_QOGNITION_PREVIEW === '1';
  const showIframe = consent?.advertising === true;
  const [queued, setQueued] = useState(false);
  const [status, setStatus] = useState<EmbedStatus>('loading');

  useEffect(() => {
    if (!showIframe || fired.current || preview) return;
    fired.current = true;
    pushDataLayer('booking_widget_view');
    // Completed bookings are recorded by Cal.com and reach us through its webhook.
    // An iframe view is not a meeting.
  }, [showIframe, preview]);

  useEffect(() => {
    const host = hostRef.current;
    if (!showIframe || preview || !host) return;
    const cal = ensureCalQueue();
    cal('init', namespace, { origin: CAL_EMBED_ORIGIN });
    const api = cal.ns[namespace];

    // The calendar follows the ground it sits on (CLAUDE.md §9 light/dark rhythm),
    // and its brand colour is the CTA token for that ground, read at runtime.
    const theme = host.closest('[data-theme]')?.getAttribute('data-theme') === 'dark' ? 'dark' : 'light';
    const css = getComputedStyle(host);
    const token = (name: string) => css.getPropertyValue(name).trim();
    const brand = { 'cal-brand': token('--s-cta-bg'), 'cal-brand-emphasis': token('--s-cta-bg-hover'), 'cal-brand-text': token('--s-cta-fg') };

    // useSlotsViewOnSmallScreen: below Cal.com's small-screen width (phones, and the
    // homepage's ~650px column) the day's slots open as their own step instead of
    // stacking under the month grid, which made the frame ~2,400px tall.
    api('inline', { elementOrSelector: host, calLink: CAL_LINK, config: { layout: 'month_view', theme, useSlotsViewOnSmallScreen: 'true' } });
    api('ui', { theme, layout: 'month_view', hideEventTypeDetails: false, cssVarsPerTheme: { [theme]: brand } });

    const onReady = () => {
      setStatus('ready');
      host.querySelector('iframe')?.setAttribute('title', IFRAME_TITLE);
    };
    const onFailed = () => setStatus('failed');
    // Cal.com emits both the V2 and the legacy signal for one booking. Count it once.
    let lastBooked = 0;
    const onBooked = () => {
      const now = Date.now();
      if (now - lastBooked < 5000) return;
      lastBooked = now;
      pushDataLayer('booking_completed_client', { location: 'calendar_embed', page_path: pathRef.current });
    };
    const listeners: Array<[string, () => void]> = [['linkReady', onReady], ['linkFailed', onFailed], ...BOOKED_SIGNALS.map((action) => [action, onBooked] as [string, () => void])];
    for (const [action, callback] of listeners) api('on', { action, callback });
    setQueued(true);
    return () => {
      for (const [action, callback] of listeners) api('off', { action, callback });
    };
  }, [showIframe, preview, namespace]);

  // Intent, never a booking (CLAUDE.md §8).
  const linkClick = (surface: 'calendar_button' | 'calendar_fallback_link') => () =>
    pushDataLayer('booking_link_click', { location: surface, page_path: pathname });

  const openButton = (
    <a
      href={BOOKING_LINK}
      target="_blank"
      rel="noopener noreferrer"
      onClick={linkClick('calendar_button')}
      className="rf-btn rf-btn--primary"
    >
      Open the calendar<span className="sr-only"> (opens in a new tab)</span>
    </a>
  );

  if (preview) return (
    <div className="flex flex-col items-center justify-center gap-5 p-8 text-center" style={{ minHeight }}>
      <p className="text-h3">Calendar preview</p>
      <p className="text-body max-w-xl">The Cal.com booking calendar appears here in production. Bookings are switched off in this preview, so testing cannot create a meeting.</p>
      <Link href="/contact#enquiry" className="underline">Preview the enquiry form</Link>
    </div>
  );

  // Server render, first client render, and every visitor without advertising
  // consent. Also the no-JS path: it is a plain link that works on its own.
  if (!showIframe) return <div className="p-6">{openButton}</div>;

  return (
    <>
      <p className="text-meta m-0 px-4 py-3">
        <a href={BOOKING_LINK} target="_blank" rel="noopener noreferrer" onClick={linkClick('calendar_fallback_link')} className="underline">
          Calendar not showing? Open it in a new tab.
        </a>
      </p>
      <p className="sr-only" role="status">{STATUS_TEXT[status]}</p>
      {status === 'failed' && (
        <div className="flex flex-col items-start gap-4 p-6" style={{ minHeight }}>
          <p className="text-body m-0 max-w-xl" style={{ color: 'var(--s-text)' }}>
            The calendar did not load. A browser setting or network filter may be blocking cal.com. You can still book in a new tab.
          </p>
          {openButton}
        </div>
      )}
      <div className="relative" hidden={status === 'failed'} aria-busy={status !== 'ready'}>
        {status === 'loading' && (
          <p aria-hidden="true" className="text-meta absolute inset-x-0 top-0 m-0 p-6" style={{ color: 'var(--s-text-muted)' }}>
            Loading the calendar
          </p>
        )}
        {/* Cal.com owns this node's children. React renders nothing inside it. */}
        <div ref={hostRef} data-cal-link={CAL_LINK} data-cal-namespace={namespace} style={{ minHeight, width: '100%' }} />
      </div>
      {queued && (
        <Script
          src={CAL_EMBED_SCRIPT}
          strategy="afterInteractive"
          onReady={() => setStatus((s) => (s === 'loading' ? 'embedding' : s))}
          onError={() => setStatus('failed')}
        />
      )}
    </>
  );
}
