// Central source of truth for the header mega-menu (desktop) + mobile accordion.
// Spoke service routes resolve to /[spoke]/[slug]; deep sub-service routes resolve
// to /services/[service]/[subService]; industries to /industries/[id]/[slug].

import { INDUSTRIES } from './industries';
import { getSpokePageData } from './spoke-services';
import type { SpokeId } from '../lib/spokes';

export interface NavSubItem {
  label: string;
  href: string;
  desc?: string;
}

export interface NavGroup {
  label: string;
  href: string;
  items: NavSubItem[];
}

export interface SpokeMenu {
  id: SpokeId;
  label: string;
  href: string;
  blurb: string;
  groups: NavGroup[];
  cta: { label: string; href: string };
}

// ── MARKETING — deep, multi-column (services → sub-services) ──────────────────

const marketingMenu: SpokeMenu = {
  id: 'marketing',
  label: 'Marketing',
  href: '/marketing',
  blurb: 'AI-native growth marketing built for revenue, not vanity metrics.',
  cta: { label: 'Free Marketing + AI Search Audit', href: '/marketing/audit' },
  groups: [
    {
      label: 'SEO',
      href: '/marketing/seo',
      items: [
        { label: 'Technical SEO', href: '/services/seo/technical-seo' },
        { label: 'On-Page & Content', href: '/services/seo/content-strategy' },
        { label: 'Off-Page & Link Building', href: '/services/seo/link-building' },
        { label: 'Local SEO', href: '/services/seo/local-seo' },
        { label: 'Programmatic SEO', href: '/services/seo/programmatic-seo' },
        { label: 'E-E-A-T SEO', href: '/services/seo/eeat-seo' },
      ],
    },
    {
      label: 'AI Search',
      href: '/marketing/ai-seo',
      items: [
        { label: 'AI Search Visibility', href: '/services/ai-seo/ai-search-visibility' },
        { label: 'LLM Optimization', href: '/services/ai-seo/llm-optimization' },
        { label: 'Entity Optimization', href: '/services/ai-seo/entity-optimization' },
        { label: 'Answer Engine (AEO)', href: '/services/ai-seo/answer-engine-optimization' },
        { label: 'AI Search Monitoring', href: '/services/ai-seo/ai-search-monitoring' },
      ],
    },
    {
      label: 'Paid Media',
      href: '/marketing/paid-media',
      items: [
        { label: 'Google Ads', href: '/services/ppc/google-ads-management' },
        { label: 'Meta Ads', href: '/services/ppc/meta-ads' },
        { label: 'LinkedIn Ads', href: '/services/ppc/linkedin-ads' },
        { label: 'Landing Page CRO', href: '/services/ppc/landing-page-cro' },
        { label: 'Retargeting Systems', href: '/services/ppc/retargeting-systems' },
        { label: 'Paid Media Analytics', href: '/services/ppc/paid-media-analytics' },
      ],
    },
    {
      label: 'Social',
      href: '/marketing/social',
      items: [
        { label: 'Social Strategy', href: '/services/smm/social-strategy' },
        { label: 'LinkedIn Thought Leadership', href: '/services/smm/linkedin-thought-leadership' },
        { label: 'Short-Form Video', href: '/services/smm/short-form-video' },
        { label: 'Community Management', href: '/services/smm/community-management' },
        { label: 'Influencer Marketing', href: '/services/smm/influencer-marketing' },
      ],
    },
    {
      label: 'Brand & Creative',
      href: '/marketing/brand-strategy',
      items: [
        { label: 'Brand Strategy', href: '/services/branding-creative/brand-strategy' },
        { label: 'Visual Identity', href: '/marketing/visual-identity' },
        { label: 'Creative Direction', href: '/services/branding-creative/creative-direction' },
        { label: 'Motion Design', href: '/services/branding-creative/motion-design' },
        { label: 'Conversion Copywriting', href: '/services/branding-creative/conversion-copywriting' },
      ],
    },
    {
      label: 'More',
      href: '/marketing',
      items: [
        { label: 'Content Marketing', href: '/marketing/content' },
        { label: 'Email & Lifecycle', href: '/marketing/email-lifecycle' },
        { label: 'Conversion Rate (CRO)', href: '/marketing/cro' },
        { label: 'Marketing Pricing', href: '/marketing/pricing' },
      ],
    },
  ],
};

// ── TECH / FINANCE / AUTOMATION — derived grids from spoke sub-services ───────

function gridMenu(
  id: SpokeId,
  blurb: string,
  cta: { label: string; href: string },
): SpokeMenu {
  const data = getSpokePageData(id);
  const items: NavSubItem[] = data.subServices
    .filter((s) => s.slug !== 'audit')
    .map((s) => ({ label: s.title, href: `/${id}/${s.slug}`, desc: s.summary }));
  return {
    id,
    label: data.spoke.charAt(0).toUpperCase() + data.spoke.slice(1),
    href: `/${id}`,
    blurb,
    cta,
    groups: [{ label: 'Services', href: `/${id}`, items }],
  };
}

const techMenu = gridMenu(
  'tech',
  'Revenue-focused engineering — websites, web & mobile apps, AI agents, and performance.',
  { label: 'Free Tech + Performance Audit', href: '/tech/audit' },
);

const financeMenu = gridMenu(
  'finance',
  'Tech-enabled financial operations — bookkeeping, tax, fractional CFO, and reporting.',
  { label: 'Free Finance Health Check', href: '/finance/audit' },
);

const automationMenu = gridMenu(
  'automation',
  'AI agents and intelligent automation that run your operations while you sleep.',
  { label: 'Free Automation Opportunity Map', href: '/automation/audit' },
);

export const SPOKE_MENUS: Record<SpokeId, SpokeMenu> = {
  marketing: marketingMenu,
  tech: techMenu,
  finance: financeMenu,
  automation: automationMenu,
};

// ── INDUSTRIES — derived from INDUSTRIES data (industry → sub-industries) ─────

export interface IndustryNavItem {
  label: string;
  href: string;
  subItems: NavSubItem[];
}

export const INDUSTRY_MENU: IndustryNavItem[] = INDUSTRIES.map((ind) => ({
  label: ind.name,
  href: `/industries/${ind.id}`,
  subItems: ind.subIndustries.slice(0, 4).map((sub) => ({
    label: sub.name,
    href: `/industries/${ind.id}/${sub.slug}`,
  })),
}));

// ── TOP-LEVEL NAV ─────────────────────────────────────────────────────────────

export type TopNavItem =
  | { label: string; href: string; type: 'link' }
  | { label: string; href: string; type: 'spoke'; spoke: SpokeId }
  | { label: string; href: string; type: 'industries' };

export const TOP_NAV: TopNavItem[] = [
  { label: 'Home', href: '/', type: 'link' },
  { label: 'Marketing', href: '/marketing', type: 'spoke', spoke: 'marketing' },
  { label: 'Tech', href: '/tech', type: 'spoke', spoke: 'tech' },
  { label: 'Finance', href: '/finance', type: 'spoke', spoke: 'finance' },
  { label: 'Automation', href: '/automation', type: 'spoke', spoke: 'automation' },
  { label: 'Industries', href: '/industries', type: 'industries' },
  { label: 'Work', href: '/case-studies', type: 'link' },
  { label: 'Regions', href: '/regions', type: 'link' },
  { label: 'Contact', href: '/contact', type: 'link' },
];
