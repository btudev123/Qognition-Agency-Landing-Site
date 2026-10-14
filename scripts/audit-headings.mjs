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
import { createRequire } from 'node:module';

const SIZES = 'xs|sm|base|lg|xl|2xl|3xl|4xl|5xl|6xl|7xl|8xl|9xl';
const RAW_SIZE = new RegExp(
  `(?:^|\\s)(?:(?:sm|md|lg|xl|2xl):)?text-(?:${SIZES})(?=\\s|$)` +
    `|(?:^|\\s)(?:(?:sm|md|lg|xl|2xl):)?text-\\[(?:clamp\\([^\\]]*\\)|[0-9][^\\]]*)\\]`
);
const CANONICAL_HEADING = /\btext-(display|h1|h2|h3|h4)\b/;
const CANONICAL_TEXT = /\btext-(body|meta)\b/;

const files = execSync('grep -rl "className" app components', {
  encoding: 'utf8',
})
  .trim()
  .split('\n')
  .filter((f) => f.endsWith('.tsx'));

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

/* 4: no hero line asserts a present state of a third-party AI system.
 *
 * "Your buyers are asking ChatGPT who to hire" is an unsourced claim about
 * buyer behaviour with no platform, prompt set or date behind it. It shipped
 * with a qualifying subhead that made it a description of our own work; when
 * the subhead was cut, the H1 was rewritten to describe our work directly
 * rather than reinstating the bare assertion.
 *
 * The rule that survives the rewrite is the general one, so this checks the
 * general one: the <h1> must not contain a present-state claim about what an
 * AI system or a population of buyers is doing. A claim about what WE do is
 * verifiable on its face and passes.
 *
 * CLAUDE.md §4. This is a gate rather than a comment because the failure is a
 * copy edit that looks harmless in a diff.
 */
const HERO = 'components/home/Hero.tsx';
const HERO_BANNED = [
  /buyers?\s+(are\s+)?ask(ing)?\s+(AI|ChatGPT|Perplexity|Gemini|Claude)/i,
  /(AI|ChatGPT|Perplexity|Gemini|Claude)\s+(is|are)\s+(naming|recommending|telling)/i,
  /\b(most|many|\d+%\s+of)\s+(firms|companies|buyers)\b/i,
  /never\s+checked\s+the\s+answer/i,
];

try {
  const hero = readFileSync(HERO, 'utf8');
  const h1 = hero.match(/<h1[^>]*>([\s\S]*?)<\/h1>/);
  if (!h1) {
    violations.push({
      file: HERO,
      line: 0,
      message: 'hero has no <h1>. Every page carries exactly one, and this is the one.',
      snippet: '',
    });
  } else {
    let text = h1[1].replace(/<[^>]+>/g, ' ').replace(/[{}'"]/g, ' ').replace(/\s+/g, ' ');
    /* Since 2026-10-08 the H1 words live in data/homeHero.ts (HERO_H1), so the
       JSX holds identifiers, not words. Reading only the JSX would pass any
       sentence at all. When the H1 uses HERO_H1, the rules run on the sentence
       the page serves, heroH1Sentence(), loaded from the data file itself. */
    if (/\bHERO_H1\b/.test(h1[1])) {
      const require = createRequire(import.meta.url);
      require('./lib/load-typescript.cjs');
      const { heroH1Sentence } = require('../data/homeHero.ts');
      text = heroH1Sentence();
    }
    for (const rule of HERO_BANNED) {
      if (rule.test(text)) {
        record(
          HERO,
          lineOf(hero, h1.index),
          'hero H1 asserts a present state of a third-party AI system or of buyer behaviour. ' +
            'Describe what we do instead — that is verifiable and needs no grounding sentence (CLAUDE.md §4)',
          text.trim()
        );
        break;
      }
    }
  }
} catch {
  violations.push({
    file: HERO,
    line: 0,
    message:
      'hero file not found, so the H1 claim rule cannot run. It fails rather than passes. Update HERO in this script if the hero moved.',
    snippet: '',
  });
}

if (violations.length === 0) {
  console.log(`✓ typography: ${files.length} files clean — one scale, no drift.`);
  console.log('✓ hero claim: H1 asserts nothing about a third-party system.');
  process.exit(0);
}

console.error(`✗ typography: ${violations.length} violation(s)\n`);
for (const v of violations) {
  console.error(`  ${v.file}:${v.line}\n    ${v.message}\n    ${v.snippet}\n`);
}
console.error('Fix by using <Heading>/<Text> or the canonical text-* tokens.');
process.exit(1);
