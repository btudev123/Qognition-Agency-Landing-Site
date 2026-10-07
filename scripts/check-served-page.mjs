#!/usr/bin/env node
/* Post-build assertions against the HTML `/` actually serves.
 *
 * Everything in here needs a running server, so they share one `next start`
 * rather than paying the startup cost twice.
 *
 *   1. Client JS budget. ADR-0005 §5.
 *   2. No content hidden behind an animation that may never run.
 *   3. ADR-0006 product screens: one visible badge per screen, no figures,
 *      every string traceable to the screen data (scripts/lib/served-screens.mjs).
 *
 * ── 1. CLIENT JS BUDGET ────────────────────────────────────────────────────
 *
 * Budget: 40KB gzip of ROUTE-SPECIFIC client JS on `/`, defined as
 *
 *     gzip(scripts the server sends for `/`)  minus  gzip(scripts every route sends)
 *
 * The shared baseline is measured from a control route rather than assumed, so
 * the number moves only when `/` itself gets heavier. `/legal/terms` is the
 * control: it is the thinnest server-rendered page on the site and carries the
 * same root layout (nav, footer, consent, analytics) as `/`.
 *
 * This runs AFTER `next build`, against a real `next start` server, because the
 * question "what does the browser download on /" is only answerable from the
 * HTML the server actually emits. Turbopack's build manifest does not expose a
 * per-app-route chunk list.
 *
 * CLAUDE.md §6: build verification happens on Vercel. This gate must therefore
 * be able to fail there, which is why it is a `pnpm` script and not a local
 * convenience.
 *
 * ── 2. NO CONTENT HIDDEN BEHIND AN ANIMATION ───────────────────────────────
 *
 * `.rf-mask > span` translates 110% down inside an `overflow: hidden` parent,
 * so the text is entirely outside its box until `.is-in` is added by an
 * IntersectionObserver. That shipped: a production build served 66 masked spans
 * and zero `is-in`, which means every masked heading on the homepage — the H1
 * included — was invisible in the server response and stayed invisible forever
 * if JS failed, was blocked, or had not run yet.
 *
 * The fix gates the hidden start state on `.js-anim`, set synchronously before
 * paint. This check asserts the fix holds: any `rf-mask` in the served HTML must
 * be accompanied either by `is-in` on the element or by `js-anim` somewhere in
 * the document, and the gating rule must be present in the stylesheet.
 *
 * It is checked against served HTML rather than source because the failure is
 * invisible in a code review — the component looks correct, the CSS looks
 * correct, and only the combination is wrong.
 *
 * Usage:  node scripts/check-served-page.mjs [--report]
 *         --report  print the numbers and exit 0 regardless
 */
import { spawn } from 'node:child_process';
import { readFile, access } from 'node:fs/promises';
import { gzipSync } from 'node:zlib';
import path from 'node:path';
import { checkProductScreens, productScreenContract } from './lib/served-screens.mjs';

const BUDGET_BYTES = 40 * 1024;
const ROUTE = '/';
const CONTROL_ROUTE = '/legal/terms';
/* Other pages that render a product screen, and how many each must render. The run
   renders on /services/ai-seo too (docs/copy/2026-10/plain-english-templates.md §5), so
   the served-HTML half of ADR-0006 has to see it there as well (Owen, 2026-10-08).
   Add a route here whenever a page gains a ProductScreen. */
const SCREEN_ROUTES = [{ route: '/services/ai-seo', expected: 1 }];
const PORT = process.env.BUDGET_PORT || 3987;
const ROOT = process.cwd();
const reportOnly = process.argv.includes('--report');

const sleep = (ms) => new Promise((r) => setTimeout(r, ms));

async function waitForServer(url, timeoutMs = 90_000) {
  const deadline = Date.now() + timeoutMs;
  while (Date.now() < deadline) {
    try {
      const res = await fetch(url, { signal: AbortSignal.timeout(4000) });
      if (res.ok || res.status === 404) return;
    } catch {
      /* not up yet */
    }
    await sleep(500);
  }
  throw new Error(`server did not answer on ${url} within ${timeoutMs}ms`);
}

/** Every <script src> the document ships, in order, deduplicated. */
function scriptSources(html) {
  const out = new Set();
  for (const m of html.matchAll(/<script[^>]+src="([^"]+)"/g)) out.add(m[1]);
  // Turbopack also pushes chunk paths through the inline bootstrap array.
  for (const m of html.matchAll(/"(\/_next\/static\/chunks\/[^"]+\.js)"/g)) out.add(m[1]);
  return [...out].filter((s) => s.startsWith('/_next/static/'));
}

async function gzipTotal(sources) {
  let total = 0;
  const missing = [];
  for (const src of sources) {
    const rel = src.replace(/^\/_next\//, '').split('?')[0];
    const file = path.join(ROOT, '.next', rel);
    try {
      await access(file);
    } catch {
      missing.push(rel);
      continue;
    }
    total += gzipSync(await readFile(file)).length;
  }
  return { total, missing };
}

const kb = (n) => `${(n / 1024).toFixed(1)}KB`;

let server;
try {
  server = spawn('node_modules/.bin/next', ['start', '-p', String(PORT)], {
    cwd: ROOT,
    stdio: ['ignore', 'ignore', 'pipe'],
    env: { ...process.env, NODE_ENV: 'production' },
  });
  let stderr = '';
  server.stderr.on('data', (d) => {
    stderr += d;
  });
  server.on('exit', (code) => {
    if (code && code !== 0 && !server.killed) {
      console.error(`✗ bundle budget: next start exited ${code}\n${stderr}`);
    }
  });

  const base = `http://127.0.0.1:${PORT}`;
  await waitForServer(`${base}${CONTROL_ROUTE}`);

  /* A 500 page or an error body would otherwise pass every check vacuously. */
  const page = async (route) => {
    const res = await fetch(`${base}${route}`);
    if (!res.ok) throw new Error(`${route} answered ${res.status}, not 200. Nothing below can be checked.`);
    return res.text();
  };
  const [routeHtml, controlHtml] = await Promise.all([page(ROUTE), page(CONTROL_ROUTE)]);

  const routeSrcs = scriptSources(routeHtml);
  const controlSrcs = scriptSources(controlHtml);
  const shared = new Set(controlSrcs);
  const routeOnly = routeSrcs.filter((s) => !shared.has(s));

  const all = await gzipTotal(routeSrcs);
  const only = await gzipTotal(routeOnly);

  console.log(`  ${ROUTE}            total client JS : ${kb(all.total)} gzip (${routeSrcs.length} chunks)`);
  console.log(`  ${CONTROL_ROUTE}  shared baseline : ${kb((await gzipTotal(controlSrcs)).total)} gzip (${controlSrcs.length} chunks)`);
  console.log(`  route-specific on ${ROUTE}         : ${kb(only.total)} gzip (${routeOnly.length} chunks)`);
  if (all.missing.length) {
    console.log(`  (${all.missing.length} referenced chunk(s) not found on disk, not counted)`);
  }

  /* ── 2. hidden-content check ─────────────────────────────────────────── */

  const maskCount = (routeHtml.match(/rf-mask/g) || []).length;
  const isInCount = (routeHtml.match(/is-in/g) || []).length;
  const hasJsAnimHook = /js-anim/.test(routeHtml);

  // The stylesheet must gate the hidden start state, not apply it unconditionally.
  const cssHref = routeHtml.match(/\/_next\/static\/[^"]*\.css/)?.[0];
  let cssGated = false;
  if (cssHref) {
    const css = await fetch(`${base}${cssHref}`).then((r) => r.text());
    const ungated = /(^|})\s*\.rf-mask\s*>\s*span\s*\{[^}]*translateY\(110%\)/.test(css);
    const gated = /\.js-anim\s+\.rf-mask\s*>\s*span\s*\{[^}]*translateY\(110%\)/.test(css);
    cssGated = gated && !ungated;
  }

  let hiddenContentOk = true;
  if (maskCount > 0 && isInCount === 0 && !hasJsAnimHook) {
    console.error(
      `✗ hidden content: ${ROUTE} serves ${maskCount} masked element(s) with no \`is-in\` and no \`js-anim\` hook.`
    );
    console.error('  Those headings are translated outside their clipping box and never come back');
    console.error('  if JS does not run. Content first, motion second. app/globals.css.');
    hiddenContentOk = false;
  } else if (maskCount > 0 && !cssGated) {
    console.error(
      '✗ hidden content: the .rf-mask start state is not gated on .js-anim in the served stylesheet.'
    );
    console.error('  An ungated translateY(110%) hides the heading in the server response.');
    hiddenContentOk = false;
  } else {
    console.log(
      `✓ hidden content: ${maskCount} masked element(s) on ${ROUTE}, start state gated on .js-anim.`
    );
  }

  /* ── 3. product screens, ADR-0006 R3 R5 R6 ─────────────────────────────
     Enforced under --report too: like hidden content, this is correctness,
     not a budget. A badge that is imported but never rendered, or a figure
     computed in a component, passes tsc and every source grep; only the
     served page shows it. */
  const screens = checkProductScreens(routeHtml, productScreenContract());
  let screensOk = true;
  if (screens.figures === 0) {
    console.error(`✗ product screens: ${ROUTE} renders no figure[data-provenance]. The hero tracker is required (brief §3.1).`);
    screensOk = false;
  } else if (screens.errors.length) {
    console.error(`✗ product screens on ${ROUTE}:`);
    for (const e of screens.errors) console.error(`  ${e}`);
    screensOk = false;
  } else {
    console.log(
      `✓ product screens: ${screens.figures} on ${ROUTE}, ${screens.badges} visible badge(s), no figures, every string from the screen data.`
    );
  }
  for (const { route, expected } of SCREEN_ROUTES) {
    const html = await page(route);
    const result = checkProductScreens(html, { ...productScreenContract(), expected });
    if (result.figures === 0) {
      console.error(`✗ product screens: ${route} renders no figure[data-provenance], and it is listed in SCREEN_ROUTES.`);
      screensOk = false;
    } else if (result.errors.length) {
      console.error(`✗ product screens on ${route}:`);
      for (const e of result.errors) console.error(`  ${e}`);
      screensOk = false;
    } else {
      console.log(
        `✓ product screens: ${result.figures} on ${route}, ${result.badges} visible badge(s), no figures, every string from the screen data.`
      );
    }
  }
  const correctnessOk = hiddenContentOk && screensOk;

  if (reportOnly) {
    console.log('✓ bundle budget: report only, not enforced.');
    process.exitCode = correctnessOk ? 0 : 1;
  } else if (!correctnessOk) {
    process.exitCode = 1;
  } else if (only.total > BUDGET_BYTES) {
    console.error(
      `✗ bundle budget: ${ROUTE} ships ${kb(only.total)} of route-specific client JS, over the ${kb(BUDGET_BYTES)} budget in ADR-0005 §5.`
    );
    console.error('  Raising the budget requires an ADR amendment, not a bigger number here.');
    console.error('  Route-only chunks:');
    for (const s of routeOnly) console.error(`    ${s}`);
    process.exitCode = 1;
  } else {
    console.log(`✓ bundle budget: ${ROUTE} at ${kb(only.total)} of ${kb(BUDGET_BYTES)} route-specific client JS.`);
  }
} catch (err) {
  console.error(`✗ served-page checks: ${err.message}`);
  process.exitCode = 1;
} finally {
  server?.kill('SIGTERM');
}
