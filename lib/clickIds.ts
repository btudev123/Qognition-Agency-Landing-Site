/**
 * Ad click IDs (CLAUDE.md §8). Captured from the landing URL so a lead can be matched back
 * to the ad click in an offline conversion import. They are advertising identifiers: the
 * browser reads them only with advertising consent (lib/analytics.ts), and /api/lead drops
 * them again unless the server also allows advertising. This code never adds them to an
 * analytics or Meta event payload. When advertising is off, ga4ConfigScript (lib/consent.ts)
 * strips them from the landing page_view only. Other GA4 hits sent while the visitor is still
 * on the landing URL carry the raw URL (observed 2026-10-14). Known gap, operator to decide.
 * [UNVERIFIED: whether Microsoft Clarity records the full landing URL, query string included,
 * in its session data.] [UNVERIFIED: whether tags configured inside the GTM container read
 * the raw URL, and so the click IDs, on their own. That is container config, not this code.]
 *
 * One shared rule for the browser and /api/lead. The charset is the URL-safe unreserved set,
 * which every one of these IDs fits. It is not tightened per platform because the exact
 * formats are not documented in this repo [UNVERIFIED: per-platform click ID formats], and
 * dropping a real gclid loses the conversion link for good. The charset alone already keeps
 * markup and header characters out.
 *
 * Each ID carries the time it was first seen, and lasts 90 days from then. Seeing the same ID
 * again, or any later visit, does not extend it (Anton F5 / Owen F5).
 */
export const CLICK_ID_KEYS = ['gclid', 'wbraid', 'gbraid', 'li_fat_id', 'msclkid'] as const;
export type ClickIdKey = (typeof CLICK_ID_KEYS)[number];
/** captured_at is the browser's Date#toISOString() at capture. */
export type ClickIdRecord = { id: string; captured_at: string };
export type ClickIds = Partial<Record<ClickIdKey, ClickIdRecord>>;

export const CLICK_ID_PATTERN = /^[A-Za-z0-9._~-]{1,512}$/;
/** The shape Date#toISOString() produces, so no other text can ride along in the field. The
 *  shape alone still admits impossible dates such as 30 February, which Date.parse rolls over
 *  into March; isIsoTimestamp() below also rejects those. */
export const CAPTURED_AT_PATTERN = /^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}\.\d{3}Z$/;
export const CLICK_ID_LIFETIME_MS = 90 * 24 * 60 * 60 * 1000;
/** A capture time this far ahead of the browser clock is tolerated as clock drift; further is tampering. */
const CLOCK_SKEW_MS = 24 * 60 * 60 * 1000;

const isPlainObject = (value: unknown): value is Record<string, unknown> =>
  Boolean(value) && typeof value === 'object' && !Array.isArray(value);
/** True only for a string Date#toISOString() itself could have written: the pattern, plus a
 *  round trip through Date that comes back unchanged (Owen re-review nit). Also used for the
 *  stored consent time in lib/consent.ts. */
export function isIsoTimestamp(value: unknown): value is string {
  if (typeof value !== 'string' || !CAPTURED_AT_PATTERN.test(value)) return false;
  const time = Date.parse(value);
  return Number.isFinite(time) && new Date(time).toISOString() === value;
}

/** Keeps the known keys whose ID passes the pattern and whose capture time is valid. Anything
 *  else is dropped without an error, so a bad click ID never costs a lead. An ID without a
 *  capture time is dropped, because it could not be expired on time. Undefined when nothing
 *  valid is left. */
export function sanitizeClickIds(value: unknown): ClickIds | undefined {
  if (!isPlainObject(value)) return undefined;
  const clean: ClickIds = {};
  for (const key of CLICK_ID_KEYS) {
    const entry = value[key];
    if (isPlainObject(entry) && typeof entry.id === 'string' && CLICK_ID_PATTERN.test(entry.id) && isIsoTimestamp(entry.captured_at)) {
      clean[key] = { id: entry.id, captured_at: entry.captured_at };
    }
  }
  return Object.keys(clean).length ? clean : undefined;
}

/** The IDs still inside their own 90 days at `now`. One captured implausibly far in the future
 *  is dropped too, so an edited capture time cannot keep an ID alive. */
export function unexpiredClickIds(ids: ClickIds | undefined, now: number): ClickIds | undefined {
  if (!ids) return undefined;
  const kept: ClickIds = {};
  for (const key of CLICK_ID_KEYS) {
    const entry = ids[key];
    if (!entry) continue;
    const captured = Date.parse(entry.captured_at);
    if (now - captured < CLICK_ID_LIFETIME_MS && captured - now <= CLOCK_SKEW_MS) kept[key] = entry;
  }
  return Object.keys(kept).length ? kept : undefined;
}

/** The click IDs on a landing URL's query string, validated and stamped with `now`. */
export function clickIdsFrom(search: URLSearchParams, now: number): ClickIds | undefined {
  const capturedAt = new Date(now).toISOString();
  const found: Record<string, ClickIdRecord> = {};
  for (const key of CLICK_ID_KEYS) {
    const id = search.get(key)?.trim();
    if (id) found[key] = { id, captured_at: capturedAt };
  }
  return sanitizeClickIds(found);
}
