import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import Link from 'next/link';
import { COMPARISONS } from '../../../data/seoExpansion';
import { breadcrumbSchema, faqSchema } from '../../../lib/schema';
import Heading from '../../../components/ui/Heading';
import Badge from '../../../components/ui/Badge';

export const dynamicParams = false;

export const generateStaticParams = () => COMPARISONS.map((comparison) => ({ slug: comparison.slug }));

export const generateMetadata = async ({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> => {
  const { slug } = await params;
  const page = COMPARISONS.find((item) => item.slug === slug);
  if (!page) return { title: 'Comparison Not Found', description: 'Comparison not found.', robots: { index: false } };
  return { title: page.title, description: page.description, alternates: { canonical: `/comparisons/${page.slug}` } };
};

export default async function Page({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const page = COMPARISONS.find((item) => item.slug === slug);
  if (!page) notFound();

  const path = `/comparisons/${page.slug}`;

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify([
            ...(page.faqs?.length ? [faqSchema(page.faqs)] : []),
            breadcrumbSchema([
              { name: 'Home', path: '/' },
              { name: 'Comparisons', path: '/comparisons' },
              { name: page.title, path },
            ]),
          ]),
        }}
      />
      <main className="min-h-screen pt-36 pb-20 px-4 sm:px-6">
        <div className="max-w-7xl mx-auto">
          <Badge className="mb-4">{page.category}</Badge>
          <Heading level="h1" className="mb-6">{page.h1}</Heading>
          <p className="text-xl text-[var(--text-muted)] max-w-4xl leading-relaxed">{page.summary}</p>

          <div className="mt-16 grid grid-cols-1 md:grid-cols-3 gap-6">
            <Panel title="Decision Factors" items={page.decisionFactors} />
            <Panel title="Where Qognition Fits" items={page.qognitionFit} />
            <Panel title="Alternatives" items={page.alternatives} />
          </div>

          <div className="mt-16 rounded-2xl border border-[var(--accent)]/20 bg-[rgba(var(--accent-rgb),0.04)] p-8">
            <Heading level="h2" className="mb-5">How to Choose</Heading>
            <p className="text-lg text-[var(--text-muted)] leading-relaxed max-w-4xl">
              Pick the partner whose operating model matches your constraint. If you need procurement scale, a large agency can fit.
              If you need technical SEO, paid search, landing pages, content systems, AI search visibility, and faster implementation,
              Qognition is designed for that path.
            </p>
            <Link
              href="/lead-generation-roadmap"
              className="mt-8 inline-flex rounded-lg bg-[var(--accent)] px-6 py-3 text-sm font-medium text-[var(--accent-deep)] hover:brightness-110 transition-all"
            >
              View Lead Roadmap
            </Link>
          </div>
        </div>
      </main>
    </>
  );
}

const Panel = ({ title, items }: { title: string; items: string[] }) => (
  <div className="rounded-2xl border border-[var(--border)] bg-[var(--card-bg)] p-6">
    <h2 className="text-xl font-semibold text-[var(--text)] mb-5">{title}</h2>
    <div className="space-y-3">
      {items.map((item) => (
        <p key={item} className="text-sm text-[var(--text-muted)] leading-relaxed">{item}</p>
      ))}
    </div>
  </div>
);
