#!/usr/bin/env node
/* Run one entity's prompt panel. The operator-facing half of lib/b2b/panelRun.ts.
 *
 * ────────────────────────────────────────────────────────────────────────────
 *   node scripts/run-panel.cjs <entity-path> [--engines=a,b] [--emit]
 *
 *   node scripts/run-panel.cjs /industries/commercial-and-facility-services/\
 *     specialty-industrial-cleaning-and-restoration
 *
 * WITHOUT --emit it asks nothing and prints the panel: the exact prompts that
 * would be sent, which are supplied and which are derived, and whether there are
 * enough of them to publish. That is useful today and costs nothing, and it is
 * the thing to read before spending money on a run.
 *
 * WITH --emit it runs the panel and prints records for
 * data/b2b/observations/index.ts. No provider is configured on any deployment
 * and the operator has parked that decision until last, so today --emit prints
 * `not_checked: provider_not_configured` and sends nothing. That is the correct
 * output, not a failure.
 *
 * IT NEVER WRITES TO data/. `OBSERVATION_RUNS` and `STORED_ANSWERS` are empty and
 * stay empty until a human reads a real run, pastes it in, and names themselves
 * in the commit. Redirect stdout to a file if you want one; the point is that a
 * person is on the diff, which is the whole reason the second array exists.
 * ────────────────────────────────────────────────────────────────────────────
 */
require('./lib/load-typescript.cjs');

const { panelFor, MIN_DISTINCT_PROMPTS } = require('../lib/b2b/promptPanel.ts');
const { isPanelProviderConfigured, runPanel, serializeRecordsForCommit } = require('../lib/b2b/panelRun.ts');
const { ENGINES } = require('../lib/b2b/observations.ts');
const { resolveIcp } = require('../lib/b2b/icpRegistry.ts');
const { assertObservationRecordsValid } = require('../lib/b2b/observationStore.ts');

const args = process.argv.slice(2);
const entityPath = args.find((a) => !a.startsWith('--'));
const emit = args.includes('--emit');
const enginesArg = args.find((a) => a.startsWith('--engines='));
const engines = enginesArg ? enginesArg.slice('--engines='.length).split(',').map((e) => e.trim()) : ENGINES;

if (!entityPath) {
  console.error('usage: node scripts/run-panel.cjs <entity-path> [--engines=a,b] [--emit]');
  process.exit(2);
}

const unknownEngine = engines.find((engine) => !ENGINES.includes(engine));
if (unknownEngine) {
  console.error(
    `"${unknownEngine}" is not a surface we sample. The list in lib/b2b/observations.ts is a claim ` +
    `that we actually run the prompt set there: ${ENGINES.join(', ')}.`
  );
  process.exit(2);
}

const panel = panelFor(entityPath);
if (!panel) {
  console.error(
    `"${entityPath}" names no entity in data/b2b/icp/icp-taxonomy.json. Rule 6: slugs come from that ` +
    'file and are never invented or renamed.'
  );
  process.exit(2);
}

const supplied = panel.prompts.filter((p) => p.origin === 'supplied');
console.log(`${entityPath}`);
console.log(
  `level ${panel.level} · ${panel.prompts.length} prompts (${supplied.length} supplied, ` +
  `${panel.prompts.length - supplied.length} derived) · ` +
  (panel.meetsMinimum
    ? `clears the ${MIN_DISTINCT_PROMPTS}-prompt minimum`
    : `BELOW the ${MIN_DISTINCT_PROMPTS}-prompt minimum, so this entity cannot carry a published ` +
      'observation panel on derived prompts alone')
);
console.log('');
for (const entry of panel.prompts) {
  const tag = entry.origin === 'supplied' ? `supplied ${entry.suppliedFromId}` : `derived from ${entry.qualifierId}`;
  console.log(`  [B/${entry.shape}] ${entry.prompt}`);
  console.log(`      ${tag}`);
}
console.log('');
console.log(
  'Family B throughout. These are what we RUN and RECORD. None of them may become a title, an H1, a ' +
  'meta description, an FAQ question or a target query.'
);

if (!emit) {
  console.log('');
  console.log(
    isPanelProviderConfigured(process.env)
      ? 'A provider key is configured. Re-run with --emit to ask these and print records.'
      : 'No provider key is configured, so --emit would ask nothing. Nothing was sent.'
  );
  process.exit(0);
}

/* The real provider does not exist yet: the operator has not chosen one. There
   is deliberately no fake here. A CLI flag that manufactures plausible answers
   is a fabricated observation one paste away from the committed records, and
   ADR-0003 §3 keeps test doubles in test files where they are injected. The fake
   lives in scripts/test-panel-run.cjs. */
const providerNotBuilt = async () => undefined;

runPanel({
  entityPath,
  env: process.env,
  now: new Date(),
  engines,
  provider: providerNotBuilt,
})
  .then((result) => {
    if (result.status === 'not_checked') {
      console.log('');
      console.log(`not_checked: ${result.reason}`);
      console.log(result.message);
      return;
    }

    /* Before printing anything a human might paste, put it through the gate that
       guards what is committed, with the same resolver the routes use. An entity
       that is not promoted yet fails here, and that failure is information: the
       run is real, the page is not. */
    try {
      assertObservationRecordsValid([result.run], result.answers, { resolveIcp });
      console.log('');
      console.log('/* Gate-clean. Paste into data/b2b/observations/index.ts and name yourself in the commit. */');
    } catch (error) {
      console.log('');
      console.log('/* NOT COMMITTABLE YET. The run is real; the gate refuses it for this reason:');
      console.log(` * ${error.message}`);
      console.log(' */');
    }
    console.log(serializeRecordsForCommit(result.run, result.answers));
  })
  .catch((error) => {
    console.error(error.message);
    process.exit(1);
  });
