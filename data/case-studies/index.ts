import { getBenchmarks } from './benchmarks';
import CASE_STUDY_IMAGES from './images.json';
import { DENTAL_CASE_STUDIES } from './dental';
import { HVAC_CASE_STUDIES } from './hvac';
import { INSURANCE_CASE_STUDIES } from './insurance';
import { getPlaybooks } from './playbooks';
import {
  caseStudyEvidence,
  NICHE_LABEL,
  SERVICE_LABEL,
  type CaseStudy,
  type CaseStudyImage,
  type Faq,
  type Niche,
  type ResolvedCaseStudy,
  type ServiceKey,
} from './types';

export * from './types';
export { BENCHMARKS, ALL_BENCHMARKS, getBenchmarks, type Benchmark } from './benchmarks';
export { PLAYBOOKS, getPlaybook, getPlaybooks } from './playbooks';

/** Every record, including held ones. Use for reconciliation, never for rendering. */
export const ALL_CASE_STUDIES: CaseStudy[] = [
  ...HVAC_CASE_STUDIES,
  ...DENTAL_CASE_STUDIES,
  ...INSURANCE_CASE_STUDIES,
];

/**
 * Build the FAQ from the record itself.
 *
 * Nothing here is authored per page — every answer is assembled from fields that already exist,
 * which is what keeps 45 FAQ blocks accurate and keeps the FAQPage schema honest.
 */
const buildFaqs = (study: CaseStudy): Faq[] => {
  const evidence = caseStudyEvidence(study.kpis);
  return [
    {
      question: 'Is this a real client programme?',
      answer: `Yes. This is a Qognition client programme for ${study.client}. The targets on this page were set at the start of the engagement, and results are published as client reporting confirms them.`,
    },
    {
      question: 'What problem does the programme address?',
      answer: `${study.coreProblem} ${study.diagnosis}`,
    },
    {
      question: 'Are the figures reported results?',
      answer: evidence === 'verified'
        ? `Yes. Every figure on this page has been reconciled against ${study.client}'s own reporting.`
        : `Not yet. Each figure is a target set at the start of the engagement. A figure becomes a result only when ${study.client}'s own reporting confirms it, and the page then labels it as one.`,
    },
    {
      question: 'What is reviewed before the work starts?',
      answer: 'The audience, service coverage, data access and enquiry process. Technical findings are checked against the live website, and the scope is agreed with the business before implementation.',
    },
    {
      question: 'How is an engagement scoped?',
      answer: 'Scope depends on the buyer problem, existing website, markets and delivery responsibilities. Book a call or send an enquiry to discuss the work relevant to your business.',
    },
  ];
};

/**
 * Pexels photography, one per published study, written by scripts/fetch-case-study-images.mjs.
 * A study missing from the map keeps the placeholder on its record, so a failed fetch degrades
 * to the old image instead of a broken one.
 */
interface PexelsImageEntry {
  src: string;
  width: number;
  height: number;
  alt: string;
  photographer: string;
  photographer_url: string;
  pexels_url: string;
}
const IMAGES: Record<string, PexelsImageEntry | undefined> = CASE_STUDY_IMAGES;

const imageFor = (study: CaseStudy): CaseStudyImage => {
  const photo = IMAGES[study.id];
  if (!photo) return study.image;
  return {
    src: photo.src,
    alt: photo.alt,
    width: photo.width,
    height: photo.height,
    credit: { photographer: photo.photographer, photographerUrl: photo.photographer_url, url: photo.pexels_url },
  };
};

const resolve = (study: CaseStudy): ResolvedCaseStudy => ({
  ...study,
  image: imageFor(study),
  playbooks: getPlaybooks(study.niche, study.services),
  benchmarks: getBenchmarks(study.benchmarkKeys),
  evidence: caseStudyEvidence(study.kpis),
  faqs: buildFaqs(study),
});

/**
 * The published library. 45 records.
 * Held records are filtered here and nowhere else — every consumer reads this export.
 */
export const CASE_STUDIES: ResolvedCaseStudy[] = ALL_CASE_STUDIES.filter(
  (s) => s.publishGate === 'publish' && !s.excludeFromLibrary
).map(resolve);

export const getCaseStudy = (id: string): ResolvedCaseStudy | undefined =>
  CASE_STUDIES.find((s) => s.id === id);

// ── Taxonomy ─────────────────────────────────────────────────────────────────

export const byNiche = (niche: Niche): ResolvedCaseStudy[] =>
  CASE_STUDIES.filter((s) => s.niche === niche);

export const byService = (service: ServiceKey): ResolvedCaseStudy[] =>
  CASE_STUDIES.filter((s) => s.services.includes(service));

export const byState = (state: string): ResolvedCaseStudy[] =>
  CASE_STUDIES.filter((s) => s.state.toLowerCase() === state.toLowerCase());

export const NICHES: Niche[] = ['hvac', 'dental', 'insurance'];
export const SERVICES: ServiceKey[] = ['ai-seo', 'ppc', 'social'];

/** States that actually have published studies, with counts, sorted by volume. */
export const STATES: { code: string; name: string; count: number }[] = Object.values(
  CASE_STUDIES.reduce<Record<string, { code: string; name: string; count: number }>>((acc, s) => {
    acc[s.state] = acc[s.state] ?? { code: s.state, name: s.stateName, count: 0 };
    acc[s.state].count += 1;
    return acc;
  }, {})
).sort((a, b) => b.count - a.count || a.name.localeCompare(b.name));

/**
 * Related studies for the internal-link spine: same niche, different market, preferring an
 * overlapping service. Deterministic — no randomness, so the link graph is stable between builds.
 */
export const relatedCaseStudies = (study: ResolvedCaseStudy, limit = 3): ResolvedCaseStudy[] =>
  CASE_STUDIES.filter((s) => s.id !== study.id && s.niche === study.niche)
    .sort((a, b) => {
      const overlap = (s: ResolvedCaseStudy) =>
        s.services.filter((x) => study.services.includes(x)).length;
      const differentMarket = (s: ResolvedCaseStudy) => (s.market === study.market ? 0 : 1);
      return (
        overlap(b) - overlap(a) ||
        differentMarket(b) - differentMarket(a) ||
        a.client.localeCompare(b.client)
      );
    })
    .slice(0, limit);

export const nicheLabel = (n: Niche) => NICHE_LABEL[n];
export const serviceLabel = (s: ServiceKey) => SERVICE_LABEL[s];

/** Library-level counts, for hub copy. Derived — never hardcode these in a component. */
export const LIBRARY_STATS = {
  total: CASE_STUDIES.length,
  byNiche: NICHES.map((n) => ({ niche: n, label: NICHE_LABEL[n], count: byNiche(n).length })),
  byService: SERVICES.map((s) => ({
    service: s,
    label: SERVICE_LABEL[s],
    count: byService(s).length,
  })),
  states: STATES.length,
  verified: CASE_STUDIES.filter((s) => s.evidence === 'verified').length,
};

/**
 * Pick studies relevant to an arbitrary page topic (an industry name, a location page title).
 *
 * Used by the industry and location page trees, which have no niche field of their own. Matching
 * is keyword-based and deliberately conservative. Since 2026-10-07 it only ever returns studies
 * from B2B_PAGE_NICHES (insurance): see the note on that constant below.
 *
 * Deterministic — same input, same output, so the internal link graph is stable between builds.
 */
const TOPIC_HINTS: { niche: Niche; patterns: RegExp }[] = [
  /* 'trade', 'property', 'facilit', 'construction' and 'maintenance' were removed
     on 2026-09-28. Each matched B2B industries that are not home services, and
     because hvac is first in this list its match won: "Industrial Trade" matched
     on `trade` and "Real Estate" on `property`, so both rendered a residential
     HVAC contractor as their proof. The remaining tokens all name the trade
     itself, which is what a hint is supposed to do. */
  { niche: 'hvac', patterns: /hvac|heating|cooling|air condition|plumb|contractor/i },
  /* 'care' removed with 'home service' above. "Elder Home Services" matched the
     hvac hint on `home service`, and "Care Homes" matched this one on `care`, so
     an elder care provider was shown an HVAC contractor and a care home operator
     was shown a dental practice. A token that appears inside "care homes",
     "urgent care" and "managed care" identifies no niche. */
  { niche: 'dental', patterns: /dental|dentist|orthodont|clinic|patient/i },
  { niche: 'insurance', patterns: /insur|financ|broker|agency|risk|underwrit|bond|claim|benefit/i },
];

/**
 * `fallback` decides what "no keyword match" means, and the two answers are
 * different because the two page types make different claims.
 *
 *   'none' (default) — an INDUSTRY page. The heading says "Related Proof" beside
 *     a named vertical, so a study from another vertical is a claim of
 *     experience we do not have. CLAUDE.md §11. Returns empty; the caller omits
 *     the section.
 *
 *   'spread' — a LOCATION page. A location page asserts no
 *     vertical, so a labelled client programme makes no sector claim. These pages carry internal links to
 *     /case-studies/* and silently dropping them was a regression, not a fix. The spread draws
 *     only from B2B_PAGE_NICHES.
 *
 * Defaulting to 'none' means a new caller has to opt IN to the looser behaviour,
 * which is the right direction for a default in a proof block.
 */
/**
 * The only niches a B2B surface may render. Operator decision 2026-10-07: "Insurance only on B2B
 * pages." HVAC and dental are local consumer services, outside the ICP in CLAUDE.md §2, so they
 * are not proof for a B2B buyer under any heading. They stay on /case-studies and its detail
 * pages, which read CASE_STUDIES / byNiche / relatedCaseStudies and never call studiesForTopic.
 *
 * Every caller of studiesForTopic is a B2B surface (industry hubs, sub-industry pages, location
 * and location x service pages), so the restriction lives here rather than at each call site:
 * a new caller cannot forget it. scripts/check-industry-gate.cjs asserts the output.
 */
export const B2B_PAGE_NICHES: readonly Niche[] = ['insurance'];
const isB2BPageNiche = (n: Niche) => B2B_PAGE_NICHES.includes(n);

export const studiesForTopic = (
  topic: string,
  limit = 4,
  { fallback = 'none' }: { fallback?: 'none' | 'spread' } = {}
): ResolvedCaseStudy[] => {
  /* A hint for a niche that may not render on a B2B page (hvac, dental) is treated as no
     signal, and the result is never padded with another niche: if the eligible pool is
     short, the block is short, and an empty block is omitted by the caller. */
  const hit = TOPIC_HINTS.find((h) => isB2BPageNiche(h.niche) && h.patterns.test(topic));
  if (hit) return byNiche(hit.niche).slice(0, limit);
  /* NO SIGNAL MEANS NO STUDY. This returns empty, and callers render nothing.
   *
   * It used to return "a spread across all three niches". The comment above this
   * function still describes the intent correctly — "rather than silently showing
   * dental studies on an aerospace page" — but the spread did exactly that,
   * because NICHES is ['hvac','dental','insurance'] and at limit 1 the loop
   * always returned the first HVAC record.
   *
   * Measured on 2026-09-28, before the fix: 8 of the 11 industry hub pages
   * rendered fox-service-company, a residential HVAC, plumbing and electrical
   * contractor, as their related case study. Law firms, accountants, consultants,
   * manufacturers, industrial trade and waste management were all shown a home
   * services contractor as proof of our work in their field. /industries/
   * care-homes was shown a dental practice.
   *
   * That is CLAUDE.md §11, which forbids implying experience in a vertical
   * because a page exists, and it was implying it through the render rather than
   * through the copy, so no amount of rewriting the page could have fixed it.
   * docs/seo/b2b-niche-architecture.md rule 6 already says a proof block must
   * resolve to an explicit case-study id rather than a fuzzy match.
   *
   * §4 says omit the section rather than fill it. An empty array is how a
   * template omits a section. Every caller is a .map(), so empty renders nothing;
   * app/industries/[industry]/page.tsx destructures and already guards on
   * undefined. */
  if (fallback === 'none') return [];

  // 'spread': one from each B2B-eligible niche in turn. With insurance the only eligible
  // niche, this is the first `limit` insurance studies.
  const spread: ResolvedCaseStudy[] = [];
  for (let i = 0; spread.length < limit && i < 20; i += 1) {
    for (const n of NICHES.filter(isB2BPageNiche)) {
      const pick = byNiche(n)[i];
      if (pick && spread.length < limit) spread.push(pick);
    }
  }
  return spread;
};

/** The largest-magnitude KPI on a study. While `actual` is empty it is a target, and callers must label it so. */
export const headlineKpi = (study: ResolvedCaseStudy) =>
  [...study.kpis].sort((a, b) => {
    const mag = (v: string) => Math.abs(parseFloat(v.match(/-?\d+(\.\d+)?/)?.[0] ?? '0'));
    return mag(b.change) - mag(a.change);
  })[0];
