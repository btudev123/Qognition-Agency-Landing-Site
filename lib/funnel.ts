// Funnel-stage model. Every page maps to a TOFU/MOFU/BOFU stage so CTAs,
// lead magnets, and analytics adapt to buyer intent. Inference is route-based
// so existing pages get the right CTA with minimal edits.



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
  const normalized = pathname.replace(/^\/(de|fr|nl|sv|da|nb|fi|ar|it|zh-Hans)(?=\/|$)/, '') || '/';
  if (normalized.startsWith('/growth/')) return 'bofu';
  if (normalized.startsWith('/insights/')) return /playbook|measurement|selection|methodology/.test(normalized) ? 'mofu' : 'tofu';
  const match = STAGE_RULES.find((r) => r.test(normalized));
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
        headline: 'Make your next growth decision clearer.',
        primary: { label: 'Explore the growth library', href: '/insights' },
        secondary: { label: 'Request a visibility review', href: '/free-ai-audit' },
        reassurance: 'Practical guidance for B2B teams',
      };
    case 'bofu':
      return {
        stage,
        eyebrow: "Let's talk",
        headline: 'Discuss your growth plan',
        primary: { label: 'Discuss your growth plan', href: '/book' },
        secondary: { label: 'Message us on WhatsApp', href: '/contact' },
        reassurance: 'Real strategist · No obligation · Scope agreed before work begins',
      };
    case 'mofu':
    default:
      return {
        stage,
        eyebrow: 'Free audit',
        headline: service ? `Explore your ${service} opportunity` : 'See where your buyers can find you',
        primary: { label: service ? `Get my free ${service} audit` : 'Get my free audit', href: '/free-ai-audit' },
        secondary: { label: 'Discuss your growth plan', href: '/book' },
        reassurance: 'Human-reviewed · Scope and timing agreed after your request',
      };
  }
}
