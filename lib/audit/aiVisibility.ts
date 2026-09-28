/* The AI half of the snapshot. One provider, one call, one code path.
 *
 * ────────────────────────────────────────────────────────────────────────────
 * THE RULE THIS MODULE EXISTS TO ENFORCE:
 *
 *   AN UNCONFIGURED PROVIDER RENDERS "NOT CHECKED", NEVER A GUESS.
 *
 * There is no fixture, no MOCK_ constant, no NODE_ENV branch and no default
 * answer anywhere in this file (ADR-0003 §3). Every failure mode — no key, no
 * derivable category, a network error, a 429, an unparseable body — resolves to
 * the same honest `not_checked` variant carrying a reason. "Not checked" on a
 * customer-facing deliverable is a credibility gain, not a gap, and it is the
 * only option consistent with CLAUDE.md §4.
 *
 * ────────────────────────────────────────────────────────────────────────────
 * RELATIONSHIP TO ADR-0003. READ THIS BEFORE EXTENDING.
 *
 * This is NOT an implementation of ADR-0003. That ADR specifies the /api/snapshot
 * product: 15 authored buyer prompts x 2 answer providers x 1 SERP provider,
 * roughly 45 upstream calls, an asynchronous HTTP boundary returning a run id,
 * and a durable atomic spend ledger that fails closed. None of that is built
 * and this module must not be mistaken for a down payment on it.
 *
 * What this is: ONE call, to ONE provider, inside the existing 60s request, on
 * the free crawl audit. The operator scoped it that way deliberately, and the
 * call-volume argument that makes ADR-0003's ledger non-optional (45 unbounded
 * calls per run) does not transfer at a volume of one. The spend controls here
 * are, in full:
 *
 *   1. A hard cap set in the provider's own dashboard. OUTSIDE THIS CODE.
 *      It is the only real ceiling, and it is the operator's to set.
 *   2. lib/auditRateLimit.ts, policy 'audit': one per email per 24h, 12 per IP
 *      per hour. IN-MEMORY AND PER-INSTANCE, by its own documentation, so N
 *      serverless instances enforce N separate ceilings. It throttles; it does
 *      not cap. Project memory records Redis env vars unset in production, so
 *      this is the state today and not a thing to assume is handled.
 *   3. No key configured means no call. Removing the key is the kill switch.
 *
 * That is honest but it is not a budget. Anton (secops) reviews this before it
 * opens, and ADR-0003 §6's reasoning about why an in-memory ceiling is not a
 * ceiling still stands for anything larger than one call.
 *
 * ────────────────────────────────────────────────────────────────────────────
 * FAMILY B, NOT FAMILY Q.
 *
 * The prompt asked here is the one the PROSPECT'S BUYER would type: "which
 * firms would you recommend for X". We run it, record it, and report what came
 * back. We are never the answer to it. Asking our own buyer's question instead
 * ("why doesn't ChatGPT recommend my machine shop") would produce an answer
 * about us, which is worthless as a diagnosis. data/b2b/verticals.ts explains
 * why confusing the two is the fastest way to rebuild the location pages.
 * ────────────────────────────────────────────────────────────────────────────
 */
import type { Engine, ObservationRun, ObservedRow } from '../b2b/observations';
import type { StoredAnswer, VendorSpan } from '../../data/b2b/observations/evidence';

/** The one provider. Perplexity Sonar: a chat completion with web search built in. */
const ENGINE: Engine = 'Perplexity';
const API_URL = 'https://api.perplexity.ai/chat/completions';
const REQUESTED_MODEL = 'sonar-pro';

/**
 * Hard ceiling on the AI call, well inside the route's `maxDuration = 60`.
 * The crawl runs first and can take ~25s of its own in the worst case, so this
 * is sized to leave the crawl's result intact even when the provider hangs.
 *
 * IT COVERS THE RESPONSE BODY, NOT JUST THE HEADERS, and that is the whole
 * reason the read below is written the way it is. `clearTimeout` used to sit in
 * the `finally` of the fetch block, which runs the moment headers arrive, so a
 * provider that answered its headers and then hung on the body ran with the
 * AbortController already disarmed and no ceiling of its own. On Vercel that
 * reaches `maxDuration = 60`, the function is killed, and the visitor gets a 504
 * instead of their 28 crawl checks.
 *
 * Exported so the test can assert it stays inside the route budget.
 */
export const AI_TIMEOUT_MS = 22_000;

/** Cap the stored answer. It is evidence, not a document; a runaway response is a bug. */
const MAX_ANSWER_CHARS = 20_000;

export type NotCheckedReason =
  /** No API key. The default state of production today. */
  | 'provider_not_configured'
  /** Nothing in the crawled page to build a real buyer question from. */
  | 'no_category_detected'
  /** Network error, timeout, or the provider was unreachable. */
  | 'provider_unavailable'
  /** The provider answered with a refusal: 429 over quota, 401, 5xx. */
  | 'provider_refused';

/**
 * What the report renders for the AI half.
 *
 * A discriminated union, so "we did not check" and "we checked and nobody named
 * you" are different values. The `not_checked` variant carries no `run`, so a
 * renderer that forgets to branch cannot read through it into an empty table
 * and present it as a measurement.
 */
export type AiVisibilitySection =
  | { readonly status: 'not_checked'; readonly reason: NotCheckedReason; readonly message: string }
  | { readonly status: 'observed'; readonly run: ObservationRun; readonly answers: readonly StoredAnswer[] };

export interface AuditTarget {
  /** From normalizeTargetUrl(url).hostname. Already SSRF-guarded by the caller. */
  readonly hostname: string;
  /** The crawled <title>. The only thing we have to infer a category from. */
  readonly title: string;
}

/** Minimal env shape, injected so this is testable without process.env. */
export type AiEnv = Record<string, string | undefined>;

/**
 * Is the provider usable?
 *
 * A whitespace-only key counts as unset. That is not defensive padding: the
 * project memory records Vercel env vars registered with EMPTY values, which
 * silently broke every integration, and a key of "" would otherwise sail past a
 * truthiness check and produce a 401 on every audit.
 */
export function isAiProviderConfigured(env: AiEnv): boolean {
  return Boolean(env.PERPLEXITY_API_KEY && env.PERPLEXITY_API_KEY.trim());
}

/* ── The prompt ───────────────────────────────────────────────────────────── */

/** Words a title uses that describe the site, not the market it serves. */
const TITLE_NOISE = /^(home|homepage|welcome|index|untitled|about|contact|services|products|blog|news)$/i;

/**
 * Build the buyer's question from the crawled title.
 *
 * Returns null when no category can be read, and the caller then reports
 * `no_category_detected` rather than asking a question it invented. A prompt
 * assembled from nothing produces an answer about nothing, and publishing that
 * as an observation would be the fabrication with extra steps.
 *
 * The template is committed here, in one place, so that every prompt this
 * product has ever sent is reviewable in the git history. The record stores the
 * assembled string verbatim, so a reader can paste it into Perplexity and check
 * us.
 */
export function buildBuyerPrompt(target: AuditTarget): string | null {
  const category = categoryFromTitle(target.title);
  if (!category) return null;
  return (
    `Which companies would you recommend for ${category}? ` +
    'Name specific vendors and include links to their websites.'
  );
}

const categoryFromTitle = (title: string): string | null => {
  if (!title || !title.trim()) return null;

  // Titles are near-universally "<Brand> | <what they do>" or "<Brand> - <what
  // they do>". Take the longest separated segment: the brand half is short, the
  // descriptive half is long. Fall back to the whole title when unseparated.
  const segments = title
    .split(/\s*[|–—·•]\s*|\s+-\s+/)
    .map((segment) => segment.trim())
    .filter(Boolean);

  const candidate = segments.sort((a, b) => b.length - a.length)[0] || title.trim();

  if (TITLE_NOISE.test(candidate)) return null;
  // Two words is the floor for something that describes a market. "Acme CNC" is
  // a brand; "precision machining for aerospace" is a category.
  if (candidate.split(/\s+/).length < 3) return null;
  if (candidate.length > 120) return null;

  return candidate.replace(/\s+/g, ' ');
};

/* ── The call ─────────────────────────────────────────────────────────────── */

export interface ObserveArgs {
  readonly target: AuditTarget;
  readonly env: AiEnv;
  readonly now: Date;
  /** Injected so tests never reach the network. Defaults to global fetch. */
  readonly fetchImpl?: typeof fetch;
  /**
   * The ceiling, in ms. Injected by the test for the same reason `fetchImpl` and
   * `now` are: a 22-second assertion is an assertion nobody runs. Production
   * never passes it, so `AI_TIMEOUT_MS` is the only value that ships.
   */
  readonly timeoutMs?: number;
}

const NOT_CHECKED_MESSAGE: Record<NotCheckedReason, string> = {
  provider_not_configured:
    'The AI answer check was not checked. No answer-engine provider is configured on this deployment, so we did not ask an assistant anything. Nothing below is inferred from that.',
  no_category_detected:
    'The AI answer check was not checked. We could not read a clear category from the page title, and we will not ask an assistant a question we invented.',
  provider_unavailable:
    'The AI answer check was not checked. The answer engine did not respond in time. The crawl findings below are unaffected.',
  provider_refused:
    'The AI answer check was not checked. The answer engine declined the request, usually a spend or quota limit on our side. The crawl findings below are unaffected.',
};

const notChecked = (reason: NotCheckedReason): AiVisibilitySection => ({
  status: 'not_checked',
  reason,
  message: NOT_CHECKED_MESSAGE[reason],
});

/**
 * Ask one buyer prompt on one platform and record what came back.
 *
 * Never throws. Every failure resolves to `not_checked`, because the crawl half
 * is the deliverable and an AI provider having a bad day must not cost the
 * prospect their 28 checks.
 */
export async function observeAiVisibility(args: ObserveArgs): Promise<AiVisibilitySection> {
  const { target, env, now } = args;

  if (!isAiProviderConfigured(env)) return notChecked('provider_not_configured');

  const prompt = buildBuyerPrompt(target);
  if (!prompt) return notChecked('no_category_detected');

  const doFetch = args.fetchImpl ?? fetch;
  const controller = new AbortController();
  const timer = setTimeout(() => controller.abort(), args.timeoutMs ?? AI_TIMEOUT_MS);

  // One deadline for the whole exchange, headers and body alike. `fetch` applies
  // the signal to the connection; nothing applies it to a `json()` that a
  // well-behaved-looking response never settles, so the read races the same
  // abort. The catch is marked handled here because the abort can fire while the
  // fetch is still in flight, before anything is racing this promise, and an
  // unobserved rejection would take the whole request down.
  const deadline = new Promise<never>((_, reject) => {
    const onAbort = () => reject(new Error('ai_deadline_exceeded'));
    if (controller.signal.aborted) onAbort();
    else controller.signal.addEventListener('abort', onAbort, { once: true });
  });
  void deadline.catch(() => {});

  let payload: PerplexityResponse;
  try {
    const response = await doFetch(API_URL, {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${env.PERPLEXITY_API_KEY}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        model: REQUESTED_MODEL,
        messages: [{ role: 'user', content: prompt }],
      }),
      signal: controller.signal,
    });

    if (!response.ok) {
      // 429 is the provider-side spend cap doing exactly its job, and 401 is a key
      // that was registered empty. Both are our problem, not the visitor's, so the
      // rendered message never blames them.
      return notChecked(response.status >= 400 && response.status < 500 ? 'provider_refused' : 'provider_unavailable');
    }

    payload = (await Promise.race([response.json(), deadline])) as PerplexityResponse;
  } catch {
    // Never log the error object: it can carry the Authorization header on some
    // runtimes. The reason code is all the caller needs. A transport error, an
    // unparseable body and a body that never arrives are the same thing to the
    // visitor: the answer engine did not respond.
    return notChecked('provider_unavailable');
  } finally {
    // Past the body read, not before it. This line being one block higher was
    // the 504.
    clearTimeout(timer);
  }

  const rawAnswer = payload?.choices?.[0]?.message?.content;
  const model = payload?.model;
  if (typeof rawAnswer !== 'string' || !rawAnswer.trim() || typeof model !== 'string' || !model.trim()) {
    // A response with no text, or with no model id on it, cannot become a
    // record: `modelVersion` is what makes the observation reproducible and we
    // do not substitute the model we asked for. ADR-0003 §3: "the exact model
    // id that answered. persisted. never inferred."
    return notChecked('provider_unavailable');
  }

  const answerText = rawAnswer.slice(0, MAX_ANSWER_CHARS);
  const urlsCited = extractCitations(payload);
  const runAt = isoDate(now);
  const answerId = `audit-${runAt}-${hashOf(`${target.hostname}|${prompt}|${model}|${answerText}`)}`;

  const spans = findVendorSpans(answerText, candidateVendors(target, urlsCited));

  const answer: StoredAnswer = {
    answerId,
    prompt,
    engine: ENGINE,
    modelVersion: model,
    runAt,
    retrievedAt: now.toISOString(),
    rawAnswer: answerText,
    urlsCited,
    vendorSpans: spans,
  };

  const row: ObservedRow = {
    prompt,
    engine: ENGINE,
    modelVersion: model,
    runAt,
    // Only names proven present in the text. See findVendorSpans.
    vendorsNamed: spans.map((span) => span.name),
    urlsCited,
    answerId,
  };

  const run: ObservationRun = {
    // A per-prospect audit is not a published niche page, so it has no entity
    // path in the B2B taxonomy. The audited host is the honest identifier.
    entityPath: `audit:${target.hostname}`,
    rows: [row],
    firstRunAt: runAt,
    lastRunAt: runAt,
    limits:
      `One prompt, asked once on ${ENGINE} on ${runAt}, using model ${model}. It shows what that ` +
      'platform answered on that day, not what every platform always answers. Assistants vary ' +
      'their answers between runs and between users. Firms are counted as named only where the ' +
      'name appears in the stored answer, so a firm named in a way we did not match is missed ' +
      'rather than invented.',
  };

  return { status: 'observed', run, answers: [answer] };
}

/* ── Extraction. Deliberately conservative. ───────────────────────────────── */

interface PerplexityResponse {
  model?: string;
  choices?: { message?: { content?: string } }[];
  citations?: unknown;
  search_results?: { url?: string }[];
}

/**
 * Citations, from whichever field this API version puts them in.
 *
 * [UNVERIFIED: which of `citations` (string[]) and `search_results` ({url}[])
 * the live Perplexity API returns today. Both shapes have shipped. Reading both
 * and de-duplicating is cheap; guessing one and getting an empty array on every
 * run would be a silent, permanent zero.]
 */
const extractCitations = (payload: PerplexityResponse): string[] => {
  const found: string[] = [];

  if (Array.isArray(payload.citations)) {
    for (const entry of payload.citations) {
      if (typeof entry === 'string') found.push(entry);
      else if (entry && typeof entry === 'object' && typeof (entry as { url?: unknown }).url === 'string') {
        found.push((entry as { url: string }).url);
      }
    }
  }
  for (const result of payload.search_results ?? []) {
    if (typeof result?.url === 'string') found.push(result.url);
  }

  return [...new Set(found.filter((url) => /^https?:\/\//i.test(url)))];
};

/**
 * Names that MIGHT be in the answer: the target's own brand, and a brand-ish
 * label for each cited domain.
 *
 * This is a candidate list, not a result. Nothing here reaches the record until
 * findVendorSpans proves it is literally in the text.
 */
const candidateVendors = (target: AuditTarget, urlsCited: readonly string[]): string[] => {
  const names = new Set<string>();

  const fromTitle = target.title.split(/\s*[|–—·•]\s*|\s+-\s+/)[0]?.trim();
  if (fromTitle && fromTitle.length >= 2 && fromTitle.length <= 60) names.add(fromTitle);
  const fromHost = brandFromHostname(target.hostname);
  if (fromHost) names.add(fromHost);

  for (const url of urlsCited) {
    const brand = brandFromUrl(url);
    if (brand) names.add(brand);
  }

  return [...names];
};

/**
 * Domain labels that are ordinary words before they are anybody's brand.
 *
 * precision.com yields the label "precision", which appears in almost every
 * machining answer as plain English, clears the boundary check, and was
 * therefore reported as the prospect being named in an answer that named
 * nobody. group.io yields "group" and did the same against "No specific group
 * stands out."
 *
 * The cost is that a firm genuinely called Precision is never reported by its
 * domain label. That is the trade this module makes everywhere: a missed
 * mention is recoverable, an invented one is not.
 *
 * `[UNVERIFIED: this list is hand-written and necessarily incomplete. It is the
 * second of two guards, not the only one — the capitalisation rule in
 * findVendorSpans catches generic usage regardless of whether the word is
 * listed here. Worth revisiting against the first fifty live runs.]`
 */
const GENERIC_HOST_LABELS = new Set([
  'advanced', 'agency', 'associates', 'best', 'company', 'consulting', 'consultants', 'contract',
  'custom', 'digital', 'direct', 'engineering', 'equipment', 'expert', 'experts', 'first', 'general',
  'global', 'group', 'industrial', 'industries', 'industry', 'international', 'labs', 'machine',
  'machining', 'manufacturing', 'metal', 'metals', 'national', 'online', 'partners', 'plastics',
  'precision', 'premier', 'products', 'professional', 'quality', 'service', 'services', 'solutions',
  'standard', 'studio', 'supplies', 'supply', 'systems', 'technologies', 'technology', 'tools',
  'works',
]);

const brandFromHostname = (hostname: string): string | null => {
  const label = hostname.toLowerCase().replace(/^www\./, '').split('.')[0];
  if (!label || label.length < 3) return null;
  if (GENERIC_HOST_LABELS.has(label)) return null;
  return label;
};

const brandFromUrl = (url: string): string | null => {
  try {
    return brandFromHostname(new URL(url).hostname);
  } catch {
    return null;
  }
};

/**
 * Find candidates that are ACTUALLY in the answer, and record where.
 *
 * This is the whole integrity story of the AI half, so it is worth being blunt
 * about what it does and does not do:
 *
 *   It reports a firm ONLY when its name is present in the stored answer, at a
 *   recorded offset, which assertObservationRecordsValid re-checks byte for
 *   byte. There is no path by which a name reaches `vendorsNamed` because it
 *   was cited, because it seemed likely, or because a model said so.
 *
 *   It therefore UNDER-reports, and that asymmetry is deliberate. Missing a
 *   real mention is a recoverable error; inventing one is not, and the `limits`
 *   line says so on the page rather than hiding it.
 *
 * THAT SENTENCE WAS FALSE UNTIL THE CAPITALISATION RULE BELOW EXISTED, and it is
 * worth saying how rather than quietly fixing it. Presence in the text was the
 * only test, so any candidate that happened to be a common noun — "precision"
 * from precision.com, "group" from group.io — matched the ordinary English in
 * an answer that named nobody and was reported as the prospect being named. It
 * over-reported, on the one claim the product rests on. Two guards now stand
 * between a common noun and `vendorsNamed`: GENERIC_HOST_LABELS above, and the
 * rule here that a span with no capital letter in it is a word being used as a
 * word, not a firm being named.
 *
 * Matching is case-insensitive and ignores spacing and punctuation, so the
 * domain label `bravomachining` matches the answer's "Bravo Machining". That is
 * a normalisation, NOT a fuzzy guess: the span still records a real, contiguous
 * slice of the stored answer at a real offset, and
 * assertObservationRecordsValid re-checks it byte for byte. A candidate that is
 * not literally present, however it is spelled, produces nothing.
 *
 * Still missed, and listed so nobody assumes otherwise: a firm the answer calls
 * "Bravo" when its domain says "bravomachining" (a substring, not a spacing
 * variant), a firm the answer writes entirely in lower case, and any firm named
 * in the answer that was neither cited nor the
 * target. `[UNVERIFIED: what share of real Perplexity answers name a firm they
 * do not also cite. Worth measuring on the first fifty live runs before anyone
 * treats vendorsNamed as a complete list.]`
 */
const findVendorSpans = (rawAnswer: string, candidates: readonly string[]): VendorSpan[] => {
  const spans: VendorSpan[] = [];
  const seen = new Set<number>();

  // Normalised view of the answer, with a map from each normalised character
  // back to its index in the original. Matching happens in normalised space;
  // every recorded offset is an original-string offset.
  const normalised: string[] = [];
  const originalIndex: number[] = [];
  for (let index = 0; index < rawAnswer.length; index += 1) {
    const char = rawAnswer[index].toLowerCase();
    if (/[a-z0-9]/.test(char)) {
      normalised.push(char);
      originalIndex.push(index);
    }
  }
  const haystack = normalised.join('');

  for (const candidate of candidates) {
    const needle = candidate.toLowerCase().replace(/[^a-z0-9]/g, '');
    if (needle.length < 3) continue;

    const at = haystack.indexOf(needle);
    if (at < 0) continue;

    const start = originalIndex[at];
    const end = originalIndex[at + needle.length - 1] + 1;

    // Boundary check against the ORIGINAL string, not the normalised one.
    // Normalising removes the spaces, so in normalised space every word runs
    // into its neighbour and a boundary test there would reject every real
    // match. In original space it does the job it is for: "aero" inside
    // "aerospace" is rejected, "Acme CNC" after "Delta Aero." is kept.
    const before = rawAnswer[start - 1];
    const after = rawAnswer[end];
    if ((before && /[a-z0-9]/i.test(before)) || (after && /[a-z0-9]/i.test(after))) continue;

    if (seen.has(start)) continue;

    // The text exactly as the answer wrote it, so the downstream offset check
    // is an identity comparison and cannot drift.
    const matchedText = rawAnswer.slice(start, end);

    // A firm being named in prose is capitalised. A span with no capital letter
    // anywhere in it is the answer using a word as a word: "suppliers in
    // precision machining", "no specific group stands out". Testing the ANSWER's
    // spelling rather than the candidate's is the point — the claim being made
    // is about what the answer said, not about what we hoped to find. Keeps
    // "eBay" and "3M", drops "precision". Under-reports a brand an answer wrote
    // in lower case, which is the safe direction.
    if (!/[A-Z]/.test(matchedText)) continue;

    seen.add(start);
    spans.push({ name: matchedText, matchedText, offset: start });
  }

  return spans.sort((a, b) => a.offset - b.offset);
};

const isoDate = (now: Date): `${number}-${number}-${number}` =>
  now.toISOString().slice(0, 10) as `${number}-${number}-${number}`;

/** Short, stable id for an answer. Not a security primitive. */
const hashOf = (value: string): string => {
  let hash = 0;
  for (let index = 0; index < value.length; index += 1) {
    hash = (hash * 31 + value.charCodeAt(index)) | 0;
  }
  return Math.abs(hash).toString(36);
};
