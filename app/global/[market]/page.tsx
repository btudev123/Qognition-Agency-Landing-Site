import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import Link from 'next/link';
import SchemaScript from '../../SchemaScript';
import { GLOBAL_MARKETS, getGlobalMarket } from '../../../data/internationalSeo';
import { breadcrumbSchema, faqSchema, metadataFor, SITE_URL } from '../../../lib/seo';
import { CALENDLY_LINK } from '../../../constants';

export const dynamicParams = false;

export const generateStaticParams = () => GLOBAL_MARKETS.map((market) => ({ market: market.slug }));

export const generateMetadata = async ({ params }: { params: Promise<{ market: string }> }): Promise<Metadata> => {
  const { market } = await params;
  const page = getGlobalMarket(market);
  if (!page) return metadataFor({ title: 'Market Not Found', description: 'Market not found.', path: `/global/${market}`, noIndex: true });
  return metadataFor({ title: page.title, description: page.description, path: `/global/${page.slug}` });
};

export default async function Page({ params }: { params: Promise<{ market: string }> }) {
  const { market } = await params;
  const page = getGlobalMarket(market);
  if (!page) notFound();

  const path = `/global/${page.slug}`;

  return (
    <>
      <SchemaScript
        data={{
          '@context': 'https://schema.org',
          '@type': 'Service',
          name: page.title,
          description: page.description,
          provider: { '@type': 'Organization', name: 'Qognition Agency', url: SITE_URL },
          areaServed: page.country,
          url: `${SITE_URL}${path}`
        }}
      />
      <SchemaScript data={faqSchema(page.faqs)} />
      <SchemaScript data={breadcrumbSchema([{ name: 'Home', path: '/' }, { name: 'Global Markets', path: '/global' }, { name: page.country, path }])} />
      <main className="min-h-screen pt-32 px-6 md:px-12 pb-28">
        <section className="max-w-7xl mx-auto">
          <span className="text-teal-400 font-mono text-sm uppercase tracking-widest">{page.region}</span>
          <h1 className="font-display text-5xl md:text-8xl leading-none mt-6 mb-8">{page.h1}</h1>
          <p className="text-xl md:text-2xl text-gray-300 max-w-4xl leading-relaxed">{page.intro}</p>
          <div className="mt-10 flex flex-col sm:flex-row gap-4">
            <Link href="/free-seo-audit" className="rounded-full bg-teal-400 px-8 py-4 text-center font-display text-sm uppercase tracking-wider text-black hover:bg-white">
              Get Free Market Audit
            </Link>
            <a href={CALENDLY_LINK} target="_blank" rel="noopener noreferrer" className="rounded-full border border-white/20 px-8 py-4 text-center font-display text-sm uppercase tracking-wider text-white hover:border-teal-400 hover:text-teal-400">
              Book Strategy Call
            </a>
          </div>
        </section>
        <section className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-8 mt-16">
          <Panel title="Market Opportunities" items={page.opportunities} />
          <Panel title="Qognition Services" items={page.services} />
        </section>
        <section className="max-w-7xl mx-auto mt-16">
          <h2 className="font-display text-4xl mb-8">Country Growth FAQs</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {page.faqs.map((faq) => (
              <div key={faq.question} className="rounded-xl border border-white/10 bg-white/[0.03] p-5">
                <h3 className="font-display text-xl mb-3">{faq.question}</h3>
                <p className="text-sm text-gray-400 leading-relaxed">{faq.answer}</p>
              </div>
            ))}
          </div>
        </section>
      </main>
    </>
  );
}

const Panel = ({ title, items }: { title: string; items: string[] }) => (
  <div className="rounded-2xl border border-white/10 bg-white/[0.03] p-8">
    <h2 className="font-display text-3xl mb-6">{title}</h2>
    <div className="space-y-4">
      {items.map((item) => (
        <p key={item} className="text-gray-300">{item}</p>
      ))}
    </div>
  </div>
);
