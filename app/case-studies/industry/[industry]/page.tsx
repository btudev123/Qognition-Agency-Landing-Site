import type { Metadata } from 'next';
import Link from 'next/link';
import { notFound } from 'next/navigation';

import Breadcrumbs from '../../../../components/case-studies/Breadcrumbs';
import StudyGrid from '../../../../components/case-studies/StudyGrid';
import Heading from '../../../../components/ui/Heading';
import Text from '../../../../components/ui/Text';
import {
  NICHES,
  SERVICES,
  byNiche,
  getPlaybook,
  nicheLabel,
  serviceLabel,
  SERVICE_SPOKE_HREF,
  type Niche,
} from '../../../../data/case-studies';
import { breadcrumbSchema } from '../../../../lib/schema';
import { SITE_URL } from '../../../../lib/seo';

export const dynamicParams = false;

export const generateStaticParams = () => NICHES.map((industry) => ({ industry }));

const isNiche = (value: string): value is Niche => (NICHES as string[]).includes(value);

const describe = (niche: Niche, count: number) =>
  `${count} ${nicheLabel(niche)} engagements. Each opens with a dated audit of the live site and cites the third-party benchmarks the work was measured against.`;

export async function generateMetadata({
  params,
}: {
  params: Promise<{ industry: string }>;
}): Promise<Metadata> {
  const { industry } = await params;
  if (!isNiche(industry)) return { title: 'Not found | Qognition' };

  const studies = byNiche(industry);
  const description = describe(industry, studies.length);
  const path = `/case-studies/industry/${industry}`;

  return {
    title: `${nicheLabel(industry)} Case Studies | Qognition`,
    description,
    alternates: { canonical: `${SITE_URL}${path}` },
    openGraph: { title: `${nicheLabel(industry)} Case Studies`, description, url: `${SITE_URL}${path}` },
  };
}

export default async function Page({ params }: { params: Promise<{ industry: string }> }) {
  const { industry } = await params;
  if (!isNiche(industry)) notFound();

  const studies = byNiche(industry);
  const path = `/case-studies/industry/${industry}`;
  const label = nicheLabel(industry);

  /** The shared strategy per service line is the pattern that repeats across this niche. */
  const patterns = SERVICES.map((service) => ({ service, playbook: getPlaybook(industry, service) }))
    .filter((p) => p.playbook)
    .filter((p) => studies.some((s) => s.services.includes(p.service)));

  const markets = [...new Set(studies.map((s) => s.market))];

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify([
            {
              '@context': 'https://schema.org',
              '@type': 'CollectionPage',
              name: `${label} Case Studies`,
              description: describe(industry, studies.length),
              url: `${SITE_URL}${path}`,
              mainEntity: {
                '@type': 'ItemList',
                numberOfItems: studies.length,
                itemListElement: studies.map((s, i) => ({
                  '@type': 'ListItem',
                  position: i + 1,
                  url: `${SITE_URL}/case-studies/${s.id}`,
                  name: `${s.client} — ${s.headline}`,
                })),
              },
            },
            breadcrumbSchema([
              { name: 'Home', path: '/' },
              { name: 'Case Studies', path: '/case-studies' },
              { name: label, path },
            ]),
          ]),
        }}
      />

      <main className="min-h-screen px-6 pb-32 pt-24 md:px-12 md:pt-32">
        <div className="mx-auto max-w-7xl">
          <Breadcrumbs
            items={[
              { name: 'Case Studies', href: '/case-studies' },
              { name: label, href: path },
            ]}
          />

          <header className="mb-14 max-w-3xl">
            <Heading level="h1" className="mb-6">
              {label} Case Studies
            </Heading>
            <Text className="mb-4">
              {studies.length} {label} engagements across {markets.length} markets. Every one opens
              with a dated audit of the live site, a named diagnosis, and the third-party benchmarks
              the work was measured against.
            </Text>
          </header>

          {patterns.length > 0 && (
            <section className="mb-14">
              <Heading level="h2" className="mb-6">
                What repeats across {label}
              </Heading>
              <div className="space-y-5">
                {patterns.map(({ service, playbook }) => (
                  <div
                    key={service}
                    className="rounded-xl border border-[var(--border)] bg-[var(--surface)] p-6"
                  >
                    <p className="mb-2 text-meta font-semibold uppercase tracking-wide text-[var(--accent)]">
                      {serviceLabel(service)}
                    </p>
                    <Text>{playbook!.strategy}</Text>
                    <Link
                      href={SERVICE_SPOKE_HREF[service]}
                      className="mt-3 inline-block text-body text-[var(--accent)] underline underline-offset-2"
                    >
                      {serviceLabel(service)} services
                    </Link>
                  </div>
                ))}
              </div>
            </section>
          )}

          <section className="mb-14">
            <Heading level="h2" className="mb-6">
              The engagements
            </Heading>
            <StudyGrid
              studies={studies}
              emptyTitle={`No ${label} engagements published yet`}
              emptyMessage="Browse the full library for a comparable engagement in another sector."
            />
          </section>

          <nav aria-label="Other industries" className="flex flex-wrap gap-x-6 gap-y-3">
            {NICHES.filter((n) => n !== industry).map((n) => (
              <Link
                key={n}
                href={`/case-studies/industry/${n}`}
                className="text-body text-[var(--accent)] underline underline-offset-2"
              >
                {nicheLabel(n)} case studies ({byNiche(n).length})
              </Link>
            ))}
            <Link
              href="/case-studies/methodology"
              className="text-body text-[var(--accent)] underline underline-offset-2"
            >
              How we measure this
            </Link>
          </nav>
        </div>
      </main>
    </>
  );
}
