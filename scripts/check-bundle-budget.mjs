#!/usr/bin/env node
/* Client JS budget gate for `/`.  ADR-0005 §5.
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
 * Usage:  node scripts/check-bundle-budget.mjs [--report]
 *         --report  print the number and exit 0 regardless (for capturing a
 *                   baseline before the budget is meaningful)
 */
import { spawn } from 'node:child_process';
import { readFile, access } from 'node:fs/promises';
import { gzipSync } from 'node:zlib';
import path from 'node:path';

const BUDGET_BYTES = 40 * 1024;
const ROUTE = '/';
const CONTROL_ROUTE = '/legal/terms';
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

  const [routeHtml, controlHtml] = await Promise.all([
    fetch(`${base}${ROUTE}`).then((r) => r.text()),
    fetch(`${base}${CONTROL_ROUTE}`).then((r) => r.text()),
  ]);

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

  if (reportOnly) {
    console.log('✓ bundle budget: report only, not enforced.');
    process.exitCode = 0;
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
  console.error(`✗ bundle budget: ${err.message}`);
  process.exitCode = 1;
} finally {
  server?.kill('SIGTERM');
}
