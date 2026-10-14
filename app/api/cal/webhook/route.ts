import { createHmac, timingSafeEqual } from 'node:crypto';
import { NextRequest, NextResponse } from 'next/server';
import { liveLeadWritesAllowed } from '../../../../lib/deploymentMode';

export const dynamic = 'force-dynamic';

/**
 * Cal.com booking webhook -> walkthrough_booked, the North Star (CLAUDE.md §8).
 *
 * The booking happens inside the Cal.com embed, which the page cannot see, so a click is
 * never a booking (components/shared/CalBooking.tsx). This route is the only place a
 * completed booking is counted, and only for BOOKING_CREATED.
 *
 * Configure in Cal.com: Settings -> Developer -> Webhooks
 *   URL:     https://www.qognitionagency.com/api/cal/webhook
 *   Trigger: Booking created
 *   Secret:  must match CALCOM_WEBHOOK_SECRET
 * [NEEDS DATA: CALCOM_WEBHOOK_SECRET is not on Vercel yet. Until it is, every delivery is a 503.]
 *
 * Signature: Cal.com sends x-cal-signature-256, the hex HMAC-SHA256 of the raw body under the
 * webhook secret. Format confirmed from Cal.com's source (sendPayload.ts, Anton's review,
 * 2026-10-14). A live Ping test is still pending until CALCOM_WEBHOOK_SECRET is set.
 *
 * Replays: a signed body stays valid forever, so a BOOKING_CREATED whose createdAt is missing
 * or more than 24 hours old is acknowledged and not counted.
 *
 * Analytics: there is no server-side GA4 path in this codebase (no Measurement Protocol
 * client, no API secret), and Meta CAPI is not used here. A webhook carries no visitor
 * consent evidence and no browser identifiers, and attendee details may not go into
 * analytics, so a CAPI 'Schedule' would be both unconsented and unmatchable. The booking is
 * therefore RECORDED as a structured log line with no attendee data, and nothing is sent.
 *
 * Duplicates: there is no store, so a redelivered webhook logs twice. Count distinct
 * booking_uid values, never raw lines.
 */
const SIGNATURE_HEADER = 'x-cal-signature-256';
/** 200 KB, in bytes. A real booking payload is a few KB. */
const MAX_BODY_BYTES = 200_000;
const MAX_AGE_MS = 24 * 60 * 60 * 1000;

/** Constant-time compare of the supplied hex digest against our own. */
function signatureValid(body: string, supplied: string | null, secret: string) {
  if (!supplied || !/^[a-f0-9]{64}$/i.test(supplied)) return false;
  const expected = createHmac('sha256', secret).update(body).digest();
  return timingSafeEqual(Buffer.from(supplied, 'hex'), expected);
}

/** Only shapes that cannot carry a name, an address or free text reach the log. */
const bookingUid = (value: unknown) => typeof value === 'string' && /^[A-Za-z0-9_-]{1,64}$/.test(value) ? value : null;
const eventType = (value: unknown) => typeof value === 'string' && /^[a-z0-9][a-z0-9-]{0,63}$/.test(value) ? value : null;
const startTime = (value: unknown) =>
  typeof value === 'string' && /^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}(:\d{2}(\.\d{1,3})?)?(Z|[+-]\d{2}:\d{2})$/.test(value) && !Number.isNaN(Date.parse(value)) ? value : null;

export async function POST(request: NextRequest) {
  const secret = process.env.CALCOM_WEBHOOK_SECRET?.trim();
  if (!secret) {
    console.error('[Booking] webhook_config_missing', { env: 'CALCOM_WEBHOOK_SECRET' });
    return NextResponse.json({ error: 'Booking webhook is not configured.' }, { status: 503 });
  }

  // Refuse a declared oversize before reading anything (Anton F6).
  const tooLarge = () => NextResponse.json({ error: 'Request is too large.' }, { status: 413 });
  if (Number(request.headers.get('content-length')) > MAX_BODY_BYTES) return tooLarge();
  // The raw body is required: re-serialising JSON would break the signature. Measured in bytes,
  // because the header can be absent (chunked) and UTF-16 length undercounts multi-byte text.
  const body = await request.text();
  if (Buffer.byteLength(body, 'utf8') > MAX_BODY_BYTES) return tooLarge();
  const supplied = request.headers.get(SIGNATURE_HEADER);
  if (!signatureValid(body, supplied, secret)) {
    console.warn('[Booking] webhook_signature_invalid', { reason: supplied ? 'mismatch' : 'missing' });
    return NextResponse.json({ error: 'Invalid signature.' }, { status: 401 });
  }

  // A preview never counts the North Star. 200, so Cal.com does not treat it as a failure.
  if (!liveLeadWritesAllowed()) return NextResponse.json({ received: true, preview: true });

  let event: { triggerEvent?: unknown; createdAt?: unknown; payload?: Record<string, unknown> };
  try { event = JSON.parse(body); }
  catch { return NextResponse.json({ error: 'Invalid JSON body.' }, { status: 400 }); }

  // Cancellations, reschedules and the dashboard ping are acknowledged, never counted.
  if (event?.triggerEvent !== 'BOOKING_CREATED') return NextResponse.json({ received: true, ignored: true });

  const createdAt = typeof event.createdAt === 'string' ? Date.parse(event.createdAt) : NaN;
  if (!(Date.now() - createdAt <= MAX_AGE_MS)) {
    console.warn('[Booking] webhook_stale');
    return NextResponse.json({ received: true, ignored: true });
  }

  const payload = event.payload && typeof event.payload === 'object' ? event.payload : {};
  console.info('[Booking] walkthrough_booked', {
    booking_uid: bookingUid(payload.uid),
    event_type: eventType(payload.type),
    start_time: startTime(payload.startTime),
    analytics: 'recorded_only',
  });
  return NextResponse.json({ received: true, event: 'walkthrough_booked' });
}
