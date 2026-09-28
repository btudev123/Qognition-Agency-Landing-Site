/* THE EVIDENCE RECORD. What `ObservedRow.answerId` points at.
 *
 * lib/b2b/observations.ts describes `answerId` as "the id of the stored raw
 * answer. Every row on the page re-derives from this, which is the difference
 * between our observation and a screenshot." This file is the thing it points
 * at. Without it that sentence is a promise; with it, it is a lookup.
 *
 * Every field is required. There is no optional evidence:
 *
 *   rawAnswer     the unmodified provider response. The thing a sceptical
 *                 client asks to see. Never trimmed to the useful part, never
 *                 tidied for the page, never regenerated.
 *   prompt        verbatim, and the validator asserts it is byte-identical to
 *                 the row's prompt. The persuasion is that a reader can paste
 *                 the line into ChatGPT themselves; a paraphrase breaks that
 *                 silently and nobody would ever notice.
 *   engine        which surface answered.
 *   modelVersion  the exact id that answered. Optional only where the surface
 *                 genuinely does not expose one, which is Google AI Overviews,
 *                 mirroring the same allowance on ObservedRow. Never "latest":
 *                 a metric that cannot name what produced it is not reproducible.
 *   runAt         the date the claim is scoped to. CLAUDE.md §4: a sampled AI
 *                 result is an observation on a date, not a state.
 *   retrievedAt   the instant of the fetch. Finer than runAt on purpose, so two
 *                 runs on one day stay distinguishable.
 *   vendorsNamed  who the answer named, WITH the span that proves it. This is
 *                 the field the row's `vendorsNamed: string[]` is checked
 *                 against. The row keeps the flat list because that is the
 *                 agreed rendering contract; the proof lives here.
 *   urlsCited     what the answer cited.
 *
 * A record here can be produced in exactly two ways: by the live audit
 * (lib/audit/aiVisibility.ts, which emits this shape directly) or by a human
 * pasting a real answer and naming themselves in the commit. There is no third.
 */
import type { Engine } from '../../../lib/b2b/observations';
// IsoDate is declared in data/b2b/types.ts and consumed (not re-exported) by
// lib/b2b/observations.ts, so it is imported from its home rather than through
// the contract module.
import type { IsoDate } from '../types';

/**
 * One firm named in one stored answer, with the receipt.
 *
 * `offset` and `matchedText` together are what makes a hand-typed vendor fail
 * the build: the validator checks
 * `rawAnswer.slice(offset, offset + matchedText.length) === matchedText`.
 * ADR-0007 §3.3 is explicit that TypeScript cannot see string content, so this
 * check cannot be a type and has to be a gate.
 */
export interface VendorSpan {
  /** As the answer wrote it. Not corrected, not normalised, not expanded. */
  readonly name: string;
  readonly matchedText: string;
  /** Index into `rawAnswer`. */
  readonly offset: number;
}

export interface StoredAnswer {
  readonly answerId: string;
  readonly prompt: string;
  readonly engine: Engine;
  /** Absent only for Google AI Overviews, which exposes no model id. */
  readonly modelVersion?: string;
  readonly runAt: IsoDate;
  /** Full ISO 8601 instant, e.g. "2026-09-28T10:00:00.000Z". */
  readonly retrievedAt: string;
  /** The unmodified provider response. */
  readonly rawAnswer: string;
  readonly urlsCited: readonly string[];
  /**
   * Optional, and this is a deliberate weakening that should be read before it
   * is relied on. When present, the validator checks each span byte-for-byte
   * against `rawAnswer`. When absent, it falls back to a substring check of the
   * row's `vendorsNamed` against `rawAnswer`, which still catches an invented
   * firm but not a misattributed one. Spans are always populated by the live
   * audit; they are optional so a human transcribing a real Gemini answer is
   * not forced to count characters by hand and get it wrong.
   */
  readonly vendorSpans?: readonly VendorSpan[];
}
