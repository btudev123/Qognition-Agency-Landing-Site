import { createHash, randomUUID } from 'crypto';
import type { NextRequest } from 'next/server';

const DEVICE_COOKIE = 'qognition_audit_device';

/**
 * In-memory submission throttle. No external store.
 *
 * State lives in one process, so a serverless instance only sees the requests
 * it personally handled — a determined abuser can get more through by landing
 * on cold instances. That is the accepted trade: this exists to stop accidental
 * double-submits and obvious floods, not to be an airtight quota. Turning away
 * a real prospect costs far more than letting a duplicate through, so every
 * ambiguous case here resolves in favour of accepting the lead.
 */
export type RatePolicy = 'audit' | 'lead';

/** How long one identity is asked to wait before submitting the same thing again. */
const IDENTITY_WINDOW_MS: Record<RatePolicy, number> = {
  // An audit generates and emails a real scored report. One a day per person.
  audit: 24 * 60 * 60 * 1000,
  // A contact message costs nothing to receive and a client to refuse.
  // Just long enough to swallow a double-tap on the submit button.
  lead: 2 * 60 * 1000,
};

/**
 * Identity is the email address, and nothing else.
 *
 * A device cookie looks like a person but is not one: a co-working machine, a
 * family computer or an agency's demo laptop carries one cookie across many
 * genuine prospects, so refusing on it would lock out a stranger for a day the
 * same way keying on IP did. The cookie is still issued — it keeps a returning
 * visitor recognisable — but it never refuses anyone on its own.
 *
 * The cost is that someone can retry immediately under a different address.
 * That is deliberate: a rotated email is one extra lead, while a wrongly
 * refused prospect is a lost client.
 */
const identityKeyFor = (policy: RatePolicy, email: string) =>
  `email:${policy}:${hash(email.trim().toLowerCase())}`;

/**
 * An IP address is not a person either.
 *
 * Offices behind one NAT, corporate VPNs and mobile carrier CGNAT all put many
 * unrelated visitors on a single address, so an IP must never lock anyone out.
 * It gets a burst ceiling only — set high enough that no real visitor meets it.
 */
const IP_BURST_MAX: Record<RatePolicy, number> = { audit: 12, lead: 30 };
const IP_BURST_WINDOW_MS = 60 * 60 * 1000;
const BURST_RETRY_SECONDS = 15 * 60;

/**
 * Hard ceiling on tracked keys, so a proxy pool rotating addresses cannot grow
 * this map without bound. Eviction is oldest-first: Map preserves insertion
 * order, and the oldest key is the one closest to expiring anyway.
 */
const MAX_ENTRIES = 50_000;
/** A full sweep is O(n); once a minute is plenty for windows measured in minutes. */
const PRUNE_INTERVAL_MS = 60 * 1000;

type Entry = { count: number; expiresAt: number };
type State = { entries: Map<string, Entry>; lastPrune: number };

/** Survives hot reloads and module re-evaluation within one instance. */
const state = (): State => {
  const g = globalThis as typeof globalThis & { __qognitionRateState?: State };
  if (!g.__qognitionRateState) g.__qognitionRateState = { entries: new Map(), lastPrune: 0 };
  return g.__qognitionRateState;
};

const hash = (value: string) => createHash('sha256').update(value).digest('hex').slice(0, 32);

const read = (key: string, now: number): Entry | undefined => {
  const { entries } = state();
  const entry = entries.get(key);
  if (!entry) return undefined;
  if (entry.expiresAt <= now) {
    entries.delete(key);
    return undefined;
  }
  return entry;
};

const prune = (now: number) => {
  const s = state();
  if (now - s.lastPrune < PRUNE_INTERVAL_MS && s.entries.size < MAX_ENTRIES) return;
  s.lastPrune = now;

  for (const [key, entry] of s.entries) {
    if (entry.expiresAt <= now) s.entries.delete(key);
  }

  // Still over budget after dropping the expired: shed oldest-first.
  if (s.entries.size > MAX_ENTRIES) {
    const excess = s.entries.size - MAX_ENTRIES;
    let dropped = 0;
    for (const key of s.entries.keys()) {
      if (dropped++ >= excess) break;
      s.entries.delete(key);
    }
  }
};

export const getAuditClientIp = (request: NextRequest) => {
  const forwarded = request.headers.get('x-forwarded-for')?.split(',')[0]?.trim();
  return request.headers.get('cf-connecting-ip') || request.headers.get('x-real-ip') || forwarded || 'unknown';
};

export const getAuditDeviceCookie = () => DEVICE_COOKIE;

export type RateLimitDecision = {
  allowed: boolean;
  deviceId: string;
  retryAfterSeconds: number;
  /** Why it was refused, so the caller can say something true to the visitor. */
  reason?: 'duplicate' | 'burst';
  policy: RatePolicy;
  identityKey: string;
  burstKey: string;
};

/**
 * Decide whether to accept this submission, and claim the slot if so.
 *
 * Checking and claiming are one step on purpose. When they were separate the
 * caller did its email sending in between, so two clicks a few hundred
 * milliseconds apart both passed the check before either had recorded
 * anything — which is precisely the double-submit this is here to stop.
 */
export const checkAuditRateLimit = (
  request: NextRequest,
  email: string,
  policy: RatePolicy = 'audit',
): RateLimitDecision => {
  const now = Date.now();
  prune(now);

  const deviceId = request.cookies.get(DEVICE_COOKIE)?.value || randomUUID();
  const identityKey = identityKeyFor(policy, email);

  // The window is encoded in the key, so the counter rolls over by itself
  // instead of relying on an expiry landing correctly.
  const bucket = Math.floor(now / IP_BURST_WINDOW_MS);
  const burstKey = `ipburst:${policy}:${bucket}:${hash(getAuditClientIp(request))}`;

  const base = { deviceId, policy, identityKey, burstKey };

  // Has this exact person just done this?
  const existing = read(identityKey, now);
  if (existing) {
    return {
      ...base,
      allowed: false,
      reason: 'duplicate',
      retryAfterSeconds: Math.max(1, Math.ceil((existing.expiresAt - now) / 1000)),
    };
  }

  // Is one address flooding us?
  if ((read(burstKey, now)?.count ?? 0) >= IP_BURST_MAX[policy]) {
    return { ...base, allowed: false, reason: 'burst', retryAfterSeconds: BURST_RETRY_SECONDS };
  }

  claim({ ...base, allowed: true, retryAfterSeconds: 0 }, now);
  return { ...base, allowed: true, retryAfterSeconds: 0 };
};

const claim = (decision: RateLimitDecision, now: number) => {
  const { entries } = state();

  entries.set(decision.identityKey, {
    count: 1,
    expiresAt: now + IDENTITY_WINDOW_MS[decision.policy],
  });

  const burst = read(decision.burstKey, now);
  entries.set(decision.burstKey, {
    count: (burst?.count ?? 0) + 1,
    // Outlive the window the key names, so the count cannot expire mid-window.
    expiresAt: burst?.expiresAt ?? now + IP_BURST_WINDOW_MS * 2,
  });
};

/**
 * Hand a slot back after the work behind it failed.
 *
 * An audit whose report never got generated should not cost the prospect their
 * one attempt for the next 24 hours. The burst count is deliberately left
 * alone: the request really was made, and that is what the ceiling counts.
 */
export const releaseAuditRateLimit = (decision: RateLimitDecision) => {
  state().entries.delete(decision.identityKey);
};
