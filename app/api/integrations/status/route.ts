import { NextRequest, NextResponse } from 'next/server';
import { crmConfiguration } from '../../../../lib/leadCrm';

export const dynamic = 'force-dynamic';

/**
 * Configuration health check for the lead pipeline.
 *
 * GHL is the durable capture destination; Resend receipts are optional.
 *
 * The shallow response reports whether each credential is *present*. Presence
 * is not proof a credential works — that gap is what let the pipeline sit
 * silently broken — so `?deep=1` calls Resend for real and reports the actual
 * HTTP status. That spends live API quota, so it requires
 * INTEGRATIONS_STATUS_SECRET.
 */

type ProbeResult = { reachable: boolean; status: number; error?: string };

const probe = async (url: string, headers: Record<string, string>): Promise<ProbeResult> => {
  try {
    const response = await fetch(url, { headers, cache: 'no-store' });
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
    crm: { ...crmConfiguration(), provider: 'highlevel', verified: false },
    emailReceiptsEnabled: process.env.LEAD_SEND_EMAIL_RECEIPTS === 'true',
  };

  if (request.nextUrl.searchParams.get('deep') !== '1') {
    return NextResponse.json(payload);
  }

  const secret = process.env.INTEGRATIONS_STATUS_SECRET;
  if (!secret || request.headers.get('x-status-secret') !== secret) {
    return NextResponse.json(
      { ...payload, deep: { error: 'Deep check requires a matching x-status-secret header.' } },
      { status: 401 },
    );
  }

  const resendProbe = resendKey
    ? await probe('https://api.resend.com/domains', { Authorization: `Bearer ${resendKey}` })
    : ({ reachable: false, status: 503, error: 'RESEND_API_KEY not set.' } as ProbeResult);

  return NextResponse.json({ ...payload, deep: { resend: resendProbe } });
}
