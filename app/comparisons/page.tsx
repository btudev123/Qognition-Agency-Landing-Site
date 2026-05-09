import Link from 'next/link';
import SchemaScript from '../SchemaScript';
import { COMPARISONS } from '../../data/seoExpansion';
import { breadcrumbSchema, metadataFor, SITE_URL } from '../../lib/seo';

export const dynamic = 'force-static';

export const metadata = metadataFor({
  title: 'Digital Marketing Agency Comparisons | Qognition Agency',
  description: 'Compare Qognition with agencies, in-house teams, and city-level agency options for SEO, PPC, and growth.',
  path: '/comparisons'
});

export default function Page() {
  return (
    <>
      <SchemaScript
        data={{
          '@context': 'https://schema.org',
          '@type': 'CollectionPage',
          name: 'Digital Marketing Agency Comparisons',
          url: `${SITE_URL}/comparisons`
        }}
      />
      <SchemaScript data={breadcrumbSchema([{ name: 'Home', path: '/' }, { name: 'Comparisons', path: '/comparisons' }])} />
      <main className="min-h-screen pt-32 px-6 md:px-12 pb-28">
        <section className="max-w-7xl mx-auto">
          <span className="text-teal-400 font-mono text-sm uppercase tracking-widest">Comparisons</span>
          <h1 className="font-display text-5xl md:text-8xl leading-none mt-6 mb-8">Agency and Strategy Comparisons</h1>
          <p className="text-xl text-gray-300 max-w-3xl leading-relaxed">
            Buyer-intent pages for teams comparing agencies, internal hiring, and local options before committing budget.
          </p>
        </section>
        <section className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-6 mt-16">
          {COMPARISONS.map((comparison) => (
            <Link key={comparison.slug} href={`/comparisons/${comparison.slug}`} className="rounded-2xl border border-white/10 bg-white/[0.03] p-6 hover:border-teal-400/50">
              <div className="text-xs uppercase tracking-widest text-teal-400 mb-5">{comparison.category}</div>
              <h2 className="font-display text-3xl mb-4">{comparison.title}</h2>
              <p className="text-gray-400 leading-relaxed">{comparison.description}</p>
            </Link>
          ))}
        </section>
      </main>
    </>
  );
}
