import { createHash, randomUUID } from 'crypto';
import type { NextRequest } from 'next/server';
import { redisCommand } from './redis';

const DEVICE_COOKIE = 'qognition_audit_device';

/**
 * Two policies, because the two things being protected are not comparable.
 *
 * `audit` generates and emails a real scored report — expensive enough to cap
 * one person to a report a day. `lead` is someone typing us a message: it
 * costs us nothing to receive and a client to refuse, so it only suppresses an
 * accidental double-tap of the submit button.
 */
export type RatePolicy = 'audit' | 'lead';

const IDENTITY_WINDOW_MS: Record<RatePolicy, number> = {
  audit: 24 * 60 * 60 * 1000,
  lead: 2 * 60 * 1000,
};

/**
 * An IP address is not a person.
 *
 * Offices behind one NAT, corporate VPNs and mobile carrier CGNAT all put
 * hundreds to hundreds of thousands of unrelated visitors on a single address.
 * A per-IP *lockout* therefore blocks strangers, which is why the IP only ever
 * gets a burst ceiling — set high enough that no real visitor reaches it, and
 * only ever returning a minutes-long retry rather than a day-long one.
 */
const IP_BURST_MAX: Record<RatePolicy, number> = {
  audit: 12,
  lead: 30,
};
const IP_BURST_WINDOW_MS = 60 * 60 * 1000;

type Entry = { count: number; expiresAt: number };
type AuditRateStore = Map<string, Entry>;

const getStore = () => {
  const globalForAudit = globalThis as typeof globalThis & { __qognitionAuditRateStore?: AuditRateStore };
  if (!globalForAudit.__qognitionAuditRateStore) {
    globalForAudit.__qognitionAuditRateStore = new Map();
  }
  return globalForAudit.__qognitionAuditRateStore;
};

const hash = (value: string) => createHash('sha256').update(value).digest('hex').slice(0, 32);

export const getAuditClientIp = (request: NextRequest) => {
  const forwarded = request.headers.get('x-forwarded-for')?.split(',')[0]?.trim();
  return request.headers.get('cf-connecting-ip') || request.headers.get('x-real-ip') || forwarded || 'unknown';
};

export type RateLimitDecision = {
  allowed: boolean;
  deviceId: string;
  retryAfterSeconds: number;
  /** Why it was refused, so the caller can say something true to the visitor. */
  reason?: 'duplicate' | 'burst';
  policy: RatePolicy;
  identityKeys: string[];
  burstKey: string;
};

const prune = (store: AuditRateStore, now: number) => {
  for (const [key, entry] of store.entries()) {
    if (entry.expiresAt <= now) store.delete(key);
  }
};

export const checkAuditRateLimit = async (
  request: NextRequest,
  email: string,
  policy: RatePolicy = 'audit',
): Promise<RateLimitDecision> => {
  const now = Date.now();
  const store = getStore();
  const userAgent = request.headers.get('user-agent') || 'unknown-device';
  const deviceId = request.cookies.get(DEVICE_COOKIE)?.value || randomUUID();

  // Identity keys only. Both are specific to one actual person: the address
  // they typed, and the browser we previously issued a cookie to.
  const identityKeys = [
    `email:${policy}:${hash(email.toLowerCase())}`,
    `device:${policy}:${hash(`${deviceId}:${userAgent}`)}`,
  ];
  // Fixed window encoded in the key itself, so the counter rolls over on its
  // own. Correctness never depends on a TTL being applied — a failed PEXPIRE
  // leaves a stale key nothing reads again, rather than a permanent lockout.
  const bucket = Math.floor(now / IP_BURST_WINDOW_MS);
  const burstKey = `ipburst:${policy}:${bucket}:${hash(getAuditClientIp(request))}`;

  prune(store, now);

  const base: Omit<RateLimitDecision, 'allowed' | 'retryAfterSeconds' | 'reason'> = {
    deviceId,
    policy,
    identityKeys,
    burstKey,
  };

  // --- Identity: has this exact person just done this? ---
  const identityResults = await Promise.all(identityKeys.map((key) => redisCommand(['GET', key])));
  const identityUntil =
    identityResults.map((item) => Number(item?.result || 0)).find((expiresAt) => expiresAt > now) ||
    identityKeys.map((key) => store.get(key)?.expiresAt || 0).find((expiresAt) => expiresAt > now);

  if (identityUntil) {
    return {
      ...base,
      allowed: false,
      reason: 'duplicate',
      retryAfterSeconds: Math.ceil((identityUntil - now) / 1000),
    };
  }

  // --- Burst: is one address flooding us? ---
  const burstResult = await redisCommand(['GET', burstKey]);
  const burstCount = burstResult ? Number(burstResult.result || 0) : store.get(burstKey)?.count || 0;

  if (burstCount >= IP_BURST_MAX[policy]) {
    return {
      ...base,
      allowed: false,
      reason: 'burst',
      retryAfterSeconds: 15 * 60,
    };
  }

  return { ...base, allowed: true, retryAfterSeconds: 0 };
};

export const recordAuditRateLimit = async (decision: RateLimitDecision) => {
  const now = Date.now();
  const store = getStore();
  const identityWindow = IDENTITY_WINDOW_MS[decision.policy];
  const expiresAt = now + identityWindow;

  decision.identityKeys.forEach((key) => store.set(key, { count: 1, expiresAt }));

  const burst = store.get(decision.burstKey);
  store.set(decision.burstKey, {
    count: (burst?.count || 0) + 1,
    // Two windows of slack so the bucket outlives the window it counts.
    expiresAt: now + IP_BURST_WINDOW_MS * 2,
  });

  await Promise.all([
    ...decision.identityKeys.map((key) => redisCommand(['SET', key, String(expiresAt), 'PX', identityWindow])),
    redisCommand(['INCR', decision.burstKey]).then(() =>
      redisCommand(['PEXPIRE', decision.burstKey, IP_BURST_WINDOW_MS * 2]),
    ),
  ]);
};

export const getAuditDeviceCookie = () => DEVICE_COOKIE;
