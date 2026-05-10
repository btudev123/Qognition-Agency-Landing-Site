import Link from 'next/link';
import SchemaScript from '../SchemaScript';
import { GLOBAL_MARKETS } from '../../data/internationalSeo';
import { breadcrumbSchema, metadataFor, SITE_URL } from '../../lib/seo';

export const dynamic = 'force-static';

export const metadata = metadataFor({
  title: 'Global Digital Marketing Markets | Qognition Agency',
  description: 'Country-specific SEO, paid media, AI search visibility, and lead generation pages for global market expansion.',
  path: '/global'
});

export default function Page() {
  return (
    <>
      <SchemaScript
        data={{
          '@context': 'https://schema.org',
          '@type': 'CollectionPage',
          name: 'Qognition Global Markets',
          url: `${SITE_URL}/global`
        }}
      />
      <SchemaScript data={breadcrumbSchema([{ name: 'Home', path: '/' }, { name: 'Global Markets', path: '/global' }])} />
      <main className="min-h-screen pt-32 px-6 md:px-12 pb-28">
        <section className="max-w-7xl mx-auto">
          <span className="text-teal-400 font-mono text-sm uppercase tracking-widest">Global Markets</span>
          <h1 className="font-display text-5xl md:text-8xl leading-none mt-6 mb-8">Country-Specific Digital Growth</h1>
          <p className="text-xl text-gray-300 max-w-4xl leading-relaxed">
            Qognition builds market-entry and market-expansion campaigns for companies entering new countries, expanding out of China, and localizing SEO, paid media, landing pages, and CRM tracking.
          </p>
        </section>
        <section className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-6 mt-16">
          {GLOBAL_MARKETS.map((market) => (
            <Link key={market.slug} href={`/global/${market.slug}`} className="rounded-2xl border border-white/10 bg-white/[0.03] p-6 hover:border-teal-400/50">
              <div className="text-xs uppercase tracking-widest text-teal-400 mb-5">{market.region}</div>
              <h2 className="font-display text-3xl mb-4">{market.country}</h2>
              <p className="text-gray-400 leading-relaxed">{market.description}</p>
            </Link>
          ))}
        </section>
      </main>
    </>
  );
}
