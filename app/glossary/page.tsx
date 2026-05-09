import Link from 'next/link';
import SchemaScript from '../SchemaScript';
import { GLOSSARY_TERMS } from '../../data/seoExpansion';
import { breadcrumbSchema, metadataFor, SITE_URL } from '../../lib/seo';

export const dynamic = 'force-static';

export const metadata = metadataFor({
  title: 'Digital Marketing Glossary | 300+ SEO, AI and Growth Terms',
  description: 'A crawlable glossary of SEO, AI search, PPC, analytics, content, local SEO, and lead generation terms.',
  path: '/glossary'
});

export default function Page() {
  const categories = Array.from(new Set(GLOSSARY_TERMS.map((term) => term.category)));

  return (
    <>
      <SchemaScript
        data={{
          '@context': 'https://schema.org',
          '@type': 'DefinedTermSet',
          name: 'Digital Marketing Glossary',
          url: `${SITE_URL}/glossary`
        }}
      />
      <SchemaScript data={breadcrumbSchema([{ name: 'Home', path: '/' }, { name: 'Glossary', path: '/glossary' }])} />
      <main className="min-h-screen pt-32 px-6 md:px-12 pb-28">
        <section className="max-w-7xl mx-auto">
          <span className="text-teal-400 font-mono text-sm uppercase tracking-widest">Glossary</span>
          <h1 className="font-display text-5xl md:text-8xl leading-none mt-6 mb-8">Digital Marketing Glossary</h1>
          <p className="text-xl text-gray-300 max-w-3xl leading-relaxed">
            More than 300 definitions across SEO, AI search, paid media, analytics, lead generation, and conversion strategy.
          </p>
        </section>
        <section className="max-w-7xl mx-auto mt-16 space-y-12">
          {categories.map((category) => (
            <div key={category}>
              <h2 className="font-display text-3xl mb-6">{category}</h2>
              <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-3">
                {GLOSSARY_TERMS.filter((term) => term.category === category).map((term) => (
                  <Link key={term.slug} href={`/glossary/${term.slug}`} className="rounded-lg border border-white/10 bg-white/[0.03] px-4 py-3 text-sm text-gray-300 hover:border-teal-400/50 hover:text-white">
                    {term.term}
                  </Link>
                ))}
              </div>
            </div>
          ))}
        </section>
      </main>
    </>
  );
}
