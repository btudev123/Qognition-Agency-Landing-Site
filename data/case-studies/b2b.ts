import type { EvidenceStatus } from './types';

/**
 * Named B2B client programmes with reported funnel results.
 *
 * Operator decision 2026-10-07 (CLAUDE.md authority block, "White-label B2B case studies,
 * named"): written permission is held to name all four clients, and the funnel figures are real
 * results. Operator decision 2026-10-08: each client has confirmed the figures from its own
 * reporting, so they meet /case-studies/methodology's definition of a reported result.
 * Source record: docs/research/2026-10-white-label-case-studies-source.md.
 *
 * WHY A SEPARATE RECORD TYPE. `CaseStudy` in ./types is shaped around a local business audited
 * on a date: a US state, a domain, a starting position, KPI rows with a baseline and a target,
 * and benchmark keys. None of that exists in the source for these four, and filling those fields
 * would mean inventing baselines and domains. These records carry what the source actually holds:
 * a dated reporting window and a count at each stage of the sales funnel. Keeping them out of
 * ALL_CASE_STUDIES also means caseStudyEvidence(), the state hubs, the niche hubs and every
 * studiesForTopic() caller behave exactly as they did for the 45.
 *
 * NOT PUBLISHED, by operator decision, and there are deliberately no fields for them:
 *   - pipeline or deal dollar values (the source calls them "illustrative"),
 *   - organic-session growth (the source calls it a "model"),
 *   - the per-stage conversion rates and the formulas behind each count.
 * They go on when real deal values and analytics exports arrive.
 */

export type FunnelStage =
  | 'qualified-leads'
  | 'sales-accepted'
  | 'meetings-booked'
  | 'meetings-held'
  | 'opportunities';

/** Funnel order. Every page renders the stages in this order and no other. */
export const FUNNEL_STAGES: readonly FunnelStage[] = [
  'qualified-leads',
  'sales-accepted',
  'meetings-booked',
  'meetings-held',
  'opportunities',
];

/**
 * Plain-English names, defined once so all four pages use the same words for the same thing.
 * The trade abbreviations (MQL, SQL) appear once each, inside the meaning, never as a label.
 */
export const FUNNEL_STAGE_LABEL: Record<FunnelStage, { label: string; meaning: string }> = {
  'qualified-leads': {
    label: 'Qualified leads',
    meaning: 'People who matched the target buyer profile and showed interest. Often called marketing-qualified leads (MQLs).',
  },
  'sales-accepted': {
    label: 'Sales-accepted leads',
    meaning: "Qualified leads the client's sales team reviewed and accepted. Often called sales-qualified leads (SQLs).",
  },
  'meetings-booked': {
    label: 'Meetings booked',
    meaning: 'Meetings with buyers put in the diary.',
  },
  'meetings-held': {
    label: 'Meetings held',
    meaning: 'Booked meetings that took place.',
  },
  opportunities: {
    label: 'Sales opportunities',
    meaning: "Potential deals the client's sales team opened.",
  },
};

export type B2BService =
  | 'ai-seo'
  | 'geo'
  | 'seo'
  | 'prompt-research'
  | 'content'
  | 'ppc'
  | 'linkedin-ads'
  | 'account-outreach'
  | 'lead-generation'
  | 'executive-branding';

/** Layer definitions follow CLAUDE.md §1: AI SEO and GEO are different surfaces. */
export const B2B_SERVICE_LABEL: Record<B2BService, { label: string; meaning: string }> = {
  'ai-seo': {
    label: 'AI SEO',
    meaning: "Visibility in Google's AI Overviews and AI Mode.",
  },
  geo: {
    label: 'GEO',
    meaning: 'Visibility in answers from AI assistants such as ChatGPT, Perplexity, Gemini, Claude and Copilot.',
  },
  seo: {
    label: 'SEO',
    meaning: 'Visibility in Google search results.',
  },
  'prompt-research': {
    label: 'Prompt research',
    meaning: 'Finding the questions buyers ask AI assistants, and tracking the answers over time.',
  },
  content: {
    label: 'Expert content',
    meaning: "Pages and a whitepaper written with the client's own specialists.",
  },
  ppc: {
    label: 'PPC',
    meaning: 'Pay-per-click ad management. Here, all paid media ran on LinkedIn.',
  },
  'linkedin-ads': {
    label: 'LinkedIn ads',
    meaning: 'Paid LinkedIn campaigns aimed at specific job roles.',
  },
  'account-outreach': {
    label: 'Account-based outreach',
    meaning: 'Direct outreach to a named list of target companies and the people who buy at each one. Also called account-based marketing (ABM).',
  },
  'lead-generation': {
    label: 'Lead generation and qualification',
    meaning: 'Finding interested buyers, checking their fit, and handing qualified leads to sales.',
  },
  'executive-branding': {
    label: 'Executive and company profiles',
    meaning: "Positioning the company page and the profiles of the client's executives.",
  },
};

export interface PaidMediaFigure {
  label: string;
  /** Display string, already formatted. Currency is always stated (US$). */
  value: string;
  /** Plain-English note on what the figure counts, when the label alone is not enough. */
  note?: string;
}

export interface B2BCaseStudy {
  /** Discriminant against ResolvedCaseStudy. Do not reuse 'b2b' as a `Niche`. */
  kind: 'b2b';
  /** URL slug under /case-studies. Stable: changing it breaks links. */
  id: string;
  client: string;
  /** Country served. A market, never an office (CLAUDE.md §4). */
  country: string;
  /** Regions within the country, only when the source names them. */
  regions?: string;
  /** Short sector label for badges and cards. */
  sector: string;

  /** Page H1. Client first, one stated result. */
  headline: string;
  /** One or two sentences. Meta description, card text and structured-data description. */
  summary: string;
  /** Who the client sells to, and who signs off the purchase. */
  sellsTo: string;
  /** The commercial problem, stated from the documented scope. No invented pain or numbers. */
  problem: string;
  /** What we did. Three to five items. */
  whatWeDid: string[];
  services: B2BService[];
  /** Engagement shape in one sentence. */
  engagement: string;

  /**
   * The reporting window the funnel counts cover, as ISO dates. `end` is absent when the source
   * gives an open window ("to present"); the page then states the date the figures were supplied.
   */
  window: { start: string; end?: string };
  /** ISO date the operator supplied these figures. */
  reportedAt: string;
  /** Who confirmed the figures. Rendered beside every set of numbers. Always B2B_RESULT_SOURCE. */
  source: string;
  /** Count at each funnel stage inside `window`. All five are required. */
  results: Record<FunnelStage, number>;
  /** A paid channel broken out on its own, when the source reports one. Same window. */
  paidMedia?: { channel: string; figures: PaidMediaFigure[] };
}

export interface ResolvedB2BCaseStudy extends B2BCaseStudy {
  evidence: EvidenceStatus;
}

/**
 * The source line beside every set of B2B figures (operator, 2026-10-08). Plain words, and the
 * same words everywhere, so a reader never sees two accounts of where a number came from.
 */
export const B2B_RESULT_SOURCE = "Confirmed by the client's own reporting, for the dates shown.";

/**
 * The footnote under a group of B2B cards (homepage Evidence, and any page reusing that pattern).
 * Shared so a second copy cannot drift: data/servicePages.ts PROOF_LINE_B2B should point here.
 */
export const B2B_PROOF_LINE = "B2B results are confirmed by each client's own reporting, for the dates on each card.";

const SOURCE = B2B_RESULT_SOURCE;
const SUPPLIED = '2026-10-07';

/**
 * Record-level grade for a funnel record. `verified` when every stage carries a count and the
 * window has a start date.
 *
 * Same meaning as caseStudyEvidence() for the 45: `verified` means the figures were confirmed
 * against the client's own reporting for a stated period (/case-studies/methodology). For these
 * four the operator records that confirmation (2026-10-08); there is no per-row `actual` to test,
 * so this checks the record is complete and the source line states the confirmation.
 */
export const b2bEvidence = (study: B2BCaseStudy): EvidenceStatus =>
  Boolean(study.window.start) &&
  study.source === B2B_RESULT_SOURCE &&
  FUNNEL_STAGES.every((stage) => Number.isFinite(study.results[stage]) && study.results[stage] >= 0)
    ? 'verified'
    : 'projected';

export const B2B_RECORDS: B2BCaseStudy[] = [
  {
    kind: 'b2b',
    id: 'falcon-security',
    client: 'Falcon Security',
    country: 'United States',
    sector: 'Enterprise cybersecurity services',
    headline: 'Falcon Security: 114 qualified leads from large US enterprises',
    summary:
      'Named-account outreach and lead generation to security leaders at large US enterprises. 114 qualified leads, 41 meetings booked and 11 sales opportunities.',
    sellsTo:
      'Falcon Security sells cybersecurity services to large US enterprises in banking, healthcare, energy, manufacturing and technology. Its buyers are senior security and IT leaders: chief information security officers (CISOs), chief information officers (CIOs) and heads of IT security.',
    problem:
      'Large enterprises buy security services through a small group of senior people at each company. Falcon Security needed meetings with those people, checked for fit before they reached its sales team.',
    whatWeDid: [
      "Built a list of named US enterprises that fit Falcon Security's services, and identified the security leaders at each one.",
      "Contacted those leaders with Falcon Security's approved expert content, tied to an issue their company faces, and followed up with an offer of a discovery call.",
      "Positioned Falcon Security's company page and its executives' profiles.",
      "Checked every conversation for need, role, company fit and timing, agreed a next step, and passed it to Falcon Security's sales team to accept or decline.",
    ],
    services: ['account-outreach', 'lead-generation', 'executive-branding'],
    engagement: 'Ongoing retainer since 15 September 2025.',
    window: { start: '2025-09-15' },
    reportedAt: SUPPLIED,
    source: SOURCE,
    results: {
      'qualified-leads': 114,
      'sales-accepted': 50,
      'meetings-booked': 41,
      'meetings-held': 33,
      opportunities: 11,
    },
  },
  {
    kind: 'b2b',
    id: 'brixio',
    client: 'Brixio',
    country: 'United Arab Emirates',
    regions: 'Dubai and Abu Dhabi',
    sector: 'Enterprise security and cloud',
    headline: 'Brixio: 92 qualified leads from enterprise security buyers in the UAE',
    summary:
      'AI SEO, GEO, expert content and LinkedIn outreach for an enterprise security and cloud firm in Dubai and Abu Dhabi. 92 qualified leads, 32 meetings booked and 9 sales opportunities.',
    sellsTo:
      'Brixio sells enterprise security and cloud services in the UAE. This programme targeted large organisations in Dubai and Abu Dhabi in banking, aviation, healthcare, energy, telecoms and large holding groups. Its buyers are security, cloud and infrastructure leaders, with procurement involved in the decision.',
    problem:
      'Brixio wanted security and cloud leaders in the UAE to find it when they research suppliers, in Google and in AI assistants such as ChatGPT, and to turn that research into meetings with its team.',
    whatWeDid: [
      "Fixed technical issues that affected how search engines and AI assistants find Brixio's pages, and restructured its service pages.",
      "Wrote expert content with Brixio's specialists, including a whitepaper.",
      "Tracked a fixed set of buyer questions in AI assistants, written without Brixio's name, and measured mentions, cited links and visits separately.",
      'Ran LinkedIn outreach to named companies with technical insights and an offer of a discovery session, then checked each lead for fit before handing it to sales.',
    ],
    services: ['ai-seo', 'geo', 'seo', 'prompt-research', 'content', 'account-outreach', 'lead-generation'],
    engagement: '12-month SEO and content retainer, with lead generation from 3 March 2026. Both ongoing.',
    window: { start: '2026-03-03', end: '2026-09-21' },
    reportedAt: SUPPLIED,
    source: SOURCE,
    results: {
      'qualified-leads': 92,
      'sales-accepted': 39,
      'meetings-booked': 32,
      'meetings-held': 26,
      opportunities: 9,
    },
  },
  {
    kind: 'b2b',
    id: 'talentera',
    client: 'Talentera',
    country: 'Saudi Arabia',
    regions: 'Riyadh, Jeddah and the Eastern Province',
    sector: 'HR and recruitment software',
    headline: 'Talentera: 124 qualified employer leads in Saudi Arabia',
    summary:
      'LinkedIn ads, lead generation and AI SEO for a recruitment software company selling to employers in Saudi Arabia. 124 qualified leads, 41 meetings booked and 10 sales opportunities.',
    sellsTo:
      'Talentera sells recruitment software to employers in Saudi Arabia. This programme targeted firms with steady hiring needs in Riyadh, Jeddah and the Eastern Province, in finance, healthcare, retail and enterprise services. Its buyers are HR directors, heads of talent acquisition and recruitment managers, with IT and procurement involved.',
    problem:
      'Ads and content about recruitment can attract jobseekers as well as employers. Talentera needed leads from employers only, checked before they reached its sales team.',
    whatWeDid: [
      'Ran LinkedIn ads written for specific HR roles, on a US$20,000 media budget over three months. That figure is media spend only, not our fees.',
      "Built content for employers researching applicant tracking systems, and optimised it for Google search and Google's AI Overviews.",
      'Offered demos, and checked every lead as an employer. Candidates and jobseekers were screened out.',
      'Ran direct outreach to target employers alongside the ads.',
    ],
    services: ['linkedin-ads', 'ppc', 'lead-generation', 'ai-seo'],
    engagement: 'Ongoing retainer since 15 June 2026.',
    window: { start: '2026-06-15', end: '2026-09-21' },
    reportedAt: SUPPLIED,
    source: SOURCE,
    results: {
      'qualified-leads': 124,
      'sales-accepted': 52,
      'meetings-booked': 41,
      'meetings-held': 32,
      opportunities: 10,
    },
    paidMedia: {
      channel: 'LinkedIn ads',
      figures: [
        { label: 'Media spend', value: 'US$20,000', note: 'Ad spend only, not agency fees.' },
        { label: 'Clicks', value: '1,667' },
        { label: 'Form submissions', value: '108' },
        { label: 'Valid leads', value: '97', note: 'Duplicates and invalid entries removed.' },
        { label: 'Qualified leads from ads', value: '58', note: 'Included in the 124 qualified leads above.' },
        { label: 'Cost per qualified lead', value: 'US$345' },
      ],
    },
  },
  {
    kind: 'b2b',
    id: 'sophos',
    client: 'Sophos',
    country: 'United States',
    sector: 'Managed detection and response',
    headline: 'Sophos: 111 qualified leads for managed detection and response in the US',
    summary:
      'LinkedIn outreach to 600 target US companies, lead generation, AI SEO and GEO for Sophos managed detection and response. 111 qualified leads, 39 meetings booked and 10 sales opportunities.',
    sellsTo:
      "This programme built US demand for Sophos managed detection and response (MDR): a service in which security specialists watch for threats and respond on a customer's behalf. It targeted US companies in healthcare, financial services, manufacturing and technology. The buyers are CISOs, CIOs and heads of security operations and IT security.",
    problem:
      'Sophos wanted more US companies that were evaluating managed detection and response to talk to its team, without cutting across its existing customers or the partners that resell its services.',
    whatWeDid: [
      'Reached 2,400 decision-makers at 600 target US companies on LinkedIn, with separate messages for executives, security operations teams and IT owners.',
      'Worked on selected pages for buyers researching managed detection and response, with clear technical explanations and the criteria buyers use to compare providers.',
      'Tracked buyer questions in AI assistants, written without the Sophos name, and counted only the visits we could measure on campaign pages.',
      "Checked each lead for current tools, coverage gaps, number of devices and buying timeline, then handed it to Sophos's sales team.",
      'Kept new-customer opportunities separate from existing customers and partner recruitment.',
    ],
    services: ['account-outreach', 'lead-generation', 'ai-seo', 'geo'],
    engagement: 'Ongoing retainer since 1 January 2026.',
    window: { start: '2026-01-01', end: '2026-09-21' },
    reportedAt: SUPPLIED,
    source: SOURCE,
    results: {
      'qualified-leads': 111,
      'sales-accepted': 48,
      'meetings-booked': 39,
      'meetings-held': 32,
      opportunities: 10,
    },
  },
];

// ── Formatting ───────────────────────────────────────────────────────────────

const MONTHS = [
  'January', 'February', 'March', 'April', 'May', 'June',
  'July', 'August', 'September', 'October', 'November', 'December',
];

/** "2026-03-03" -> { day: 3, month: 'March', year: 2026 }. String parsing, so no timezone drift. */
const parts = (iso: string) => {
  const [y, m, d] = iso.split('-').map(Number);
  return { day: d, month: MONTHS[m - 1], year: y };
};

/** "3 March 2026". */
export const formatIsoDate = (iso: string): string => {
  const p = parts(iso);
  return `${p.day} ${p.month} ${p.year}`;
};

/**
 * The reporting window in words: "3 March to 21 September 2026" within one year, both years
 * otherwise. An open window (the source says "to present") renders as "From <start>, as reported
 * on <date supplied>", so the page never implies an end date the source does not give.
 */
export const formatWindow = (study: Pick<B2BCaseStudy, 'window' | 'reportedAt'>): string => {
  const { start, end } = study.window;
  if (!end) return `From ${formatIsoDate(start)}, as reported on ${formatIsoDate(study.reportedAt)}`;
  const a = parts(start);
  const b = parts(end);
  return a.year === b.year
    ? `${a.day} ${a.month} to ${b.day} ${b.month} ${b.year}`
    : `${formatIsoDate(start)} to ${formatIsoDate(end)}`;
};

export const formatCount = (n: number): string => n.toLocaleString('en-US');

/** Market line for cards: "United Arab Emirates (Dubai and Abu Dhabi)". */
export const b2bMarket = (study: Pick<B2BCaseStudy, 'country' | 'regions'>): string =>
  study.regions ? `${study.country} (${study.regions})` : study.country;

/**
 * The two figures a card may show. One or two headline figures per card at most (MARS brief,
 * 2026-10-07): the full funnel lives on the case-study page.
 */
export const B2B_CARD_STAGES: readonly FunnelStage[] = ['qualified-leads', 'opportunities'];
