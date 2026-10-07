import {
  AppWindow,
  Banknote,
  Briefcase,
  Building2,
  Car,
  Factory,
  FlaskConical,
  GraduationCap,
  HeartPulse,
  Hotel,
  Landmark,
  Megaphone,
  Package,
  Plane,
  Server,
  Store,
  Telescope,
  Truck,
  Wheat,
  Wrench,
  Zap,
  type LucideIcon,
} from 'lucide-react';
import INDUSTRY_IMAGES from './industryImages.json';

/* Visual metadata for the 21 locked ICP industries (docs/design/2026-10-visual-upgrade.md §2.5).
 *
 * Keyed by taxonomy slug. icp-taxonomy.json is never edited for presentation:
 * this file sits beside it instead. scripts/check-b2b.cjs asserts every
 * icpIndustryCards() slug has an icon here, so a new industry cannot ship
 * without one. Import from server components only: a lucide icon imported into
 * a 'use client' file ships in the bundle. */
export const INDUSTRY_ICON: Readonly<Partial<Record<string, LucideIcon>>> = {
  'saas-and-software': AppWindow,
  'professional-and-business-services': Briefcase,
  'healthcare-and-life-sciences': HeartPulse,
  'financial-services': Banknote,
  'manufacturing-and-industrial': Factory,
  'logistics-supply-chain-and-transportation': Truck,
  'construction-real-estate-and-built-environment': Building2,
  'energy-and-utilities': Zap,
  'technology-and-it-services': Server,
  'education-and-training': GraduationCap,
  'hospitality-travel-and-events': Hotel,
  'agriculture-and-food': Wheat,
  'media-marketing-and-creative': Megaphone,
  'government-nonprofit-and-institutional': Landmark,
  'emerging-and-micro-niches': Telescope,
  'aerospace-and-aviation': Plane,
  'automotive-heavy-equipment-and-mobility': Car,
  'commercial-and-facility-services': Wrench,
  'environmental-engineering-and-testing': FlaskConical,
  'retail-cpg-and-brand-enablement': Package,
  'franchising-and-multi-location': Store,
};

/** Display name: strip the exact suffix " (B2B)" and nothing else (Ruth, 2026-10-07). */
export const industryDisplayName = (name: string): string =>
  name.endsWith(' (B2B)') ? name.slice(0, -' (B2B)'.length) : name;

export interface IndustryImage {
  readonly src: string;
  readonly width: number;
  readonly height: number;
  readonly alt: string;
  readonly credit: { readonly photographer: string; readonly photographerUrl: string; readonly url: string };
}

interface ImageEntry {
  src: string;
  width: number;
  height: number;
  alt: string;
  photographer: string;
  photographer_url: string;
  pexels_url: string;
}
const IMAGES: Record<string, ImageEntry | undefined> = INDUSTRY_IMAGES;

/** Local Pexels photo and credit for `featured/<slug>` or `<slug>`, written by scripts/fetch-case-study-images.mjs. */
export function industryImage(key: string): IndustryImage | undefined {
  const entry = IMAGES[key];
  if (!entry) return undefined;
  return {
    src: entry.src,
    width: entry.width,
    height: entry.height,
    alt: entry.alt,
    credit: { photographer: entry.photographer, photographerUrl: entry.photographer_url, url: entry.pexels_url },
  };
}
