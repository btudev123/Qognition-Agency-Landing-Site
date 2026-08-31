# Lead Pipeline Integrations

Resend for delivery, Meta Pixel + Conversions API for measurement, Upstash for
rate limiting. **There is no CRM in this pipeline** — every lead is delivered by
email to `AUDIT_NOTIFY_EMAIL` (`hello@qognitionagency.com`).

## Architecture

`POST /api/lead` is the single lead endpoint. Every form on the site posts to it
(`components/shared/LeadForm.tsx` and `components/shared/HeroRoiCalculator.tsx`).
On each submission it:

1. Validates against `leadSchema` (`lib/validation.ts`) and drops honeypot hits.
2. Rate-limits by hashed email + IP + device cookie.
3. In parallel: an internal notification email to `AUDIT_NOTIFY_EMAIL`, a
   confirmation email to the lead, and a Meta Conversions API `Lead` event.
4. Returns `200` with a `delivery` summary, then — for audit requests that
   supplied a website — runs the real audit **after** the response via Next.js
   `after()` and emails the scored report with a PDF attachment.

`POST /api/audit` is the public/agent-facing endpoint (documented in
`/.well-known/openapi.json`, used by the WebMCP `run_qognition_audit` tool). It
shares the same scoring code in `lib/auditEngine.ts`, so a report is identical
whichever door it comes in.

Requests are rate-limited to one per day per email, IP, and device cookie.
Local development uses an in-memory limiter; **production should set
`UPSTASH_REDIS_REST_URL` and `UPSTASH_REDIS_REST_TOKEN`** — the in-memory
fallback is per-lambda and does not work across serverless instances.

## Failure behaviour

Delivery never blocks a submission: a prospect always sees success. That means
failures are invisible unless you look for them, so:

- Every failed channel logs `[Lead] delivery_failure {...}` with the channel,
  status, error, email, and source page.
- If the internal notification does not land, the raw lead is pushed to the
  `leads:deadletter` Redis list (newest 500 kept) for replay.
- The response body carries a `delivery` object you can inspect directly.

**An environment variable can be registered on Vercel and still not reach the
runtime.** Vercel bakes env vars in at *build* time, so a deployment built
before a variable was added never sees it — the dashboard looks correct while
every integration silently no-ops. Note also that `vercel env pull` cannot read
back values on this project (they are stored non-readable), so a blank value in
a pulled file proves nothing. **Verify against the running site, not the
dashboard, and redeploy after any env change.**

## Required environment variables

Add to `.env.local` locally and to Vercel Project Settings for production. See
`.env.example` for the annotated list.

```bash
RESEND_API_KEY=
RESEND_FROM=Qognition Agency <hello@qognitionagency.com>
AUDIT_NOTIFY_EMAIL=hello@qognitionagency.com
UPSTASH_REDIS_REST_URL=
UPSTASH_REDIS_REST_TOKEN=
NEXT_PUBLIC_META_PIXEL_ID=
META_CAPI_ACCESS_TOKEN=
```

Do not commit `.env.local`.

## Resend

1. Verify the sending domain for `qognitionagency.com`.
2. Create an API key → `RESEND_API_KEY`.
3. Set `RESEND_FROM` to a verified sender.
4. Set `AUDIT_NOTIFY_EMAIL` — this is where every lead lands.

If `RESEND_API_KEY` or `RESEND_FROM` is missing, `sendResendEmail` returns
`{ok:false, skipped:true}` without calling Resend. The API still returns `200`;
nothing is delivered. This is the single most important thing to verify.

## Meta Pixel + Conversions API

Two halves that must stay in lockstep:

- **Browser** — `components/shared/MetaPixel.tsx`, rendered from
  `app/layout.tsx`. Loads `fbevents.js`, fires `PageView` on load and on client
  route changes. Renders nothing unless `NEXT_PUBLIC_META_PIXEL_ID` is set.
- **Server** — `lib/metaCapi.ts`. Posts to the Graph API `/{pixel}/events`
  endpoint with SHA-256 hashed, normalized user data (`em`, `ph`, `fn`, `ln`)
  plus unhashed IP, user agent, and the `_fbp` / `_fbc` cookies read off the
  request. Match quality drops sharply without those cookies.

### Deduplication contract

Meta collapses a browser event and a server event into one conversion **only**
when both `event_name` and `event_id` match. The flow:

1. The form calls `newEventId()` (`lib/analytics.ts`) **before** the POST.
2. It sends that id as `event_id` in the `/api/lead` body.
3. The server fires CAPI `Lead` with that exact id — never a regenerated one —
   and echoes it back as `event_id` in the response.
4. On success the form fires `fbq('track', 'Lead', {...}, { eventID })` with the
   id the server echoed.

If a client omits `event_id` (JS blocked, direct API call), the server generates
one. That event simply will not dedup, which is correct — there is no twin.

### Setup

1. Events Manager → Data Sources → Add → **Web** → copy the Pixel ID into
   `NEXT_PUBLIC_META_PIXEL_ID`.
2. That pixel → Settings → Conversions API → **Generate access token** →
   `META_CAPI_ACCESS_TOKEN`. Server-only; never prefix it with `NEXT_PUBLIC_`.
3. Set `META_TEST_EVENT_CODE` while validating so events land in Test Events
   instead of production data. **Remove it before going live.**

## Verification

Shallow config check (safe, public):

```bash
curl -s https://www.qognitionagency.com/api/integrations/status | python3 -m json.tool
```

Deep check — actually calls Resend to prove the key works. Requires
`INTEGRATIONS_STATUS_SECRET`:

```bash
curl -s -H "x-status-secret: $INTEGRATIONS_STATUS_SECRET" \
  'https://www.qognitionagency.com/api/integrations/status?deep=1' | python3 -m json.tool
```

End-to-end lead + instant audit:

```bash
curl -s -X POST http://localhost:3000/api/lead \
  -H "Content-Type: application/json" \
  -d '{"service":"marketing","intent":"audit","source_page":"/free-seo-audit",
       "contact":{"name":"Test Lead","email":"hello@qognitionagency.com","company_url":"example.com"},
       "event_id":"test-dedup-001"}' | python3 -m json.tool
```

Public audit endpoint:

```bash
curl -s -X POST http://localhost:3000/api/audit \
  -H "Content-Type: application/json" \
  -d '{"url":"https://www.qognitionagency.com","email":"hello@qognitionagency.com","auditType":"seo","source":"Local integration test"}'
```

Meta deduplication — the check that proves the wiring: with
`META_TEST_EVENT_CODE` set, submit a real form in a browser. Events Manager →
Test Events must show one `Lead` received from **both Browser and Server**,
marked **Deduplicated**. Two separate `Lead` events means the `event_id` is not
surviving the round trip.
