// Central source of truth for the header mega-menu (desktop) + mobile accordion.
// Services-driven: the mega-menu is derived from the 11 SERVICES categories.
// Service routes resolve to /services/[service] and /services/[service]/[subService];
// industries to /industries/[id]/[slug].

import { INDUSTRIES } from './industries';
import { SERVICES } from './services';

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

// Kept the name SpokeMenu for renderer compatibility; it now models the
// single services mega-menu (and any future top-level mega-menu).
export interface SpokeMenu {
  id: string;
  label: string;
  href: string;
  blurb: string;
  groups: NavGroup[];
  cta: { label: string; href: string };
}

const subServiceHref = (serviceId: string, sub: { name: string; slug?: string }) => {
  const slug =
    sub.slug ||
    sub.name.toLowerCase().replace(/&/g, 'and').replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '');
  return `/services/${serviceId}/${slug}`;
};

// ── SERVICES — one mega-menu, every category is a group ───────────────────────

const servicesMenu: SpokeMenu = {
  id: 'services',
  label: 'Services',
  href: '/services',
  blurb: 'Eleven integrated growth services — strategy, brand, web, SEO, AI search, paid media, content, social, video, email, and CRO.',
  cta: { label: 'Get your free Growth Audit', href: '/free-seo-audit' },
  groups: SERVICES.map((service) => ({
    label: service.title,
    href: `/services/${service.id}`,
    items: service.subServices.slice(0, 5).map((sub) => ({
      label: sub.name,
      href: subServiceHref(service.id, sub),
    })),
  })),
};

export const SPOKE_MENUS: Record<string, SpokeMenu> = {
  services: servicesMenu,
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
  | { label: string; href: string; type: 'spoke' } // opens the services mega-menu
  | { label: string; href: string; type: 'industries' };

export const TOP_NAV: TopNavItem[] = [
  { label: 'Home', href: '/', type: 'link' },
  { label: 'Services', href: '/services', type: 'spoke' },
  { label: 'Industries', href: '/industries', type: 'industries' },
  { label: 'Work', href: '/case-studies', type: 'link' },
  { label: 'Free Tools', href: '/free-tools', type: 'link' },
  { label: 'Resources', href: '/resources', type: 'link' },
  { label: 'Contact', href: '/contact', type: 'link' },
];
