import { createHash, timingSafeEqual } from 'node:crypto';
import { liveLeadWritesAllowed } from '../../../../lib/deploymentMode';
import { NextRequest, NextResponse } from 'next/server';
import { leadCaptureConfiguration } from '../../../../lib/leadCrm';

export const dynamic = 'force-dynamic';

/**
 * Configuration health check for the lead pipeline.
 *
 * GHL is the capture destination. Until it is configured, or when it fails, the
 * internal Resend email is the lead record (LEAD_EMAIL_FALLBACK, default on).
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
    capture: { ...leadCaptureConfiguration(), liveWritesAllowed: liveLeadWritesAllowed(), verified: false },
    notificationDelivery: process.env.LEAD_EMAIL_FALLBACK === 'off'
      ? 'after-confirmed-crm-capture'
      : 'after-crm-capture-or-synchronous-email-fallback',
  };

  if (request.nextUrl.searchParams.get('deep') !== '1') {
    return NextResponse.json(payload);
  }

  const resendProbe = resendKey
    ? await probe('https://api.resend.com/domains', { Authorization: `Bearer ${resendKey}` })
    : ({ reachable: false, status: 503, error: 'RESEND_API_KEY not set.' } as ProbeResult);

  return NextResponse.json({ ...payload, deep: { resend: resendProbe } });
}
