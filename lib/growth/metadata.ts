import type { Metadata } from 'next';
import { getGrowthBreadcrumbs, type GrowthPageRecord } from './publication';
import { localeServiceAlternates } from '../growth-locales';
import type { LocalizedPillar } from '../../data/growth-locales';

const ORIGIN = 'https://www.qognitionagency.com';
export function growthMetadata(page: GrowthPageRecord): Metadata {
  return {
    title: `${page.title} | Qognition`, description: page.description,
    alternates: { canonical: `${ORIGIN}${page.path}`, ...(page.kind === 'pillar' ? { languages: localeServiceAlternates(page.entityId as LocalizedPillar) } : {}) },
    robots: { index: page.publication.indexable, follow: true },
    openGraph: { type: 'website', title: page.title, description: page.description, url: `${ORIGIN}${page.path}`, siteName: 'Qognition' },
  };
}
export function growthStructuredData(page: GrowthPageRecord) {
  return {
    '@context': 'https://schema.org', '@graph': [
      { '@type': ['pillar','service','program'].includes(page.kind) ? 'Service' : 'WebPage',
        '@id': `${ORIGIN}${page.path}#page`, name: page.title, description: page.description,
        url: `${ORIGIN}${page.path}`, inLanguage: 'en',
        ...(['pillar','service','program'].includes(page.kind) ? { provider: { '@type': 'Organization', name: 'Qognition', url: ORIGIN } } : {}),
      },
      { '@type': 'BreadcrumbList', itemListElement: getGrowthBreadcrumbs(page).map((crumb,index) => ({ '@type': 'ListItem', position: index + 1, name: crumb.name, item: `${ORIGIN}${crumb.path}` })) },
    ],
  };
}
