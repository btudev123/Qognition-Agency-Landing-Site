#!/usr/bin/env node
/* THE B2B PAGE GATE. ADR-0007 §6.3.
 *
 * ────────────────────────────────────────────────────────────────────────────
 * WHAT THIS GUARDS THAT NOTHING ELSE DOES.
 *
 * scripts/check-industry-gate.cjs freezes the LEGACY 11 hubs and 66 sub-pages
 * and asserts the sitemap is still 4,422 entries. It knows nothing about
 * data/b2b. scripts/test-b2b-observations.cjs validates the observation records.
 * It knows nothing about pages. This file is the third: it guards the entities
 * that render, the bodies behind them, and the link graph between them.
 *
 * The division ADR-0007 §3.3 insists on, restated so nobody assumes more of the
 * compiler than it can do:
 *
 *   Compiler   three sourced facts, three FAQs, six vocabulary terms, an https
 *              source URL, a reviewer inside a closed union, a date-shaped date.
 *   This gate   a published entity actually HAVING a body, slug disjointness,
 *              blast radius, uniqueness, boilerplate, the graph, the ceiling.
 *   The human   whether the facts are true and the page is worth reading.
 * ────────────────────────────────────────────────────────────────────────────
 */
require('./lib/load-typescript.cjs');
const assert = require('node:assert/strict');
const fs = require('node:fs');
const path = require('node:path');

const { META_VERTICALS, publishedEntities } = require('../data/b2b/verticals.ts');
const { INDUSTRIES } = require('../data/industries.ts');
const { B2B_BODIES, bodyKey } = require('../data/b2b/index.ts');
const { routableEntities, childrenOf, siblingsOf } = require('../lib/b2b/graph.ts');
const { resolveIndustry, resolveSubIndustry } = require('../lib/b2b/registry.ts');

/* ── 9. The count budget. ─────────────────────────────────────────────────────
 * Starts at 0 and is raised by exactly one wave's size, in that wave's commit,
 * by a human who is therefore on the diff. It is a literal here rather than a
 * computed value on purpose: a ceiling derived from the data agrees with the
 * data by construction and gates nothing. */
const B2B_PUBLISHED_CEILING = 0;

const published = publishedEntities();
assert.ok(
  published.length <= B2B_PUBLISHED_CEILING,
  `${published.length} B2B entities are published but the ceiling is ${B2B_PUBLISHED_CEILING}. ` +
  `Raise B2B_PUBLISHED_CEILING in this file in the same commit that publishes them, and name the ` +
  `reviewer in the message. Entities: ` +
  published.map((e) => (e.subNiche ? `${e.vertical.id}/${e.subNiche.id}` : e.vertical.id)).join(', ')
);

/* ── 1. Spine integrity. ──────────────────────────────────────────────────── */
const verticalIds = new Set();
for (const vertical of META_VERTICALS) {
  assert.ok(!verticalIds.has(vertical.id), `duplicate meta-vertical id: ${vertical.id}`);
  verticalIds.add(vertical.id);

  const subIds = new Set();
  for (const sub of vertical.subNiches) {
    assert.ok(
      !subIds.has(sub.id),
      `duplicate sub-niche id ${sub.id} under ${vertical.id}`
    );
    subIds.add(sub.id);
    assert.ok(
      /^[a-z0-9]+(-[a-z0-9]+)*$/.test(sub.id),
      `sub-niche id is not kebab-case and would make a bad URL segment: ${vertical.id}/${sub.id}`
    );
  }
  /* `hub` is the filename used for a hub's body under bodies/<meta>/hub.ts. A
     sub-niche with that id would make the two namespaces collide. */
  assert.ok(!subIds.has('hub'), `${vertical.id} has a sub-niche id of "hub", which collides with the hub body filename`);
}

/* ── 2. Slug disjointness. A collision silently shadows a legacy page. ───────
 * Legacy wins in lib/b2b/registry.ts, which is the safe failure. This makes it
 * a loud one: a ROUTABLE B2B entity on a colliding slug produces no page at all,
 * and a silent no-page is how work disappears. Spine collisions are reported and
 * tolerated, because the taxonomy is locked and `financial-services` legitimately
 * appears in both. */
const legacyIds = new Set(INDUSTRIES.map((i) => i.id));
const spineCollisions = [];
for (const vertical of META_VERTICALS) {
  if (!legacyIds.has(vertical.id)) continue;
  const routable = vertical.publication?.state === 'draft' || vertical.publication?.state === 'published';
  assert.ok(
    !routable,
    /* Optional chaining, because assert.ok builds its message eagerly and this
       branch is reached with `publication` undefined on every spine row. */
    `B2B meta-vertical "${vertical.id}" is ${vertical.publication?.state} but that slug is owned by ` +
    `data/industries.ts. /industries/${vertical.id} will keep rendering the legacy page and this ` +
    `entity will silently have no page at all. Rename the meta-vertical id, or get an operator ` +
    `decision to re-point the legacy hub. See lib/b2b/registry.ts.`
  );
  spineCollisions.push(vertical.id);
}

/* ── The body contract the compiler cannot express. ───────────────────────── */
for (const { verticalId, subNicheId } of routableEntities()) {
  const key = bodyKey(verticalId, subNicheId);
  assert.ok(B2B_BODIES.has(key), `routable entity ${key} has no authored body in data/b2b/index.ts`);
}
/* And the other direction: a body with no routable entity is authored work that
   nobody can reach, which is worth knowing about before it rots. */
for (const key of B2B_BODIES.keys()) {
  const [v, s] = key.split('/');
  const resolved = s ? resolveSubIndustry(v, s) : resolveIndustry(v);
  assert.ok(
    resolved && resolved.source === 'b2b',
    `data/b2b/index.ts has a body for "${key}" but no routable entity resolves for it. Either the ` +
    `entity is still spine, or its slug changed and the body was left behind.`
  );
}

/* Copy shape rules that only a gate can hold. Both are stated in
   data/b2b/types.ts and neither is expressible as a type.

   The meta description one is not pedantry: reusing `opener` shipped a
   300-character description, which is roughly double what Google renders, so
   half of every new page's SERP snippet was being thrown away. Found by reading
   the served HTML, not by reading the code. */
for (const [key, body] of B2B_BODIES) {
  assert.ok(
    body.metaDescription.length <= 160,
    `${key} metaDescription is ${body.metaDescription.length} characters. Search engines truncate ` +
    `around 160, so everything past that is written for nobody.`
  );
  const words = body.opener.trim().split(/\s+/).length;
  assert.ok(
    words <= 60,
    `${key} opener is ${words} words. The answer-first opener has a 60-word ceiling ` +
    `(docs/seo/b2b-niche-architecture.md §4.1 block 1) because it has to be extractable whole.`
  );
}

/* ── 3. No em dashes in anything that renders. CLAUDE.md §10 bans them by name.
 *
 * Nothing enforced it, and three had already landed: two in the manufacturing
 * hub body and an `&mdash;` in the draft banner. It is a copy rule, so it is
 * scoped to copy:
 *
 *   Bodies are checked as VALUES, by walking the authored objects rather than
 *   their source text. A doc comment in data/b2b cannot false-positive, because
 *   this never reads one.
 *
 *   Components are checked as source with comments stripped first. Every em dash
 *   in components/b2b today is in a doc comment explaining the module, which is
 *   not copy and is not what §10 is about.
 *
 * Deliberately scoped to the B2B surface, which is what this gate owns. The same
 * rule applied site-wide is an operator call: it would need a pass over legacy
 * copy first, and a gate that starts red teaches people to skip it. */
const EM_DASH = /—|&mdash;|&#8212;/;

const stringsIn = (value, out = []) => {
  if (typeof value === 'string') out.push(value);
  else if (Array.isArray(value)) for (const item of value) stringsIn(item, out);
  else if (value && typeof value === 'object') for (const item of Object.values(value)) stringsIn(item, out);
  return out;
};

for (const [key, body] of B2B_BODIES) {
  for (const text of stringsIn(body)) {
    assert.ok(
      !EM_DASH.test(text),
      `${key} has an em dash in rendered copy: "${text.slice(0, 120)}". CLAUDE.md §10: no em dashes. ` +
      `Use a colon, a full stop, or brackets.`
    );
  }
}

const b2bComponents = fs.readdirSync('components/b2b')
  .filter((name) => name.endsWith('.tsx'))
  .map((name) => path.join('components/b2b', name));
assert.ok(b2bComponents.length > 0, 'components/b2b has no .tsx files. This check is reading nothing.');

for (const file of b2bComponents) {
  const copy = fs.readFileSync(file, 'utf8')
    .replace(/\/\*[\s\S]*?\*\//g, ' ')
    .replace(/^\s*\/\/.*$/gm, ' ');
  assert.ok(
    !EM_DASH.test(copy),
    `${file} has an em dash outside a comment, so it reaches the page. CLAUDE.md §10: no em dashes.`
  );
}

/* Published entities carry a named reviewer. The union already stops
   `reviewer: 'TBD'`; this stops a published entity whose publication variant was
   written without one at all through a cast. */
for (const { vertical, subNiche } of published) {
  const pub = (subNiche ?? vertical).publication;
  assert.ok(
    pub && pub.state === 'published' && pub.reviewedBy && pub.reviewedAt,
    `published entity ${subNiche ? `${vertical.id}/${subNiche.id}` : vertical.id} has no reviewer or review date`
  );
}

/* ── 4. No blast radius. Three greps. Crude and exactly sufficient. ─────────
 * data/navigation.ts drives the global header, CrossLinks renders on every
 * service, industry and region page, and programmaticRoutes multiplies against
 * SERVICES. If any of them ever imports data/b2b, one taxonomy edit changes
 * every page on the site. */
for (const file of [
  'data/navigation.ts',
  'components/shared/CrossLinks.tsx',
  'lib/sitemap.ts',
]) {
  const src = fs.readFileSync(file, 'utf8');
  if (file === 'lib/sitemap.ts') {
    /* sitemap.ts may one day import the B2B registry for the PUBLISHED set. What
       it must never do is feed programmaticRoutes, which is SERVICES x N.

       The window is bounded by the NEXT top-level declaration, not by a
       character count. It used to slice 1,500 characters from the first mention
       of the name. The function is 836 characters, so that window covered it and
       664 characters of blogRoutes as well, and it would have failed this
       assertion for an import that had nothing to do with programmaticRoutes. It
       worked by coincidence of the current file layout, and it fails in the
       other direction too: the day the function grows past 1,500 characters the
       window stops covering the end of it. */
    const start = src.indexOf('export const programmaticRoutes');
    assert.notEqual(
      start, -1,
      'lib/sitemap.ts no longer declares `export const programmaticRoutes`. It was renamed, moved or ' +
      'removed, and this gate has been reading a window around nothing. Re-point it at the function ' +
      'that multiplies against SERVICES.'
    );
    const nextDeclaration = src.slice(start + 1).search(/\n(export )?const /);
    assert.notEqual(
      nextDeclaration, -1,
      'programmaticRoutes is the last declaration in lib/sitemap.ts, so this check cannot find where ' +
      'it ends. Bound it explicitly rather than letting it read to the end of the file.'
    );
    const programmatic = src.slice(start, start + 1 + nextDeclaration);
    assert.ok(
      !/data\/b2b|lib\/b2b/.test(programmatic),
      'lib/sitemap.ts#programmaticRoutes references the B2B spine. That function multiplies against ' +
      'SERVICES and is the mechanism CLAUDE.md §11 forbids by name.'
    );
    continue;
  }
  assert.ok(
    !/data\/b2b|lib\/b2b/.test(src),
    `${file} imports from the B2B spine. It renders on every page, so a taxonomy edit would change ` +
    `the whole site's link graph. ADR-0007 §5.3.`
  );
}

/* ── 8. Graph: no orphans, depth ceiling, link cap. ──────────────────────── */
for (const { verticalId, subNicheId } of routableEntities()) {
  const label = subNicheId ? `${verticalId}/${subNicheId}` : verticalId;

  if (subNicheId) {
    const parent = resolveIndustry(verticalId);
    assert.ok(
      parent && parent.source === 'b2b',
      `${label} renders but its parent hub does not, so it is unreachable by navigation.`
    );
    const listed = childrenOf(parent.vertical).some((c) => c.id === subNicheId && c.href);
    assert.ok(listed, `${label} is not linked from its parent hub. Orphan.`);

    const vertical = META_VERTICALS.find((v) => v.id === verticalId);
    assert.ok(
      siblingsOf(vertical, subNicheId).length <= 12,
      `${label} generates more than 12 sibling links. ADR-0007 §5.3.`
    );
  }
}

/* ── 5, 6, 7. Uniqueness, template substitution, boilerplate. ───────────────
 * All three operate on the same normalised text: lowercase, punctuation
 * stripped, and the entity's own name replaced with a sentinel so that "CNC
 * machining" vs "sheet metal fabrication" cannot be the thing making two pages
 * look different. That substitution is the whole point — it is what turns
 * "these read differently" into "these ARE different".
 *
 * Runs over every entity with a body, draft included. A draft that is a template
 * is still a template, and catching it before promotion is cheaper. */
const normalise = (body, name) => {
  const text = [
    body.buyerQuestion,
    body.opener,
    body.whyTheAnswerIsLost,
    body.snapshotQuestion,
    ...body.buyers.flatMap((b) => [b.title, b.researches]),
    ...body.facts.map((f) => f.claim),
    ...body.faqs.flatMap((f) => [f.question, f.answer]),
    ...(body.vocabulary ?? []).flatMap((v) => [v.term, v.issuedBy, v.gates]),
    ...(body.comparisonAxes ?? []).flatMap((a) => [a.axis, a.whatBuyersAsk]),
  ].join(' ');

  const sentinel = ' \u0001 ';
  return text
    .toLowerCase()
    .replace(new RegExp(name.toLowerCase().replace(/[.*+?^${}()|[\]\\]/g, '\\$&'), 'g'), sentinel)
    .replace(/[^a-z0-9\u0001\s]/g, ' ')
    .replace(/\s+/g, ' ')
    .trim();
};

const shingles = (text) => {
  const words = text.split(' ');
  const out = new Set();
  for (let i = 0; i + 5 <= words.length; i += 1) out.add(words.slice(i, i + 5).join(' '));
  return out;
};

const jaccard = (a, b) => {
  let shared = 0;
  for (const s of a) if (b.has(s)) shared += 1;
  const union = a.size + b.size - shared;
  return union === 0 ? 0 : shared / union;
};

const docs = [];
for (const vertical of META_VERTICALS) {
  const hub = B2B_BODIES.get(vertical.id);
  if (hub) docs.push({ key: vertical.id, parent: null, text: normalise(hub, vertical.label) });
  for (const sub of vertical.subNiches) {
    const body = B2B_BODIES.get(bodyKey(vertical.id, sub.id));
    if (body) {
      docs.push({ key: `${vertical.id}/${sub.id}`, parent: vertical.id, text: normalise(body, sub.label) });
    }
  }
}

for (const a of docs) {
  for (const b of docs) {
    if (a.key >= b.key) continue;
    const overlap = jaccard(shingles(a.text), shingles(b.text));
    assert.ok(
      overlap < 0.6,
      `${a.key} and ${b.key} share ${(overlap * 100).toFixed(1)}% of their 5-word shingles after the ` +
      `entity name was substituted out. CLAUDE.md §7 requires >=40% unique against the closest ` +
      `sibling. If you are reading this and reaching for the threshold, the threshold is not the ` +
      `problem (ADR-0007 §10.3).`
    );
  }
}

/* 7. Boilerplate ceiling. ADR-0007 §6.3 phrases it as "any sentence of >=12
   words in more than 3 published bodies". The normaliser has already stripped
   punctuation, so there are no sentence boundaries left to split on; a sliding
   12-word window is the same check without needing them, and it is strictly
   stronger because it also catches a shared clause spanning two sentences.
   Catches the shared-constants failure before it becomes 119 pages of it, which
   is what data/seoExpansion.ts already is. */
const sentenceCount = new Map();
for (const doc of docs) {
  const seen = new Set();
  const words = doc.text.split(' ');
  for (let i = 0; i + 12 <= words.length; i += 1) {
    const run = words.slice(i, i + 12).join(' ');
    if (seen.has(run)) continue;
    seen.add(run);
    sentenceCount.set(run, (sentenceCount.get(run) ?? 0) + 1);
  }
}
const boilerplate = [...sentenceCount.entries()].filter(([, n]) => n > 3);
assert.equal(
  boilerplate.length,
  0,
  `${boilerplate.length} twelve-word run(s) appear verbatim in more than three bodies:\n  ` +
  boilerplate.slice(0, 5).map(([s, n]) => `(${n}x) "${s}"`).join('\n  ')
);

/* ── 10. File hygiene. A file that cannot be read in one sitting is not read. ── */
const walk = (dir) =>
  fs.readdirSync(dir, { withFileTypes: true }).flatMap((e) => {
    const full = path.join(dir, e.name);
    return e.isDirectory() ? walk(full) : [full];
  });

const bodyFiles = [];
for (const file of walk('data/b2b')) {
  if (!file.endsWith('.ts')) continue;
  const bytes = fs.statSync(file).size;
  assert.ok(
    bytes <= 60 * 1024,
    `${file} is ${(bytes / 1024).toFixed(1)}KB, over the 60KB ceiling. Split it. ADR-0007 §4.1.`
  );
  if (file.includes(`${path.sep}bodies${path.sep}`)) bodyFiles.push(file);
}

/* The barrel is checked, not trusted. A body file that exists but is not wired
   into data/b2b/index.ts is authored work nobody can reach; a body file deleted
   while its entity still claims to be published is a runtime undefined. */
const barrel = fs.readFileSync('data/b2b/index.ts', 'utf8');
for (const file of bodyFiles) {
  const rel = './' + path.relative('data/b2b', file).split(path.sep).join('/').replace(/\.ts$/, '');
  assert.ok(
    barrel.includes(rel),
    `${file} is not imported by data/b2b/index.ts. Expected an import of "${rel}".`
  );
}

console.log(
  `✓ b2b: ${META_VERTICALS.length} verticals, ${routableEntities().length} routable, ` +
  `${published.length} published (ceiling ${B2B_PUBLISHED_CEILING}), ${B2B_BODIES.size} bodies, ` +
  `${bodyFiles.length} body file(s) wired.`
);
if (spineCollisions.length) {
  console.log(
    `  note: ${spineCollisions.length} meta-vertical id(s) collide with data/industries.ts and are ` +
    `held at spine: ${spineCollisions.join(', ')}. Legacy owns those URLs.`
  );
}
