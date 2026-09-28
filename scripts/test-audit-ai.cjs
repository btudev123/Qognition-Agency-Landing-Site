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
  AI_TIMEOUT_MS,
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

  /* ── 3b. The ceiling covers the BODY, not just the headers ───────────────────
   *
   * The failure this replaces: `clearTimeout` sat in the `finally` of the fetch
   * block, which runs the moment headers arrive. `response.json()` then ran with
   * the AbortController already disarmed and no ceiling of its own. A provider
   * that answers its headers and then hangs on the body ran until Vercel killed
   * the function at `maxDuration = 60`, and the visitor got a 504 instead of
   * their 28 crawl checks — the exact outcome AI_TIMEOUT_MS exists to prevent.
   *
   * The watchdog is the assertion. Without a body-side ceiling this resolves to
   * STILL_HANGING, which is the shape of the production failure, not a timeout
   * in the test harness. */
  const hangingBody = observeAiVisibility({
    target: TARGET,
    env: { PERPLEXITY_API_KEY: 'pplx-abc' },
    now: NOW,
    timeoutMs: 300,
    fetchImpl: async () => ({ ok: true, status: 200, json: () => new Promise(() => {}) }),
  });
  let watchdogTimer;
  const watchdog = new Promise((resolve) => {
    /* Deliberately NOT unref'd. An unref'd watchdog lets the process exit while
       this await is still pending, which is how the defect hid: with the timer
       disarmed nothing held the event loop, node exited 0, and the gate passed
       having run none of the assertions below. */
    watchdogTimer = setTimeout(() => resolve('STILL_HANGING'), 3_000);
  });
  const bodyOutcome = await Promise.race([hangingBody, watchdog]);
  clearTimeout(watchdogTimer);
  assert.notEqual(
    bodyOutcome, 'STILL_HANGING',
    'A provider that sends headers and then hangs on the body must hit the same ceiling as one that ' +
    'never answers. Otherwise the request runs to maxDuration and the crawl half dies with it.',
  );
  assert.equal(bodyOutcome.status, 'not_checked');
  assert.equal(
    bodyOutcome.reason, 'provider_unavailable',
    'A body that never arrives is the provider being unreachable, not a refusal.',
  );

  assert.ok(
    AI_TIMEOUT_MS < 60_000,
    `AI_TIMEOUT_MS is ${AI_TIMEOUT_MS}ms and app/api/audit/route.ts sets maxDuration = 60. A ceiling ` +
    'at or above the route budget is not a ceiling.',
  );

  /* ── 3c. A 200 with nothing usable in it is not an observation ───────────────
   *
   * aiVisibility.ts refuses to build a record without answer text AND an exact
   * model id, because `modelVersion` is what makes the observation reproducible
   * and ADR-0003 §3 forbids substituting the model we asked for. Untested until
   * now, which meant the one line standing between us and an unreproducible
   * record had nothing holding it in place. */
  const noContent = await observeAiVisibility({
    target: TARGET,
    env: { PERPLEXITY_API_KEY: 'pplx-abc' },
    now: NOW,
    fetchImpl: async () => new Response(
      JSON.stringify({ model: 'sonar-pro-2026-08', choices: [{ message: { content: '   ' } }] }),
      { status: 200, headers: { 'content-type': 'application/json' } },
    ),
  });
  assert.equal(noContent.status, 'not_checked', 'An empty answer is not an answer.');
  assert.equal(noContent.reason, 'provider_unavailable');

  const noModel = await observeAiVisibility({
    target: TARGET,
    env: { PERPLEXITY_API_KEY: 'pplx-abc' },
    now: NOW,
    fetchImpl: async () => new Response(
      JSON.stringify({ choices: [{ message: { content: 'Buyers usually shortlist Bravo Machining.' } }] }),
      { status: 200, headers: { 'content-type': 'application/json' } },
    ),
  });
  assert.equal(
    noModel.status, 'not_checked',
    'An answer with no model id on it cannot become a record. We never substitute the model we asked ' +
    'for, so there is nothing to make the row reproducible with.',
  );
  assert.equal(noModel.reason, 'provider_unavailable');

  const modelLatest = await observeAiVisibility({
    target: TARGET,
    env: { PERPLEXITY_API_KEY: 'pplx-abc' },
    now: NOW,
    fetchImpl: async () => new Response(
      JSON.stringify({ model: '   ', choices: [{ message: { content: 'Buyers shortlist Bravo Machining.' } }] }),
      { status: 200, headers: { 'content-type': 'application/json' } },
    ),
  });
  assert.equal(modelLatest.status, 'not_checked', 'A blank model id is no model id.');

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

  /* ── 4b. A common noun standing alone is not the prospect being named ────────
   *
   * `brandFromHostname` takes the first domain label. For precision.com that is
   * "precision", which appears in almost any machining answer as an ordinary
   * English word, passes the boundary check, and used to land in `vendorsNamed`.
   * The page would then claim an assistant named the prospect when the answer
   * named nobody — an unmeasured claim presented as a measurement, on the single
   * claim the product rests on. CLAUDE.md §4. */
  const genericLabel = async (target, content) => {
    const section = await observeAiVisibility({
      target,
      env: { PERPLEXITY_API_KEY: 'pplx-abc' },
      now: NOW,
      fetchImpl: async () => new Response(
        JSON.stringify({ model: 'sonar-pro-2026-08', choices: [{ message: { content } }] }),
        { status: 200, headers: { 'content-type': 'application/json' } },
      ),
    });
    assert.equal(section.status, 'observed');
    return section.run.rows[0].vendorsNamed;
  };

  assert.deepEqual(
    await genericLabel(
      { hostname: 'precision.com', title: 'Precision | Contract machining and finishing for OEMs' },
      'Buyers usually compare suppliers in precision machining and ISO 9001 certified finishing. ' +
      'I do not have enough information to name specific firms.',
    ),
    [],
    'The answer named nobody. "precision" is the trade, not the firm, and reporting it as a naming ' +
    'is the fabrication this module exists to make impossible.',
  );

  assert.deepEqual(
    await genericLabel(
      { hostname: 'group.io', title: 'Group | Industrial supply and distribution services' },
      'No specific group stands out. Consider searching industry directories instead.',
    ),
    [],
    'An answer that explicitly declines to name anyone must not produce a named vendor.',
  );

  /* The positive control, so the fix is a rejection of generic usage and not a
     rejection of short names. A single-word brand the answer treats as a proper
     noun is still reported. */
  assert.deepEqual(
    await genericLabel(
      { hostname: 'bravo.example', title: 'Bravo | Five-axis machining for defence primes' },
      'For five-axis work, Bravo is the name that comes up most often among defence suppliers.',
    ),
    ['Bravo'],
    'A capitalised single-word firm name is a naming and must still be reported. Under-reporting is ' +
    'the safe direction, not a licence to report nothing.',
  );

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

  console.log(
    '✓ audit AI half: unconfigured, no-category, error, refusal, garbled, a hanging response body, ' +
    'an empty answer and a missing model id all render not_checked; an answer yields a provable ' +
    'observation.',
  );
}

/* A suite that never finishes must never pass.
 *
 * Node exits 0 when the event loop empties, even with an await still pending, so
 * an assertion that hangs is indistinguishable from a green run at the exit
 * code. That is not hypothetical: the disarmed-timer defect above produced
 * exactly this — exit 0, no output, gate green, zero assertions run. */
let completed = false;
process.on('exit', (code) => {
  if (code === 0 && !completed) {
    console.error(
      'test-audit-ai: the suite exited without reaching its end. An await never settled. Exit code 0 ' +
      'here would mean the gate passed without running the assertions.',
    );
    process.exit(1);
  }
});

main()
  .then(() => { completed = true; })
  .catch((error) => { console.error(error); process.exit(1); });
