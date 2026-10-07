#!/usr/bin/env node
/* Fixture tests for scripts/lib/served-screens.mjs, the served-HTML half of the
 * ADR-0006 product-screen gate. No server and no build: each case is a small
 * HTML document shaped like what React emits for <ProductScreen>.
 *
 * Why the served HTML and not the source: a badge can be imported and never
 * rendered (`{false && <ProvenanceBadge />}`), and a figure can be computed in
 * a component (`String(rows.filter(...).length)`). Both pass tsc and every
 * source grep. Only the rendered page shows them. */
import assert from 'node:assert/strict';
import { Worker } from 'node:worker_threads';
import * as served from './lib/served-screens.mjs';
const { checkProductScreens, productScreenStrings } = served;

const BADGE = '<p><span><svg aria-hidden="true"></svg></span><span><span>Illustrative</span> <!-- -->product interface. Sample data, not client results.</span></p>';
const ALLOWED = new Set([
  'Scriblr', 'AI visibility tracker', 'Prompt set', 'B2B SaaS', 'Tracked brand', 'Domain', 'Ondrell Software',
  'Corran & Whitlow', 'ondrell.example', 'Compare platforms for a first SOC 2 audit', 'Sources cited:', 'Own site',
  'Named', 'Not named', 'Prompt', 'Platforms', 'Status', 'Fixed', 'ChatGPT',
  'Which MSPs offer 24/7 SOC coverage?', 'Every answer is stored with its prompt, platform, date and cited sources.',
  'Illustrative', 'product interface. Sample data, not client results.',
]);

const tracker = ({ badge = BADGE, badgeWrap = (b) => b, dd = 'Ondrell Software', provenance = 'illustrative', extra = '' } = {}) =>
  `<figure class="m-0" data-provenance="${provenance}"><div><span>Scriblr</span><span>AI visibility tracker</span></div>` +
  `<div class="px-4 pt-3">${badgeWrap(badge)}</div>` +
  `<div role="tablist" aria-label="Sector"><button role="tab">B2B SaaS</button></div>` +
  `<div role="tabpanel"><dl><div><dt>Tracked brand</dt><dd>${dd}</dd></div></dl>${extra}` +
  `<table role="table" aria-label="B2B SaaS: Ondrell Software"><tbody><tr><th role="rowheader" scope="row">` +
  `<span>Compare platforms for a first SOC 2 audit</span><span><span>Sources cited:</span><span>Own site</span></span></th>` +
  `<td data-label="ChatGPT"><span><span aria-hidden="true"></span><span>Named</span></span></td></tr></tbody></table></div>` +
  `<figcaption>Every answer is stored with its prompt, platform, date and cited sources.</figcaption></figure>`;

const panel = () =>
  `<figure data-provenance="illustrative"><div><span>Scriblr</span><span>Prompt set</span></div><div>${BADGE}</div>` +
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

test('a tracker and a panel, each with its badge, are clean', () => {
  const r = run(page(tracker(), `<div class="mt-12 hidden lg:block">${panel()}</div>`));
  assert.deepEqual(r.errors, []);
  assert.equal(r.figures, 2);
  assert.equal(r.badges, 2);
});

test('the badge sentence inside a <script> (RSC payload) is not counted as a rendered badge', () => {
  const r = run(page(tracker({ badge: '' })));
  hasError(r, /^R3: 0 badge\(s\) rendered for 1 illustrative screen\(s\)\./);
  assert.equal(r.badges, 0);
});

test('a figure rendered without its badge fails ({false && <ProvenanceBadge />})', () => {
  hasError(run(page(tracker(), panel().replace(BADGE, ''))), /^R3: 1 badge\(s\) rendered for 2 illustrative screen\(s\)\./);
});

test('a badge under a hidden attribute fails', () => {
  hasError(run(page(tracker({ badgeWrap: (b) => `<div hidden="">${b}</div>` }))), /hidden/i);
});

test('a badge under aria-hidden fails', () => {
  hasError(run(page(tracker({ badgeWrap: (b) => `<div aria-hidden="true">${b}</div>` }))), /hidden/i);
});

test('a badge under sr-only or an inline display:none fails', () => {
  hasError(run(page(tracker({ badgeWrap: (b) => `<div class="sr-only">${b}</div>` }))), /hidden/i);
  hasError(run(page(tracker({ badgeWrap: (b) => `<div style="display:none">${b}</div>` }))), /hidden/i);
});

test('a badge hidden by a responsive class inside its figure fails', () => {
  hasError(run(page(tracker({ badgeWrap: (b) => `<div class="max-sm:hidden">${b}</div>` }))), /hidden/i);
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
    'Ondrell Software', 'pellman-it.example', 'Compare 3PLs offering EDI integration with our ERP', 'B2B SaaS',
    'Named', 'Not named', 'Own site', 'Sources cited:', 'Fixed', 'Sample run', 'Google AI Overviews', 'Scriblr',
    'AI visibility tracker', 'Illustrative', 'product interface. Sample data, not client results.',
  ]) assert.ok(strings.has(s), `allowlist is missing "${s}"`);
  assert.ok(![...strings].some((s) => /%/.test(s)), 'the allowlist itself contains a percentage');
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

test('1c: an arbitrary-variant class on any ancestor that can hide the badge fails, even above the figure', () => {
  hasError(run(page(`<div class="[&_p]:hidden">${tracker()}</div>`)), /^R3: .*\[&_p\]:hidden/);
  hasError(run(page(tracker({ badgeWrap: (b) => `<div class="max-sm:[&>p]:sr-only">${b}</div>` }))), /^R3: .*sr-only/);
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
  assert.ok(c.required.includes('pellman-it.example') && c.required.includes('Compare 3PLs offering EDI integration with our ERP'));
});

if (failures) {
  console.error(`\n✗ served screens: ${failures} case(s) failed.`);
  process.exit(1);
}
console.log('✓ served screens: badge per figure, nothing hidden, no figures, text traceable to data (ADR-0006 R3, R5, R6).');
