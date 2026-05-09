import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import Link from 'next/link';
import SchemaScript from '../../SchemaScript';
import { GLOSSARY_TERMS } from '../../../data/seoExpansion';
import { breadcrumbSchema, metadataFor, SITE_URL } from '../../../lib/seo';

export const dynamicParams = false;

export const generateStaticParams = () => GLOSSARY_TERMS.map((term) => ({ term: term.slug }));

export const generateMetadata = async ({ params }: { params: Promise<{ term: string }> }): Promise<Metadata> => {
  const { term } = await params;
  const page = GLOSSARY_TERMS.find((item) => item.slug === term);
  if (!page) return metadataFor({ title: 'Glossary Term Not Found', description: 'Glossary term not found.', path: `/glossary/${term}`, noIndex: true });
  return metadataFor({
    title: `What Is ${page.term}?`,
    description: page.definition,
    path: `/glossary/${page.slug}`
  });
};

export default async function Page({ params }: { params: Promise<{ term: string }> }) {
  const { term } = await params;
  const page = GLOSSARY_TERMS.find((item) => item.slug === term);
  if (!page) notFound();

  const related = page.relatedTerms
    .map((slug) => GLOSSARY_TERMS.find((item) => item.slug === slug))
    .filter(Boolean)
    .slice(0, 6);

  const path = `/glossary/${page.slug}`;

  return (
    <>
      <SchemaScript
        data={{
          '@context': 'https://schema.org',
          '@type': 'DefinedTerm',
          name: page.term,
          description: page.definition,
          inDefinedTermSet: `${SITE_URL}/glossary`,
          url: `${SITE_URL}${path}`
        }}
      />
      <SchemaScript data={breadcrumbSchema([{ name: 'Home', path: '/' }, { name: 'Glossary', path: '/glossary' }, { name: page.term, path }])} />
      <main className="min-h-screen pt-32 px-6 md:px-12 pb-28">
        <section className="max-w-5xl mx-auto">
          <span className="text-teal-400 font-mono text-sm uppercase tracking-widest">{page.category}</span>
          <h1 className="font-display text-5xl md:text-8xl leading-none mt-6 mb-8">What Is {page.term}?</h1>
          <p className="text-xl md:text-2xl text-gray-300 leading-relaxed">{page.definition}</p>
        </section>
        <section className="max-w-5xl mx-auto mt-16 space-y-10">
          <div>
            <h2 className="font-display text-3xl mb-5">Why It Matters</h2>
            <p className="text-lg text-gray-300 leading-relaxed">
              {page.term} matters because modern marketing performance depends on clarity across discovery, trust, conversion, and measurement.
              Qognition uses this concept when deciding what to build, what to optimize, and how to connect search demand to revenue.
            </p>
          </div>
          <div>
            <h2 className="font-display text-3xl mb-5">How Qognition Applies It</h2>
            <p className="text-lg text-gray-300 leading-relaxed">
              In client work, {page.term.toLowerCase()} is translated into pages, technical fixes, dashboards, content briefs, paid media tests,
              internal links, schema, lead magnets, or conversion experiments depending on the business model and market.
            </p>
          </div>
          <div>
            <h2 className="font-display text-3xl mb-5">Related Terms</h2>
            <div className="flex flex-wrap gap-3">
              {related.map((item) => item && (
                <Link key={item.slug} href={`/glossary/${item.slug}`} className="rounded-full border border-white/10 bg-white/[0.03] px-4 py-2 text-sm text-gray-300 hover:border-teal-400/50">
                  {item.term}
                </Link>
              ))}
            </div>
          </div>
        </section>
      </main>
    </>
  );
}
