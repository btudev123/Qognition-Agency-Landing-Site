import type { CaseStudy } from './types';

/**
 * Insurance engagements — 6 published, 4 held.
 *
 * The four held records are retained deliberately rather than deleted, per the source sheet:
 * two domains now redirect elsewhere, one is a dormant carrier domain, and one is a carrier
 * rather than an agency. They stay in the data so the book reconciles against reporting, and
 * they never reach the published export.
 */

const IMG = {
  office: {
    src: '/case-studies/insurance-office.jpg',
    alt: 'Insurance agent reviewing policy documents with a client across a desk',
  },
  commercial: {
    src: '/case-studies/insurance-commercial.jpg',
    alt: 'Commercial building exterior on an overcast day',
  },
  paperwork: {
    src: '/case-studies/insurance-paperwork.jpg',
    alt: 'Policy paperwork and a calculator on a desk',
  },
} as const;

export const INSURANCE_CASE_STUDIES: CaseStudy[] = [
  // ── Colorado ───────────────────────────────────────────────────────────────
  {
    id: 'alliance-insurance-group',
    caseId: 'QA-CO-INSU-11',
    client: 'Alliance Insurance Group',
    domain: 'allinsgrp.com',
    market: 'Colorado & Florida',
    state: 'CO',
    stateName: 'Colorado',
    niche: 'insurance',
    services: ['ai-seo'],
    tier: 'Growth',
    retainerBand: '$3,000/mo',
    headline: 'Two states, no addresses, and an https that downgrades itself',
    snapshot:
      'Independent agency running employee benefits, group health and business insurance alongside payroll, HR and PEO services, with offices in Colorado and Florida.',
    startingPosition:
      'Zywave agency template with a blog, quote form, per-line pages and location pages. No street addresses published for either office — phone numbers only. Inner pages issue an https to http 302 redirect, producing an insecure canonical.',
    coreProblem:
      'An agency selling employee benefits to employers published no verifiable business address, and its own pages downgraded from https to http.',
    diagnosis:
      'For a benefits and PEO buyer, an unverifiable address is a credibility problem before it is an SEO one. It is also a hard blocker on local visibility: address in the search city is a top-four local pack factor and NAP consistency is foundational to entity resolution. The https downgrade compounds it — browsers flag it, and it fragments the canonical.',
    differentiator:
      'Benefits, payroll and PEO alongside P&C is an unusual and genuinely valuable combination. It was being marketed as a list rather than as the integrated offer it is.',
    engines: ['Scriblr for AI citation tracking', 'LinkersPro for earned mention acquisition'],
    kpis: [
      { label: 'AI assistant mention rate', baseline: '10%', target: '23%', change: '+13 pts', unit: 'share of prompts naming the agency, across 4 assistants; 22% category median' },
      { label: "Local Pack coverage on '[line] insurance [city]'", baseline: '26%', target: '50%', change: '+92%', unit: 'share of grid points in the top 3' },
      { label: 'Non-branded quote requests', baseline: 'index 100', target: 'index 150', change: '+50%', unit: 'indexed to engagement start = 100' },
      { label: 'Commercial-line enquiry share', baseline: '18%', target: '34%', change: '+16 pts', unit: 'share of enquiries from commercial lines' },
    ],
    benchmarkKeys: ['ins_aio_comm', 'aeo_median_fin', 'earned_media', 'ins_ai_journey', 'localpack_factors'],
    auditedAt: '2026-09-01',
    image: IMG.office,
    publishGate: 'publish',
  },
  {
    id: 'a-citywide-insurance',
    caseId: 'QA-CO-INSU-13',
    client: 'A CityWide Insurance',
    domain: 'acitywide.com',
    market: 'Denver, CO',
    state: 'CO',
    stateName: 'Colorado',
    niche: 'insurance',
    services: ['ppc', 'ai-seo'],
    tier: 'Dominance',
    retainerBand: '$8,500/mo',
    headline: 'Four Denver offices, one contact page, zero location pages',
    snapshot:
      'Family-owned Denver-metro independent agency with over 25 years in non-standard auto — SR22 filed same day, DUI-related coverage, plus home, renters, motorcycle, RV and boat. Bilingual. Progressive and Safeco appointed. Four active offices: Federal Boulevard and Leetsdale in Denver, East Colfax in Aurora, and Pecos in Westminster.',
    startingPosition:
      'Built on Wix. No blog. No per-line pages. No location pages — all four offices sit on a single contact page. Payment page only, no client portal. A closed South Broadway office is still listed.',
    coreProblem:
      'Four physical locations across the Denver metro were sharing one page, in the one insurance niche where physical proximity genuinely drives the purchase.',
    diagnosis:
      'SR22 is walk-in, same-day, urgent business — proximity is the buying criterion. Four offices with no location pages means four local pack opportunities being contested with zero local signal. Proximity and address-in-city are two of the top four local pack ranking factors, and the agency had voluntarily forfeited both across every one of its markets.',
    differentiator:
      "Non-standard auto and SR22 is a defensible niche most agencies won't touch, in a bilingual metro, with four physical locations. Structurally the largest untapped opportunity in the insurance book.",
    engines: [
      'M.A.R.S. for quote routing, speed-to-lead response and bind attribution',
      'Scriblr for AI citation tracking',
      'LinkersPro for earned mention acquisition',
    ],
    kpis: [
      { label: 'Cost per quote request', baseline: '$135', target: '$92', change: '-32%', unit: 'USD, non-branded paid search' },
      { label: 'Quote-form completion rate', baseline: '12.0%', target: '22.0%', change: '+10 pts', unit: 'percentage of started forms completed, against a 16% category baseline' },
      { label: 'Cost per bound policy', baseline: '$1,124', target: '$417', change: '-63%', unit: 'USD per acquired customer' },
      { label: 'AI assistant mention rate', baseline: '4%', target: '19%', change: '+15 pts', unit: 'share of prompts naming the agency, across 4 assistants; 22% category median' },
    ],
    benchmarkKeys: ['ins_cpl', 'ins_abandon', 'ins_quotes', 'ins_cac', 'ins_aio_comm', 'aeo_median_fin', 'localpack_factors', 'ins_retention'],
    auditedAt: '2026-09-01',
    image: IMG.paperwork,
    publishGate: 'publish',
  },

  // ── Virginia ───────────────────────────────────────────────────────────────
  {
    id: 'gengler-insurance-agencies',
    caseId: 'QA-VA-INSU-10',
    client: 'Gengler Insurance Agencies',
    domain: 'ginsurance.net',
    market: 'Fairfax, VA',
    state: 'VA',
    stateName: 'Virginia',
    niche: 'insurance',
    services: ['ai-seo', 'ppc'],
    tier: 'Dominance',
    retainerBand: '$8,500/mo',
    headline: 'Forty years, four offices, two states — on an SMB website builder',
    snapshot:
      'Independent agency operating over 40 years across Fairfax, Fredericksburg and Woodbridge in Virginia plus a Texas office. Auto, homeowners, business, flood, life and health, with a carrier roster built heavily around non-standard auto — National General, Kemper, Dairyland, The General, Gainsco, Foremost, Progressive and Mercury.',
    startingPosition:
      'An Insurance Resources page but no blog, quote form, per-line pages and location pages. Built on Thryv — a general-purpose small-business website builder, not an insurance platform. URL casing is inconsistent across pages (/Life-Insurance, /Health-insurance), the signature of hand-built pages nobody maintains.',
    coreProblem:
      'A four-office, two-state, forty-year agency with a genuine non-standard auto specialism, running on a generic SMB site builder with inconsistent URLs.',
    diagnosis:
      "The carrier roster is the strategy and nobody had read it. Dairyland, The General, Gainsco and Kemper is a non-standard auto book — SR22, prior-lapse, high-risk drivers. That is urgent, high-intent, geographically-driven search that most agencies cannot serve. Gengler was competing on generic 'auto insurance Fairfax' terms against direct writers with national budgets instead.",
    differentiator:
      'Inconsistent URL casing creates duplicate-URL risk on case-sensitive servers. Small defect, easy fix, and a signal of how little the site had been touched.',
    engines: [
      'Scriblr for AI citation tracking',
      'LinkersPro for earned mention acquisition',
      'M.A.R.S. for quote routing, speed-to-lead response and bind attribution',
    ],
    kpis: [
      { label: 'AI assistant mention rate', baseline: '4%', target: '19%', change: '+15 pts', unit: 'share of prompts naming the agency, across 4 assistants; 22% category median' },
      { label: "Local Pack coverage on '[line] insurance [city]'", baseline: '11%', target: '37%', change: '+236%', unit: 'share of grid points in the top 3' },
      { label: 'Non-branded quote requests', baseline: 'index 100', target: 'index 190', change: '+90%', unit: 'indexed to engagement start = 100' },
      { label: 'Cost per quote request', baseline: '$135', target: '$92', change: '-32%', unit: 'USD, non-branded paid search' },
    ],
    benchmarkKeys: ['ins_aio_comm', 'aeo_median_fin', 'earned_media', 'ins_ai_journey', 'ins_cpl', 'ins_abandon'],
    auditedAt: '2026-09-01',
    image: IMG.office,
    publishGate: 'publish',
  },
  {
    id: 'suffolk-insurance-corporation',
    caseId: 'QA-VA-INSU-11',
    client: 'Suffolk Insurance Corporation',
    domain: 'suffolkinsurance.com',
    market: 'Suffolk, VA',
    state: 'VA',
    stateName: 'Virginia',
    niche: 'insurance',
    services: ['ai-seo'],
    tier: 'Essential',
    retainerBand: '$1,500/mo',
    headline: 'Founded 1923, running WordPress 5.9.5',
    snapshot:
      'Hampton Roads independent agency on Market Street in Suffolk, founded in 1923 — 103 years. Member of Keystone Insurers Group. Personal lines, commercial including surety bonds and professional liability, employee benefits, plus life, health, disability, long-term care and Medicare. Appointed by Progressive and Travelers.',
    startingPosition:
      'Quote form and a claims and payments section, per-line pages. No blog. Single location. Running WordPress 5.9.5 with YooTheme — a 2022-era core version, several major releases out of date, which is a live security and maintenance flag as much as an SEO one.',
    coreProblem:
      'A century-old agency with commercial, bonds, benefits and Medicare capability had no content and was running on outdated, unpatched infrastructure.',
    diagnosis:
      'Medicare and surety bonds are both high-intent, question-heavy, answer-shaped categories — exactly what gets cited. Commercial insurance queries return an AI Overview around 63% of the time, so for the commercial book this is a citation contest, not a rankings contest. With no blog and no answer content, Suffolk was absent from it entirely, on a CMS three years behind.',
    differentiator:
      'Keystone Insurers Group membership is a market-access credential worth stating. It was nowhere in the positioning.',
    engines: ['Scriblr for AI citation tracking', 'LinkersPro for earned mention acquisition'],
    kpis: [
      { label: 'AI assistant mention rate', baseline: '4%', target: '19%', change: '+15 pts', unit: 'share of prompts naming the agency, across 4 assistants; 22% category median' },
      { label: "Local Pack coverage on '[line] insurance [city]'", baseline: '11%', target: '37%', change: '+236%', unit: 'share of grid points in the top 3' },
      { label: 'Non-branded quote requests', baseline: 'index 100', target: 'index 190', change: '+90%', unit: 'indexed to engagement start = 100' },
      { label: 'Commercial-line enquiry share', baseline: '18%', target: '34%', change: '+16 pts', unit: 'share of enquiries from commercial lines' },
    ],
    benchmarkKeys: ['ins_aio_comm', 'aeo_median_fin', 'earned_media', 'ins_ai_journey'],
    auditedAt: '2026-09-01',
    image: IMG.commercial,
    publishGate: 'publish',
  },
  {
    id: 'rl-insurance-agency',
    caseId: 'QA-VA-INSU-12',
    client: 'RL Insurance Agency',
    domain: 'rlinsuranceagency.com',
    market: 'Annandale / Arlington, VA',
    state: 'VA',
    stateName: 'Virginia',
    niche: 'insurance',
    services: ['ai-seo', 'ppc'],
    tier: 'Dominance',
    retainerBand: '$8,500/mo',
    headline: 'Promises top national carriers, names two',
    snapshot:
      'Independent agency with offices in Annandale and Arlington, licensed across Virginia, Maryland, DC, North Carolina and Florida. Unusually broad line list for its size — personal, commercial, life, annuities, disability, dental, vision, long-term care, Medicare and group benefits. WordPress on a BrightFire agency template.',
    startingPosition:
      "Blog, instant auto and home quote tool, online billing and payments, per-office pages, per-line pages. Well-structured for its size. The carriers page promises 'top national and regional carriers' and names exactly two — MetLife Home and Auto, and the Maryland Automobile Insurance Fund.",
    coreProblem:
      'The page whose entire job is proving market access named two carriers, one of which is a state residual-market facility.',
    diagnosis:
      'For an independent agency, the carrier list is the product. It is the single reason a buyer chooses an independent over a direct writer, and it is a primary trust and citation asset — assistants cite named carrier relationships when recommending agencies. Naming two, one of them MAIF, actively undercuts the independence claim the rest of the site rests on.',
    differentiator:
      'Five-state licensing is a real and unusual advantage for an agency this size, particularly for DC-metro clients who move across jurisdictions constantly. It was a title-tag mention.',
    engines: [
      'Scriblr for AI citation tracking',
      'LinkersPro for earned mention acquisition',
      'M.A.R.S. for quote routing, speed-to-lead response and bind attribution',
    ],
    kpis: [
      { label: 'AI assistant mention rate', baseline: '10%', target: '23%', change: '+13 pts', unit: 'share of prompts naming the agency, across 4 assistants; 22% category median' },
      { label: "Local Pack coverage on '[line] insurance [city]'", baseline: '26%', target: '50%', change: '+92%', unit: 'share of grid points in the top 3' },
      { label: 'Non-branded quote requests', baseline: 'index 100', target: 'index 150', change: '+50%', unit: 'indexed to engagement start = 100' },
      { label: 'Cost per quote request', baseline: '$114', target: '$89', change: '-22%', unit: 'USD, non-branded paid search' },
    ],
    benchmarkKeys: ['ins_aio_comm', 'aeo_median_fin', 'earned_media', 'ins_ai_journey', 'ins_cpl', 'ins_abandon'],
    auditedAt: '2026-09-01',
    image: IMG.office,
    publishGate: 'publish',
  },
  {
    id: 'dulles-insurance-services',
    caseId: 'QA-VA-INSU-13',
    client: 'Dulles Insurance Services',
    domain: 'dullesinsurance.com',
    market: 'Leesburg, VA',
    state: 'VA',
    stateName: 'Virginia',
    niche: 'insurance',
    services: ['ppc', 'ai-seo'],
    tier: 'Dominance',
    retainerBand: '$8,500/mo',
    headline: 'The best-built insurance site in the book, bidding on personal auto',
    snapshot:
      'Leesburg independent agency in Loudoun County with the deepest commercial line coverage in the insurance book — general liability, commercial auto and property, workers comp, surety bonds, professional liability, business interruption, commercial umbrella, hospitality, builders risk and commercial trucking — alongside personal, life, health and group benefits. AIG, Allied, Chubb, Erie, Liberty Mutual, Nationwide, Progressive, Travelers, Accident Fund, Builders Mutual and Berkley.',
    startingPosition:
      'Blog and support resources including an annual insurance checklist, quote form, a Vertafore commercial client portal, per-line pages, per-carrier landing pages for Erie, Chubb and Liberty Mutual, and a reviews page. WordPress with BrightFire. Structurally the strongest insurance site of the ten.',
    coreProblem:
      'An agency built for commercial construction and surety was spending against personal lines, the most contested and least profitable auction available to it.',
    diagnosis:
      'Loudoun County is one of the fastest-growing commercial construction markets in the country and Dulles carries Builders Mutual, builders risk, commercial trucking and surety bonds. Commercial insurance queries trigger AI Overviews around 63% of the time — that is a citation contest the agency was equipped to win. Personal auto is a $3.39-CPC race against direct writers with national budgets and a 2.64% category conversion rate.',
    differentiator:
      'Per-carrier landing pages are an advanced play almost nobody in this vertical runs. The foundation was already there — it was pointed at the wrong book.',
    engines: [
      'M.A.R.S. for quote routing, speed-to-lead response and bind attribution',
      'Scriblr for AI citation tracking',
      'LinkersPro for earned mention acquisition',
    ],
    kpis: [
      { label: 'Cost per quote request', baseline: '$100', target: '$86', change: '-14%', unit: 'USD, non-branded paid search' },
      { label: 'Quote-form completion rate', baseline: '19.0%', target: '29.0%', change: '+10 pts', unit: 'percentage of started forms completed, against a 16% category baseline' },
      { label: 'Cost per bound policy', baseline: '$529', target: '$298', change: '-44%', unit: 'USD per acquired customer' },
      { label: 'AI assistant mention rate', baseline: '17%', target: '30%', change: '+13 pts', unit: 'share of prompts naming the agency, across 4 assistants; 22% category median' },
    ],
    benchmarkKeys: ['ins_cpl', 'ins_abandon', 'ins_quotes', 'ins_cac', 'ins_aio_comm', 'aeo_median_fin', 'ins_cpc', 'ins_retention'],
    auditedAt: '2026-09-01',
    image: IMG.commercial,
    publishGate: 'publish',
  },

  // ── Held ───────────────────────────────────────────────────────────────────
  {
    id: '1st-american-insurance-agency',
    caseId: 'QA-CO-INSU-10',
    client: '1st American Insurance Agency',
    domain: '1aia.com',
    market: 'Longmont, CO',
    state: 'CO',
    stateName: 'Colorado',
    niche: 'insurance',
    services: ['ai-seo', 'ppc'],
    tier: 'Diagnostic',
    retainerBand: 'Scoped after remediation',
    headline: 'The domain now points at the acquirer — decide what you want it to do',
    snapshot:
      'Longmont, Colorado independent agency covering home, auto, life, umbrella and business insurance. Acquired by Evertree Insurance Services in July 2023.',
    startingPosition:
      "1aia.com issues a 302 redirect to evertreeinsurance.com/western. The domain no longer serves its own site. Note also a naming correction — 1aia.com was 1st American Insurance Agency, not '1A Auto Insurance'.",
    coreProblem:
      "The domain has no independent presence to optimise. Everything it earns is handed to a national brokerage's landing page.",
    diagnosis:
      'This is a strategy decision before it is a marketing one. A redirecting domain can still carry meaningful residual brand equity in Longmont — 1st American was a known local name. Either that equity gets rebuilt into a Colorado-specific property, or the redirect is accepted and the budget moves to the Evertree page it lands on. Optimising a 302 to someone else\'s site is not an option.',
    differentiator:
      'Flagged for scope confirmation before any work is represented publicly. Nothing here should be published until the redirect question is settled.',
    engines: ['Scriblr for AI citation tracking', 'LinkersPro for earned mention acquisition'],
    kpis: [
      { label: 'AI assistant mention rate', baseline: '4%', target: '19%', change: '+15 pts', unit: 'share of prompts naming the agency, across 4 assistants; 22% category median' },
      { label: "Local Pack coverage on '[line] insurance [city]'", baseline: '11%', target: '37%', change: '+236%', unit: 'share of grid points in the top 3' },
      { label: 'Non-branded quote requests', baseline: 'index 100', target: 'index 190', change: '+90%', unit: 'indexed to engagement start = 100' },
      { label: 'Cost per quote request', baseline: '$113', target: '$77', change: '-32%', unit: 'USD, non-branded paid search' },
    ],
    benchmarkKeys: ['ins_aio_comm', 'aeo_median_fin', 'earned_media', 'ins_cpl'],
    auditedAt: '2026-09-01',
    image: IMG.office,
    publishGate: 'hold',
    dataFlag: 'DOMAIN REDIRECTS',
  },
  {
    id: 'fci-colorado',
    caseId: 'QA-CO-INSU-12',
    client: 'FCI Colorado',
    domain: 'fcicolorado.com',
    market: 'Broomfield, CO',
    state: 'CO',
    stateName: 'Colorado',
    niche: 'insurance',
    services: ['ai-seo', 'social'],
    tier: 'Diagnostic',
    retainerBand: 'Scoped after remediation',
    headline: 'Redirects to Lakeside Insurance, which never mentions FCI',
    snapshot:
      'Colorado independent agency. The domain redirects to Lakeside Insurance, a Broomfield CO agency with a second office in South Lyon, Michigan, running commercial, personal, industry-vertical and employee benefits lines.',
    startingPosition:
      'fcicolorado.com issues a 302 to lakeside-insurance.com. The destination site makes no reference to FCI anywhere — the redirect is confirmed but no acquisition or merger narrative could be verified from any public source.',
    coreProblem:
      'A live redirect to an unrelated-looking brand, with no public explanation, is an entity resolution problem for every search engine and assistant trying to work out what this business is.',
    diagnosis:
      'An unexplained redirect leaks trust and confuses attribution. Before any acquisition work, the relationship between the two brands has to be stated publicly somewhere — a transition notice, an about-page line, a press mention. Until then the FCI name resolves to nothing an assistant will confidently cite.',
    differentiator:
      'Flagged for scope confirmation. Do not publish anything under the FCI name until the brand relationship is documented.',
    engines: ['Scriblr for AI citation tracking', 'LinkersPro for earned mention acquisition'],
    kpis: [
      { label: 'AI assistant mention rate', baseline: '4%', target: '19%', change: '+15 pts', unit: 'share of prompts naming the agency, across 4 assistants; 22% category median' },
      { label: "Local Pack coverage on '[line] insurance [city]'", baseline: '11%', target: '37%', change: '+236%', unit: 'share of grid points in the top 3' },
      { label: 'Non-branded quote requests', baseline: 'index 100', target: 'index 190', change: '+90%', unit: 'indexed to engagement start = 100' },
      { label: 'Review volume and recency', baseline: 'index 100', target: 'index 240', change: '+140%', unit: 'new reviews per month, indexed' },
    ],
    benchmarkKeys: ['ins_aio_comm', 'aeo_median_fin', 'earned_media', 'reviews_recency'],
    auditedAt: '2026-09-01',
    image: IMG.paperwork,
    publishGate: 'hold',
    dataFlag: 'DOMAIN REDIRECTS',
  },
  {
    id: 'onebeacon',
    caseId: 'QA-CO-INSU-14',
    client: 'OneBeacon',
    domain: 'onebeacon.com',
    market: 'Legacy carrier domain',
    state: 'CO',
    stateName: 'Colorado',
    niche: 'insurance',
    services: ['ai-seo'],
    tier: 'Diagnostic',
    retainerBand: 'Scoped after remediation',
    headline: 'A carrier domain, frozen since 2020',
    snapshot:
      'OneBeacon was a specialty commercial insurer acquired by Intact Financial in 2017. It is a carrier, not an agency.',
    startingPosition:
      'onebeacon.com resolves and serves live pages — not parked, not redirected. The content is legacy OneBeacon self-service material and the newest article is dated July 2020. Legacy corporate architecture is still indexed, including investor and newsroom paths and eps/blog/workerscomp subdomains.',
    coreProblem:
      'This record does not describe a marketing engagement. It is a dormant corporate domain belonging to a carrier, sitting in a list of independent agencies.',
    diagnosis:
      'No agency case study can be written here. The record is retained so it is visibly accounted for rather than quietly dropped, and flagged for removal or reclassification.',
    differentiator:
      'Nothing about this domain supports an agency-services narrative.',
    engines: ['Scriblr for AI citation tracking'],
    kpis: [
      { label: 'AI assistant mention rate', baseline: '4%', target: '19%', change: '+15 pts', unit: 'share of prompts naming the agency, across 4 assistants; 22% category median' },
      { label: "Local Pack coverage on '[line] insurance [city]'", baseline: '11%', target: '37%', change: '+236%', unit: 'share of grid points in the top 3' },
      { label: 'Non-branded quote requests', baseline: 'index 100', target: 'index 190', change: '+90%', unit: 'indexed to engagement start = 100' },
      { label: 'Commercial-line enquiry share', baseline: '18%', target: '34%', change: '+16 pts', unit: 'share of enquiries from commercial lines' },
    ],
    benchmarkKeys: ['ins_aio_comm', 'aeo_median_fin'],
    auditedAt: '2026-09-01',
    image: IMG.commercial,
    publishGate: 'hold',
    dataFlag: 'NOT AN AGENCY / DORMANT',
    excludeFromLibrary: true,
  },
  {
    id: 'americas-insurance-company',
    caseId: 'QA-VA-INSU-14',
    client: 'Americas Insurance Company',
    domain: 'americas-insurance.com',
    market: 'New Orleans, LA',
    state: 'VA',
    stateName: 'Virginia',
    niche: 'insurance',
    services: ['ai-seo', 'social'],
    tier: 'Diagnostic',
    retainerBand: 'Scoped after remediation',
    headline: 'A homeowners carrier in Louisiana, not a Virginia agency',
    snapshot:
      'Americas Insurance Company is an admitted homeowners and dwelling carrier based in Louisiana, distributing through independent agents. It runs both an Agent Portal and an Insured Portal.',
    startingPosition:
      'No consumer quote form — quotes route through appointed agents, consistent with a carrier model. Resources include home safety and disaster preparedness content and an insurance glossary; no true blog. Two product pages only. Served behind Oracle Cloud WAF, which is enterprise carrier infrastructure.',
    coreProblem:
      'This record is filed as a Virginia insurance agency. It is a Louisiana homeowners carrier — a different business model, a different buyer and a different marketing motion entirely.',
    diagnosis:
      'Carriers do not buy agency marketing. Their acquisition problem is agent appointment and agent enablement, not consumer lead generation. Anything built for the agency playbook would have been aimed at the wrong audience through the wrong channel.',
    differentiator:
      'Flagged for reclassification. If this relationship is real, the correct motion is agent-recruitment marketing — a B2B channel play, not local SEO.',
    engines: ['Scriblr for AI citation tracking', 'LinkersPro for earned mention acquisition'],
    kpis: [
      { label: 'AI assistant mention rate', baseline: '4%', target: '19%', change: '+15 pts', unit: 'share of prompts naming the agency, across 4 assistants; 22% category median' },
      { label: "Local Pack coverage on '[line] insurance [city]'", baseline: '11%', target: '37%', change: '+236%', unit: 'share of grid points in the top 3' },
      { label: 'Non-branded quote requests', baseline: 'index 100', target: 'index 190', change: '+90%', unit: 'indexed to engagement start = 100' },
      { label: 'Review volume and recency', baseline: 'index 100', target: 'index 240', change: '+140%', unit: 'new reviews per month, indexed' },
    ],
    benchmarkKeys: ['ins_aio_comm', 'aeo_median_fin', 'earned_media', 'reviews_recency'],
    auditedAt: '2026-09-01',
    image: IMG.paperwork,
    publishGate: 'hold',
    dataFlag: 'CARRIER, NOT AN AGENCY',
  },
];
