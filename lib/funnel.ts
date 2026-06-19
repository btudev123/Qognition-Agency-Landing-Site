// Funnel-stage model. Every page maps to a TOFU/MOFU/BOFU stage so CTAs,
// lead magnets, and analytics adapt to buyer intent. Inference is route-based
// so existing pages get the right CTA with minimal edits.

import { BOOKING_LINK } from '../data/siteConfig';

export type FunnelStage = 'tofu' | 'mofu' | 'bofu';

export interface FunnelCTAConfig {
  stage: FunnelStage;
  eyebrow: string;
  headline: string;
  primary: { label: string; href: string };
  secondary: { label: string; href: string };
  /** microcopy under the primary button */
  reassurance: string;
}

// Route → stage. First matching prefix wins; default is MOFU.
const STAGE_RULES: { test: (p: string) => boolean; stage: FunnelStage }[] = [
  { test: (p) => p === '/book' || p.startsWith('/contact') || p.startsWith('/pricing'), stage: 'bofu' },
  { test: (p) => p.includes('/thank-you') || p.endsWith('/booked'), stage: 'bofu' },
  { test: (p) => p.startsWith('/blog') || p.startsWith('/glossary') || p.startsWith('/free-tools') || p.startsWith('/resources'), stage: 'tofu' },
  { test: (p) => p.startsWith('/services') || p.startsWith('/comparisons') || p.startsWith('/case-studies') || p.startsWith('/industries') || p.startsWith('/locations') || p.startsWith('/regions'), stage: 'mofu' },
];

export function getFunnelStage(pathname: string): FunnelStage {
  const match = STAGE_RULES.find((r) => r.test(pathname));
  return match ? match.stage : 'mofu';
}

// Stage defaults. `service` lets MOFU CTAs name the audit.
export function getFunnelCTA(stage: FunnelStage, opts?: { service?: string }): FunnelCTAConfig {
  const service = opts?.service;
  switch (stage) {
    case 'tofu':
      return {
        stage,
        eyebrow: 'Free resource',
        headline: 'Want the playbook behind these results?',
        primary: { label: 'Get the free growth audit', href: '/free-seo-audit' },
        secondary: { label: 'Explore free tools', href: '/free-tools' },
        reassurance: 'No credit card · 2-minute request · Delivered by a human strategist',
      };
    case 'bofu':
      return {
        stage,
        eyebrow: "Let's talk",
        headline: 'Book a 15-minute strategy call',
        primary: { label: 'Book a call', href: BOOKING_LINK },
        secondary: { label: 'Message us on WhatsApp', href: '/contact' },
        reassurance: 'Real strategist · No obligation · Engagements start at $500/mo',
      };
    case 'mofu':
    default:
      return {
        stage,
        eyebrow: 'Free audit',
        headline: service ? `Get your free ${service} audit` : 'Get your free growth audit',
        primary: { label: service ? `Get my free ${service} audit` : 'Get my free audit', href: '/free-seo-audit' },
        secondary: { label: 'Book a 15-min call', href: BOOKING_LINK },
        reassurance: 'Delivered in 48 hours · No commitment · We earn the relationship',
      };
  }
}
