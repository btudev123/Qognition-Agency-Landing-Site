/**
 * Shared client-side analytics helper.
 *
 * One place that knows about GTM's dataLayer and the Meta pixel, so components
 * stop hand-rolling their own `window as unknown as { dataLayer }` casts.
 *
 * Browser only. Every function is a safe no-op during SSR or when a tag is not
 * loaded, so callers never need to guard.
 */

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
  const w = getWindow();
  if (!w) return;
  w.dataLayer = w.dataLayer || [];
  w.dataLayer.push({ event, ...params });
}

/** Send an event straight to GA4 via gtag, bypassing GTM tag configuration. */
export function trackGtag(event: string, params: Record<string, unknown> = {}) {
  const w = getWindow();
  w?.gtag?.('event', event, params);
}

/** Fire a Meta pixel event, optionally carrying a dedup id. */
export function trackMeta(event: string, params: Record<string, unknown> = {}, eventId?: string) {
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

const UTM_STORAGE_KEY = 'qognition_utm_first_touch';

/**
 * Read UTM parameters for the current session.
 *
 * First touch wins: the first campaign that brought the visitor in is stored in
 * sessionStorage and reused on later pages, so a lead submitted three clicks
 * deep still carries the campaign that earned it rather than nothing.
 */
export function getUtmParams(): UtmParams | undefined {
  const w = getWindow();
  if (!w) return undefined;

  const search = new URLSearchParams(w.location.search);
  const current: UtmParams = {
    source: search.get('utm_source') || undefined,
    medium: search.get('utm_medium') || undefined,
    campaign: search.get('utm_campaign') || undefined,
    term: search.get('utm_term') || undefined,
    content: search.get('utm_content') || undefined
  };

  const hasCurrent = Object.values(current).some(Boolean);

  try {
    if (hasCurrent) {
      w.sessionStorage.setItem(UTM_STORAGE_KEY, JSON.stringify(current));
      return current;
    }
    const stored = w.sessionStorage.getItem(UTM_STORAGE_KEY);
    if (stored) return JSON.parse(stored) as UtmParams;
  } catch {
    // sessionStorage can throw in private mode or with cookies blocked.
    return hasCurrent ? current : undefined;
  }

  return hasCurrent ? current : undefined;
}
