import type { Metadata } from 'next';
import Link from 'next/link';
import { notFound } from 'next/navigation';

import Breadcrumbs from '../../../../components/case-studies/Breadcrumbs';
import StudyGrid from '../../../../components/case-studies/StudyGrid';
import Heading from '../../../../components/ui/Heading';
import Text from '../../../../components/ui/Text';
import {
  STATES,
  byState,
  nicheLabel,
  type ResolvedCaseStudy,
} from '../../../../data/case-studies';
import { breadcrumbSchema } from '../../../../lib/schema';
import { SITE_URL } from '../../../../lib/seo';

export const dynamicParams = false;

export const generateStaticParams = () =>
  STATES.map((state) => ({ state: state.code.toLowerCase() }));

const findState = (slug: string) =>
  STATES.find((s) => s.code.toLowerCase() === slug.toLowerCase());

const describe = (name: string, studies: ResolvedCaseStudy[]) => {
  const markets = [...new Set(studies.map((s) => s.market))];
  return `${studies.length} engagements across ${markets.length} ${name} markets. Each opens with a dated audit of the live site and cites the benchmarks the work was measured against.`;
};

export async function generateMetadata({
  params,
}: {
  params: Promise<{ state: string }>;
}): Promise<Metadata> {
  const { state } = await params;
  const match = findState(state);
  if (!match) return { title: 'Not found | Qognition' };

  const studies = byState(match.code);
  const description = describe(match.name, studies);
  const path = `/case-studies/location/${match.code.toLowerCase()}`;

  return {
    title: `${match.name} Case Studies | Qognition`,
    description,
    alternates: { canonical: `${SITE_URL}${path}` },
    openGraph: { title: `${match.name} Case Studies`, description, url: `${SITE_URL}${path}` },
  };
}

export default async function Page({ params }: { params: Promise<{ state: string }> }) {
  const { state } = await params;
  const match = findState(state);
  if (!match) notFound();

  const studies = byState(match.code);
  const path = `/case-studies/location/${match.code.toLowerCase()}`;
  const markets = [...new Set(studies.map((s) => s.market))];
  const niches = [...new Set(studies.map((s) => s.niche))];

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify([
            {
              '@context': 'https://schema.org',
              '@type': 'CollectionPage',
              name: `${match.name} Case Studies`,
              description: describe(match.name, studies),
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
              { name: match.name, path },
            ]),
          ]),
        }}
      />

      <main className="min-h-screen px-6 pb-32 pt-24 md:px-12 md:pt-32">
        <div className="mx-auto max-w-7xl">
          <Breadcrumbs
            items={[
              { name: 'Case Studies', href: '/case-studies' },
              { name: match.name, href: path },
            ]}
          />

          <header className="mb-14 max-w-3xl">
            <Heading level="h1" className="mb-6">
              {match.name} Case Studies
            </Heading>
            <Text className="mb-4">
              {studies.length} engagements across {markets.join(', ')} — covering{' '}
              {niches.map(nicheLabel).join(', ')}.
            </Text>
            <Text>
              Local search is won market by market, not state by state. Each of these opens with a
              dated audit of that specific business&apos;s live site.
            </Text>
          </header>

          <section className="mb-14">
            <StudyGrid
              studies={studies}
              emptyTitle={`No ${match.name} engagements published yet`}
              emptyMessage="Browse the full library for a comparable engagement in another market."
            />
          </section>

          <nav aria-label="Other states" className="flex flex-wrap gap-x-6 gap-y-3">
            {STATES.filter((s) => s.code !== match.code).map((s) => (
              <Link
                key={s.code}
                href={`/case-studies/location/${s.code.toLowerCase()}`}
                className="text-body text-[var(--accent)] underline underline-offset-2"
              >
                {s.name} ({s.count})
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
