/**
 * Shared client-side analytics helper.
 *
 * One place that knows about GTM's dataLayer and the Meta pixel, so components
 * stop hand-rolling their own `window as unknown as { dataLayer }` casts.
 *
 * Browser only. Every function is a safe no-op during SSR or when a tag is not
 * loaded, so callers never need to guard.
 */

import { hasConsent } from './consent';

/** Meta standard events use fbq('track'); anything else uses fbq('trackCustom'). */
const META_STANDARD_EVENTS = new Set([
  'AddPaymentInfo',
  'AddToCart',
  'AddToWishlist',
  'CompleteRegistration',
  'Contact',
  'CustomizeProduct',
  'Donate',
  'FindLocation',
  'InitiateCheckout',
  'Lead',
  'PageView',
  'Purchase',
  'Schedule',
  'Search',
  'StartTrial',
  'SubmitApplication',
  'Subscribe',
  'ViewContent'
]);

type Fbq = (
  method: string,
  event: string,
  params?: Record<string, unknown>,
  options?: { eventID: string }
) => void;

type TrackingWindow = Window & {
  dataLayer?: unknown[];
  fbq?: Fbq;
  gtag?: (...args: unknown[]) => void;
};

const getWindow = (): TrackingWindow | null =>
  typeof window === 'undefined' ? null : (window as TrackingWindow);

/**
 * Generate the shared deduplication key for a conversion.
 *
 * The same value must be sent to the browser pixel (as `eventID`) and to the
 * Conversions API (as `event_id`) for one user action. Meta then counts the
 * pair once. Generate it BEFORE the network call so both sides can use it.
 */
export function newEventId(): string {
  const w = getWindow();
  if (w?.crypto?.randomUUID) return w.crypto.randomUUID();
  return `evt-${Date.now()}-${Math.random().toString(36).slice(2, 11)}`;
}

/** Push a GTM dataLayer event. */
export function pushDataLayer(event: string, params: Record<string, unknown> = {}) {
  if (!hasConsent('analytics')) return;
  const w = getWindow();
  if (!w) return;
  w.dataLayer = w.dataLayer || [];
  w.dataLayer.push({ event, ...params });
}

/** Send an event straight to GA4 via gtag, bypassing GTM tag configuration. */
export function trackGtag(event: string, params: Record<string, unknown> = {}) {
  if (!hasConsent('analytics')) return;
  const w = getWindow();
  w?.gtag?.('event', event, params);
}

/** Fire a Meta pixel event, optionally carrying a dedup id. */
export function trackMeta(event: string, params: Record<string, unknown> = {}, eventId?: string) {
  if (!hasConsent('advertising')) return;
  const w = getWindow();
  if (!w?.fbq) return;
  const method = META_STANDARD_EVENTS.has(event) ? 'track' : 'trackCustom';
  w.fbq(method, event, params, eventId ? { eventID: eventId } : undefined);
}

/**
 * Fire one user action across every tag at once.
 *
 * @param event   dataLayer event name (snake_case, per CLAUDE.md §12.4)
 * @param params  dataLayer parameters
 * @param meta    optional Meta pixel mirror. Pass `eventId` when the same event
 *                is also sent server-side via the Conversions API.
 */
export function track(
  event: string,
  params: Record<string, unknown> = {},
  meta?: { event: string; params?: Record<string, unknown>; eventId?: string }
) {
  pushDataLayer(event, params);
  if (meta) trackMeta(meta.event, meta.params ?? {}, meta.eventId);
}

export type UtmParams = {
  source?: string;
  medium?: string;
  campaign?: string;
  term?: string;
  content?: string;
};

const ATTRIBUTION_STORAGE_KEY = 'qognition_attribution_v2';

export type AcquisitionAttribution = {
  first_touch?: UtmParams;
  last_touch?: UtmParams;
  landing_page?: string;
  referrer_host?: string;
};

/** A new campaign updates last touch; the first campaign never changes. */
export function mergeAttribution(previous: AcquisitionAttribution, current?: UtmParams, page?: string, referrer?: string): AcquisitionAttribution {
  return {
    first_touch: previous.first_touch || current,
    last_touch: current || previous.last_touch,
    landing_page: previous.landing_page || page,
    referrer_host: previous.referrer_host || referrer,
  };
}

/**
 * Read UTM parameters for the current session.
 *
 * First touch wins: the first campaign that brought the visitor in is stored in
 * sessionStorage and reused on later pages, so a lead submitted three clicks
 * deep still carries the campaign that earned it rather than nothing.
 */
export function getAttribution(): AcquisitionAttribution | undefined {
  const w = getWindow();
  if (!w || !hasConsent('analytics')) return undefined;

  const search = new URLSearchParams(w.location.search);
  const current: UtmParams = {
    source: search.get('utm_source') || undefined,
    medium: search.get('utm_medium') || undefined,
    campaign: search.get('utm_campaign') || undefined,
    term: search.get('utm_term') || undefined,
    content: search.get('utm_content') || undefined
  };

  for (const key of Object.keys(current) as (keyof UtmParams)[]) current[key] = current[key]?.slice(0, 200);
  const hasCurrent = Object.values(current).some(Boolean);
  let previous: AcquisitionAttribution = {};
  let referrer: string | undefined;
  try { referrer = document.referrer ? new URL(document.referrer).hostname : undefined; } catch { /* Invalid referrer. */ }
  try {
    const stored = w.sessionStorage.getItem(ATTRIBUTION_STORAGE_KEY);
    if (stored) previous = JSON.parse(stored) || {};
  } catch { /* Private mode or corrupt session storage. */ }
  const next = mergeAttribution(previous, hasCurrent ? current : undefined, w.location.pathname.slice(0, 500), referrer);
  try { w.sessionStorage.setItem(ATTRIBUTION_STORAGE_KEY, JSON.stringify(next)); } catch { /* Current request still has its context. */ }
  return next;
}

/** Legacy callers continue receiving the first campaign. */
export const getUtmParams = () => getAttribution()?.first_touch;
