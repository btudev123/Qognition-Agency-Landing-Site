/* THE OBSERVATION CONTRACT. The thing that makes these pages not thin templates.
 *
 * ────────────────────────────────────────────────────────────────────────────
 * WHAT AN OBSERVATION IS.
 *
 * A niche's real buyer prompts — Family B, the prompt the CLIENT'S buyer asks —
 * run across ChatGPT, Perplexity, Gemini and Google AI Overviews, recording who
 * got named and which URLs were cited, published with the platform, the prompt
 * set and the date.
 *
 * It is the only block on either page type that a competitor cannot copy and a
 * writer cannot write, and it differs per niche by construction. Everything
 * else on the page is craft. This is measurement.
 *
 * CLAUDE.md §4, and it governs every field below:
 *
 *   "A sampled AI result is an observation on a date, not a state. Always state
 *    the platform, the date, the prompt set and the limits. 'We tested 15
 *    prompts on 12 Oct' is honest. 'You are invisible in AI search' is not."
 *
 * So there is no `score`, no `visibilityIndex`, no `shareOfVoice` percentage and
 * no trend arrow in this contract. Those are derived numbers that read as a
 * state, and the moment one exists a component will render it without its date.
 * Every row here is a stored answer with a timestamp and an `answerId` that
 * re-derives it. That is G.O.L.E.M's auditability expressed as a type.
 *
 * ────────────────────────────────────────────────────────────────────────────
 * THE RULE FOR WHOEVER IMPLEMENTS THE STORE.
 *
 * `lookup()` returns `{ status: 'unobserved' }` when no run exists. It must
 * NEVER return an `observed` view carrying example, sample, seeded or
 * placeholder rows. A placeholder that looks like a result is worse than an
 * empty block, because a reader cannot tell the difference and the page then
 * asserts a thing about named third-party firms that nobody measured.
 *
 * The renderer honours this: components/b2b/ObservationBlock.tsx has a distinct,
 * fully designed `unobserved` state that says what has not happened yet and what
 * happens next. It is not a spinner and not an apology. It is load-bearing copy.
 * ────────────────────────────────────────────────────────────────────────────
 */

import type { IsoDate } from '../../data/b2b/types';

/**
 * The surfaces we sample. This list is a claim: adding a row asserts that we
 * actually run the prompt set there. It matches the four layers in CLAUDE.md §1
 * on the AI SEO and GEO side — AI Overviews is a Google surface, the other three
 * are assistants — and it matches the platform list in the homepage hero panel.
 */
export type Engine = 'ChatGPT' | 'Perplexity' | 'Gemini' | 'Google AI Overviews';

export const ENGINES: readonly Engine[] = ['ChatGPT', 'Perplexity', 'Gemini', 'Google AI Overviews'];

/** One prompt, on one engine, on one date. The atomic unit. Nothing aggregates it. */
export interface ObservedRow {
  /**
   * Verbatim, as typed. Family B. Never paraphrased for the page, because the
   * whole persuasion is that the reader can paste the line into ChatGPT and see
   * for themselves. A paraphrase breaks reproducibility silently.
   */
  readonly prompt: string;
  readonly engine: Engine;
  /** e.g. 'gpt-5.2'. Absent when the surface does not expose one, which AI Overviews does not. */
  readonly modelVersion?: string;
  readonly runAt: IsoDate;
  /** Firms the answer named, in the order the answer named them. May be empty: that is a result. */
  readonly vendorsNamed: readonly string[];
  /** URLs the answer cited. May be empty. */
  readonly urlsCited: readonly string[];
  /**
   * The id of the stored raw answer. Every row on the page re-derives from this,
   * which is the difference between our observation and a screenshot.
   */
  readonly answerId: string;
}

export interface ObservationRun {
  /** The page this run belongs to: '/industries/x' or '/industries/x/y'. */
  readonly entityPath: string;
  readonly rows: readonly ObservedRow[];
  readonly firstRunAt: IsoDate;
  readonly lastRunAt: IsoDate;
  /**
   * What this run cannot tell you, in the client's own terms. Required, not
   * optional, because a limits line that can be omitted is omitted. The hero
   * panel's equivalent line is the reason that offer converts: a reader told
   * plainly what a thing cannot do believes what they are told it can.
   */
  readonly limits: string;
}

/**
 * Every state the block can be in. A union, so "observed with no rows" and
 * "errored but also has data" are not representable.
 *
 *   loading    — the store is async and has not answered yet. Today's store is
 *                synchronous and build-time, so this is unreachable on a static
 *                render; it exists because the block is also the Suspense
 *                fallback's shape and because the store will not stay synchronous.
 *   unobserved — no run exists for this entity. THE DEFAULT. Fully designed.
 *   error      — the store answered and could not produce the run. Says what
 *                broke and what the reader can do, never a bare "error".
 *   observed   — a real run. The only state that renders a vendor name.
 */
export type ObservationView =
  | { readonly status: 'loading' }
  | { readonly status: 'unobserved' }
  | { readonly status: 'error'; readonly reason: string }
  | { readonly status: 'observed'; readonly run: ObservationRun };

/** What Luke implements. One method, so a fake in a test is three lines. */
export interface ObservationStore {
  lookup(entityPath: string): ObservationView;
}

/**
 * The always-empty store.
 *
 * NOT what pages use. `observationStore` in ./observationStore.ts is the real
 * implementation over the committed records, and both route branches read that
 * one. This is the degenerate case, kept because a contract that cannot be
 * exercised without its implementation is not a contract, and because
 * scripts/test-b2b-observations.cjs asserts against it.
 *
 * It returns `unobserved` for everything. It does not return an example run and
 * it must never be "temporarily" made to. If you are tempted, read the rule at
 * the top of this file again.
 */
export const NULL_OBSERVATION_STORE: ObservationStore = {
  lookup: () => ({ status: 'unobserved' }),
};

/* ── Derived views. Pure, total, and deliberately not "metrics". ───────────── */

/** Distinct engines actually present in a run. Used to caption the table honestly. */
export function enginesIn(run: ObservationRun): readonly Engine[] {
  return ENGINES.filter((e) => run.rows.some((r) => r.engine === e));
}

/** Distinct prompts in a run. Counting rows would multiply by engine and overstate. */
export function promptsIn(run: ObservationRun): readonly string[] {
  return Array.from(new Set(run.rows.map((r) => r.prompt)));
}
