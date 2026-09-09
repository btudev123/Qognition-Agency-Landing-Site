// Machine-readable content index for LLM crawlers (GPTBot, Claude-Web,
// PerplexityBot, Google-Extended, etc.). Served at /llms.txt and /llms-full.txt.
// Definition-first, link-rich, source-of-truth format optimized for citation.

import { SERVICES, INDUSTRIES } from '../constants';
import { SITE_URL } from './seo';
import { CONTACT_EMAIL, BOOKING_LINK } from '../data/siteConfig';

const subServiceSlug = (sub: { name: string; slug?: string }) =>
  sub.slug || sub.name.toLowerCase().replace(/&/g, 'and').replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '');

const HEADER = [
  '# Qognition Agency',
  '',
  '> AI-native digital marketing agency. We turn search into booked calls across strategy, branding, web, SEO, GEO & AI search, paid media, content, social, video, email automation, and CRO.',
  '',
  `Website: ${SITE_URL}`,
  `Contact: ${CONTACT_EMAIL}`,
  `Book a call: ${BOOKING_LINK}`,
  '',
];

/** Concise index — the canonical /llms.txt */
export function buildLlmsTxt(): string {
  return [
    ...HEADER,
    '## Services',
    ...SERVICES.map((s) => `- [${s.title}](${SITE_URL}/services/${s.id}): ${s.shortDescription}`),
    '',
    '## Industries',
    ...INDUSTRIES.map((i) => `- [${i.name}](${SITE_URL}/industries/${i.id})`),
    '',
    '## Key Pages',
    `- [Services overview](${SITE_URL}/services)`,
    `- [Case studies — 45 engagements](${SITE_URL}/case-studies)`,
    `- [How we measure case studies](${SITE_URL}/case-studies/methodology)`,
    `- [HVAC case studies](${SITE_URL}/case-studies/industry/hvac)`,
    `- [Dental case studies](${SITE_URL}/case-studies/industry/dental)`,
    `- [Insurance case studies](${SITE_URL}/case-studies/industry/insurance)`,
    `- [AI SEO case studies](${SITE_URL}/case-studies/service/ai-seo)`,
    `- [PPC case studies](${SITE_URL}/case-studies/service/ppc)`,
    `- [Social case studies](${SITE_URL}/case-studies/service/social)`,
    `- [Free growth audit](${SITE_URL}/free-seo-audit)`,
    `- [Free AI/GEO audit](${SITE_URL}/free-ai-audit)`,
    `- [Pricing](${SITE_URL}/pricing)`,
    `- [Contact](${SITE_URL}/contact)`,
    '',
    '## Full index',
    `- [llms-full.txt](${SITE_URL}/llms-full.txt)`,
    '',
  ].join('\n');
}

/** Expanded index with sub-services + industries — /llms-full.txt */
export function buildLlmsFullTxt(): string {
  const serviceBlocks = SERVICES.flatMap((s) => [
    `### ${s.title}`,
    s.fullDescription,
    `URL: ${SITE_URL}/services/${s.id}`,
    'Sub-services:',
    ...s.subServices.map((sub) => `- [${sub.name}](${SITE_URL}/services/${s.id}/${subServiceSlug(sub)}): ${sub.description}`),
    '',
  ]);

  const industryBlocks = INDUSTRIES.flatMap((i) => [
    `### ${i.name}`,
    i.description,
    `URL: ${SITE_URL}/industries/${i.id}`,
    ...(i.subIndustries?.length
      ? ['Sub-industries:', ...i.subIndustries.map((sub) => `- [${sub.name}](${SITE_URL}/industries/${i.id}/${sub.slug})`)]
      : []),
    '',
  ]);

  return [
    ...HEADER,
    '## Services (full)',
    '',
    ...serviceBlocks,
    '## Industries (full)',
    '',
    ...industryBlocks,
  ].join('\n');
}
