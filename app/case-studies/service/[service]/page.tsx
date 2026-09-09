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
  byService,
  getPlaybook,
  nicheLabel,
  serviceLabel,
  SERVICE_SPOKE_HREF,
  type ServiceKey,
} from '../../../../data/case-studies';
import { breadcrumbSchema } from '../../../../lib/schema';
import { SITE_URL } from '../../../../lib/seo';

export const dynamicParams = false;

export const generateStaticParams = () => SERVICES.map((service) => ({ service }));

const isService = (value: string): value is ServiceKey =>
  (SERVICES as string[]).includes(value);

const describe = (service: ServiceKey, count: number) =>
  `${count} ${serviceLabel(service)} engagements across HVAC, dental and insurance. Each cites the third-party benchmarks it was measured against, with live source links.`;

export async function generateMetadata({
  params,
}: {
  params: Promise<{ service: string }>;
}): Promise<Metadata> {
  const { service } = await params;
  if (!isService(service)) return { title: 'Not found | Qognition' };

  const description = describe(service, byService(service).length);
  const path = `/case-studies/service/${service}`;

  return {
    title: `${serviceLabel(service)} Case Studies | Qognition`,
    description,
    alternates: { canonical: `${SITE_URL}${path}` },
    openGraph: { title: `${serviceLabel(service)} Case Studies`, description, url: `${SITE_URL}${path}` },
  };
}

export default async function Page({ params }: { params: Promise<{ service: string }> }) {
  const { service } = await params;
  if (!isService(service)) notFound();

  const studies = byService(service);
  const path = `/case-studies/service/${service}`;
  const label = serviceLabel(service);

  /** How this service is run differs by niche — that contrast is the argument of this page. */
  const byNicheBreakdown = NICHES.map((niche) => ({
    niche,
    playbook: getPlaybook(niche, service),
    studies: studies.filter((s) => s.niche === niche),
  })).filter((row) => row.studies.length > 0 && row.playbook);

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
              description: describe(service, studies.length),
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
              {studies.length} engagements where {label} was part of the scope, across{' '}
              {byNicheBreakdown.length} sectors. The same service runs differently in each — the
              breakdown below is why.
            </Text>
            <Link
              href={SERVICE_SPOKE_HREF[service]}
              className="text-body text-[var(--accent)] underline underline-offset-2"
            >
              What {label} covers as a service
            </Link>
          </header>

          <section className="mb-14">
            <Heading level="h2" className="mb-6">
              How {label} differs by sector
            </Heading>
            <div className="space-y-5">
              {byNicheBreakdown.map(({ niche, playbook, studies: nicheStudies }) => (
                <div
                  key={niche}
                  className="rounded-xl border border-[var(--border)] bg-[var(--surface)] p-6"
                >
                  <p className="mb-2 text-meta font-semibold uppercase tracking-wide text-[var(--accent)]">
                    {nicheLabel(niche)} · {nicheStudies.length}{' '}
                    {nicheStudies.length === 1 ? 'engagement' : 'engagements'}
                  </p>
                  <Text>{playbook!.strategy}</Text>
                  <Link
                    href={`/case-studies/industry/${niche}`}
                    className="mt-3 inline-block text-body text-[var(--accent)] underline underline-offset-2"
                  >
                    All {nicheLabel(niche)} case studies
                  </Link>
                </div>
              ))}
            </div>
          </section>

          <section className="mb-14">
            <Heading level="h2" className="mb-6">
              The engagements
            </Heading>
            <StudyGrid
              studies={studies}
              emptyTitle={`No ${label} engagements published yet`}
              emptyMessage="Browse the full library for a comparable engagement on another service line."
            />
          </section>

          <nav aria-label="Other services" className="flex flex-wrap gap-x-6 gap-y-3">
            {SERVICES.filter((s) => s !== service).map((s) => (
              <Link
                key={s}
                href={`/case-studies/service/${s}`}
                className="text-body text-[var(--accent)] underline underline-offset-2"
              >
                {serviceLabel(s)} case studies ({byService(s).length})
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
