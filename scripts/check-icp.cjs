#!/usr/bin/env node
/* Gates the operator-locked ICP taxonomy.
 *
 * ────────────────────────────────────────────────────────────────────────────
 * WHY THIS EXISTS. Nadia found on 2026-09-29 that the taxonomy was imported with
 * 11,561 entities and NOTHING referenced it: no route, no sitemap, no gate.
 * `publishedIcpPaths()` returned empty only because a human typed `return []`,
 * and no assertion held it there. The existing gate's own output was the proof:
 * it reported "15 verticals, 2 routable, 0 published" and did not know 11,561
 * entities existed.
 *
 * That is the same shape as the defect that put 2,161 location pages into the
 * sitemap, and as the /industries hole closed the day before: a data file with
 * no publication concept, where adding a row is indistinguishable from
 * publishing a page. At 11,561 rows it is the largest such surface in the repo.
 *
 * The ceiling is an explicit constant here rather than an implicit `return []`,
 * so raising it is a visible diff that needs a reviewer, not an edit to a
 * function body nobody is watching.
 * ────────────────────────────────────────────────────────────────────────────
 */
require('./lib/load-typescript.cjs');
const assert = require('node:assert/strict');
const {
  ICP_VERSION, ICP_COUNTS, ICP_INDUSTRIES, ICP_RETAINER_BAND,
  allIcpNiches, publishedIcpPaths,
} = require('../data/b2b/icp/index.ts');
const { routesForSitemap, sitemapIndexes } = require('../lib/sitemap.ts');

/* Raise ONLY in a commit that also authors the pages and names their reviewer.
 *
 * 0 -> 8 on 2026-09-29. WAVE 1: industry 19, Environmental, Engineering & Testing
 * (TIC). Two cohorts (`environmental-testing-labs`,
 * `real-estate-and-transaction-due-diligence`), eight pages across all four
 * levels, all eight authored in the same commit and signed off by
 * Prabal (CEO, Qognition Agency) on 2026-09-29.
 *
 * Inside ADR-0008 §6.4 assertion 5: a wave is at most 2 cohorts and at most 25
 * newly published pages. The next wave raises this number by its own size, in
 * its own commit, and never "to match" something else that moved. */
const ICP_PUBLISHED_CEILING = 8;

/* The operator's locked counts. A mismatch means the JSON was edited, swapped or
   truncated, and every downstream count in every doc is then wrong. */
assert.equal(ICP_VERSION, '2.0.0', `ICP version is ${ICP_VERSION}, expected 2.0.0. If the operator bumped it, update this gate in the same commit.`);
assert.equal(ICP_COUNTS.industries, 21, 'industry count moved');
assert.equal(ICP_COUNTS.sub_industries, 341, 'sub-industry count moved');
assert.equal(ICP_COUNTS.niches, 2376, 'niche count moved');
assert.equal(ICP_COUNTS.sub_niches, 8823, 'sub-niche count moved');
assert.equal(ICP_COUNTS.unique_niches, 2371, 'unique-niche count moved');

/* The counts block must agree with the data it describes. The block is the
   operator's; the arrays are what actually renders. */
assert.equal(ICP_INDUSTRIES.length, ICP_COUNTS.industries, 'industries array disagrees with the counts block');
let subs = 0, niches = 0, subNiches = 0;
for (const industry of ICP_INDUSTRIES) {
  for (const sub of industry.sub_industries) {
    subs += 1;
    for (const niche of sub.niches) {
      niches += 1;
      subNiches += (niche.sub_niches || []).length;
    }
  }
}
assert.equal(subs, ICP_COUNTS.sub_industries, `walked ${subs} sub-industries, block says ${ICP_COUNTS.sub_industries}`);
assert.equal(niches, ICP_COUNTS.niches, `walked ${niches} niches, block says ${ICP_COUNTS.niches}`);
assert.equal(subNiches, ICP_COUNTS.sub_niches, `walked ${subNiches} sub-niches, block says ${ICP_COUNTS.sub_niches}`);
assert.equal(allIcpNiches().length, ICP_COUNTS.niches, 'the flattened lookup lost or duplicated a niche');

/* Rule 6: slugs come from the JSON and are never invented or renamed. This does
   not stop a rename, but it stops one that produces an unroutable segment. */
const SLUG = /^[a-z0-9]+(?:-[a-z0-9]+)*$/;
for (const industry of ICP_INDUSTRIES) {
  assert.ok(SLUG.test(industry.slug), `industry slug is not URL-safe: ${industry.slug}`);
  for (const sub of industry.sub_industries) {
    assert.ok(SLUG.test(sub.slug), `sub-industry slug is not URL-safe: ${industry.slug}/${sub.slug}`);
    for (const niche of sub.niches) {
      assert.ok(SLUG.test(niche.slug), `niche slug is not URL-safe: ${sub.slug}/${niche.slug}`);
    }
  }
}

/* Rule 3: the published retainer band. Copy anywhere quoting a floor below this
   contradicts the locked file. */
assert.deepEqual([...ICP_RETAINER_BAND], [3000, 20000], 'the retainer band moved; §2 and every pricing string follow it');

/* THE CEILING. */
const published = publishedIcpPaths();
assert.equal(
  published.length, ICP_PUBLISHED_CEILING,
  `${published.length} ICP paths are published but the ceiling is ${ICP_PUBLISHED_CEILING}.\n` +
  `Raising it is a deliberate act: the same commit must author the pages and name their reviewer.\n` +
  `At 11,561 entities an accidental publication is not a page, it is a family.`
);

/* Nothing from the ICP may reach the sitemap while the ceiling is 0. Asserted
   against the real sitemap rather than trusting the function, because the
   /industries hole was exactly a case of the data and the sitemap disagreeing. */
const sitemapPaths = new Set(sitemapIndexes.flatMap((g) => routesForSitemap(g)).map((e) => e.path));

/* FINANCIAL SERVICES: AN ASSERTED OUTCOME, NOT AN EXCEPTION.
 *
 * This used to read `!sitemapPaths.has(path) || industry.slug === 'financial-services'`,
 * which excused the one sector nobody had ruled on. An `||` in an assertion is a
 * decision somebody deferred.
 *
 * The decision: legacy owns `/industries/financial-services` and keeps it. ICP
 * industry 04 shares the slug and is therefore permanently unroutable at that
 * URL, so it can never enter `publishedIcpPaths()` and the `/industries` entry
 * section renders it as text like every other unpublished sector. The sitemap
 * row at that path is the LEGACY page, which was indexed long before the ICP
 * existed and which rule 5 and the operator's hard constraint both protect.
 *
 * Asserted in both directions, so the day somebody re-points the legacy hub the
 * build says so instead of a reader discovering it in the served HTML. */
const COLLIDING = 'financial-services';
for (const industry of ICP_INDUSTRIES) {
  const path = `/industries/${industry.slug}`;
  if (industry.slug === COLLIDING) {
    assert.ok(
      sitemapPaths.has(path),
      `${path} left the sitemap. Legacy owns that URL and publishes it; the ICP industry of the same ` +
      `slug has never had a page there. If the legacy row was retired, this gate and ADR-0008 §3.4 ` +
      `both need re-deciding rather than updating.`
    );
    continue;
  }
  if (ICP_PUBLISHED_CEILING === 0) {
    assert.ok(
      !sitemapPaths.has(path),
      `ICP industry "${industry.slug}" reached the sitemap at ${path} while the ceiling is 0.`
    );
  }
}

/* ════════════════════════════════════════════════════════════════════════════
   THE ROUTE SURFACE. Added with the four-level route tree.

   Everything above this line gates the DATA. Everything below gates the fact
   that the data has four routes pointed at it now, which is a different and
   larger risk: before the routes existed, `publishedIcpPaths()` returning empty
   was the only thing between 11,561 entities and the sitemap, and it returned
   empty because a human typed `return []`. Now there are four
   `generateStaticParams` and a publication allowlist, and the question is
   whether all of them still agree that the answer is zero.
   ════════════════════════════════════════════════════════════════════════════ */

const fs = require('node:fs');
const {
  resolveIcp, legacyClaimDepth,
  icpIndustryParams, icpSubIndustryParams, icpNicheParams, icpSubNicheParams,
  icpChildren, icpSiblings, icpSitemapPaths, icpPublishedRecords,
  icpAllCrossLinks, icpUnresolvedDedupeRows, ICP_SIBLING_CAP,
} = require('../lib/b2b/icpRegistry.ts');
const {
  ICP_PUBLISHED, ICP_PUBLISHED_COHORTS, ICP_DRAFTS, icpPublishedPaths,
} = require('../lib/b2b/icpPublication.ts');
const { ICP_BODIES } = require('../data/b2b/icp/bodies.ts');
const { INDUSTRIES } = require('../data/industries.ts');

/* ── R1. The two published sets agree. ──────────────────────────────────────
   `publishedIcpPaths()` in data/b2b/icp/index.ts is the operator-facing zero and
   is a literal. `ICP_PUBLISHED` in lib/b2b/icpPublication.ts is what the routes
   actually read. Two sources of truth is normally a defect; here it is
   deliberate, because the literal is what an operator reads and the map is what
   the build reads, and the only thing that makes it safe is this assertion. */
assert.deepEqual(
  [...publishedIcpPaths()], [...icpPublishedPaths()],
  'publishedIcpPaths() in data/b2b/icp/index.ts disagrees with ICP_PUBLISHED in ' +
  'lib/b2b/icpPublication.ts. One was raised without the other, which is exactly the ' +
  'divergence the pair exists to make impossible. Both change in the same commit.'
);
assert.equal(
  ICP_PUBLISHED.size, ICP_PUBLISHED_CEILING,
  `${ICP_PUBLISHED.size} ICP paths are on the publication allowlist but the ceiling is ` +
  `${ICP_PUBLISHED_CEILING}.`
);

/* ── R2. NO UNPUBLISHED ENTITY GENERATES A PARAM.
   dynamicParams is false on all four routes, so the params array IS the served
   URL set. A draft that leaked into it would be a page nobody reviewed, live. */
const params = [
  ...icpIndustryParams().map((p) => [p.industry]),
  ...icpSubIndustryParams().map((p) => [p.industry, p.subIndustry]),
  ...icpNicheParams().map((p) => [p.industry, p.subIndustry, p.niche]),
  ...icpSubNicheParams().map((p) => [p.industry, p.subIndustry, p.niche, p.subNiche]),
];
for (const path of params) {
  const key = path.join('/');
  assert.ok(
    ICP_PUBLISHED.has(key),
    `/industries/${key} is in generateStaticParams but is not on the publication allowlist. ` +
    `dynamicParams is false, so this array is the served URL set: an unpublished entity in it ` +
    `is a live page with no named reviewer.`
  );
  const record = resolveIcp(path);
  assert.ok(record, `/industries/${key} generates a param but resolveIcp returns undefined for it, ` +
    `so the route would 404 on a URL it told Next to prerender. Usually a missing authored body.`);
  assert.equal(record.state, 'published', `/industries/${key} generates a param in state "${record.state}".`);
}
assert.equal(
  params.length, ICP_PUBLISHED_CEILING,
  `The four ICP routes generate ${params.length} params but the ceiling is ${ICP_PUBLISHED_CEILING}. ` +
  `At 11,561 entities an accidental publication is not a page, it is a family.`
);
for (const key of ICP_DRAFTS) {
  assert.ok(
    !params.some((p) => p.join('/') === key),
    `draft path ${key} generated a param. Drafts resolve for review and for this gate; they do not ` +
    `get a URL. See the header of lib/b2b/icpPublication.ts.`
  );
}

/* ── R3. EVERY PUBLISHED ENTITY IS REACHABLE FROM /industries.
   This replaces ADR-0007 §5.2's depth ceiling, which was a proxy for "is there a
   page nobody links to" and does not survive four levels. lib/b2b/graph.ts's
   inboundCount() returns a hardcoded 0 and depthFromRoot() a literal 2 or 3;
   neither is used here, because a reachability walk is the real question.

   The walk starts where a crawler starts. app/industries/page.tsx renders
   `INDUSTRIES.map(...)` over the legacy 11 and links no ICP entity at all, so an
   ICP industry has no inbound link from anywhere indexable. That is ADR-0008
   §7.4 and it is an OPERATOR DECISION that has been open since ADR-0007 §12.
   Until it lands, the first published ICP industry fails this assertion, which
   is the correct and intended outcome: it is better to fail the build than to
   ship a family Google finds only through a sitemap. */
const hubSource = fs.readFileSync('app/industries/page.tsx', 'utf8');
const hubLinksIcp = /icpRegistry|data\/b2b\/icp/.test(hubSource);

const reachable = new Set();
const frontier = [];
if (hubLinksIcp) {
  for (const p of icpIndustryParams()) { reachable.add(p.industry); frontier.push([p.industry]); }
}
while (frontier.length) {
  const path = frontier.pop();
  const record = resolveIcp(path);
  if (!record) continue;
  for (const child of icpChildren(record)) {
    const childPath = [...path, child.slug];
    const key = childPath.join('/');
    if (reachable.has(key)) continue;
    reachable.add(key);
    frontier.push(childPath);
  }
}
for (const record of icpPublishedRecords()) {
  const key = record.path.join('/');
  assert.ok(
    reachable.has(key),
    `/industries/${key} is published but nothing links to it.\n` +
    (hubLinksIcp
      ? `Its parent does not list it. A published page under an unpublished parent is an orphan, ` +
        `and the children block renders published children only (Nadia C6).`
      : `app/industries/page.tsx links the legacy 11 only and no ICP industry, so the whole tree ` +
        `is unreachable from the one page a crawler starts at. That is ADR-0008 §7.4 option A and ` +
        `it is an operator decision, open since ADR-0007 §12. Nothing below level 1 can publish ` +
        `until it lands.`)
  );
}

/* ── R4. Cohorts. ADR-0008 §6.4 assertions 1 and 3. The promotion unit is the
   sub-industry cohort, so a published page outside a declared cohort is a page
   somebody promoted without the review that names the cohort. */
for (const key of ICP_PUBLISHED.keys()) {
  const segments = key.split('/');
  if (segments.length === 1) {
    /* An industry hub is not itself a cohort: it has no sub-industry segment. It
       publishes IN THE SAME WAVE as a cohort beneath it and last in the ordering
       (Nadia §1.7.5), because a hub published before its children is a link
       block with a paragraph on top. So the requirement is that at least one
       cohort under it is declared, which is what makes it a hub rather than a
       stub. */
    assert.ok(
      ICP_PUBLISHED_COHORTS.some((cohort) => cohort.startsWith(`${key}/`)),
      `/industries/${key} is published but no cohort under it is declared in ICP_PUBLISHED_COHORTS. ` +
      `A hub with no published children is a link block with a paragraph on top. Publish the industry ` +
      `in the same wave as its first cohort, and last in that wave.`
    );
    continue;
  }
  const cohort = segments.slice(0, 2).join('/');
  assert.ok(
    ICP_PUBLISHED_COHORTS.includes(cohort),
    `/industries/${key} is published but "${cohort}" is not in ICP_PUBLISHED_COHORTS. The promotion ` +
    `unit is the sub-industry cohort and the cohort line is what a reviewer signed.`
  );
  /* ADR-0008 §6.4 assertion 3, extended down the tree: no page under an
     unpublished ancestor, at any depth. Reachability (R3) checks the link graph;
     this checks the publication chain, and they fail differently. */
  for (let depth = 1; depth < segments.length; depth += 1) {
    const ancestor = segments.slice(0, depth).join('/');
    assert.ok(
      ICP_PUBLISHED.has(ancestor),
      `/industries/${key} is published but its ancestor /industries/${ancestor} is not. Every page in ` +
      `a cohort has an inbound link from inside the cohort or from the level directly above, by ` +
      `construction. An orphan is not representable unless this assertion is removed.`
    );
  }
}
for (const cohort of ICP_PUBLISHED_COHORTS) {
  assert.ok(
    ICP_PUBLISHED.has(cohort),
    `cohort "${cohort}" is declared but its own sub-industry page is not published. No cohort of ` +
    `children under an unpublished parent: every child would be an orphan.`
  );
}

/* ── R4b. SIGN-OFF, AND WHY A NAME IS NOT A REVIEW.
 *
 * `IcpSignOff` in lib/b2b/icpPublication.ts makes any other name a compile
 * error. This is the runtime backstop, because `as IcpReview` defeats a type and
 * a harness in a hurry is exactly where a cast turns up.
 *
 * The failure this exists for, recorded because it happened rather than because
 * it was imagined: on 2026-09-29 a visual-verification harness staged 65 ICP
 * paths as published under `reviewedBy: 'Nadia (search)'`. Nadia had reviewed
 * none of them. Every gate went green, because the gate checked that A reviewer
 * was named and not that THE reviewer had reviewed. A page that looks reviewed
 * is worse than a page that is visibly ungated. */
const SIGN_OFF = 'Prabal (CEO, Qognition Agency)';
for (const [key, review] of ICP_PUBLISHED) {
  assert.ok(
    review && review.reviewedBy && review.reviewedAt,
    `/industries/${key} is published with no reviewer or no review date.`
  );
  assert.equal(
    review.reviewedBy, SIGN_OFF,
    `/industries/${key} is signed off by "${review.reviewedBy}". The only sign-off authority is ` +
    `"${SIGN_OFF}". The agent names in ReviewerName are workflow roles: they record who drafted, ` +
    `searched or brand-checked a page. An agent that drafted a page cannot be its reviewer of record, ` +
    `and a name typed by somebody else is attribution rather than review.`
  );
  assert.ok(
    /^\d{4}-\d{2}-\d{2}$/.test(review.reviewedAt),
    `/industries/${key} has review date "${review.reviewedAt}", which is not a date.`
  );
}

/* ── R4c. NO PLACEHOLDER SURVIVES PROMOTION.
 *
 * `[COPY NEEDED]` is the correct thing to write in a draft and the correct thing
 * to fail a build over in a published one. 20 of the 65 staged pages above were
 * level-4 scope rows reading "[COPY NEEDED] the one fact that separates ... from
 * the other scopes under this niche", which is the template speaking about
 * itself wearing a placeholder. No reviewer makes that publishable. */
const PLACEHOLDER = /\[COPY NEEDED\]|\bTODO\b|\bTBD\b|\bFIXME\b|lorem ipsum/i;
const stringsOf = (value, out = []) => {
  if (typeof value === 'string') out.push(value);
  else if (Array.isArray(value)) for (const item of value) stringsOf(item, out);
  else if (value && typeof value === 'object') for (const item of Object.values(value)) stringsOf(item, out);
  return out;
};
for (const key of ICP_PUBLISHED.keys()) {
  const body = ICP_BODIES.get(key);
  if (!body) continue;
  for (const text of stringsOf(body)) {
    assert.ok(
      !PLACEHOLDER.test(text),
      `/industries/${key} is published but its body still carries a placeholder:\n  "${text.slice(0, 120)}"\n` +
      `A placeholder is the right thing to write in a draft and the wrong thing to publish under any ` +
      `reviewer. Demote to spine, or write the sentence.`
    );
  }
}

/* ── R4d. WAVE SIZE. ADR-0008 §6.4 assertion 5 and ADR-0007 §7, retained.
 *
 * At most 2 cohorts per wave and at most 25 newly published pages, because that
 * is the amount one named human can read in a sitting and put their name on.
 * This gate cannot see a wave boundary, so it asserts the TOTAL against the
 * ceiling and leaves the per-wave split to the ceiling being raised by exactly
 * one wave's size in that wave's commit. What it can assert is that nobody
 * promoted a cohort count that no wave could legally contain. */
assert.ok(
  ICP_PUBLISHED_COHORTS.length <= 2 || ICP_PUBLISHED_CEILING > 25,
  `${ICP_PUBLISHED_COHORTS.length} cohorts are declared. A wave is at most 2 cohorts and at most 25 ` +
  `newly published pages (ADR-0008 §6.4 assertion 5). If this is the cumulative total across several ` +
  `landed waves, raise the ceiling with each wave rather than in one edit.`
);

/* ── R5. The collision surface against the legacy spine, re-measured.
   ADR-0008 §1.4 found exactly one: `financial-services`, at the industry level.
   The whole four-level design rests on it, so it is measured on every build
   rather than trusted, because a v2.1 hand-edit is the only thing that can
   change it and the operator hand-edits that file. */
const legacyIds = new Set(INDUSTRIES.map((i) => i.id));
const legacySubs = new Set(INDUSTRIES.flatMap((i) => i.subIndustries.map((s) => `${i.id}/${s.slug}`)));
const industryCollisions = ICP_INDUSTRIES.filter((i) => legacyIds.has(i.slug)).map((i) => i.slug);
assert.deepEqual(
  industryCollisions, ['financial-services'],
  `the ICP/legacy industry collision set is now [${industryCollisions.join(', ')}]. It was exactly ` +
  `["financial-services"] when ADR-0008 was written and the resolver's branch order is built on that.`
);
let deeperCollisions = 0;
for (const industry of ICP_INDUSTRIES) {
  for (const sub of industry.sub_industries) {
    if (legacyIds.has(sub.slug) || legacySubs.has(`${industry.slug}/${sub.slug}`)) deeperCollisions += 1;
  }
}
assert.equal(deeperCollisions, 0, `${deeperCollisions} ICP sub-industry slug(s) now collide with a legacy row.`);

/* data/industries.ts is exactly two levels deep, which is WHY legacyClaimDepth
   can never return 3 or 4 and why segments 3 and 4 can have no legacy claimant.
   That is structural, and this is the assertion that keeps it structural. */
for (const industry of INDUSTRIES) {
  for (const sub of industry.subIndustries) {
    assert.ok(
      !Object.prototype.hasOwnProperty.call(sub, 'subIndustries'),
      `data/industries.ts has gained a third level at ${industry.id}/${sub.slug}. legacyClaimDepth() ` +
      `returns 0|1|2 on the premise that it cannot, and segments 3 and 4 of every ICP path are ` +
      `currently safe for the same reason. Re-derive ADR-0008 §3.2 before this merges.`
    );
  }
}
assert.equal(legacyClaimDepth(['financial-services']), 1, 'legacy no longer claims its own hub');
assert.equal(
  legacyClaimDepth(['financial-services', 'outsourced-finance-and-risk-advisory']), 0,
  'legacy is claiming a sub-slug it does not hold a row for. "Legacy wins at whatever depth it holds ' +
  'a row, and nowhere below it" is the whole rule; claiming below a row blocks 16 sub-industries.'
);

/* ── R5b. The colliding slug resolves to legacy, and the hub does not link it.
 *
 * Two assertions for one decision, because the decision has two halves and they
 * fail differently. The first says the ICP entity has no page at that URL; the
 * second says the entry section does not advertise one. Before this, the hub
 * linked all 21 sectors unconditionally and this one returned 200 while
 * rendering the legacy page under the ICP taxonomy's name. */
assert.equal(
  resolveIcp([COLLIDING]), undefined,
  `resolveIcp(['${COLLIDING}']) now returns a record. Legacy owns that URL (data/industries.ts) and ` +
  `the longest-legacy-match-first rule must keep returning undefined for it, or the ICP industry ` +
  `page and the legacy page both claim /industries/${COLLIDING}.`
);
assert.ok(
  !publishedIcpPaths().includes(COLLIDING),
  `"${COLLIDING}" is on the ICP published list. It cannot have a page: legacy holds that URL.`
);
{
  const hub = fs.readFileSync('app/industries/page.tsx', 'utf8');
  assert.ok(
    /publishedIcpPaths/.test(hub) && /publishedSectors\.has/.test(hub),
    `app/industries/page.tsx no longer gates its sector anchors on publishedIcpPaths(). Every sector ` +
    `it links unconditionally is a hard 404 under dynamicParams = false until that entity is ` +
    `promoted, and 20 of the 21 were exactly that when this section first shipped.`
  );
  /* Counts anchors instead of pattern-matching around a guard.
   *
   * This was a disjunction whose right-hand side was `hub` containing the gating
   * expression, which the assertion twelve lines above ALREADY REQUIRES. So the
   * left side, the half that actually looks for an ungated anchor, could never
   * decide the result. Owen proved it: he reinstated an unconditional
   * `<Link href={`/industries/${industry.slug}`}>` on all 21 rows, which is the
   * original defect, and all twelve gates exited 0.
   *
   * Third `||` inside an assertion on this project. A disjunction in a gate is
   * almost always one half doing nothing. Count the thing instead. */
  const sectorHrefs = (hub.match(/href={`\/industries\/\$\{industry\.slug\}`}/g) || []).length;
  const gatedHrefs = (
    hub.match(/publishedSectors\.has\(industry\.slug\)\s*\?[\s\S]{0,400}?href={`\/industries\/\$\{industry\.slug\}`}/g) || []
  ).length;
  assert.equal(
    sectorHrefs, gatedHrefs,
    `app/industries/page.tsx has ${sectorHrefs} sector anchor(s) but only ${gatedHrefs} inside the ` +
    `publishedSectors check. An ungated one is a hard 404 under dynamicParams = false until that ` +
    `entity is promoted; 20 of 21 were exactly that when this section first shipped, on a domain ` +
    `with 683 URLs already not indexed.`
  );
}

/* ── R6. Zero duplicate full paths. ADR-0008 §3.5 item 4: 0 today, and this is
   the only gate that can catch a v2.1 hand-edit introducing one. */
const seenPaths = new Set();
let pathCount = 0;
for (const industry of ICP_INDUSTRIES) {
  const add = (p) => {
    assert.ok(!seenPaths.has(p), `duplicate four-level path: ${p}. Rule 6 forbids renaming either side.`);
    seenPaths.add(p); pathCount += 1;
  };
  add(industry.slug);
  for (const sub of industry.sub_industries) {
    add(`${industry.slug}/${sub.slug}`);
    for (const niche of sub.niches) {
      add(`${industry.slug}/${sub.slug}/${niche.slug}`);
      for (const subNiche of niche.sub_niches) add(`${industry.slug}/${sub.slug}/${niche.slug}/${subNiche.slug}`);
    }
  }
}
assert.equal(pathCount, 11561, `walked ${pathCount} paths, expected 11,561 distinct addresses.`);

/* ── R7. The link graph is bounded and deterministic.
   C2: siblings are selected by SLUG, never by array position, because a cap over
   a positionally ordered list is selection by position and that is the mechanism
   that silently rewired 320 glossary pages' internal links. Asserted on every
   published record, and on a synthetic walk of published parents so the rule is
   checked even while the set is empty. */
for (const record of icpPublishedRecords()) {
  const siblings = icpSiblings(record);
  assert.ok(
    siblings.length <= ICP_SIBLING_CAP,
    `/industries/${record.path.join('/')} generates ${siblings.length} sibling links, cap is ${ICP_SIBLING_CAP}.`
  );
  const slugs = siblings.map((s) => s.slug);
  assert.deepEqual(
    slugs, [...slugs].sort(),
    `/industries/${record.path.join('/')} returns siblings out of slug order. Nadia C2: same committed ` +
    `data, byte-identical link graph, every build, on every machine.`
  );
  const children = icpChildren(record);
  assert.ok(
    children.every((c) => c.href),
    `/industries/${record.path.join('/')} renders a child with no href. The children block is ` +
    `published-only (C6): an unpublished entity is invisible, not greyed.`
  );
  assert.ok(
    children.length + siblings.length + 4 <= 40,
    `/industries/${record.path.join('/')} exceeds the 40 in-content internal link ceiling. Above that ` +
    `the page is a directory, and directories are what these pages exist to displace.`
  );
}

/* ── R8. The cross-tree links, counted honestly.
   ADR-0008 §7.3 budgets 18: 5 overlaps and 13 dedupe_log rows. 11 resolve. The
   other 7 dedupe rows name a niche that does not exist in the industry they say
   it was kept in, and the registry refuses to guess which was meant. */
const unresolved = icpUnresolvedDedupeRows();
assert.equal(
  unresolved.length, 7,
  `${unresolved.length} dedupe_log rows do not resolve to a taxonomy path, expected 7 on v2.0.0.\n  ` +
  unresolved.join('\n  ') +
  `\nIf the operator added ids to those rows, lower this number in the same commit. If a MATCHER was ` +
  `added instead, remove it: fuzzy-matching a row to an entity is what Nadia §5.1 rule 6 forbids and ` +
  `rule 6 of the positioning file forbids inventing the id that would fix it.`
);
assert.equal(
  icpAllCrossLinks().length, 16,
  'the resolvable cross-tree link count moved. 5 overlaps generate 2 pointers each plus 6 resolvable ' +
  'dedupe rows = 16 directed links across 11 distinct operator rows.'
);

/* ── R9. Bodies. Right kind for the level, and `scope` names real children. */
for (const [key, body] of ICP_BODIES) {
  const segments = key.split('/');
  assert.ok(segments.length >= 1 && segments.length <= 4, `ICP body key "${key}" is not a 1-to-4 segment path.`);
  const expected = segments.length === 1 ? 'hub' : 'sub-niche';
  assert.equal(
    body.kind, expected,
    `ICP body "${key}" is a "${body.kind}" body at a ${segments.length}-segment path, which needs ` +
    `"${expected}". Level 1 carries no vocabulary and no axes; levels 2 to 4 carry both.`
  );
  assert.ok(
    ICP_PUBLISHED.has(key) || ICP_DRAFTS.has(key),
    `data/b2b/icp/bodies.ts has a body for "${key}" but nothing routable resolves for it. Either the ` +
    `entity is still spine, or a slug changed and the body was left behind.`
  );
  for (const row of body.scope || []) {
    const parent = resolveIcp(segments);
    const names = parent ? require('../lib/b2b/icpRegistry.ts').icpVocabularyRows(parent).map((r) => r.slug) : [];
    assert.ok(
      names.includes(row.slug),
      `ICP body "${key}" has a scope row for "${row.slug}", which is not a child of that entity in ` +
      `icp-taxonomy.json. Rule 6: slugs come from the JSON and are never invented.`
    );
  }
}

/* ── R10. Rule 2. Family B never becomes our target.
   No string from `ai_prompts` or `ppc_keywords` may appear in a title, an H1, a
   meta description, an FAQ question or a page's own buyer question. They are the
   CLIENT'S buyer's language and a page targeting one competes with its own
   prospect. Checked over every authored body, draft included, because catching
   it before promotion is the cheap version. */
const familyB = new Set();
for (const industry of ICP_INDUSTRIES) {
  for (const sub of industry.sub_industries) {
    for (const term of [...(sub.ai_prompts || []), ...(sub.ppc_keywords || [])]) {
      familyB.add(term.toLowerCase());
    }
  }
}
for (const [key, body] of ICP_BODIES) {
  const slots = [
    ['metaDescription', body.metaDescription],
    ['buyerQuestion', body.buyerQuestion],
    ['snapshotQuestion', body.snapshotQuestion],
    ...body.faqs.map((f, i) => [`faqs[${i}].question`, f.question]),
  ];
  for (const [slot, text] of slots) {
    const lower = String(text).toLowerCase();
    for (const term of familyB) {
      assert.ok(
        !lower.includes(term),
        `ICP body "${key}" ${slot} contains the Family B string "${term}".\n` +
        `That is the CLIENT's buyer's language, from ai_prompts or ppc_keywords. A page that targets ` +
        `one competes with its own prospect and lies to the model about what the page is. ` +
        `Positioning rule 2, Theo §1.1. It may appear in the observed-answer table and in prose that ` +
        `attributes it to the client's buyer, and nowhere else.`
      );
    }
  }
}

/* ── R10b. THE COPY RULES, WHICH THIS FAMILY WAS NOT UNDER UNTIL WAVE 1.
 *
 * `scripts/check-b2b.cjs` holds six copy assertions: no em dash, a 160-character
 * meta description, a 60-word opener, Ruth's four-element provenance unit, a
 * 5-gram uniqueness bar and a boilerplate ceiling. Every one of them walks
 * `B2B_BODIES`, which is the 15-entry SPINE map. `ICP_BODIES` is a different map
 * with a different key shape, so until this block existed NONE of those rules
 * applied to the four-level family, and the family is the one with 11,561
 * entities in it.
 *
 * That gap was invisible while `ICP_BODIES` was empty and became load-bearing
 * the moment wave 1 put eight bodies in it. It is the same shape as every other
 * defect this project has recorded: a rule that exists, aimed at the smaller of
 * two surfaces. Written here rather than in check-b2b.cjs because this file owns
 * the ICP family and check-b2b.cjs owns the spine.
 *
 * Deliberately NOT extracted into a shared module. The two maps differ in key
 * shape and in which level carries `vocabulary`, and a shared helper would have
 * to branch on that, which is how one of the two branches quietly stops being
 * exercised. Two explicit copies, both short, both read by whoever edits the
 * family they gate. */
{
  const icpStrings = (value, out = []) => {
    if (typeof value === 'string') out.push(value);
    else if (Array.isArray(value)) for (const item of value) icpStrings(item, out);
    else if (value && typeof value === 'object') for (const item of Object.values(value)) icpStrings(item, out);
    return out;
  };

  const EM_DASH = /—|&mdash;|&#8212;/;
  for (const [key, body] of ICP_BODIES) {
    for (const text of icpStrings(body)) {
      assert.ok(
        !EM_DASH.test(text),
        `/industries/${key} has an em dash in rendered copy: "${text.slice(0, 100)}". CLAUDE.md §10 ` +
        `bans them by name. Use a colon, a full stop or brackets.`
      );
    }

    assert.ok(
      body.metaDescription.length <= 160,
      `/industries/${key} metaDescription is ${body.metaDescription.length} characters. Search ` +
      `engines truncate around 160, so everything past that is written for nobody.`
    );
    const words = body.opener.trim().split(/\s+/).length;
    assert.ok(
      words <= 60,
      `/industries/${key} opener is ${words} words against a 60-word ceiling ` +
      `(docs/seo/b2b-niche-architecture.md §4.1 block 1). It has to be extractable whole.`
    );
  }

  /* Ruth's provenance unit, same two shapes as on the spine. A figure in
     `facts[].claim` gets publisher, url and accessedAt structurally from
     FactsBlock and therefore needs only the sample statement in the string. A
     figure anywhere else renders as bare prose and needs all four. */
  const FIGURE = /\b\d+(?:\.\d+)?\s?%|\b\d+(?:\.\d+)?\s+out of\s+\d+/;
  const SAMPLE_CLAUSE =
    /does not state (?:its |the )?sample size|surveyed \d|sample of \d|\bn\s*=\s*\d|polled \d|respondents|panel|clickstream|\b(?:million|billion)\b.{0,30}\b(?:lines|users?|panel|records?|sessions?)/i;

  for (const [key, body] of ICP_BODIES) {
    for (const fact of body.facts) {
      if (!FIGURE.test(fact.claim)) continue;
      assert.ok(
        SAMPLE_CLAUSE.test(fact.claim),
        `/industries/${key}: a fact carries a figure with no sample statement.\n  ${fact.claim.slice(0, 110)}\n` +
        `FactsBlock renders publisher, url and accessedAt and never a sample size, so the claim has to ` +
        `state the sample or say the publisher does not give one. All four elements ship or none does.`
      );
    }
    const walkProse = (node, where) => {
      if (typeof node === 'string') {
        if (!FIGURE.test(node)) return;
        const hasPublisher =
          /report|study|research|survey|published by|,\s*20\d\d/i.test(node) ||
          /\b[A-Z][A-Za-z]{2,}\s+(?:analysed|analyzed|surveyed|found|reports?|records?|published)\b/.test(node);
        const hasDate = /accessed on|\b20\d\d\b/.test(node);
        assert.ok(
          hasPublisher && hasDate && SAMPLE_CLAUSE.test(node),
          `/industries/${key} ${where}: a figure in bare prose is missing part of its provenance.\n` +
          `  ${node.slice(0, 110)}\n  publisher: ${hasPublisher} | date: ${hasDate} | sample: ${SAMPLE_CLAUSE.test(node)}\n` +
          `Prose carries no structured source beside it. If the figure cannot carry all four elements, ` +
          `move it into facts[] or cut it.`
        );
        return;
      }
      if (Array.isArray(node)) return node.forEach((v, i) => walkProse(v, `${where}[${i}]`));
      if (node && typeof node === 'object') {
        for (const [k, v] of Object.entries(node)) {
          if (k === 'facts') continue;
          walkProse(v, `${where}.${k}`);
        }
      }
    };
    walkProse(body, 'body');
  }

  /* Uniqueness and boilerplate, on the same normalisation the spine uses: the
     entity's own name substituted out, so "PFAS" versus "Phase I" cannot be the
     thing making two pages look different. */
  const icpNameFor = (key) => {
    const record = resolveIcp(key.split('/'));
    if (!record) return key.split('/').pop();
    if (record.level === 'industry') return record.industry.name;
    if (record.level === 'sub-industry') return record.sub.name;
    if (record.level === 'niche') return record.niche.name;
    return record.subNiche.name;
  };

  const normalise = (body, name) => {
    const text = [
      body.buyerQuestion, body.opener, body.whyTheAnswerIsLost, body.snapshotQuestion,
      ...body.buyers.flatMap((b) => [b.title, b.researches]),
      ...body.facts.map((f) => f.claim),
      ...body.faqs.flatMap((f) => [f.question, f.answer]),
      ...(body.vocabulary ?? []).flatMap((v) => [v.term, v.issuedBy, v.gates]),
      ...(body.comparisonAxes ?? []).flatMap((a) => [a.axis, a.whatBuyersAsk]),
      ...(body.scope ?? []).map((r) => r.distinguishes),
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

  const icpDocs = [...ICP_BODIES].map(([key, body]) => ({ key, text: normalise(body, icpNameFor(key)) }));
  for (const a of icpDocs) {
    for (const b of icpDocs) {
      if (a.key >= b.key) continue;
      const overlap = jaccard(shingles(a.text), shingles(b.text));
      assert.ok(
        overlap < 0.6,
        `/industries/${a.key} and /industries/${b.key} share ${(overlap * 100).toFixed(1)}% of their ` +
        `5-word shingles once the entity name is substituted out. CLAUDE.md §7 wants >=40% unique ` +
        `against the closest sibling. Reaching for the threshold is not the fix.`
      );
    }
  }

  const runCount = new Map();
  for (const doc of icpDocs) {
    const seen = new Set();
    const words = doc.text.split(' ');
    for (let i = 0; i + 12 <= words.length; i += 1) {
      const run = words.slice(i, i + 12).join(' ');
      if (seen.has(run)) continue;
      seen.add(run);
      runCount.set(run, (runCount.get(run) ?? 0) + 1);
    }
  }
  const boilerplate = [...runCount.entries()].filter(([, n]) => n > 3);
  assert.equal(
    boilerplate.length, 0,
    `${boilerplate.length} twelve-word run(s) appear verbatim in more than three ICP bodies:\n  ` +
    boilerplate.slice(0, 5).map(([r, n]) => `(${n}x) "${r}"`).join('\n  ')
  );

  /* Nadia §4.1: no vocabulary term on more than 25% of the pages in the family.
   *
   * WITH A FLOOR OF 2, AND THE FLOOR IS THE ARGUABLE PART SO IT IS WRITTEN DOWN.
   * Her percentage is calibrated for a family of hundreds, where 25% means
   * eighty-odd pages and a term reaching that many is furniture. Applied
   * literally to the eight pages that exist today it means at most one, which
   * would forbid ISO/IEC 17025 appearing on both a laboratories page and a page
   * about the laboratories underneath it. Both genuinely sit on that standard,
   * so forbidding it is a false positive rather than a finding, and a gate that
   * starts red is a gate people learn to route around.
   *
   * Two is the floor because two is not a pattern. The percentage takes over at
   * 8 bodies and above, which is where the rule was aimed. If a later wave wants
   * the literal reading, raising the floor is a one-line change with a reviewer
   * on it, which is the point of writing the number here rather than inlining it. */
  const termPages = new Map();
  for (const [key, body] of ICP_BODIES) {
    for (const v of body.vocabulary ?? []) {
      const t = v.term.toLowerCase();
      termPages.set(t, (termPages.get(t) ?? new Set()).add(key));
    }
  }
  const vocabBodies = [...ICP_BODIES.values()].filter((b) => b.vocabulary).length;
  const VOCAB_FLOOR = 2;
  const vocabCap = Math.max(VOCAB_FLOOR, Math.floor(vocabBodies * 0.25));
  for (const [term, pages] of termPages) {
    assert.ok(
      pages.size <= vocabCap,
      `vocabulary term "${term}" appears on ${pages.size} of ${vocabBodies} ICP bodies carrying a ` +
      `vocabulary block, over the cap of ${vocabCap}. A term on a quarter of the family is ` +
      `furniture rather than vocabulary, and furniture belongs in the template.\n  ` +
      [...pages].sort().map((k) => `/industries/${k}`).join('\n  ')
    );
  }
}

/* ── R11. Nothing from the ICP reaches the sitemap while the ceiling is 0. */
assert.equal(
  icpSitemapPaths().length, ICP_PUBLISHED_CEILING,
  `${icpSitemapPaths().length} ICP paths reached the sitemap but the ceiling is ${ICP_PUBLISHED_CEILING}.`
);
if (ICP_PUBLISHED_CEILING === 0) {
  /* Belt and braces while the ceiling is 0: assert against the REAL sitemap
     rather than trusting icpSitemapPaths(), because the /industries hole was
     exactly a case of the data and the sitemap disagreeing. Above zero this
     loop has nothing to say and the equality assertion above is the check. */
  for (const key of seenPaths) {
    if (key.split('/').length < 2) continue;
    assert.ok(
      !sitemapPaths.has(`/industries/${key}`),
      `ICP entity "${key}" reached the sitemap at /industries/${key} while the ceiling is 0.`
    );
  }
} else {
  /* Above zero, every published non-duplicate path must BE in the sitemap. The
     failure this catches is the mirror of the one above and it is the one Owen
     found on the spine: a page that is index:true, absent from the sitemap and
     absent from every internal link, with every gate green. */
  for (const record of icpPublishedRecords()) {
    if (record.canonicalPath) continue;
    assert.ok(
      sitemapPaths.has(record.href),
      `${record.href} is published and indexable but absent from the XML sitemap.`
    );
  }
}

console.log(
  `✓ icp routes: 4 levels wired, ${pathCount} addressable, ${params.length} params generated ` +
  `(ceiling ${ICP_PUBLISHED_CEILING}), ${ICP_BODIES.size} bodies, ${icpAllCrossLinks().length} cross-tree ` +
  `links from 11 of 18 operator rows, ${unresolved.length} dedupe rows unresolved and named.` +
  (hubLinksIcp ? '' : '\n  BLOCKER: app/industries/page.tsx links no ICP industry (ADR-0008 §7.4, operator decision). Nothing can publish until it does.')
);

console.log(
  `✓ icp: v${ICP_VERSION} locked, ${ICP_COUNTS.industries} industries / ${ICP_COUNTS.sub_industries} ` +
  `sub-industries / ${ICP_COUNTS.niches} niches / ${ICP_COUNTS.sub_niches} sub-niches walked and ` +
  `reconciled, ${published.length} published (ceiling ${ICP_PUBLISHED_CEILING}).`
);
