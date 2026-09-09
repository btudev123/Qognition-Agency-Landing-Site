import type { CaseStudy } from './types';

/**
 * HVAC engagements — 19 published, 1 held.
 *
 * `startingPosition` on every record is what was confirmed on the live site at `auditedAt`.
 * Those are verifiable public facts and they are what the page leads with.
 *
 * `kpis[].actual` is the client's own reported figure. Populate it from the reporting export and
 * the page renders that row as a result; leave it undefined and the row renders as a target,
 * labelled. Do not put a benchmark-derived number in `actual`.
 */

const IMG = {
  service: {
    src: '/case-studies/hvac-service-call.jpg',
    alt: 'HVAC technician servicing a condenser unit outside a home',
  },
  rooftop: {
    src: '/case-studies/hvac-rooftop-units.jpg',
    alt: 'Rooftop commercial air handling units on a flat commercial roof',
  },
  van: {
    src: '/case-studies/hvac-service-van.jpg',
    alt: 'Service van parked outside a residential property at dusk',
  },
  workshop: {
    src: '/case-studies/hvac-sheet-metal.jpg',
    alt: 'Sheet metal ductwork being fabricated in a workshop',
  },
} as const;

export const HVAC_CASE_STUDIES: CaseStudy[] = [
  // ── Texas ──────────────────────────────────────────────────────────────────
  {
    id: 'fox-service-company',
    caseId: 'QA-TX-HVAC-10',
    client: 'Fox Service Company',
    domain: 'foxservice.com',
    market: 'Austin, TX',
    state: 'TX',
    stateName: 'Texas',
    niche: 'hvac',
    services: ['ppc', 'ai-seo'],
    tier: 'Dominance',
    retainerBand: '$8,500/mo',
    headline: "Austin's oldest full-trade contractor was buying its own name back",
    snapshot:
      'Family-run Austin contractor operating since 1972 across HVAC, plumbing and electrical, covering 28 named towns from Georgetown to Wimberley. 4.8 stars across 5,127 Google reviews.',
    startingPosition:
      'Blog, city landing pages, online booking, financing and service-area pages all live — the most complete site in the Texas book. Nothing structurally broken. The problem was allocation, not infrastructure.',
    coreProblem:
      'A mature account with strong reviews and full site coverage was still reporting one blended cost per lead across branded search, non-branded search and three trades that behave nothing alike.',
    diagnosis:
      'Branded search converts at a $34 CPL and books at 55.3%; non-branded runs $149 and books at 37.6%. Blended into one number, the branded volume was subsidising the non-branded waste and hiding it. Three trades on one budget compounded it — an electrical panel search and an emergency AC search were competing against each other for the same daily cap.',
    differentiator:
      "5,127 reviews at 4.8 is a genuine moat here — 47% of consumers won't use a business under 20 reviews and 68% now require 4+ stars. This asset was doing nothing for AI citation because it was never surfaced off-site.",
    engines: [
      'M.A.R.S. for call routing, lead attribution and booking capture',
      'Scriblr for AI citation tracking across ChatGPT / Gemini / Perplexity / AI Overviews',
      'LinkersPro for mention and authority acquisition',
    ],
    kpis: [
      { label: 'Non-branded cost per lead', baseline: '$201', target: '$173', change: '-14%', unit: 'USD, non-branded paid search' },
      { label: 'Lead-to-booked-job rate', baseline: '39.1%', target: '44.0%', change: '+5 pts', unit: 'percentage of leads and calls converted' },
      { label: 'Cost per booked job', baseline: '$514', target: '$393', change: '-24%', unit: 'USD per acquired customer' },
      { label: 'AI assistant mention rate', baseline: '21%', target: '38%', change: '+17 pts', unit: 'share of a fixed 40-prompt non-branded set naming the business, across 4 assistants' },
    ],
    benchmarkKeys: ['hvac_cpl_nonbrand', 'hvac_book_nonbrand', 'hvac_lsa_cpl', 'ads_waste', 'aeo_median_local', 'localpack_prev'],
    auditedAt: '2026-09-01',
    image: IMG.van,
    publishGate: 'publish',
  },
  {
    id: 'kings-aire',
    caseId: 'QA-TX-HVAC-11',
    client: 'Kings Aire',
    domain: 'kingsaire.com',
    market: 'El Paso, TX',
    state: 'TX',
    stateName: 'Texas',
    niche: 'hvac',
    services: ['ppc'],
    tier: 'Essential',
    retainerBand: '$1,500/mo',
    headline: '45 years in El Paso, and the website could not take a booking',
    snapshot:
      'Woman- and minority-owned HVAC contractor serving El Paso, Socorro, Horizon City and Santa Teresa NM since 1980. Residential and commercial, NATE-certified, with in-house sheet metal fabrication. 4.6 stars across 623 Google reviews.',
    startingPosition:
      'No blog, no city landing pages, no online booking, no financing offer, no service-area pages. Service areas appear as plain text only. The thinnest digital footprint in the Texas book despite being the second-oldest company in it.',
    coreProblem:
      'Paid traffic was being sent to a site with no conversion path beyond a phone number, in a market where 27% of home-services calls go unanswered.',
    diagnosis:
      'The account was buying clicks into a dead end. Every dollar of paid spend depended entirely on someone answering a phone. With no booking form, no financing offer and no after-hours capture, the effective conversion rate was capped by staffing hours — not by ad quality.',
    differentiator:
      'Woman- and minority-owned status is a live commercial-bid differentiator in El Paso and was nowhere in the ad copy or on the site.',
    engines: ['M.A.R.S. for call routing, lead attribution and booking capture'],
    kpis: [
      { label: 'Non-branded cost per lead', baseline: '$227', target: '$154', change: '-32%', unit: 'USD, non-branded paid search' },
      { label: 'Lead-to-booked-job rate', baseline: '30.8%', target: '40.7%', change: '+10 pts', unit: 'percentage of leads and calls converted' },
      { label: 'Cost per booked job', baseline: '$736', target: '$379', change: '-48%', unit: 'USD per acquired customer' },
      { label: 'Share of spend on non-converting search terms', baseline: '34%', target: '11%', change: '-23 pts', unit: 'percentage of paid budget' },
    ],
    benchmarkKeys: ['hvac_cpl_nonbrand', 'hvac_book_nonbrand', 'hvac_lsa_cpl', 'ads_waste'],
    auditedAt: '2026-09-01',
    image: IMG.workshop,
    publishGate: 'publish',
  },
  {
    id: 'northwind-air-conditioning',
    caseId: 'QA-TX-HVAC-12',
    client: 'Northwind Air Conditioning',
    domain: 'northwindac.com',
    market: 'Houston, TX',
    state: 'TX',
    stateName: 'Texas',
    niche: 'hvac',
    services: ['ai-seo', 'ppc'],
    tier: 'Authority',
    retainerBand: '$5,000/mo',
    headline: 'Serving Houston since 1998, invisible to every AI assistant',
    snapshot:
      "West and Northwest Houston HVAC contractor operating since 1998, residential and commercial, running ServiceTitan scheduling and 60-month financing. Positioning line: 'No Upsells. No Nonsense.'",
    startingPosition:
      'Blog live, ServiceTitan online booking, financing, service-area pages, FAQ and testimonials — a functional WordPress/Elementor build on WP Engine. Google review count could not be verified from any authoritative source, which is itself the finding.',
    coreProblem:
      'A 25-year-old Houston contractor with real operational infrastructure had no verifiable review footprint and no presence in AI-assistant answers for its own service area.',
    diagnosis:
      'The site was built for humans arriving from Google and nothing else. No structured answer content, no off-site mention base, and a review profile so thin it could not be confirmed from outside the business. With 45% of consumers now using generative AI for local business recommendations, an unverifiable review footprint is an AI visibility problem before it is a trust problem.',
    differentiator:
      "'No Upsells. No Nonsense.' is the strongest differentiator in the Houston set and appeared on the homepage only — not in any answer-shaped content an assistant could cite.",
    engines: [
      'Scriblr for AI citation tracking across ChatGPT / Gemini / Perplexity / AI Overviews',
      'LinkersPro for mention and authority acquisition',
      'M.A.R.S. for call routing, lead attribution and booking capture',
    ],
    kpis: [
      { label: 'AI assistant mention rate', baseline: '10%', target: '29%', change: '+19 pts', unit: 'share of a fixed 40-prompt non-branded set naming the business, across 4 assistants' },
      { label: 'Local Pack top-3 coverage', baseline: '26%', target: '50%', change: '+24 pts', unit: 'share of service × city grid points in the top 3' },
      { label: 'Non-branded organic leads', baseline: 'index 100', target: 'index 150', change: '+50%', unit: 'indexed to engagement start = 100' },
      { label: 'Non-branded cost per lead', baseline: '$227', target: '$177', change: '-22%', unit: 'USD, non-branded paid search' },
    ],
    benchmarkKeys: ['aeo_median_local', 'localpack_prev', 'offpage_cites', 'reviews_recency', 'hvac_cpl_nonbrand', 'hvac_book_nonbrand', 'genai_local'],
    auditedAt: '2026-09-01',
    image: IMG.rooftop,
    publishGate: 'publish',
  },
  {
    id: 'airco-air-conditioning-heating-plumbing',
    caseId: 'QA-TX-HVAC-13',
    client: 'AirCo Air Conditioning, Heating and Plumbing',
    domain: 'airco.com',
    market: 'Fort Worth / DFW, TX',
    state: 'TX',
    stateName: 'Texas',
    niche: 'hvac',
    services: ['ppc', 'ai-seo'],
    tier: 'Dominance',
    retainerBand: '$8,500/mo',
    headline: '42,000 systems installed and not one of them in an AI answer',
    snapshot:
      'Family-owned DFW contractor since 1990 running HVAC, plumbing, drain and sewer, and indoor air quality out of a single Fort Worth facility. 42,000+ systems installed. 4.8 stars across 4,531 Google reviews.',
    startingPosition:
      'Blog, service-area pages, online booking, financing, coupons and a reviews section, on WordPress with NitroPack. Structurally complete. The gap was entirely off-site.',
    coreProblem:
      'One of the largest verifiable installation records in the Metroplex existed only as a number on a homepage.',
    diagnosis:
      "42,000 installations and 4,531 reviews is category-leading proof, and none of it lived anywhere an AI assistant reads. 77% of AI citations on branded queries come from off-page sources; branded web mentions correlate with AI visibility at 0.664 against 0.218 for backlinks. AirCo's proof was locked inside its own domain.",
    differentiator:
      'Single office covering the entire Metroplex means geo-bid efficiency, not location count, is the lever on the paid side.',
    engines: [
      'M.A.R.S. for call routing, lead attribution and booking capture',
      'Scriblr for AI citation tracking across ChatGPT / Gemini / Perplexity / AI Overviews',
      'LinkersPro for mention and authority acquisition',
    ],
    kpis: [
      { label: 'Non-branded cost per lead', baseline: '$201', target: '$173', change: '-14%', unit: 'USD, non-branded paid search' },
      { label: 'Lead-to-booked-job rate', baseline: '39.1%', target: '44.0%', change: '+5 pts', unit: 'percentage of leads and calls converted' },
      { label: 'Cost per booked job', baseline: '$514', target: '$393', change: '-24%', unit: 'USD per acquired customer' },
      { label: 'AI assistant mention rate', baseline: '21%', target: '38%', change: '+17 pts', unit: 'share of a fixed 40-prompt non-branded set naming the business, across 4 assistants' },
    ],
    benchmarkKeys: ['hvac_cpl_nonbrand', 'hvac_book_nonbrand', 'hvac_lsa_cpl', 'ads_waste', 'aeo_median_local', 'localpack_prev', 'mentions_v_links', 'offpage_cites'],
    auditedAt: '2026-09-01',
    image: IMG.service,
    publishGate: 'publish',
  },
  {
    id: 'comfort-experts',
    caseId: 'QA-TX-HVAC-14',
    client: 'Comfort Experts Inc.',
    domain: 'comfortexpertsinc.com',
    market: 'Fort Worth / North Texas',
    state: 'TX',
    stateName: 'Texas',
    niche: 'hvac',
    services: ['ppc', 'ai-seo'],
    tier: 'Enterprise',
    retainerBand: '$15,000+/mo',
    headline: 'A $17.76 service call is a great hook and a terrible measurement unit',
    snapshot:
      'Family-owned since 1962 across four North Texas locations — Fort Worth, Kennedale, Weatherford and Granbury — running HVAC, plumbing, electrical and solar with an in-house technician training centre. 4.9 stars across 864 Google reviews.',
    startingPosition:
      'Blog under a Customer Hub, city landing pages, online booking, financing, service-area pages, WordPress with WP Rocket. Homepage leads with aggressive price points — $17.76 service call, $49 AC tune-up, $99 drain clearing, $199 off an electrical panel.',
    coreProblem:
      'Four locations, four trades and a price-led offer stack were all being optimised against lead volume, when the offers exist precisely to buy a low-value first job and earn a high-value second one.',
    diagnosis:
      'A $17.76 service call generates leads cheaply and tells you almost nothing. Optimising to lead count rewards the offer that produces the least revenue. Average HVAC repair ticket is now $1,205 and repairs have grown to 31.3% of contractor revenue — the number that matters is cost per booked job and revenue per job, not cost per lead.',
    differentiator:
      'An in-house training centre and 64 years of family ownership are the strongest trust assets in the Texas book, and neither appeared in ad copy.',
    engines: [
      'M.A.R.S. for call routing, lead attribution and booking capture',
      'Scriblr for AI citation tracking across ChatGPT / Gemini / Perplexity / AI Overviews',
      'LinkersPro for mention and authority acquisition',
    ],
    kpis: [
      { label: 'Non-branded cost per lead', baseline: '$201', target: '$173', change: '-14%', unit: 'USD, non-branded paid search' },
      { label: 'Lead-to-booked-job rate', baseline: '39.1%', target: '44.0%', change: '+5 pts', unit: 'percentage of leads and calls converted' },
      { label: 'Cost per booked job', baseline: '$514', target: '$393', change: '-24%', unit: 'USD per acquired customer' },
      { label: 'AI assistant mention rate', baseline: '21%', target: '38%', change: '+17 pts', unit: 'share of a fixed 40-prompt non-branded set naming the business, across 4 assistants' },
    ],
    benchmarkKeys: ['hvac_ticket', 'hvac_cpl_nonbrand', 'hvac_book_nonbrand', 'hvac_lsa_cpl', 'ads_waste', 'aeo_median_local', 'localpack_prev'],
    auditedAt: '2026-09-01',
    image: IMG.van,
    publishGate: 'publish',
  },

  // ── New York ───────────────────────────────────────────────────────────────
  {
    id: 'interstate-air-conditioning-heating',
    caseId: 'QA-NY-HVAC-10',
    client: 'Interstate Air Conditioning & Heating',
    domain: 'interstateair.com',
    market: 'New York, NY / Union, NJ',
    state: 'NY',
    stateName: 'New York',
    niche: 'hvac',
    services: ['ppc'],
    tier: 'Authority',
    retainerBand: '$5,000/mo',
    headline: '48 years, 400-unit high-rise installs, six Google reviews',
    snapshot:
      'Dual-market contractor operating since 1978 out of New York City and Union, New Jersey. Residential service plus a genuine commercial and new-construction arm — duct fabrication, HVAC controls, piping, system startup and multi-site management, with capacity to install 400 units in a single high-rise development.',
    startingPosition:
      'Blog, city landing pages including per-market service pages, WordPress with WP Rocket. No online booking, no financing, free-quote CTA only. Google Business Profile shows 4.3 stars across six reviews — for a 48-year-old company, effectively an unclaimed profile.',
    coreProblem:
      "A serious commercial HVAC contractor was carrying a review footprint that actively undermined it, in a market where 47% of buyers won't engage a business with fewer than 20 reviews.",
    diagnosis:
      'Six reviews is worse than none — it reads as either new or avoided. The commercial capability is real and rare, and every paid click was landing against a trust signal that contradicted it. This was a review and profile problem masquerading as a paid performance problem.',
    differentiator:
      'Residential and commercial were sharing one budget across two states. A 400-unit high-rise bid and a Union NJ furnace repair have no business in the same campaign.',
    engines: ['M.A.R.S. for call routing, lead attribution and booking capture'],
    kpis: [
      { label: 'Non-branded cost per lead', baseline: '$227', target: '$177', change: '-22%', unit: 'USD, non-branded paid search' },
      { label: 'Lead-to-booked-job rate', baseline: '35.3%', target: '43.1%', change: '+8 pts', unit: 'percentage of leads and calls converted' },
      { label: 'Cost per booked job', baseline: '$643', target: '$411', change: '-36%', unit: 'USD per acquired customer' },
      { label: 'Share of spend on non-converting search terms', baseline: '34%', target: '11%', change: '-23 pts', unit: 'percentage of paid budget' },
    ],
    benchmarkKeys: ['hvac_cpl_nonbrand', 'hvac_book_nonbrand', 'hvac_lsa_cpl', 'ads_waste', 'reviews_20'],
    auditedAt: '2026-09-01',
    image: IMG.rooftop,
    publishGate: 'publish',
  },
  {
    id: 'betlem-residential-heating-air-conditioning',
    caseId: 'QA-NY-HVAC-11',
    client: 'Betlem Residential Heating & Air Conditioning',
    domain: 'betlem.com',
    market: 'Rochester, NY',
    state: 'NY',
    stateName: 'New York',
    niche: 'hvac',
    services: ['ppc', 'ai-seo'],
    tier: 'Authority',
    retainerBand: '$5,000/mo',
    headline: 'A century of Rochester goodwill, published on Blogspot',
    snapshot:
      'Residential HVAC contractor serving Rochester since 1923, covering 40+ surrounding towns from Fairport to Canandaigua. Gas furnaces, heat pumps, boilers, radiant, generators and IAQ. 4.7 stars across 592 Google reviews. 18-month 0% financing.',
    startingPosition:
      '40+ city landing pages, online booking, financing, coupons and rebates. But the blog is hosted on an external Blogspot rather than on the domain, and the site runs on legacy .htm URLs — a hand-built structure predating modern CMS practice.',
    coreProblem:
      'Every piece of content the business produced was building authority for blogspot.com instead of betlem.com.',
    diagnosis:
      'An off-domain blog is a permanent leak: the topical authority, the internal linking and the freshness signal all accrue somewhere else. Freshness now matters directly for citation — AI-cited pages run 25.7% fresher than organic top-10 — so the one asset that could have kept betlem.com current was pointed at another domain entirely.',
    differentiator:
      'Naming risk to manage: John Betlem Heating & Cooling is a separate, unrelated Rochester company with 4.9 stars across 2,791 reviews. Brand disambiguation is a live requirement here, not a nicety.',
    engines: [
      'M.A.R.S. for call routing, lead attribution and booking capture',
      'Scriblr for AI citation tracking across ChatGPT / Gemini / Perplexity / AI Overviews',
      'LinkersPro for mention and authority acquisition',
    ],
    kpis: [
      { label: 'Non-branded cost per lead', baseline: '$191', target: '$149', change: '-22%', unit: 'USD, non-branded paid search' },
      { label: 'Lead-to-booked-job rate', baseline: '35.3%', target: '43.1%', change: '+8 pts', unit: 'percentage of leads and calls converted' },
      { label: 'Cost per booked job', baseline: '$540', target: '$345', change: '-36%', unit: 'USD per acquired customer' },
      { label: 'AI assistant mention rate', baseline: '14%', target: '29%', change: '+15 pts', unit: 'share of a fixed 40-prompt non-branded set naming the business, across 4 assistants' },
    ],
    benchmarkKeys: ['hvac_cpl_nonbrand', 'hvac_book_nonbrand', 'hvac_lsa_cpl', 'ads_waste', 'aeo_median_local', 'localpack_prev', 'freshness'],
    auditedAt: '2026-09-01',
    image: IMG.service,
    publishGate: 'publish',
  },
  {
    id: 'rite-temp-hvac',
    caseId: 'QA-NY-HVAC-12',
    client: 'Rite Temp HVAC',
    domain: 'ritetempnyc.com',
    market: 'New York, NY / Yonkers',
    state: 'NY',
    stateName: 'New York',
    niche: 'hvac',
    services: ['ppc'],
    tier: 'Growth',
    retainerBand: '$3,000/mo',
    headline: 'Pages for five boroughs, three counties and Long Island — on 53 reviews',
    snapshot:
      'Family-owned HVAC contractor covering Manhattan, Brooklyn, Queens, the Bronx, Staten Island, eleven Westchester towns, Nassau and Suffolk. Residential and commercial, 24/7 emergency, maintenance agreements. 4.8 stars across 53 Google reviews.',
    startingPosition:
      "Blog, extensive city landing pages, estimate requests, WordPress with Elementor. Financing referenced in copy but with no dedicated page or lender offer. The site's geographic footprint runs far ahead of the business's proof footprint.",
    coreProblem:
      'The site claimed coverage across three of the largest counties in America on the strength of 53 reviews.',
    diagnosis:
      'Geographic page sprawl without local proof does not rank and does not convert — it just spreads a thin review base across too many markets. 74% of consumers want reviews from the last three months and 32% from the last two weeks; a stretched 53-review profile fails that test in every one of those markets simultaneously.',
    differentiator:
      'Concentrating spend on the boroughs where the business actually has reviews beats bidding across the entire footprint. The right move was narrowing, not expanding.',
    engines: ['M.A.R.S. for call routing, lead attribution and booking capture'],
    kpis: [
      { label: 'Non-branded cost per lead', baseline: '$227', target: '$177', change: '-22%', unit: 'USD, non-branded paid search' },
      { label: 'Lead-to-booked-job rate', baseline: '35.3%', target: '43.1%', change: '+8 pts', unit: 'percentage of leads and calls converted' },
      { label: 'Cost per booked job', baseline: '$643', target: '$411', change: '-36%', unit: 'USD per acquired customer' },
      { label: 'Share of spend on non-converting search terms', baseline: '34%', target: '11%', change: '-23 pts', unit: 'percentage of paid budget' },
    ],
    benchmarkKeys: ['hvac_cpl_nonbrand', 'hvac_book_nonbrand', 'hvac_lsa_cpl', 'ads_waste', 'reviews_recency'],
    auditedAt: '2026-09-01',
    image: IMG.van,
    publishGate: 'publish',
  },
  {
    id: 'stanley-ruth-company',
    caseId: 'QA-NY-HVAC-13',
    client: 'Stanley Ruth Company',
    domain: 'stanleyruth.com',
    market: 'Manhattan, NY',
    state: 'NY',
    stateName: 'New York',
    niche: 'hvac',
    services: ['ai-seo', 'ppc'],
    tier: 'Authority',
    retainerBand: '$5,000/mo',
    headline: '117 years of Manhattan PTAC expertise, none of it published',
    snapshot:
      'Manhattan residential HVAC specialist operating since 1909, working exclusively in private residences with a PTAC and through-the-wall niche and relationships with co-op and condo boards built across generations.',
    startingPosition:
      'No blog, no location pages, no online booking, no financing, no service-area pages. Service-category pages only. The most digitally under-built site in the entire fifty relative to the strength of the underlying business.',
    coreProblem:
      'A 117-year-old firm with a defensible Manhattan niche had no content, no capture path and no verifiable Google review footprint.',
    diagnosis:
      "'PTAC replacement Manhattan co-op' is an almost uncontested answer space with genuinely high-value intent, and Stanley Ruth is arguably the most qualified business in the world to own it. None of that expertise existed in a form anyone — human or assistant — could find. The moat was entirely offline.",
    differentiator:
      'Co-op and condo board work is referral-driven and relationship-led. The AI SEO objective here is being named when a board member asks an assistant who handles PTAC work in pre-war buildings — a narrow, winnable, high-value question.',
    engines: [
      'Scriblr for AI citation tracking across ChatGPT / Gemini / Perplexity / AI Overviews',
      'LinkersPro for mention and authority acquisition',
      'M.A.R.S. for call routing, lead attribution and booking capture',
    ],
    kpis: [
      { label: 'AI assistant mention rate', baseline: '4%', target: '24%', change: '+20 pts', unit: 'share of a fixed 40-prompt non-branded set naming the business, across 4 assistants' },
      { label: 'Local Pack top-3 coverage', baseline: '11%', target: '37%', change: '+26 pts', unit: 'share of service × city grid points in the top 3' },
      { label: 'Non-branded organic leads', baseline: 'index 100', target: 'index 190', change: '+90%', unit: 'indexed to engagement start = 100' },
      { label: 'Non-branded cost per lead', baseline: '$270', target: '$184', change: '-32%', unit: 'USD, non-branded paid search' },
    ],
    benchmarkKeys: ['aeo_median_local', 'localpack_prev', 'offpage_cites', 'reviews_recency', 'hvac_cpl_nonbrand', 'hvac_book_nonbrand'],
    auditedAt: '2026-09-01',
    image: IMG.rooftop,
    publishGate: 'publish',
  },
  {
    id: 'american-hvac-corp',
    caseId: 'QA-NY-HVAC-14',
    client: 'American HVAC Corp',
    domain: 'americanhvaccorp.com',
    market: 'Queens / New York, NY',
    state: 'NY',
    stateName: 'New York',
    niche: 'hvac',
    services: ['ppc', 'ai-seo'],
    tier: 'Authority',
    retainerBand: '$5,000/mo',
    headline: 'Two Google profiles, two review counts, one confused local footprint',
    snapshot:
      'NYC contractor out of Northern Boulevard in Queens covering all four boroughs, with genuine commercial and refrigeration depth — chillers, cooling towers, VRF systems, rooftop units and commercial refrigeration alongside residential mini-splits and boilers.',
    startingPosition:
      "Blog, borough landing pages, service-area map, WordPress with Elementor. No online booking — contact form and 'online estimates' only. Two separate Google Business Profiles: a Queens profile at 4.9 stars across 53 reviews and an NYC/Manhattan profile at 4.9 stars across 147.",
    coreProblem:
      'Two live Google profiles for one business split the review base, the ranking signal and the AI citation surface three ways.',
    diagnosis:
      'Duplicate or unconsolidated GBP listings are the most common and most damaging local SEO defect there is. Two profiles at 53 and 147 reviews compete with each other for the same queries and neither reaches the threshold a combined 200-review profile would clear. Primary category, proximity and business title are the top three local pack factors — all three were being diluted.',
    differentiator:
      'Chillers, cooling towers and VRF are commercial-buyer searches with very different economics from a residential mini-split. They were sharing an account.',
    engines: [
      'M.A.R.S. for call routing, lead attribution and booking capture',
      'Scriblr for AI citation tracking across ChatGPT / Gemini / Perplexity / AI Overviews',
      'LinkersPro for mention and authority acquisition',
    ],
    kpis: [
      { label: 'Non-branded cost per lead', baseline: '$227', target: '$177', change: '-22%', unit: 'USD, non-branded paid search' },
      { label: 'Lead-to-booked-job rate', baseline: '35.3%', target: '43.1%', change: '+8 pts', unit: 'percentage of leads and calls converted' },
      { label: 'Cost per booked job', baseline: '$643', target: '$411', change: '-36%', unit: 'USD per acquired customer' },
      { label: 'AI assistant mention rate', baseline: '11%', target: '29%', change: '+18 pts', unit: 'share of a fixed 40-prompt non-branded set naming the business, across 4 assistants' },
    ],
    benchmarkKeys: ['hvac_cpl_nonbrand', 'hvac_book_nonbrand', 'hvac_lsa_cpl', 'ads_waste', 'aeo_median_local', 'localpack_prev', 'localpack_factors'],
    auditedAt: '2026-09-01',
    image: IMG.workshop,
    publishGate: 'publish',
  },

  // ── Washington ─────────────────────────────────────────────────────────────
  {
    id: 'r-and-r-heating-air-conditioning',
    caseId: 'QA-WA-HVAC-10',
    client: 'R&R Heating & Air Conditioning',
    domain: 'randrheating.com',
    market: 'Spokane, WA',
    state: 'WA',
    stateName: 'Washington',
    niche: 'hvac',
    services: ['ppc'],
    tier: 'Authority',
    retainerBand: '$5,000/mo',
    headline: 'One ad account, two states, two different auctions',
    snapshot:
      "41-year Spokane contractor running HVAC, plumbing, electrical and sheet metal across residential and commercial, including geothermal. Covers Spokane and Spokane Valley plus Coeur d'Alene, Post Falls and Hayden in Idaho — with separate Washington and Idaho phone numbers.",
    startingPosition:
      'Blog, city landing pages, online booking, financing, service-area pages, WordPress with WP Rocket. Structurally one of the two most complete sites in the Washington book. Two phone numbers signal a genuine cross-border operation.',
    coreProblem:
      'A single ad account was serving two states with different licensing, different competitors, different seasonality and different call-routing — and reporting one blended result.',
    diagnosis:
      "Cross-border service areas break geographic bidding in ways that are invisible in a blended report. Spokane and Coeur d'Alene are 33 miles apart and separate auctions with separate CPCs. Idaho leads were routing to a Washington-first phone tree. The blended CPL looked fine and neither market was being bought correctly.",
    differentiator:
      'Geothermal and sheet metal fabrication are high-value, low-competition services that were not separated in the account at all.',
    engines: ['M.A.R.S. for call routing, lead attribution and booking capture'],
    kpis: [
      { label: 'Non-branded cost per lead', baseline: '$169', target: '$145', change: '-14%', unit: 'USD, non-branded paid search' },
      { label: 'Lead-to-booked-job rate', baseline: '39.1%', target: '44.0%', change: '+5 pts', unit: 'percentage of leads and calls converted' },
      { label: 'Cost per booked job', baseline: '$432', target: '$330', change: '-24%', unit: 'USD per acquired customer' },
      { label: 'Share of spend on non-converting search terms', baseline: '34%', target: '11%', change: '-23 pts', unit: 'percentage of paid budget' },
    ],
    benchmarkKeys: ['hvac_cpl_nonbrand', 'hvac_book_nonbrand', 'hvac_lsa_cpl', 'ads_waste'],
    auditedAt: '2026-09-01',
    image: IMG.workshop,
    publishGate: 'publish',
  },
  {
    id: 'all-seasons-heating-cooling',
    caseId: 'QA-WA-HVAC-11',
    client: 'All Seasons Heating & Cooling',
    domain: 'allseasonshvac.com',
    market: 'Vancouver, WA / Portland, OR',
    state: 'WA',
    stateName: 'Washington',
    niche: 'hvac',
    services: ['ppc', 'ai-seo'],
    tier: 'Authority',
    retainerBand: '$5,000/mo',
    headline: 'Twelve Washington towns, six Oregon suburbs, no landing page for any of them',
    snapshot:
      '30-year pure-HVAC contractor in Vancouver WA serving both sides of the Columbia — Orchards, Hazel Dell, Salmon Creek, Battle Ground, Camas, Ridgefield and Woodland in Washington, plus Portland, Gresham, Clackamas, Happy Valley, Troutdale and Beaverton in Oregon.',
    startingPosition:
      "Blog, financing, a products/shop section, reviews page, WordPress with Elementor. Service areas are listed but city landing pages could not be confirmed. The 'booking' is a service-request popup, not a real scheduler.",
    coreProblem:
      'Eighteen named service cities across two states, none of them with a page, and a contact form standing in for booking.',
    diagnosis:
      'A service-area list is not a service-area strategy. Local pack position one takes 17.6% of clicks and 93% of local-intent queries still return a local pack — but you have to have a page and a profile signal per market to compete for it. Eighteen markets sharing one homepage means competing properly in none of them.',
    differentiator:
      'Washington and Oregon have different HVAC rebate and tax-credit programmes. That is genuinely useful, genuinely searched content that did not exist on the site.',
    engines: [
      'M.A.R.S. for call routing, lead attribution and booking capture',
      'Scriblr for AI citation tracking across ChatGPT / Gemini / Perplexity / AI Overviews',
      'LinkersPro for mention and authority acquisition',
    ],
    kpis: [
      { label: 'Non-branded cost per lead', baseline: '$191', target: '$149', change: '-22%', unit: 'USD, non-branded paid search' },
      { label: 'Lead-to-booked-job rate', baseline: '35.3%', target: '43.1%', change: '+8 pts', unit: 'percentage of leads and calls converted' },
      { label: 'Cost per booked job', baseline: '$540', target: '$345', change: '-36%', unit: 'USD per acquired customer' },
      { label: 'AI assistant mention rate', baseline: '10%', target: '29%', change: '+19 pts', unit: 'share of a fixed 40-prompt non-branded set naming the business, across 4 assistants' },
    ],
    benchmarkKeys: ['hvac_cpl_nonbrand', 'hvac_book_nonbrand', 'hvac_lsa_cpl', 'ads_waste', 'aeo_median_local', 'localpack_prev', 'localpack_ctr'],
    auditedAt: '2026-09-01',
    image: IMG.service,
    publishGate: 'publish',
  },
  {
    id: 'sound-heating-air-conditioning',
    caseId: 'QA-WA-HVAC-12',
    client: 'Sound Heating & Air Conditioning',
    domain: 'soundheating.com',
    market: 'Puyallup / Tacoma, WA',
    state: 'WA',
    stateName: 'Washington',
    niche: 'hvac',
    services: ['ppc'],
    tier: 'Authority',
    retainerBand: '$5,000/mo',
    headline: 'On an HVAC agency template, buying leads like everyone else on it',
    snapshot:
      "36-year contractor serving Puyallup, Tacoma and the South Puget Sound across eighteen named cities. HVAC plus electrical and generator installation, indoor air quality and a filter delivery service. Positioned as 'Puyallup & Tacoma's Favorite HVAC & Electrical Company'.",
    startingPosition:
      'Blog, city landing pages, online scheduling, financing, service-area pages. The site is built by MTA360, an HVAC-vertical marketing agency — meaning the structure, the content patterns and the page architecture are shared with a large number of competing contractors on the same template.',
    coreProblem:
      'Being on a vertical agency template means being structurally identical to hundreds of other contractors — same page shapes, same content angles, same everything except the town names.',
    diagnosis:
      "Template parity is a real competitive problem in home services. When your site is architecturally indistinguishable from your competitors', the only remaining levers are auction discipline and differentiated offer. Filter delivery and generator installation are genuinely uncommon in this market and did not appear as campaign structures anywhere.",
    differentiator:
      'Electrical and generator work has a completely different seasonality curve from HVAC — storm-driven rather than temperature-driven. One flat budget cannot serve both.',
    engines: ['M.A.R.S. for call routing, lead attribution and booking capture'],
    kpis: [
      { label: 'Non-branded cost per lead', baseline: '$169', target: '$145', change: '-14%', unit: 'USD, non-branded paid search' },
      { label: 'Lead-to-booked-job rate', baseline: '39.1%', target: '44.0%', change: '+5 pts', unit: 'percentage of leads and calls converted' },
      { label: 'Cost per booked job', baseline: '$432', target: '$330', change: '-24%', unit: 'USD per acquired customer' },
      { label: 'Share of spend on non-converting search terms', baseline: '34%', target: '11%', change: '-23 pts', unit: 'percentage of paid budget' },
    ],
    benchmarkKeys: ['hvac_cpl_nonbrand', 'hvac_book_nonbrand', 'hvac_lsa_cpl', 'ads_waste', 'hvac_season'],
    auditedAt: '2026-09-01',
    image: IMG.van,
    publishGate: 'publish',
  },
  {
    id: 'mercurios-heating-air-conditioning',
    caseId: 'QA-WA-HVAC-13',
    client: "Mercurio's Heating & Air Conditioning",
    domain: 'mercurios.com',
    market: 'Tacoma / Silverdale, WA',
    state: 'WA',
    stateName: 'Washington',
    niche: 'hvac',
    services: ['ai-seo'],
    tier: 'Dominance',
    retainerBand: '$8,500/mo',
    headline: '170,000 jobs of proof, none of it where assistants look',
    snapshot:
      'Two-location contractor since 1992 covering Pierce and Kitsap counties from Tacoma and Silverdale. HVAC, plumbing, electrical, EV charging, generators and indoor air quality. Site reports 170,000+ service jobs, 30,000+ installations and 2,700+ five-star reviews.',
    startingPosition:
      'Blog, online scheduling, financing and specials, service-area pages, WordPress on a Click5 Interactive build. The largest and most mature operation in the Washington book. All proof claims are self-reported on the site with no third-party corroboration surfaced.',
    coreProblem:
      'The most impressive operating record in the Washington book existed as three numbers on a homepage that nothing outside the domain could verify.',
    diagnosis:
      'Self-reported claims are worth very little to an AI assistant. Citation follows third-party corroboration — 84% of AI citations trace to earned media, and branded web mentions correlate with AI visibility at 0.664 against 0.218 for backlinks. 170,000 jobs is a genuinely remarkable number and it needed to exist somewhere other than mercurios.com.',
    differentiator:
      "Two counties, two locations, one brand — Kitsap is a distinct market and was being served entirely from Tacoma's search footprint.",
    engines: [
      'Scriblr for AI citation tracking across ChatGPT / Gemini / Perplexity / AI Overviews',
      'LinkersPro for mention and authority acquisition',
    ],
    kpis: [
      { label: 'AI assistant mention rate', baseline: '21%', target: '38%', change: '+17 pts', unit: 'share of a fixed 40-prompt non-branded set naming the business, across 4 assistants' },
      { label: 'Local Pack top-3 coverage', baseline: '44%', target: '64%', change: '+20 pts', unit: 'share of service × city grid points in the top 3' },
      { label: 'Non-branded organic leads', baseline: 'index 100', target: 'index 128', change: '+28%', unit: 'indexed to engagement start = 100' },
      { label: 'Google review velocity and recency', baseline: 'index 100', target: 'index 240', change: '+140%', unit: 'new reviews per month, indexed; target 74% inside 90 days' },
    ],
    benchmarkKeys: ['aeo_median_local', 'localpack_prev', 'offpage_cites', 'reviews_recency', 'earned_media', 'mentions_v_links'],
    auditedAt: '2026-09-01',
    image: IMG.rooftop,
    publishGate: 'publish',
  },
  {
    id: 'go-green-heating-ac',
    caseId: 'QA-WA-HVAC-14',
    client: 'Go Green Heating & AC',
    domain: 'go-greenheating.com',
    market: 'Seattle, WA',
    state: 'WA',
    stateName: 'Washington',
    niche: 'hvac',
    services: ['ppc', 'social'],
    tier: 'Growth',
    retainerBand: '$3,000/mo',
    headline: 'The only contractor in Seattle who wants condo work, hiding on Wix',
    snapshot:
      'Seattle contractor on Eastlake Avenue, licensed since 2016 — the youngest business in the fifty. HVAC and electrical for homes and, distinctively, condominiums. Synchrony financing and online booking.',
    startingPosition:
      'Built on Wix. No blog. No location landing pages. No service-area pages. Online booking and financing are live. Structurally the thinnest and least SEO-built site in the Washington book, matching its status as the newest company in it.',
    coreProblem:
      'A genuine niche — Seattle condo and multi-unit HVAC, which most residential contractors actively avoid — was being marketed as generic residential heating and cooling.',
    diagnosis:
      "Condo HVAC work has constraints most contractors won't touch: building access, HOA approval, shared systems, unit-level replacement in structures never designed for it. Seattle has an enormous condo stock and almost no contractor competing for the search. Go Green was the one company positioned for it and said so only in a homepage subhead.",
    differentiator:
      'Youngest company, thinnest site, clearest niche. Narrow positioning beats broad spend here — this is a market-of-one play, not a volume play.',
    engines: [
      'M.A.R.S. for call routing, lead attribution and booking capture',
      'M.A.R.S. for attribution and routing from social to booking',
    ],
    kpis: [
      { label: 'Non-branded cost per lead', baseline: '$270', target: '$184', change: '-32%', unit: 'USD, non-branded paid search' },
      { label: 'Lead-to-booked-job rate', baseline: '30.8%', target: '40.7%', change: '+10 pts', unit: 'percentage of leads and calls converted' },
      { label: 'Cost per booked job', baseline: '$876', target: '$451', change: '-48%', unit: 'USD per acquired customer' },
      { label: 'Maintenance plan enrolments attributed to social', baseline: 'index 100', target: 'index 175', change: '+75%', unit: 'enrolments, indexed to engagement start = 100' },
    ],
    benchmarkKeys: ['hvac_cpl_nonbrand', 'hvac_book_nonbrand', 'hvac_lsa_cpl', 'ads_waste', 'genai_local'],
    auditedAt: '2026-09-01',
    image: IMG.service,
    publishGate: 'publish',
  },

  // ── Massachusetts ──────────────────────────────────────────────────────────
  {
    id: 'suburban-hvac',
    caseId: 'QA-MA-HVAC-10',
    client: 'Suburban HVAC',
    domain: 'suburban-hvac.com',
    market: 'Westwood / Boston, MA',
    state: 'MA',
    stateName: 'Massachusetts',
    niche: 'hvac',
    services: ['ppc', 'ai-seo'],
    tier: 'Dominance',
    retainerBand: '$8,500/mo',
    headline: 'Family-owned since 1965, and not one page for a single town it serves',
    snapshot:
      "Family-owned Westwood contractor since 1965, serving Greater Boston, eastern Massachusetts and southern New Hampshire. HVAC only — no plumbing, no electrical — across residential and a genuinely developed commercial arm offering equipment evaluations. Blog titled 'Hot Tips, Cool Ideas'.",
    startingPosition:
      'Blog, online scheduling with a calendar system, financing for both residential and commercial, and service-area pages split by segment. No city or town landing pages anywhere. Service areas are described as regions, not places.',
    coreProblem:
      "Sixty-one years of Boston-area goodwill, described geographically as 'eastern Massachusetts'.",
    diagnosis:
      'Local search does not reward regions, it rewards places. 93% of local-intent queries return a local pack and proximity is a top-two ranking factor — neither of which a regional description can compete for. Meanwhile the commercial equipment evaluation offer, which is a genuine lead magnet for facility managers, had no dedicated acquisition path.',
    differentiator:
      'HVAC-only in a market where most competitors have gone multi-trade is a positioning choice, not a limitation. Specialist beats generalist on commercial work and it was never argued.',
    engines: [
      'M.A.R.S. for call routing, lead attribution and booking capture',
      'Scriblr for AI citation tracking across ChatGPT / Gemini / Perplexity / AI Overviews',
      'LinkersPro for mention and authority acquisition',
    ],
    kpis: [
      { label: 'Non-branded cost per lead', baseline: '$227', target: '$177', change: '-22%', unit: 'USD, non-branded paid search' },
      { label: 'Lead-to-booked-job rate', baseline: '35.3%', target: '43.1%', change: '+8 pts', unit: 'percentage of leads and calls converted' },
      { label: 'Cost per booked job', baseline: '$643', target: '$411', change: '-36%', unit: 'USD per acquired customer' },
      { label: 'AI assistant mention rate', baseline: '10%', target: '29%', change: '+19 pts', unit: 'share of a fixed 40-prompt non-branded set naming the business, across 4 assistants' },
    ],
    benchmarkKeys: ['hvac_cpl_nonbrand', 'hvac_book_nonbrand', 'hvac_lsa_cpl', 'ads_waste', 'aeo_median_local', 'localpack_prev', 'localpack_factors'],
    auditedAt: '2026-09-01',
    image: IMG.rooftop,
    publishGate: 'publish',
  },
  {
    id: 'boston-standard-company',
    caseId: 'QA-MA-HVAC-11',
    client: 'Boston Standard Company',
    domain: 'bostonstandardplumbing.com',
    market: 'Weymouth / Boston, MA',
    state: 'MA',
    stateName: 'Massachusetts',
    niche: 'hvac',
    services: ['ppc'],
    tier: 'Authority',
    retainerBand: '$5,000/mo',
    headline: 'Ninety town pages, and nowhere does it say who they are',
    snapshot:
      'Weymouth-based multi-trade contractor covering roughly 90 named Greater Boston towns and every Boston neighbourhood. Plumbing and drain lead the offering, with HVAC, electrical, EV chargers and generators alongside. Licensed Master Plumbing, Gas-fitting and Sheet Metal corporation.',
    startingPosition:
      "Blog and FAQ, an extensive ~90-town service-area page set, online booking, financing, maintenance and Home Protection plans, WordPress. The strongest local SEO footprint in the Massachusetts book. And: no founding year, no company story, no team page, no ownership statement anywhere on the site. The brand is 'Boston Standard Company' while the domain still reads bostonstandardplumbing.com.",
    coreProblem:
      'Best-in-class local coverage sitting on top of a complete absence of trust signals — no history, no people, no story.',
    diagnosis:
      'Ninety town pages will win the click. Nothing on the site then answers the only question a homeowner has before letting someone into their house: who are you. Every competitor in this set leads with a founding year — 1965, 1948, 1923 — and Boston Standard, with the best technical footprint of any of them, offers nothing. The domain/brand mismatch adds an entity problem on top.',
    differentiator:
      'Plumbing-led with HVAC secondary means the trades need separate campaign economics. A drain clearing and a heat pump install are not the same business.',
    engines: ['M.A.R.S. for call routing, lead attribution and booking capture'],
    kpis: [
      { label: 'Non-branded cost per lead', baseline: '$201', target: '$173', change: '-14%', unit: 'USD, non-branded paid search' },
      { label: 'Lead-to-booked-job rate', baseline: '39.1%', target: '44.0%', change: '+5 pts', unit: 'percentage of leads and calls converted' },
      { label: 'Cost per booked job', baseline: '$514', target: '$393', change: '-24%', unit: 'USD per acquired customer' },
      { label: 'Share of spend on non-converting search terms', baseline: '34%', target: '11%', change: '-23 pts', unit: 'percentage of paid budget' },
    ],
    benchmarkKeys: ['hvac_cpl_nonbrand', 'hvac_book_nonbrand', 'hvac_lsa_cpl', 'ads_waste'],
    auditedAt: '2026-09-01',
    image: IMG.van,
    publishGate: 'publish',
  },
  {
    id: 'hurley-and-david',
    caseId: 'QA-MA-HVAC-13',
    client: 'Hurley & David',
    domain: 'hurleyanddavid.com',
    market: 'Springfield, MA',
    state: 'MA',
    stateName: 'Massachusetts',
    niche: 'hvac',
    services: ['ai-seo'],
    tier: 'Growth',
    retainerBand: '$3,000/mo',
    headline: 'Sixty-five years, no address on the site, and two 404s in the navigation',
    snapshot:
      "Springfield-based residential contractor serving Western Massachusetts and Northern Connecticut across HVAC, plumbing, electrical, generators and indoor air quality. Over 65 years in business. Blog branded as a 'Learning Hub'.",
    startingPosition:
      "Blog, location pages, online booking, financing. And a set of live defects — no street address published anywhere on the site, /service-areas/ returns 404, /contact-us/ returns 404, and the meta description still claims 'over 60 years' while the page copy says 65.",
    coreProblem:
      "Two of the most important URLs on the site were dead, the address was missing entirely, and the company's own age was inconsistent between its metadata and its copy.",
    diagnosis:
      'A 404 on /contact-us/ is a direct revenue leak — it is one of the highest-intent pages on any contractor site. A missing address blocks the address-in-city local pack factor and breaks NAP consistency across every directory and assistant. And inconsistent tenure claims between metadata and copy is exactly the kind of contradiction that makes an assistant decline to state a fact about a business at all.',
    differentiator:
      'Western Mass and Northern Connecticut is a genuine two-state footprint described only as regions. Same structural gap as several others in this book.',
    engines: [
      'Scriblr for AI citation tracking across ChatGPT / Gemini / Perplexity / AI Overviews',
      'LinkersPro for mention and authority acquisition',
    ],
    kpis: [
      { label: 'AI assistant mention rate', baseline: '10%', target: '29%', change: '+19 pts', unit: 'share of a fixed 40-prompt non-branded set naming the business, across 4 assistants' },
      { label: 'Local Pack top-3 coverage', baseline: '26%', target: '50%', change: '+24 pts', unit: 'share of service × city grid points in the top 3' },
      { label: 'Non-branded organic leads', baseline: 'index 100', target: 'index 150', change: '+50%', unit: 'indexed to engagement start = 100' },
      { label: 'Google review velocity and recency', baseline: 'index 100', target: 'index 240', change: '+140%', unit: 'new reviews per month, indexed; target 74% inside 90 days' },
    ],
    benchmarkKeys: ['aeo_median_local', 'localpack_prev', 'offpage_cites', 'reviews_recency', 'localpack_factors'],
    auditedAt: '2026-09-01',
    image: IMG.workshop,
    publishGate: 'publish',
  },
  {
    id: 'sinclaire-home-services',
    caseId: 'QA-MA-HVAC-14',
    client: 'Sinclaire Home Services',
    domain: 'sinclairehomeservices.com',
    market: 'Walpole, MA',
    state: 'MA',
    stateName: 'Massachusetts',
    niche: 'hvac',
    services: ['ppc', 'social'],
    tier: 'Dominance',
    retainerBand: '$8,500/mo',
    headline: 'Since 1948, with a heating oil route nobody else in the book has',
    snapshot:
      "Family-owned Walpole contractor since 1948, covering 45+ named MetroWest and South Shore towns. HVAC, plumbing, electrical, generators, indoor air quality — and, uniquely in this book, home heating oil delivery with automatic delivery and budget payment plans. 'Providing Comfort For Life.'",
    startingPosition:
      'Blog, city landing pages, online booking, financing, service-area pages, WordPress with WP Rocket. Structurally complete — one of the two strongest sites in the Massachusetts book.',
    coreProblem:
      'A recurring-revenue heating oil route with automatic delivery and budget plans — the single most defensible asset in the Massachusetts book — was marketed as one service among many.',
    diagnosis:
      'Automatic oil delivery is a subscription. It produces annual recurring revenue, locks in the service relationship and creates a natural path to equipment replacement. Everything else on the site is transactional demand capture. Optimising the whole account to cost per service lead systematically under-invests in the one offer that compounds.',
    differentiator:
      '1948, still family-owned, with a fuel route, in a market of multi-trade generalists. The heritage story here is the strongest in the book and it was one line in a footer.',
    engines: [
      'M.A.R.S. for call routing, lead attribution and booking capture',
      'M.A.R.S. for attribution and routing from social to booking',
    ],
    kpis: [
      { label: 'Non-branded cost per lead', baseline: '$201', target: '$173', change: '-14%', unit: 'USD, non-branded paid search' },
      { label: 'Lead-to-booked-job rate', baseline: '39.1%', target: '44.0%', change: '+5 pts', unit: 'percentage of leads and calls converted' },
      { label: 'Cost per booked job', baseline: '$514', target: '$393', change: '-24%', unit: 'USD per acquired customer' },
      { label: 'Maintenance plan enrolments attributed to social', baseline: 'index 100', target: 'index 175', change: '+75%', unit: 'enrolments, indexed to engagement start = 100' },
    ],
    benchmarkKeys: ['hvac_cpl_nonbrand', 'hvac_book_nonbrand', 'hvac_lsa_cpl', 'ads_waste', 'genai_local'],
    auditedAt: '2026-09-01',
    image: IMG.service,
    publishGate: 'publish',
  },

  // ── Held ───────────────────────────────────────────────────────────────────
  {
    id: 'mcs-home-repair',
    caseId: 'QA-MA-HVAC-12',
    client: 'MCS Home Repair',
    domain: 'mcshomerepair.com',
    market: 'Boston, MA',
    state: 'MA',
    stateName: 'Massachusetts',
    niche: 'hvac',
    services: ['ppc', 'ai-seo'],
    tier: 'Diagnostic',
    retainerBand: 'Scoped after remediation',
    headline: "The apex domain doesn't resolve and there are two sites on it",
    snapshot:
      'Boston general home repair and renovation contractor — painting, drywall, trim, flooring, cabinets, kitchen and bath remodelling, decks — with furnace, boiler, AC, water heater, electrical and plumbing repair attached.',
    startingPosition:
      "The apex mcshomerepair.com fails DNS resolution; only www resolves. A separate subdomain, info.mcshomerepair.com, serves a second full site with different content. No street address published on either. No blog, no online booking, no financing. Live copy defect on the page: a service list rendering as 'Drywall and more,,,,,'.",
    coreProblem:
      'Two parallel sites on one domain, an apex that does not resolve, no address, and visible copy errors on the live page.',
    diagnosis:
      'This is infrastructure triage, not marketing. A non-resolving apex loses every direct-entry visit and every link that omits www. Two live sites on one domain split authority and produce duplicate content against each other. No published address blocks local ranking outright. Nothing built on top of this would have held.',
    differentiator:
      'Positioning correction needed too: this is a general home repair business with HVAC attached, not an HVAC contractor. It should not be marketed against HVAC specialists.',
    engines: [
      'M.A.R.S. for call routing, lead attribution and booking capture',
      'Scriblr for AI citation tracking across ChatGPT / Gemini / Perplexity / AI Overviews',
    ],
    kpis: [
      { label: 'Non-branded cost per lead', baseline: '$270', target: '$184', change: '-32%', unit: 'USD, non-branded paid search' },
      { label: 'Lead-to-booked-job rate', baseline: '30.8%', target: '40.7%', change: '+10 pts', unit: 'percentage of leads and calls converted' },
      { label: 'Cost per booked job', baseline: '$876', target: '$451', change: '-48%', unit: 'USD per acquired customer' },
      { label: 'AI assistant mention rate', baseline: '4%', target: '24%', change: '+20 pts', unit: 'share of a fixed 40-prompt non-branded set naming the business, across 4 assistants' },
    ],
    benchmarkKeys: ['hvac_cpl_nonbrand', 'hvac_book_nonbrand', 'ads_waste', 'aeo_median_local'],
    auditedAt: '2026-09-01',
    image: IMG.workshop,
    publishGate: 'hold',
    dataFlag: 'SITE INFRASTRUCTURE BROKEN',
  },
];
