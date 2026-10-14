/**
 * Shared client-side analytics helper.
 *
 * One place that knows about GTM's dataLayer and the Meta pixel, so components
 * stop hand-rolling their own `window as unknown as { dataLayer }` casts.
 *
 * Browser only. Every function is a safe no-op during SSR or when a tag is not
 * loaded, so callers never need to guard.
 */

import { ATTRIBUTION_DURABLE_KEY, hasConsent } from './consent';
import { CLICK_ID_KEYS, clickIdsFrom, sanitizeClickIds, unexpiredClickIds, type ClickIds } from './clickIds';

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
  if (process.env.NEXT_PUBLIC_QOGNITION_PREVIEW === '1' || !hasConsent('analytics')) return;
  const w = getWindow();
  if (!w) return;
  w.dataLayer = w.dataLayer || [];
  w.dataLayer.push({ event, ...params });
}

/** Send an event straight to GA4 via gtag, bypassing GTM tag configuration. */
export function trackGtag(event: string, params: Record<string, unknown> = {}) {
  if (process.env.NEXT_PUBLIC_QOGNITION_PREVIEW === '1' || !hasConsent('analytics')) return;
  const w = getWindow();
  w?.gtag?.('event', event, params);
}

/** Fire a Meta pixel event, optionally carrying a dedup id. */
export function trackMeta(event: string, params: Record<string, unknown> = {}, eventId?: string) {
  if (process.env.NEXT_PUBLIC_QOGNITION_PREVIEW === '1' || !hasConsent('advertising')) return;
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

/** Session-only record: what every visitor with analytics consent but no advertising consent gets. */
const ATTRIBUTION_STORAGE_KEY = 'qognition_attribution_v2';
/** The record lasts 90 days after the most recent campaign or ad click. Each click ID inside it
 *  also has its own 90 days from capture, which nothing extends (lib/clickIds.ts). */
const DURABLE_LIFETIME_MS = 90 * 24 * 60 * 60 * 1000;
/** Same limits as leadSchema, so a stored record can never produce a field the server drops. */
const UTM_KEYS = ['source', 'medium', 'campaign', 'term', 'content'] as const;
const UTM_MAX = 200;
const LANDING_PAGE_MAX = 500;
const REFERRER_HOST_MAX = 250;

export type AcquisitionAttribution = {
  first_touch?: UtmParams;
  last_touch?: UtmParams;
  landing_page?: string;
  referrer_host?: string;
  /** The first ad click IDs seen. Never changes once set, until each ID's own 90 days end. */
  first_click_ids?: ClickIds;
  /** The newest ID per platform, so each ad platform can import its own latest click. */
  last_click_ids?: ClickIds;
};
type StoredAttribution = AcquisitionAttribution & { expires_at?: number };

/** The latest ID per platform. The same ID seen again keeps its first capture time, so a reload
 *  of an ad landing URL never restarts that ID's 90 days. */
function latestClickIds(previous: ClickIds | undefined, current: ClickIds | undefined): ClickIds | undefined {
  if (!current) return previous;
  const merged: ClickIds = { ...previous };
  for (const key of CLICK_ID_KEYS) {
    const seen = current[key];
    if (seen && merged[key]?.id !== seen.id) merged[key] = seen;
  }
  return merged;
}

/** A new campaign updates last touch; the first campaign never changes. Click IDs follow the
 *  same rule, except that the latest set is merged per platform. */
export function mergeAttribution(previous: AcquisitionAttribution, current?: UtmParams, page?: string, referrer?: string, clickIds?: ClickIds): AcquisitionAttribution {
  return {
    first_touch: previous.first_touch || current,
    last_touch: current || previous.last_touch,
    landing_page: previous.landing_page || page,
    referrer_host: previous.referrer_host || referrer,
    first_click_ids: previous.first_click_ids || clickIds,
    last_click_ids: latestClickIds(previous.last_click_ids, clickIds),
  };
}

/** Joins two stored records when both exist, for example a session record written before
 *  advertising consent and a durable one from an earlier visit. The older one keeps first touch. */
function combineRecords(older: AcquisitionAttribution, newer: AcquisitionAttribution): AcquisitionAttribution {
  const last = older.last_click_ids || newer.last_click_ids ? { ...older.last_click_ids, ...newer.last_click_ids } : undefined;
  return {
    first_touch: older.first_touch || newer.first_touch,
    last_touch: newer.last_touch || older.last_touch,
    landing_page: older.landing_page || newer.landing_page,
    referrer_host: older.referrer_host || newer.referrer_host,
    first_click_ids: older.first_click_ids || newer.first_click_ids,
    last_click_ids: last,
  };
}

/** Only what the visitor's consent covers: campaign context needs analytics, click IDs need
 *  advertising. Empty fields are left out so storage and the lead payload stay clean. */
function permitted(record: AcquisitionAttribution, analytics: boolean, advertising: boolean): AcquisitionAttribution {
  const kept: AcquisitionAttribution = {};
  if (analytics) {
    if (record.first_touch) kept.first_touch = record.first_touch;
    if (record.last_touch) kept.last_touch = record.last_touch;
    if (record.landing_page) kept.landing_page = record.landing_page;
    if (record.referrer_host) kept.referrer_host = record.referrer_host;
  }
  if (advertising) {
    if (record.first_click_ids) kept.first_click_ids = record.first_click_ids;
    if (record.last_click_ids) kept.last_click_ids = record.last_click_ids;
  }
  return kept;
}

/** Reading window.localStorage itself can throw (blocked storage), so even the lookup is guarded. */
function storageOf(w: TrackingWindow, kind: 'localStorage' | 'sessionStorage'): Storage | undefined {
  try { return w[kind]; } catch { return undefined; }
}
function removeStored(storage: Storage | undefined, key: string) {
  try { storage?.removeItem(key); } catch { /* Blocked storage holds nothing to remove. */ }
}
function writeStored(storage: Storage | undefined, key: string, value: StoredAttribution): boolean {
  if (!storage) return false;
  try { storage.setItem(key, JSON.stringify(value)); return true; } catch { return false; }
}

const isPlainObject = (value: unknown): value is Record<string, unknown> =>
  Boolean(value) && typeof value === 'object' && !Array.isArray(value);
const textWithin = (value: unknown, max: number) => value === undefined || (typeof value === 'string' && value.length <= max);
const touchShaped = (value: unknown) => value === undefined || (isPlainObject(value) && UTM_KEYS.every(key => textWithin(value[key], UTM_MAX)));
const touchFrom = (value: unknown): UtmParams | undefined => {
  if (!isPlainObject(value)) return undefined;
  const touch: UtmParams = {};
  for (const key of UTM_KEYS) if (typeof value[key] === 'string' && value[key]) touch[key] = value[key] as string;
  return Object.keys(touch).length ? touch : undefined;
};

/**
 * Owen F1: the whole record is shape-checked before any of it is used. Storage is editable by
 * anything on the page, and a record the server would reject must never reach the lead body.
 * A wrong type or an over-long value anywhere discards the whole record. Click IDs are the one
 * exception: each invalid ID is dropped on its own, so one bad value never loses a good gclid.
 * Only the known fields are rebuilt, so nothing unexpected rides along.
 */
function shapedRecord(value: unknown): StoredAttribution | null {
  if (!isPlainObject(value)) return null;
  const shaped = touchShaped(value.first_touch) && touchShaped(value.last_touch)
    && textWithin(value.landing_page, LANDING_PAGE_MAX) && textWithin(value.referrer_host, REFERRER_HOST_MAX)
    && (value.first_click_ids === undefined || isPlainObject(value.first_click_ids))
    && (value.last_click_ids === undefined || isPlainObject(value.last_click_ids))
    && (value.expires_at === undefined || typeof value.expires_at === 'number');
  if (!shaped) return null;
  return {
    first_touch: touchFrom(value.first_touch),
    last_touch: touchFrom(value.last_touch),
    landing_page: (value.landing_page as string | undefined) || undefined,
    referrer_host: (value.referrer_host as string | undefined) || undefined,
    first_click_ids: sanitizeClickIds(value.first_click_ids),
    last_click_ids: sanitizeClickIds(value.last_click_ids),
    expires_at: value.expires_at as number | undefined,
  };
}

/** A stored record, or {} when it is missing, corrupt, malformed or expired. A durable record
 *  without an expiry is treated as corrupt. Each click ID past its own 90 days is dropped. */
function readStored(storage: Storage | undefined, key: string, now: number, durable: boolean): StoredAttribution {
  let raw: unknown = null;
  try { raw = JSON.parse(storage?.getItem(key) || 'null'); } catch { /* Corrupt or blocked storage. */ }
  if (raw === null) return {};
  const value = shapedRecord(raw);
  if (!value || (durable && (typeof value.expires_at !== 'number' || value.expires_at <= now))) { removeStored(storage, key); return {}; }
  return { ...value, first_click_ids: unexpiredClickIds(value.first_click_ids, now), last_click_ids: unexpiredClickIds(value.last_click_ids, now) };
}

/**
 * Read and update the visitor's attribution. Called on every page view (AcquisitionTracker),
 * on every consent change, and when the lead form submits.
 *
 * Consent decides what is kept and where (CLAUDE.md §8, lib/consent.ts):
 * - No analytics and no advertising: nothing is read or kept, and any durable record is deleted.
 * - Analytics only: campaign context in sessionStorage, as before, so it ends with the session.
 *   Click IDs are not read at all.
 * - Advertising: localStorage, kept 90 days after the most recent campaign or ad click, so a
 *   multi-week purchase keeps its first touch. Click IDs are read from the URL, and each one is
 *   dropped 90 days after its own capture, however recently the visitor came back. Campaign
 *   context is still kept only with analytics consent.
 * A grant moves the session record into durable storage. A withdrawal moves campaign context
 * back to the session and deletes the durable record, click IDs included.
 *
 * Nothing here is sent to GA4, GTM or Meta. The result goes only on the lead submission.
 */
export function getAttribution(now: number = Date.now()): AcquisitionAttribution | undefined {
  const w = getWindow();
  if (!w) return undefined;
  const analytics = hasConsent('analytics');
  const advertising = hasConsent('advertising');
  const local = storageOf(w, 'localStorage');
  const session = storageOf(w, 'sessionStorage');
  if (!analytics && !advertising) { removeStored(local, ATTRIBUTION_DURABLE_KEY); return undefined; }

  const search = new URLSearchParams(w.location.search);
  let current: UtmParams | undefined;
  if (analytics) {
    const utm: UtmParams = {};
    for (const key of ['source', 'medium', 'campaign', 'term', 'content'] as const) {
      const value = search.get(`utm_${key}`)?.slice(0, 200);
      if (value) utm[key] = value;
    }
    if (Object.keys(utm).length) current = utm;
  }
  const clickIds = advertising ? clickIdsFrom(search, now) : undefined;
  let referrer: string | undefined;
  // Cut to the server's limit (Owen F1), so a long hostname can never cost the lead its attribution.
  try { referrer = document.referrer ? new URL(document.referrer).hostname.slice(0, REFERRER_HOST_MAX) || undefined : undefined; } catch { /* Invalid referrer. */ }

  const durable = readStored(local, ATTRIBUTION_DURABLE_KEY, now, true);
  const previous = combineRecords(durable, readStored(session, ATTRIBUTION_STORAGE_KEY, now, false));
  // landing_page stays path-only: the query string, and any click ID in it, never goes here.
  const merged = mergeAttribution(previous, current, analytics ? w.location.pathname.slice(0, 500) : undefined, analytics ? referrer : undefined, clickIds);
  const next = permitted(merged, analytics, advertising);

  if (advertising) {
    const touched = Boolean(current || clickIds);
    const expires_at = touched || typeof durable.expires_at !== 'number' ? now + DURABLE_LIFETIME_MS : durable.expires_at;
    // The session copy goes only once the durable write has worked; otherwise it stays as before.
    if (writeStored(local, ATTRIBUTION_DURABLE_KEY, { ...next, expires_at })) removeStored(session, ATTRIBUTION_STORAGE_KEY);
    else writeStored(session, ATTRIBUTION_STORAGE_KEY, next);
  } else {
    removeStored(local, ATTRIBUTION_DURABLE_KEY);
    writeStored(session, ATTRIBUTION_STORAGE_KEY, next);
  }
  return next;
}

/** Legacy callers continue receiving the first campaign. */
export const getUtmParams = () => getAttribution()?.first_touch;
