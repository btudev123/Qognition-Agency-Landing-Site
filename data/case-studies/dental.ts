import type { CaseStudy } from './types';

/**
 * Dental engagements — 20 published, none held.
 *
 * Three practices in this set carry "Midtown" in the name across three different markets
 * (Sacramento CA, Columbus GA, Miami FL). Their slugs are market-qualified deliberately —
 * do not "tidy" them into collisions.
 */

const IMG = {
  chair: {
    src: '/case-studies/dental-operatory.jpg',
    alt: 'Dental operatory with chair and overhead light, prepared for a patient',
  },
  clinician: {
    src: '/case-studies/dental-clinician.jpg',
    alt: 'Dentist in scrubs and loupes reviewing a chart with a colleague',
  },
  imaging: {
    src: '/case-studies/dental-imaging.jpg',
    alt: 'Panoramic dental x-ray displayed on a clinic monitor',
  },
  reception: {
    src: '/case-studies/dental-reception.jpg',
    alt: 'Bright dental practice reception desk with waiting area seating',
  },
} as const;

export const DENTAL_CASE_STUDIES: CaseStudy[] = [
  // ── California ─────────────────────────────────────────────────────────────
  {
    id: 'the-super-dentists',
    caseId: 'QA-CA-DENT-10',
    client: 'The Super Dentists',
    domain: 'thesuperdentists.com',
    market: 'San Diego, CA',
    state: 'CA',
    stateName: 'California',
    niche: 'dental',
    services: ['ai-seo', 'ppc'],
    tier: 'Enterprise',
    retainerBand: '$15,000+/mo',
    headline: 'Seven offices, one brand, and a search footprint fighting itself',
    snapshot:
      'Pediatric and orthodontic-led group across seven Southern California offices — Carmel Valley, Chula Vista, Eastlake, Escondido, Kearny Mesa, Oceanside and Moreno Valley. Custom-built branded site with NexHealth booking.',
    startingPosition:
      'Blog, NexHealth online booking, individual service pages, WordPress on a custom agency build. The doctors page returns a 404 and the team page presents branded characters rather than a named clinician roster.',
    coreProblem:
      'Seven locations across two metros were competing with each other in the same local results, and a 404 on the doctor roster removed the single strongest E-E-A-T signal a healthcare site has.',
    diagnosis:
      'Multi-location practices lose most of their organic ground to internal cannibalisation, not competitors. Add a broken doctors page in a category where 47% of patients now use AI to research providers and 66% hit incorrect provider information in AI answers, and the group was handing assistants nothing verifiable to cite.',
    differentiator:
      'Moreno Valley sits in the Inland Empire, outside the San Diego metro — it needs separate geo treatment, not the San Diego template.',
    engines: [
      'Scriblr for AI citation tracking',
      'LinkersPro for earned mention acquisition',
      'M.A.R.S. for call tracking, missed-call recovery and booking attribution',
    ],
    kpis: [
      { label: 'AI assistant mention rate', baseline: '17%', target: '38%', change: '+21 pts', unit: "share of the practice's patient-question prompt set naming it, across 4 assistants" },
      { label: "Local Pack top-3 coverage on '[treatment] near me'", baseline: '40%', target: '60%', change: '+50%', unit: 'share of grid points in the top 3' },
      { label: 'Non-branded organic new-patient enquiries', baseline: 'index 100', target: 'index 128', change: '+28%', unit: 'indexed to engagement start = 100' },
      { label: 'Cost per lead by intent tier', baseline: '$99', target: '$85', change: '-14%', unit: 'USD, blended across intent tiers' },
    ],
    benchmarkKeys: ['patient_ai', 'health_aio', 'patient_stars', 'offpage_cites', 'dental_cpl', 'dental_call_conv'],
    auditedAt: '2026-09-01',
    image: IMG.reception,
    publishGate: 'publish',
  },
  {
    id: 'oncall-dental-fresno',
    caseId: 'QA-CA-DENT-11',
    client: 'OnCall Dental Fresno',
    domain: 'oncalldentalfresno.com',
    market: 'Fresno, CA',
    state: 'CA',
    stateName: 'California',
    niche: 'dental',
    services: ['ppc', 'ai-seo'],
    tier: 'Authority',
    retainerBand: '$5,000/mo',
    headline: 'Emergency dentistry is a speed business being run on a callback form',
    snapshot:
      '24/7 emergency and same-day dental practice in Fresno, also serving Clovis. Two dentists. Condition-level pages for toothache, abscess, cracked tooth, extraction and root canal — the strongest emergency-intent content architecture in the California book.',
    startingPosition:
      'Blog, appointment request form, financing page, per-condition service pages, smile gallery, WordPress 6.9.7. What it does not have is real-time booking or a live answer path — an appointment request form on a 24/7 emergency positioning.',
    coreProblem:
      "A practice whose entire value proposition is 'now' was capturing demand through a form that gets answered later.",
    diagnosis:
      'Emergency dental search converts at 8.89% against a $75.19 category CPL — the traffic is cheap and the intent is maximal. The leak is downstream: 30–38% of practice calls go unanswered in business hours, call-to-appointment sits at 55% against a 72% top-decile, and only 36% of lost call opportunities ever get a follow-up. On an emergency positioning, every unanswered call goes to the next result.',
    differentiator:
      'The per-condition page architecture was already the right foundation — it needed answer-shaped content and a live capture path on top of it, not a rebuild.',
    engines: [
      'M.A.R.S. for call tracking, missed-call recovery and booking attribution',
      'Scriblr for AI citation tracking',
      'LinkersPro for earned mention acquisition',
    ],
    kpis: [
      { label: 'Cost per lead by intent tier', baseline: '$93', target: '$73', change: '-22%', unit: 'USD, blended across intent tiers' },
      { label: 'Call-to-appointment conversion rate', baseline: '52.0%', target: '64.0%', change: '+12 pts', unit: 'percentage of leads and calls converted' },
      { label: 'Cost per booked new patient', baseline: '$180', target: '$114', change: '-37%', unit: 'USD per acquired patient' },
      { label: 'AI assistant mention rate', baseline: '10%', target: '29%', change: '+19 pts', unit: "share of the practice's patient-question prompt set naming it, across 4 assistants" },
    ],
    benchmarkKeys: ['dental_cpl', 'dental_cpl_emerg', 'dental_call_conv', 'dental_calls_missed', 'dental_newpt_value', 'dental_followup', 'patient_ai', 'health_aio'],
    auditedAt: '2026-09-01',
    image: IMG.chair,
    publishGate: 'publish',
  },
  {
    id: 'sacramento-dentistry-group',
    caseId: 'QA-CA-DENT-12',
    client: 'Sacramento Dentistry Group',
    domain: 'sacramentodentistry.com',
    market: 'Sacramento, CA',
    state: 'CA',
    stateName: 'California',
    niche: 'dental',
    services: ['ai-seo'],
    tier: 'Authority',
    retainerBand: '$5,000/mo',
    headline: 'The most modern stack in the book, ranking on none of its strengths',
    snapshot:
      'Four-dentist midtown Sacramento practice, twenty years in the market, running general, cosmetic, implants, Invisalign, sedation, TMJ and sleep apnea. Built on Astro — a modern static framework, and the only non-WordPress general practice in the California book.',
    startingPosition:
      'Blog, NexHealth booking, Cherry and CareCredit financing, individual service pages, Astro v5.18. Technically the cleanest site in the book. No before/after gallery and no Spanish version despite the market.',
    coreProblem:
      'A fast, modern, four-doctor practice with the widest service range in Sacramento was being found for its name and almost nothing else.',
    diagnosis:
      "Technical quality is not a ranking or citation strategy. The site had speed and structure but no depth on the conditions patients actually ask about, no off-site mention base, and nothing in the format an assistant reproduces. 55% of patients begin with a '[specialty] near me' query and 47% now bring AI into the provider search — neither of those is won by page speed.",
    differentiator:
      'TMJ and sleep apnea are genuinely differentiated services in this market with almost no local competition for the answer space.',
    engines: ['Scriblr for AI citation tracking', 'LinkersPro for earned mention acquisition'],
    kpis: [
      { label: 'AI assistant mention rate', baseline: '17%', target: '38%', change: '+21 pts', unit: "share of the practice's patient-question prompt set naming it, across 4 assistants" },
      { label: "Local Pack top-3 coverage on '[treatment] near me'", baseline: '40%', target: '60%', change: '+50%', unit: 'share of grid points in the top 3' },
      { label: 'Non-branded organic new-patient enquiries', baseline: 'index 100', target: 'index 128', change: '+28%', unit: 'indexed to engagement start = 100' },
      { label: 'Review rating, volume and recency', baseline: 'index 100', target: 'index 240', change: '+140%', unit: 'new reviews per month, indexed; 4.5+ stars required by 44% of patients' },
    ],
    benchmarkKeys: ['patient_ai', 'health_aio', 'patient_stars', 'offpage_cites', 'freshness'],
    auditedAt: '2026-09-01',
    image: IMG.imaging,
    publishGate: 'publish',
  },
  {
    id: 'midtown-dental-sacramento',
    caseId: 'QA-CA-DENT-13',
    client: 'Midtown Dental',
    domain: 'midtowndentalsacramento.com',
    market: 'Sacramento, CA',
    state: 'CA',
    stateName: 'California',
    niche: 'dental',
    services: ['ai-seo', 'social'],
    tier: 'Growth',
    retainerBand: '$3,000/mo',
    headline: 'The footer said 2013–2020. So did the rankings.',
    snapshot:
      'Three-dentist midtown Sacramento practice on G Street, specialising in implants and cosmetic work with CEREC one-visit crowns, Invisalign, sedation and pediatric care.',
    startingPosition:
      "WordPress on a Divi child theme with a footer copyright reading '2013-2020' — roughly six years without meaningful maintenance. Blog present, before/after gallery present, financing page present. No online booking of any kind: contact page only.",
    coreProblem:
      'An implant and cosmetic practice — the highest-value case mix in dentistry — was running on a site that had visibly stopped being updated six years ago and could not take a booking.',
    diagnosis:
      'Content freshness is now a citation factor, not a vanity metric: AI-cited pages average 25.7% fresher than organic top-10 results, and pages left unedited for three months are markedly more likely to lose citations. A 2020 footer on a 2026 site is a machine-readable signal of abandonment, sitting on top of a case mix worth thousands per patient.',
    differentiator:
      'Three named doctors, CEREC, IV sedation and a live before/after gallery is real, differentiated substance — all of it stranded on a stale template.',
    engines: [
      'Scriblr for AI citation tracking',
      'LinkersPro for earned mention acquisition',
      'M.A.R.S. for attribution from social touch to booked consultation',
    ],
    kpis: [
      { label: 'AI assistant mention rate', baseline: '4%', target: '24%', change: '+20 pts', unit: "share of the practice's patient-question prompt set naming it, across 4 assistants" },
      { label: "Local Pack top-3 coverage on '[treatment] near me'", baseline: '11%', target: '37%', change: '+236%', unit: 'share of grid points in the top 3' },
      { label: 'Non-branded organic new-patient enquiries', baseline: 'index 100', target: 'index 190', change: '+90%', unit: 'indexed to engagement start = 100' },
      { label: 'Instagram engagement rate', baseline: '0.6%', target: '1.9%', change: '+1.3 pts', unit: 'against the 1.8% health and wellness category benchmark' },
    ],
    benchmarkKeys: ['patient_ai', 'health_aio', 'patient_stars', 'offpage_cites', 'freshness', 'dental_meta', 'social_health_eng'],
    auditedAt: '2026-09-01',
    image: IMG.clinician,
    publishGate: 'publish',
  },
  {
    id: 'crown-dental-bakersfield',
    caseId: 'QA-CA-DENT-14',
    client: 'Crown Dental',
    domain: 'thecrowndental.com',
    market: 'Bakersfield, CA',
    state: 'CA',
    stateName: 'California',
    niche: 'dental',
    services: ['ppc', 'social'],
    tier: 'Essential',
    retainerBand: '$1,500/mo',
    headline: 'Four service pages, no booking, and a landing page left over from the last agency',
    snapshot:
      "Two-dentist family, cosmetic and children's practice in Bakersfield. Dr. Jason Nguyen and Dr. Kelly Bach Tran, each with over a decade in practice.",
    startingPosition:
      'Four broad service categories and no per-treatment pages. No blog. No online booking. No detailed financing page. Grammatical errors in live body copy. A stranded /dentist-lp/ landing page indicating a previous paid-ads engagement. The contact page is blocked in robots.txt — the page a patient needs most is the one search engines are told to ignore.',
    coreProblem:
      'Paid traffic was being sent into a four-page brochure with no booking path, no treatment detail and a contact page hidden from search.',
    diagnosis:
      'Robots-blocking the contact page is the kind of defect that survives for years because nobody looks. Combined with no per-treatment pages, it meant every ad click landed on a generic category page and every organic path to conversion was severed. Dental search converts at 10.67% category-wide — this site could not physically reach that.',
    differentiator:
      'Bakersfield is the least contested dental auction in the California book. The cost of fixing this is low and the competitive ceiling is high.',
    engines: [
      'M.A.R.S. for call tracking, missed-call recovery and booking attribution',
      'M.A.R.S. for attribution from social touch to booked consultation',
    ],
    kpis: [
      { label: 'Cost per lead by intent tier', baseline: '$95', target: '$65', change: '-32%', unit: 'USD, blended across intent tiers' },
      { label: 'Call-to-appointment conversion rate', baseline: '44.0%', target: '58.0%', change: '+14 pts', unit: 'percentage of leads and calls converted' },
      { label: 'Cost per booked new patient', baseline: '$216', target: '$112', change: '-48%', unit: 'USD per acquired patient' },
      { label: 'Instagram engagement rate', baseline: '0.6%', target: '1.9%', change: '+1.3 pts', unit: 'against the 1.8% health and wellness category benchmark' },
    ],
    benchmarkKeys: ['dental_cpl', 'dental_call_conv', 'dental_calls_missed', 'dental_newpt_value', 'dental_meta', 'social_health_eng'],
    auditedAt: '2026-09-01',
    image: IMG.reception,
    publishGate: 'publish',
  },

  // ── Florida ────────────────────────────────────────────────────────────────
  {
    id: 'gateway-dental-miami',
    caseId: 'QA-FL-DENT-10',
    client: 'Gateway Dental',
    domain: 'gatewaydentalinc.com',
    market: 'Miami / Hialeah, FL',
    state: 'FL',
    stateName: 'Florida',
    niche: 'dental',
    services: ['ppc', 'ai-seo'],
    tier: 'Dominance',
    retainerBand: '$8,500/mo',
    headline: 'The only genuinely bilingual practice in Miami-Dade, bidding in English',
    snapshot:
      'Two-location family and cosmetic practice — Coral Way in Miami and West 68th Street in Hialeah — accepting 16+ insurance plans including Ameritas, Cigna, Delta Dental, MetLife and United Healthcare. Built on Astro.',
    startingPosition:
      'Blog, appointment request form, financing page, per-service pages, and a fully bilingual English/Spanish site throughout — the only genuine one across all twenty dental practices reviewed.',
    coreProblem:
      'A fully bilingual site in a majority-Hispanic market was running English-first acquisition, competing head-on where it had no advantage and ignoring the auction where it had a structural one.',
    diagnosis:
      'Hialeah is roughly 95% Hispanic. Spanish-language dental search in Miami-Dade is materially less contested than English, and Gateway was the only practice in the set that could actually serve that traffic end to end — bilingual site, bilingual staff, PPO-heavy panel. The advantage was already built and never activated.',
    differentiator:
      'Two locations four miles apart in different submarkets need separate GBP and page treatment, not a shared Miami template.',
    engines: [
      'M.A.R.S. for call tracking, missed-call recovery and booking attribution',
      'Scriblr for AI citation tracking',
      'LinkersPro for earned mention acquisition',
    ],
    kpis: [
      { label: 'Cost per lead by intent tier', baseline: '$111', target: '$87', change: '-22%', unit: 'USD, blended across intent tiers' },
      { label: 'Call-to-appointment conversion rate', baseline: '52.0%', target: '64.0%', change: '+12 pts', unit: 'percentage of leads and calls converted' },
      { label: 'Cost per booked new patient', baseline: '$214', target: '$136', change: '-37%', unit: 'USD per acquired patient' },
      { label: 'AI assistant mention rate', baseline: '10%', target: '29%', change: '+19 pts', unit: "share of the practice's patient-question prompt set naming it, across 4 assistants" },
    ],
    benchmarkKeys: ['dental_cpl', 'dental_call_conv', 'dental_calls_missed', 'dental_newpt_value', 'patient_ai', 'health_aio'],
    auditedAt: '2026-09-01',
    image: IMG.reception,
    publishGate: 'publish',
  },
  {
    id: 'dentistry-of-orlando',
    caseId: 'QA-FL-DENT-11',
    client: 'Dentistry of Orlando',
    domain: 'dentistryoforlando.com',
    market: 'Orlando, FL',
    state: 'FL',
    stateName: 'Florida',
    niche: 'dental',
    services: ['ppc'],
    tier: 'Authority',
    retainerBand: '$5,000/mo',
    headline: 'Selling implants and cosmetics with no way to pay for them',
    snapshot:
      'Two-location Orlando practice — Avalon Park and Hansel Avenue — run by a single dentist, Dr. Marc Chapkis, covering family dentistry, cosmetics, same-day crowns, Invisalign, implant restorations and urgent care.',
    startingPosition:
      'Blog, appointment request form, per-service pages, WordPress with Elementor. No financing page. No membership plan. No stated insurance network status. Two locations against one named dentist.',
    coreProblem:
      'The practice advertises implants, veneers and full cosmetic work — four-figure cases — and offers a prospective patient no financing path, no membership plan and no way to know if they are in-network.',
    diagnosis:
      'For high-ticket dentistry, the financing page is a conversion asset, not an administrative one. A single-tooth implant averages $2,143 nationally before the crown. Sending paid traffic to a page that names that treatment and answers no affordability question is where the 10.67% category conversion rate goes to die.',
    differentiator:
      'One dentist across two locations caps capacity — this is a cost-per-booked-patient problem, not a volume problem. Buying more leads would have made it worse.',
    engines: ['M.A.R.S. for call tracking, missed-call recovery and booking attribution'],
    kpis: [
      { label: 'Cost per lead by intent tier', baseline: '$111', target: '$87', change: '-22%', unit: 'USD, blended across intent tiers' },
      { label: 'Call-to-appointment conversion rate', baseline: '52.0%', target: '64.0%', change: '+12 pts', unit: 'percentage of leads and calls converted' },
      { label: 'Cost per booked new patient', baseline: '$214', target: '$136', change: '-37%', unit: 'USD per acquired patient' },
      { label: 'New patients per month', baseline: 'index 100', target: 'index 150', change: '+50%', unit: 'indexed to engagement start = 100; category average 46/mo' },
    ],
    benchmarkKeys: ['dental_cpl', 'dental_call_conv', 'dental_calls_missed', 'dental_newpt_value', 'dental_implant', 'dental_newpt_vol'],
    auditedAt: '2026-09-01',
    image: IMG.chair,
    publishGate: 'publish',
  },
  {
    id: 'miami-best-dental',
    caseId: 'QA-FL-DENT-12',
    client: 'Miami Best Dental',
    domain: 'miamibestdental.com',
    market: 'South Miami, FL',
    state: 'FL',
    stateName: 'Florida',
    niche: 'dental',
    services: ['ai-seo', 'social'],
    tier: 'Authority',
    retainerBand: '$5,000/mo',
    headline: 'Digital smile design, teeth in a day, and no Spanish in South Miami',
    snapshot:
      "Single-dentist cosmetic-led practice in South Miami under Dr. Brian Nitzberg. Digital smile design, veneers, 3D imaging, laser dentistry, 3D-printed models and full-arch 'teeth in a day'.",
    startingPosition:
      'Online booking, before/after gallery, an unusually deep treatment page set. No blog. No financing or membership page. No Spanish version — in South Miami, running a cosmetic and full-arch case mix.',
    coreProblem:
      'The most technically advanced service list in the Florida book had no content layer to be found through and no Spanish path in a market that demands one.',
    diagnosis:
      'Cosmetic and full-arch patients research for weeks before they call — that research now runs through AI assistants for 47% of patients, and 36% say it changed their final choice. A practice with no blog, no answer content and no third-party mention base is invisible during exactly the phase where a $15,000 full-arch decision gets made.',
    differentiator:
      'A live before/after gallery on a cosmetic practice is the highest-converting social asset available — and it was sitting on a page with no distribution.',
    engines: [
      'Scriblr for AI citation tracking',
      'LinkersPro for earned mention acquisition',
      'M.A.R.S. for attribution from social touch to booked consultation',
    ],
    kpis: [
      { label: 'AI assistant mention rate', baseline: '10%', target: '29%', change: '+19 pts', unit: "share of the practice's patient-question prompt set naming it, across 4 assistants" },
      { label: "Local Pack top-3 coverage on '[treatment] near me'", baseline: '26%', target: '50%', change: '+92%', unit: 'share of grid points in the top 3' },
      { label: 'Non-branded organic new-patient enquiries', baseline: 'index 100', target: 'index 150', change: '+50%', unit: 'indexed to engagement start = 100' },
      { label: 'Instagram engagement rate', baseline: '0.6%', target: '1.9%', change: '+1.3 pts', unit: 'against the 1.8% health and wellness category benchmark' },
    ],
    benchmarkKeys: ['patient_ai', 'health_aio', 'patient_stars', 'offpage_cites', 'dental_implant', 'dental_meta', 'social_health_eng', 'ba_compliance'],
    auditedAt: '2026-09-01',
    image: IMG.imaging,
    publishGate: 'publish',
  },
  {
    id: 'dentists-at-midtown-miami',
    caseId: 'QA-FL-DENT-13',
    client: 'Dentists at Midtown',
    domain: 'dentistsatmidtown.com',
    market: 'Miami, FL',
    state: 'FL',
    stateName: 'Florida',
    niche: 'dental',
    services: ['ppc', 'ai-seo'],
    tier: 'Authority',
    retainerBand: '$5,000/mo',
    headline: "When you don't control the website, you win everywhere else",
    snapshot:
      'Two-dentist practice on North Miami Avenue, in-network with Aetna, Ameritas, Anthem, Cigna, Delta Dental, Guardian, MetLife, United Healthcare and UCCI, plus the Smile Generation Dental Plan.',
    startingPosition:
      'A Pacific Dental Services / Smile Generation template site, mirrored at smilegeneration.com. Online booking, financing and membership plan pages are live; there is no blog. The practice does not independently control the domain, which caps what can be changed on-page.',
    coreProblem:
      'Every standard on-site playbook was off the table. The site is corporate-controlled and cannot be restructured.',
    diagnosis:
      "This is the case where the off-site model earns its keep. 77% of AI citations on branded queries come from sources that are not the brand's own site, and 84% of AI citations trace to earned media. Google Business Profile, review architecture, third-party listings and paid search all sit outside the DSO template — and together they are the larger share of the opportunity anyway.",
    differentiator:
      'The strongest PPO panel in the Florida book. In-network status is the single highest-intent filter patients apply, and it was buried on the template.',
    engines: [
      'M.A.R.S. for call tracking, missed-call recovery and booking attribution',
      'Scriblr for AI citation tracking',
      'LinkersPro for earned mention acquisition',
    ],
    kpis: [
      { label: 'Cost per lead by intent tier', baseline: '$111', target: '$87', change: '-22%', unit: 'USD, blended across intent tiers' },
      { label: 'Call-to-appointment conversion rate', baseline: '52.0%', target: '64.0%', change: '+12 pts', unit: 'percentage of leads and calls converted' },
      { label: 'Cost per booked new patient', baseline: '$214', target: '$136', change: '-37%', unit: 'USD per acquired patient' },
      { label: 'AI assistant mention rate', baseline: '10%', target: '29%', change: '+19 pts', unit: "share of the practice's patient-question prompt set naming it, across 4 assistants" },
    ],
    benchmarkKeys: ['dental_cpl', 'dental_call_conv', 'dental_calls_missed', 'dental_newpt_value', 'patient_ai', 'health_aio', 'offpage_cites', 'earned_media'],
    auditedAt: '2026-09-01',
    image: IMG.clinician,
    publishGate: 'publish',
  },
  {
    id: 'emerald-coast-family-dentistry',
    caseId: 'QA-FL-DENT-14',
    client: 'Emerald Coast Family Dentistry',
    domain: 'emeraldcoastfamilydentistry.com',
    market: 'Pensacola, FL',
    state: 'FL',
    stateName: 'Florida',
    niche: 'dental',
    services: ['ai-seo', 'social'],
    tier: 'Essential',
    retainerBand: '$1,500/mo',
    headline: "Half the domain didn't resolve, and nobody had noticed",
    snapshot:
      'Single-dentist general and family practice in Pensacola under Dr. Jennifer Boudreaux Georgiades. Composite fillings, crowns and bridges, implant restorations, dentures, extractions, root canals, digital radiography and nitrous for anxious patients.',
    startingPosition:
      'The apex domain returns HTTP 403 — only the www hostname resolves. No blog. One consolidated services page rather than per-treatment pages. No financing or membership page. No before/after gallery. A flat brochure structure typical of an older dental-vendor template.',
    coreProblem:
      'Half the traffic to the domain was hitting a 403 error, and the site had no page depth to rank or be cited on regardless.',
    diagnosis:
      "An apex returning 403 splits link equity, breaks direct-entry traffic and produces a broken first impression for anyone who types the domain without the www. It is a thirty-minute fix that had been live long enough to shape the practice's entire organic baseline. Underneath it: one services page covering a treatment list that should be ten.",
    differentiator:
      'Nitrous for anxious patients is a genuine differentiator with real search demand in Pensacola, and it did not have a page.',
    engines: [
      'Scriblr for AI citation tracking',
      'LinkersPro for earned mention acquisition',
      'M.A.R.S. for attribution from social touch to booked consultation',
    ],
    kpis: [
      { label: 'AI assistant mention rate', baseline: '4%', target: '24%', change: '+20 pts', unit: "share of the practice's patient-question prompt set naming it, across 4 assistants" },
      { label: "Local Pack top-3 coverage on '[treatment] near me'", baseline: '11%', target: '37%', change: '+236%', unit: 'share of grid points in the top 3' },
      { label: 'Non-branded organic new-patient enquiries', baseline: 'index 100', target: 'index 190', change: '+90%', unit: 'indexed to engagement start = 100' },
      { label: 'Instagram engagement rate', baseline: '0.6%', target: '1.9%', change: '+1.3 pts', unit: 'against the 1.8% health and wellness category benchmark' },
    ],
    benchmarkKeys: ['patient_ai', 'health_aio', 'patient_stars', 'offpage_cites', 'dental_meta', 'social_health_eng'],
    auditedAt: '2026-09-01',
    image: IMG.chair,
    publishGate: 'publish',
  },

  // ── New Jersey ─────────────────────────────────────────────────────────────
  {
    id: 'jersey-city-dental',
    caseId: 'QA-NJ-DENT-10',
    client: 'Jersey City Dental',
    domain: 'jerseycitydentalcenter.com',
    market: 'Jersey City / Hoboken, NJ',
    state: 'NJ',
    stateName: 'New Jersey',
    niche: 'dental',
    services: ['ppc', 'ai-seo'],
    tier: 'Dominance',
    retainerBand: '$8,500/mo',
    headline: "An AACD Fellow, a board-certified endodontist, and a domain that doesn't match the brand",
    snapshot:
      'Two-location cosmetic-led practice across Jersey City and Hoboken with six decades of history. Dr. Andrew Paek is an AACD Fellow and Kois graduate; Dr. Christopher Higgins is a board-certified endodontist. All-on-4, veneers, smile makeover, laser gum contouring, sedation and virtual cosmetic consults.',
    startingPosition:
      "Blog, CareStack patient portal booking, before/after gallery, financing with 0% and CareCredit, per-service pages, WordPress. Structurally the strongest site in the New Jersey book. The practice brands itself 'Jersey City Dental' while the domain reads jerseycitydentalcenter.com.",
    coreProblem:
      'The highest credential stack in the New Jersey book was being marketed on price-neutral general dentistry terms, with a brand name that did not match its own domain.',
    diagnosis:
      'AACD Fellowship is held by a very small number of dentists nationally. That credential is the entire argument for premium cosmetic fee positioning — and it was sitting on an about page rather than driving the acquisition strategy. Meanwhile the brand/domain mismatch fragments branded search and confuses entity resolution for every assistant trying to work out what this practice is called.',
    differentiator:
      'Two markets, two very different patient profiles. Hoboken cosmetic demand and Jersey City family demand were sharing one message.',
    engines: [
      'M.A.R.S. for call tracking, missed-call recovery and booking attribution',
      'Scriblr for AI citation tracking',
      'LinkersPro for earned mention acquisition',
    ],
    kpis: [
      { label: 'Cost per lead by intent tier', baseline: '$99', target: '$85', change: '-14%', unit: 'USD, blended across intent tiers' },
      { label: 'Call-to-appointment conversion rate', baseline: '58.0%', target: '69.0%', change: '+11 pts', unit: 'percentage of leads and calls converted' },
      { label: 'Cost per booked new patient', baseline: '$170', target: '$123', change: '-28%', unit: 'USD per acquired patient' },
      { label: 'AI assistant mention rate', baseline: '17%', target: '38%', change: '+21 pts', unit: "share of the practice's patient-question prompt set naming it, across 4 assistants" },
    ],
    benchmarkKeys: ['dental_cpl', 'dental_call_conv', 'dental_calls_missed', 'dental_newpt_value', 'patient_ai', 'health_aio'],
    auditedAt: '2026-09-01',
    image: IMG.clinician,
    publishGate: 'publish',
  },
  {
    id: 'newark-dentist',
    caseId: 'QA-NJ-DENT-11',
    client: 'Newark Dentist',
    domain: 'newark-dentist.com',
    market: 'Newark, NJ',
    state: 'NJ',
    stateName: 'New Jersey',
    niche: 'dental',
    services: ['ppc'],
    tier: 'Essential',
    retainerBand: '$1,500/mo',
    headline: 'A single page, no navigation, and 2,000 words about Branch Brook Park',
    snapshot:
      "Emergency-led general practice on Elm Street in Newark's Ironbound. Family, pediatric, cosmetic, implants, veneers, whitening and restorative work.",
    startingPosition:
      "A single-page site with no navigation menu and no footer nav. No booking form. No service pages. No blog. No financing. Roughly 2,000 words of Newark tourism filler — Branch Brook Park, the Cathedral Basilica, the Ironbound — wrapped around minimal dental copy. The site renders the dentist's name as 'Vallego'; every external listing spells it Vallejo.",
    coreProblem:
      "This is not a practice website. It is a thin local-SEO lander built by someone else, and the dentist's name is misspelled on it.",
    diagnosis:
      'A misspelled practitioner name breaks entity matching across Google Business Profile, Healthgrades, insurance directories and every AI assistant simultaneously — the machine cannot connect the site to the dentist. Layered on a single page with no booking path and filler content, there was no version of paid or organic that worked here. The foundation had to come first.',
    differentiator:
      "A second domain, vallejo.dental, appears to be the dentist's real practice site. Consolidating to one canonical property was step one, before a single dollar of media.",
    engines: ['M.A.R.S. for call tracking, missed-call recovery and booking attribution'],
    kpis: [
      { label: 'Cost per lead by intent tier', baseline: '$132', target: '$90', change: '-32%', unit: 'USD, blended across intent tiers' },
      { label: 'Call-to-appointment conversion rate', baseline: '44.0%', target: '58.0%', change: '+14 pts', unit: 'percentage of leads and calls converted' },
      { label: 'Cost per booked new patient', baseline: '$301', target: '$155', change: '-48%', unit: 'USD per acquired patient' },
      { label: 'New patients per month', baseline: 'index 100', target: 'index 190', change: '+90%', unit: 'indexed to engagement start = 100; category average 46/mo' },
    ],
    benchmarkKeys: ['dental_cpl', 'dental_call_conv', 'dental_calls_missed', 'dental_newpt_value', 'dental_newpt_vol'],
    auditedAt: '2026-09-01',
    image: IMG.reception,
    publishGate: 'publish',
  },
  {
    id: 'west-broadway-dental',
    caseId: 'QA-NJ-DENT-12',
    client: 'West Broadway Dental',
    domain: 'westbroadwaydental.com',
    market: 'Paterson, NJ',
    state: 'NJ',
    stateName: 'New Jersey',
    niche: 'dental',
    services: ['ai-seo'],
    tier: 'Growth',
    retainerBand: '$3,000/mo',
    headline: "North Jersey's largest multi-specialty clinic, with no Spanish page in Paterson",
    snapshot:
      'Two-location multi-specialty clinic in Paterson operating for more than 35 years, uniquely accepting both PPO plans and eight Medicaid programs — Amerigroup, NJ Medicaid, Horizon NJ Health, DentaQuest, United Healthcare Community Plan, Liberty, Fidelio and Wellcare. Dr. Atalla is an Invisalign elite provider.',
    startingPosition:
      'A Tebra vendor template with per-service pages, an appointment request button, and a testimonials page. No blog. No financing or membership page. No before/after gallery. No Spanish version, in Paterson.',
    coreProblem:
      'The single most access-defining fact about this practice — that it takes eight Medicaid plans in a market that needs them — had no page, and the site spoke only English in a majority-Hispanic city.',
    diagnosis:
      "Medicaid acceptance is the highest-intent qualifying query in this market and almost nobody competes for it, because most practices don't take it. West Broadway does, at scale, and buried it in a list. Combined with no Spanish content in Paterson, the practice was invisible on both of the two searches its actual patients run.",
    differentiator:
      'Invisalign elite provider status is a genuine cosmetic credential sitting inside a Medicaid-access practice — two distinct audiences that needed separating, not blending.',
    engines: ['Scriblr for AI citation tracking', 'LinkersPro for earned mention acquisition'],
    kpis: [
      { label: 'AI assistant mention rate', baseline: '4%', target: '24%', change: '+20 pts', unit: "share of the practice's patient-question prompt set naming it, across 4 assistants" },
      { label: "Local Pack top-3 coverage on '[treatment] near me'", baseline: '11%', target: '37%', change: '+236%', unit: 'share of grid points in the top 3' },
      { label: 'Non-branded organic new-patient enquiries', baseline: 'index 100', target: 'index 190', change: '+90%', unit: 'indexed to engagement start = 100' },
      { label: 'Review rating, volume and recency', baseline: 'index 100', target: 'index 240', change: '+140%', unit: 'new reviews per month, indexed; 4.5+ stars required by 44% of patients' },
    ],
    benchmarkKeys: ['patient_ai', 'health_aio', 'patient_stars', 'offpage_cites'],
    auditedAt: '2026-09-01',
    image: IMG.imaging,
    publishGate: 'publish',
  },
  {
    id: 'north-broad-family-dental',
    caseId: 'QA-NJ-DENT-13',
    client: 'North Broad Family Dental & Orthodontics',
    domain: 'dentist-elizabeth.com',
    market: 'Elizabeth, NJ',
    state: 'NJ',
    stateName: 'New Jersey',
    niche: 'dental',
    services: ['ppc', 'social'],
    tier: 'Authority',
    retainerBand: '$5,000/mo',
    headline: 'The brand and the domain were two different practices as far as Google was concerned',
    snapshot:
      'Full-service family practice on North Broad Street in Elizabeth under Dr. Ben Pomeranc, operating over 30 years. General, cosmetic, orthodontics, Invisalign, implants, oral surgery, pediatric and emergency, with a membership plan and a dedicated Spanish subdomain.',
    startingPosition:
      "Blog with three articles, Adit online booking, smile gallery, membership plan, and a Spanish version at spanish.dentist-elizabeth.com. Headline claims '80 Years Dental Experience in 1 Location' — combined team experience, not practice age, which reads as a founding-date claim.",
    coreProblem:
      'The practice is called North Broad Family Dental & Orthodontics and lives at dentist-elizabeth.com, with its Spanish content on a separate subdomain — three identities for one business.',
    diagnosis:
      'Entity confusion is the quiet killer in local search and it is fatal in AI answers, where an assistant needs to resolve a name to a place to a phone number with confidence. Three signals pointing at three names produces a practice that assistants decline to recommend. The Spanish subdomain compounds it — subdomains are treated as separate entities and inherit little authority from the parent.',
    differentiator:
      'A live Spanish site in Elizabeth is a real asset. It needed to be a subfolder with hreflang, not an orphaned subdomain.',
    engines: [
      'M.A.R.S. for call tracking, missed-call recovery and booking attribution',
      'M.A.R.S. for attribution from social touch to booked consultation',
    ],
    kpis: [
      { label: 'Cost per lead by intent tier', baseline: '$93', target: '$73', change: '-22%', unit: 'USD, blended across intent tiers' },
      { label: 'Call-to-appointment conversion rate', baseline: '52.0%', target: '64.0%', change: '+12 pts', unit: 'percentage of leads and calls converted' },
      { label: 'Cost per booked new patient', baseline: '$180', target: '$114', change: '-37%', unit: 'USD per acquired patient' },
      { label: 'Instagram engagement rate', baseline: '0.6%', target: '1.9%', change: '+1.3 pts', unit: 'against the 1.8% health and wellness category benchmark' },
    ],
    benchmarkKeys: ['dental_cpl', 'dental_call_conv', 'dental_calls_missed', 'dental_newpt_value', 'dental_meta', 'social_health_eng'],
    auditedAt: '2026-09-01',
    image: IMG.reception,
    publishGate: 'publish',
  },
  {
    id: 'rana-dental',
    caseId: 'QA-NJ-DENT-14',
    client: 'RANA Dental',
    domain: 'ranadental.com',
    market: 'Lincoln Park, NJ',
    state: 'NJ',
    stateName: 'New Jersey',
    niche: 'dental',
    services: ['ai-seo', 'ppc'],
    tier: 'Authority',
    retainerBand: '$5,000/mo',
    headline: 'All-on-4 at the top of the nav, and nothing to be found for underneath it',
    snapshot:
      'Implant-led three-dentist practice in Lincoln Park — Dr. Samir Rana, Dr. Maggie Rana and Dr. Afsoun Adibi. All-on-4 and implants sit at the top of the navigation, alongside sedation, dentures, veneers and emergency care. Built on Framer, with ZocDoc booking and English/Spanish service.',
    startingPosition:
      'Blog in the footer, ZocDoc booking, insurance and financing page, before/after imagery, English and Español noted. Built on Framer — a modern design-led platform, unusual in this vertical and technically clean.',
    coreProblem:
      'The practice bet its positioning on the highest-value case in dentistry and had almost no content answering the questions those patients actually ask before committing.',
    diagnosis:
      'All-on-4 averages around $15,176 per arch. Nobody books that from a homepage. The decision runs weeks of research — cost, recovery, candidacy, alternatives, financing — and 47% of patients now run part of that research through an AI assistant. A practice with implants at the top of its nav and a footer blog is present for the click and absent for the decision.',
    differentiator:
      'Framer builds are fast and clean but content-light by default. The platform was fine; the content strategy did not exist.',
    engines: [
      'Scriblr for AI citation tracking',
      'LinkersPro for earned mention acquisition',
      'M.A.R.S. for call tracking, missed-call recovery and booking attribution',
    ],
    kpis: [
      { label: 'AI assistant mention rate', baseline: '10%', target: '29%', change: '+19 pts', unit: "share of the practice's patient-question prompt set naming it, across 4 assistants" },
      { label: "Local Pack top-3 coverage on '[treatment] near me'", baseline: '26%', target: '50%', change: '+92%', unit: 'share of grid points in the top 3' },
      { label: 'Non-branded organic new-patient enquiries', baseline: 'index 100', target: 'index 150', change: '+50%', unit: 'indexed to engagement start = 100' },
      { label: 'Cost per lead by intent tier', baseline: '$93', target: '$73', change: '-22%', unit: 'USD, blended across intent tiers' },
    ],
    benchmarkKeys: ['patient_ai', 'health_aio', 'patient_stars', 'offpage_cites', 'dental_implant', 'dental_cpl', 'dental_call_conv'],
    auditedAt: '2026-09-01',
    image: IMG.imaging,
    publishGate: 'publish',
  },

  // ── Georgia ────────────────────────────────────────────────────────────────
  {
    id: 'rivertown-dental-care',
    caseId: 'QA-GA-DENT-10',
    client: 'Rivertown Dental Care',
    domain: 'rivertowndentalcare.com',
    market: 'Columbus, GA',
    state: 'GA',
    stateName: 'Georgia',
    niche: 'dental',
    services: ['ai-seo', 'ppc'],
    tier: 'Authority',
    retainerBand: '$5,000/mo',
    headline: '3,113 reviews and no named source for a single one of them',
    snapshot:
      "Four-dentist practice on Warm Springs Road in Columbus, operating since 1968. Preventive, children's care, periodontics, implants, dentures, sleep apnea, clear aligners and cosmetics. PPO-oriented across Aetna, BCBS, Cigna, Delta, Guardian, MetLife and United Concordia, with CareCredit financing.",
    startingPosition:
      'Blog, online booking, extensive service pages, pay-bill and patient login, accessibility called out. The site displays 4.9 stars across 3,113 reviews without naming the platform those reviews come from.',
    coreProblem:
      'The largest review claim in the entire fifty had no attributed source, which makes it unverifiable to a patient, a search engine and an AI assistant alike.',
    diagnosis:
      'An unsourced review count is a wasted asset. 3,113 reviews would be a genuine moat in a market the size of Columbus — but only if it resolves to a named platform an assistant can check. Review rating and quantity are direct local pack factors, and 66% of patients say provider review responses influence trust. Unattributed, none of that lands.',
    differentiator:
      'Sleep apnea and wheelchair accessibility are both real differentiators in Columbus with search demand and almost no local competition for the answer.',
    engines: [
      'Scriblr for AI citation tracking',
      'LinkersPro for earned mention acquisition',
      'M.A.R.S. for call tracking, missed-call recovery and booking attribution',
    ],
    kpis: [
      { label: 'AI assistant mention rate', baseline: '21%', target: '38%', change: '+17 pts', unit: "share of the practice's patient-question prompt set naming it, across 4 assistants" },
      { label: "Local Pack top-3 coverage on '[treatment] near me'", baseline: '44%', target: '64%', change: '+45%', unit: 'share of grid points in the top 3' },
      { label: 'Non-branded organic new-patient enquiries', baseline: 'index 100', target: 'index 128', change: '+28%', unit: 'indexed to engagement start = 100' },
      { label: 'Cost per lead by intent tier', baseline: '$71', target: '$61', change: '-14%', unit: 'USD, blended across intent tiers' },
    ],
    benchmarkKeys: ['patient_ai', 'health_aio', 'patient_stars', 'offpage_cites', 'dental_cpl', 'dental_call_conv', 'reviews_respond'],
    auditedAt: '2026-09-01',
    image: IMG.clinician,
    publishGate: 'publish',
  },
  {
    id: 'marietta-dental-professionals',
    caseId: 'QA-GA-DENT-11',
    client: 'Marietta Dental Professionals',
    domain: 'mariettadentalpros.com',
    market: 'Marietta, GA',
    state: 'GA',
    stateName: 'Georgia',
    niche: 'dental',
    services: ['ppc'],
    tier: 'Authority',
    retainerBand: '$5,000/mo',
    headline: 'Backed by eight practices and bidding like a single office',
    snapshot:
      'Four-dentist Marietta practice including an oral surgeon, part of Blueprint Smiles Dental Group — an eight-practice Atlanta-metro group spanning Buford, Acworth, Duluth, Atlanta, Roswell and Dunwoody. Same-day dentistry, implants, clear aligners, oral surgery and emergency care, with a group membership plan.',
    startingPosition:
      "Blog, Modento online booking, insurance and payment pages, membership plan, before/after gallery, WordPress with Elementor. The group site claims 7,500 five-star reviews across all eight locations. Positioning: 'Modern dentistry that keeps your day moving.'",
    coreProblem:
      "Group-scale assets — 7,500 reviews, eight locations, a shared membership plan, an in-house oral surgeon — were producing no advantage at the individual location's auction level.",
    diagnosis:
      "Group affiliation is only worth something if the individual location's marketing uses it. Same-day treatment and an on-staff oral surgeon are exactly the promises that win emergency and extraction searches, where intent is highest and conversion fastest. The Marietta account was bidding on general dentistry terms like an unaffiliated single office.",
    differentiator:
      'Eight Atlanta-metro locations under one group means internal competition risk. Geographic separation across the group is a portfolio problem, not a location problem.',
    engines: ['M.A.R.S. for call tracking, missed-call recovery and booking attribution'],
    kpis: [
      { label: 'Cost per lead by intent tier', baseline: '$99', target: '$85', change: '-14%', unit: 'USD, blended across intent tiers' },
      { label: 'Call-to-appointment conversion rate', baseline: '58.0%', target: '69.0%', change: '+11 pts', unit: 'percentage of leads and calls converted' },
      { label: 'Cost per booked new patient', baseline: '$170', target: '$123', change: '-28%', unit: 'USD per acquired patient' },
      { label: 'New patients per month', baseline: 'index 100', target: 'index 128', change: '+28%', unit: 'indexed to engagement start = 100; category average 46/mo' },
    ],
    benchmarkKeys: ['dental_cpl', 'dental_cpl_emerg', 'dental_call_conv', 'dental_calls_missed', 'dental_newpt_value', 'dental_newpt_vol'],
    auditedAt: '2026-09-01',
    image: IMG.chair,
    publishGate: 'publish',
  },
  {
    id: 'savannah-dental',
    caseId: 'QA-GA-DENT-12',
    client: 'Savannah Dental',
    domain: 'savannah.dental',
    market: 'Savannah, GA',
    state: 'GA',
    stateName: 'Georgia',
    niche: 'dental',
    services: ['ai-seo', 'social'],
    tier: 'Growth',
    retainerBand: '$3,000/mo',
    headline: 'Airway therapy, tongue-tie release, facial aesthetics — and no blog to explain any of it',
    snapshot:
      'Two-dentist practice on East 68th Street in Savannah with an unusually broad and genuinely differentiated menu: digital smile design, Invisalign, full-mouth restoration, laser dentistry, airway therapy, Myobrace, rapid palatal expanders, tongue-tie release, plus facial aesthetics — injectables, NightLase, LipLase and SmoothLase. Premium .dental domain, fee-for-service leaning with four financing partners and an in-office discount plan.',
    startingPosition:
      'NexHealth online booking, gallery, dedicated finance and insurance page, extensive service pages, WordPress with Elementor. No blog found anywhere on the site.',
    coreProblem:
      'A practice built on services most patients have never heard of had no content explaining what any of them are.',
    diagnosis:
      "Airway therapy, Myobrace and tongue-tie release are not searched by name by the people who need them — they are searched as symptoms. 'My child grinds their teeth', 'baby can't latch', 'I stop breathing at night'. That is a pure answer-content play and the highest-leverage AI SEO opportunity in the Georgia book, and the practice had nothing to be cited for.",
    differentiator:
      'Fee-for-service with four financing partners means fee positioning is defensible. This practice does not need volume — it needs the right forty patients a year.',
    engines: [
      'Scriblr for AI citation tracking',
      'LinkersPro for earned mention acquisition',
      'M.A.R.S. for attribution from social touch to booked consultation',
    ],
    kpis: [
      { label: 'AI assistant mention rate', baseline: '10%', target: '29%', change: '+19 pts', unit: "share of the practice's patient-question prompt set naming it, across 4 assistants" },
      { label: "Local Pack top-3 coverage on '[treatment] near me'", baseline: '26%', target: '50%', change: '+92%', unit: 'share of grid points in the top 3' },
      { label: 'Non-branded organic new-patient enquiries', baseline: 'index 100', target: 'index 150', change: '+50%', unit: 'indexed to engagement start = 100' },
      { label: 'Instagram engagement rate', baseline: '0.6%', target: '1.9%', change: '+1.3 pts', unit: 'against the 1.8% health and wellness category benchmark' },
    ],
    benchmarkKeys: ['patient_ai', 'health_aio', 'patient_stars', 'offpage_cites', 'dental_meta', 'social_health_eng'],
    auditedAt: '2026-09-01',
    image: IMG.imaging,
    publishGate: 'publish',
  },
  {
    id: 'midtown-dental-care-columbus',
    caseId: 'QA-GA-DENT-13',
    client: 'Midtown Dental Care',
    domain: 'midtowndentalcare.com',
    market: 'Columbus, GA',
    state: 'GA',
    stateName: 'Georgia',
    niche: 'dental',
    services: ['ppc', 'ai-seo'],
    tier: 'Essential',
    retainerBand: '$1,500/mo',
    headline: 'Named for a neighbourhood in a different city, four miles from another client',
    snapshot:
      'Two-dentist preventive and family practice on 14th Street in Columbus, Georgia, operating as Georgia Dental Professionals PC. Cleanings, checkups, comprehensive exams, imaging and pediatric care.',
    startingPosition:
      "Online booking and a payment options page, on a Yext-style vendor-hosted CDN with a Demandforce listing. No blog. The narrowest service menu in the Georgia book — no implants, cosmetic, orthodontic or emergency pages at all. Two important geographic facts: the practice is in Columbus GA, not Atlanta's Midtown, and it sits roughly four miles from Rivertown Dental Care.",
    coreProblem:
      "A practice named 'Midtown' in a city whose Midtown is 100 miles away, with the shortest service list in the book, four miles from another practice in the same portfolio.",
    diagnosis:
      'Two problems stacked. The brand name pulls Atlanta-Midtown search intent that this practice cannot serve and does not want — an entity mismatch that misdirects both traffic and assistant answers. And a preventive-only service list caps revenue per patient structurally: no implants, no cosmetics, no emergency means no high-value case can enter the practice through search at all.',
    differentiator:
      'Portfolio conflict flagged: Rivertown Dental Care is four miles away in the same book. Keyword and geographic separation between the two is mandatory before either scales spend.',
    engines: [
      'M.A.R.S. for call tracking, missed-call recovery and booking attribution',
      'Scriblr for AI citation tracking',
      'LinkersPro for earned mention acquisition',
    ],
    kpis: [
      { label: 'Cost per lead by intent tier', baseline: '$95', target: '$65', change: '-32%', unit: 'USD, blended across intent tiers' },
      { label: 'Call-to-appointment conversion rate', baseline: '44.0%', target: '58.0%', change: '+14 pts', unit: 'percentage of leads and calls converted' },
      { label: 'Cost per booked new patient', baseline: '$216', target: '$112', change: '-48%', unit: 'USD per acquired patient' },
      { label: 'AI assistant mention rate', baseline: '4%', target: '24%', change: '+20 pts', unit: "share of the practice's patient-question prompt set naming it, across 4 assistants" },
    ],
    benchmarkKeys: ['dental_cpl', 'dental_call_conv', 'dental_calls_missed', 'dental_newpt_value', 'patient_ai', 'health_aio'],
    auditedAt: '2026-09-01',
    image: IMG.reception,
    publishGate: 'publish',
  },
  {
    id: 'gwinnett-family-dental-care',
    caseId: 'QA-GA-DENT-14',
    client: 'Gwinnett Family Dental Care',
    domain: 'gwinnettfamilydentalcare.com',
    market: 'Lawrenceville, GA',
    state: 'GA',
    stateName: 'Georgia',
    niche: 'dental',
    services: ['ai-seo'],
    tier: 'Authority',
    retainerBand: '$5,000/mo',
    headline: "Five dentists, an oral surgery arm, and no 'Book Now' in the navigation",
    snapshot:
      'Five-dentist practice on Lawrenceville Highway in Gwinnett County, Atlanta metro — the largest named clinician roster in the fifty. General dentistry, a distinct oral surgery pillar covering implants, wisdom teeth and extractions, plus cosmetics. Independent, not part of any group.',
    startingPosition:
      "Blog, appointment and contact forms, extensive service pages, financial information page, WordPress. Navigation is organised by service category — Home, About us, General Dentistry, Oral Surgery, Cosmetic Procedures, Review Us, Contact Us — with no 'Insurance' item and no 'Book Now' item.",
    coreProblem:
      'The two things a new patient looks for first — do you take my insurance, and how do I book — were both absent from the navigation of a five-dentist practice.',
    diagnosis:
      'Five named dentists is the strongest E-E-A-T asset in the Georgia book and a real capacity advantage — this practice can absorb volume most single-doctor offices cannot. But navigation is the conversion path, and the two highest-intent destinations were missing from it. Meanwhile the oral surgery pillar, which is where the case value lives, was one of three equal nav items.',
    differentiator:
      'A dedicated oral surgery capability inside a general practice is rare and highly searched. It deserved to be the primary acquisition angle rather than a nav peer.',
    engines: ['Scriblr for AI citation tracking', 'LinkersPro for earned mention acquisition'],
    kpis: [
      { label: 'AI assistant mention rate', baseline: '10%', target: '29%', change: '+19 pts', unit: "share of the practice's patient-question prompt set naming it, across 4 assistants" },
      { label: "Local Pack top-3 coverage on '[treatment] near me'", baseline: '26%', target: '50%', change: '+92%', unit: 'share of grid points in the top 3' },
      { label: 'Non-branded organic new-patient enquiries', baseline: 'index 100', target: 'index 150', change: '+50%', unit: 'indexed to engagement start = 100' },
      { label: 'Review rating, volume and recency', baseline: 'index 100', target: 'index 240', change: '+140%', unit: 'new reviews per month, indexed; 4.5+ stars required by 44% of patients' },
    ],
    benchmarkKeys: ['patient_ai', 'health_aio', 'patient_stars', 'offpage_cites'],
    auditedAt: '2026-09-01',
    image: IMG.clinician,
    publishGate: 'publish',
  },
];
