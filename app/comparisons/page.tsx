import type { Metadata } from 'next';
import Link from 'next/link';
import { COMPARISONS } from '../../data/seoExpansion';
import { breadcrumbSchema } from '../../lib/schema';
import Section from '../../components/ui/Section';
import Heading from '../../components/ui/Heading';
import Badge from '../../components/ui/Badge';

export const dynamic = 'force-static';

export const metadata: Metadata = {
  title: 'Agency Comparisons | Qognition',
  description: 'Compare Qognition with other agencies, in-house teams, and city-level agency options for SEO, PPC, and growth.',
  alternates: { canonical: '/comparisons' },
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
              name: 'Digital Marketing Agency Comparisons',
              url: 'https://www.qognitionagency.com/comparisons',
            },
            breadcrumbSchema([{ name: 'Home', path: '/' }, { name: 'Comparisons', path: '/comparisons' }]),
          ]),
        }}
      />
      <main className="min-h-screen pt-36 pb-20 px-4 sm:px-6">
        <Section spacing="lg">
          <div className="max-w-3xl">
            <Badge className="mb-4">Comparisons</Badge>
            <Heading level="h1" className="mb-4">Agency and Strategy Comparisons</Heading>
            <p className="text-body text-[var(--text-muted)] max-w-2xl">
              Buyer-intent pages for teams comparing agencies, internal hiring, and local options before committing budget.
            </p>
          </div>
        </Section>

        <Section spacing="lg">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {COMPARISONS.map((comparison) => (
              <Link
                key={comparison.slug}
                href={`/comparisons/${comparison.slug}`}
                className="rounded-2xl border border-[var(--border)] bg-[var(--card-bg)] p-6 hover:border-[var(--accent)]/40 transition-all"
              >
                <p className="text-meta uppercase text-[var(--accent)] mb-5">{comparison.category}</p>
                <h2 className="text-h2 text-[var(--text)] mb-4 font-semibold">{comparison.title}</h2>
                <p className="text-body text-[var(--text-muted)]">{comparison.description}</p>
              </Link>
            ))}
          </div>
        </Section>
      </main>
    </>
  );
}
