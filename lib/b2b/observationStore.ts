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
import { getMetaVertical, getSubNiche } from '../../data/b2b/verticals';
import { icpTaxonomyHolds } from './icpResolution';
import type { ResolveIcp } from './icpResolution';
import { resolveIndustry, resolveSubIndustry } from './registry';
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
 *   - an `entityPath` that names no page, which is how a real observation taken
 *     for one niche gets rendered under another niche's label
 *
 * Throws with the entity path and the offending value, because a gate that
 * fails without naming the record is a gate nobody can act on.
 */
export interface ObservationValidationDeps {
  /**
   * The ICP resolver. ADR-0008 §3.2, and Mira's `lib/b2b/icpRegistry.ts`
   * implements it.
   *
   * Injected rather than imported, for the reason ADR-0003 §3 gives for every
   * other seam in this family: the gate must be exercisable in full without the
   * collaborator's module, and when that module exists it must be the ONE
   * authority on whether an ICP path renders, so the gate and the route cannot
   * disagree about who owns a URL.
   *
   * Omitting it does not soften anything. An ICP-shaped path fails closed with a
   * message naming this field, because a gate that waves through the paths it
   * cannot check is the same defect as the binding that was missing here in the
   * first place, one level deeper.
   */
  readonly resolveIcp?: ResolveIcp;
}

export function assertObservationRecordsValid(
  runs: readonly ObservationRun[],
  answers: readonly StoredAnswer[],
  deps: ObservationValidationDeps = {},
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

    assertEntityPathIsBound(run.entityPath, deps);

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

/**
 * Per-prospect audit runs. `lib/audit/aiVisibility.ts` stamps one run per
 * request with `audit:<hostname>` because a one-off audit has no entity in the
 * B2B taxonomy, and the audited host is the honest identifier.
 *
 * It is a separate namespace on purpose: nothing looks it up, so it renders on
 * no page, and `scripts/test-b2b-observations.cjs` asserts no committed record
 * ever uses it.
 */
const AUDIT_NAMESPACE = 'audit:';

/**
 * The entityPath has to name a page that would actually render this run.
 *
 * It was bound to nothing. Any string validated, including
 * `/industries/totally/made-up` and `/industries/law-legal` — a legacy page that
 * renders no observation block at all. That mattered because it is the one
 * remaining way a fabricated observation gets onto a page: every other field is
 * checked against the stored answer, so the only thing left to forge is WHICH
 * ENTITY a real answer belongs to. A run taken for one niche, committed under
 * another niche's path, renders under that entity's label via
 * components/b2b/VerticalHubPage.tsx with both gates green.
 *
 * This cannot check that the prompts were the right prompts for the niche — that
 * is the reviewer's job, and it is named in the commit. It can check that the
 * path is a page, and that the page is ours to put an observation on.
 *
 * Resolution goes through lib/b2b/registry.ts, the same function the route
 * calls, so the gate and the renderer cannot disagree about who owns a URL.
 */
const assertEntityPathIsBound = (entityPath: string, deps: ObservationValidationDeps): void => {
  if (entityPath.startsWith(AUDIT_NAMESPACE)) {
    const hostname = entityPath.slice(AUDIT_NAMESPACE.length).trim();
    if (!hostname) {
      throw new Error(
        `"${entityPath}" is in the "audit:" namespace but names no hostname. The audited host is the ` +
        'only identifier a per-prospect run has; without it the run identifies nothing.',
      );
    }
    return;
  }

  const [empty, root, ...segments] = entityPath.split('/');
  if (empty !== '' || root !== 'industries' || segments.length < 1 || segments.length > 4 ||
      segments.some((segment) => !segment)) {
    throw new Error(
      `entityPath "${entityPath}" is not shaped like an entity URL, so there is no page it can render ` +
      'on. Expected one to four segments under /industries: "/industries/<industry>", ' +
      '"/industries/<industry>/<sub-industry>", "/industries/<industry>/<sub-industry>/<niche>" or ' +
      '"/industries/<industry>/<sub-industry>/<niche>/<sub-niche>" (ADR-0008 §2.1), or ' +
      `"audit:<hostname>" for a per-prospect audit run. This one has ${segments.length} segments.`,
    );
  }

  const [industry, subIndustry] = segments;

  /* The two-level registry goes FIRST and answers on its own for a one- or
     two-segment path. That order is the whole legacy guarantee: the resolver the
     route calls decides who owns a live URL, and adding a second resolver must
     not change the answer for any path the first one already owns. */
  if (segments.length <= 2) {
    /* Legacy claims a row at depth 1 and depth 2 and nowhere below it
       (ADR-0008 §3.2: "legacy wins at whatever depth it holds a row, and nowhere
       below it"; data/industries.ts is exactly two levels deep, so it can never
       claim segment 3 or 4). Scoping this test to those two depths is what lets
       industry `04`'s ICP tree exist under the legacy `financial-services` hub. */
    if (resolveIndustry(industry)?.source === 'legacy') {
      throw new Error(
        `entityPath "${entityPath}" is owned by a LEGACY industry in data/industries.ts. Legacy wins in ` +
        'lib/b2b/registry.ts, that template renders no observation block, and an observation recorded ' +
        'against it is evidence attached to a page that will never show it. Rename the entity or get an ' +
        'operator decision to re-point the legacy hub.',
      );
    }

    const record = subIndustry ? resolveSubIndustry(industry, subIndustry) : resolveIndustry(industry);
    if (record?.source === 'b2b') return;

    const exists = subIndustry ? getSubNiche(industry, subIndustry) : getMetaVertical(industry);
    if (exists) {
      throw new Error(
        `entityPath "${entityPath}" is a real row in data/b2b/verticals.ts but it is not routable: a ` +
        'spine entity has no page and 404s on request, and a routable one with no authored body does ' +
        'the same. Promote the entity and author its body in the commit that adds this run, or the ' +
        'observation is a measurement of a page nobody can read.',
      );
    }
    /* Not a row in verticals.ts at all. It may still be an ICP entity: 22 ICP
       sub-industry slugs are byte-identical to META_VERTICALS sub-niche ids
       (ADR-0008 §4.2), and the two families will overlap further as the alias
       map replaces the spine. Fall through. */
  }

  assertIcpEntityPathIsBound(entityPath, segments, deps);
};

/**
 * The same binding, over the ICP's four levels.
 *
 * ADR-0008 turns `/industries/*` into a four-level space of 11,561 entities
 * behind a second resolver. Everything the two-level version was protecting
 * against is unchanged and 150 times larger: the only field on a run that is not
 * checked against the stored answer is WHICH ENTITY the answer belongs to, and
 * at this scale a run filed one slug sideways lands on a page whose buyer,
 * standards and comparison axes are someone else's.
 *
 * Three outcomes, and the difference between the last two is the difference
 * between "you invented a slug" and "you measured a page that is not promoted
 * yet". A reader of a failing build needs to be told which.
 */
const assertIcpEntityPathIsBound = (
  entityPath: string,
  segments: readonly string[],
  deps: ObservationValidationDeps,
): void => {
  if (!deps.resolveIcp) {
    throw new Error(
      `entityPath "${entityPath}" is in the ICP entity space, and no ICP resolver is wired into this ` +
      'check. Pass `resolveIcp` (ADR-0008 §3.2, implemented by lib/b2b/icpRegistry.ts) in the ' +
      '`deps` argument of assertObservationRecordsValid. It fails closed rather than passing, because ' +
      'the path a run claims is the one thing on a run that nothing else can verify.',
    );
  }

  if (deps.resolveIcp(segments)) return;

  throw new Error(
    icpTaxonomyHolds(segments)
      ? `entityPath "${entityPath}" is a real entity in data/b2b/icp/icp-taxonomy.json, but the ICP ` +
        'resolver does not return it, so it has no page: it is spine, it is not in a promoted cohort ' +
        '(ADR-0008 §6.4), or legacy claims the path at that depth. Promote the cohort and author the ' +
        'body in the commit that adds this run, or the observation measures a page nobody can read.'
      : `entityPath "${entityPath}" does not resolve to any entity in ` +
        'data/b2b/icp/icp-taxonomy.json. POSITIONING rule 6: slugs come from that file and are never ' +
        'invented or renamed. An observation filed under a path that names no page renders nowhere, ' +
        'or renders under an entity it was not taken for. Both are worse than not publishing it.',
  );
};

/**
 * Does a slice of the answer stand on its own, or is it buried inside a word?
 *
 * The same test `findVendorSpans` in lib/audit/aiVisibility.ts applies when it
 * produces a span, applied here to the records it does not produce. "Delta" at
 * offset 0 of "Deltaform Industries" is a real byte-for-byte match and a
 * misattribution; "Delta Aero," followed by a comma is a real naming.
 */
const isWordBounded = (text: string, start: number, end: number): boolean => {
  const before = text[start - 1];
  const after = text[end];
  return !(before && /[a-z0-9]/i.test(before)) && !(after && /[a-z0-9]/i.test(after));
};

/** Is `name` present in `text` as a whole word, at any offset? */
const namedAtWordBoundary = (text: string, name: string): boolean => {
  if (!name) return false;
  for (let at = text.indexOf(name); at >= 0; at = text.indexOf(name, at + 1)) {
    if (isWordBounded(text, at, at + name.length)) return true;
  }
  return false;
};

const assertSpanResolves = (answer: StoredAnswer, span: VendorSpan): void => {
  const end = span.offset + span.matchedText.length;
  const slice = answer.rawAnswer.slice(span.offset, end);
  if (slice !== span.matchedText) {
    throw new Error(
      `[${answer.answerId}] claims "${span.name}" appears at offset ${span.offset}, but the stored ` +
      'answer does not match there. Either the answer was edited after the fact, or the span was ' +
      'written by hand.',
    );
  }
  /* The offset check alone passes for a span sitting INSIDE a longer word, and a
     vendor proven by a span never reaches the fallback below. Boundary-checking
     only the fallback would have left this door open. */
  if (!isWordBounded(answer.rawAnswer, span.offset, end)) {
    throw new Error(
      `[${answer.answerId}] has a span for "${span.name}" at offset ${span.offset} that lands inside a ` +
      `longer word: "${answer.rawAnswer.slice(Math.max(0, span.offset - 12), end + 12)}". A match with ` +
      'no word boundary is a different firm, or no firm at all.',
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
    // A WORD-bounded occurrence, not a raw substring. `includes` accepted
    // "Delta" against "Deltaform Industries is unrelated." and "aero" against
    // "aerospace manufacturing" — an invented firm and a trade, both reported as
    // named. findVendorSpans has boundary-checked since it was written, so the
    // gate was weaker than the code it guards, on precisely the hand-authored
    // records that carry no spans and reach this line instead.
    const provenByText = namedAtWordBoundary(answer.rawAnswer, vendor);
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
