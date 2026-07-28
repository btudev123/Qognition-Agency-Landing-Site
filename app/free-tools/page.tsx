import type { Metadata } from 'next';
import Link from 'next/link';
import { FREE_TOOLS } from '../../data/seoExpansion';
import { breadcrumbSchema } from '../../lib/schema';
import Section from '../../components/ui/Section';
import Heading from '../../components/ui/Heading';
import Badge from '../../components/ui/Badge';

export const dynamic = 'force-static';

export const metadata: Metadata = {
  title: 'Free SEO and Marketing Calculators | Qognition',
  description: 'Free calculators for SEO ROI, Google Ads budgets, website traffic, ROAS, and content ideas.',
  alternates: { canonical: '/free-tools' },
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
              name: 'Free SEO and Marketing Tools',
              url: 'https://www.qognitionagency.com/free-tools',
              mainEntity: {
                '@type': 'ItemList',
                itemListElement: FREE_TOOLS.map((tool, index) => ({
                  '@type': 'ListItem',
                  position: index + 1,
                  name: tool.title,
                  url: `https://www.qognitionagency.com/free-tools/${tool.slug}`,
                })),
              },
            },
            breadcrumbSchema([{ name: 'Home', path: '/' }, { name: 'Free Tools', path: '/free-tools' }]),
          ]),
        }}
      />
      <main className="min-h-screen pt-36 pb-20 px-4 sm:px-6">
        <Section spacing="lg">
          <div className="max-w-3xl">
            <Badge className="mb-4">Free Tools</Badge>
            <Heading level="h1" className="mb-4">SEO and Marketing Calculators</Heading>
            <p className="text-body text-[var(--text-muted)] max-w-2xl">
              Estimate ROI, budget, traffic, ROAS, and content opportunities before you commit spend or build a campaign.
            </p>
          </div>
        </Section>

        <Section spacing="lg">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {FREE_TOOLS.map((tool) => (
              <Link
                key={tool.slug}
                href={`/free-tools/${tool.slug}`}
                className="group rounded-2xl border border-[var(--border)] bg-[var(--card-bg)] p-6 hover:border-[var(--accent)]/40 transition-all"
              >
                <h2 className="text-h2 text-[var(--text)] mb-4 group-hover:text-[var(--accent)] transition-colors font-semibold">
                  {tool.title}
                </h2>
                <p className="text-body text-[var(--text-muted)] mb-6">{tool.description}</p>
                <span className="text-sm text-[var(--accent)]">Open calculator</span>
              </Link>
            ))}
          </div>
        </Section>
      </main>
    </>
  );
}
