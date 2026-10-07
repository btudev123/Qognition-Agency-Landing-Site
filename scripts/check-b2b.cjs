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
    `data/industries.ts. /industries/${vertical.id} will keep rendering the legacy HUB and this ` +
    `entity will silently have no page at all.\n` +
    `Its SUB-NICHES are not blocked: since 2026-09-28 lib/b2b/registry.ts resolves per sub-slug, so ` +
    `any slug legacy does not own falls through to the B2B branch. Only the hub itself collides. ` +
    `Leave the meta-vertical at spine and promote the sub-niches, or get an operator decision to ` +
    `re-point the legacy hub.`
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

/* Published entities carry the ONE name with sign-off authority.
 *
 * The comment here used to read "the union already stops `reviewer: 'TBD'`".
 * That was false. ReviewerName was never referenced by verticals.ts, so
 * reviewedBy was a raw string and this assertion tested only truthiness. Owen
 * published two entities under 'Nadia (search)', then under 'TBD', raised the
 * ceiling to 2, and both tsc and this gate passed. The only thing that caught it
 * was the 4,422 sitemap assertion in check-industry-gate.cjs, which is precisely
 * the number a reviewer raises "to match" when landing a wave.
 *
 * The type is now closed (verticals.ts), and this re-asserts it at runtime
 * because `as` defeats a type. Equality, not truthiness. */
const SIGN_OFF = 'Prabal (CEO, Qognition Agency)';
for (const { vertical, subNiche } of published) {
  const id = subNiche ? `${vertical.id}/${subNiche.id}` : vertical.id;
  const pub = (subNiche ?? vertical).publication;
  assert.ok(pub && pub.state === 'published', `published entity ${id} has no published publication variant`);
  assert.equal(
    pub.reviewedBy, SIGN_OFF,
    `published entity ${id} names "${pub.reviewedBy}" as reviewer. Only ${SIGN_OFF} has sign-off ` +
    `authority. An agent that drafted a page cannot be the reviewer of record for it, and a name ` +
    `written into a literal by someone other than that person satisfies the gate by attribution ` +
    `rather than by review.`
  );
  assert.ok(
    /^\d{4}-\d{2}-\d{2}$/.test(pub.reviewedAt || ''),
    `published entity ${id} has review date "${pub.reviewedAt}", expected YYYY-MM-DD`
  );
}

/* ── 4. No blast radius. Crude and exactly sufficient. ─────────────────────
 * CORRECTED 2026-09-29. This grepped data/navigation.ts as "the global header".
 * That file is DEAD CODE: SPOKE_MENUS, INDUSTRY_MENU and TOP_NAV have zero
 * importers across app, components, lib and scripts. The live header is
 * components/shared/Navigation.tsx (app/layout.tsx:9,188), which was in no gate,
 * so the protection was aimed at a file nothing reads. ADR-0007 §2.1 and
 * lib/industryPublication.ts both still name it as consumer 7; both are wrong.
 * Fourth instance of the enumeration error this project keeps producing.
 * CrossLinks renders on every
 * service, industry and region page, and programmaticRoutes multiplies against
 * SERVICES. If any of them ever imports data/b2b, one taxonomy edit changes
 * every page on the site. */
for (const file of [
  'components/shared/Navigation.tsx',
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

/* ── 11. THE ICP IMPORT BOUNDARY. ADR-0008 §5.2 item 3. ─────────────────────
 *
 * `data/b2b/icp/icp-taxonomy.json` is 2,230,578 bytes and is imported at module
 * scope into `data/b2b/icp/index.ts`. Next renders each static param to HTML AND
 * to an RSC flight payload; whatever is reachable from a prop handed to a Client
 * Component is serialized into that payload, on every page that renders it. The
 * reach from one industry node is the entire tree.
 *
 * So the rule is a boundary rather than a review note: under `app/` and
 * `components/`, import the NARROW ACCESSORS from `data/b2b/icp` and never
 * `ICP_INDUSTRIES` and never the JSON path. `lib/b2b/icpRegistry.ts` hands out
 * flat view records with no child arrays for the same reason, one layer in.
 *
 * `scripts/` is exempt: a gate that cannot read the taxonomy cannot gate it.
 *
 * The one violation this found on 2026-09-29 was `app/industries/page.tsx`, the
 * single page the whole family hangs off and therefore the one most likely to
 * grow a client-side filter later. It now reads `icpIndustryCards()`, which
 * carries four strings and two numbers per row and cannot walk anywhere. The
 * rendered HTML is unchanged, which was verified by diffing the served page
 * rather than by reading the diff. */
const ICP_FORBIDDEN = /\bICP_INDUSTRIES\b|icp-taxonomy\.json/;
const walkTsx = (dir) =>
  fs.readdirSync(dir, { withFileTypes: true }).flatMap((entry) => {
    const full = path.join(dir, entry.name);
    if (entry.isDirectory()) return walkTsx(full);
    return /\.tsx?$/.test(entry.name) ? [full] : [];
  });

for (const file of [...walkTsx('app'), ...walkTsx('components')]) {
  const src = fs.readFileSync(file, 'utf8');
  const code = src.replace(/\/\*[\s\S]*?\*\//g, ' ').replace(/^\s*\/\/.*$/gm, ' ');
  assert.ok(
    !ICP_FORBIDDEN.test(code),
    `${file} references ICP_INDUSTRIES or icp-taxonomy.json outside a comment.\n` +
    `Route and component code takes the narrow accessors from data/b2b/icp (getIcpIndustry, ` +
    `getIcpSubIndustry, getIcpNiche, getIcpSubNiche, icpIndustryCards, ...) or a view record from ` +
    `lib/b2b/icpRegistry.ts. The 2.2MB taxonomy must never be reachable from a prop: it would be ` +
    `serialized into the RSC payload of every page that rendered it. ADR-0008 §5.2 item 3.`
  );
}

/* Every B2B component is a Server Component, and stays one. The boundary above
   only bites when something crosses it, and `'use client'` is the crossing. */
for (const file of walkTsx('components/b2b')) {
  const src = fs.readFileSync(file, 'utf8');
  assert.ok(
    !/^\s*['"]use client['"]/m.test(src),
    `${file} is a Client Component. Every file in components/b2b is server-only: these pages are the ` +
    `crawl target and ship no client JS (ADR-0005 §2), and a client boundary here serializes whatever ` +
    `the record can reach into the payload of every page in the family.`
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

/* ── Ruth's provenance rule, made mechanical ─────────────────────────────────
 *
 * The binding unit for a sourced figure is FOUR elements:
 *   {the figure} + {publisher named} + {access date} + {sample size, or the
 *    explicit statement that the publisher does not give one}
 *
 * All four ship or none does. Ruth returned FIX six times on exactly this, and
 * the recurring defect was a figure losing its provenance between the draft and
 * the rendered string. Theo then found it in shipped code on this branch: a FAQ
 * answer in cnc-machining.ts rendered "62%" with a partial publisher, no access
 * date and no sample clause.
 *
 * Two shapes, because the surfaces differ:
 *
 *   facts[]   FactsBlock renders publisher, url and accessedAt STRUCTURALLY, so
 *             those three are satisfied by the type. It renders no sample size,
 *             so element 4 has to live inside the claim string.
 *   anywhere  Every other body field is bare prose with no structured source
 *             beside it, so a figure there needs all four IN the sentence.
 *
 * At 120 entities this was a review item. At 11,561 a human will not catch it,
 * which is the whole reason it is a script. */
const FIGURE = /\b\d+(?:\.\d+)?\s?%|\b\d+(?:\.\d+)?\s+out of\s+\d+/;
const SAMPLE_CLAUSE =
  /does not state (?:its |the )?sample size|surveyed \d|sample of \d|\bn\s*=\s*\d|polled \d|respondents|panel|clickstream|\b(?:million|billion)\b.{0,30}\b(?:lines|users?|panel|records?|sessions?)/i;

for (const [key, body] of B2B_BODIES) {
  for (const fact of body.facts || []) {
    if (!FIGURE.test(fact.claim)) continue;
    assert.ok(
      SAMPLE_CLAUSE.test(fact.claim),
      `${key}: a fact carries a figure but no sample statement.\n` +
      `  ${fact.claim.slice(0, 110)}\n` +
      `FactsBlock renders publisher, url and accessedAt but never a sample size, so the claim string ` +
      `must either state the sample or say the publisher does not give one. Ruth's rule: all four ` +
      `elements ship together or none does.`
    );
  }

  /* Bare prose. Walk every string in the body except the facts claims already
     checked, and require the full quartet wherever a figure appears. */
  const walk = (node, path) => {
    if (typeof node === 'string') {
      if (!FIGURE.test(node)) return;
      /* A publisher is named either by a document noun (report, study) or by the
         organisation doing the analysing. "Semrush analysed" names one as surely
         as "the Semrush study" does. */
      const hasPublisher =
        /report|study|research|survey|published by|,\s*20\d\d/i.test(node) ||
        /\b[A-Z][A-Za-z]{2,}\s+(?:analysed|analyzed|surveyed|found|reports?|records?|published)\b/.test(node);
      const hasDate = /accessed on|\b20\d\d\b/.test(node);
      assert.ok(
        hasPublisher && hasDate && SAMPLE_CLAUSE.test(node),
        `${key} ${path}: a figure in bare prose is missing part of its provenance.\n` +
        `  ${node.slice(0, 110)}\n` +
        `  publisher named: ${hasPublisher} | access date: ${hasDate} | sample statement: ${SAMPLE_CLAUSE.test(node)}\n` +
        `Prose carries no structured source beside it, so all four elements belong in the sentence. ` +
        `If the figure cannot carry them, cut the figure rather than the provenance.`
      );
      return;
    }
    if (Array.isArray(node)) return node.forEach((v, i) => walk(v, `${path}[${i}]`));
    if (node && typeof node === 'object') {
      for (const [k, v] of Object.entries(node)) {
        if (k === 'facts') continue;
        walk(v, `${path}.${k}`);
      }
    }
  };
  walk(body, 'body');
}

console.log(
  `✓ b2b boundary: ${[...walkTsx('app'), ...walkTsx('components')].length} route and component files ` +
  `checked for a direct ICP taxonomy import, ${walkTsx('components/b2b').length} b2b components ` +
  `server-only.`
);

console.log(
  `✓ b2b: ${META_VERTICALS.length} verticals, ${routableEntities().length} routable, ` +
  `${published.length} published (ceiling ${B2B_PUBLISHED_CEILING}), ${B2B_BODIES.size} bodies, ` +
  `${bodyFiles.length} body file(s) wired.`
);
if (spineCollisions.length) {
  console.log(
    `  note: ${spineCollisions.length} meta-vertical hub id(s) collide with data/industries.ts and ` +
    `stay at spine: ${spineCollisions.join(', ')}. Legacy owns the HUB url only; sub-niches under ` +
    `it resolve through the B2B branch and can publish.`
  );
}

/* ── 12. PRODUCT SCREENS. ADR-0006 §6 (second amendment, 2026-10-07). ─────────
 *
 * Illustrative product screens must not be able to pass for client data. The
 * type system catches most of it at `tsc`; these are the things it cannot. */
{
  const { PRODUCT_SCREENS, TRACKER_SECTORS } = require('../data/product-screens/index.ts');
  const { SAMPLE_BRANDS } = require('../data/product-screens/sample-entities.ts');
  const brands = new Set(SAMPLE_BRANDS);
  const screens = Object.entries(PRODUCT_SCREENS);
  const DOMAIN_LIKE = /\b[\w-]+\.(com|io|ai|co|net|org|app|uk|de)\b/;
  /* Case-sensitive and whole-word, so the verbs "thrive" and "spiral" in a prompt
     do not trip it. Quillmark and Stroud: Iris's trading-name check,
     docs/design/2026-10-sample-brand-check.md. Both were sample brands and both
     clash with real firms, so they may not come back. */
  const DENY = [
    'Qognition', 'Northgate', 'Epic', 'NetSuite', 'Quillmark', 'Stroud',
    'Thrive', 'Gorilla 76', 'First Page Sage', 'RevenueZen', 'Siana', 'Bluelinks',
    'The ABM Agency', 'ChoiceLocal', 'Scorpion', 'Spiral', 'Carnegie', 'Fintel Connect',
  ];
  const denyRe = new RegExp(`\\b(${DENY.map((d) => d.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')).join('|')})\\b`);

  // 1. Provenance, and key equals id.
  for (const [key, screen] of screens) {
    assert.equal(screen.provenance, 'illustrative', `product screen ${key}: provenance must be 'illustrative' (ADR-0006 R3).`);
    assert.equal(screen.id, key, `product screen registry key ${key} holds a screen whose id is ${screen.id}.`);
  }

  // 2. Tabs.
  const tracker = PRODUCT_SCREENS['scriblr-visibility-tracker'];
  assert.deepEqual(
    tracker.tabs.map((t) => t.sector), [...TRACKER_SECTORS],
    'the visibility tracker must hold exactly one tab per TRACKER_SECTORS entry, in that order.'
  );
  for (const tab of tracker.tabs) {
    assert.ok(brands.has(tab.brand), `tracker tab ${tab.sector}: brand "${tab.brand}" is not in SAMPLE_BRANDS (ADR-0006 R2).`);
    assert.ok(/\.example$/.test(tab.domain), `tracker tab ${tab.sector}: domain ${tab.domain} is not an RFC 2606 .example domain.`);
  }
  const panel = PRODUCT_SCREENS['scriblr-prompt-panel'];
  assert.ok(TRACKER_SECTORS.includes(panel.sector), `prompt panel sector "${panel.sector}" is not a tracker sector.`);

  // 3. Rows.
  /* The type says every Engine is a column; the transpiling loader does not
     type-check, so the gate checks the shape too (Anton, 2026-10-07). */
  const { ENGINES } = require('../lib/b2b/observations.ts');
  const MENTION_STATES = new Set(['cited', 'mentioned', 'absent']);
  for (const tab of tracker.tabs) {
    assert.ok(tab.rows.length > 0, `tracker tab ${tab.sector} has no rows.`);
    for (const row of tab.rows) {
      const where = `tracker ${tab.sector} row "${row.prompt}"`;
      assert.deepEqual(Object.keys(row.states), [...ENGINES], `${where}: states must have exactly one entry per ENGINES member, in ENGINES order.`);
      for (const [engine, state] of Object.entries(row.states)) {
        assert.ok(MENTION_STATES.has(state), `${where}: ${engine} is "${state}", not cited, mentioned or absent.`);
      }
      assert.equal(new Set(row.sourcesCited).size, row.sourcesCited.length, `${where}: sourcesCited has a duplicate.`);
      const states = Object.values(row.states);
      assert.ok(
        !row.sourcesCited.includes('own-site') || states.some((s) => s !== 'absent'),
        `${where}: 'own-site' is cited on a row where no platform named the brand. An answer cannot cite the brand's domain without naming it.`
      );
      assert.ok(states.includes('absent'), `${where}: every platform named the brand. Never an all-named row (Ruth, 2026-10-07).`);
    }
  }

  // 4 and 5. Walk every value: no real names or domains, no numbers.
  /* R6 for strings. Digits are allowed only inside a `prompt`, where they are
     part of the buyer's question ("ISO 9001", "SOC 2"). Everywhere else (tab
     labels, brands, domains, sources) a percent sign or a digit not preceded
     by a letter fails: "64%", "3", "3x" and "1st" fail, "B2B" passes. The same
     pattern runs on the served page in scripts/lib/served-screens.mjs. */
  const FIGURE = /%|(?<![A-Za-z])\d/;
  const walk = (node, where, key) => {
    if (typeof node === 'number') assert.fail(`${where}: a number in screen data (${node}). ADR-0006 R6 allows none.`);
    if (typeof node === 'string') {
      assert.ok(!DOMAIN_LIKE.test(node), `${where}: domain-like token in "${node}". Sample domains end in .example.`);
      const hit = node.match(denyRe);
      assert.ok(!hit, `${where}: "${hit && hit[0]}" is a real or banned name, in "${node}".`);
      assert.ok(
        key === 'prompt' || !FIGURE.test(node),
        `${where}: "${node}" carries a figure. ADR-0006 R6 allows digits only inside a prompt.`
      );
      return;
    }
    if (Array.isArray(node)) return node.forEach((v, i) => walk(v, `${where}[${i}]`, key));
    if (node && typeof node === 'object') for (const [k, v] of Object.entries(node)) walk(v, `${where}.${k}`, k);
  };
  for (const [key, screen] of screens) {
    walk(screen, key);
    assert.ok(!/[0-9%]/.test(screen.caption), `${key}: the caption contains a digit or %, which reads as a result.`);
  }

  // 6. Server-only components, and no timers in the tab state.
  const SCREEN_DIR = 'components/product-screens';
  const CLIENT_OR_TIME = /['"]use client['"]|\buseState\b|\buseEffect\b|\buseReducer\b|\bsetTimeout\b|\bsetInterval\b|\brequestAnimationFrame\b/;
  const literalDomain = /['"`][^'"`\n]*\b[\w-]+\.(com|io|ai|co|net|org|app|uk|de)\b[^'"`\n]*['"`]/i;
  for (const file of walkTsx(SCREEN_DIR)) {
    const code = fs.readFileSync(file, 'utf8').replace(/\/\*[\s\S]*?\*\//g, ' ').replace(/^\s*\/\/.*$/gm, ' ');
    assert.ok(!CLIENT_OR_TIME.test(code), `${file}: client or time-based code under ${SCREEN_DIR}. ADR-0006 R4: nothing here holds state.`);
    assert.ok(!literalDomain.test(code), `${file}: a domain-like string literal. Screen text comes from data/product-screens.`);
  }
  /* SectorTabs holds the active index and nothing else. It needs no effect and
     no observer: an effect or an observer is how a tab advances without the
     user, timer or not (an IntersectionObserver auto-advance passed the old
     timer-only check). Comments are stripped so this note cannot trip it. */
  const tabsSrc = fs
    .readFileSync('components/visual/SectorTabs.tsx', 'utf8')
    .replace(/\/\*[\s\S]*?\*\//g, ' ')
    .replace(/^\s*\/\/.*$/gm, ' ');
  const TAB_MOTION =
    /\b(setTimeout|setInterval|requestAnimationFrame|requestIdleCallback|useEffect|useLayoutEffect|useInsertionEffect|IntersectionObserver|ResizeObserver|MutationObserver)\b/;
  const tabHit = tabsSrc.match(TAB_MOTION);
  assert.ok(
    !tabHit,
    `components/visual/SectorTabs.tsx uses ${tabHit && tabHit[0]}. Tabs change only when the user selects one ` +
    '(ADR-0006 R4: no timers, effects or observers, no auto-rotation).'
  );

  // 7. The badge cannot be dropped.
  const BADGE_TAIL = 'product interface. Sample data, not client results.';
  const badgeFile = `${SCREEN_DIR}/ProvenanceBadge.tsx`;
  const badgeSrc = fs.readFileSync(badgeFile, 'utf8');
  assert.ok(
    badgeSrc.includes('Illustrative') && badgeSrc.includes(BADGE_TAIL),
    `${badgeFile} no longer contains the ADR-0006 R3 badge sentence.`
  );
  for (const file of [...walkTsx('app'), ...walkTsx('components'), ...walkTsx('data'), ...walkTsx('lib')]) {
    if (file === badgeFile) continue;
    assert.ok(
      !fs.readFileSync(file, 'utf8').includes('Sample data, not client results'),
      `${file} contains the badge sentence. It lives in ${badgeFile} only, so it cannot drift.`
    );
  }
  assert.ok(
    /import\s+ProvenanceBadge\s+from\s+['"]\.\/ProvenanceBadge['"]/.test(fs.readFileSync(`${SCREEN_DIR}/ProductScreen.tsx`, 'utf8')),
    'ProductScreen.tsx no longer imports ProvenanceBadge, so a screen could render without its disclosure.'
  );

  // Industry visuals: every locked ICP industry has an icon (brief §2.5).
  const { icpIndustryCards } = require('../data/b2b/icp/index.ts');
  const { INDUSTRY_ICON } = require('../data/b2b/icp/industryVisuals.ts');
  const missingIcon = icpIndustryCards().filter((c) => !INDUSTRY_ICON[c.slug]).map((c) => c.slug);
  assert.deepEqual(missingIcon, [], `data/b2b/icp/industryVisuals.ts has no INDUSTRY_ICON for: ${missingIcon.join(', ')}`);

  const rows = tracker.tabs.reduce((n, t) => n + t.rows.length, 0);
  console.log(
    `✓ product screens: ${screens.length} screens illustrative, ${tracker.tabs.length} tracker tabs, ${rows} rows, ` +
    `no numbers, no real names, badge in one file. ${icpIndustryCards().length} industries have an icon.`
  );
}
