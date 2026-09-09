import type { Metadata } from 'next';
import Link from 'next/link';

import Breadcrumbs from '../../components/case-studies/Breadcrumbs';
import IndexFilters from '../../components/case-studies/IndexFilters';
import Heading from '../../components/ui/Heading';
import Text from '../../components/ui/Text';
import {
  CASE_STUDIES,
  LIBRARY_STATS,
  NICHES,
  SERVICES,
  STATES,
  nicheLabel,
  serviceLabel,
} from '../../data/case-studies';
import { breadcrumbSchema } from '../../lib/schema';
import { SITE_URL } from '../../lib/seo';

const description = `${LIBRARY_STATS.total} engagements across HVAC, dental and insurance in ${LIBRARY_STATS.states} US states. Each one opens with a dated audit of the live site and cites the third-party benchmarks it was measured against.`;

export const metadata: Metadata = {
  title: 'Case Studies | Qognition',
  description,
  alternates: { canonical: `${SITE_URL}/case-studies` },
  openGraph: {
    title: 'Case Studies | Qognition',
    description,
    url: `${SITE_URL}/case-studies`,
  },
};

export default function Page() {
  const jsonLd = [
    {
      '@context': 'https://schema.org',
      '@type': 'CollectionPage',
      name: 'Case Studies',
      description,
      url: `${SITE_URL}/case-studies`,
      about: { '@type': 'Organization', name: 'Qognition', url: SITE_URL },
      mainEntity: {
        '@type': 'ItemList',
        numberOfItems: CASE_STUDIES.length,
        itemListElement: CASE_STUDIES.map((study, i) => ({
          '@type': 'ListItem',
          position: i + 1,
          url: `${SITE_URL}/case-studies/${study.id}`,
          name: `${study.client} — ${study.headline}`,
        })),
      },
    },
    breadcrumbSchema([
      { name: 'Home', path: '/' },
      { name: 'Case Studies', path: '/case-studies' },
    ]),
  ];

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      <main className="min-h-screen px-6 pb-32 pt-24 md:px-12 md:pt-32">
        <div className="mx-auto max-w-7xl">
          <Breadcrumbs items={[{ name: 'Case Studies', href: '/case-studies' }]} />

          <header className="mb-14 max-w-3xl">
            <Heading level="h1" className="mb-6">
              Case Studies
            </Heading>
            <Text className="mb-4">
              {LIBRARY_STATS.total} engagements across{' '}
              {LIBRARY_STATS.byNiche.map((n) => `${n.label} (${n.count})`).join(', ')}, in{' '}
              {LIBRARY_STATS.states} states.
            </Text>
            <Text>
              Every one opens the same way: a dated audit of the live site, a named diagnosis, and
              the third-party benchmarks the work was measured against — each with a live source
              link you can check.{' '}
              <Link
                href="/case-studies/methodology"
                className="text-[var(--accent)] underline underline-offset-2"
              >
                How we measure this
              </Link>
              .
            </Text>
          </header>

          {/* ── Hub navigation: the internal-link spine ───────────────────── */}
          <nav aria-label="Browse case studies" className="mb-14 space-y-4">
            <div className="flex flex-wrap items-baseline gap-x-4 gap-y-2">
              <span className="text-meta font-semibold uppercase tracking-wide text-[var(--text-muted)]">
                By industry
              </span>
              {NICHES.map((niche) => (
                <Link
                  key={niche}
                  href={`/case-studies/industry/${niche}`}
                  className="text-body text-[var(--accent)] underline underline-offset-2"
                >
                  {nicheLabel(niche)}
                </Link>
              ))}
            </div>
            <div className="flex flex-wrap items-baseline gap-x-4 gap-y-2">
              <span className="text-meta font-semibold uppercase tracking-wide text-[var(--text-muted)]">
                By service
              </span>
              {SERVICES.map((service) => (
                <Link
                  key={service}
                  href={`/case-studies/service/${service}`}
                  className="text-body text-[var(--accent)] underline underline-offset-2"
                >
                  {serviceLabel(service)}
                </Link>
              ))}
            </div>
            <div className="flex flex-wrap items-baseline gap-x-4 gap-y-2">
              <span className="text-meta font-semibold uppercase tracking-wide text-[var(--text-muted)]">
                By state
              </span>
              {STATES.map((state) => (
                <Link
                  key={state.code}
                  href={`/case-studies/location/${state.code.toLowerCase()}`}
                  className="text-body text-[var(--accent)] underline underline-offset-2"
                >
                  {state.name}
                </Link>
              ))}
            </div>
          </nav>

          <IndexFilters studies={CASE_STUDIES} />
        </div>
      </main>
    </>
  );
}
