import { NextRequest, NextResponse } from 'next/server';
import { leadSchema } from '../../../lib/validation';
import { sendLeadNotification, sendLeadConfirmation } from '../../../lib/leadDelivery';
import { pushLeadToZoho } from '../../../lib/zoho';
import { checkAuditRateLimit, getAuditDeviceCookie, recordAuditRateLimit } from '../../../lib/auditRateLimit';

export const dynamic = 'force-dynamic';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json().catch(() => null);
    if (!body || typeof body !== 'object') {
      return NextResponse.json({ error: 'Invalid request body.' }, { status: 400 });
    }

    const parsed = leadSchema.safeParse(body);
    if (!parsed.success) {
      const errors = parsed.error.flatten().fieldErrors;
      return NextResponse.json({ error: 'Validation failed.', fields: errors }, { status: 400 });
    }

    const lead = parsed.data;

    if (lead.honeypot && lead.honeypot.length > 0) {
      return NextResponse.json({ success: true, message: 'Thank you.' }, { status: 200 });
    }

    const rateLimit = await checkAuditRateLimit(request, lead.contact.email);
    if (!rateLimit.allowed) {
      const response = NextResponse.json(
        {
          error: 'You already submitted a request from this email, IP, or device. Please try again later.',
          retryAfterSeconds: rateLimit.retryAfterSeconds,
        },
        {
          status: 429,
          headers: { 'Retry-After': String(rateLimit.retryAfterSeconds) },
        },
      );
      response.cookies.set(getAuditDeviceCookie(), rateLimit.deviceId, {
        maxAge: 60 * 60 * 24 * 365,
        httpOnly: true,
        sameSite: 'lax',
        secure: process.env.NODE_ENV === 'production',
        path: '/',
      });
      return response;
    }

    // Tag every lead so each funnel is filterable in Zoho. Explicit tag wins,
    // otherwise derive one from intent + spoke.
    const crmTag = lead.tag || `${lead.intent}:${lead.service}`;

    const [notifyResult, confirmResult, zohoResult] = await Promise.all([
      sendLeadNotification(lead),
      sendLeadConfirmation(lead),
      pushLeadToZoho(lead, { tag: crmTag }),
    ]);

    await recordAuditRateLimit(rateLimit.keys);

    const isAudit = lead.intent === 'audit';

    const response = NextResponse.json({
      success: true,
      message: isAudit
        ? 'Audit request received. Expect results within 48 hours.'
        : 'Message received. Expect a response within one business day.',
      nextStep: isAudit
        ? { calendly: 'https://cal.com/qognition-agency/15min' }
        : undefined,
    });

    response.cookies.set(getAuditDeviceCookie(), rateLimit.deviceId, {
      maxAge: 60 * 60 * 24 * 365,
      httpOnly: true,
      sameSite: 'lax',
      secure: process.env.NODE_ENV === 'production',
      path: '/',
    });

    if (!notifyResult.ok && !notifyResult.skipped) {
      console.error('[Lead] Notification email failed:', notifyResult.error);
    }
    if (!confirmResult.ok && !confirmResult.skipped) {
      console.error('[Lead] Confirmation email failed:', confirmResult.error);
    }
    if (!zohoResult.ok && !zohoResult.skipped) {
      console.error('[Lead] Zoho CRM push failed:', zohoResult.error);
    }

    return response;
  } catch (error) {
    console.error('[Lead] Unhandled error:', error);
    return NextResponse.json({ error: 'Something went wrong. Please try again.' }, { status: 500 });
  }
}
