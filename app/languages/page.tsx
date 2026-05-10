import Link from 'next/link';
import SchemaScript from '../SchemaScript';
import { LANGUAGE_SEO_PAGES } from '../../data/internationalSeo';
import { breadcrumbSchema, metadataFor, SITE_URL } from '../../lib/seo';

export const dynamic = 'force-static';

export const metadata = metadataFor({
  title: 'Multilingual SEO and Digital Marketing | Qognition Agency',
  description: 'Arabic, French, Spanish, Mandarin, Portuguese, Russian, and Japanese SEO and digital marketing pages.',
  path: '/languages'
});

export default function Page() {
  return (
    <>
      <SchemaScript
        data={{
          '@context': 'https://schema.org',
          '@type': 'CollectionPage',
          name: 'Qognition Multilingual SEO',
          url: `${SITE_URL}/languages`
        }}
      />
      <SchemaScript data={breadcrumbSchema([{ name: 'Home', path: '/' }, { name: 'Languages', path: '/languages' }])} />
      <main className="min-h-screen pt-32 px-6 md:px-12 pb-28">
        <section className="max-w-7xl mx-auto">
          <span className="text-teal-400 font-mono text-sm uppercase tracking-widest">Multilingual SEO</span>
          <h1 className="font-display text-5xl md:text-8xl leading-none mt-6 mb-8">Marketing in Every Priority Language</h1>
          <p className="text-xl text-gray-300 max-w-4xl leading-relaxed">
            Localized SEO, landing pages, paid media, and lead capture for Arabic, French, Spanish, Mandarin, Portuguese, Russian, and Japanese markets.
          </p>
        </section>
        <section className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-6 mt-16">
          {LANGUAGE_SEO_PAGES.map((language) => (
            <Link key={language.slug} href={`/languages/${language.slug}`} className="rounded-2xl border border-white/10 bg-white/[0.03] p-6 hover:border-teal-400/50">
              <div className="text-2xl mb-4">{language.nativeName}</div>
              <h2 className="font-display text-3xl mb-4">{language.language}</h2>
              <p className="text-gray-400 leading-relaxed">{language.description}</p>
            </Link>
          ))}
        </section>
      </main>
    </>
  );
}
