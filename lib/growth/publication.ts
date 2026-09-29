import { growthMarkets, growthNiches, growthPillars, growthPrograms, growthSectors, growthServices, getNichePath, getServicePath } from '../../data/growth';
import type { Publication } from '../../data/growth/types';

export type GrowthPageKind = 'home' | 'services' | 'industries' | 'markets' | 'programs' | 'pillar' | 'service' | 'sector' | 'niche' | 'market' | 'program' | 'catalog' | 'place';
export type GrowthPageRecord = { path: string; kind: GrowthPageKind; entityId?: string; title: string; description: string; publication: Publication };
const reviewed = (indexable = true, inNavigation = true): Publication => ({ status: 'published', indexable, inNavigation, updatedAt: '2026-09-24', reviewedAt: '2026-09-24', reviewer: 'Qognition editorial implementation review', evidence: ['Defined buyer intent', 'Service scope and limits', 'Relevant next step'] });
const record = (path: string, kind: GrowthPageKind, title: string, description: string, entityId?: string, publication = reviewed()): GrowthPageRecord => ({ path, kind, title, description, entityId, publication });

export const growthPublicationManifest: GrowthPageRecord[] = [
  record('/growth', 'home', 'AI-native B2B growth', 'Connect AI search, demand generation, account-based marketing and revenue systems around the way your buyers research and evaluate.'),
  record('/growth/services', 'services', 'B2B growth services', 'Explore four connected services: AI Search, Demand Generation, Account-Based Marketing and Revenue Systems.'),
  record('/growth/industries', 'industries', 'Growth for complex B2B industries', 'Explore specialist approaches for software, manufacturing, professional services, security, logistics, compliance, life sciences and energy.'),
  record('/growth/markets', 'markets', 'B2B growth across markets', 'Plan growth around your customer markets, buyer language and delivery model. Explore country guides and the attributed place catalog.'),
  record('/growth/programs', 'programs', 'B2B growth program briefs', 'Explore concrete approaches to connecting a buyer problem, service and market. These are planning examples, not claims of client results.'),
  ...growthPillars.map((item) => record(`/growth/services/${item.slug}`, 'pillar', `${item.name} for B2B companies`, item.description, item.id)),
  ...growthServices.map((item) => record(getServicePath(item), 'service', `${item.name} for B2B companies`, item.summary, item.id)),
  ...growthSectors.map((item) => record(`/growth/industries/${item.slug}`, 'sector', `B2B growth for ${item.name.toLowerCase()}`, item.summary, item.id)),
  ...growthNiches.map((item) => record(getNichePath(item), 'niche', `Growth for ${item.name.toLowerCase()}`, item.brief, item.id, reviewed(!item.parentId))),
  ...growthMarkets.flatMap((item) => [
    record(`/growth/markets/${item.slug}`, 'market', `B2B growth in ${item.name}`, item.planning, item.id),
    record(`/growth/markets/${item.slug}/places`, 'catalog', `${item.name}: city, town & region catalog`, 'Search attributed GeoNames populated-place and administrative records. Geographic coverage is separate from available marketing programs.', item.id, reviewed(false, false)),
  ]),
  ...growthPrograms.map((item) => record(`/growth/programs/${item.slug}`, 'program', item.title, item.context, item.id, item.publication)),
  // Explicit unpublished states demonstrate that knowing an entity/combination
  // is never sufficient to create a crawlable landing page.
  record('/growth/programs/ai-search-grc-compliance-software-de', 'program', 'Compliance software in Germany', 'Candidate awaiting an original market and buyer brief.', undefined, { status: 'draft', indexable: false, inNavigation: false, updatedAt: '2026-09-24', evidence: [] }),
  record('/growth/programs/ai-search-commercial-renewables-ie', 'program', 'Commercial renewables in Ireland', 'Candidate awaiting commercial-intent and subject-matter review.', undefined, { status: 'review', indexable: false, inNavigation: false, updatedAt: '2026-09-24', evidence: ['Taxonomy and geography validated'] }),
];

/** Publication is the route gate. Navigation and indexing are independent. */
export const getPublishedGrowthPages = () => growthPublicationManifest.filter((page) => page.publication.status === 'published');
export const getGrowthNavigationPages = () => getPublishedGrowthPages().filter((page) => page.publication.inNavigation);
export function getGrowthPage(path: string): GrowthPageRecord | undefined {
  const placeMatch = path.match(/^\/growth\/markets\/([a-z-]+)\/places\/([1-9]\d{3,11})$/);
  if (placeMatch) {
    const market = growthMarkets.find((item) => item.slug === placeMatch[1]);
    if (!market) return undefined;
    // Database-backed geographic profiles are utilities, not marketing pages.
    // The route must still verify that this ID belongs to this country.
    return record(path, 'place', 'Place profile', `Geographic source record in ${market.name}.`, `${market.code}:${placeMatch[2]}`, reviewed(false, false));
  }
  return growthPublicationManifest.find((page) => page.path === path && page.publication.status === 'published');
}
export function getGrowthSitemapEntries() {
  return getPublishedGrowthPages().filter((page) => page.publication.indexable).map((page) => ({ path: page.path, lastModified: page.publication.updatedAt }));
}
export const getGrowthStaticParams = () => getPublishedGrowthPages().filter((page) => page.kind !== 'catalog').map((page) => ({ segments: page.path === '/growth' ? [] : page.path.slice('/growth/'.length).split('/') }));

export function getGrowthBreadcrumbs(page: GrowthPageRecord) {
  const pieces = page.path.split('/').filter(Boolean);
  const crumbs = [{ name: 'Home', path: '/' }];
  for (let index = 1; index <= pieces.length; index++) {
    const path = '/' + pieces.slice(0, index).join('/');
    const parent = getGrowthPage(path);
    if (parent) crumbs.push({ name: parent.kind === 'home' ? 'Growth' : parent.title, path });
  }
  return crumbs;
}
