# ADR-0010: Niche journeys, isolated previews and durable lead capture

- Status: implementation contract; independent security and quality review required before release
- Date: 2026-10-03
- Author: Kyle (architect), coordinated by M.A.R.S
- Scope: interface and rollout decisions only; no feature code in this ADR
- Supersedes conflicting design, public-pricing and preview restrictions in earlier planning documents through the user's latest explicit instructions. Existing logo, colours, typography, components, URLs and uncommitted work remain preserved.

## Decision

Keep one Next.js application and the existing four-level industry route shape. Map every taxonomy leaf to a funnel, but distinguish mapped, authored, reviewed-for-preview and approved-for-production content. Keep preview traffic and submissions isolated from production. Require a confirmed GHL contact and an append-only enquiry record before accepting a lead; use a durable shared ledger for concurrency, retries and notification receipts.

## Evidence and tenancy

The current code is a single-tenant public marketing site: no authentication/session dependency or tenant data model is present. `lib/leadCrm.ts` uses one server-configured `GHL_LOCATION_ID`; public callers must never supply a CRM location, API origin, credential, calendar or destination address. Environment plus server-configured GHL location scopes every new persistence key. Taxonomy data is public, committed and global; request input never alters it.

Original implementation gaps (identified before the changes in this branch):

- `app/api/lead/route.ts` currently accepts an email notification as sufficient even when GHL fails, contrary to the accepted plan.
- `lib/leadCrm.ts` stores the most recent enquiry and only twenty receipt references in contact custom fields. Its process-local `Map` cannot coordinate Vercel instances or preserve full enquiry history.
- `recordFailedLead` currently logs contact details and messages; replace this with allowlisted diagnostic codes and opaque submission IDs.
- `leadSchema.context` lacks `subindustry_id` and does not validate ID relationships.
- ICP route files currently use `dynamicParams = false`; only the explicit published set receives static parameters.
- Taxonomy sub-niches have only ID, name and slug. A computed registry is not authored evidence or a completed commercial page.

## 1. Taxonomy and journey contract

The locked source remains `data/b2b/icp/icp-taxonomy.json`, version 2.0.0. Preserve all 21 industries, 341 sub-industries, 2,376 niche entries and 8,823 sub-niche IDs. Do not regenerate IDs, flatten leaf slugs or collapse children because their parent niche has an overlap entry.

Each journey stores or deterministically resolves:

| Field | Contract |
| --- | --- |
| `id` | Stable sub-niche ID from the source; unique across the complete leaf walk |
| `taxonomy` | Original industry, sub-industry, niche and sub-niche IDs, plus the original four-part route |
| `canonicalNicheId` | Optional declared parent overlap target, separate from original parent identity |
| `audience`, `problem`, `commercialOutcome` | Specific B2B buyer and buying task; no internal qualification labels in public copy |
| `tofu`, `mofu`, `bofu` | Asset ID, destination and stage; MOFU/TOFU may be shared where the buying task is genuinely shared |
| `evidence` | Source references and an honest distinction between documented facts, editorial recommendations and examples |
| `review` | Content state, actual reviewer and date; never auto-fill an operator approval |
| `cta` | Commercial primary `/book`, secondary `/contact#enquiry`; retain originating taxonomy context |

BOFU uses `/industries/<industry>/<sub-industry>/<niche>/<sub-niche>`. Existing canonical aliases remain documented. A parent-level overlap is not inherited as a redirect/canonical decision for its distinct children. Resolve every leaf from its own ID/path before considering explicitly documented equivalence.

Public links may carry validated taxonomy IDs and an internal source path for context. Never carry contact details, messages or arbitrary redirect destinations in URLs. Server validation treats route/query context as untrusted reporting information, not qualification evidence.

Coverage states are separate counters, not synonyms:

1. **Mapped:** all IDs and three stage destinations resolve in the registry.
2. **Content complete:** all destination bodies exist; the BOFU page contains specific buyer problems, selection criteria/applications and Qognition deliverables for that leaf; required evidence and next steps are present.
3. **Preview ready:** completed content passed named content/technical review and is on the candidate allowlist.
4. **Published:** operator-approved content version is on the production allowlist.

Changing only a leaf name in inherited paragraphs never advances content completeness. Unreviewed records remain internal catalogue records and may be browsed as explicitly labelled drafts in the isolated review preview. Coverage reports must show those gaps rather than silently counting mapped journeys as finished.

## 2. Publication and preview contract

Use separate draft-preview routing and production allowlists. Adding a taxonomy row or a journey must not create a production route. The isolated preview may expose mapped drafts for review, with their incomplete status shown; this does not make them content-complete or preview-ready. Reviewed candidates require an authored body/version and named review. None of these states mutate `ICP_PUBLISHED` or its operator sign-off. Production still requires explicit publication approval after the preview.

Environment classification is server controlled:

| Environment | Candidate content | Lead writes | Indexing |
| --- | --- | --- | --- |
| `VERCEL_ENV=production` | Production allowlist only; ignore local preview override | Requires production configuration | Existing reviewed page policy |
| `VERCEL_ENV=preview` | Published pages plus labelled catalogue drafts | Disabled by default | Entire deployment `noindex, nofollow` |
| Local, `QOGNITION_PREVIEW_MODE=1` | Published pages plus labelled catalogue drafts | Disabled by default | `noindex, nofollow` |
| Other/local without explicit preview | Published set only | Disabled by default | Non-production `noindex, nofollow` |

Never use `NODE_ENV=production` to authorize real lead writes: Next.js preview builds also set it. A query parameter, cookie or public environment variable cannot enable candidates or production writes.

Use `dynamicParams = true` with a server-only preview resolver at all four levels. Static parameters still use the existing published set. In production, a mapped-only route cannot resolve through the preview fallback and returns 404. In preview, known catalogue routes render labelled drafts on demand; unknown paths remain 404. Metadata and sitemaps preserve the production allowlist. Existing legacy route ownership wins at the depth it already owns.

Preview protection is applied at the deployment header and metadata levels (`X-Robots-Tag: noindex, nofollow`, matching robots metadata). Preview sitemap endpoints must not enumerate candidates. Do not use a robots crawl block as the only indexing protection. Candidate pages link only to resolvable candidate/published destinations in the same preview. Production never leaks candidate links. Use deployment access protection where available; noindex is not an access-control mechanism.

Do not activate a production calendar widget on previews: a booking is a production write even if the lead API is disabled. Keep the same booking layout with a labelled preview state; render an interactive calendar only when a separately configured sandbox calendar is verified. The actual production LeadConnector calendar ID is retained for the later production deployment.

Optional local/preview form validation mode is explicit `QOGNITION_LEAD_MODE=validate`. It can validate payloads but performs **zero** GHL, email, analytics-conversion, Meta or nurture calls. Response is `{ success: false, status: 'validated', preview: true, message: 'Test validated; no enquiry sent.' }`; UI displays that exact distinction and fires no lead conversion. Without this mode, non-production returns a structured `503 preview_disabled`. Tests can inject fake adapters; they do not turn public requests into accepted leads.

## 3. Lead API and taxonomy compatibility

Retain `POST /api/lead`, existing request fields and successful response fields. Add optional `context.subindustry_id`. Existing submissions without taxonomy remain valid. When any numeric ICP ID is supplied, resolve it against the complete source and validate that supplied ancestors describe the same path. Derive missing ancestors from the deepest valid supplied ID; reject inconsistent siblings/ancestors with 400 before external calls.

Preserve existing non-ICP context from legacy pages through an explicit legacy resolver. Do not reject a known legacy industry slug merely because it is not a dotted ICP ID. Unknown IDs are not silently accepted as valid taxonomy. Preserve original and canonical parent identity separately for declared aliases; never lose the leaf's original ID.

Use stable canonical serialization for the digest: trim/lowercase email; exclude transport-only IDs and honeypot; recursively sort object keys. Include enquiry, consent and contextual attribution so conflicting reuse of one submission ID is detected. Prefer the client's existing stable `submission_id`; support legacy callers through a deterministic, documented daily digest fallback. The same ID plus a different digest returns 409. A retry with reordered JSON keys is not a conflict.

Successful response remains `success: true, status: 'captured', submission_id, event_id, duplicate`; return it only when both GHL records are verified and the durable receipt is committed. Missing configuration, rate/lease contention or uncertain provider persistence returns retryable 503 (or existing 429 for rate limiting) with `Retry-After`. Never fall back to notification-only success. Honeypot handling may retain its generic response but performs no writes or conversions.

## 4. GHL history, durable receipts and side effects

Use server-side Redis REST commands through the existing Node `fetch`; no new browser SDK. Proposed configuration names are `UPSTASH_REDIS_REST_URL`, `UPSTASH_REDIS_REST_TOKEN` and `LEAD_LEDGER_HMAC_SECRET` alongside the existing GHL variables. Validate HTTPS and configuration before any external lead write. Do not create a temporary database or paid account automatically. Missing or unreachable durable storage fails closed and is reported in the deployment checklist.

Persist no contact names, emails, messages or raw payloads in Redis. Use a keyed HMAC of normalized email for the contact lock/key, scoped by environment and GHL location. Receipt metadata contains submission ID, digest, timestamps, contact/note IDs, state and downstream delivery state. Receipts are durable records, not an expiring twenty-item cache; deletion follows an explicit retention/erasure operation. GHL contains the enquiry content. Logs contain neither provider response bodies nor opaque exceptions which may embed PII.

The ordered persistence protocol is:

1. Acquire a shared contact lease with an opaque owner token and a bounded expiry; use atomic compare-and-set operations for ownership, receipt transitions and release. An in-process map may optimize but never provide the correctness guarantee.
2. Check the receipt. A committed equal-digest receipt reuses the original IDs and returns `duplicate: true`; a conflicting digest is 409; an active/uncertain attempt is retryable until reconciled.
3. Find/upsert the GHL contact using server-owned location and email. Never patch an existing person's identity from an unauthenticated form, and never send `assignedTo`, DND, tags, pipeline or opportunity stage fields. Preserve website qualification separately from sales lifecycle.
4. Persist the complete enquiry as a **new contact note**, with a deterministic marker containing the submission ID and digest plus schema version. Retain the existing last-enquiry field as a compatibility summary; it is no longer the history of record.
5. Read the note back and verify its marker/content, contact association and required contact state. Save note ID and contact ID in the durable receipt. Commit acceptance atomically only while lease ownership is valid.
6. Return success. Trigger notifications/confirmation only afterward, each with its own durable delivery claim. Failure here does not erase an accepted enquiry.

The current GHL contact adapter uses `Version: 2021-07-28`. Official note documentation observed on 2026-10-03 advertises `Version: v3`, `POST /contacts/:contactId/notes`, `GET /contacts/:contactId/notes` and `GET /contacts/:contactId/notes/:id`. Implement per-operation version selection and verify it against the configured account; do not silently upgrade all contact calls. Credentials need note read/write scope. A version/scope rejection is a retryable capture failure, never presumed success.

### Ambiguous writes and concurrency

GHL note creation has no verified provider idempotency-key guarantee in the inspected API. Redis alone cannot make two independent providers one transaction. Therefore save a durable `note_write_started` state before dispatch. If the response or receipt update is lost, reconcile by the deterministic note marker before attempting anything else. One matching note can be read and adopted. Multiple conflicting matches, an unresolved timeout or lost lease moves to `reconciliation_required`; **do not automatically append another note**. Return retryable failure and surface a PII-free operations alert. This sacrifices automatic recovery from a rare uncertain call to avoid duplicate enquiry records.

Lease renewal/checks must stop a stale worker before further writes. Keep provider timeouts below the function deadline and preserve started-write state across lease expiry. Atomic receipt transitions require ownership checks; ordinary REST pipelines are not transactions. The receipt must not be marked captured after lease loss.

For notifications, claim once before dispatch and record sent/failed/unknown afterward. Do not blindly resend an unknown result; provider-supported idempotency may be used only after verifying its retention window. An independently retried form never sends a second claimed notification. No unrequested automatic nurture is introduced by the adapter.

First-touch attribution is initialized once when absent; last-touch and enquiry-specific attribution remain separate. A new enquiry is not permission to overwrite known DND or reactivate marketing. Consent in the enquiry is an auditable request; GHL operational workflows enforce suppression and subscription policy independently.

## 5. Funnel and booking semantics

Content stages remain TOFU/MOFU/BOFU. CRM lifecycle remains Lead/MQL/SQL/Opportunity/Customer with recycle/disqualified states. Neither page context nor an audit alone proves buying intent. SQL requires sales acceptance. Preserve existing advanced stages and ownership.

Use one segmented nurture system keyed by validated taxonomy/service/locale. Requested delivery may happen immediately; optional days 3/7/12 messages require explicit email consent and stop on reply, appointment, qualification, customer status, disqualification or opt-out. Do not create thousands of cloned workflows. Preview never triggers production nurture.

Initial completed-booking reporting comes from actual GHL appointment records. CTA click and widget view are separate events and never establish a booking or SQL. No new booking webhook is needed for this release. Automatic browser-to-calendar attribution is only claimed after the configured calendar supports and returns the fields; otherwise the limitation is explicit in reporting.

## Alternatives and consequences

- **Rejected:** publishing all taxonomy leaves to production using inherited names/paragraphs. It misstates completion and cannot satisfy distinct buyer value.
- **Rejected:** changing logo/design or adding public prices. Both contradict the latest user request.
- **Rejected:** making GHL best effort behind email success. It loses the acknowledged enquiry from the required durable system.
- **Rejected:** process-memory locks or a twenty-entry contact field as the receipt ledger. They do not coordinate separate instances or maintain history.
- **Rejected:** a new SQL application database in this delivery. It adds schema, hosting and operational ownership when GHL is already the required lead system; Redis stores coordination metadata only.
- **Consequence:** two configured providers are required for production contact capture. A missing provider causes honest retryable failure; the contact page always offers the production booking alternative.
- **Consequence:** full 8,823-leaf mapping is mechanically verifiable; substantive content completion remains real editorial work and cannot be inferred from the map.

## Validation and rollout

Tests cover all leaf IDs and declared overlaps; strict parent validation; valid legacy contexts; production exclusion of candidates; preview noindex; no preview side effects; existing response compatibility; reordered payloads; same-ID conflicts; concurrent submissions in separate adapter instances; lost GHL responses; receipt failures; contact preservation; append-only history; optional notification failure; PII-free logs; and booking event semantics.

Render representative paths at all hierarchy levels plus both sides of every parent overlap. Inspect the homepage/calendar, contact failure/confirmation, mobile CTAs and at least one complete TOFU→MOFU→BOFU journey per industry. Run the existing gates, typecheck and production build; confirm the logo/design asset hashes remain unchanged.

Deploy only to a preview environment and deliver its URL plus an explicit configuration report (configured/not configured, no secret values). A mocked integration test proves code behavior, not account connectivity. A validated preview form is not a captured GHL enquiry. Production publication waits for the user's preview approval and separate successful live-configuration checks.

## Rollback and revisit triggers

Rollback candidate changes by reverting their manifests/body versions; production routes remain untouched until approval. If lead code must roll back, disable contact capture with an honest retryable response and retain the booking alternative rather than restoring notification-only acceptance. Keep accepted GHL notes and receipts; do not delete history to roll back a deployment. Previous custom fields remain readable for migration/recovery.

Revisit when content/build size makes reviewed-candidate SSG impractical, multiple CRM locations become a product requirement, note reconciliation becomes frequent, exact-once external delivery becomes mandatory, or durable receipt volume requires a database with explicit retention/audit tooling. Any incremental-rendering change must preserve the same publication checks and never expose mapped-only paths in production.

## Sources verified for new provider contracts

- [HighLevel create note](https://marketplace.gohighlevel.com/docs/ghl/contacts/create-note/)
- [HighLevel get all notes](https://marketplace.gohighlevel.com/docs/ghl/contacts/get-all-notes/)
- [HighLevel get note](https://marketplace.gohighlevel.com/docs/ghl/contacts/get-note/)
- [Upstash Redis REST API](https://upstash.com/docs/redis/features/restapi)

The new environment-variable names, receipt states and journey fields above are decisions in this ADR, not claims that those fields already exist in the checkout.

## Implemented preview isolation

Preview disables the live calendar, analytics integrations, CRM writes and audit crawling/provider calls. `NEXT_PUBLIC_QOGNITION_PREVIEW` is fixed at build time. A later production release requires a fresh production build and verified live integration configuration; do not promote the preview artifact unchanged. Browser-to-calendar taxonomy attribution remains unverified, while enquiry context is validated and persisted by the lead API.
