import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import Link from 'next/link';
import { ArrowRight } from 'lucide-react';
import { REGIONS } from '../../../data/regions';
import { getRegionMetadata } from '../../../lib/seo';
import { breadcrumbSchema, faqSchema } from '../../../lib/schema';
import Heading from '../../../components/ui/Heading';
import Badge from '../../../components/ui/Badge';
import CrossLinks from '../../../components/shared/CrossLinks';

export const dynamicParams = false;

export const generateStaticParams = () => REGIONS.map((region) => ({ slug: region.slug }));

export const generateMetadata = async ({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> => {
  const { slug } = await params;
  return getRegionMetadata(slug);
};

export default async function Page({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const region = REGIONS.find((item) => item.slug === slug);
  if (!region) notFound();

  const path = `/regions/${region.slug}`;

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify([
            {
              '@context': 'https://schema.org',
              '@type': 'Service',
              name: `Digital Marketing in ${region.name}`,
              description: region.description,
              provider: { '@type': 'Organization', name: 'Qognition', url: 'https://qognition.com' },
              areaServed: region.name,
              url: `https://qognition.com${path}`,
            },
            ...(region.faqs?.length ? [faqSchema(region.faqs)] : []),
            breadcrumbSchema([
              { name: 'Home', path: '/' },
              { name: 'Regions', path: '/regions' },
              { name: region.name, path },
            ]),
          ]),
        }}
      />
      <main className="min-h-screen pt-36 pb-20 px-4 sm:px-6">
        <div className="max-w-7xl mx-auto">
          <Link
            href="/regions"
            className="inline-flex items-center gap-2 text-[var(--text-muted)] hover:text-[var(--text)] mb-10 text-sm transition-colors"
          >
            <ArrowRight size={16} className="rotate-180" /> Back to Regions
          </Link>

          <div className="mb-14 max-w-4xl">
            <Badge className="mb-4">{region.name}</Badge>
            <Heading level="h1" className="mb-5">Digital Marketing in {region.name}</Heading>
            <p className="text-xl text-[var(--text-muted)] leading-relaxed border-l-2 border-[var(--accent)] pl-6">
              {region.description}
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-14">
            {[
              `Qognition helps companies grow in ${region.name} with SEO, paid media, AI search visibility, and conversion tracking built around local buyer behavior.`,
              region.marketDynamics || `${region.name} market strategy is built around local search demand, buyer language, and competitive dynamics.`,
              region.competitiveLandscape || 'We connect services, industries, case studies, and tools so buyers can move from research to decision.',
            ].map((item) => (
              <div
                key={item}
                className="rounded-xl border border-[var(--border)] bg-[var(--card-bg)] p-5 text-sm leading-relaxed text-[var(--text-muted)]"
              >
                {item}
              </div>
            ))}
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-14">
            <main className="lg:col-span-8 space-y-14">
              <section>
                <Heading level="h2" className="mb-5">Market Focus</Heading>
                <div className="flex flex-wrap gap-3">
                  {region.marketFocus.map((focus) => (
                    <span
                      key={focus}
                      className="px-4 py-2 border border-[var(--border)] bg-[var(--card-bg)] rounded-full text-sm text-[var(--text-muted)]"
                    >
                      {focus}
                    </span>
                  ))}
                </div>
              </section>

              {region.localInsights && region.localInsights.length > 0 && (
                <section>
                  <Heading level="h2" className="mb-5">Local Insights</Heading>
                  <div className="space-y-4">
                    {region.localInsights.map((insight) => (
                      <div
                        key={insight}
                        className="p-5 border border-[var(--border)] bg-[var(--card-bg)] rounded-xl text-[var(--text-muted)] leading-relaxed"
                      >
                        {insight}
                      </div>
                    ))}
                  </div>
                </section>
              )}

              {region.stats && region.stats.length > 0 && (
                <section>
                  <Heading level="h2" className="mb-5">Regional Stats</Heading>
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                    {region.stats.map((stat) => (
                      <div
                        key={stat.label}
                        className="p-5 border border-[var(--border)] bg-[var(--card-bg)] rounded-xl text-center"
                      >
                        <p className="text-2xl font-bold text-[var(--accent)] mb-1">{stat.value}</p>
                        <p className="text-xs text-[var(--text-muted)]">{stat.label}</p>
                      </div>
                    ))}
                  </div>
                </section>
              )}

              {region.faqs && region.faqs.length > 0 && (
                <section>
                  <Heading level="h2" className="mb-5">Common Questions</Heading>
                  <div className="space-y-3">
                    {region.faqs.map((faq) => (
                      <div
                        key={faq.question}
                        className="rounded-xl border border-[var(--border)] bg-[var(--card-bg)] p-5"
                      >
                        <h3 className="font-semibold text-[var(--text)] mb-2">{faq.question}</h3>
                        <p className="text-sm text-[var(--text-muted)] leading-relaxed">{faq.answer}</p>
                      </div>
                    ))}
                  </div>
                </section>
              )}
            </main>

            <aside className="lg:col-span-4">
              <div className="sticky top-28 p-7 border border-[var(--border)] bg-[var(--card-bg)] rounded-2xl space-y-5">
                <Heading level="h3" className="text-base">{region.name} Strategy</Heading>
                <p className="text-sm text-[var(--text-muted)]">{region.localStrategy || region.description}</p>
                <a
                  href="https://calendly.com/hello-qognitionagency/30min"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="block text-center w-full px-5 py-3 text-sm font-medium bg-[var(--accent)] text-[var(--accent-deep)] rounded-lg hover:brightness-110 transition-all"
                >
                  Book Region Strategy
                </a>
              </div>
            </aside>
          </div>
        </div>
        <CrossLinks exclude={{ type: 'region', id: region.id }} />
      </main>
    </>
  );
}
