#!/usr/bin/env node
/* CSS invariants gate.  ADR-0004 §5.
 *
 * The rule this encodes:
 *
 *   No `display: none` inside a width media query for an element that carries
 *   an aria-label. If it is worth labelling for a screen reader it is worth
 *   rendering on a phone.
 *
 * It exists because `app/growth.css` hid `.growth-system` — the
 * <aside aria-label="How discovery connects to revenue"> buyer-journey diagram,
 * and the only visual device on the homepage — below 760px, which deleted it
 * for the majority of traffic. The fix was four size reductions, not a hide.
 * Without a check, the next person compressing a mobile layout does it again.
 *
 * Two checks:
 *   1. Literal: no `.growth-system { ... display: none ... }` in any app/*.css.
 *   2. General: for every class hidden inside a width media query, fail if that
 *      class appears on an aria-labelled element in the TSX.
 *
 * Check 2 is deliberately conservative — it only inspects single-class
 * selectors, because anything cleverer produces false positives that get the
 * gate disabled. Crude, and sufficient.
 *
 * Usage: node scripts/check-css-invariants.mjs
 */
import { readFileSync, readdirSync } from 'node:fs';
import { execSync } from 'node:child_process';
import path from 'node:path';

const ROOT = process.cwd();
const violations = [];

/* Classes that may be hidden by width because an equivalent labelled control
 * is shown at the same width. Each entry needs the substitute named, so adding
 * one is an argument rather than a silencing. This is the escape hatch, and it
 * is deliberately narrow. */
const SUBSTITUTED = {
  'growth-desktop-nav':
    'replaced below 1020px by .growth-mobile-toggle, which opens ' +
    '#mobile-navigation carrying the same links. Genuine swap, not a hide.',
  'growth-nav-cta':
    'the "Let\'s talk" button. Below 760px the same destination is in ' +
    '#mobile-navigation and in the sticky CTA. Duplicated, not lost.',
};

const cssFiles = readdirSync(path.join(ROOT, 'app'))
  .filter((f) => f.endsWith('.css'))
  .map((f) => path.join('app', f));

/* ── 1. the literal check ──────────────────────────────────────────────── */

const GROWTH_SYSTEM_HIDDEN = /\.growth-system\s*\{[^}]*display\s*:\s*none/;

for (const file of cssFiles) {
  const src = readFileSync(path.join(ROOT, file), 'utf8');
  if (GROWTH_SYSTEM_HIDDEN.test(src)) {
    violations.push(
      `${file}: .growth-system is set to display:none.\n` +
        '    That aside is the buyer-journey diagram and it carries an aria-label.\n' +
        '    ADR-0004 §5 replaces the hide with four size reductions. Do not re-hide it.'
    );
  }
}

/* ── 2. the general check ──────────────────────────────────────────────── */

// Every class that some width media query hides.
const hiddenInWidthQuery = new Set();

for (const file of cssFiles) {
  const src = readFileSync(path.join(ROOT, file), 'utf8');
  // @media ... (min-width|max-width) ... { ...block... }
  // Brace matching by hand: CSS nesting is one level deep in this repo.
  const mediaRe = /@media[^{]*\((?:min|max)-width[^{]*\{/g;
  for (const m of src.matchAll(mediaRe)) {
    let depth = 1;
    let i = m.index + m[0].length;
    const start = i;
    while (i < src.length && depth > 0) {
      if (src[i] === '{') depth++;
      else if (src[i] === '}') depth--;
      i++;
    }
    const block = src.slice(start, i - 1);
    for (const rule of block.matchAll(/([^{}]+)\{([^{}]*)\}/g)) {
      if (!/display\s*:\s*none/.test(rule[2])) continue;
      for (const sel of rule[1].split(',')) {
        const cls = sel.trim().match(/^\.([A-Za-z0-9_-]+)$/);
        if (cls && !(cls[1] in SUBSTITUTED)) hiddenInWidthQuery.add(cls[1]);
      }
    }
  }
}

if (hiddenInWidthQuery.size) {
  const tsx = execSync('grep -rl "aria-label" app components', { encoding: 'utf8' })
    .trim()
    .split('\n')
    .filter((f) => f.endsWith('.tsx'));

  for (const file of tsx) {
    const src = readFileSync(path.join(ROOT, file), 'utf8');
    // Any JSX tag carrying both aria-label and className, on one element.
    for (const tag of src.matchAll(/<[A-Za-z][^>]*>/g)) {
      const el = tag[0];
      if (!el.includes('aria-label')) continue;
      const cls = el.match(/className="([^"]*)"/);
      if (!cls) continue;
      for (const name of cls[1].split(/\s+/)) {
        if (hiddenInWidthQuery.has(name)) {
          const line = src.slice(0, tag.index).split('\n').length;
          violations.push(
            `${file}:${line}: .${name} carries an aria-label and is display:none inside a width media query.\n` +
              '    An element worth labelling for a screen reader is worth rendering on a phone.\n' +
              '    Reduce its size instead of hiding it (ADR-0004 §5).'
          );
        }
      }
    }
  }
}

/* ── report ────────────────────────────────────────────────────────────── */

if (violations.length === 0) {
  console.log(
    `✓ css invariants: ${cssFiles.length} stylesheet(s) clean — nothing aria-labelled is hidden by width.`
  );
  process.exit(0);
}

console.error(`✗ css invariants: ${violations.length} violation(s)\n`);
for (const v of violations) console.error(`  ${v}\n`);
process.exit(1);
