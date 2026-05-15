import { BacklinkOpportunity } from '../types';

export const BACKLINK_OPPORTUNITIES: BacklinkOpportunity[] = [
  {
    category: 'Business directories',
    targetType: 'Legitimate company profiles and local citations',
    exampleTargets: ['Clutch', 'GoodFirms', 'DesignRush', 'Sortlist', 'The Manifest', 'UpCity'],
    recommendedAsset: 'Case Studies hub and free SEO audit',
    outreachAngle: 'Submit complete profiles with service descriptions, regions, case-study proof, and the free audit as a helpful resource.',
    qualityBar: 'Only use real profiles, consistent NAP/brand facts, no spun descriptions, and no paid link farms.'
  },
  {
    category: 'Partner citations',
    targetType: 'Technology partner listings and integration ecosystems',
    exampleTargets: ['HubSpot ecosystem pages', 'Vercel partner content', 'Webflow communities', 'analytics and CRM partner directories'],
    recommendedAsset: 'Audit backend, HubSpot lead capture, and Next.js SEO implementation pages',
    outreachAngle: 'Pitch implementation examples showing how Qognition connects website audits, HubSpot routing, and conversion tracking.',
    qualityBar: 'The listing must describe real services and link to a relevant Qognition page, not a generic homepage.'
  },
  {
    category: 'Guest contributions',
    targetType: 'Founder, CMO, SaaS, law firm, healthcare, and professional services publications',
    exampleTargets: ['B2B growth blogs', 'legal marketing publications', 'SaaS founder newsletters', 'marketing operations communities'],
    recommendedAsset: 'B2B MoFu guides and AI visibility audit',
    outreachAngle: 'Contribute practical breakdowns: how to audit AI visibility, how to build B2B lead funnels, and how to connect SEO to pipeline.',
    qualityBar: 'No guest-post networks. Only publish original expert content with editorial review and author attribution.'
  },
  {
    category: 'Podcast and webinar appearances',
    targetType: 'Founder-led growth, AI search, SEO, and agency podcasts',
    exampleTargets: ['B2B growth podcasts', 'marketing ops webinars', 'AI search panels', 'local business shows'],
    recommendedAsset: 'LLM audit and AI search benchmark report',
    outreachAngle: 'Offer a teardown format: live audit a website for AI search readiness and explain what buyers should fix first.',
    qualityBar: 'Prioritize shows with real audiences, indexed episode pages, and transcript pages.'
  },
  {
    category: 'Resource-page links',
    targetType: 'Helpful tool and checklist roundups',
    exampleTargets: ['SEO checklist roundups', 'marketing calculator lists', 'B2B lead generation resource pages', 'AI SEO tool lists'],
    recommendedAsset: 'Free SEO audit, free LLM audit, SEO ROI calculator, and B2B guides',
    outreachAngle: 'Pitch genuinely useful free tools that help the publisher’s audience diagnose marketing problems faster.',
    qualityBar: 'Avoid mass outreach. Personalize every pitch and only contact pages where the resource improves the page.'
  },
  {
    category: 'Digital PR',
    targetType: 'Data-led stories and benchmark reports',
    exampleTargets: ['Marketing news sites', 'industry newsletters', 'local business press', 'vertical trade publications'],
    recommendedAsset: 'Industry benchmark report: AI visibility scores across law firms, clinics, consultants, and B2B sites',
    outreachAngle: 'Publish original benchmark findings and pitch journalists the strongest stat, chart, and local/vertical angle.',
    qualityBar: 'Use real methodology, transparent sample sizes, and defensible claims.'
  }
];
