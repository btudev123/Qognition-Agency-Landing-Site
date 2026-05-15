export const dynamic = 'force-dynamic';

const mask = (value?: string) => {
  if (!value) return null;
  if (value.length <= 8) return `${value.slice(0, 2)}...`;
  return `${value.slice(0, 4)}...${value.slice(-4)}`;
};

export function GET() {
  const portalId = process.env.HUBSPOT_PORTAL_ID;
  const formGuid = process.env.HUBSPOT_LEAD_FORM_GUID;
  const resendKey = process.env.RESEND_API_KEY;
  const resendFrom = process.env.RESEND_FROM;
  const notifyEmail = process.env.AUDIT_NOTIFY_EMAIL;

  return Response.json({
    ok: true,
    hubspot: {
      configured: Boolean(portalId && formGuid),
      portalId: mask(portalId),
      formGuid: mask(formGuid),
      requiredEnv: ['HUBSPOT_PORTAL_ID', 'HUBSPOT_LEAD_FORM_GUID'],
      optionalFieldEnv: [
        'HUBSPOT_FIELD_AUDIT_TYPE',
        'HUBSPOT_FIELD_AUDIT_SCORE',
        'HUBSPOT_FIELD_AUDIT_SUMMARY',
        'HUBSPOT_FIELD_SOURCE_URL'
      ]
    },
    resend: {
      configured: Boolean(resendKey && resendFrom),
      apiKey: resendKey ? 'configured' : null,
      from: resendFrom || null,
      notifyEmail: notifyEmail || null,
      requiredEnv: ['RESEND_API_KEY', 'RESEND_FROM'],
      optionalEnv: ['AUDIT_NOTIFY_EMAIL']
    }
  });
}
