/**
 * Third-party benchmark reference table.
 *
 * Every figure here comes from a named, dated, externally published source with a live URL.
 * Case studies cite these by key rather than restating them, so a benchmark is corrected in
 * exactly one place and every page that leans on it updates at once.
 *
 * Rule: nothing enters this table without `source`, `year` and a working `url`.
 * A figure with no provenance is not a benchmark, it is an assertion.
 */

export interface Benchmark {
  /** Stable key referenced from case-study records. */
  key: string;
  /** The figure as published. */
  stat: string;
  /** What the figure actually measures, including sample size where stated. */
  measures: string;
  /** Publication year of the cited study. */
  year: number;
  /** Publishing organisation. */
  source: string;
  /** Live URL to the source. */
  url: string;
}

export const BENCHMARKS: Record<string, Benchmark> = {
  // ── Paid search, cross-industry ────────────────────────────────────────────
  ads_waste: {
    key: 'ads_waste',
    stat: '$1,127/mo',
    measures: 'Average wasted Google Ads spend — over a third of budget (15,666 accounts)',
    year: 2026,
    source: 'WordStream via PPC Land',
    url: 'https://ppc.land/most-google-ads-accounts-waste-1-127-a-month-study-of-15k-accounts-finds/',
  },
  negatives: {
    key: 'negatives',
    stat: '13.0% vs 4.6%',
    measures: 'Conversion rate, accounts using negative keywords vs not; 25% have never added one',
    year: 2026,
    source: 'WordStream via PPC Land',
    url: 'https://ppc.land/most-google-ads-accounts-waste-1-127-a-month-study-of-15k-accounts-finds/',
  },

  // ── AI search / answer engines ─────────────────────────────────────────────
  aeo_median_fin: {
    key: 'aeo_median_fin',
    stat: '22% / 44%',
    measures: 'AI mention rate for Fintech & Finance: median and top quartile, non-branded prompts',
    year: 2026,
    source: 'MaxAEO (vendor benchmark)',
    url: 'https://maxaeo.ai/blog/ai-visibility-benchmarks-2026/',
  },
  aeo_median_local: {
    key: 'aeo_median_local',
    stat: '28% / 55%',
    measures:
      'AI mention rate for Local & Home Services: median and top quartile, non-branded prompts',
    year: 2026,
    source: 'MaxAEO (vendor benchmark)',
    url: 'https://maxaeo.ai/blog/ai-visibility-benchmarks-2026/',
  },
  aio_cited_lift: {
    key: 'aio_cited_lift',
    stat: '+35% / +91%',
    measures: 'Organic and paid CTR lift when your page is cited inside the AI Overview',
    year: 2025,
    source: 'Seer Interactive',
    url: 'https://www.seerinteractive.com/insights/aio-impact-on-google-ctr-september-2025-update',
  },
  aio_ctr: {
    key: 'aio_ctr',
    stat: '-34.5%',
    measures:
      'Click-through drop for the top-ranking page when an AI Overview is present (300,000 keywords)',
    year: 2025,
    source: 'Ahrefs',
    url: 'https://ahrefs.com/blog/ai-overviews-reduce-clicks/',
  },
  earned_media: {
    key: 'earned_media',
    stat: '84%',
    measures: 'Share of AI citations tracing to earned media (25M+ links, 17 industries)',
    year: 2026,
    source: 'Muck Rack',
    url: 'https://muckrack.com/blog/what-is-ai-reading-may-2026',
  },
  freshness: {
    key: 'freshness',
    stat: '25.7%',
    measures:
      'How much fresher AI-cited content is than organic top-10 (1,064 vs 1,432 days, 17M URLs)',
    year: 2026,
    source: 'Ahrefs',
    url: 'https://www.digitalapplied.com/blog/ai-search-citation-ranking-factors-2026-data-study',
  },
  genai_local: {
    key: 'genai_local',
    stat: '45%',
    measures: 'Consumers using generative AI for local business recommendations, up from 6% in 2025',
    year: 2026,
    source: 'BrightLocal Local Consumer Review Survey',
    url: 'https://www.brightlocal.com/research/local-consumer-review-survey/',
  },
  llmstxt_null: {
    key: 'llmstxt_null',
    stat: '97%',
    measures: 'Share of llms.txt files that received zero requests in a month (137,210 domains)',
    year: 2026,
    source: 'Ahrefs',
    url: 'https://ahrefs.com/blog/llmstxt-study/',
  },
  mentions_v_links: {
    key: 'mentions_v_links',
    stat: '0.664 vs 0.218',
    measures: 'Correlation with AI visibility: branded web mentions vs backlinks (75,000 brands)',
    year: 2026,
    source: 'Ahrefs',
    url: 'https://ahrefs.com/blog/ai-overview-brand-correlation/',
  },
  offpage_cites: {
    key: 'offpage_cites',
    stat: '77%',
    measures:
      "Share of AI citations on branded queries coming from off-page sources, not the brand's own site",
    year: 2026,
    source: 'Omniscient Digital (23,000+ citations)',
    url: 'https://www.searchenginejournal.com/ai-overviews-now-answer-most-local-searches-how-to-get-your-business-cited/580757/',
  },
  schema_null: {
    key: 'schema_null',
    stat: 'no lift',
    measures:
      'Controlled test, 1,885 pages adding JSON-LD vs 4,000 controls: AI Overviews -4.6%, ChatGPT +2.2% n.s.',
    year: 2026,
    source: 'Ahrefs',
    url: 'https://ahrefs.com/blog/schema-ai-citations',
  },
  zeroclick: {
    key: 'zeroclick',
    stat: '68.01%',
    measures: 'US Google searches ending without a click, up from 60.45% in 2024',
    year: 2026,
    source: 'Search Engine Land / SparkToro',
    url: 'https://searchengineland.com/google-zero-click-searches-2026-study-479717',
  },

  // ── Local pack ─────────────────────────────────────────────────────────────
  localpack_ctr: {
    key: 'localpack_ctr',
    stat: '17.6%',
    measures: 'Local pack position-one click-through rate (positions 2 and 3: 15.4%, 15.1%)',
    year: 2025,
    source: 'First Page Sage',
    url: 'https://firstpagesage.com/reports/google-click-through-rates-ctrs-by-ranking-position/',
  },
  localpack_factors: {
    key: 'localpack_factors',
    stat: 'Top 4',
    measures:
      '2026 local pack factors: GBP primary category, proximity, keywords in business title, address in search city',
    year: 2026,
    source: 'Whitespark Local Search Ranking Factors',
    url: 'https://whitespark.ca/local-search-ranking-factors/',
  },
  localpack_prev: {
    key: 'localpack_prev',
    stat: '93%',
    measures:
      'Share of local-intent queries still returning a Local Pack; only ~15% trigger an AI Overview',
    year: 2025,
    source: 'Whitespark',
    url: 'https://whitespark.ca/blog/case-study-the-prevalence-of-ai-overviews-in-local-search/',
  },

  // ── Reviews ────────────────────────────────────────────────────────────────
  reviews_20: {
    key: 'reviews_20',
    stat: '47%',
    measures: 'Consumers who will not use a business with fewer than 20 reviews',
    year: 2026,
    source: 'BrightLocal',
    url: 'https://www.brightlocal.com/research/local-consumer-review-survey/',
  },
  reviews_recency: {
    key: 'reviews_recency',
    stat: '74%',
    measures: 'Consumers who want reviews from the last three months; 32% from the last two weeks',
    year: 2026,
    source: 'BrightLocal',
    url: 'https://www.brightlocal.com/research/local-consumer-review-survey/',
  },
  reviews_respond: {
    key: 'reviews_respond',
    stat: '80%',
    measures:
      'More likely to use a business that responds to all reviews; 50% deterred by templated replies',
    year: 2026,
    source: 'BrightLocal',
    url: 'https://www.brightlocal.com/research/local-consumer-review-survey/',
  },
  reviews_stars: {
    key: 'reviews_stars',
    stat: '68% / 31%',
    measures: 'Consumers requiring 4+ stars, and 4.5+ stars (up from 55% and 17% in 2025)',
    year: 2026,
    source: 'BrightLocal',
    url: 'https://www.brightlocal.com/research/local-consumer-review-survey/',
  },

  // ── HVAC ───────────────────────────────────────────────────────────────────
  hvac_book_nonbrand: {
    key: 'hvac_book_nonbrand',
    stat: '37.6%',
    measures: 'HVAC non-branded search lead-to-booked-job rate (vs 55.3% branded)',
    year: 2026,
    source: 'SearchLight Digital',
    url: 'https://searchlightdigital.io/what-is-a-good-cost-per-lead-for-hvac-google-ads/',
  },
  hvac_cpl_blended: {
    key: 'hvac_cpl_blended',
    stat: '$104',
    measures: 'HVAC blended Google Ads cost per lead, all campaign types',
    year: 2026,
    source: 'SearchLight Digital',
    url: 'https://searchlightdigital.io/what-is-a-good-cost-per-lead-for-hvac-google-ads/',
  },
  hvac_cpl_brand: {
    key: 'hvac_cpl_brand',
    stat: '$34',
    measures: 'HVAC branded search cost per lead',
    year: 2026,
    source: 'SearchLight Digital',
    url: 'https://searchlightdigital.io/what-is-a-good-cost-per-lead-for-hvac-google-ads/',
  },
  hvac_cpl_nonbrand: {
    key: 'hvac_cpl_nonbrand',
    stat: '$149',
    measures:
      'HVAC non-branded Google Ads cost per lead (816 contractors, $14.88M spend, 143,008 leads)',
    year: 2026,
    source: 'SearchLight Digital',
    url: 'https://searchlightdigital.io/what-is-a-good-cost-per-lead-for-hvac-google-ads/',
  },
  hvac_lsa_book: {
    key: 'hvac_lsa_book',
    stat: '44.0%',
    measures: 'HVAC Local Services Ads book rate, $2,110 average ticket, 9.55x closed ROAS',
    year: 2026,
    source: 'Valley Marketing Group',
    url: 'https://thevalleymarketinggroup.com/blog/google-lsa-cost-per-lead-home-services-2026/',
  },
  hvac_lsa_cpl: {
    key: 'hvac_lsa_cpl',
    stat: '$51',
    measures: 'HVAC Local Services Ads cost per lead (888 contractors, 126,650 leads)',
    year: 2026,
    source: 'Booked Friday / SearchLight',
    url: 'https://bookedfriday.com/local-services-ads-cost',
  },
  hvac_season: {
    key: 'hvac_season',
    stat: '+266% / +137%',
    measures: "'AC repair' July search volume lift and 'furnace repair' January lift vs baseline",
    year: 2026,
    source: 'Stacker (Ahrefs data)',
    url: 'https://stacker.com/stories/small-business/seasonal-search-shifts-home-services-demand-what-spikes-when-and-how-stay',
  },
  hvac_ticket: {
    key: 'hvac_ticket',
    stat: '$1,205',
    measures: 'Average HVAC repair ticket, up 47% from $818 in 2021 (~2M jobs analysed)',
    year: 2025,
    source: 'Housecall Pro',
    url: 'https://www.housecallpro.com/resources/hvac-industry-trends/',
  },
  calls_unanswered_hs: {
    key: 'calls_unanswered_hs',
    stat: '52% answer rate',
    measures:
      'Home services inbound call answer rate; 55% never ask the caller to book (70M+ calls)',
    year: 2026,
    source: 'Invoca',
    url: 'https://www.invoca.com/reports/the-invoca-call-conversion-benchmarks-report-home-services-2025',
  },

  // ── Dental ─────────────────────────────────────────────────────────────────
  dental_call_conv: {
    key: 'dental_call_conv',
    stat: '55% / 72%',
    measures:
      'Dental call-to-appointment conversion: industry average vs top decile (12.5M interactions)',
    year: 2026,
    source: 'Patient Prism',
    url: 'https://www.patientprism.com/healthcare-call-center-metrics-2026/',
  },
  dental_calls_missed: {
    key: 'dental_calls_missed',
    stat: '30-38%',
    measures:
      'Share of dental practice calls unanswered during business hours; 60-65% are new-patient calls',
    year: 2026,
    source: 'Dental Economics',
    url: 'https://www.dentaleconomics.com/practice/article/55385634/the-economics-of-missed-calls-quantifying-revenue-loss-in-dental-practices',
  },
  dental_cpl: {
    key: 'dental_cpl',
    stat: '$72.97',
    measures:
      'Dental Google Ads cost per lead, $8.00 CPC, 10.67% conversion rate (13,474 US campaigns)',
    year: 2026,
    source: 'WordStream / LocaliQ',
    url: 'https://www.wordstream.com/blog/2026-google-ads-benchmarks',
  },
  dental_cpl_emerg: {
    key: 'dental_cpl_emerg',
    stat: '$75.19',
    measures: 'Emergency dentistry cost per lead, 8.89% conversion rate',
    year: 2025,
    source: 'LocaliQ Healthcare',
    url: 'https://localiq.com/blog/healthcare-search-advertising-benchmarks/',
  },
  dental_cpl_gen: {
    key: 'dental_cpl_gen',
    stat: '$84.77',
    measures: 'General dentistry cost per lead, 7.74% conversion rate',
    year: 2025,
    source: 'LocaliQ Healthcare',
    url: 'https://localiq.com/blog/healthcare-search-advertising-benchmarks/',
  },
  dental_cpl_ortho: {
    key: 'dental_cpl_ortho',
    stat: '$71.52',
    measures: 'Orthodontics cost per lead, 14.21% conversion rate — highest of any dental segment',
    year: 2025,
    source: 'LocaliQ Healthcare',
    url: 'https://localiq.com/blog/healthcare-search-advertising-benchmarks/',
  },
  dental_followup: {
    key: 'dental_followup',
    stat: '36%',
    measures: 'Share of identified lost call opportunities that receive any follow-up',
    year: 2026,
    source: 'Patient Prism',
    url: 'https://www.patientprism.com/healthcare-call-center-metrics-2026/',
  },
  dental_implant: {
    key: 'dental_implant',
    stat: '$2,143 / $15,176',
    measures: 'US average single-tooth implant (before crown) and All-on-4 arch',
    year: 2025,
    source: 'CareCredit / Synchrony ASQ360',
    url: 'https://www.carecredit.com/well-u/health-wellness/dental-implants-cost-dental-implants-financing/',
  },
  dental_leadtime: {
    key: 'dental_leadtime',
    stat: '25 days vs 4.5',
    measures: 'New-patient appointment lead time: average vs top 10%',
    year: 2026,
    source: 'Henry Schein One Catalyst Index',
    url: 'https://www.henryscheinone.com/insights/ebook/2026-catalyst-index/',
  },
  dental_meta: {
    key: 'dental_meta',
    stat: '$76.71 CPL',
    measures:
      'Meta ads dental cost per lead, $9.78 CPC — highest CPC of any industry (avg $27.66 / $1.92)',
    year: 2025,
    source: 'LocaliQ',
    url: 'https://localiq.com/blog/facebook-advertising-benchmarks/',
  },
  dental_newpt_value: {
    key: 'dental_newpt_value',
    stat: '$850-$1,300',
    measures: 'New dental patient first-year production',
    year: 2026,
    source: 'Dental Economics',
    url: 'https://www.dentaleconomics.com/practice/article/55385634/the-economics-of-missed-calls-quantifying-revenue-loss-in-dental-practices',
  },
  dental_newpt_vol: {
    key: 'dental_newpt_vol',
    stat: '46/month',
    measures:
      'Average new patients per practice per month (8,593 practices); 75+/mo practices grow 9.0%',
    year: 2026,
    source: 'Planet DDS',
    url: 'https://www.planetdds.com/wp-content/uploads/2026/05/PDDS-2026-DSO-Outlook-DeepDive-051526.pdf',
  },
  health_aio: {
    key: 'health_aio',
    stat: '11% vs 93%',
    measures: 'AI Overview coverage: local health queries vs conditions/symptoms queries',
    year: 2026,
    source: 'Search Engine Land / BrightEdge',
    url: 'https://searchengineland.com/guide/ai-overviews-ymyl',
  },
  patient_ai: {
    key: 'patient_ai',
    stat: '47% / 36%',
    measures:
      'Patients who used AI to research providers, and who say AI influenced their final choice',
    year: 2026,
    source: 'rater8 Patient Choice Report',
    url: 'https://rater8.com/2026-patient-choice-report/',
  },
  patient_stars: {
    key: 'patient_stars',
    stat: '75% / 44%',
    measures: 'Patients refusing to book below 4.0 stars, and requiring 4.5+',
    year: 2026,
    source: 'rater8 Patient Choice Report',
    url: 'https://rater8.com/2026-patient-choice-report/',
  },
  ba_compliance: {
    key: 'ba_compliance',
    stat: 'HIPAA + FTC',
    measures:
      'Before/after photos need written authorisation naming who/where/how; FTC requires atypical-results disclaimer and material-connection disclosure',
    year: 2025,
    source: 'ByrdAdatto',
    url: 'https://byrdadatto.com/banter/before-after-photos-medical-advertising/',
  },

  // ── Insurance ──────────────────────────────────────────────────────────────
  ins_abandon: {
    key: 'ins_abandon',
    stat: '84%',
    measures: 'Insurance quote-form abandonment rate (desktop completion 47%, mobile 42%)',
    year: 2026,
    source: 'ProPair / Zuko',
    url: 'https://foundrycro.com/blog/insurance-advertising-benchmarks-2026/',
  },
  ins_ai_journey: {
    key: 'ins_ai_journey',
    stat: '29% / 42%',
    measures:
      'Auto & home customers using AI somewhere in the insurance journey; share of those who then purchased',
    year: 2026,
    source: 'J.D. Power',
    url: 'https://www.insurancejournal.com/news/national/2026/08/28/883247.htm',
  },
  ins_aio_comm: {
    key: 'ins_aio_comm',
    stat: '~63%',
    measures: 'Share of commercial insurance queries returning an AI Overview',
    year: 2026,
    source: 'BrightEdge via ALM',
    url: 'https://serps.io/blog/ai-overview-prevalence-by-industry',
  },
  ins_cac: {
    key: 'ins_cac',
    stat: '~$900',
    measures: 'Independent insurance agent customer acquisition cost (vs $792 captive)',
    year: 2026,
    source: 'SimpleSolve via Metricus',
    url: 'https://metricusapp.com/blog/insurance-marketing-executive-benchmarks-2026/',
  },
  ins_cpc: {
    key: 'ins_cpc',
    stat: '$3.39',
    measures: 'Finance & Insurance average CPC — below the $5.42 all-industry average',
    year: 2026,
    source: 'WordStream / LocaliQ',
    url: 'https://www.wordstream.com/blog/2026-google-ads-benchmarks',
  },
  ins_cpl: {
    key: 'ins_cpl',
    stat: '$74.44',
    measures:
      'Finance & Insurance cost per lead; 9.83% CTR — highest of any vertical; 2.64% conversion — near lowest',
    year: 2026,
    source: 'WordStream / LocaliQ',
    url: 'https://www.wordstream.com/blog/2026-google-ads-benchmarks',
  },
  ins_quotes: {
    key: 'ins_quotes',
    stat: '3.5',
    measures:
      'Quotes pulled per auto insurance shopper — an all-time high; 48% of new policies bought online',
    year: 2026,
    source: 'J.D. Power Insurance Shopping Study',
    url: 'https://www.jdpower.com/business/press-releases/2026-us-insurance-shopping-study/',
  },
  ins_retention: {
    key: 'ins_retention',
    stat: '92%',
    measures: 'Median independent agency client retention (95% top quartile)',
    year: 2026,
    source: 'Big I / Reagan Consulting Best Practices',
    url: 'https://www.independentagent.com/news/big-i-and-reagan-consulting-release-2025-best-practices-study/',
  },

  // ── Social ─────────────────────────────────────────────────────────────────
  social_health_eng: {
    key: 'social_health_eng',
    stat: '1.8% / 2.3%',
    measures: 'Health & wellness organic engagement rate, Instagram and TikTok',
    year: 2026,
    source: 'Dash Social',
    url: 'https://www.dashsocial.com/social-media-benchmarks/wellness-industry',
  },
};

/** Resolve a list of benchmark keys to records, dropping any that do not exist. */
export const getBenchmarks = (keys: readonly string[]): Benchmark[] =>
  keys.map((k) => BENCHMARKS[k]).filter((b): b is Benchmark => Boolean(b));

export const ALL_BENCHMARKS: Benchmark[] = Object.values(BENCHMARKS);
