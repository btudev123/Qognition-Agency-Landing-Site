import type { Metadata } from 'next';
import Link from 'next/link';
import { RESOURCES } from '../../data/seoExpansion';
import { breadcrumbSchema } from '../../lib/schema';
import Section from '../../components/ui/Section';
import Heading from '../../components/ui/Heading';
import Badge from '../../components/ui/Badge';

export const dynamic = 'force-static';

export const metadata: Metadata = {
  title: 'Free Marketing Audits and Lead Magnets | Qognition',
  description: 'Run free SEO, AI, branding, social media, and LLM visibility audits from Qognition.',
  alternates: { canonical: '/resources' },
};

export default function Page() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify([
            {
              '@context': 'https://schema.org',
              '@type': 'CollectionPage',
              name: 'Qognition Resources',
              url: 'https://www.qognitionagency.com/resources',
              mainEntity: {
                '@type': 'ItemList',
                itemListElement: RESOURCES.map((resource, index) => ({
                  '@type': 'ListItem',
                  position: index + 1,
                  name: resource.title,
                  url: `https://www.qognitionagency.com${resource.href || `/${resource.slug}`}`,
                })),
              },
            },
            breadcrumbSchema([{ name: 'Home', path: '/' }, { name: 'Resources', path: '/resources' }]),
          ]),
        }}
      />
      <main className="min-h-screen pt-36 pb-20 px-4 sm:px-6">
        <Section spacing="lg">
          <div className="max-w-3xl">
            <Badge className="mb-4">Resources</Badge>
            <Heading level="h1" className="mb-4">Free Audits and Lead Magnets</Heading>
            <p className="text-body text-[var(--text-muted)] max-w-2xl">
              Simple, useful audit tools for teams improving SEO, AI visibility, brand trust, social authority, and LLM discovery.
            </p>
          </div>
        </Section>

        <Section spacing="lg">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {RESOURCES.map((resource) => (
              <Link
                key={resource.slug}
                href={resource.href || `/${resource.slug}`}
                className="group rounded-2xl border border-[var(--border)] bg-[var(--card-bg)] p-6 hover:border-[var(--accent)]/40 transition-all"
              >
                <p className="text-meta uppercase text-[var(--accent)] mb-5">{resource.format}</p>
                <h2 className="text-h2 text-[var(--text)] mb-4 group-hover:text-[var(--accent)] transition-colors font-semibold">
                  {resource.title}
                </h2>
                <p className="text-body text-[var(--text-muted)] mb-6">{resource.description}</p>
                <span className="text-xs text-[var(--text-muted)]">{resource.readingTime} report</span>
              </Link>
            ))}
          </div>
        </Section>
      </main>
    </>
  );
}
