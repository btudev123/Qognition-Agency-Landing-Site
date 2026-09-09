import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import Link from 'next/link';
import { GLOBAL_MARKETS, getGlobalMarket } from '../../../data/internationalSeo';
import { breadcrumbSchema, faqSchema } from '../../../lib/schema';
import Section from '../../../components/ui/Section';
import Heading from '../../../components/ui/Heading';
import Badge from '../../../components/ui/Badge';

export const dynamicParams = false;

export const generateStaticParams = () => GLOBAL_MARKETS.map((market) => ({ market: market.slug }));

export const generateMetadata = async ({ params }: { params: Promise<{ market: string }> }): Promise<Metadata> => {
  const { market } = await params;
  const page = getGlobalMarket(market);
  if (!page) return { title: 'Market Not Found', description: 'Market not found.', robots: { index: false } };
  return { title: page.title, description: page.description, alternates: { canonical: `/global/${page.slug}` } };
};

export default async function Page({ params }: { params: Promise<{ market: string }> }) {
  const { market } = await params;
  const page = getGlobalMarket(market);
  if (!page) notFound();

  const path = `/global/${page.slug}`;

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify([
            {
              '@context': 'https://schema.org',
              '@type': 'Service',
              name: page.title,
              description: page.description,
              provider: { '@type': 'Organization', name: 'Qognition', url: 'https://www.qognitionagency.com' },
              areaServed: page.country,
              url: `https://www.qognitionagency.com${path}`,
            },
            ...(page.faqs?.length ? [faqSchema(page.faqs)] : []),
            breadcrumbSchema([
              { name: 'Home', path: '/' },
              { name: 'Global Markets', path: '/global' },
              { name: page.country, path },
            ]),
          ]),
        }}
      />
      <main className="min-h-screen pt-36 pb-20 px-4 sm:px-6">
        <Section spacing="lg">
          <Badge className="mb-4">{page.region}</Badge>
          <Heading level="h1" className="mb-6">{page.h1}</Heading>
          <p className="text-body text-[var(--text-muted)] max-w-4xl">{page.intro}</p>
          <div className="mt-10 flex flex-col sm:flex-row gap-4">
            <Link
              href="/free-seo-audit"
              className="inline-flex px-6 py-3 text-sm font-medium bg-[var(--accent)] text-[var(--accent-deep)] rounded-lg hover:brightness-110 transition-all"
            >
              Get Free Market Audit
            </Link>
            <a
              href="https://api.leadconnectorhq.com/widget/bookings/discovery-call-qognition-agency"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex px-6 py-3 text-sm font-medium border border-[var(--border)] text-[var(--text)] rounded-lg hover:border-[var(--accent)] hover:text-[var(--accent)] transition-all"
            >
              Book Strategy Call
            </a>
          </div>
        </Section>

        <Section spacing="lg">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="rounded-2xl border border-[var(--border)] bg-[var(--card-bg)] p-8">
              <Heading level="h2" className="mb-6">Market Opportunities</Heading>
              <div className="space-y-4">
                {page.opportunities.map((item) => (
                  <p key={item} className="text-body text-[var(--text-muted)]">{item}</p>
                ))}
              </div>
            </div>
            <div className="rounded-2xl border border-[var(--border)] bg-[var(--card-bg)] p-8">
              <Heading level="h2" className="mb-6">Qognition Services</Heading>
              <div className="space-y-4">
                {page.services.map((item) => (
                  <p key={item} className="text-body text-[var(--text-muted)]">{item}</p>
                ))}
              </div>
            </div>
          </div>
        </Section>

        <Section spacing="lg">
          <Heading level="h2" className="mb-8">Country Growth FAQs</Heading>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {page.faqs.map((faq) => (
              <div key={faq.question} className="rounded-xl border border-[var(--border)] bg-[var(--card-bg)] p-5">
                <h3 className="text-h3 text-[var(--text)] mb-3 font-semibold">{faq.question}</h3>
                <p className="text-body text-[var(--text-muted)]">{faq.answer}</p>
              </div>
            ))}
          </div>
        </Section>
      </main>
    </>
  );
}
