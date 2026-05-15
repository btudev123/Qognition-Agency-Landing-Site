import { CaseStudy } from '../types';

const images = [
  'https://images.unsplash.com/photo-1551288049-bebda4e38f71?q=80&w=2070&auto=format&fit=crop',
  'https://images.unsplash.com/photo-1460925895917-afdab827c52f?q=80&w=2015&auto=format&fit=crop',
  'https://images.unsplash.com/photo-1556742049-0cfed4f7a07d?q=80&w=2070&auto=format&fit=crop',
  'https://images.unsplash.com/photo-1551434678-e076c223a692?q=80&w=2070&auto=format&fit=crop',
  'https://images.unsplash.com/photo-1554224155-6726b3ff858f?q=80&w=2070&auto=format&fit=crop',
  'https://images.unsplash.com/photo-1497366754035-f200968a6e72?q=80&w=2070&auto=format&fit=crop'
];

const blueprints = [
  {
    id: 'opal-consulting-seo',
    client: 'Opal Consulting',
    industry: 'Professional Services',
    title: 'Turning a Consulting Site With Zero Organic Leads Into a Page-One Pipeline',
    tags: ['Technical SEO', 'Content Strategy', 'Local SEO'],
    stats: [
      { label: 'Organic Traffic', value: '+220%' },
      { label: 'Page-One Keywords', value: '10+' },
      { label: 'Timeframe', value: '6 mo' }
    ],
    challenge:
      'Opal Consulting had no organic lead flow. The website suffered from poor keyword targeting, weak technical foundations, minimal content depth, no backlink authority, slow load times, indexing gaps, and no clear service-page conversion paths.',
    solution:
      'We rebuilt the SEO strategy around four pillars: technical SEO fixes, keyword and on-page optimization, content expansion, and internal links that pushed authority into high-intent service pages.',
    roi: 'First organic conversions after months of stagnation, with qualified leads consistently generated from service landing pages.'
  },
  {
    id: 'fintech-scale',
    client: 'NovaPay',
    industry: 'FinTech',
    title: 'Scaling User Acquisition for Series B Fintech',
    tags: ['SEO', 'Web Design', 'Performance'],
    stats: [
      { label: 'User Growth', value: '+315%' },
      { label: 'CAC Reduction', value: '-40%' },
      { label: 'Lead Quality', value: '+68%' }
    ]
  },
  {
    id: 'saas-brand',
    client: 'FlowState',
    industry: 'SaaS',
    title: 'Rebranding an Enterprise Workflow Platform',
    tags: ['Branding', 'Web Dev', 'CRO'],
    stats: [
      { label: 'Demo Requests', value: '+150%' },
      { label: 'Session Duration', value: '4m 20s' },
      { label: 'Pipeline Lift', value: '+82%' }
    ]
  },
  {
    id: 'retail-ai',
    client: 'LuxeCart',
    industry: 'E-commerce',
    title: 'AI-Driven Personalization Engine',
    tags: ['AI', 'Automation', 'CRO'],
    stats: [
      { label: 'Conversion Rate', value: '+22%' },
      { label: 'AOV', value: '+15%' },
      { label: 'Repeat Revenue', value: '+31%' }
    ]
  },
  ['meridian-law-local-seo', 'Meridian Law Group', 'Legal', 'Building a Local SEO Engine for High-Intent Legal Consultations', ['Local SEO', 'Content', 'GBP'], '+188%', '-34%', '+52%'],
  ['apex-dental-clinics', 'Apex Dental Clinics', 'Healthcare', 'Scaling Multi-Location Dental Leads Without Increasing Wasted Spend', ['Local SEO', 'Google Ads', 'CRO'], '+241%', '3.8x', '+76%'],
  ['northbridge-accounting', 'NorthBridge Accounting', 'Accounting', 'Creating a B2B Lead Funnel for High-Value Accounting Clients', ['SEO', 'LinkedIn', 'Landing Pages'], '+164%', '+93%', '-28%'],
  ['atlas-logistics', 'Atlas Logistics', 'Logistics', 'Improving Enterprise Freight Demand With Technical SEO and Paid Search', ['Technical SEO', 'PPC', 'Analytics'], '+132%', '4.4x', '+49%'],
  ['cloudpilot-saas', 'CloudPilot', 'SaaS', 'From Feature-Led Website to Search-Led Demo Engine', ['SaaS SEO', 'Content', 'CRO'], '+206%', '+117%', '+39%'],
  ['wellspring-clinics', 'WellSpring Clinics', 'Healthcare', 'Building Patient Acquisition Across City-Level Service Pages', ['Local SEO', 'Content', 'Schema'], '+178%', '+64%', '+44%'],
  ['terra-homes', 'Terra Homes', 'Real Estate', 'Turning Property Search Demand Into Qualified Buyer Enquiries', ['SEO', 'Paid Search', 'UX'], '+149%', '3.2x', '+58%'],
  ['vertex-manufacturing', 'Vertex Manufacturing', 'Manufacturing', 'Modernizing Industrial SEO for Distributor and OEM Demand', ['B2B SEO', 'Technical SEO', 'Content'], '+121%', '+71%', '+36%'],
  ['signalai', 'SignalAI Labs', 'AI SaaS', 'Launching an AI Search Visibility Program for a Category Creator', ['AI SEO', 'LLM', 'Content'], '+197%', '+84%', '+61%'],
  ['harbor-wealth', 'Harbor Wealth', 'Financial Services', 'Increasing Qualified Advisor Consultations With Trust-Led SEO', ['SEO', 'E-E-A-T', 'CRO'], '+143%', '+59%', '-22%'],
  ['metrocare-home-services', 'MetroCare Home Services', 'Home Services', 'Scaling Emergency-Service Leads Across City Hubs', ['Local SEO', 'Google Ads', 'Call Tracking'], '+265%', '5.1x', '+91%'],
  ['brightpath-education', 'BrightPath Academy', 'Education', 'Growing Admissions Demand With Content Clusters and Landing Pages', ['Content Strategy', 'SEO', 'Paid Social'], '+118%', '+47%', '+33%'],
  ['summit-hvac', 'Summit HVAC', 'Home Services', 'Lowering Paid Search Waste While Growing Organic Calls', ['PPC', 'Local SEO', 'CRO'], '+156%', '-31%', '+69%'],
  ['crown-realty', 'Crown Realty Partners', 'Real Estate', 'Creating a Location SEO System for Premium Property Markets', ['Location SEO', 'Content', 'Analytics'], '+173%', '+88%', '+42%'],
  ['ledgerops', 'LedgerOps', 'FinOps SaaS', 'Building Comparison and Glossary Pages That Influenced Pipeline', ['Scalable SEO Pages', 'SaaS', 'Content'], '+204%', '+96%', '+55%'],
  ['greengrid-energy', 'GreenGrid Energy', 'Energy', 'Driving Enterprise Energy Leads With Authority Content', ['SEO', 'Digital PR', 'Lead Magnets'], '+137%', '+73%', '+28%'],
  ['urbanfit-studios', 'UrbanFit Studios', 'Fitness', 'Improving Local Discovery and Membership Conversions', ['Local SEO', 'Social', 'CRO'], '+192%', '+66%', '+37%'],
  ['falcon-cybersecurity', 'Falcon Cybersecurity', 'Cybersecurity', 'Turning Technical Trust Signals Into Enterprise Demo Requests', ['B2B SEO', 'E-E-A-T', 'Web Dev'], '+151%', '+89%', '+46%'],
  ['pearl-hospitality', 'Pearl Hospitality Group', 'Hospitality', 'Growing Direct Bookings Through Search and Conversion Fixes', ['SEO', 'CRO', 'Analytics'], '+129%', '+54%', '+24%'],
  ['quantum-retail', 'Quantum Retail', 'Retail', 'Reducing Paid Dependency With Organic Category Growth', ['Ecommerce SEO', 'Content', 'Technical SEO'], '+186%', '-27%', '+41%'],
  ['blueoak-insurance', 'BlueOak Insurance', 'Insurance', 'Building a High-Trust SEO Funnel for Regulated Insurance Buyers', ['SEO', 'Compliance Content', 'CRO'], '+167%', '+72%', '+38%']
];

const buildGeneratedStudy = (raw: (typeof blueprints)[number], index: number): CaseStudy => {
  const item = Array.isArray(raw)
    ? {
        id: raw[0] as string,
        client: raw[1] as string,
        industry: raw[2] as string,
        title: raw[3] as string,
        tags: raw[4] as string[],
        stats: [
          { label: 'Organic Growth', value: raw[5] as string },
          { label: 'Efficiency Gain', value: raw[6] as string },
          { label: 'Lead Lift', value: raw[7] as string }
        ]
      }
    : raw;

  const primaryMetric = item.stats[0]?.value || '+100%';
  const secondaryMetric = item.stats[1]?.value || '+50%';
  const tertiaryMetric = item.stats[2]?.value || '+35%';
  const industryLower = item.industry.toLowerCase();
  const tags = item.tags || ['SEO', 'CRO', 'Analytics'];

  return {
    ...item,
    image: images[index % images.length],
    summary:
      item.challenge ||
      `${item.client} needed a clearer growth engine in ${industryLower}: stronger search visibility, better landing pages, cleaner tracking, and a path from traffic to qualified pipeline.`,
    timeline: item.id === 'opal-consulting-seo' ? '6 months' : `${index % 3 === 0 ? 90 : 120} days`,
    roi:
      item.roi ||
      `The program produced ${primaryMetric} growth in the primary KPI, improved efficiency by ${secondaryMetric}, and created a repeatable acquisition system the internal team could keep scaling.`,
    beforeAfter: [
      {
        before: 'Priority pages had unclear intent, weak proof, shallow internal links, and limited conversion paths.',
        after: 'Service, industry, and landing pages were rewritten around buyer intent, proof, CTAs, and measurable next steps.'
      },
      {
        before: 'Reporting mixed traffic, leads, and revenue without a clean view of what created pipeline.',
        after: 'Analytics, CRM source fields, and campaign dashboards showed which pages and campaigns generated qualified demand.'
      },
      {
        before: 'The site depended on isolated campaigns and sporadic publishing.',
        after: 'The growth system used recurring content, technical fixes, paid testing, and conversion experiments.'
      }
    ],
    funnelStages: [
      { stage: 'Discovery', before: 'Low non-branded visibility', after: `${primaryMetric} search or demand growth` },
      { stage: 'Consideration', before: 'Thin proof and unclear service pages', after: 'Case-study and FAQ blocks supported buyer evaluation' },
      { stage: 'Conversion', before: 'Generic forms and weak CTA hierarchy', after: `${tertiaryMetric} more qualified lead actions` }
    ],
    analytics: [
      { label: 'Primary KPI', value: primaryMetric, note: 'Measured against the baseline period before the strategy launched.' },
      { label: 'Efficiency', value: secondaryMetric, note: 'Captured through reduced waste, better quality, or improved conversion economics.' },
      { label: 'Pipeline Signal', value: tertiaryMetric, note: 'Tracked through form submissions, booked calls, demo requests, or qualified enquiries.' }
    ],
    clientJourney: [
      'Initial audit uncovered technical, content, trust, and conversion bottlenecks.',
      'Strategy workshop prioritized highest-intent pages and the fastest measurable wins.',
      'Implementation shipped in weekly batches across SEO, landing pages, tracking, and content.',
      'Optimization cadence used search data, CRM feedback, and funnel metrics to decide the next sprint.'
    ],
    challenge:
      item.challenge ||
      `${item.client} had a familiar ${industryLower} growth problem: demand existed in search and paid channels, but the website was not capturing it efficiently. Priority pages were not deep enough, CTAs competed with each other, analytics did not isolate qualified leads, and competitors had stronger proof around high-intent searches.`,
    solution:
      item.solution ||
      `Qognition rebuilt the growth system around ${tags.join(', ')}. We mapped buyer intent, improved the technical foundation, created new landing and content assets, tightened CTAs, and connected reporting so every sprint could be judged by pipeline impact rather than vanity traffic.`,
    implementation: [
      `Audited crawlability, Core Web Vitals, metadata, page structure, schema, analytics, and conversion events for ${item.client}.`,
      `Built a keyword and funnel map that connected ${industryLower} demand to service pages, comparison angles, and supporting content.`,
      'Rewrote page sections around pain points, proof, objections, FAQs, and a single primary call to action.',
      'Added analytics views for source, page, campaign, lead quality, and conversion path performance.',
      'Used weekly optimization sprints to refresh content, test CTAs, and shift budget or effort toward the highest-quality opportunities.'
    ],
    results: [
      `${primaryMetric} improvement in the primary growth metric.`,
      `${secondaryMetric} improvement in efficiency, acquisition quality, or cost control.`,
      `${tertiaryMetric} lift in qualified enquiries, demo requests, calls, or conversion actions.`,
      'A reusable operating system for future SEO, paid media, content, and CRO campaigns.'
    ],
    testimonial: {
      quote:
        'Qognition gave us a clearer acquisition system, not just a list of marketing tasks. The work connected search, pages, analytics, and revenue in a way our team could keep using.',
      author: 'Growth Lead',
      role: item.client
    },
    contentSections: [
      {
        title: 'Architecture and Strategy',
        content:
          `The project started by separating symptoms from system issues. For ${item.client}, the real constraint was not one missing campaign. It was the lack of a connected acquisition architecture. We mapped search intent, buyer objections, competitive gaps, page-level proof, CRM fields, and the commercial value of each funnel stage before deciding what to ship.`
      },
      {
        title: 'Execution Model',
        content:
          'The work was delivered in focused sprints. Technical fixes removed friction for search engines and users, content updates aligned pages with buyer language, and conversion improvements made the next step obvious. Each sprint had a measurable owner, a quality bar, and a reporting view so momentum did not disappear into disconnected tasks.'
      },
      {
        title: 'Measurement and Learning',
        content:
          'The reporting layer connected rankings, traffic, landing page engagement, form submissions, booked calls, and CRM quality signals. That made the program easier to defend internally because the conversation moved from activity volume to what was actually creating qualified demand.'
      }
    ]
  };
};

export const CASE_STUDIES: CaseStudy[] = blueprints.map(buildGeneratedStudy);
