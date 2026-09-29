/* THE PANEL RUN HARNESS. What turns the architecture into evidence.
 *
 * ────────────────────────────────────────────────────────────────────────────
 * WHAT IT DOES.
 *
 * Takes an ICP entity path, builds its prompt panel (./promptPanel.ts), asks
 * every prompt on every engine, and returns records in the committed format:
 * one `ObservationRun` and the `StoredAnswer`s its rows re-derive from
 * (data/b2b/observations/evidence.ts).
 *
 * It does not write to data/. `OBSERVATION_RUNS` and `STORED_ANSWERS` are empty
 * and stay empty until a human reads a real run, pastes it in, and names
 * themselves in the commit. A harness that could append to the committed records
 * on its own would make "every number traces to a stored answer" a claim about a
 * script rather than about a person, and the whole point of the second array is
 * that somebody is on the diff.
 *
 * ────────────────────────────────────────────────────────────────────────────
 * THE not_checked DISCIPLINE, INHERITED FROM lib/audit/aiVisibility.ts.
 *
 *   AN UNCONFIGURED PROVIDER RECORDS NOTHING, NEVER A GUESS.
 *
 * No key is configured on any deployment and the operator has parked that
 * decision until last, so today this module's only reachable path is with an
 * injected fake. That is the design. There is no fixture, no MOCK_ constant, no
 * NODE_ENV branch and no default answer anywhere in this file (ADR-0003 §3).
 * Every failure mode resolves to `not_checked` carrying a reason:
 *
 *   - no key                       provider_not_configured, and NOTHING is sent
 *   - the path has no panel        no_panel_for_entity
 *   - the panel came back empty    empty_panel
 *   - every call failed or was     nothing_recorded
 *     unusable
 *
 * `nothing_recorded` is the one worth dwelling on. A run in which no answer was
 * usable and a run in which the engines named nobody are DIFFERENT CLAIMS, and
 * once written into an `ObservationRun` they are indistinguishable: both are
 * rows with an empty `vendorsNamed`, except the first is rows that do not exist.
 * The second is a finding and belongs on the page. The first is a fault and must
 * not be dressed as one.
 *
 * ────────────────────────────────────────────────────────────────────────────
 * WHAT MAY REACH A RECORD.
 *
 * A vendor name reaches `vendorsNamed` only when `findVendorSpans` finds it
 * standing in the stored text at a word boundary with a capital letter in it.
 * That function is imported from lib/audit/aiVisibility.ts rather than
 * reimplemented, along with the candidate rule, because two implementations of
 * "what counts as a firm being named" is precisely how that module came to
 * over-report "precision" and "group" on the one claim the product rests on.
 *
 * Candidates here are the brand labels of the CITED domains. There is no target
 * firm in a panel run, so the audit's other candidate source does not apply. The
 * consequence is stated rather than hidden: a firm the answer names but does not
 * cite is MISSED. `[UNVERIFIED: what share of real answers name a firm they do
 * not also cite. Worth measuring on the first fifty live runs before anyone
 * reads vendorsNamed as a complete list.]` The `limits` line says so on the page.
 *
 * ────────────────────────────────────────────────────────────────────────────
 * FAMILY B. Every prompt sent from here is the CLIENT'S buyer asking for a
 * supplier. We run them, record them, publish the observation. We are never the
 * cited answer to one, and no string that passes through this module may become
 * a ranking target. ./promptPanel.ts's header has the full statement.
 *
 * TENANCY: not applicable, re-derived rather than inherited. No auth dependency
 * in package.json, no session, user or tenant identifier anywhere in lib, app or
 * components. This module holds no state between calls, reads no request
 * context, and has no cache key. Single-tenant public marketing site.
 */
import type { StoredAnswer, VendorSpan } from '../../data/b2b/observations/evidence';
import { MAX_ANSWER_CHARS, brandFromUrl, findVendorSpans } from '../audit/aiVisibility';
import type { Engine, ObservationRun, ObservedRow } from './observations';
import { panelFor } from './promptPanel';
import type { PanelPrompt } from './promptPanel';

/** Minimal env shape, injected so this is testable without process.env. */
export type PanelEnv = Record<string, string | undefined>;

/**
 * Is a provider usable?
 *
 * Same key and same whitespace rule as lib/audit/aiVisibility.ts: project memory
 * records Vercel env vars registered with EMPTY values, which silently broke
 * every integration, and a key of "" sails past a truthiness check and produces
 * a 401 on every call.
 *
 * [UNVERIFIED: whether a panel run will use the same provider and therefore the
 * same key as the per-prospect audit. One key is assumed here because one key is
 * what exists in the codebase today; the operator has parked the provider
 * decision until last, and if it lands as a key per engine this function is the
 * thing that changes.]
 */
export function isPanelProviderConfigured(env: PanelEnv): boolean {
  return Boolean(env.PERPLEXITY_API_KEY && env.PERPLEXITY_API_KEY.trim());
}

/* ── The provider seam ────────────────────────────────────────────────────── */

export interface PanelProviderRequest {
  readonly prompt: string;
  readonly engine: Engine;
}

/**
 * What a provider hands back. Deliberately the minimum an evidence record needs
 * and nothing more: no score, no summary, no parsed vendor list. Parsing is this
 * module's job and it is done against the stored text, so a provider cannot
 * assert that a firm was named.
 */
export interface PanelProviderAnswer {
  /**
   * The exact model id that answered. Never "latest": ADR-0003 §3, and
   * `assertObservationRecordsValid` rejects it. Omitted only for Google AI
   * Overviews, which exposes none.
   */
  readonly modelVersion?: string;
  readonly rawAnswer: string;
  readonly urlsCited: readonly string[];
}

/**
 * One call to one engine.
 *
 * Injected, always. This module contains no HTTP and no key handling beyond the
 * configured check above: the real implementation is one small adapter per
 * engine, written when the operator settles the provider, and it is the only
 * thing that will need a network fake. Everything in this file can be exercised
 * with three lines of async function.
 *
 * May return undefined or throw. Both mean "no answer", and neither produces a
 * row.
 */
export type PanelProvider = (request: PanelProviderRequest) => Promise<PanelProviderAnswer | undefined>;

/* ── Results ──────────────────────────────────────────────────────────────── */

export type PanelNotCheckedReason =
  | 'provider_not_configured'
  | 'no_panel_for_entity'
  | 'empty_panel'
  | 'nothing_recorded';

/** Why one prompt on one engine produced no row. Reported, never silently dropped. */
export type SkipReason = 'provider_unavailable' | 'unusable_answer';

export interface SkippedCall {
  readonly prompt: string;
  readonly engine: Engine;
  readonly reason: SkipReason;
  /** One line, safe to print. Never the error object: it can carry the Authorization header. */
  readonly detail: string;
}

export type PanelRunResult =
  | {
      readonly status: 'not_checked';
      readonly reason: PanelNotCheckedReason;
      readonly message: string;
      readonly skipped: readonly SkippedCall[];
    }
  | {
      readonly status: 'observed';
      readonly run: ObservationRun;
      readonly answers: readonly StoredAnswer[];
      readonly skipped: readonly SkippedCall[];
    };

export interface RunPanelArgs {
  readonly entityPath: string;
  readonly env: PanelEnv;
  /** Injected, so two runs of the same panel in a test produce comparable records. */
  readonly now: Date;
  readonly engines: readonly Engine[];
  readonly provider: PanelProvider;
  /**
   * Entity paths beneath this one whose sub-niches are excluded from the panel.
   * Passed straight through to `panelFor`; see its `PanelOptions.exclude`.
   */
  readonly exclude?: readonly string[];
}

const NOT_CHECKED_MESSAGE: Record<PanelNotCheckedReason, string> = {
  provider_not_configured:
    'Not checked. No answer-engine provider is configured, so nothing was asked and nothing was recorded.',
  no_panel_for_entity:
    'Not checked. That path names no entity in the locked ICP taxonomy, so there is no panel to run and ' +
    'no page the result could belong to.',
  empty_panel:
    'Not checked. The entity resolves but its panel is empty, which means the sub-industry above it ' +
    'carries no supplied prompts. Nothing was asked.',
  nothing_recorded:
    'Not checked. Every call either failed or returned something that cannot be stored as evidence. No ' +
    'rows were written, because a run with no usable answers is not the same finding as a run in which ' +
    'the engines named nobody.',
};

const notChecked = (reason: PanelNotCheckedReason, skipped: readonly SkippedCall[] = []): PanelRunResult => ({
  status: 'not_checked',
  reason,
  message: NOT_CHECKED_MESSAGE[reason],
  skipped,
});

/* ── The run ──────────────────────────────────────────────────────────────── */

/**
 * Ask every prompt in the entity's panel on every engine, and record what came
 * back.
 *
 * Sequential, engine by engine and prompt by prompt in panel order. Not for
 * politeness: the row order in the emitted run is then the panel order, which is
 * the locked file's document order, which is what makes one month's run
 * comparable to the last one (§9.2). A parallel map would reorder on latency.
 *
 * Never throws. A provider having a bad day is a `not_checked`, not a stack trace
 * in the middle of a research run.
 */
export async function runPanel(args: RunPanelArgs): Promise<PanelRunResult> {
  const { entityPath, env, now, engines, provider } = args;

  // Before anything is sent. Removing the key is the kill switch, and a kill
  // switch checked after the call is not one.
  if (!isPanelProviderConfigured(env)) return notChecked('provider_not_configured');

  const panel = panelFor(entityPath, { exclude: args.exclude });
  if (!panel) return notChecked('no_panel_for_entity');
  if (panel.prompts.length === 0) return notChecked('empty_panel');

  const runAt = isoDate(now);
  const retrievedAt = now.toISOString();

  const rows: ObservedRow[] = [];
  const answers: StoredAnswer[] = [];
  const skipped: SkippedCall[] = [];
  const usedIds = new Set<string>();

  for (const engine of engines) {
    for (const entry of panel.prompts) {
      const outcome = await ask(provider, entry, engine);
      if ('reason' in outcome) {
        skipped.push({ prompt: entry.prompt, engine, reason: outcome.reason, detail: outcome.detail });
        continue;
      }

      const { answer: provided } = outcome;
      const rawAnswer = provided.rawAnswer.slice(0, MAX_ANSWER_CHARS);
      const urlsCited = dedupeHttpUrls(provided.urlsCited);
      const spans = findVendorSpans(rawAnswer, candidatesFrom(urlsCited));

      const answerId = uniqueAnswerId(
        `panel-${runAt}-${hashOf(`${entityPath}|${entry.prompt}|${engine}|${provided.modelVersion ?? ''}|${rawAnswer}`)}`,
        usedIds,
      );

      answers.push({
        answerId,
        prompt: entry.prompt,
        engine,
        modelVersion: provided.modelVersion,
        runAt,
        retrievedAt,
        rawAnswer,
        urlsCited,
        vendorSpans: spans,
      });

      rows.push({
        prompt: entry.prompt,
        engine,
        modelVersion: provided.modelVersion,
        runAt,
        // Only names proven present in the stored text. See findVendorSpans.
        vendorsNamed: spans.map((span: VendorSpan) => span.name),
        urlsCited,
        answerId,
      });
    }
  }

  if (rows.length === 0) return notChecked('nothing_recorded', skipped);

  const run: ObservationRun = {
    entityPath,
    rows,
    firstRunAt: runAt,
    lastRunAt: runAt,
    limits: limitsLine({ panel: panel.prompts, engines, runAt, rows: rows.length, skipped: skipped.length }),
  };

  return { status: 'observed', run, answers, skipped };
}

type AskOutcome =
  | { readonly answer: PanelProviderAnswer }
  | { readonly reason: SkipReason; readonly detail: string };

/**
 * One call, with the two refusals that have to happen before a record exists.
 *
 * An answer with no text is not evidence. An answer whose model cannot be named
 * is not reproducible, and reproducibility is the claim; `assertObservationRecordsValid`
 * rejects both, so accepting them here would only move the failure to the paste.
 * Google AI Overviews genuinely exposes no model id, which is the one allowance,
 * and it is the same allowance the evidence record makes.
 */
async function ask(provider: PanelProvider, entry: PanelPrompt, engine: Engine): Promise<AskOutcome> {
  let answer: PanelProviderAnswer | undefined;
  try {
    answer = await provider({ prompt: entry.prompt, engine });
  } catch {
    // Never log the error object: on some runtimes it carries the request
    // headers, and those carry the key.
    return { reason: 'provider_unavailable', detail: 'the provider threw or did not respond' };
  }
  if (!answer) return { reason: 'provider_unavailable', detail: 'the provider returned no answer' };

  if (typeof answer.rawAnswer !== 'string' || !answer.rawAnswer.trim()) {
    return { reason: 'unusable_answer', detail: 'the response carried no text' };
  }

  const exposesModel = engine !== 'Google AI Overviews';
  const version = answer.modelVersion;
  if (exposesModel && (!version || !version.trim() || /^latest$/i.test(version))) {
    return {
      reason: 'unusable_answer',
      detail: `the response named its model as "${version ?? 'nothing'}", which is not reproducible`,
    };
  }

  return { answer };
}

/**
 * Who could be named: the brand label of each cited domain.
 *
 * A candidate list, not a result. Nothing here reaches a record until
 * findVendorSpans proves it is literally in the text, at a word boundary, with a
 * capital letter in it.
 */
const candidatesFrom = (urlsCited: readonly string[]): string[] => {
  const names = new Set<string>();
  for (const url of urlsCited) {
    const brand = brandFromUrl(url);
    if (brand) names.add(brand);
  }
  return [...names];
};

const dedupeHttpUrls = (urls: readonly string[]): string[] =>
  [...new Set(urls.filter((url) => typeof url === 'string' && /^https?:\/\//i.test(url)))];

/**
 * The limits line. Required, not optional, and it is the reason the rest is
 * believed.
 *
 * CLAUDE.md §4 wants the platform, the date, the prompt set and the limits. The
 * two limits particular to a panel run, which a reader cannot infer:
 *
 *   - most of the prompts were DERIVED, by composing the operator's supplied
 *     prompt with a scope name from the same locked file. They are the client's
 *     market's vocabulary, but they are not word for word what any one buyer
 *     typed, and saying so is cheaper than being asked;
 *   - a firm named in an answer that did not also cite it is missed rather than
 *     invented.
 *
 * No em dash: this renders on the page and scripts/check-b2b.cjs bans them.
 */
function limitsLine(input: {
  panel: readonly PanelPrompt[];
  engines: readonly Engine[];
  runAt: string;
  rows: number;
  skipped: number;
}): string {
  const supplied = input.panel.filter((entry) => entry.origin === 'supplied').length;
  const composed = input.panel.length - supplied;
  const engines = input.engines.join(', ');

  return (
    `${input.panel.length} prompts asked on ${engines} on ${input.runAt}, producing ${input.rows} ` +
    `recorded answers${input.skipped > 0 ? ` (${input.skipped} calls returned nothing usable and were not recorded)` : ''}. ` +
    `${supplied} of the prompts are the operator's own wording for this sub-industry; ${composed} narrow ` +
    'one of those with a scope name from the same locked taxonomy, so they are that market\'s vocabulary ' +
    'rather than one buyer\'s exact words. It shows what these platforms answered on that day, not what ' +
    'they always answer: assistants vary their responses between runs and between users. A firm is ' +
    'counted as named only where its name stands in the stored answer, so a firm named in a way we did ' +
    'not match, or named without being cited, is missed rather than invented.'
  );
}

/* ── Emission. The thing a human pastes. ──────────────────────────────────── */

/**
 * The run and its answers, as text for data/b2b/observations/index.ts.
 *
 * JSON, which is also a valid TypeScript literal for these shapes, so the paste
 * needs no hand-editing and cannot be mistyped into something the gate accepts
 * but the reviewer did not mean.
 *
 * It serializes the run and the answers and nothing else. ADR-0008 §5.2 item 3
 * keeps `icp-taxonomy.json` from crossing a serialization boundary, and a file
 * on disk is a serialization boundary in exactly the way an RSC payload is.
 */
export function serializeRecordsForCommit(
  run: ObservationRun,
  answers: readonly StoredAnswer[],
): string {
  return JSON.stringify({ run, answers }, null, 2);
}

/* ── Small deterministic helpers ──────────────────────────────────────────── */

const isoDate = (now: Date): `${number}-${number}-${number}` =>
  now.toISOString().slice(0, 10) as `${number}-${number}-${number}`;

/** Short, stable id for an answer. Not a security primitive. Same as the audit's. */
const hashOf = (value: string): string => {
  let hash = 0;
  for (let index = 0; index < value.length; index += 1) {
    hash = (hash * 31 + value.charCodeAt(index)) | 0;
  }
  return Math.abs(hash).toString(36);
};

/**
 * Two answers with the same id would make `answerFor` re-derive a row from the
 * wrong evidence, which is the one thing the id exists to prevent. The hash is a
 * 32-bit rolling one, so a collision inside a single run is unlikely and not
 * impossible; the suffix is deterministic, so a re-run of the same panel still
 * produces the same ids.
 */
const uniqueAnswerId = (candidate: string, used: Set<string>): string => {
  let id = candidate;
  for (let suffix = 2; used.has(id); suffix += 1) id = `${candidate}-${suffix}`;
  used.add(id);
  return id;
};
