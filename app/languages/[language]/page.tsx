import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import Link from 'next/link';
import SchemaScript from '../../SchemaScript';
import { LANGUAGE_SEO_PAGES, getLanguageSeoPage } from '../../../data/internationalSeo';
import { breadcrumbSchema, metadataFor, SITE_URL } from '../../../lib/seo';

export const dynamicParams = false;

export const generateStaticParams = () => LANGUAGE_SEO_PAGES.map((language) => ({ language: language.slug }));

export const generateMetadata = async ({ params }: { params: Promise<{ language: string }> }): Promise<Metadata> => {
  const { language } = await params;
  const page = getLanguageSeoPage(language);
  if (!page) return metadataFor({ title: 'Language Not Found', description: 'Language not found.', path: `/languages/${language}`, noIndex: true });
  return metadataFor({ title: page.title, description: page.description, path: `/languages/${page.slug}` });
};

export default async function Page({ params }: { params: Promise<{ language: string }> }) {
  const { language } = await params;
  const page = getLanguageSeoPage(language);
  if (!page) notFound();

  const path = `/languages/${page.slug}`;

  return (
    <>
      <SchemaScript
        data={{
          '@context': 'https://schema.org',
          '@type': 'Service',
          name: page.title,
          description: page.description,
          provider: { '@type': 'Organization', name: 'Qognition Agency', url: SITE_URL },
          availableLanguage: page.language,
          areaServed: page.countries,
          url: `${SITE_URL}${path}`
        }}
      />
      <SchemaScript data={breadcrumbSchema([{ name: 'Home', path: '/' }, { name: 'Languages', path: '/languages' }, { name: page.language, path }])} />
      <main className="min-h-screen pt-32 px-6 md:px-12 pb-28">
        <section className="max-w-7xl mx-auto">
          <span className="text-teal-400 font-mono text-sm uppercase tracking-widest">{page.nativeName}</span>
          <h1 className="font-display text-5xl md:text-8xl leading-none mt-6 mb-8">{page.title}</h1>
          <p className="text-xl md:text-2xl text-gray-300 max-w-4xl leading-relaxed">{page.intro}</p>
          <div className="mt-10 flex flex-col sm:flex-row gap-4">
            <Link href="/free-seo-audit" className="rounded-full bg-teal-400 px-8 py-4 text-center font-display text-sm uppercase tracking-wider text-black hover:bg-white">
              Get Free Localization Audit
            </Link>
            <Link href="/global/china-market-entry" className="rounded-full border border-white/20 px-8 py-4 text-center font-display text-sm uppercase tracking-wider text-white hover:border-teal-400 hover:text-teal-400">
              China Market Entry
            </Link>
          </div>
        </section>
        <section className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-8 mt-16">
          <div className="rounded-2xl border border-white/10 bg-white/[0.03] p-8">
            <h2 className="font-display text-3xl mb-6">Priority Countries</h2>
            <div className="flex flex-wrap gap-3">
              {page.countries.map((country) => (
                <span key={country} className="rounded-full border border-white/10 bg-black px-4 py-2 text-sm text-gray-300">{country}</span>
              ))}
            </div>
          </div>
          <div className="rounded-2xl border border-white/10 bg-white/[0.03] p-8">
            <h2 className="font-display text-3xl mb-6">Services</h2>
            <div className="space-y-3">
              {page.services.map((service) => (
                <p key={service} className="text-gray-300">{service}</p>
              ))}
            </div>
          </div>
        </section>
      </main>
    </>
  );
}
