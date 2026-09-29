#!/usr/bin/env node
/* Invariants for the panel run harness. Implementation: lib/b2b/panelRun.ts.
 *
 * ────────────────────────────────────────────────────────────────────────────
 * WHAT THIS IS AND WHAT IT IS NOT.
 *
 * The harness takes an ICP entity path, builds its prompt panel
 * (lib/b2b/promptPanel.ts), asks each prompt on each engine, and returns records
 * in the committed format: `ObservationRun` plus the `StoredAnswer`s its rows
 * re-derive from.
 *
 * NO KEY IS CONFIGURED and the operator has parked that decision until last, so
 * the only way this code runs at all today is with an injected fake. That is the
 * design, not a limitation: lib/audit/aiVisibility.ts already proves the same
 * discipline is testable end to end without a provider, and every failure mode
 * there resolves to `not_checked` rather than a guess.
 *
 * The two properties these tests exist for:
 *
 *   1. UNCONFIGURED RECORDS NOTHING. Not an empty run, not a placeholder row,
 *      not a zero. `not_checked` with a reason, and the provider is never called.
 *   2. NOTHING REACHES A RECORD THAT IS NOT IN THE ANSWER. A vendor name is
 *      recorded only where it stands in the stored text at a word boundary. The
 *      harness under-reports on purpose; a missed mention is recoverable and an
 *      invented one is not.
 * ────────────────────────────────────────────────────────────────────────────
 */
require('./lib/load-typescript.cjs');
const assert = require('node:assert/strict');

const {
  isPanelProviderConfigured,
  runPanel,
  serializeRecordsForCommit,
} = require('../lib/b2b/panelRun.ts');
const { assertObservationRecordsValid } = require('../lib/b2b/observationStore.ts');
const { panelFor } = require('../lib/b2b/promptPanel.ts');

const NICHE = '/industries/commercial-and-facility-services/specialty-industrial-cleaning-and-restoration/cleanroom-cleaning-and-contamination-control';
const NOW = new Date('2026-09-29T09:15:00.000Z');
const KEYED = { PERPLEXITY_API_KEY: 'test-key-not-a-real-one' };

/* A fake provider. Names two firms, cites two domains, one of which is a
   generic word before it is anybody's brand. */
const ANSWER_TEXT =
  'For GMP cleanroom work the firms most often named are Acme Cleanrooms and Bravo Contamination ' +
  'Control. Deltaform Industries is unrelated. No specific precision specialist stands out.';
const CITED = ['https://acmecleanrooms.example/services', 'https://precision.example/'];

const fakeProvider = (calls) => async (request) => {
  calls.push(request);
  return {
    modelVersion: 'fake-model-1.0',
    rawAnswer: ANSWER_TEXT,
    urlsCited: CITED,
  };
};

async function main() {
/* ── 1. No key means no call and no record ──────────────────────────────── */

assert.equal(isPanelProviderConfigured({}), false);
assert.equal(isPanelProviderConfigured({ PERPLEXITY_API_KEY: '   ' }), false,
  'A key registered with an empty value is the failure project memory records in production. ' +
  'Whitespace is not a key.');
assert.equal(isPanelProviderConfigured(KEYED), true);

const unconfiguredCalls = [];
const unconfigured = await runPanel({
  entityPath: NICHE,
  env: {},
  now: NOW,
  engines: ['Perplexity'],
  provider: fakeProvider(unconfiguredCalls),
});
assert.equal(unconfigured.status, 'not_checked');
assert.equal(unconfigured.reason, 'provider_not_configured');
assert.ok(unconfigured.message.trim(), 'not_checked always carries a sentence a human can read.');
assert.equal(unconfigured.run, undefined, 'The not_checked variant carries no run to read through into.');
assert.equal(unconfigured.answers, undefined, 'And no answers.');
assert.equal(
  unconfiguredCalls.length, 0,
  'Unconfigured means the provider is never called. Removing the key is the kill switch, so it has ' +
  'to be checked before anything is sent, not after.',
);

/* ── 2. An entity the taxonomy does not hold has no panel and no run ────── */

const noPanel = await runPanel({
  entityPath: '/industries/invented/path',
  env: KEYED,
  now: NOW,
  engines: ['Perplexity'],
  provider: fakeProvider([]),
});
assert.equal(noPanel.status, 'not_checked');
assert.equal(noPanel.reason, 'no_panel_for_entity');

/* ── 3. A real run, in the committed format ─────────────────────────────── */

const calls = [];
const result = await runPanel({
  entityPath: NICHE,
  env: KEYED,
  now: NOW,
  engines: ['Perplexity', 'ChatGPT'],
  provider: fakeProvider(calls),
});
assert.equal(result.status, 'observed');

const panel = panelFor(NICHE);
assert.equal(
  calls.length, panel.prompts.length * 2,
  'Every prompt in the panel is asked on every engine requested. Nothing is sampled.',
);
assert.deepEqual(
  calls.slice(0, panel.prompts.length).map((c) => c.prompt), panel.prompts.map((p) => p.prompt),
  'In panel order, which is the locked file\'s document order. A run that reorders cannot be compared ' +
  'to the one before it.',
);

assert.equal(result.run.entityPath, NICHE);
assert.equal(result.run.rows.length, calls.length);
assert.equal(result.run.firstRunAt, '2026-09-29');
assert.equal(result.run.lastRunAt, '2026-09-29');
assert.ok(result.run.limits.includes('Perplexity') && result.run.limits.includes('ChatGPT'),
  'The limits line names the platforms, per CLAUDE.md §4.');
assert.ok(result.run.limits.includes('2026-09-29'), 'And the date.');
assert.ok(
  !/—|&mdash;|&#8212;/.test(result.run.limits),
  'The limits line is rendered copy. CLAUDE.md §10: no em dashes.',
);

for (const row of result.run.rows) {
  const answer = result.answers.find((a) => a.answerId === row.answerId);
  assert.ok(answer, 'Every row points at a stored answer that exists.');
  assert.equal(row.prompt, answer.prompt, 'Byte-identical. The reader is invited to paste the line.');
  assert.equal(answer.rawAnswer, ANSWER_TEXT, 'The provider response is stored unmodified.');
  assert.equal(answer.retrievedAt, NOW.toISOString());
  assert.equal(answer.runAt, '2026-09-29');
  assert.equal(answer.modelVersion, 'fake-model-1.0');
}

assert.equal(
  new Set(result.answers.map((a) => a.answerId)).size, result.answers.length,
  'Answer ids are unique, or the store would silently re-derive a row from the wrong answer.',
);

/* ── 4. Only firms the answer actually named ────────────────────────────── */

const named = result.run.rows[0].vendorsNamed;
assert.ok(
  named.includes('Acme Cleanrooms'),
  'A cited domain whose label appears in the text, spacing normalised, is a real naming.',
);
assert.ok(
  !named.some((v) => /^precision$/i.test(v)),
  '"precision" is a word before it is a brand. It is in the generic-label list and it appears in the ' +
  'answer as ordinary English. Recording it would be the audit module\'s old over-report, rebuilt.',
);
assert.ok(
  !named.includes('Deltaform Industries'),
  'Nothing cites Deltaform, so it is not a candidate. The harness under-reports rather than guessing ' +
  'at names it has no receipt for.',
);
for (const vendor of named) {
  assert.ok(ANSWER_TEXT.includes(vendor), `"${vendor}" must be literally present in the stored answer.`);
}

/* ── 5. The records the harness emits are records the gate accepts ───────── */

const routable = () => ({ level: 'niche', path: NICHE.split('/').slice(2), id: '18.02.01', state: 'draft' });
assert.doesNotThrow(
  () => assertObservationRecordsValid([result.run], result.answers, { resolveIcp: routable }),
  'The harness emits the committed format, so what it produces must pass the gate that guards what is ' +
  'committed. A harness whose output needs hand-editing to build is a harness nobody uses.',
);

/* ── 6. A provider that cannot answer records nothing for that prompt ────── */

const flaky = async (request) => {
  if (request.engine === 'ChatGPT') throw new Error('provider exploded');
  return { modelVersion: 'fake-model-1.0', rawAnswer: ANSWER_TEXT, urlsCited: CITED };
};
const partial = await runPanel({
  entityPath: NICHE, env: KEYED, now: NOW, engines: ['Perplexity', 'ChatGPT'], provider: flaky,
});
assert.equal(partial.status, 'observed');
assert.ok(partial.run.rows.every((row) => row.engine === 'Perplexity'), 'The failed engine contributes no rows.');
assert.equal(
  partial.skipped.length, panel.prompts.length,
  'Every prompt that produced nothing is reported as skipped, with a reason. A silent drop looks like ' +
  'an engine that named nobody, which is a finding and would be a false one.',
);
assert.ok(partial.skipped.every((s) => s.reason === 'provider_unavailable'));

const allFail = await runPanel({
  entityPath: NICHE, env: KEYED, now: NOW, engines: ['ChatGPT'], provider: flaky,
});
assert.equal(
  allFail.status, 'not_checked',
  'A run in which nothing was recorded is not an observation of nobody being named. Those are ' +
  'different claims and the store has no way to tell them apart once written.',
);
assert.equal(allFail.reason, 'nothing_recorded');

/* ── 7. A provider that will not name its model is not evidence ──────────── */

const vague = async () => ({ modelVersion: 'latest', rawAnswer: ANSWER_TEXT, urlsCited: CITED });
const vagueResult = await runPanel({
  entityPath: NICHE, env: KEYED, now: NOW, engines: ['Perplexity'], provider: vague,
});
assert.equal(vagueResult.status, 'not_checked');
assert.ok(
  vagueResult.reason === 'nothing_recorded',
  '"latest" is not a model version. assertObservationRecordsValid rejects it, so the harness must ' +
  'refuse to write it rather than emit records that cannot be committed.',
);

const empty = async () => ({ modelVersion: 'fake-model-1.0', rawAnswer: '   ', urlsCited: [] });
const emptyResult = await runPanel({
  entityPath: NICHE, env: KEYED, now: NOW, engines: ['Perplexity'], provider: empty,
});
assert.equal(emptyResult.status, 'not_checked', 'An answer with no text in it is not evidence.');

/* ── 8. Deterministic ids, so a re-run is comparable ─────────────────────── */

const again = await runPanel({
  entityPath: NICHE, env: KEYED, now: NOW, engines: ['Perplexity', 'ChatGPT'], provider: fakeProvider([]),
});
assert.deepEqual(
  again.answers.map((a) => a.answerId), result.answers.map((a) => a.answerId),
  'Same entity, same prompts, same answers, same instant: same ids. The id is derived from the ' +
  'evidence, so two identical runs do not produce two unrelated record sets.',
);

/* ── 9. What a human pastes into data/b2b/observations/index.ts ─────────── */

const serialized = serializeRecordsForCommit(result.run, result.answers);
assert.ok(serialized.includes(NICHE), 'The emitted text names the entity it was taken for.');
assert.ok(serialized.includes(ANSWER_TEXT.slice(0, 40)), 'And carries the raw answer, unmodified.');
assert.ok(
  !serialized.includes('icp-taxonomy') && serialized.length < 400_000,
  'It serializes the run and its answers and nothing else. The 2.2MB taxonomy never crosses a ' +
  'serialization boundary: ADR-0008 §5.2 item 3, and the same rule applies to a file on disk as to ' +
  'an RSC payload.',
);
assert.doesNotThrow(
  () => JSON.parse(serialized),
  'The emitted records are valid JSON, which is also a valid TypeScript literal, so the paste into ' +
  'the committed arrays needs no hand-editing and cannot be mistyped.',
);

console.log(
  `✓ panel run: ${result.run.rows.length} rows / ${result.answers.length} stored answers from a fake ` +
  'provider, committed format, gate-clean; unconfigured records nothing and never calls out.',
);
}

/* Same guard as scripts/test-audit-ai.cjs: an await that never settles would
   otherwise exit 0 with the assertions unrun, which is a gate that passes by
   not running. */
let completed = false;
process.on('exit', (code) => {
  if (code === 0 && !completed) {
    console.error(
      'test-panel-run: the suite exited without reaching its end. An await never settled. Exit code 0 ' +
      'here would mean the gate passed without running the assertions.',
    );
    process.exit(1);
  }
});

main()
  .then(() => { completed = true; })
  .catch((error) => { console.error(error); process.exit(1); });
