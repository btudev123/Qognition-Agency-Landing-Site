import type { Metadata } from 'next';
import Link from 'next/link';
import { ArrowRight } from 'lucide-react';
import { GLOBAL_MARKETS } from '../../data/internationalSeo';
import { breadcrumbSchema } from '../../lib/schema';
import Section from '../../components/ui/Section';
import Heading from '../../components/ui/Heading';
import Badge from '../../components/ui/Badge';

export const dynamic = 'force-static';

export const metadata: Metadata = {
  title: 'Global Markets | Qognition',
  description: 'Country-specific SEO, paid media, AI search visibility, and lead generation pages for global market expansion.',
  alternates: { canonical: '/global' },
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
              name: 'Qognition Global Markets',
              url: 'https://qognition.com/global',
            },
            breadcrumbSchema([{ name: 'Home', path: '/' }, { name: 'Global Markets', path: '/global' }]),
          ]),
        }}
      />
      <main className="min-h-screen pt-36 pb-20 px-4 sm:px-6">
        <Section spacing="lg">
          <div className="max-w-3xl">
            <Badge className="mb-4">Global Markets</Badge>
            <Heading level="h1" className="mb-4">Country-Specific Digital Growth</Heading>
            <p className="text-body text-[var(--text-muted)] max-w-2xl">
              Qognition builds market-entry and market-expansion campaigns for companies entering new countries, expanding out of China, and localizing SEO, paid media, landing pages, and CRM tracking.
            </p>
          </div>
        </Section>

        <Section spacing="lg">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {GLOBAL_MARKETS.map((market) => (
              <Link
                key={market.slug}
                href={`/global/${market.slug}`}
                className="rounded-2xl border border-[var(--border)] bg-[var(--card-bg)] p-6 hover:border-[var(--accent)]/40 transition-all"
              >
                <p className="text-meta uppercase text-[var(--accent)] mb-5">{market.region}</p>
                <h2 className="text-h2 text-[var(--text)] mb-4 font-semibold">{market.country}</h2>
                <p className="text-body text-[var(--text-muted)]">{market.description}</p>
              </Link>
            ))}
          </div>
        </Section>
      </main>
    </>
  );
}
