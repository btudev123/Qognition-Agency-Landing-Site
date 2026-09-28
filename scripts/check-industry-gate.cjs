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
const { studiesForTopic, getCaseStudy } = require('../data/case-studies/index.ts');
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

/* The blind spot in the set comparison above, closed.
 *
 * data/seoExpansion.ts:736 computes relatedTerms POSITIONALLY:
 *     [all[(index + 7) % all.length], all[(index + 19) % ...], all[(index + 31) % ...]]
 * over the ALREADY-TRUNCATED array. So inserting or removing one upstream row in
 * SERVICES, INDUSTRIES or LOCATIONS renumbers every index and rewires the
 * internal related-links block on all 320 pages. If the change happens to
 * preserve the published slug set, the assertion above passes and a site-wide
 * crawl-graph rewrite ships as a data edit.
 *
 * Found by Nadia on 2026-09-28 reviewing the gate I wrote earlier the same day.
 * The set check was necessary and not sufficient. */
const liveGraph = require('node:crypto').createHash('sha256')
  .update(GLOSSARY_TERMS.map((t) => `${t.slug}>${(t.relatedTerms || []).join(',')}`).join('\n'))
  .digest('hex');
if (snapshot.relatedGraphSha256) {
  assert.equal(
    liveGraph, snapshot.relatedGraphSha256,
    'The /glossary related-links graph changed while the published slug set stayed the same.\n' +
    'relatedTerms is positional, so an upstream row insert or delete rewires the internal links on\n' +
    'all 320 pages without changing which pages exist. That is a site-wide crawl-graph change\n' +
    'disguised as a data edit. If deliberate, re-run `pnpm snapshot:glossary` and say why.'
  );
}

/* ── The proof block on an industry page ─────────────────────────────────────
 *
 * Measured 2026-09-28, before the fix: 8 of 11 industry hubs rendered
 * fox-service-company, a residential HVAC, plumbing and electrical contractor,
 * as their related case study. Law firms, accountants, consultants,
 * manufacturers, industrial trade and waste management all showed a home
 * services contractor as proof of work in their field. /industries/care-homes
 * showed a dental practice; /industries/elder-care showed the HVAC contractor,
 * because its name is "Elder Home Services" and the hvac hint matched on
 * `home service`.
 *
 * CLAUDE.md §11 forbids implying experience in a vertical because a page exists.
 * This implied it through the RENDER, so no rewrite of the page copy could have
 * fixed it, and every industry page was carrying it in production.
 *
 * The mapping is frozen rather than re-derived, for the reason given in
 * lib/industryPublication.ts: a rule derived from the data agrees with the data
 * by construction and gates nothing. Widening a TOPIC_HINTS pattern is the exact
 * edit that caused this, and it must not be possible to make it quietly. */
const EXPECTED_INDUSTRY_PROOF = {
  'law-legal': null,
  'accounting-cpa': null,
  'financial-services': 'alliance-insurance-group',
  consulting: null,
  'real-estate': null,
  manufacturing: null,
  coaching: null,
  'industrial-trade': null,
  'care-homes': null,
  'elder-care': null,
  'waste-management': null,
};
for (const industry of INDUSTRIES) {
  const [resolved] = studiesForTopic(`${industry.name} ${industry.id}`, 1);
  const actual = resolved ? resolved.id : null;
  const expected = EXPECTED_INDUSTRY_PROOF[industry.id];
  assert.equal(
    actual, expected === undefined ? null : expected,
    `/industries/${industry.id} would render case study "${actual}" as proof, expected ` +
    `${expected === undefined ? 'nothing (new industry, no proof approved)' : JSON.stringify(expected)}.\n` +
    `A page must not show a case study from an unrelated vertical: that implies experience we do ` +
    `not have (CLAUDE.md §11) and it does it through the render, where copy cannot correct it.\n` +
    `If this industry genuinely has a matching study, add it here by id in the same commit.`
  );
  if (actual) assert.ok(getCaseStudy(actual), `${industry.id} proof "${actual}" does not resolve`);
}
/* Dangling refs. All 11 industries carried caseStudyRef values pointing at
   studies from the retired era (fintech-scale, saas-brand, retail-ai); none
   resolved. They are removed, and a new one must resolve. */
for (const industry of INDUSTRIES) {
  if (industry.caseStudyRef) {
    assert.ok(
      getCaseStudy(industry.caseStudyRef),
      `${industry.id} has caseStudyRef "${industry.caseStudyRef}" which resolves to nothing.`
    );
  }
}

console.log(
  `\u2713 industry proof: ${Object.values(EXPECTED_INDUSTRY_PROOF).filter(Boolean).length} of ` +
  `${INDUSTRIES.length} hubs render a case study, each from its own vertical.`
);

console.log(
  `\u2713 glossary set: ${live.length} slugs, frozen` +
  (snapshot.relatedGraphSha256 ? ', related-links graph unchanged.' : ' (related graph not yet fingerprinted).')
);
