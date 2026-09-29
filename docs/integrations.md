# Qognition lead capture and revenue funnel

Updated 2026-09-24. The implementation, rather than earlier setup notes, is the source of truth.

## System of record and acceptance

`POST /api/lead` validates the inquiry, checks a honeypot and an in-memory IP burst limit, then emails the agency inbox (`AUDIT_NOTIFY_EMAIL`, default `hello@qognitionagency.com`) through Resend. Email is the primary and required delivery path. GoHighLevel (LeadConnector) capture is best-effort and optional; a missing or failing CRM integration never turns a prospect away. A lead is accepted when either the notification email sends or GHL captures the contact. If neither succeeds, the lead is logged via `recordFailedLead` and the request returns a retryable `503`; the form keeps the same submission ID on an unchanged retry. There is no public Sanity lead storage, additional database, automatic retry queue, or guaranteed offline capture.

The API retains legacy `service`, `intent`, `contact`, `source_page`, `utm`, and `event_id` fields. New optional fields are `submission_id`, `context`, `qualification`, `consent`, and `attribution`; see `lib/validation.ts`. Existing integrations without consent still receive inquiry handling, but do not enroll in marketing email or send advertising events. A newsletter request requires affirmative email opt-in.

GHL is authoritative for appointments, sales acceptance, opportunities, nurture, DND, and reporting. A calendar view is not a booking; the website emits `booking_widget_view`, never a `Schedule` conversion on iframe load. Website booking/lifecycle webhook ingestion and offline GA4 MQL/SQL uploads are deliberately deferred.

## Required GHL configuration

Use the existing Qognition subaccount after verifying its owner and calendar. Create a server-only private integration with contact read/write scopes. Store its value through deployment secrets, never in source or a public variable.

Set these names in the deployment environment:

| Variable | Purpose |
| --- | --- |
| `GHL_PRIVATE_INTEGRATION_TOKEN` | Scoped server-side API access |
| `GHL_LOCATION_ID` | Verified Qognition GHL subaccount |
| `GHL_INQUIRY_FIELD_ID` | Dedicated multiline contact field: latest complete inquiry JSON |
| `GHL_SUBMISSION_FIELD_ID` | Dedicated multiline contact field: recent submission receipt JSON |
| `GHL_QUALIFICATION_FIELD_ID` | Dedicated text field: website eligibility, `Lead` or `MQL` |
| `GHL_MARKETING_CONSENT_FIELD_ID` | Dedicated text field: latest explicit website email choice |
| `GHL_LOCALE_FIELD_ID` | Dedicated text field: preferred website language |

All five custom fields must be dedicated website fields, not an existing lifecycle, DND, ownership, or opportunity-stage field. Verify field type/length with a representative large inquiry before enabling production. The API checks readback to avoid accepting a provider response that silently dropped the inquiry.

Set contact duplicate handling to email-first matching and disallow duplicate email contacts. The adapter normalizes email, requests upsert without duplicate creation, and checks that an existing match was not replaced with a different contact. It patches only dedicated website custom fields and does not write `tags`, `assignedTo`, DND, or opportunity stages. An existing contact's name/company/website are not overwritten by an unauthenticated inquiry. A supplied phone is retained in the inquiry for sales review but is not used for contact matching, preventing a shared phone from merging separate email contacts.

## Qualification and sales handoff

Qualification version `2026-09-b2b-v1` establishes **eligibility for review** only. MQL eligibility requires all of: a stated B2B business, company website, stated 20-300 employee band or USD 3M-500M annual revenue band, and an audit/consultation/pricing request. Other inquiries remain Lead, with missing information recorded for a human. These are self-reported signals, not verified company facts. No automatic SQL or opportunity creation occurs in the website.

Create native GHL workflows with:

1. A new website inquiry trigger, internal notification and fallback owner. Preserve an existing owner. Create a review task and track response time.
2. An MQL eligibility branch that alerts sales; only a salesperson accepting the need, buying involvement, commercial fit and next step can move the actual lifecycle to SQL.
3. Nurture only when the latest explicit email choice is `opted-in` **and** current GHL DND permits the channel. A form checkbox must never reset a previous unsubscribe automatically.
4. Workflow re-entry disabled for the nurture program. Stop nurture on reply, appointment booking, sales acceptance, disqualification, unsubscribe or DND changes. A repeat contact upsert must not restart it.
5. Native calendar confirmation, rescheduling, cancellation, attendance and no-show tracking. Booking is separate from SQL acceptance. Verify real calendar duration before publishing duration promises.
6. Locale branches for `en`, `de`, `fr`, `nl`, `sv`, `da`, `nb`, `fi`, `ar`, `it`, `zh-Hans`. Localize approved messages in GHL; website form and optional receipt language already use this preference.

The site stores the latest complete inquiry and the most recent 20 receipt IDs/hashes. Configure a native GHL workflow to copy each new inquiry into a contact note if a complete historical inquiry log is needed. The website does not promise that history automatically. Recent identical retries return success without another write. Same-process races are serialized, but GHL read-modify-write is not a distributed transaction: simultaneous requests across serverless instances can race. Native duplicate policy and non-reentrant workflows are essential. This is not an exactly-once messaging system.

## Email delivery

Resend is the primary receipt/notification mechanism. Every submission emails `AUDIT_NOTIFY_EMAIL` (the agency inbox) and sends a confirmation to the lead. Set `RESEND_API_KEY` and a verified `RESEND_FROM` sending domain. GHL native workflows are an optional secondary record and follow-up mechanism, not a dependency of acceptance.

Optional email/CAPI tasks run after durable delivery. Failure does not lose the stored contact, but no automatic website replay is guaranteed. Failure logs contain a submission ID, not contact PII or provider credentials.

`/api/audit` is live again and no longer returns 410. It has two halves. The crawl half (`lib/auditEngine.ts`, 28 checks against the page plus robots.txt, sitemap.xml and llm.txt) is free, needs no key and always runs. The AI half (`lib/audit/aiVisibility.ts`) asks one buyer prompt on Perplexity Sonar and is optional: with `PERPLEXITY_API_KEY` unset, over quota, timed out, or with no category readable from the page title, the response carries `aiVisibility.status = 'not_checked'` with a reason and a sentence to render. It never returns a guess, and today no provider is configured in production, so `not_checked` is the expected response.

Spend control on that endpoint is a hard cap in the Perplexity dashboard plus `lib/auditRateLimit.ts` (one audit per email per 24h, 12 per IP per hour). That rate limiter is in-memory and per-instance, and Redis is unset in production, so it throttles rather than caps; the provider-side cap is the only real ceiling. Deliberately no ledger, no queue and no Redis: ADR-0003 §6's durable-ledger requirement covers the 45-call `/api/snapshot` product, which is not built and which this endpoint must not grow into without returning to that ADR.

The AI Search Visibility Report page (`/free-ai-audit`) still requests a human review through `/api/lead`; no guaranteed AI citation is promised anywhere.

## Consent and attribution

Render `ConsentManager` and `AcquisitionTracker` once in the root layout. Wrap analytics scripts in `ConsentScripts category="analytics"`; wrap advertising/visitor identification in the advertising category. MetaPixel gates itself. Do not leave tracking `noscript` iframes outside consent gates. A marketing-script environment flag is not visitor consent.

The preference UI offers equal reject/save/allow controls, a persistent settings button, and translated labels. Analytics/advertising default on until an explicit choice is recorded (opt-out), so paid-funnel measurement fires by default while the banner still offers an equal opt-out. Revocation clears known tracking cookies and reloads to unload SDKs. Forms work with optional tracking rejected. Email marketing is an independent, unchecked form choice. Consent preferences and inquiry choices are versioned; current form preferences are sent with the request. Browser and server Meta events require advertising consent.

With analytics consent, session attribution records immutable first campaign/landing page, latest campaign, and referrer host. No query string or contact PII is sent into the dataLayer. Without consent, the necessary inquiry source page remains available but no session campaign history is stored. Report GA4 acquisition alongside GHL lifecycle outcomes using captured campaign, page, locale and segment context; do not claim complete person-level attribution.

## Verification and launch gates

Run `node scripts/test-lead-funnel.cjs`. All network requests are mocked. The suite covers legacy payloads, MQL eligibility, missing configuration, unavailable CRM, preservation of existing sales state, readback failure, repeat/conflicting submissions, local concurrency, consent and attribution. Run typecheck and the production build afterward.

`GET /api/integrations/status` reports configuration presence without proving credentials work. No live lead should be sent during routine tests. Before production launch, use an explicitly authorized test contact to prove contact/inquiry persistence, workflow re-entry behavior, receipt language, opt-out suppression and native booking records. Confirm `503` when credentials are disabled, and verify the same form can retry after restoration. Verify optional scripts are absent from network activity before consent and after revocation. Verify a calendar view never counts as a booking.

GHL authorization, custom field IDs, pipeline/workflow setup, owner routing, sending-domain verification, and production secrets are external launch dependencies. Code alone does not provision them.

## Provider references

- [Contact upsert and duplicate semantics](https://marketplace.gohighlevel.com/docs/2021-07-28/ghl/contacts/upsert-contact/)
- [Contact lookup](https://marketplace.gohighlevel.com/docs/2021-07-28/ghl/contacts/get-duplicate-contact/)
- [Private integration access](https://marketplace.gohighlevel.com/docs/Authorization/PrivateIntegrationsToken/)
- [Webhook authenticity for a future event integration](https://marketplace.gohighlevel.com/docs/webhook/WebhookIntegrationGuide/): use current `X-GHL-Signature` Ed25519 verification, not the retired legacy RSA scheme.
