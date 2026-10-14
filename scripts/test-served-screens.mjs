#!/usr/bin/env node
/* Fixture tests for scripts/lib/served-screens.mjs, the served-HTML half of the
 * ADR-0006 product-screen gate. No server and no build: each case is a small
 * HTML document shaped like what React emits for <ProductScreen>.
 *
 * Why the served HTML and not the source: a badge can be imported and never
 * rendered (`{false && <ProvenanceBadge />}`), and a figure can be computed in
 * a component (`String(rows.filter(...).length)`). Both pass tsc and every
 * source grep. Only the rendered page shows them.
 *
 * Operator decision 2026-10-08 (CLAUDE.md authority block): the "Illustrative"
 * badge and its banner are removed from every product screen, overriding
 * ADR-0006 R3's visible-badge rule. The badge cases below are inverted, not
 * deleted: the fixtures render no badge and are clean, and every case that used
 * to prove a badge could not be dropped or hidden now proves a badge cannot come
 * back in any form. BADGE is kept only as the thing that must fail. */
import assert from 'node:assert/strict';
import { Worker } from 'node:worker_threads';
import * as served from './lib/served-screens.mjs';
const { checkProductScreens, productScreenStrings } = served;

/** The retired badge, as React rendered it. Every case that injects it must fail. */
const BADGE = '<p><span><svg aria-hidden="true"></svg></span><span><span>Illustrative</span> <!-- -->product interface. Sample data, not client results.</span></p>';
const ALLOWED = new Set([
  'Scriblr', 'AI visibility tracker', 'Prompt set', 'B2B SaaS', 'Tracked brand', 'Domain', 'Ondrell Software',
  'Corran & Whitlow', 'ondrell.example', 'Compare platforms for a first SOC 2 audit', 'Sources cited:', 'Own site',
  'Named', 'Not named', 'Prompt', 'Platforms', 'Status', 'Fixed', 'ChatGPT',
  'Which MSPs offer 24/7 SOC coverage?', 'Every answer is stored with its prompt, platform, date and cited sources.',
]);

const tracker = ({ badge = '', badgeWrap = (b) => b, dd = 'Ondrell Software', provenance = 'illustrative', extra = '' } = {}) =>
  `<figure class="m-0" data-provenance="${provenance}"><div><span>Scriblr</span><span>AI visibility tracker</span></div>` +
  `<div class="px-4 pt-3">${badgeWrap(badge)}</div>` +
  `<div role="tablist" aria-label="Sector"><button role="tab">B2B SaaS</button></div>` +
  `<div role="tabpanel"><dl><div><dt>Tracked brand</dt><dd>${dd}</dd></div></dl>${extra}` +
  `<table role="table" aria-label="B2B SaaS: Ondrell Software"><tbody><tr><th role="rowheader" scope="row">` +
  `<span>Compare platforms for a first SOC 2 audit</span><span><span>Sources cited:</span><span>Own site</span></span></th>` +
  `<td data-label="ChatGPT"><span><span aria-hidden="true"></span><span>Named</span></span></td></tr></tbody></table></div>` +
  `<figcaption>Every answer is stored with its prompt, platform, date and cited sources.</figcaption></figure>`;

const panel = ({ badge = '' } = {}) =>
  `<figure data-provenance="illustrative"><div><span>Scriblr</span><span>Prompt set</span></div>${badge}` +
  `<table><thead><tr><th scope="col">Prompt</th><th scope="col">Platforms</th><th scope="col">Status</th></tr></thead>` +
  `<tbody><tr><th scope="row">Which MSPs offer 24/7 SOC coverage?</th><td><span><span>ChatGPT</span></span></td><td>Fixed</td></tr></tbody></table></figure>`;

const page = (...body) =>
  `<!DOCTYPE html><html><head><meta charset="utf-8"><link rel="x" href="/a.css"></head><body>` +
  `<script>self.__next_f.push([1,"Illustrative product interface. Sample data, not client results. 41%"])</script>` +
  `<main><section data-theme="light">${body.join('')}</section></main><img src="/x.jpg" alt=""><br></body></html>`;

let failures = 0;
const test = (name, fn) => {
  try {
    fn();
    console.log(`PASS ${name}`);
  } catch (error) {
    failures += 1;
    console.error(`FAIL ${name}\n  ${error.message.split('\n').join('\n  ')}`);
  }
};
const run = (html) => checkProductScreens(html, { allowed: ALLOWED });
const hasError = (result, re) =>
  assert.ok(result.errors.some((e) => re.test(e)), `expected an error matching ${re}, got: ${JSON.stringify(result.errors)}`);

const NO_BADGE = /^R3: \d+ provenance badge\(s\) rendered\. The operator removed the badge/;

test('a tracker and a panel, with no badge, are clean (operator, 2026-10-08)', () => {
  const r = run(page(tracker(), `<div class="mt-12 hidden lg:block">${panel()}</div>`));
  assert.deepEqual(r.errors, []);
  assert.equal(r.figures, 2);
  assert.equal(r.badges, 0);
});

test('the badge sentence inside a <script> (RSC payload) is not counted as a rendered badge', () => {
  const r = run(page(tracker()));
  assert.deepEqual(r.errors, []);
  assert.equal(r.badges, 0);
});

test('a figure rendered with the retired badge fails', () => {
  const r = run(page(tracker(), panel({ badge: `<div>${BADGE}</div>` })));
  hasError(r, NO_BADGE);
  assert.equal(r.badges, 1);
  hasError(run(page(tracker({ badge: BADGE }))), NO_BADGE);
});

test('half of the badge sentence, or a reworded label, fails', () => {
  hasError(run(page(tracker({ badge: '<p>Sample data, not client results.</p>' }))), NO_BADGE);
  hasError(run(page(tracker({ badge: '<p>Illustrative product interface.</p>' }))), NO_BADGE);
  hasError(run(page(tracker({ badge: '<p><span>Illustrative</span> screen</p>' }))), /^R3: "Illustrative" is rendered in a product screen/);
});

test('an "illustrative" aria-label or title on a screen fails', () => {
  hasError(run(page(tracker({ extra: '<span aria-label="Illustrative interface"></span>' }))), /^R3: aria-label="Illustrative interface"/);
  hasError(run(page(tracker().replace('<figure class="m-0"', '<figure class="m-0" title="illustrative"'))), /^R3: title="illustrative"/);
});

test('a badge rendered outside any figure fails', () => {
  hasError(run(page(BADGE, tracker())), NO_BADGE);
});

test('a badge under a hidden attribute still fails: no badge, hidden or not', () => {
  hasError(run(page(tracker({ badge: BADGE, badgeWrap: (b) => `<div hidden="">${b}</div>` }))), NO_BADGE);
});

test('a badge under aria-hidden still fails', () => {
  hasError(run(page(tracker({ badge: BADGE, badgeWrap: (b) => `<div aria-hidden="true">${b}</div>` }))), NO_BADGE);
});

test('a badge under sr-only or an inline display:none still fails', () => {
  hasError(run(page(tracker({ badge: BADGE, badgeWrap: (b) => `<div class="sr-only">${b}</div>` }))), NO_BADGE);
  hasError(run(page(tracker({ badge: BADGE, badgeWrap: (b) => `<div style="display:none">${b}</div>` }))), NO_BADGE);
});

test('a badge hidden by a responsive class inside its figure still fails', () => {
  hasError(run(page(tracker({ badge: BADGE, badgeWrap: (b) => `<div class="max-sm:hidden">${b}</div>` }))), NO_BADGE);
});

test('a whole figure hidden by a responsive class outside it is allowed (the panel is >=1024 only)', () => {
  assert.deepEqual(run(page(`<div class="hidden lg:block">${panel()}</div>`)).errors, []);
});

test('a figure whose provenance is not illustrative fails', () => {
  hasError(run(page(tracker({ provenance: 'captured' }))), /provenance/i);
});

test('a percentage in screen text fails (R6)', () => {
  hasError(run(page(tracker({ dd: '41%' }))), /R6/);
});

test('a bare count in screen text fails (R6)', () => {
  hasError(run(page(tracker({ dd: '2' }))), /R6/);
});

test('"3x" and "1st" fail, "B2B" does not (R6)', () => {
  hasError(run(page(tracker({ dd: '3x' }))), /R6/);
  hasError(run(page(tracker({ dd: '1st' }))), /R6/);
});

test('digits inside a prompt cell are allowed (tracker and panel layouts)', () => {
  assert.deepEqual(run(page(tracker(), panel())).errors, []);
});

test('text that is not from the screen data or the allowlist fails (R5)', () => {
  hasError(run(page(tracker({ dd: 'Best MSPs for hospitals' }))), /R5/);
});

test('entities are decoded before matching', () => {
  assert.deepEqual(run(page(tracker({ dd: 'Corran &amp; Whitlow' }))).errors, []);
});

test('screen chrome outside any figure fails (a screen rendered without ProductScreen)', () => {
  hasError(run(page(tracker(), '<dl><dt>Tracked brand</dt><dd>Ondrell Software</dd></dl>')), /outside/i);
});

test('the real allowlist holds the registry, the labels, the engines and the chrome', () => {
  const strings = productScreenStrings();
  for (const s of [
    'Your firm', 'best AP automation software that integrates with a mid-market ERP', 'SaaS & Software',
    'Finance, Spend & Procurement SaaS', 'Claude', 'Pause', 'Play', 'Previous', 'Next', 'Show', 'Tracking', '▸',
    'Named', 'Not named', 'Own site', 'Sources cited:', 'Fixed', 'Sample run', 'Google AI Overviews', 'Scriblr',
    'What we check',
  ]) assert.ok(strings.has(s), `allowlist is missing "${s}"`);
  /* The run's title changed on 2026-10-08 (copy §6). The old one leaves the list, so a
     screen still rendering it fails R5 rather than passing on a stale entry. */
  assert.ok(!strings.has('Prompt run'), 'the allowlist still holds the retired run title "Prompt run"');
  /* Operator, 2026-10-08: the badge strings left the chrome list with the badge. */
  for (const retired of ['Illustrative', 'product interface. Sample data, not client results.']) {
    assert.ok(!strings.has(retired), `the allowlist still holds the retired badge text "${retired}"`);
  }
  assert.ok(![...strings].some((s) => /%/.test(s)), 'the allowlist itself contains a percentage');
  for (const banned of ['Live', 'Scanning', 'Checking', 'Loading', 'Real-time', 'AI visibility tracker']) {
    assert.ok(![...strings].some((s) => new RegExp(`\\b${banned}\\b`).test(s)), `the allowlist contains "${banned}" (ADR-0006 §11.4.2)`);
  }
});

/* Anton's review, 2026-10-07. */

test('1a: truncated HTML returns instead of looping (close tag and raw element)', () => {
  /* In a worker with a shared flag, so a regression times out here instead of hanging the gate. */
  const flag = new Int32Array(new SharedArrayBuffer(4));
  const src = `
    import { workerData } from 'node:worker_threads';
    import { parseHtml } from ${JSON.stringify(new URL('./lib/served-screens.mjs', import.meta.url).href)};
    parseHtml('<div>x</div'); parseHtml('<p><script>x</script'); parseHtml('<div>x</');
    Atomics.store(workerData, 0, 1); Atomics.notify(workerData, 0);`;
  const worker = new Worker(new URL(`data:text/javascript,${encodeURIComponent(src)}`), { workerData: flag });
  const deadline = Date.now() + 5000;
  while (Atomics.load(flag, 0) === 0 && Date.now() < deadline) Atomics.wait(flag, 0, 0, 50);
  worker.terminate();
  assert.equal(Atomics.load(flag, 0), 1, 'parseHtml did not return within 5s on truncated HTML (infinite loop)');
});

test('1b: a CSS content value inside a screen is checked (attr() value and literal content)', () => {
  const cell = (cls, attrs) => tracker({ extra: `<span class="${cls}" ${attrs}>Named</span>` });
  assert.deepEqual(run(page(cell('max-sm:before:content-[attr(data-label)]', 'data-label="ChatGPT"'))).errors, []);
  assert.deepEqual(run(page(cell("before:content-['']", ''))).errors, []);
  hasError(run(page(cell('max-sm:before:content-[attr(data-label)]', 'data-label="41%"'))), /^R6: .*41%/);
  hasError(run(page(cell('max-sm:before:content-[attr(data-label)]', 'data-label="Share of voice"'))), /^R5: .*Share of voice/);
  hasError(run(page(cell("before:content-['Top_pick']", ''))), /content-\['Top_pick'\]/);
});

test('1c: a badge an arbitrary-variant class would hide still fails, even with the class above the figure', () => {
  hasError(run(page(`<div class="[&_p]:hidden">${tracker({ badge: BADGE })}</div>`)), NO_BADGE);
  hasError(run(page(tracker({ badge: BADGE, badgeWrap: (b) => `<div class="max-sm:[&>p]:sr-only">${b}</div>` }))), NO_BADGE);
  assert.deepEqual(run(page(`<div class="hidden lg:block">${panel()}</div>`)).errors, []);
});

test('vacuous pass: a missing screen fails (tracker missing, panel present)', () => {
  const r = checkProductScreens(page(panel()), { allowed: ALLOWED, expected: 2 });
  hasError(r, /^R3: 1 product screen\(s\) rendered, the registry holds 2\./);
});

test('every registry brand, domain and prompt must be rendered inside a screen', () => {
  const r = checkProductScreens(page(tracker()), { allowed: ALLOWED, required: ['Ondrell Software', 'Pellman IT Group'] });
  hasError(r, /^R5: "Pellman IT Group" is in the registry but rendered in no product screen\./);
  assert.equal(typeof served.productScreenContract, 'function', 'productScreenContract is not exported');
  const c = served.productScreenContract();
  assert.equal(c.expected, 2);
  assert.ok(c.required.includes('Your firm') && c.required.includes('best AP automation software that integrates with a mid-market ERP'));
  assert.ok(!c.required.includes('pellman-it.example'), 'the retired tracker brands left `required` (§11.6)');
  assert.deepEqual(c.run, { rows: 21, platforms: 5 });
});

/* ADR-0006 §12.3 R7, the section scan (operator, 2026-10-08). The copy in the
   <section> around a screen carries the disclosure now the badge is gone. */
const R7 = /^R7: /;
test('R7: neutral copy beside a screen is clean, and a question about the reader is allowed', () => {
  assert.deepEqual(run(page('<h2>Buyers ask AI who to hire.</h2><p>Does ChatGPT name your firm?</p>', tracker())).errors, []);
  assert.deepEqual(run(page('<p>You rank in Maps, but ChatGPT names your competitor.</p>', tracker())).errors, []);
});
test('R7: a banned word in the section around a screen fails, in any case', () => {
  for (const copy of ['Live tracking of every prompt.', 'Scanning your market now.', 'A screenshot from Scriblr.',
    'See your results below.', 'Your report is ready.', 'Your score this week.', 'Real-time answers.', 'Updated in real time.', 'Loading answers.', 'checking each platform.']) {
    hasError(run(page(`<p>${copy}</p>`, tracker())), R7);
  }
});
test('R7: a sentence saying the reader is or is not named fails', () => {
  for (const copy of ['Your firm is not named.', 'ChatGPT names you on two platforms.', "You're never named.", 'Your firm: Not named']) {
    hasError(run(page(`<p>${copy}</p>`, tracker())), /reader's firm is named/);
  }
});
test('R7: a banned alt or aria-label beside a screen fails', () => {
  hasError(run(page('<img src="/x.png" alt="Scriblr screenshot">', tracker())), /^R7: alt=/);
});
test('R7: copy in a section with no screen, or removed from rendering, is not scanned', () => {
  const html = page(tracker(), '<p hidden="">Live</p>').replace('</main>', '<section><p>Go live with your report.</p></section></main>');
  assert.deepEqual(run(html).errors, []);
});

/* ADR-0006 §11: the tracker run, served half. A two-row fixture shaped like TrackerRunView + TrackerRunPlayer. */
const RUN_ALLOWED = new Set([...ALLOWED, 'What we check', 'Tracking', 'Your firm', 'Sample run', 'Pause', 'Play', 'Show',
  'Industry one', 'Industry two', 'Sub one', 'Sub two', '▸', ':', '.', 'Prompt',
  'which labs run ISO 17025 calibration', 'best broker for a 200-truck fleet']);
const runRow = (i, { hidden = i > 0, phase = '', cell = 'Named', live = '', prompt } = {}) =>
  `<div data-run-row=""${hidden ? ' hidden=""' : ''}${phase ? ` data-run-phase="${phase}"` : ''}>` +
  `<p><span id="r-${i}">Industry ${i ? 'two' : 'one'}</span> <span aria-hidden="true">▸</span> <span>Sub ${i ? 'two' : 'one'}</span></p>` +
  `<table role="table"><thead role="rowgroup"><tr role="row"><th scope="col" class="sr-only">Prompt</th><th scope="col">ChatGPT</th></tr></thead>` +
  `<tbody role="rowgroup"><tr role="row"><th role="rowheader" scope="row"><span data-run-prompt="">${prompt ?? (i ? 'best broker for a 200-truck fleet' : 'which labs run ISO 17025 calibration')}</span></th>` +
  `<td role="cell" data-run-cell=""><span aria-hidden="true"></span>${cell}</td></tr></tbody></table>` +
  `<p data-run-sources=""><span>Sources cited:</span><span>Own site</span></p>` +
  `<p data-run-summary="" hidden=""><span>Industry ${i ? 'two' : 'one'}</span>. <span>ChatGPT</span>: <span>Named</span>. </p></div>`;
const runFigure = ({ rows = [runRow(0), runRow(1)], nav = '01 / 02', pauseAfter = false, live = '', badgeInRegion = false } = {}) => {
  const pause = '<button type="button"><svg aria-hidden="true"></svg>Pause</button>';
  const region = `<div data-run-region="">${badgeInRegion ? BADGE : ''}${rows.join('')}<span aria-hidden="true" hidden=""></span></div>`;
  return `<figure data-provenance="illustrative"><div><span>Scriblr</span><span>What we check</span></div>` +
    `<p><span>Tracking</span> <span>Your firm</span><span>Sample run</span></p>` +
    `<div>${pauseAfter ? '' : pause}<span data-screen-nav="">${nav}</span></div>${region}${pauseAfter ? pause : ''}` +
    `<div role="group" aria-label="Industries"><button aria-labelledby="show r-0" aria-current="true"></button><button aria-labelledby="show r-1"></button></div>` +
    `<span id="show" hidden="">Show</span><p aria-live="polite" aria-atomic="true" class="sr-only">${live}</p>` +
    `<figcaption>Every answer is stored with its prompt, platform, date and cited sources.</figcaption></figure>`;
};
const runCheck = (fig) => checkProductScreens(page(fig), { allowed: RUN_ALLOWED, run: { rows: 2, platforms: 1 } });

test('run: a resolved two-row run is clean, digits in its prompts and the position counter allowed', () => {
  assert.deepEqual(runCheck(runFigure()).errors, []);
});
test('run: the live region with text in the served HTML fails', () => {
  hasError(runCheck(runFigure({ live: 'Industry one. ChatGPT: Named.' })), /live region has text/);
});
test('run: a Pause button after the run region fails', () => {
  hasError(runCheck(runFigure({ pauseAfter: true })), /Pause button comes after/);
});
test('run: two visible rows, or a later row visible, fails', () => {
  hasError(runCheck(runFigure({ rows: [runRow(0), runRow(1, { hidden: false })] })), /2 run rows are visible/);
  hasError(runCheck(runFigure({ rows: [runRow(0, { hidden: true }), runRow(1, { hidden: false })] })), /not the first/);
});
test('run: a cell with interim text fails (no "Checking", no empty cell)', () => {
  hasError(runCheck(runFigure({ rows: [runRow(0, { cell: 'Checking' }), runRow(1)] })), /state cell reading "Checking"/);
  hasError(runCheck(runFigure({ rows: [runRow(0, { cell: '' }), runRow(1)] })), /state cell reading ""/);
});
test('run: a row served mid-animation fails', () => {
  hasError(runCheck(runFigure({ rows: [runRow(0, { phase: 'type' }), runRow(1)] })), /mid-animation/);
});
test('run: the wrong number of rows fails', () => {
  hasError(runCheck(runFigure({ rows: [runRow(0)] })), /1 \[data-run-row\] rendered, the run holds 2/);
});
test('run: a badge inside the run region fails', () => {
  hasError(runCheck(runFigure({ badgeInRegion: true })), NO_BADGE);
});
test('run: a counter that is not a run position fails, and a figure in disguise does not pass as one', () => {
  hasError(runCheck(runFigure({ nav: '41%' })), /not a run position/);
  hasError(runCheck(runFigure({ nav: '03 / 02' })), /not a run position/);
  hasError(runCheck(runFigure({ nav: '01 / 21' })), /not a run position/);
});
test('run: a missing run fails when the contract expects one', () => {
  hasError(checkProductScreens(page(panel()), { allowed: RUN_ALLOWED, run: { rows: 2, platforms: 1 } }), /0 figure\(s\) hold a \[data-run-region\]/);
});

if (failures) {
  console.error(`\n✗ served screens: ${failures} case(s) failed.`);
  process.exit(1);
}
console.log('✓ served screens: no provenance badge (operator, 2026-10-08), no figures, text traceable to data (ADR-0006 R3, R5, R6).');
