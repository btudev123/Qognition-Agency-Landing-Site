#!/usr/bin/env node
/* Typography gate.
 *
 * The site has exactly one type scale (tailwind.config.js -> theme.fontSize) and
 * two primitives that consume it: components/ui/Heading.tsx and
 * components/ui/Text.tsx. This script fails the build when something reintroduces
 * an ad-hoc size, which is how the codebase previously drifted to 8 different
 * <h2> sizes and 6 different <p> sizes.
 *
 * Checks:
 *   1. No raw Tailwind size class (text-xl, sm:text-4xl, text-[42px], ...) on an
 *      <h1>-<h4> element or on a <Heading>/<Text> className.
 *   2. Every heading element carries exactly one canonical token.
 *   3. <p> elements carry text-body or text-meta (or no size at all).
 *
 * Usage: node scripts/audit-headings.mjs
 */
import { readFileSync } from 'node:fs';
import { execSync } from 'node:child_process';

const SIZES = 'xs|sm|base|lg|xl|2xl|3xl|4xl|5xl|6xl|7xl|8xl|9xl';
const RAW_SIZE = new RegExp(
  `(?:^|\\s)(?:(?:sm|md|lg|xl|2xl):)?text-(?:${SIZES})(?=\\s|$)` +
    `|(?:^|\\s)(?:(?:sm|md|lg|xl|2xl):)?text-\\[(?:clamp\\([^\\]]*\\)|[0-9][^\\]]*)\\]`
);
const CANONICAL_HEADING = /\btext-(display|h1|h2|h3|h4)\b/;
const CANONICAL_TEXT = /\btext-(body|meta)\b/;

const files = execSync('grep -rl "className" app components --include="*.tsx"', {
  encoding: 'utf8',
})
  .trim()
  .split('\n')
  .filter(Boolean);

const violations = [];

const record = (file, line, message, snippet) =>
  violations.push({ file, line, message, snippet: snippet.slice(0, 110) });

const lineOf = (src, index) => src.slice(0, index).split('\n').length;

for (const file of files) {
  const src = readFileSync(file, 'utf8');

  // 1 + 2: heading elements
  const headingRe = /<(h[1-4])(?![a-zA-Z0-9])((?:[^>"]|"[^"]*")*?)className="([^"]*)"/g;
  for (const m of src.matchAll(headingRe)) {
    const [full, tag, , cls] = m;
    const line = lineOf(src, m.index);
    if (RAW_SIZE.test(cls)) {
      record(file, line, `<${tag}> uses an ad-hoc size class — use the canonical token`, full);
    } else if (!CANONICAL_HEADING.test(cls)) {
      record(file, line, `<${tag}> has no canonical size token (expected text-${tag} or text-display)`, full);
    }
  }

  // 1: Heading / Text primitives must not be handed a size through className
  const primitiveRe = /<(Heading|Text)((?:[^>"]|"[^"]*")*?)className="([^"]*)"/g;
  for (const m of src.matchAll(primitiveRe)) {
    const [full, name, , cls] = m;
    if (RAW_SIZE.test(cls) || CANONICAL_HEADING.test(cls) || CANONICAL_TEXT.test(cls)) {
      record(file, lineOf(src, m.index), `<${name}> must not receive a size class via className`, full);
    }
  }

  // 3: paragraphs
  const pRe = /<p(?![a-zA-Z0-9])((?:[^>"]|"[^"]*")*?)className="([^"]*)"/g;
  for (const m of src.matchAll(pRe)) {
    const [full, , cls] = m;
    if (RAW_SIZE.test(cls)) {
      record(file, lineOf(src, m.index), '<p> uses an ad-hoc size — use text-body or text-meta', full);
    }
  }
}

if (violations.length === 0) {
  console.log(`✓ typography: ${files.length} files clean — one scale, no drift.`);
  process.exit(0);
}

console.error(`✗ typography: ${violations.length} violation(s)\n`);
for (const v of violations) {
  console.error(`  ${v.file}:${v.line}\n    ${v.message}\n    ${v.snippet}\n`);
}
console.error('Fix by using <Heading>/<Text> or the canonical text-* tokens.');
process.exit(1);
