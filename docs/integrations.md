# Resend and HubSpot Setup

This site already sends audit leads through `POST /api/audit`.

When a visitor requests an audit, the API:

1. Runs the fast website audit.
2. Sends the lead and report summary to HubSpot.
3. Sends the branded report email through Resend.
4. Returns the report JSON immediately so the page can show results without waiting for email delivery.

## Required Environment Variables

Add these in `.env.local` for local development and in Vercel Project Settings for production:

```bash
HUBSPOT_PORTAL_ID=
HUBSPOT_LEAD_FORM_GUID=
RESEND_API_KEY=
RESEND_FROM=Qognition Agency <hello@qognitionagency.com>
AUDIT_NOTIFY_EMAIL=hello@qognitionagency.com
```

Do not commit `.env.local`.

## HubSpot

Use a regular HubSpot form for audit leads. The form should include at minimum:

- `email`
- `website`
- `message`

Recommended custom contact properties:

- `audit_type`
- `audit_score`
- `audit_summary`
- `source_url`

The default field names are already set in `.env.example`. If HubSpot uses different internal names, map them with:

```bash
HUBSPOT_FIELD_AUDIT_TYPE=audit_type
HUBSPOT_FIELD_AUDIT_SCORE=audit_score
HUBSPOT_FIELD_AUDIT_SUMMARY=audit_summary
HUBSPOT_FIELD_SOURCE_URL=source_url
```

The code has a fallback: if HubSpot rejects custom audit fields because they are not on the form yet, it retries with core fields and stores the audit details in the message field so the lead is not lost.

## Resend

In Resend:

1. Verify the sending domain for `qognitionagency.com`.
2. Create an API key.
3. Set `RESEND_FROM` to a verified sender, for example `Qognition Agency <hello@qognitionagency.com>`.
4. Set `AUDIT_NOTIFY_EMAIL` if you want Qognition to receive a copy of every audit report.

## Verification

Check config status:

```bash
curl http://localhost:3000/api/integrations/status
```

Run a test audit:

```bash
curl -X POST http://localhost:3000/api/audit \
  -H "Content-Type: application/json" \
  -d '{"url":"https://www.qognitionagency.com","email":"hello@qognitionagency.com","auditType":"seo","source":"Local integration test"}'
```

Expected result:

- `delivery.hubSpot.ok` is `true` when HubSpot is configured correctly.
- `delivery.resend.ok` is `true` when Resend is configured correctly.
- `delivery.*.skipped` is `true` only when the matching env vars are missing.

