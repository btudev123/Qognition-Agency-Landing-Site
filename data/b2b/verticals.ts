/* THE ICP TAXONOMY. LOCKED BY THE OPERATOR, 2026-09-28.
 *
 * ────────────────────────────────────────────────────────────────────────────
 * READ THIS BEFORE YOU ADD, RENAME OR REMOVE A ROW.
 *
 * These are Qognition's CUSTOMERS. Every entity below is a kind of firm we sell
 * to, and for whom we run paid media, SEO, AI SEO and GEO. They are not case
 * study subjects, not industries we have worked in, and not evidence of
 * anything. CLAUDE.md §11 forbids implying experience in a vertical because a
 * row exists here.
 *
 * NOTHING IN THIS FILE GENERATES A ROUTE. Every entity defaults to
 * `state: 'spine'`, which has no page, no sitemap entry and returns 404. A
 * vertical becomes a page only by being promoted in a separate, reviewed commit
 * that also raises the published ceiling in scripts/check-b2b.cjs. This is
 * deliberate: `data/industries.ts` has no publication field at all, which is the
 * exact mechanism that put 2,161 location pages into the sitemap. Do not repeat
 * it here.
 *
 * The buyer split that governs every page built from this file:
 *
 *   Family B — the prompt OUR CLIENT'S buyer asks.
 *              "Find ISO 9001 and AS9100 certified CNC machining suppliers."
 *              We run it, record it, and publish the observation.
 *              We can never be the cited answer to it. Never target it.
 *
 *   Family Q — the prompt OUR buyer asks.
 *              "Why doesn't ChatGPT recommend my machine shop?"
 *              This is what a page targets.
 *
 * Getting that line wrong is the fastest way to rebuild the location pages a
 * second time. `geoAngle` below describes the Family B opportunity in the
 * client's market — it is the diagnosis we sell, never the query we rank for.
 * ────────────────────────────────────────────────────────────────────────────
 */

/** Demand tier for AI search work, as assessed by the operator. Not a measurement. */
export type Tier = 'S' | 'A' | 'B';

/**
 * Publication state. A discriminated union rather than three booleans, so that
 * "indexable but with no reviewer" is not a representable value.
 *
 *   spine     — exists as data. No route, no sitemap entry, 404 on request.
 *   draft     — authored, renders at its URL, noindex, not in the sitemap.
 *   published — indexable. Requires a named reviewer and a review date.
 */
export type PublicationState =
  | { readonly state: 'spine' }
  | { readonly state: 'draft' }
  | { readonly state: 'published'; readonly reviewedBy: string; readonly reviewedAt: `${number}-${number}-${number}` };

export interface SubNiche {
  /** kebab-case. Becomes the last URL segment if and when this is promoted. */
  readonly id: string;
  readonly label: string;
  /**
   * The Family B opportunity in the client's own market — the shape of the
   * answer their buyer is getting today. This is the diagnosis we sell them.
   * It is NOT a query Qognition targets.
   */
  readonly geoAngle?: string;
  /** Concrete firm types inside this sub-niche. Sales vocabulary, not URLs. */
  readonly examples?: readonly string[];
  readonly publication?: PublicationState;
}

export interface MetaVertical {
  readonly id: string;
  readonly label: string;
  readonly tier: Tier;
  /** Why this vertical buys. One sentence, operator-supplied. */
  readonly why: string;
  readonly subNiches: readonly SubNiche[];
  readonly publication?: PublicationState;
}

export const META_VERTICALS: readonly MetaVertical[] = [
  {
    id: 'saas-software',
    label: 'SaaS and Software',
    tier: 'S',
    why: 'Highest GEO demand. Category comparison queries are where their buyers start, and those answers are assembled by assistants.',
    subNiches: [
      { id: 'horizontal-saas', label: 'Horizontal SaaS', geoAngle: '"Best [category] software" comparison citations', examples: ['CRM', 'HRIS', 'project management', 'ERP-lite'] },
      { id: 'vertical-saas', label: 'Vertical SaaS', geoAngle: 'Category-leader mentions in AI answers', examples: ['dental PMS', 'construction management', 'restaurant tech', 'legal practice management'] },
      { id: 'dev-tools-apis', label: 'Dev tools and APIs', geoAngle: 'Developer-query visibility, "best API for X"', examples: ['auth', 'payments', 'observability', 'CI/CD'] },
      { id: 'ai-ml-tooling', label: 'AI and ML tooling', geoAngle: 'Fast-moving category where buyers default to AI search', examples: ['MLOps', 'vector databases', 'LLM infrastructure', 'eval platforms'] },
      { id: 'cybersecurity-saas', label: 'Cybersecurity SaaS', geoAngle: 'Compliance-driven comparison queries', examples: ['SIEM', 'IAM', 'endpoint', 'GRC'] },
      { id: 'fintech-saas', label: 'FinTech SaaS', geoAngle: 'CFO research queries', examples: ['AP/AR automation', 'treasury', 'spend management'] },
      { id: 'martech-adtech-salestech', label: 'MarTech, AdTech and SalesTech', geoAngle: 'Meta-niche. They buy GEO earliest because they understand it' },
      { id: 'productivity-collaboration', label: 'Productivity and collaboration', geoAngle: 'Crowded category, so citation share is the moat', examples: ['async', 'whiteboard', 'docs'] },
      { id: 'data-analytics-platforms', label: 'Data and analytics platforms', geoAngle: 'Technical buyer research', examples: ['BI', 'CDP', 'warehousing'] },
      { id: 'ecommerce-enablement', label: 'E-commerce enablement', geoAngle: 'Shopify ecosystem GEO', examples: ['subscriptions', 'loyalty', 'returns', 'PIM'] },
    ],
  },
  {
    id: 'professional-services',
    label: 'Professional and Business Services',
    tier: 'S',
    why: 'Referral-dependent firms whose buyers now shortlist by assistant before they ever ask a peer.',
    subNiches: [
      { id: 'legal', label: 'Legal', examples: ['corporate law', 'IP and patent', 'M&A', 'employment', 'immigration', 'litigation finance', 'e-discovery', 'ALSPs', 'legal staffing', 'contract management services'] },
      { id: 'accounting-finance', label: 'Accounting and finance', examples: ['CPA firms', 'outsourced CFO', 'tax advisory including R&D credits and SALT', 'audit firms', 'bookkeeping-as-a-service', 'forensic accounting', 'valuation firms'] },
      { id: 'consulting', label: 'Consulting', examples: ['management', 'strategy', 'operations', 'IT consulting', 'digital transformation', 'change management', 'pricing consultants', 'procurement consulting'] },
      { id: 'hr-talent', label: 'HR and talent', examples: ['RPO', 'executive search', 'staffing across IT, healthcare and industrial', 'EOR and PEO', 'background checks', 'L&D providers', 'compensation benchmarking'] },
      { id: 'marketing-adjacent-b2b', label: 'Marketing-adjacent B2B', geoAngle: 'Agencies buy GEO for themselves', examples: ['PR firms', 'branding agencies', 'demand-gen agencies', 'ABM agencies'] },
      { id: 'translation-localization', label: 'Translation and localization' },
      { id: 'market-research', label: 'Market research firms' },
      { id: 'mystery-shopping', label: 'Mystery shopping' },
      { id: 'facilities-management', label: 'Facilities management' },
    ],
  },
  {
    id: 'healthcare-life-sciences',
    label: 'Healthcare and Life Sciences',
    tier: 'A',
    why: 'High lifetime value and compliance-sensitive, which means the buying committee includes a gate that can kill a deal after it is technically won.',
    subNiches: [
      { id: 'medtech-devices', label: 'MedTech and devices', examples: ['surgical robotics', 'diagnostics', 'imaging', 'wearables', 'DME suppliers'] },
      { id: 'pharma-services', label: 'Pharma services', examples: ['CROs', 'CDMOs', 'clinical trial recruitment', 'pharmacovigilance'] },
      { id: 'health-it', label: 'Health IT', examples: ['EHR vendors', 'RCM companies', 'telehealth infrastructure', 'interoperability'] },
      { id: 'dental-veterinary-b2b', label: 'Dental and veterinary B2B', examples: ['DSO and MSO service providers', 'dental labs', 'vet supply distributors'] },
      { id: 'behavioral-health-ops', label: 'Behavioral health operations', examples: ['ABA clinic software', 'vendors to substance-use treatment chains'] },
      { id: 'longevity-clinic-vendors', label: 'Longevity and anti-aging clinic vendors' },
      { id: 'medical-staffing-billing', label: 'Medical staffing and billing', examples: ['locum tenens', 'healthcare REITs', 'medical billing'] },
    ],
  },
  {
    id: 'financial-services',
    label: 'Financial Services',
    tier: 'A',
    why: 'Regulated, high-consideration purchases where the buyer researches privately before making contact.',
    subNiches: [
      { id: 'commercial-banking-lending', label: 'Commercial banking and lending', examples: ['SMB lenders', 'factoring and invoice finance', 'equipment finance', 'MCA'] },
      { id: 'commercial-insurance', label: 'Insurance, commercial lines', examples: ['brokers', 'MGAs', 'insurtech', 'cyber insurance', 'captive managers'] },
      { id: 'wealth-asset-management', label: 'Wealth and asset management, institutional', examples: ['RIA custodians', 'fund administrators', 'family office services'] },
      { id: 'payments', label: 'Payments', examples: ['ISOs', 'PSPs', 'B2B payments', 'cross-border', 'embedded finance'] },
      { id: 'outsourced-finance', label: 'Accounting tech and outsourced finance', examples: ['fractional CFO firms', 'audit readiness'] },
      { id: 'regtech-compliance', label: 'Compliance and RegTech', examples: ['AML and KYC vendors', 'licensing services'] },
      { id: 'crypto-web3-b2b', label: 'Crypto and Web3 B2B', examples: ['custody', 'treasury management', 'blockchain infrastructure'] },
    ],
  },
  {
    id: 'manufacturing-industrial',
    label: 'Manufacturing and Industrial',
    tier: 'S',
    why: 'Technical buyers who use assistants to build a shortlist but rate them 4.7 out of 10 for trust, so AI search is a shortlist channel and not a traffic channel.',
    subNiches: [
      { id: 'cnc-machining', label: 'CNC machining' },
      { id: 'sheet-metal', label: 'Sheet metal fabrication' },
      { id: 'injection-moulding', label: 'Injection moulding' },
      { id: 'additive-manufacturing', label: '3D printing and additive' },
      { id: 'contract-manufacturing-ems', label: 'Contract manufacturers and EMS' },
      { id: 'industrial-automation', label: 'Industrial automation and robotics integrators' },
      { id: 'oem-components', label: 'OEM components', examples: ['bearings', 'fasteners', 'hydraulics', 'pneumatics'] },
      { id: 'packaging-manufacturers', label: 'Packaging manufacturers', examples: ['corrugated', 'flexible', 'sustainable'] },
      { id: 'chemical-specialty-materials', label: 'Chemical and specialty materials suppliers' },
      { id: 'metal-fabrication', label: 'Metal fabrication, casting and forging' },
      { id: 'industrial-distributors', label: 'Industrial distributors and MRO supplies' },
      { id: 'textile-food-equipment', label: 'Textile, apparel and food processing equipment' },
      { id: 'quality-inspection-iso', label: 'Quality and inspection services, ISO consultants' },
    ],
  },
  {
    id: 'logistics-supply-chain',
    label: 'Logistics, Supply Chain and Transportation',
    tier: 'A',
    why: 'Fragmented supplier markets where the buyer compares on capability attributes an assistant can enumerate.',
    subNiches: [
      { id: '3pl-fulfilment', label: '3PLs and fulfilment centres', geoAngle: 'E-commerce 3PL is the fastest-moving sub-niche' },
      { id: 'freight-brokerage-forwarding', label: 'Freight brokerage and freight forwarding' },
      { id: 'last-mile-cold-chain', label: 'Last-mile delivery and cold chain logistics' },
      { id: 'tms-wms-vendors', label: 'TMS and WMS software vendors' },
      { id: 'fleet-telematics', label: 'Fleet management and telematics' },
      { id: 'warehousing-industrial-re', label: 'Warehousing and industrial real estate' },
      { id: 'customs-trade-compliance', label: 'Customs brokerage and trade compliance' },
      { id: 'reverse-logistics', label: 'Reverse logistics and packaging pooling' },
      { id: 'shipping-saas', label: 'Shipping SaaS and rate management platforms' },
    ],
  },
  {
    id: 'construction-real-estate',
    label: 'Construction, Real Estate and Built Environment',
    tier: 'B',
    why: 'Project-triggered buying with long qualification cycles and loose vocabulary, which makes entity clarity unusually valuable.',
    subNiches: [
      { id: 'commercial-contractors', label: 'Commercial contractors, GCs and specialty trades' },
      { id: 'proptech', label: 'PropTech', examples: ['property management software', 'smart building', 'IoT sensors'] },
      { id: 'construction-tech', label: 'Construction tech', examples: ['estimating', 'project management', 'drone surveying'] },
      { id: 'aec-firms', label: 'Architecture and engineering firms' },
      { id: 'building-materials', label: 'Building materials suppliers and distributors' },
      { id: 'cre-services', label: 'Commercial real estate services', examples: ['brokerages', 'property management', 'facilities'] },
      { id: 'modular-prefab', label: 'Modular and prefab construction' },
      { id: 'hvac-electrical-roofing-distribution', label: 'HVAC/R, electrical wholesale and roofing supply' },
    ],
  },
  {
    id: 'energy-utilities',
    label: 'Energy and Utilities',
    tier: 'B',
    why: 'Policy and incentive-driven demand, where trigger events are dated and public.',
    subNiches: [
      { id: 'commercial-solar-storage', label: 'Commercial solar EPC and battery storage integrators' },
      { id: 'ev-charging', label: 'EV charging infrastructure providers' },
      { id: 'energy-procurement', label: 'Energy brokers and procurement consultants' },
      { id: 'oil-gas-services', label: 'Oil and gas services', examples: ['drilling', 'midstream', 'inspection', 'HSE'] },
      { id: 'utilities-software', label: 'Utilities software', examples: ['grid management', 'AMI'] },
      { id: 'carbon-esg-reporting', label: 'Carbon accounting and ESG reporting vendors' },
      { id: 'renewable-project-developers', label: 'Wind, geothermal and hydrogen project developers' },
    ],
  },
  {
    id: 'it-services',
    label: 'Technology and IT Services',
    tier: 'S',
    why: 'The classic agency niche, and one where Qognition has delivered. Buyers compare on certifications and coverage, both of which assistants enumerate well.',
    subNiches: [
      { id: 'msp-mssp', label: 'MSPs and MSSPs' },
      { id: 'cloud-consultancies', label: 'Cloud consultancies', examples: ['AWS', 'Azure', 'GCP partners'] },
      { id: 'systems-integrators-vars', label: 'Systems integrators and VARs' },
      { id: 'it-staffing', label: 'IT staffing and staff augmentation' },
      { id: 'data-centre-colocation', label: 'Data centre and colocation providers' },
      { id: 'telecom-ucaas-ccaas', label: 'Telecom, UCaaS and CCaaS providers' },
      { id: 'ai-implementation-consultancies', label: 'AI implementation and automation consultancies', geoAngle: 'Fastest-growing 2026 niche' },
      { id: 'hardware-av-distribution', label: 'Hardware distributors and AV integrators' },
    ],
  },
  {
    id: 'education-training',
    label: 'Education and Training',
    tier: 'B',
    why: 'Committee purchases with published procurement criteria, which are retrievable.',
    subNiches: [
      { id: 'corporate-ld-lms', label: 'Corporate L&D platforms and LMS vendors' },
      { id: 'compliance-training', label: 'Compliance training providers', examples: ['OSHA', 'HIPAA', 'harassment'] },
      { id: 'higher-ed-vendors', label: 'Higher-ed service vendors', examples: ['enrolment management', 'edtech'] },
      { id: 'k12-vendors', label: 'K-12 B2B vendors', examples: ['curriculum', 'SIS software'] },
      { id: 'executive-education', label: 'Executive education and coaching platforms' },
      { id: 'trade-schools-certification', label: 'Trade schools and certification bodies' },
    ],
  },
  {
    id: 'hospitality-travel-events',
    label: 'Hospitality, Travel and Events',
    tier: 'B',
    why: 'The B2B layer beneath a consumer industry, where the buyer is an operator and not a guest.',
    subNiches: [
      { id: 'hotel-tech', label: 'Hotel tech', examples: ['PMS', 'channel managers', 'revenue management'] },
      { id: 'corporate-travel-tmc', label: 'Corporate travel management companies' },
      { id: 'event-tech-venue-sourcing', label: 'Event tech and venue sourcing platforms' },
      { id: 'dmc-mice', label: 'DMCs and MICE services' },
      { id: 'foodservice-distribution', label: 'Restaurant supply and foodservice distribution' },
      { id: 'hospitality-staffing', label: 'Hospitality staffing agencies' },
    ],
  },
  {
    id: 'agriculture-food',
    label: 'Agriculture and Food',
    tier: 'B',
    why: 'Seasonal, certification-heavy buying where standards vocabulary is the differentiator.',
    subNiches: [
      { id: 'agtech', label: 'AgTech', examples: ['precision agriculture', 'farm management software', 'drones'] },
      { id: 'ingredients-copackers', label: 'Food ingredient suppliers and co-packers' },
      { id: 'crop-inputs-distribution', label: 'Seed, fertiliser and crop protection distributors' },
      { id: 'livestock-animal-health', label: 'Livestock tech and animal health' },
      { id: 'cold-storage-food-logistics', label: 'Cold storage and food logistics' },
      { id: 'food-safety-testing', label: 'Food safety testing and certification labs' },
    ],
  },
  {
    id: 'media-marketing-creative',
    label: 'Media, Marketing and Creative',
    tier: 'B',
    why: 'They understand the product, which shortens the sale and raises the bar on proof.',
    subNiches: [
      { id: 'b2b-publishers-trade-media', label: 'B2B publishers and trade media' },
      { id: 'content-syndication-leadgen', label: 'Content syndication and lead-gen networks' },
      { id: 'b2b-production-studios', label: 'Podcast and production studios' },
      { id: 'print-promotional-distributors', label: 'Print and promotional products distributors' },
      { id: 'transcreation-agencies', label: 'Translation and transcreation agencies' },
      { id: 'creator-platforms-b2b', label: 'Influencer and creator platforms, B2B side' },
    ],
  },
  {
    id: 'government-nonprofit',
    label: 'Government, Nonprofit and Institutional',
    tier: 'B',
    why: 'Procurement is public and criteria are published, which makes the evidence layer unusually tractable.',
    subNiches: [
      { id: 'govtech', label: 'GovTech vendors', examples: ['permitting', 'civic engagement', 'public safety software'] },
      { id: 'grant-writing-consulting', label: 'Grant writing and consulting firms' },
      { id: 'nonprofit-tech', label: 'Nonprofit tech', examples: ['donor management', 'fundraising platforms'] },
      { id: 'association-management', label: 'Association management companies' },
      { id: 'defence-contractors', label: 'Defence contractors and suppliers' },
      { id: 'public-sector-staffing', label: 'Public sector staffing and consulting' },
    ],
  },
  {
    id: 'emerging-micro-niches',
    label: 'Emerging and Micro-Niches',
    tier: 'A',
    why: 'Low competition and high GEO payoff. Category vocabulary is still forming, so the firm that defines it gets cited.',
    subNiches: [
      { id: 'ai-implementation-firms', label: 'AI implementation consultancies', geoAngle: 'Selling AI while needing AI visibility themselves' },
      { id: 'longevity-clinic-suppliers', label: 'Longevity clinic vendors', examples: ['peptide suppliers', 'diagnostic labs'] },
      { id: 'fractional-executive-marketplaces', label: 'Fractional executive marketplaces', examples: ['CFO', 'CMO', 'CRO as a service'] },
      { id: 'bpo-nearshore-offshore', label: 'Nearshore and offshore BPO firms' },
      { id: 'cannabis-hemp-b2b', label: 'Cannabis and hemp B2B', examples: ['testing labs', 'packaging', 'payment processors'] },
      { id: 'space-satellite-suppliers', label: 'Space tech suppliers and satellite data vendors' },
      { id: 'robotics-as-a-service', label: 'Robotics-as-a-Service providers' },
      { id: 'quantum-computing-services', label: 'Quantum computing service firms' },
      { id: 'waste-circular-economy', label: 'Waste management and circular economy tech' },
      { id: 'water-treatment-infrastructure', label: 'Water treatment and infrastructure tech' },
      { id: 'senior-care-vendors', label: 'Senior care operator vendors', examples: ['assisted living software', 'staffing'] },
      { id: 'private-equity-services', label: 'Private equity services', examples: ['search funds', 'portfolio company services', 'deal sourcing'] },
    ],
  },
] as const;

/* ── Derived views. Computed once at module scope, never in a component. ───── */

export const META_VERTICAL_COUNT = META_VERTICALS.length;

export const SUB_NICHE_COUNT = META_VERTICALS.reduce((n, v) => n + v.subNiches.length, 0);

export const TIER_S = META_VERTICALS.filter((v) => v.tier === 'S');

export function getMetaVertical(id: string): MetaVertical | undefined {
  return META_VERTICALS.find((v) => v.id === id);
}

export function getSubNiche(verticalId: string, subNicheId: string): SubNiche | undefined {
  return getMetaVertical(verticalId)?.subNiches.find((s) => s.id === subNicheId);
}

/**
 * The only entities that may render an indexable page.
 *
 * Everything in this file is `spine` until promoted, so today this returns an
 * empty array and the taxonomy adds zero URLs to the sitemap. That is the
 * intended state at rest. A build that publishes pages is a build where someone
 * deliberately changed a `publication` field and raised the ceiling in the gate
 * script in the same commit.
 */
export function publishedEntities(): readonly { vertical: MetaVertical; subNiche?: SubNiche }[] {
  const out: { vertical: MetaVertical; subNiche?: SubNiche }[] = [];
  for (const vertical of META_VERTICALS) {
    if (vertical.publication?.state === 'published') out.push({ vertical });
    for (const subNiche of vertical.subNiches) {
      if (subNiche.publication?.state === 'published') out.push({ vertical, subNiche });
    }
  }
  return out;
}
