import { createHash, timingSafeEqual } from 'node:crypto';
import { liveLeadWritesAllowed } from '../../../../lib/deploymentMode';
import { NextRequest, NextResponse } from 'next/server';

export const dynamic = 'force-dynamic';

/**
 * Configuration health check for the lead pipeline.
 *
 * Resend is the only lead acceptance boundary (operator, 2026-10-14): /api/lead reports
 * success only when Resend accepts the hello@ notification. Cal.com is the booking system;
 * its webhook (app/api/cal/webhook) records walkthrough_booked and needs CALCOM_WEBHOOK_SECRET.
 *
 * Unauthenticated callers get only {ok:true}: which integrations are missing is
 * reconnaissance. With a matching x-status-secret the response reports whether
 * each credential is *present*. Presence is not proof a credential works, so
 * `?deep=1` also calls Resend for real and reports the actual HTTP status.
 */
const secretMatches = (supplied: string | null) => {
  const secret = process.env.INTEGRATIONS_STATUS_SECRET;
  if (!secret || !supplied) return false;
  const digest = (value: string) => createHash('sha256').update(value).digest();
  return timingSafeEqual(digest(supplied), digest(secret));
};

type ProbeResult = { reachable: boolean; status: number; error?: string };

const probe = async (url: string, headers: Record<string, string>): Promise<ProbeResult> => {
  try {
    const response = await fetch(url, { headers, cache: 'no-store', signal: AbortSignal.timeout(10000) });
    if (response.ok) return { reachable: true, status: response.status };
    const body = (await response.json().catch(() => ({}))) as { message?: string; error?: { message?: string } };
    return {
      reachable: false,
      status: response.status,
      error: body?.message || body?.error?.message || `HTTP ${response.status}`,
    };
  } catch (error) {
    return { reachable: false, status: 0, error: error instanceof Error ? error.message : 'Request failed.' };
  }
};

export async function GET(request: NextRequest) {
  if (!secretMatches(request.headers.get('x-status-secret'))) return NextResponse.json({ ok: true });
  const resendKey = process.env.RESEND_API_KEY;
  const resendFrom = process.env.RESEND_FROM;
  const notifyEmail = process.env.AUDIT_NOTIFY_EMAIL;
  const metaPixelId = process.env.NEXT_PUBLIC_META_PIXEL_ID;
  const metaToken = process.env.META_CAPI_ACCESS_TOKEN;
  const metaTestCode = process.env.META_TEST_EVENT_CODE;
  const calApiKey = process.env.CALCOM_API_KEY;
  const calWebhookSecret = process.env.CALCOM_WEBHOOK_SECRET;

  const payload: Record<string, unknown> = {
    ok: true,
    resend: {
      configured: Boolean(resendKey && resendFrom),
      apiKey: resendKey ? 'configured' : null,
      senderConfigured: Boolean(resendFrom),
      notificationRecipientConfigured: Boolean(notifyEmail),
      requiredEnv: ['RESEND_API_KEY', 'RESEND_FROM'],
      optionalEnv: ['AUDIT_NOTIFY_EMAIL'],
    },
    meta: {
      pixelConfigured: Boolean(metaPixelId),
      capiConfigured: Boolean(metaPixelId && metaToken),
      accessToken: metaToken ? 'configured' : null,
      testMode: Boolean(metaTestCode),
      requiredEnv: ['NEXT_PUBLIC_META_PIXEL_ID', 'META_CAPI_ACCESS_TOKEN'],
      optionalEnv: ['META_API_VERSION', 'META_TEST_EVENT_CODE'],
    },
    rateLimit: {
      // In-memory by design — no external store, nothing to configure.
      // State is per serverless instance; see lib/auditRateLimit.ts.
      configured: true,
      storage: 'in-memory-per-instance',
      requiredEnv: [],
    },
    calcom: {
      // Presence only. No code calls the Cal.com API today; the key is reported because it is set.
      apiKeyConfigured: Boolean(calApiKey?.trim()),
      // Without it the booking webhook refuses every delivery (503) and walkthrough_booked is never recorded.
      webhookSecretConfigured: Boolean(calWebhookSecret?.trim()),
      requiredEnv: ['CALCOM_WEBHOOK_SECRET'],
      optionalEnv: ['CALCOM_API_KEY'],
    },
    capture: { boundary: 'resend', configured: Boolean(resendKey && resendFrom), liveWritesAllowed: liveLeadWritesAllowed(), verified: false },
    notificationDelivery: 'synchronous-before-success',
  };

  if (request.nextUrl.searchParams.get('deep') !== '1') {
    return NextResponse.json(payload);
  }

  const resendProbe = resendKey
    ? await probe('https://api.resend.com/domains', { Authorization: `Bearer ${resendKey}` })
    : ({ reachable: false, status: 503, error: 'RESEND_API_KEY not set.' } as ProbeResult);

  return NextResponse.json({ ...payload, deep: { resend: resendProbe } });
}
