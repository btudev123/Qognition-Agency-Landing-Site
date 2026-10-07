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
import { SITE_URL, metadataFor } from '../../lib/seo';

const description = `${LIBRARY_STATS.total} client programmes across HVAC, dental and insurance. Targets set at the start of each engagement are labelled as targets until client reporting confirms a result.`;

// Title and description come from SEO_OVERRIDES['/case-studies'] in lib/seo.ts.
// The hard-coded 'Case Studies | Qognition' here doubled the layout's
// '| Qognition' template on production ("Case Studies | Qognition | Qognition").
export const metadata: Metadata = metadataFor({ title: 'Case Studies', description, path: '/case-studies' });

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
          name: study.headline,
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
              {LIBRARY_STATS.total} client programmes across{' '}
              {LIBRARY_STATS.byNiche.map((n) => `${n.label} (${n.count})`).join(', ')}, in{' '}
              {LIBRARY_STATS.states} states.
            </Text>
            {/* O7 (operator, 2026-10-07): client programmes. KPIs stay targets
                until `actual` is filled; caseStudyEvidence() is unchanged. The
                count line above is HOLD pending the operator's B2B-relevant count,
                so it stays as it was. HVAC and dental are never B2B proof. */}
            <Text className="mb-4">
              These are client programmes. Each one sets out the business problem, our approach and a measured baseline. Every KPI is labelled as a target until client reporting fills in the result.{' '}
              <Link
                href="/case-studies/methodology"
                className="text-[var(--accent-deep)] underline underline-offset-2"
              >
                How we measure this
              </Link>
              .
            </Text>
            <Text>
              These programmes are for local service businesses and commercial insurance. Read them for how we plan and measure, not as evidence of work in your sector. For your own sector,{' '}
              <Link href="/free-ai-audit" className="text-[var(--accent-deep)] underline underline-offset-2">
                request a free AI visibility audit
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
