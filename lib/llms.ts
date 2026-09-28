// Optional public text index. Google does not use llms.txt as a ranking signal.
// This contains the same published descriptions available to human visitors.
import { SITE_URL } from './seo';
import { getPublishedGrowthPages } from './growth/publication';
import { CONTACT_EMAIL } from '../data/siteConfig';
const header = ['# Qognition Agency', '', '> AI-native B2B growth agency connecting AI Search, Demand, ABM and Revenue Systems.', '', `Website: ${SITE_URL}`, `Contact: ${CONTACT_EMAIL}`, `Discuss your growth plan: ${SITE_URL}/book`, '', 'Programs are scoped to buyer markets. Market pages do not establish physical offices. Platform names describe discovery surfaces, not partnerships or guaranteed placement.', ''];
export function buildLlmsTxt() { return [...header, '## Services and industries', ...getPublishedGrowthPages().filter(p => ['pillar','sector','market'].includes(p.kind) && p.publication.indexable).map(p => `- [${p.title}](${SITE_URL}${p.path}): ${p.description}`), '', '## Further reading', `- [Growth library](${SITE_URL}/insights)`, `- [Engagements](${SITE_URL}/pricing)`, `- [AI visibility review](${SITE_URL}/free-ai-audit)`, ''].join('\n'); }
export function buildLlmsFullTxt() { return [...header, ...getPublishedGrowthPages().filter(p=>p.publication.indexable).flatMap(p=>[`## ${p.title}`, p.description, `URL: ${SITE_URL}${p.path}`, ''])].join('\n'); }
