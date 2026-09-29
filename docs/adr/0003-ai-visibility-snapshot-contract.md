# ADR-0003: The AI visibility snapshot, interface contract

- Status: proposed
- Date: 2026-09-28
- Depends on: ADR-0001 (`/audit` is the canonical URL)
- Constrains: `lib/snapshot/**`, `app/api/snapshot/route.ts`
- Reuses unchanged: `normalizeTargetUrl` from `lib/auditEngine.ts`

**Interface only. No implementation in this document.** Implementation goes to Luke (`backend-dev`)
against these types.

## Decision

The snapshot asks **15 buyer prompts once each**, detects which brands get named in the answers, and
scores the target plus 3 auto-detected competitors across four columns. Providers are pluggable and
independently configurable. An unconfigured provider renders `not_checked`, never a fabricated
result. Rate limiting is keyed on the **domain**, not the email. Spend is capped by a durable ledger
that **fails closed**. The HTTP boundary is asynchronous: the request reserves budget and returns a
run id.

---

## 0. The shape of the product, stated first because it drives everything

You do **not** ask 15 prompts per brand. You ask 15 buyer prompts **once**, and read which brands the
answer names. That is the entire product: "you rank in Maps, but ChatGPT names your competitor"
(CLAUDE.md §1) is only demonstrable if the target and its competitors are scored from the *same*
response to the *same* question.

So the call volume is:

```
15 prompts x N answer providers        (ChatGPT, Perplexity)   ~30 calls
15 prompts x 1 SERP provider           (map pack + organic)    ~15 calls
```

roughly 45 upstream calls per run, not 15 x 4 brands x providers. Competitors are extracted from
results, they are not an input multiplier.

---

## 1. Types

```ts
// lib/snapshot/types.ts  (pure types, zero imports, no runtime code)

/** The four scored columns. Fixed set; adding one is a schema change. */
export type SnapshotColumn = 'map_pack' | 'organic_top10' | 'ai_overview' | 'assistant';

export type ProviderId = 'serp' | 'openai' | 'perplexity';

/** A prompt a buyer would actually type. Authored per industry, never generated. */
export interface BuyerPrompt {
  id: string;                  // stable; persisted with every observation
  text: string;
  industry: 'insurance' | 'professional-services' | 'it-services';
  intent: 'vendor_selection' | 'comparison' | 'problem' | 'local';
}

export interface Brand {
  /** Normalized hostname, lowercased, leading www. stripped. The join key. */
  domain: string;
  /** Display name. For the target this is operator-supplied; for competitors, detected. */
  name: string;
  role: 'target' | 'competitor';
  /** How a competitor got here. `null` for the target. */
  detectedFrom: DetectionSource | null;
}

export type DetectionSource =
  | { kind: 'assistant_mention'; observationId: string }
  | { kind: 'organic_result';    observationId: string; position: number }
  | { kind: 'map_pack_result';   observationId: string; position: number };

// ── Cells ──────────────────────────────────────────────────────────────────
// A discriminated union, so "not mentioned" cannot be asserted without the
// evidence that shows it. This is CLAUDE.md §4 expressed in the type system.

export type Cell =
  | { status: 'observed';    evidenceId: string; detail: ObservedDetail }
  | { status: 'absent';      evidenceId: string }
  | { status: 'not_checked'; reason: NotCheckedReason }
  | { status: 'error';       reason: string };

export type NotCheckedReason =
  | 'provider_not_configured'
  | 'budget_exhausted'
  | 'rate_limited'
  | 'provider_unavailable';

export type ObservedDetail =
  | { column: 'map_pack';      position: number }
  | { column: 'organic_top10'; position: number; url: string }
  | { column: 'ai_overview';   citedUrls: string[]; verbatim: string }
  | { column: 'assistant';     citedUrls: string[]; verbatim: string };

/** One prompt x one brand x four columns. */
export interface PromptScore {
  promptId: string;
  domain: string;
  cells: Record<SnapshotColumn, Cell>;
}

export interface SnapshotResult {
  runId: string;
  target: Brand;
  competitors: Brand[];        // exactly 3 when detection succeeded; fewer is honest
  prompts: BuyerPrompt[];      // 15
  scores: PromptScore[];
  /** Per CLAUDE.md §4: an observation on a date, not a state. */
  observedAt: string;          // ISO
  coverage: Record<ProviderId, 'checked' | 'not_checked'>;
  limits: string[];            // rendered verbatim on the report
}
```

### Why `absent` carries an `evidenceId`

CLAUDE.md §4: "A sampled AI result is an observation on a date, not a state." The difference between
"we asked and you were not named" and "we did not ask" is the entire credibility of this product. The
union makes the first one impossible to record without storing the response that proves it. There is
no `boolean mentioned` anywhere in this contract, on purpose.

---

## 2. Module boundaries

```
lib/snapshot/
  types.ts          pure types. imports nothing.
  prompts.ts        the 15 BuyerPrompts per industry. authored, committed, reviewed.
  competitors.ts    detectCompetitors(observations) -> Brand[]. pure. no I/O.
  scoring.ts        observations -> PromptScore[]. pure. no I/O.
  providers/
    types.ts        AnswerProvider, SerpProvider, ProviderHealth
    registry.ts     getConfiguredProviders(). the only place isConfigured() is consulted.
    openai.ts       AnswerProvider
    perplexity.ts   AnswerProvider
    serp.ts         SerpProvider
  budget.ts         SpendLedger interface + guard
  rateLimit.ts      domain-keyed. separate from lib/auditRateLimit.ts. see §5.
  persistence.ts    SnapshotStore interface
  run.ts            the orchestrator. the only module that touches all of the above.

app/api/snapshot/route.ts   sync boundary. validate, guard, enqueue, 202.
app/api/snapshot/[runId]/route.ts   poll. read-only.
```

**Rules.** `types.ts`, `competitors.ts` and `scoring.ts` are pure and unit-testable with no network
and no keys. Providers never talk to each other. `run.ts` is the only module aware of more than one
provider. Nothing outside `providers/` constructs a provider.

`normalizeTargetUrl` is imported from `lib/auditEngine.ts` unchanged. It is the SSRF guard for this
surface: it rejects non-HTTP(S) schemes, `localhost`, `.local`, `0.0.0.0`, `127.*`, `10.*`,
`192.168.*` and `172.16-31.*`, and throws `AuditError` with a usable status. Do not reimplement it,
do not wrap it in a try that swallows the error, and do not add a second URL parser for this feature.

**Note for whoever reviews the SSRF posture** (Anton, `secops`): `normalizeTargetUrl` blocks by
hostname string, so it does not stop a public hostname that resolves to a private address (DNS
rebinding), nor IPv6 private ranges. That is acceptable for the existing crawl and should be
re-examined if the snapshot starts fetching the target's pages rather than only naming its domain in
a prompt. `[UNVERIFIED: whether the snapshot needs to fetch the target site at all. If it does not,
the SSRF surface is materially smaller than the audit engine's and this note is moot.]`

---

## 3. Provider interface

```ts
// lib/snapshot/providers/types.ts

export interface ProviderMeta {
  id: ProviderId;
  /** False when required env vars are absent. Checked before any construction. */
  isConfigured(): boolean;
  /** Worst-case cost of one call, in cents. Used to reserve budget before spending. */
  estimatedCostCents: number;
}

/** The interface the brief specifies. Assistants and AI Overviews. */
export interface AnswerProvider extends ProviderMeta {
  ask(prompt: string): Promise<AnswerResponse>;
}

export interface AnswerResponse {
  text: string;
  citations: Citation[];
  model: string;          // the exact model id that answered. persisted. never inferred.
}

export interface Citation { url: string; title?: string; }
```

### The SERP columns need a second interface, and pretending otherwise would be dishonest

`map_pack` and `organic_top10` are ranked lists, not generated text. Forcing them through
`ask(prompt) -> {text, citations, model}` would mean inventing a `model` value for a service that has
no model and flattening positions into prose that then has to be re-parsed. So:

```ts
export interface SerpProvider extends ProviderMeta {
  search(query: string, opts: { location: string }): Promise<SerpResponse>;
}

export interface SerpResponse {
  organic:  { position: number; url: string; title: string }[];
  mapPack:  { position: number; name: string; url?: string }[];
  /** Present when the SERP returned an AI Overview. Absent is not the same as none. */
  aiOverview?: { text: string; citations: Citation[] };
  fetchedAt: string;
}
```

Two interfaces, one `ProviderMeta` contract. `estimatedCostCents` and `isConfigured()` are uniform,
which is all the orchestrator and the budget guard need.

### An unconfigured provider renders "not checked", never mocked

Three mechanisms, because one is not enough:

1. **`registry.ts` never constructs an unconfigured provider.** `getConfiguredProviders()` filters on
   `isConfigured()` and returns the survivors. There is no code path where an unconfigured provider
   object exists and could return a default.
2. **`run.ts` writes the gap explicitly.** For every column whose provider is absent, it writes
   `{ status: 'not_checked', reason: 'provider_not_configured' }`. Absence is recorded, not skipped.
   `SnapshotResult.coverage` carries the same information at run level so the report can say which
   platforms were checked and which were not.
3. **The type system forbids the shortcut.** There is no `Cell` variant that means "assume absent".
   `absent` requires an `evidenceId`, and an evidence row can only be created by a provider that
   actually returned something.

No provider module may contain fixture data, a `MOCK_` constant, or a `NODE_ENV` branch that returns
canned answers. Test doubles live in test files and are injected; they never ship in `providers/`.

The rendered report must say, in words, which platforms were not checked and why. "Not checked" on a
customer-facing deliverable is a credibility gain, not a gap, and it is the only option consistent
with CLAUDE.md §4.

---

## 4. Persistence

Three records. Evidence is separated from observation because raw responses are large and are the
substantiation trail that has to survive independently of the summary.

```ts
export interface SnapshotRunRecord {
  runId: string;
  targetDomain: string;
  targetName: string;
  industry: BuyerPrompt['industry'];
  competitorDomains: string[];
  status: 'queued' | 'running' | 'complete' | 'partial' | 'failed';
  startedAt: string;
  completedAt?: string;
  costCents: number;
  /** Which providers were configured at run time. Frozen at start. */
  coverage: Record<ProviderId, 'checked' | 'not_checked'>;
}

export interface SnapshotObservationRecord {
  observationId: string;
  runId: string;
  /** The contract the brief asks for: platform / date / prompt / response / evidence. */
  providerId: ProviderId;
  model: string | null;          // null for SERP providers. Never a placeholder string.
  column: SnapshotColumn;
  promptId: string;
  promptText: string;            // denormalized on purpose: prompts.ts will be edited later
  observedAt: string;            // ISO. the date the claim is scoped to.
  citations: Citation[];
  /** Brands found in this response, with the span that matched. */
  brandMentions: { domain: string; matchedText: string; offset: number }[];
  evidenceId: string;
}

export interface SnapshotEvidenceRecord {
  evidenceId: string;
  observationId: string;
  /** The unmodified provider response. The thing a sceptical client asks to see. */
  rawResponse: string;
  retrievedAt: string;
}

export interface SnapshotStore {
  createRun(record: SnapshotRunRecord): Promise<void>;
  updateRun(runId: string, patch: Partial<SnapshotRunRecord>): Promise<void>;
  appendObservation(o: SnapshotObservationRecord, e: SnapshotEvidenceRecord): Promise<void>;
  getRun(runId: string): Promise<SnapshotResult | null>;
}
```

`promptText` is denormalized deliberately. `prompts.ts` will be edited, and an observation that can no
longer show the exact question asked is not evidence.

### Where this is stored is not decided here

There is **no database dependency in `package.json`**. Not Postgres, not Prisma, not Drizzle, not
Redis. `[UNVERIFIED: whether a Vercel Postgres or KV store is provisioned on the account; the
project memory records that Redis and Meta CAPI env vars are unset, which suggests not.]`

`SnapshotStore` is an interface so that decision is a follow-up ADR and not a blocker. What this ADR
does fix:

- **The durable record is the emailed report**, consistent with CLAUDE.md §5 ("Email is the durable
  record") and with `lib/leadDelivery.ts`. If `SnapshotStore` loses a run, the client still has their
  report and the agency inbox still has its copy.
- **The spend ledger is the one exception** and cannot be email-backed. See §6.

---

## 5. Rate limiting, keyed on domain

```ts
// lib/snapshot/rateLimit.ts
export type SnapshotRateDecision =
  | { allowed: true;  domainKey: string }
  | { allowed: false; reason: 'domain_recent' | 'ip_burst'; retryAfterSeconds: number };

export function checkSnapshotRateLimit(
  request: NextRequest,
  targetDomain: string,          // from normalizeTargetUrl(url).hostname
): SnapshotRateDecision;
```

### Why domain and not email, diverging from `lib/auditRateLimit.ts`

`lib/auditRateLimit.ts` keys on email and argues for it at length in its own comments: "Identity is
the email address, and nothing else", and "a rotated email is one extra lead, while a wrongly refused
prospect is a lost client." That reasoning is correct **for a lead**, because accepting a lead costs
nothing.

It is wrong for the snapshot, because a snapshot costs roughly 45 upstream API calls in real money.
The asymmetry that justified fail-open on `/api/lead` is reversed here.

Domain is also the better key on the merits:

- The domain is the unit of work. Two people at the same firm requesting a snapshot of the same
  domain want the same report, and the second request should return the first one, not buy it again.
- Email is free to rotate and costs an attacker nothing. A domain is the thing being analysed and
  cannot be varied without changing what you get.
- It fixes the exact hole `auditRateLimit` documents as accepted: "someone can retry immediately
  under a different address". Under domain keying, retrying under a new address returns the cached
  run.

**Policy:** one completed run per domain per 24 hours. A repeat request inside the window returns the
existing `runId` and its result, which is a better user experience than a 429. IP keeps a burst
ceiling only, matching the existing module's reasoning about NAT and CGNAT, which is sound and should
be copied.

### Known weakness, stated rather than hidden

"Domain" here means the normalized hostname with a leading `www.` stripped. It is **not** the
registrable domain (eTLD+1), because **there is no public-suffix list dependency in `package.json`**
and eTLD+1 cannot be computed correctly without one. Consequence: `a.example.com` and
`b.example.com` are counted as two domains, so a determined abuser can multiply their quota by
inventing subdomains that resolve. Mitigations in order of preference: add a PSL dependency; or cap
distinct subdomains per apex per day. The spend ceiling in §6 is the backstop that makes this bounded
rather than unbounded, which is why it is non-optional.

---

## 6. Hard monthly spend ceiling

```ts
// lib/snapshot/budget.ts
export interface SpendLedger {
  /** Atomically reserve. Returns null when the reservation would breach the ceiling. */
  reserve(cents: number, runId: string): Promise<ReservationToken | null>;
  /** Settle at actual cost. Never exceeds the reserved amount. */
  commit(token: ReservationToken, actualCents: number): Promise<void>;
  /** Return an unspent reservation after a failed run. */
  release(token: ReservationToken): Promise<void>;
  /** For the ops surface. Never used to make the allow decision; reserve() decides. */
  currentMonthCents(): Promise<number>;
}

export interface ReservationToken { id: string; cents: number; periodKey: string; } // "2026-09"

export const MONTHLY_CEILING_CENTS = 0; // set deliberately before launch. Zero ships nothing.
```

### Three properties that are not negotiable

1. **Reserve before spending, not after.** `run.ts` reserves the worst-case cost of all ~45 calls
   before the first one. Charging after the fact means the ceiling is discovered by exceeding it.
2. **Atomic.** `reserve()` is a single compare-and-increment. Read-then-write races under concurrency
   and the ceiling stops being a ceiling.
3. **Fail closed.** If the ledger is unreachable, `reserve()` returns `null` and the run is refused
   with `not_checked / budget_exhausted`. This is the **opposite** of `/api/lead`, which fails open,
   and the inversion is deliberate: an un-counted lead costs nothing, an un-counted LLM call costs
   money and there is no upper bound on how many of them an outage can let through.

### This is the one hard infrastructure prerequisite

`lib/auditRateLimit.ts` is explicitly in-memory and per-instance: "a serverless instance only sees the
requests it personally handled". That is an acceptable trade for throttling and a **useless** one for
a spend ceiling, because N instances each enforce N separate ceilings and the real ceiling is N times
the intended one.

So: **the snapshot cannot ship a truthful spend ceiling on the current infrastructure.** A durable,
atomic, shared counter must exist first. Do not ship an in-memory `SpendLedger` and call the ceiling
enforced. If provisioning slips, the honest interim is a manually set provider-side spending cap plus
`MONTHLY_CEILING_CENTS = 0` refusing all runs, which is unpleasant and true, rather than an
in-process counter, which is pleasant and false.

---

## 7. The sync / async boundary

`app/api/lead/route.ts` sets `maxDuration = 60`. Roughly 45 upstream calls, several of them LLM
completions, will not finish in 60 seconds and must not be attempted inside the request.

### Synchronous, inside `POST /api/snapshot`

1. Parse and Zod-validate the body.
2. `normalizeTargetUrl(input)`. Throws `AuditError` with its own status. Do not catch and flatten it.
3. `checkSnapshotRateLimit(request, hostname)`. On `domain_recent`, return `200` with the existing
   `runId`. On `ip_burst`, return `429` with `Retry-After`.
4. `getConfiguredProviders()`. If zero answer providers are configured, return `503` and do not
   create a run. A snapshot with nothing checked is not a deliverable.
5. `ledger.reserve(worstCaseCents, runId)`. `null` returns `503` with a plain message about capacity.
   Never blame the visitor for a budget the agency set.
6. `store.createRun({ status: 'queued', coverage })`. Coverage is frozen here, so the report can
   state what was configured at the time it ran rather than what is configured now.
7. Return `202 { runId, pollUrl }`.

Target: well under 1 second. No provider is called.

### Asynchronous

The provider fan-out, scoring, competitor detection, `ledger.commit`, and the report email.

Mechanism is not decided here. `after()` from `next/server` is already used in `app/api/lead/route.ts`
and is the lowest-friction option, but it is bounded by the same function lifetime and is documented
in that file as "best-effort downstream tasks after durable delivery; this is not a replay queue".
For a 45-call fan-out that is a poor fit. A real queue or a cron-drained job table is the right
answer. `[UNVERIFIED: what background execution primitives are available on this Vercel plan.]`

### Client

`GET /api/snapshot/[runId]` polls and returns `SnapshotResult` with per-cell status. Partial results
render as they land. The lead is captured through the existing `/api/lead` at submit time, so a run
that fails halfway still produced the appointment, which is the North Star (CLAUDE.md §3), rather
than nothing.

---

## 8. Consequences

**Good.** Every published cell is backed by a stored response with a platform, a model id and a date,
which is exactly the claims discipline in CLAUDE.md §4 and is also the sales asset. A missing provider
degrades to an honest "not checked". Cost is bounded before it is incurred. The pure modules
(`scoring`, `competitors`) are testable with no keys and no network.

**Bad, and accepted.** This cannot ship until a durable atomic counter exists. `SnapshotStore` is
undecided, so a second ADR is required before implementation completes. Two provider interfaces
instead of the one the brief asked for. Subdomain-level rate limiting is weaker than eTLD+1 until a
PSL dependency is added.

**Ugly.** Storing raw responses is storing third-party model output containing competitor names, at
volume. Retention, and whether evidence is shown to the client verbatim or summarized, is a legal
question this ADR does not answer and should not.

---

## 9. What would make this decision wrong

1. **Providers start offering a batch or async API.** The whole sync/async structure exists to work
   around 45 sequential calls. A batch endpoint collapses §7.
2. **Run volume passes roughly 50 a month.** Per-run reservation of worst-case cost over-reserves and
   will refuse runs while real spend is well under the ceiling. Move to a token-bucket estimate.
3. **A provider stops exposing citations.** `Citation[]` is load-bearing for the `evidenceId` model.
   If a platform returns text with no sources, the `assistant` column needs a separate, weaker
   evidence story, and it must be labelled as weaker rather than quietly treated as equivalent.
4. **Competitor auto-detection proves unreliable.** If 3 detected competitors are frequently wrong,
   they become operator-supplied and `DetectionSource` becomes optional. Trigger: operator overrides
   on more than about a third of runs.
5. **The snapshot starts fetching the target's pages.** Then the SSRF note in §2 stops being
   hypothetical and `normalizeTargetUrl` needs DNS-resolution checks.

---

## 10. Rollback

The feature is additive: new modules under `lib/snapshot/`, two new API routes, one new page. Nothing
existing changes behaviour.

| Change | Rollback |
|---|---|
| Whole feature | Set `MONTHLY_CEILING_CENTS = 0`. Every `reserve()` refuses, every run returns `503`, zero spend. This is the kill switch and it should be tested before launch, not after. |
| One provider misbehaving | Unset its env vars. `isConfigured()` goes false, the registry drops it, its column renders `not_checked`. No deploy required. **This is the main reason `isConfigured()` reads env at call time rather than at module load.** |
| `/audit` page | Per ADR-0001 §9. `app/free-ai-audit/page.tsx` is untouched and serves the moment the redirect is reverted. |
| Routes | Delete `app/api/snapshot/**` and `lib/snapshot/**`. `lib/auditEngine.ts` is imported but not modified, so nothing else breaks. |

**Rollback trigger:** spend in any 7-day period exceeding one quarter of the monthly ceiling, or any
published cell that cannot be traced to a stored `SnapshotEvidenceRecord`. The second one is a
correctness failure in the claims discipline and is not negotiable regardless of cost.

**Note on `lib/auditEngine.ts`:** it currently has zero importers, and `app/api/audit/route.ts`
returns `410`. This ADR imports `normalizeTargetUrl` from it and nothing else. Do not delete the file
as dead code. Whether the rest of the scoring engine is revived, deleted, or reduced to the SSRF
helper is a separate decision.
