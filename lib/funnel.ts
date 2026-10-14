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

export function getFunnelStage(pathname: string, explicit?: FunnelStage): FunnelStage {
  if (explicit) return explicit;
  const normalized = pathname.replace(/^\/(de|fr|nl|sv|da|nb|fi|ar|it|zh-Hans)(?=\/|$)/, '') || '/';
  if (normalized.endsWith('/learn')) return 'tofu';
  if (normalized.endsWith('/evaluate')) return 'mofu';
  if (normalized === '/' || /^\/(services|industries|growth)(\/|$)/.test(normalized)) return 'bofu';
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
        // docs/copy/2026-10/ai-search-is-winning.md §5.1: every stage leads with Book a call.
        eyebrow: 'Next step',
        headline: 'Ask ChatGPT who to hire in your category. Then talk to us.',
        primary: { label: 'Book a call', href: '/book' },
        secondary: { label: 'Send an enquiry', href: '/contact#enquiry' },
        reassurance: 'No obligation · Written scope and fee after the call',
      };
    case 'bofu':
      return {
        stage,
        eyebrow: 'Next step',
        headline: 'Find out who AI names in your category, and what it takes to be one of them.',
        primary: { label: 'Book a call', href: '/book' },
        secondary: { label: 'Send an enquiry', href: '/contact#enquiry' },
        // docs/copy/2026-10/plain-english-templates.md §2.2. No duration: the calendar shows the real one.
        reassurance: 'No obligation · Scope agreed in writing before work starts',
      };
    case 'mofu':
    default:
      return {
        stage,
        eyebrow: 'Your next step',
        headline: service ? `Find out what ${service} could win for your firm` : 'Find out who AI names when your buyers ask',
        primary: { label: 'Book a call', href: '/book' },
        secondary: { label: 'Send an enquiry', href: '/contact#enquiry' },
        reassurance: 'Tell us who you sell to and where you want to grow. We tell you what we would test first.',
      };
  }
}
