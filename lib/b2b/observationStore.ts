/* The observation store. Implements `ObservationStore` from ./observations.ts.
 *
 * That file is the contract and says "What Luke implements. One method, so a
 * fake in a test is three lines." This is that one method, plus the evidence
 * lookup that makes `ObservedRow.answerId` mean something, plus the runtime
 * gate that the compiler cannot provide.
 *
 * Follows the repo's split: records under data/ (data/b2b/observations/), the
 * logic that reads them under lib/, same as data/growth/taxonomy.ts and
 * lib/growth/publication.ts.
 *
 * Nothing here does I/O. The store is synchronous and build-time, which is what
 * the contract's comment on the `loading` state anticipates.
 *
 * TENANCY: not applicable, derived not assumed, and re-derived here rather than
 * inherited. There is no auth dependency in package.json and no
 * getServerSession / userId / tenantId / organizationId / accountId anywhere in
 * lib, app or components (ADR-0007 "Tenancy note", ADR-0001). This module reads
 * two module-scope arrays compiled into the bundle. No query, no request
 * context, no per-customer scope, no cache key. Single-tenant public marketing
 * site. If that ever stops being true, this comment is the thing that has to
 * change first.
 */
import { OBSERVATION_RUNS, STORED_ANSWERS } from '../../data/b2b/observations';
import type { StoredAnswer, VendorSpan } from '../../data/b2b/observations/evidence';
import type { ObservationRun, ObservationStore, ObservationView, ObservedRow } from './observations';

export { OBSERVATION_RUNS, STORED_ANSWERS };
export type { StoredAnswer, VendorSpan } from '../../data/b2b/observations/evidence';

/**
 * Build a store over a set of records.
 *
 * Defaults to the committed records, which are empty today, so every entity
 * resolves to `unobserved`. Records are injectable so a test can supply its own
 * without a fixture ever shipping in data/ (ADR-0003 §3: test doubles live in
 * test files and are injected; they never ship in the module).
 */
export function createObservationStore(
  records: { runs?: readonly ObservationRun[]; answers?: readonly StoredAnswer[] } = {},
): ObservationStore {
  const runs = records.runs ?? OBSERVATION_RUNS;

  // Built once per store, not per lookup. A page renders many entities.
  const byPath = new Map<string, ObservationRun>();
  for (const run of runs) byPath.set(run.entityPath, run);

  return {
    lookup(entityPath: string): ObservationView {
      const run = byPath.get(entityPath);

      // A run with no rows is not a result, it is a record-keeping mistake, and
      // rendering it as `observed` would put an empty table on the page under a
      // heading that says we measured something. Treat it as unobserved; the
      // validator fails the build on it separately so it gets fixed.
      if (!run || run.rows.length === 0) return { status: 'unobserved' };

      return { status: 'observed', run };
    },
  };
}

/** The default store over the committed records. */
export const observationStore: ObservationStore = createObservationStore();

/**
 * Re-derive a row from the answer it came from.
 *
 * This is the auditability claim as a function call. If it returns undefined
 * for a row that is on a page, the page is showing a number nobody can trace,
 * which is why `assertObservationRecordsValid` refuses to let that build.
 */
export function answerFor(
  answerId: string,
  answers: readonly StoredAnswer[] = STORED_ANSWERS,
): StoredAnswer | undefined {
  return answers.find((answer) => answer.answerId === answerId);
}

/* ── The runtime gate ─────────────────────────────────────────────────────── */

/**
 * Check the records against the evidence they carry.
 *
 * Run on the committed records by scripts/test-b2b-observations.cjs. ADR-0007
 * §3.3 is explicit that TypeScript cannot read string content, so the checks
 * that matter most for a claims gate cannot be types. Each one below is a way a
 * fabricated observation would otherwise be indistinguishable from a real one:
 *
 *   - a row pointing at a stored answer that does not exist
 *   - a vendor named in a row who is not named in the answer
 *   - a URL cited in a row that the answer did not cite
 *   - a stored answer with no text in it
 *   - a prompt that drifted between the row and the answer
 *   - firstRunAt / lastRunAt that do not match the rows they claim to summarise
 *   - an empty `limits` line, which CLAUDE.md §4 requires
 *
 * Throws with the entity path and the offending value, because a gate that
 * fails without naming the record is a gate nobody can act on.
 */
export function assertObservationRecordsValid(
  runs: readonly ObservationRun[],
  answers: readonly StoredAnswer[],
): void {
  const seenPaths = new Set<string>();
  const answerIds = new Set<string>();

  for (const answer of answers) {
    if (answerIds.has(answer.answerId)) {
      throw new Error(`Duplicate stored answer id: ${answer.answerId}`);
    }
    answerIds.add(answer.answerId);

    if (typeof answer.rawAnswer !== 'string' || answer.rawAnswer.trim() === '') {
      throw new Error(
        `[${answer.answerId}] has no raw answer text. A run without the response it came from is ` +
        'not an observation, and every row on the page is supposed to re-derive from it.',
      );
    }
    if (!answer.retrievedAt || !answer.runAt) {
      throw new Error(`[${answer.answerId}] is missing a timestamp. An observation without a date is a state claim.`);
    }
    if (answer.modelVersion !== undefined && (!answer.modelVersion.trim() || /^latest$/i.test(answer.modelVersion))) {
      throw new Error(
        `[${answer.answerId}] has no exact model version ("${answer.modelVersion}"). ` +
        '"latest" is not reproducible, and reproducibility is the claim.',
      );
    }
    for (const span of answer.vendorSpans ?? []) {
      assertSpanResolves(answer, span);
    }
  }

  for (const run of runs) {
    const at = `[${run.entityPath}]`;

    if (seenPaths.has(run.entityPath)) {
      throw new Error(
        `${at} has more than one observation run. The store would show whichever it found first, ` +
        'which is a claim nobody reviewed. Merge them into one run.',
      );
    }
    seenPaths.add(run.entityPath);

    if (run.rows.length === 0) {
      throw new Error(`${at} has an observation run with no rows. Remove the run or add the rows.`);
    }
    if (!run.limits || !run.limits.trim()) {
      throw new Error(
        `${at} has an empty limits line. CLAUDE.md §4 requires the platform, the date, the prompt ` +
        'set AND the limits to be stated. A limits line that can be omitted is omitted.',
      );
    }

    for (const row of run.rows) {
      assertRowBackedByAnswer(at, row, answers);
    }

    const dates = run.rows.map((row) => row.runAt).sort();
    if (run.firstRunAt !== dates[0] || run.lastRunAt !== dates[dates.length - 1]) {
      throw new Error(
        `${at} declares firstRunAt ${run.firstRunAt} / lastRunAt ${run.lastRunAt}, but its rows run ` +
        `${dates[0]} to ${dates[dates.length - 1]}. These derive from the rows; they are not a caption.`,
      );
    }
  }
}

const assertSpanResolves = (answer: StoredAnswer, span: VendorSpan): void => {
  const slice = answer.rawAnswer.slice(span.offset, span.offset + span.matchedText.length);
  if (slice !== span.matchedText) {
    throw new Error(
      `[${answer.answerId}] claims "${span.name}" appears at offset ${span.offset}, but the stored ` +
      'answer does not match there. Either the answer was edited after the fact, or the span was ' +
      'written by hand.',
    );
  }
};

const assertRowBackedByAnswer = (
  at: string,
  row: ObservedRow,
  answers: readonly StoredAnswer[],
): void => {
  const answer = answers.find((candidate) => candidate.answerId === row.answerId);
  if (!answer) {
    throw new Error(
      `${at} has a row whose answerId "${row.answerId}" resolves to no stored answer. The page ` +
      'would render a result that cannot be traced back to anything, which is a screenshot with ' +
      'extra steps.',
    );
  }

  if (row.prompt !== answer.prompt) {
    throw new Error(
      `${at} row prompt is not verbatim the prompt on stored answer ${answer.answerId}. The reader ` +
      'is invited to paste that line into the assistant themselves, so a paraphrase breaks ' +
      'reproducibility silently.',
    );
  }
  if (row.engine !== answer.engine) {
    throw new Error(`${at} row says ${row.engine} but stored answer ${answer.answerId} says ${answer.engine}.`);
  }
  if (row.runAt !== answer.runAt) {
    throw new Error(`${at} row is dated ${row.runAt} but stored answer ${answer.answerId} is dated ${answer.runAt}.`);
  }
  if (row.modelVersion !== answer.modelVersion) {
    throw new Error(
      `${at} row model "${row.modelVersion}" does not match stored answer ${answer.answerId} ` +
      `model "${answer.modelVersion}".`,
    );
  }

  // The check that matters most. A vendor on the page who is not in the answer
  // is the AICitationSimulator failure, and it is invisible to every other gate.
  const spanNames = new Set((answer.vendorSpans ?? []).map((span) => span.name));
  for (const vendor of row.vendorsNamed) {
    const provenBySpan = spanNames.has(vendor);
    const provenByText = answer.rawAnswer.includes(vendor);
    if (!provenBySpan && !provenByText) {
      throw new Error(
        `${at} says the answer named "${vendor}", but that firm is not named anywhere in stored ` +
        `answer ${answer.answerId}. A vendor on the page who is not in the response is exactly the ` +
        'fabrication this store exists to make impossible.',
      );
    }
  }

  const cited = new Set(answer.urlsCited);
  for (const url of row.urlsCited) {
    if (!cited.has(url)) {
      throw new Error(
        `${at} lists "${url}" as cited, but it is not in the stored answer ${answer.answerId}'s ` +
        'citations. Invented citations are the single most checkable lie on a page like this.',
      );
    }
  }
};
