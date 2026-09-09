import { getBenchmarks } from './benchmarks';
import { DENTAL_CASE_STUDIES } from './dental';
import { HVAC_CASE_STUDIES } from './hvac';
import { INSURANCE_CASE_STUDIES } from './insurance';
import { getPlaybooks } from './playbooks';
import {
  caseStudyEvidence,
  NICHE_LABEL,
  SERVICE_LABEL,
  type CaseStudy,
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
  const playbooks = getPlaybooks(study.niche, study.services);
  const firstPhase = playbooks[0]?.phases[0];
  const lastPhase = playbooks[0]?.phases[playbooks[0].phases.length - 1];
  const evidence = caseStudyEvidence(study.kpis);
  const serviceNames = study.services.map((s) => SERVICE_LABEL[s]).join(' and ');

  const resultsAnswer =
    evidence === 'verified'
      ? `${study.kpis
          .map((k) => `${k.label} moved from ${k.baseline} to ${k.actual}`)
          .join('; ')}. Every figure is taken from ${study.client}'s own reporting and is reconcilable against the exports listed under proof.`
      : `The programme was run against four targets: ${study.kpis
          .map((k) => `${k.label} from ${k.baseline} to ${k.target} (${k.change})`)
          .join('; ')}. These are the targets the work was set and measured against, derived from the published category benchmarks cited on this page — not figures reported back from ${study.client}'s systems. Measured results replace them here as reporting is reconciled.`;

  return [
    {
      question: `What was actually wrong at ${study.client}?`,
      answer: `${study.coreProblem} ${study.diagnosis}`,
    },
    {
      question: 'What did you find on the site before starting?',
      answer: `Audited ${new Date(study.auditedAt).toLocaleDateString('en-US', {
        month: 'long',
        year: 'numeric',
      })}: ${study.startingPosition}`,
    },
    {
      question: 'What did you do first?',
      answer: firstPhase
        ? `${firstPhase.window}: ${firstPhase.work} ${playbooks[0].whatWeDid.slice(0, 2).join(' ')}`
        : `The ${serviceNames} work began with a full audit and a rebuild of conversion tracking before any budget moved.`,
    },
    {
      question: 'How long before anything moves?',
      answer: playbooks
        .flatMap((p) => p.phases)
        .map((p) => `${p.window} — ${p.work}`)
        .join(' ')
        .concat(
          lastPhase
            ? ''
            : ' Timelines are set per phase and reported against at each gate.'
        ),
    },
    {
      question: 'What results did this produce?',
      answer: resultsAnswer,
    },
    {
      question: 'Are these numbers guaranteed?',
      answer:
        'No, and any agency that guarantees a number is selling you something. Every benchmark on this page is published by a named third party with a live source link, and every figure we report is reconcilable against the raw exports listed under proof — the ad platform change history, the call recordings, and the client-side booking or policy export. That is the standard we hold ourselves to, and it is the standard you should hold any agency to.',
    },
    {
      question: 'What does an engagement like this cost?',
      answer: `${study.client} runs at the ${study.tier} tier — ${study.retainerBand}, covering ${serviceNames}. Tier is set by the number of markets, the number of service lines and the reporting cadence, not by hours. Scope is agreed before anything is committed.`,
    },
  ];
};

const resolve = (study: CaseStudy): ResolvedCaseStudy => ({
  ...study,
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
 * is keyword-based and deliberately conservative: when nothing matches we return a spread across
 * all three niches rather than silently showing dental studies on an aerospace page.
 *
 * Deterministic — same input, same output, so the internal link graph is stable between builds.
 */
const TOPIC_HINTS: { niche: Niche; patterns: RegExp }[] = [
  { niche: 'hvac', patterns: /hvac|heating|cooling|air condition|plumb|home service|trade|contractor|construction|facilit|property|maintenance/i },
  { niche: 'dental', patterns: /dental|dentist|health|medical|clinic|practice|patient|ortho|care|wellness/i },
  { niche: 'insurance', patterns: /insur|financ|broker|agency|risk|underwrit|bond|claim|benefit/i },
];

export const studiesForTopic = (topic: string, limit = 4): ResolvedCaseStudy[] => {
  const hit = TOPIC_HINTS.find((h) => h.patterns.test(topic));
  if (hit) {
    const matches = byNiche(hit.niche);
    if (matches.length >= limit) return matches.slice(0, limit);
    return [...matches, ...CASE_STUDIES.filter((s) => s.niche !== hit.niche)].slice(0, limit);
  }
  // No signal: one from each niche in turn, so the spread stays representative.
  const spread: ResolvedCaseStudy[] = [];
  for (let i = 0; spread.length < limit && i < 20; i += 1) {
    for (const n of NICHES) {
      const pick = byNiche(n)[i];
      if (pick && spread.length < limit) spread.push(pick);
    }
  }
  return spread;
};

/** The single most striking KPI on a study, for card display. */
export const headlineKpi = (study: ResolvedCaseStudy) =>
  [...study.kpis].sort((a, b) => {
    const mag = (v: string) => Math.abs(parseFloat(v.match(/-?\d+(\.\d+)?/)?.[0] ?? '0'));
    return mag(b.change) - mag(a.change);
  })[0];
