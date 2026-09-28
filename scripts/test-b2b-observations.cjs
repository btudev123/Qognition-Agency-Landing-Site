/* Invariants for the B2B observation store.
 *
 * The contract is lib/b2b/observations.ts (Kyle/Mira). This file tests the
 * implementation behind it: lib/b2b/observationStore.ts and the committed
 * records in data/b2b/observations/.
 *
 * Three failures this exists to catch, none of which the compiler can (ADR-0007
 * §3.3: TypeScript cannot see string content):
 *
 *   1. An `observed` view that carries example, sample or seeded rows. The
 *      contract file forbids it in prose. Prose is not a mechanism. Today the
 *      committed store is empty, so every entity must come back `unobserved`,
 *      and the moment that stops being true the diff has to show real evidence.
 *
 *   2. A row whose `answerId` points at nothing. `answerId` is described in the
 *      contract as "the id of the stored raw answer... which is the difference
 *      between our observation and a screenshot". A dangling id makes that
 *      sentence false while the page still renders.
 *
 *   3. A vendor named in a row who is not named in the stored answer. That is
 *      the exact fabrication AICitationSimulator.tsx committed, and it is the
 *      thing this whole architecture exists to be the opposite of.
 *
 * Uses the project's TypeScript compiler through scripts/lib/load-typescript.cjs;
 * no new test dependency, matching scripts/test-growth.cjs.
 */
require('./lib/load-typescript.cjs');
const assert = require('node:assert/strict');

const { NULL_OBSERVATION_STORE, enginesIn, promptsIn } = require('../lib/b2b/observations.ts');
const {
  createObservationStore,
  answerFor,
  assertObservationRecordsValid,
  OBSERVATION_RUNS,
  STORED_ANSWERS,
} = require('../lib/b2b/observationStore.ts');
const { resolveIndustry, resolveSubIndustry } = require('../lib/b2b/registry.ts');

/* ── 1. Unobserved is the default, and it is not an empty observed view ──── */

const store = createObservationStore();

const missing = store.lookup('/industries/professional-services/legal');
assert.equal(missing.status, 'unobserved', 'No run recorded for this entity, so: unobserved.');
assert.equal(
  missing.run, undefined,
  'The unobserved variant must carry no run at all, so a renderer cannot read through it into zeroes.',
);

assert.equal(
  NULL_OBSERVATION_STORE.lookup('/industries/anything').status, 'unobserved',
  'The documented null store still answers unobserved, unchanged.',
);

/* ── 2. A run in which nobody was named is a RESULT, not an absence ──────── */

const answers = [
  {
    answerId: 'ans-fixture-1',
    prompt: 'Which firms handle cross-border IP litigation for mid-market manufacturers?',
    engine: 'Perplexity',
    modelVersion: 'sonar-fixture',
    runAt: '2026-09-28',
    retrievedAt: '2026-09-28T10:00:00.000Z',
    rawAnswer: 'Firms commonly named include Alpha Legal and Beta IP Partners.',
    urlsCited: ['https://example.com/a'],
  },
];

/* The fixture sits on a ROUTABLE B2B entity, not an arbitrary string. A run's
   entityPath decides which page renders it, so the validator now requires the
   path to resolve to a B2B entity that has a page, and a fixture that could not
   survive that rule would be testing a shape the gate no longer accepts. */
const ENTITY_PATH = '/industries/manufacturing-industrial/cnc-machining';

const runs = [
  {
    entityPath: ENTITY_PATH,
    rows: [
      {
        prompt: 'Which firms handle cross-border IP litigation for mid-market manufacturers?',
        engine: 'Perplexity',
        modelVersion: 'sonar-fixture',
        runAt: '2026-09-28',
        vendorsNamed: ['Alpha Legal', 'Beta IP Partners'],
        urlsCited: ['https://example.com/a'],
        answerId: 'ans-fixture-1',
      },
    ],
    firstRunAt: '2026-09-28',
    lastRunAt: '2026-09-28',
    limits: 'One prompt, one platform, one day. It does not describe every answer that platform gives.',
  },
];

const fixtureStore = createObservationStore({ runs, answers });
const found = fixtureStore.lookup(ENTITY_PATH);
assert.equal(found.status, 'observed');
assert.equal(found.run.rows.length, 1);
assert.deepEqual(enginesIn(found.run), ['Perplexity']);
assert.equal(promptsIn(found.run).length, 1, 'One distinct prompt, not one per engine.');

/* The zero result. Same structure, nobody named. It is `observed`, and that is
   the whole point: "we asked and the answer did not name you" is a finding. */
const zeroAnswers = [{ ...answers[0], answerId: 'ans-zero', rawAnswer: 'I do not have enough information to name specific firms.' }];
const zeroRuns = [{
  ...runs[0],
  entityPath: '/industries/manufacturing-industrial',
  rows: [{ ...runs[0].rows[0], vendorsNamed: [], urlsCited: [], answerId: 'ans-zero' }],
}];
const zeroView = createObservationStore({ runs: zeroRuns, answers: zeroAnswers }).lookup('/industries/manufacturing-industrial');
assert.equal(
  zeroView.status, 'observed',
  'A run that named nobody is observed, not unobserved. Collapsing the two is the fabrication risk inverted.',
);
assert.equal(zeroView.run.rows[0].vendorsNamed.length, 0);

/* ── 3. answerFor re-derives the row from its stored answer ──────────────── */

const answer = answerFor('ans-fixture-1', answers);
assert.ok(answer, 'Every row must be able to produce the answer it came from.');
assert.equal(answer.rawAnswer, answers[0].rawAnswer);
assert.equal(answerFor('ans-does-not-exist', answers), undefined);

/* ── 4. The validator catches what the compiler cannot ───────────────────── */

assert.doesNotThrow(() => assertObservationRecordsValid(runs, answers));

const clone = () => JSON.parse(JSON.stringify({ runs, answers }));

const dangling = clone();
dangling.runs[0].rows[0].answerId = 'ans-nope';
assert.throws(
  () => assertObservationRecordsValid(dangling.runs, dangling.answers),
  /stored answer|answerId/i,
  'A row pointing at a missing stored answer must fail the build.',
);

const fabricatedVendor = clone();
fabricatedVendor.runs[0].rows[0].vendorsNamed.push('Qognition');
assert.throws(
  () => assertObservationRecordsValid(fabricatedVendor.runs, fabricatedVendor.answers),
  /not named|stored answer/i,
  'A vendor who does not appear in the stored answer must fail the build.',
);

/* The fallback proof was a raw substring with no word boundary, while
   findVendorSpans in lib/audit/aiVisibility.ts has boundary-checked since the
   day it was written. The gate was weaker than the code it guards, on exactly
   the records it exists to hold: the hand-authored ones, which are the only ones
   that reach data/b2b/observations/ and the only ones with no spans. */

const substringVendor = clone();
substringVendor.answers[0].rawAnswer = 'Deltaform Industries is unrelated to this question.';
substringVendor.runs[0].rows[0].vendorsNamed = ['Delta'];
assert.throws(
  () => assertObservationRecordsValid(substringVendor.runs, substringVendor.answers),
  /not named|stored answer/i,
  '"Delta" is an invented firm. It appears in this answer only inside "Deltaform", and a page saying ' +
  'the assistant named Delta would be a fabrication the reader could disprove by reading the answer.',
);

const substringInsideWord = clone();
substringInsideWord.answers[0].rawAnswer = 'Most of these suppliers work in aerospace manufacturing.';
substringInsideWord.runs[0].rows[0].vendorsNamed = ['aero'];
assert.throws(
  () => assertObservationRecordsValid(substringInsideWord.runs, substringInsideWord.answers),
  /not named|stored answer/i,
  '"aero" inside "aerospace" is the case findVendorSpans rejects by name. The validator must reject it too.',
);

const boundaryVendor = clone();
boundaryVendor.answers[0].rawAnswer = 'Delta Aero, Alpha Legal and Beta IP Partners were named.';
boundaryVendor.runs[0].rows[0].vendorsNamed = ['Delta Aero', 'Alpha Legal'];
assert.doesNotThrow(
  () => assertObservationRecordsValid(boundaryVendor.runs, boundaryVendor.answers),
  'A firm the answer really named, with punctuation either side, still passes. The rule is boundaries, ' +
  'not a ban on substrings.',
);

/* The same hole through the other door. A hand-authored span survives the
   byte-for-byte offset check while sitting inside a longer word, and a vendor
   proven by that span skips the fallback entirely. Fixing only the fallback
   would have left this open. */
const spanInsideWord = clone();
spanInsideWord.answers[0].rawAnswer = 'Deltaform Industries is unrelated to this question.';
spanInsideWord.answers[0].vendorSpans = [{ name: 'Delta', matchedText: 'Delta', offset: 0 }];
spanInsideWord.runs[0].rows[0].vendorsNamed = ['Delta'];
assert.throws(
  () => assertObservationRecordsValid(spanInsideWord.runs, spanInsideWord.answers),
  /boundary|inside|not named/i,
  'A span whose offset lands inside a longer word is a misattribution with a receipt attached. The ' +
  'offset check alone cannot see it.',
);

const fabricatedUrl = clone();
fabricatedUrl.runs[0].rows[0].urlsCited.push('https://g2.com/invented');
assert.throws(
  () => assertObservationRecordsValid(fabricatedUrl.runs, fabricatedUrl.answers),
  /cited|not in the stored answer/i,
  'A citation the stored answer did not carry must fail the build.',
);

const emptyAnswer = clone();
emptyAnswer.answers[0].rawAnswer = '   ';
assert.throws(
  () => assertObservationRecordsValid(emptyAnswer.runs, emptyAnswer.answers),
  /raw answer/i,
  'A stored answer with no text is not evidence.',
);

const driftedPrompt = clone();
driftedPrompt.answers[0].prompt = 'A different question entirely.';
assert.throws(
  () => assertObservationRecordsValid(driftedPrompt.runs, driftedPrompt.answers),
  /verbatim|prompt/i,
  'The row prompt and the stored answer prompt must be the same string. The reader is invited to paste it.',
);

const badDates = clone();
badDates.runs[0].firstRunAt = '2020-01-01';
assert.throws(
  () => assertObservationRecordsValid(badDates.runs, badDates.answers),
  /firstRunAt|derive/i,
  'firstRunAt and lastRunAt must equal the min and max of the rows. They are derived, not asserted.',
);

const noLimits = clone();
noLimits.runs[0].limits = '';
assert.throws(
  () => assertObservationRecordsValid(noLimits.runs, noLimits.answers),
  /limits/i,
  'CLAUDE.md §4 requires the limits to be stated. An empty limits line is a claims defect.',
);

const duplicatePath = clone();
duplicatePath.runs.push({ ...duplicatePath.runs[0] });
assert.throws(
  () => assertObservationRecordsValid(duplicatePath.runs, duplicatePath.answers),
  /duplicate|more than one/i,
  'Two runs for one entity means the page shows whichever was found first.',
);

/* ── 4b. entityPath is bound to a real entity, not to any string ──────────────
 *
 * Until this existed, `entityPath` was bound to nothing. A real observation
 * taken for one niche could be committed under another niche's path and would
 * render under that entity's label, through VerticalHubPage, with every gate
 * green. That is the "borrowed observation rendered as real" path, and it was
 * the only one: every other field is checked against the stored answer, and
 * this one was checked against nothing. */

const madeUpPath = clone();
madeUpPath.runs[0].entityPath = '/industries/totally/made-up';
assert.throws(
  () => assertObservationRecordsValid(madeUpPath.runs, madeUpPath.answers),
  /entityPath|no page|does not resolve/i,
  'A path that resolves to no entity at all renders nowhere and proves nothing. It must not validate.',
);

const legacyPath = clone();
legacyPath.runs[0].entityPath = '/industries/law-legal';
assert.throws(
  () => assertObservationRecordsValid(legacyPath.runs, legacyPath.answers),
  /legacy/i,
  'law-legal is a legacy page from data/industries.ts. It renders no observation block, so a run ' +
  'claiming it is a measurement attached to a page that will never show it.',
);

const spinePath = clone();
spinePath.runs[0].entityPath = '/industries/professional-services/legal';
assert.throws(
  () => assertObservationRecordsValid(spinePath.runs, spinePath.answers),
  /spine|routable|no page/i,
  'professional-services/legal is a real taxonomy row, but it is spine: no route, 404 on request. An ' +
  'observation there is a claim about a page that does not exist.',
);

const hubPath = clone();
hubPath.runs[0].entityPath = '/industries/manufacturing-industrial';
assert.doesNotThrow(
  () => assertObservationRecordsValid(hubPath.runs, hubPath.answers),
  'A routable hub is a valid home for a run, same as a routable sub-niche.',
);

/* The audit namespace. lib/audit/aiVisibility.ts stamps a per-prospect run with
   `audit:<hostname>`, because a one-off audit has no entity in the taxonomy. It
   is a separate namespace on purpose, and it is never committed. */
const auditPath = clone();
auditPath.runs[0].entityPath = 'audit:acme-cnc.example';
assert.doesNotThrow(
  () => assertObservationRecordsValid(auditPath.runs, auditPath.answers),
  'A per-prospect audit run carries no taxonomy path and must still validate.',
);

const emptyAuditPath = clone();
emptyAuditPath.runs[0].entityPath = 'audit:';
assert.throws(
  () => assertObservationRecordsValid(emptyAuditPath.runs, emptyAuditPath.answers),
  /audit:|hostname/i,
  'The audit namespace is not a wildcard. Without a host it identifies nothing.',
);

/* ── 5. Whatever is actually committed is valid, and is empty today ──────── */

assert.ok(Array.isArray(OBSERVATION_RUNS));
assert.ok(Array.isArray(STORED_ANSWERS));
assertObservationRecordsValid(OBSERVATION_RUNS, STORED_ANSWERS);

/* This loop used to read `store.lookup(run.entityPath).status === 'observed'`,
   which cannot fail: `lookup` IS find-by-entityPath over the same array, so the
   assertion restated its own input. What actually needs proving is that the path
   a run claims is a path a PAGE renders, resolved through the same registry the
   route uses, and that the audit namespace never reaches the committed set. */
for (const run of OBSERVATION_RUNS) {
  assert.ok(
    !run.entityPath.startsWith('audit:'),
    `Committed run "${run.entityPath}" is in the per-prospect audit namespace. Those are produced per ` +
    'request by lib/audit/aiVisibility.ts and rendered to one visitor. Committing one publishes a ' +
    'named third party\'s prospect audit on the site.',
  );

  const [, industries, industry, subIndustry, ...rest] = run.entityPath.split('/');
  assert.ok(
    industries === 'industries' && industry && rest.length === 0,
    `Committed run "${run.entityPath}" is not shaped like a B2B entity URL.`,
  );

  const record = subIndustry ? resolveSubIndustry(industry, subIndustry) : resolveIndustry(industry);
  assert.ok(
    record && record.source === 'b2b',
    `Committed run "${run.entityPath}" does not resolve to a B2B page through lib/b2b/registry.ts, ` +
    'which is the function the route itself calls. The observation would render nowhere, or worse, ' +
    'under a legacy page it was not taken for.',
  );

  const view = store.lookup(run.entityPath);
  assert.equal(view.status, 'observed', `Committed run for ${run.entityPath} is unreachable through the store.`);
}

console.log(
  `✓ b2b observations: ${OBSERVATION_RUNS.length} committed run(s), ` +
  `${STORED_ANSWERS.length} stored answer(s), every vendor and citation checked against its raw ` +
  `answer; unobserved is distinct from a zero result.`,
);
