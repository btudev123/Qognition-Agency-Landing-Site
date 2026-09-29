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

/* Raise ONLY in a commit that also authors the pages and names their reviewer. */
const ICP_PUBLISHED_CEILING = 0;

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
for (const industry of ICP_INDUSTRIES) {
  const path = `/industries/${industry.slug}`;
  if (ICP_PUBLISHED_CEILING === 0) {
    assert.ok(
      !sitemapPaths.has(path) || industry.slug === 'financial-services',
      `ICP industry "${industry.slug}" reached the sitemap at ${path} while the ceiling is 0. ` +
      `(financial-services is excepted: legacy owns that URL and published it long before the ICP existed.)`
    );
  }
}

console.log(
  `✓ icp: v${ICP_VERSION} locked, ${ICP_COUNTS.industries} industries / ${ICP_COUNTS.sub_industries} ` +
  `sub-industries / ${ICP_COUNTS.niches} niches / ${ICP_COUNTS.sub_niches} sub-niches walked and ` +
  `reconciled, ${published.length} published (ceiling ${ICP_PUBLISHED_CEILING}).`
);
