import type { Benchmark } from './benchmarks';

export type Niche = 'hvac' | 'dental' | 'insurance';
export type ServiceKey = 'ai-seo' | 'ppc' | 'social';
export type EngagementTier =
  | 'Essential'
  | 'Growth'
  | 'Authority'
  | 'Dominance'
  | 'Enterprise'
  | 'Diagnostic';

/**
 * How much of a KPI row is backed by the client's own reporting.
 *
 * `verified`  — `actual` is populated from the client's reporting export. Publishable as a result.
 * `projected` — only baseline/target exist, derived from the cited benchmarks. NOT a reported
 *               result, and must never be rendered as one.
 *
 * A record is only as strong as its weakest KPI. `caseStudyEvidence()` derives the record-level
 * status from its rows so a single unbacked figure cannot be laundered by three good ones.
 */
export type EvidenceStatus = 'verified' | 'projected';

export interface Kpi {
  label: string;
  /** Where the metric started. */
  baseline: string;
  /** Where the programme was targeting. Benchmark-derived. */
  target: string;
  /** Signed delta between baseline and target. */
  change: string;
  /** What the numbers mean — units, scope, denominator. */
  unit: string;
  /**
   * The measured outcome from the client's reporting.
   * Populate this and the row renders as a result. Leave it undefined and the row renders as
   * a target, labelled. There is no third state and no default.
   */
  actual?: string;
}

export interface Phase {
  window: string;
  work: string;
}

export interface Playbook {
  niche: Niche;
  service: ServiceKey;
  /** The one-paragraph argument for why the work is sequenced this way. */
  strategy: string;
  /** What was actually executed. */
  whatWeDid: string[];
  phases: Phase[];
  /** Sales objections this body of work answers. */
  objections: string[];
  /** Evidence the client receives — the substantiation trail behind every figure. */
  proofAssets: string[];
}

export interface CaseStudyImage {
  /** Self-hosted path under /public. */
  src: string;
  /** Describes the photograph, not the client. */
  alt: string;
  /** Pexels attribution — photographer name and photo URL. */
  credit?: { photographer: string; url: string };
}

export interface Faq {
  question: string;
  answer: string;
}

export interface CaseStudy {
  /** URL slug. Stable — changing it breaks links and loses ranking. */
  id: string;
  /** Source sheet identifier, retained for reconciliation against reporting exports. */
  caseId: string;

  client: string;
  domain: string;
  /** "Austin, TX" */
  market: string;
  /** Two-letter code, drives the location hub. */
  state: string;
  /** Full state name for display and hub titles. */
  stateName: string;
  niche: Niche;
  services: ServiceKey[];

  tier: EngagementTier;
  retainerBand: string;

  /** Page H1. One sentence, outcome- or insight-led. */
  headline: string;
  /** Who the client is. Verified from public sources at audit date. */
  snapshot: string;
  /** What we confirmed on the live site. Verified, dated. This is the credibility. */
  startingPosition: string;
  /** The problem in one sentence. */
  coreProblem: string;
  /** Why it was happening, and what it cost. */
  diagnosis: string;
  /** The asset or constraint that made this engagement different. */
  differentiator: string;

  /** Qognition systems used on the engagement. */
  engines: string[];
  kpis: Kpi[];
  /** Keys into BENCHMARKS. */
  benchmarkKeys: string[];

  /** ISO date the site audit was performed. Every verified claim is as-of this date. */
  auditedAt: string;

  image: CaseStudyImage;

  /**
   * Publication gate from the source sheet.
   * `hold` records stay in the data for reconciliation but never reach the published export.
   */
  publishGate: 'publish' | 'hold';
  /** Why a record is held. */
  dataFlag?: string;
  /** Excluded from the library entirely, not merely held. */
  excludeFromLibrary?: boolean;
}

export interface ResolvedCaseStudy extends CaseStudy {
  playbooks: Playbook[];
  benchmarks: Benchmark[];
  evidence: EvidenceStatus;
  faqs: Faq[];
}

/**
 * Record-level evidence status.
 *
 * `verified` only when every KPI row carries an `actual`. One projected row makes the whole
 * record projected — the page then labels its numbers as targets rather than results.
 */
export const caseStudyEvidence = (kpis: readonly Kpi[]): EvidenceStatus =>
  kpis.length > 0 && kpis.every((k) => Boolean(k.actual)) ? 'verified' : 'projected';

export const NICHE_LABEL: Record<Niche, string> = {
  hvac: 'HVAC',
  dental: 'Dental',
  insurance: 'Insurance',
};

export const SERVICE_LABEL: Record<ServiceKey, string> = {
  'ai-seo': 'AI SEO',
  ppc: 'PPC',
  social: 'Social',
};

/** Which spoke page each service hub links out to. */
export const SERVICE_SPOKE_HREF: Record<ServiceKey, string> = {
  'ai-seo': '/marketing/ai-seo',
  ppc: '/marketing/paid-media',
  social: '/marketing/social',
};
