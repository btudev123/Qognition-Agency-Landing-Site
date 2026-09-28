/* The AI half of /api/audit.
 *
 * The crawl half (lib/auditEngine.ts, 28 checks) is free, instant and needs no
 * key. The AI half is one call to one provider and it costs money. This file
 * tests the part that matters most:
 *
 *   AN UNCONFIGURED PROVIDER RENDERS "NOT CHECKED", NEVER A GUESS.
 *
 * and its neighbours: a provider that errors, a provider that times out, and a
 * provider that answers, where every vendor reported must be provably present
 * in the stored answer.
 *
 * No network. The fetch is injected. ADR-0003 §3: test doubles live in test
 * files and are injected; they never ship in the provider module.
 */
require('./lib/load-typescript.cjs');
const assert = require('node:assert/strict');

const {
  observeAiVisibility,
  buildBuyerPrompt,
  isAiProviderConfigured,
} = require('../lib/audit/aiVisibility.ts');
const { assertObservationRecordsValid } = require('../lib/b2b/observationStore.ts');

async function main() {
  const TARGET = { hostname: 'acme-cnc.example', title: 'Acme CNC | Precision machining for aerospace' };
  const NOW = new Date('2026-09-28T10:00:00.000Z');

  const neverCalled = () => {
    throw new Error('fetch must not be called when the provider is not configured.');
  };

  /* ── 1. No key: not checked, and nothing is spent ────────────────────────── */

  assert.equal(isAiProviderConfigured({}), false);
  assert.equal(isAiProviderConfigured({ PERPLEXITY_API_KEY: '' }), false, 'An empty env var is unset. Project memory: Vercel registered vars with EMPTY values and broke every integration silently.');
  assert.equal(isAiProviderConfigured({ PERPLEXITY_API_KEY: '   ' }), false);
  assert.equal(isAiProviderConfigured({ PERPLEXITY_API_KEY: 'pplx-abc' }), true);

  const unconfigured = await observeAiVisibility({ target: TARGET, env: {}, now: NOW, fetchImpl: neverCalled });
  assert.equal(unconfigured.status, 'not_checked');
  assert.equal(unconfigured.reason, 'provider_not_configured');
  assert.match(
    unconfigured.message, /not checked/i,
    'The message is rendered to the prospect. It must say the AI half was not checked, in words.',
  );
  assert.equal(unconfigured.run, undefined, 'A not_checked section carries no run to read through.');

  /* ── 2. No category derivable: not checked, and nothing is spent ─────────── */

  const noCategory = await observeAiVisibility({
    target: { hostname: 'acme-cnc.example', title: '' },
    env: { PERPLEXITY_API_KEY: 'pplx-abc' },
    now: NOW,
    fetchImpl: neverCalled,
  });
  assert.equal(noCategory.status, 'not_checked');
  assert.equal(
    noCategory.reason, 'no_category_detected',
    'With nothing to build a buyer prompt from, asking anyway would be asking a made-up question.',
  );

  /* ── 3. Provider errors or times out: not checked, crawl unaffected ──────── */

  const errored = await observeAiVisibility({
    target: TARGET,
    env: { PERPLEXITY_API_KEY: 'pplx-abc' },
    now: NOW,
    fetchImpl: async () => { throw new Error('ECONNRESET'); },
  });
  assert.equal(errored.status, 'not_checked');
  assert.equal(errored.reason, 'provider_unavailable');

  const refused = await observeAiVisibility({
    target: TARGET,
    env: { PERPLEXITY_API_KEY: 'pplx-abc' },
    now: NOW,
    fetchImpl: async () => new Response('{"error":"over quota"}', { status: 429, headers: { 'content-type': 'application/json' } }),
  });
  assert.equal(refused.status, 'not_checked');
  assert.equal(
    refused.reason, 'provider_refused',
    'A 429 from the provider is the spend cap doing its job. It is a not-checked, not an error page.',
  );

  const garbled = await observeAiVisibility({
    target: TARGET,
    env: { PERPLEXITY_API_KEY: 'pplx-abc' },
    now: NOW,
    fetchImpl: async () => new Response('not json at all', { status: 200 }),
  });
  assert.equal(garbled.status, 'not_checked', 'An unparseable response is not an observation.');

  /* ── 4. Provider answers: observed, and every vendor is provable ─────────── */

  const body = {
    model: 'sonar-pro-2026-08',
    choices: [{ message: { content: 'For aerospace precision machining, buyers usually shortlist Bravo Machining and Delta Aero. Acme CNC is less commonly named.' } }],
    citations: ['https://www.bravomachining.example/capabilities', 'https://deltaaero.example/'],
  };

  const observed = await observeAiVisibility({
    target: TARGET,
    env: { PERPLEXITY_API_KEY: 'pplx-abc' },
    now: NOW,
    fetchImpl: async () => new Response(JSON.stringify(body), { status: 200, headers: { 'content-type': 'application/json' } }),
  });

  assert.equal(observed.status, 'observed');
  assert.equal(observed.run.rows.length, 1, 'One prompt, one platform, one row.');

  const row = observed.run.rows[0];
  assert.equal(row.engine, 'Perplexity');
  assert.equal(
    row.modelVersion, 'sonar-pro-2026-08',
    'The exact model id the provider reported. Never the one we asked for, never "latest".',
  );
  assert.equal(row.runAt, '2026-09-28');
  assert.ok(row.answerId, 'Every row points at its stored answer.');

  const answer = observed.answers.find((a) => a.answerId === row.answerId);
  assert.ok(answer, 'The stored answer must be returned alongside the run.');
  assert.equal(answer.rawAnswer, body.choices[0].message.content, 'The response is stored unmodified.');

  /* The load-bearing one: nothing is reported as named that is not in the text. */
  for (const vendor of row.vendorsNamed) {
    assert.ok(
      answer.rawAnswer.includes(vendor),
      `Reported vendor "${vendor}" is not present in the stored answer. That is a fabrication.`,
    );
  }
  assert.ok(row.vendorsNamed.includes('Acme CNC'), 'The target was named in this answer and must be reported.');
  assert.ok(row.vendorsNamed.includes('Bravo Machining'), 'A cited competitor named in the text must be reported.');

  /* And the inverse: a cited domain that the text never names is NOT a naming. */
  const quietBody = {
    model: 'sonar-pro-2026-08',
    choices: [{ message: { content: 'I do not have enough information to recommend specific suppliers.' } }],
    citations: ['https://www.bravomachining.example/capabilities'],
  };
  const quiet = await observeAiVisibility({
    target: TARGET,
    env: { PERPLEXITY_API_KEY: 'pplx-abc' },
    now: NOW,
    fetchImpl: async () => new Response(JSON.stringify(quietBody), { status: 200, headers: { 'content-type': 'application/json' } }),
  });
  assert.equal(quiet.status, 'observed', 'An answer that named nobody is still an observation.');
  assert.deepEqual(
    quiet.run.rows[0].vendorsNamed, [],
    'A citation is not a naming. Bravo was cited and not named, so it must not appear as named.',
  );
  assert.deepEqual(quiet.run.rows[0].urlsCited, ['https://www.bravomachining.example/capabilities']);

  /* ── 5. The output is a valid observation record ─────────────────────────── */

  assertObservationRecordsValid([observed.run], observed.answers);
  assertObservationRecordsValid([quiet.run], quiet.answers);

  assert.ok(
    observed.run.limits.trim().length > 0,
    'CLAUDE.md §4 requires the limits stated. One prompt on one platform on one day is a small sample and must say so.',
  );
  assert.match(observed.run.limits, /one prompt|1 prompt/i, 'The limits line must state the sample size honestly.');

  /* ── 6. The prompt is Family B and is stored verbatim ────────────────────── */

  const prompt = buildBuyerPrompt(TARGET);
  assert.ok(prompt, 'A title with a category yields a buyer prompt.');
  assert.equal(row.prompt, prompt, 'The row stores the exact prompt that was sent.');
  assert.equal(answer.prompt, prompt, 'So does the stored answer.');
  assert.ok(
    !prompt.toLowerCase().includes('acme-cnc.example'),
    'The prompt is the CLIENT BUYER\'s question about the category (Family B), not a question about our prospect by domain.',
  );
  assert.equal(buildBuyerPrompt({ hostname: 'x.example', title: '' }), null);
  assert.equal(buildBuyerPrompt({ hostname: 'x.example', title: 'Home' }), null, 'A title with no category is not a category.');

  console.log('✓ audit AI half: unconfigured, no-category, error, refusal and garbled all render not_checked; an answer yields a provable observation.');

}

main().catch((error) => { console.error(error); process.exit(1); });
