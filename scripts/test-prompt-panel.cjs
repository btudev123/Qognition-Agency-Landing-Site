#!/usr/bin/env node
/* Invariants for the ICP prompt panel. Implementation: lib/b2b/promptPanel.ts.
 *
 * ────────────────────────────────────────────────────────────────────────────
 * WHAT THIS GUARDS.
 *
 * `docs/seo/b2b-niche-architecture.md` §8.2 assertion 3 requires >=8 distinct
 * prompts per published page, and assertion 4 forbids sharing a prompt string
 * with any other page. The operator supplied two per sub-industry, 682 in all,
 * and nothing at the other three levels. Assertion 23 says where the rest come
 * from:
 *
 *   "Every prompt in a page's observation set is either verbatim from that
 *    sub-industry's `ai_prompts`, or composes a supplied prompt with a
 *    `sub_niches[].name` from an entity beneath the page."
 *
 * So the panel is a DERIVATION, not an authoring task, and the thing that has
 * to be true of a derivation is that it is the same every time it is run. These
 * tests are mostly about that: same entity in, same panel out, every string
 * traceable to two fields of the locked JSON, nothing invented.
 *
 * The panel is FAMILY B throughout. It is what we run and record. It is never
 * what a page targets, and no test here may ever assert a panel string against
 * a title, an H1 or a query.
 * ────────────────────────────────────────────────────────────────────────────
 */
require('./lib/load-typescript.cjs');
const assert = require('node:assert/strict');

const {
  COMPOSITION_JOINER,
  MIN_DISTINCT_PROMPTS,
  assertCompositionJoinerIsUnambiguous,
  composePrompt,
  decomposePrompt,
  panelFor,
} = require('../lib/b2b/promptPanel.ts');
const { ICP_INDUSTRIES, getIcpSubIndustry } = require('../data/b2b/icp/index.ts');

/* The worked example from §3.2 finding 4. 18.02, Specialty, Industrial Cleaning
   & Restoration: two supplied prompts, three niches, twelve sub-niches. */
const SUB_INDUSTRY = '/industries/commercial-and-facility-services/specialty-industrial-cleaning-and-restoration';
const NICHE = `${SUB_INDUSTRY}/cleanroom-cleaning-and-contamination-control`;
const SUPPLIED_A = 'cleanroom cleaning contractors experienced with GMP pharmaceutical facilities';
const SUPPLIED_B = 'who handles large-loss commercial water damage restoration for a hospital';

/* ── 1. The panel resolves, and only for a path the taxonomy holds ────────── */

const panel = panelFor(SUB_INDUSTRY);
assert.ok(panel, 'A real sub-industry path must produce a panel.');
assert.equal(panel.entityPath, SUB_INDUSTRY);
assert.equal(panel.level, 2);

assert.equal(
  panelFor('/industries/not-an-industry/not-a-sub'), undefined,
  'A path the locked taxonomy does not hold produces no panel. Inventing one would invent its prompts.',
);
assert.equal(
  panelFor('/growth/industries/manufacturing'), undefined,
  'Only /industries/* paths are ICP entity paths.',
);

/* ── 2. The supplied prompts appear verbatim, and first ──────────────────── */

const supplied = panel.prompts.filter((entry) => entry.origin === 'supplied');
assert.deepEqual(
  supplied.map((entry) => entry.prompt), [SUPPLIED_A, SUPPLIED_B],
  'Both supplied prompts, byte-identical to icp-taxonomy.json, in the operator\'s order, before anything derived.',
);
assert.deepEqual(
  panel.prompts.slice(0, 2).map((entry) => entry.origin), ['supplied', 'supplied'],
  'Supplied prompts lead the panel. A derived prompt is never presented ahead of the operator\'s own.',
);

/* ── 3. Every derived prompt is a supplied prompt plus an operator name ──── */

for (const entry of panel.prompts) {
  assert.equal(entry.family, 'B', 'Every panel prompt is Family B. There is no Family Q in this panel.');
  assert.ok(entry.shape === 'vendor' || entry.shape === 'problem', 'Assertion 23 requires a shape on every prompt.');
  assert.ok(
    !/—|&mdash;|&#8212;/.test(entry.prompt),
    `Panel prompt has an em dash and prompts render on the page: "${entry.prompt}"`,
  );

  if (entry.origin !== 'composed') continue;

  const parts = decomposePrompt(entry.prompt);
  assert.ok(parts, `A composed prompt must decompose back into its two locked parts: "${entry.prompt}"`);
  assert.equal(parts.supplied, entry.suppliedPrompt, 'The base recovered from the string is the base recorded on the entry.');
  assert.equal(parts.qualifier, entry.qualifierName, 'The qualifier recovered from the string is the sub-niche name recorded on the entry.');
  assert.ok(
    entry.prompt.includes(entry.suppliedPrompt) && entry.prompt.includes(entry.qualifierName),
    'Both locked strings survive composition byte for byte. A reworded prompt is an invented prompt.',
  );
  assert.equal(
    entry.shape, panel.prompts.find((p) => p.origin === 'supplied' && p.prompt === entry.suppliedPrompt).shape,
    'Composition narrows a question, it does not change its shape.',
  );
}

/* ── 4. Distinct by construction, which is what assertion 4 needs ────────── */

const strings = panel.prompts.map((entry) => entry.prompt);
assert.equal(new Set(strings).size, strings.length, 'No prompt may repeat inside one panel.');

const nichePanel = panelFor(NICHE);
assert.ok(nichePanel);
assert.equal(nichePanel.level, 3);
const nicheComposed = nichePanel.prompts.filter((e) => e.origin === 'composed').map((e) => e.qualifierName);
assert.ok(nicheComposed.length > 0, 'The niche has sub-niches, so it has composed prompts.');
assert.ok(
  nicheComposed.includes('Semiconductor fab cleanroom services'),
  'A sub-niche beneath the niche qualifies its panel. This is §3.2 finding 4\'s worked example.',
);
assert.ok(
  !nicheComposed.includes('Tank & vessel cleaning'),
  'A sub-niche under a SIBLING niche is not beneath this page. Assertion 23 says beneath the page, and ' +
  'a prompt about a scope the page does not cover is an observation filed under the wrong entity.',
);

/* ── 5. Deterministic. The whole point. ──────────────────────────────────── */

assert.deepEqual(
  panelFor(SUB_INDUSTRY), panel,
  'Same entity in, same panel out. A panel that drifts between builds cannot be matched to the answer it produced.',
);

/* ── 6. Composition is a joiner, not a rewrite ───────────────────────────── */

assert.equal(
  composePrompt(SUPPLIED_A, 'Semiconductor fab cleanroom services'),
  `${SUPPLIED_A}${COMPOSITION_JOINER}Semiconductor fab cleanroom services`,
);
assert.equal(
  decomposePrompt(SUPPLIED_A), undefined,
  'A verbatim supplied prompt is not a composition and must not decompose into one.',
);

/* ── 7. Capacity is reported, never padded ───────────────────────────────── */

assert.equal(MIN_DISTINCT_PROMPTS, 8, 'Nadia §8.2 assertion 3. Stated once, here.');
assert.ok(
  panel.prompts.length >= MIN_DISTINCT_PROMPTS,
  'This sub-industry has twelve sub-niches, so its panel clears the bar without any authoring.',
);
assert.equal(
  panel.meetsMinimum, true,
  'The panel reports whether it clears assertion 3 rather than leaving the caller to count.',
);

/* A niche whose sub-niche count cannot reach eight reports that honestly. It
   does not borrow a sibling's sub-niche and it does not invent one. */
const thin = panelFor('/industries/emerging-and-micro-niches/ai-implementation-consultancies');
assert.ok(thin);
assert.equal(thin.prompts.length, 7, 'Two supplied plus five sub-niches. Seven, and seven is what it says.');
assert.equal(
  thin.meetsMinimum, false,
  'Seven is below assertion 3. The panel says so; it does not pad itself to eight.',
);

/* ── 8. The exclude option, which is what makes assertion 4 satisfiable ──── */

const withoutChild = panelFor(SUB_INDUSTRY, { exclude: [NICHE] });
assert.ok(withoutChild);
const excludedNames = new Set(withoutChild.prompts.map((e) => e.qualifierName));
assert.ok(
  !excludedNames.has('Semiconductor fab cleanroom services'),
  'A sub-niche under an excluded child contributes no prompt to the parent panel. Without this, a ' +
  'published niche page and its published parent share every composed prompt beneath the niche, ' +
  'which is exactly what §8.2 assertion 4 forbids.',
);
assert.ok(
  excludedNames.has('Tank & vessel cleaning'),
  'Excluding one child leaves the other children\'s sub-niches alone.',
);
assert.equal(
  withoutChild.prompts.length,
  panel.prompts.length - nichePanel.prompts.filter((e) => e.origin === 'composed').length,
  'Exclusion is a clean subtraction: the parent loses exactly the composed prompts the child owns.',
);

/* ── 9. The joiner stays unambiguous against whatever version is locked ── */

assertCompositionJoinerIsUnambiguous(ICP_INDUSTRIES);

/* ── 10. Assertion 23, mechanised over all 341 sub-industry panels ─────── */

let panels = 0;
let totalPrompts = 0;
let short = 0;
for (const industry of ICP_INDUSTRIES) {
  for (const sub of industry.sub_industries) {
    const path = `/industries/${industry.slug}/${sub.slug}`;
    const built = panelFor(path);
    assert.ok(built, `Every sub-industry in the locked file must produce a panel. ${path} did not.`);
    panels += 1;
    totalPrompts += built.prompts.length;
    if (!built.meetsMinimum) short += 1;

    const suppliedSet = new Set(sub.ai_prompts || []);
    const namesBeneath = new Set();
    for (const niche of sub.niches) for (const sn of niche.sub_niches) namesBeneath.add(sn.name);

    const strings = new Set();
    for (const entry of built.prompts) {
      assert.ok(!strings.has(entry.prompt), `${path} repeats a prompt: "${entry.prompt}"`);
      strings.add(entry.prompt);

      if (entry.origin === 'supplied') {
        assert.ok(suppliedSet.has(entry.prompt), `${path} supplied prompt is not verbatim from ai_prompts.`);
        continue;
      }
      const parts = decomposePrompt(entry.prompt);
      assert.ok(parts, `${path} composed prompt does not decompose: "${entry.prompt}"`);
      assert.ok(
        suppliedSet.has(parts.supplied),
        `${path} composed prompt's base is not one of this sub-industry's ai_prompts: "${parts.supplied}"`,
      );
      assert.ok(
        namesBeneath.has(parts.qualifier),
        `${path} composed prompt's qualifier is not a sub_niches[].name beneath the page: "${parts.qualifier}"`,
      );
    }
  }
}
assert.equal(panels, 341, 'One panel per sub-industry.');

/* Determinism across a process boundary would need a second process; within one,
   the strongest available check is that a second build of a panel from a fresh
   call is byte-identical, over the whole level. */
for (const industry of ICP_INDUSTRIES) {
  const path = `/industries/${industry.slug}`;
  assert.deepEqual(panelFor(path), panelFor(path), `${path} is not deterministic.`);
}

console.log(
  `✓ prompt panel: 341 sub-industry panels built, ${totalPrompts} prompts, ${short} below ` +
  `${MIN_DISTINCT_PROMPTS} and reported as such; every composed prompt decomposes to a supplied ` +
  'prompt plus a sub-niche name beneath its page.',
);

console.log(
  `✓ prompt panel: ${panel.prompts.length} prompts for ${SUB_INDUSTRY} (${supplied.length} supplied, ` +
  `${panel.prompts.length - supplied.length} composed), deterministic, every string traceable to ` +
  'icp-taxonomy.json.',
);
