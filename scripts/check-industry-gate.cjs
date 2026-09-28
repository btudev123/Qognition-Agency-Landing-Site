#!/usr/bin/env node
/* Guards the /industries publication gate.
 *
 * lib/industryPublication.ts freezes the 11 industry hubs and 66 sub-industry
 * pages that were live on 2026-09-28. The gate only works while that set stays
 * frozen: the failure mode it exists to prevent is someone adding a data row and
 * an allowlist entry in the same reflex, which reopens the hole silently.
 *
 * So the counts are asserted here. Raising them is allowed. Raising them WITHOUT
 * editing this file is not, which forces the decision to be visible in a diff
 * and to carry a reviewer.
 *
 * It also asserts the thing the operator actually cares about: that the gate
 * changed no live URL. Every allowlisted entity must still resolve to a real row
 * in data/industries.ts, and the sitemap must still hold 4422 entries.
 */
require('./lib/load-typescript.cjs');
const assert = require('node:assert/strict');
const { INDUSTRIES } = require('../data/industries.ts');
const {
  isPublishedIndustry,
  isPublishedSubIndustry,
  PUBLISHED_INDUSTRY_COUNT,
  PUBLISHED_SUB_INDUSTRY_COUNT,
} = require('../lib/industryPublication.ts');
const { routesForSitemap, sitemapIndexes } = require('../lib/sitemap.ts');
const { GLOSSARY_TERMS } = require('../data/seoExpansion.ts');
const fs = require('node:fs');

/* Raise these two numbers only in a commit that also publishes the pages. */
const EXPECTED_INDUSTRIES = 11;
const EXPECTED_SUB_INDUSTRIES = 66;

assert.equal(
  PUBLISHED_INDUSTRY_COUNT, EXPECTED_INDUSTRIES,
  `Published industry count moved to ${PUBLISHED_INDUSTRY_COUNT}. If that is intended, raise ` +
  `EXPECTED_INDUSTRIES in this file in the same commit, with the reviewer named in the message.`
);
assert.equal(
  PUBLISHED_SUB_INDUSTRY_COUNT, EXPECTED_SUB_INDUSTRIES,
  `Published sub-industry count moved to ${PUBLISHED_SUB_INDUSTRY_COUNT}. Same rule.`
);

/* No allowlist entry may be a ghost. An id that no longer exists in the data is
   a 404 in the sitemap, which is worse than an unpublished page. */
const liveIndustries = new Set(INDUSTRIES.map((i) => i.id));
for (const industry of INDUSTRIES) {
  if (!isPublishedIndustry(industry.id)) continue;
  assert.ok(liveIndustries.has(industry.id), `allowlisted industry missing from data: ${industry.id}`);
}
let publishedSubs = 0;
for (const industry of INDUSTRIES) {
  for (const sub of industry.subIndustries) {
    if (isPublishedSubIndustry(industry.id, sub.slug)) publishedSubs += 1;
  }
}
assert.equal(
  publishedSubs, EXPECTED_SUB_INDUSTRIES,
  `${publishedSubs} sub-industries resolve against live data but the allowlist holds ` +
  `${PUBLISHED_SUB_INDUSTRY_COUNT}. An entry is stale or a slug was renamed.`
);

/* The operator's hard constraint, asserted rather than asserted-about. */
const entries = sitemapIndexes.flatMap((g) => routesForSitemap(g));
assert.equal(
  entries.length, 4422,
  `Sitemap is ${entries.length} entries, expected 4422. The industry gate must not change ` +
  `the published URL set; if a wave deliberately added pages, update this number with it.`
);

console.log(
  `✓ industry gate: ${PUBLISHED_INDUSTRY_COUNT} hubs, ${PUBLISHED_SUB_INDUSTRY_COUNT} sub-pages, ` +
  `${entries.length} sitemap entries — frozen set intact.`
);

/* ── The glossary truncation trap ────────────────────────────────────────────
 *
 * Found by negative-testing the industry gate on 2026-09-28: injecting one rogue
 * industry row added four /glossary/* URLs and SILENTLY REMOVED three existing
 * ones. Neither ADR-0007 nor the SEO architecture doc identified this consumer.
 *
 * The mechanism is in data/seoExpansion.ts:
 *
 *   generatedTerms = [...SERVICES, ...INDUSTRIES, ...LOCATIONS]   // in that order
 *   GLOSSARY_TERMS = glossarySource.slice(0, 320)                 // hard cap
 *
 * INDUSTRIES is enumerated BEFORE LOCATIONS, so adding an industry pushes
 * location terms past the cap and off the end. The sitemap total stays the same,
 * which is exactly why nobody noticed: four in, three out, net -1 hidden inside
 * a 4,422-entry file.
 *
 * This matters more than the count suggests. /glossary is the best
 * clicks-per-page programmatic family on the domain (0.25) and held the
 * best-ranking URL the domain has. Dropping members of it to publish an
 * unreviewed industry page is a straight downgrade.
 *
 * The real fix is to stop deriving an indexed URL set from a truncated
 * concatenation. That is a content-model change and belongs to Kyle. Until then
 * this assertion makes the failure loud: any upstream data edit that would move
 * the published slug set fails the build and names the URLs at risk.
 * ────────────────────────────────────────────────────────────────────────── */
const snapshot = JSON.parse(
  fs.readFileSync('docs/repositioning/glossary-published-slugs.json', 'utf8')
);
const live = GLOSSARY_TERMS.map((t) => t.slug);
const frozen = new Set(snapshot.slugs);
const liveSet = new Set(live);
const dropped = snapshot.slugs.filter((s) => !liveSet.has(s));
const added = live.filter((s) => !frozen.has(s));

assert.equal(
  dropped.length, 0,
  `${dropped.length} glossary URL(s) would STOP being published, silently, because a data change ` +
  `upstream pushed them past the 320 cap in data/seoExpansion.ts. These are live indexed URLs on ` +
  `the domain's best programmatic family:\n  ` + dropped.slice(0, 12).join('\n  ') +
  (dropped.length > 12 ? `\n  ...and ${dropped.length - 12} more` : '') +
  `\nIf this is deliberate, re-run node scripts/snapshot-glossary.cjs and say why in the commit.`
);
assert.equal(
  added.length, 0,
  `${added.length} new glossary URL(s) would be published without review:\n  ` +
  added.slice(0, 12).join('\n  ') +
  `\nAdding a row to SERVICES, INDUSTRIES or LOCATIONS publishes glossary pages as a side effect. ` +
  `If intended, re-snapshot and name the reviewer.`
);

console.log(`\u2713 glossary set: ${live.length} slugs, frozen and intact.`);
