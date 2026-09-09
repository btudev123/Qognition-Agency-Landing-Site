export type SpokeId = 'marketing' | 'tech' | 'finance' | 'automation';

export interface SpokeConfig {
  id: SpokeId;
  label: string;
  accent: string;
  accentLight: string;
  accentRgb: string;
  icon: string;
  description: string;
  h1: string;
  subhead: string;
  primaryBuyer: string;
  pricingModel: string;
  calLink: string;
  slackChannel: string;
}

export const SPOKES: Record<SpokeId, SpokeConfig> = {
  marketing: {
    id: 'marketing',
    label: 'Marketing',
    accent: '#14B8A6',
    accentLight: '#5EEAD4',
    accentRgb: '20, 184, 166',
    icon: 'TrendingUp',
    description: 'AI-native growth marketing for founders who need revenue, not reports.',
    h1: 'AI-Native Growth Marketing for Founders',
    subhead: 'SEO, paid media, content, brand strategy, and CRO — built for measurable revenue, not vanity metrics.',
    primaryBuyer: 'CMO / Founder',
    pricingModel: 'From $500/mo',
    calLink: 'https://api.leadconnectorhq.com/widget/bookings/discovery-call-qognition-agency',
    slackChannel: '#leads-marketing',
  },
  tech: {
    id: 'tech',
    label: 'Tech',
    accent: '#2563EB',
    accentLight: '#60A5FA',
    accentRgb: '37, 99, 235',
    icon: 'Code',
    description: 'We build software that drives revenue — not just code that compiles.',
    h1: 'Revenue-Focused Engineering for Founders',
    subhead: 'Websites, web apps, integrations, and performance optimization — built to ship fast and scale.',
    primaryBuyer: 'CTO / Founder',
    pricingModel: 'From $500',
    calLink: 'https://api.leadconnectorhq.com/widget/bookings/discovery-call-qognition-agency',
    slackChannel: '#leads-tech',
  },
  finance: {
    id: 'finance',
    label: 'Finance',
    accent: '#059669',
    accentLight: '#34D399',
    accentRgb: '5, 150, 105',
    icon: 'Calculator',
    description: 'Financial operations that give founders back their Saturdays.',
    h1: 'Financial Operations for Founders',
    subhead: 'Bookkeeping, tax, fractional CFO, and payroll — tech-enabled finance that goes beyond compliance.',
    primaryBuyer: 'CFO / Founder',
    pricingModel: 'From $500/mo',
    calLink: 'https://api.leadconnectorhq.com/widget/bookings/discovery-call-qognition-agency',
    slackChannel: '#leads-finance',
  },
  automation: {
    id: 'automation',
    label: 'Automation',
    accent: '#F59E0B',
    accentLight: '#FBBF24',
    accentRgb: '245, 158, 11',
    icon: 'Zap',
    description: 'AI agents and automation that run your ops while you sleep.',
    h1: 'AI Agents & Intelligent Automation',
    subhead: 'Custom AI agents, workflow automation, CRM integration, and data pipelines — built for founders who want to scale without scaling headcount.',
    primaryBuyer: 'COO / Ops Lead',
    pricingModel: 'From $500',
    calLink: 'https://api.leadconnectorhq.com/widget/bookings/discovery-call-qognition-agency',
    slackChannel: '#leads-automation',
  },
};

export function getSpoke(spokeId: string): SpokeConfig | undefined {
  return SPOKES[spokeId as SpokeId];
}

export function getSpokeFromPath(pathname: string): SpokeConfig | undefined {
  const match = pathname.match(/^\/(marketing|tech|finance|automation)/);
  return match ? SPOKES[match[1] as SpokeId] : undefined;
}
