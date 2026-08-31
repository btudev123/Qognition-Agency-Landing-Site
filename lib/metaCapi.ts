import { createHash } from 'crypto';
import type { NextRequest } from 'next/server';

/**
 * Meta Conversions API (server-side events).
 *
 * Pairs with the browser pixel in components/shared/MetaPixel.tsx. Both sides
 * send the same `event_name` + `event_id`, which is what lets Meta collapse the
 * pair into a single conversion instead of double-counting. See docs/integrations.md.
 *
 * Follows the same never-throw contract as lib/leadDelivery.ts: a missing
 * credential or a failing API call returns a result object, it never breaks the
 * lead flow.
 */

const DEFAULT_API_VERSION = 'v21.0';

export type MetaCapiResult = {
  ok: boolean;
  skipped: boolean;
  status: number;
  error?: string;
  data?: unknown;
};

export type MetaUserData = {
  email?: string;
  phone?: string;
  firstName?: string;
  lastName?: string;
  city?: string;
  state?: string;
  zip?: string;
  country?: string;
  clientIp?: string;
  userAgent?: string;
  fbp?: string;
  fbc?: string;
};

const sha256 = (value: string) => createHash('sha256').update(value).digest('hex');

/** Meta requires normalization *before* hashing or the match silently fails. */
const hashEmail = (value: string) => sha256(value.trim().toLowerCase());
const hashPhone = (value: string) => {
  const digits = value.replace(/\D/g, '');
  return digits ? sha256(digits) : undefined;
};
const hashName = (value: string) => {
  const normalized = value.trim().toLowerCase().replace(/[^a-zÀ-ɏ]/g, '');
  return normalized ? sha256(normalized) : undefined;
};
const hashPlain = (value: string) => {
  const normalized = value.trim().toLowerCase().replace(/\s+/g, '');
  return normalized ? sha256(normalized) : undefined;
};

/**
 * Read the pixel's first-party cookies off the incoming request. Match quality
 * drops sharply without these, so always pass the request through.
 */
export const metaCookiesFromRequest = (request: NextRequest) => ({
  fbp: request.cookies.get('_fbp')?.value,
  fbc: request.cookies.get('_fbc')?.value
});

const buildUserData = (user: MetaUserData) => {
  const data: Record<string, string | string[]> = {};

  if (user.email) data.em = [hashEmail(user.email)];
  if (user.phone) {
    const ph = hashPhone(user.phone);
    if (ph) data.ph = [ph];
  }
  if (user.firstName) {
    const fn = hashName(user.firstName);
    if (fn) data.fn = [fn];
  }
  if (user.lastName) {
    const ln = hashName(user.lastName);
    if (ln) data.ln = [ln];
  }
  if (user.city) {
    const ct = hashPlain(user.city);
    if (ct) data.ct = [ct];
  }
  if (user.state) {
    const st = hashPlain(user.state);
    if (st) data.st = [st];
  }
  if (user.zip) {
    const zp = hashPlain(user.zip);
    if (zp) data.zp = [zp];
  }
  if (user.country) {
    const country = hashPlain(user.country);
    if (country) data.country = [country];
  }

  // These three are sent unhashed by design — Meta matches on them directly.
  if (user.clientIp && user.clientIp !== 'unknown') data.client_ip_address = user.clientIp;
  if (user.userAgent) data.client_user_agent = user.userAgent;
  if (user.fbp) data.fbp = user.fbp;
  if (user.fbc) data.fbc = user.fbc;

  return data;
};

export async function sendMetaCapiEvent({
  eventName,
  eventId,
  eventSourceUrl,
  userData,
  customData,
  eventTime,
  actionSource = 'website'
}: {
  eventName: string;
  /** MUST match the browser pixel's `eventID` for the same action, or Meta counts it twice. */
  eventId: string;
  eventSourceUrl?: string;
  userData: MetaUserData;
  customData?: Record<string, unknown>;
  eventTime?: number;
  actionSource?: 'website' | 'email' | 'phone_call' | 'chat' | 'system_generated' | 'other';
}): Promise<MetaCapiResult> {
  const pixelId = process.env.NEXT_PUBLIC_META_PIXEL_ID;
  const accessToken = process.env.META_CAPI_ACCESS_TOKEN;

  if (!pixelId || !accessToken) {
    return {
      ok: false,
      skipped: true,
      status: 503,
      error: 'Meta CAPI not configured. Add NEXT_PUBLIC_META_PIXEL_ID and META_CAPI_ACCESS_TOKEN.'
    };
  }

  const apiVersion = process.env.META_API_VERSION || DEFAULT_API_VERSION;
  const testEventCode = process.env.META_TEST_EVENT_CODE;

  const body: Record<string, unknown> = {
    data: [
      {
        event_name: eventName,
        event_id: eventId,
        event_time: eventTime ?? Math.floor(Date.now() / 1000),
        action_source: actionSource,
        ...(eventSourceUrl ? { event_source_url: eventSourceUrl } : {}),
        user_data: buildUserData(userData),
        ...(customData ? { custom_data: customData } : {})
      }
    ],
    access_token: accessToken
  };

  // Routes events to Events Manager > Test Events instead of production data.
  if (testEventCode) body.test_event_code = testEventCode;

  try {
    const response = await fetch(`https://graph.facebook.com/${apiVersion}/${pixelId}/events`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(body),
      cache: 'no-store'
    });

    const data = await response.json().catch(() => ({}));

    if (!response.ok) {
      return {
        ok: false,
        skipped: false,
        status: response.status,
        error: data?.error?.message || 'Meta CAPI event failed.'
      };
    }

    return { ok: true, skipped: false, status: response.status, data };
  } catch (error) {
    return {
      ok: false,
      skipped: false,
      status: 0,
      error: error instanceof Error ? error.message : 'Meta CAPI request failed.'
    };
  }
}
