import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import Link from 'next/link';
import SchemaScript from '../../SchemaScript';
import { COMPARISONS } from '../../../data/seoExpansion';
import { breadcrumbSchema, faqSchema, metadataFor } from '../../../lib/seo';

export const dynamicParams = false;

export const generateStaticParams = () => COMPARISONS.map((comparison) => ({ slug: comparison.slug }));

export const generateMetadata = async ({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> => {
  const { slug } = await params;
  const page = COMPARISONS.find((item) => item.slug === slug);
  if (!page) return metadataFor({ title: 'Comparison Not Found', description: 'Comparison not found.', path: `/comparisons/${slug}`, noIndex: true });
  return metadataFor({ title: page.title, description: page.description, path: `/comparisons/${page.slug}` });
};

export default async function Page({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const page = COMPARISONS.find((item) => item.slug === slug);
  if (!page) notFound();

  const path = `/comparisons/${page.slug}`;

  return (
    <>
      <SchemaScript data={faqSchema(page.faqs)} />
      <SchemaScript data={breadcrumbSchema([{ name: 'Home', path: '/' }, { name: 'Comparisons', path: '/comparisons' }, { name: page.title, path }])} />
      <main className="min-h-screen pt-32 px-6 md:px-12 pb-28">
        <section className="max-w-7xl mx-auto">
          <span className="text-teal-400 font-mono text-sm uppercase tracking-widest">{page.category}</span>
          <h1 className="font-display text-5xl md:text-8xl leading-none mt-6 mb-8">{page.h1}</h1>
          <p className="text-xl text-gray-300 max-w-4xl leading-relaxed">{page.summary}</p>
        </section>
        <section className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-6 mt-16">
          <Panel title="Decision Factors" items={page.decisionFactors} />
          <Panel title="Where Qognition Fits" items={page.qognitionFit} />
          <Panel title="Alternatives" items={page.alternatives} />
        </section>
        <section className="max-w-7xl mx-auto mt-16 rounded-2xl border border-teal-400/20 bg-teal-400/5 p-8">
          <h2 className="font-display text-4xl mb-5">How to Choose</h2>
          <p className="text-lg text-gray-300 leading-relaxed max-w-4xl">
            Pick the partner whose operating model matches your constraint. If you need procurement scale, a large agency can fit.
            If you need technical SEO, paid search, landing pages, content systems, AI search visibility, and faster implementation,
            Qognition is designed for that path.
          </p>
          <Link href="/pricing" className="mt-8 inline-flex rounded-full bg-teal-400 px-8 py-4 font-display text-sm uppercase tracking-wider text-black hover:bg-white">
            View Pricing Guide
          </Link>
        </section>
      </main>
    </>
  );
}

const Panel = ({ title, items }: { title: string; items: string[] }) => (
  <div className="rounded-2xl border border-white/10 bg-white/[0.03] p-6">
    <h2 className="font-display text-2xl mb-5">{title}</h2>
    <div className="space-y-3">
      {items.map((item) => (
        <p key={item} className="text-sm text-gray-400 leading-relaxed">{item}</p>
      ))}
    </div>
  </div>
);
