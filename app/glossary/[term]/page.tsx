import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import Link from 'next/link';
import { GLOSSARY_TERMS } from '../../../data/seoExpansion';
import { breadcrumbSchema } from '../../../lib/schema';
import Section from '../../../components/ui/Section';
import Heading from '../../../components/ui/Heading';
import Badge from '../../../components/ui/Badge';

export const dynamicParams = false;

export const generateStaticParams = () => GLOSSARY_TERMS.map((term) => ({ term: term.slug }));

export const generateMetadata = async ({
  params,
}: {
  params: Promise<{ term: string }>;
}): Promise<Metadata> => {
  const { term } = await params;
  const page = GLOSSARY_TERMS.find((item) => item.slug === term);
  if (!page)
    return {
      title: 'Glossary Term Not Found',
      description: 'Glossary term not found.',
      robots: { index: false },
    };
  return {
    title: `What Is ${page.term}? | Qognition Glossary`,
    description: page.definition,
    alternates: { canonical: `/glossary/${page.slug}` },
  };
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
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify([
            {
              '@context': 'https://schema.org',
              '@type': 'DefinedTerm',
              name: page.term,
              description: page.definition,
              inDefinedTermSet: 'https://qognition.com/glossary',
              url: `https://qognition.com${path}`,
            },
            breadcrumbSchema([
              { name: 'Home', path: '/' },
              { name: 'Glossary', path: '/glossary' },
              { name: page.term, path },
            ]),
          ]),
        }}
      />
      <main className="min-h-screen pt-36 pb-20 px-4 sm:px-6">
        <Section spacing="lg">
          <div className="max-w-3xl">
            <Badge className="mb-4">{page.category}</Badge>
            <Heading level="h1" className="mb-6">What Is {page.term}?</Heading>
            <p className="text-xl text-[var(--text-muted)] leading-relaxed">
              {page.definition}
            </p>
          </div>
        </Section>

        <Section spacing="md">
          <div className="max-w-3xl space-y-10">
            <div>
              <Heading level="h2" className="mb-4">Why It Matters</Heading>
              <p className="text-lg text-[var(--text-muted)] leading-relaxed">
                {page.term} matters because modern marketing performance depends on clarity
                across discovery, trust, conversion, and measurement. Qognition uses this
                concept when deciding what to build, what to optimize, and how to connect
                search demand to revenue.
              </p>
            </div>
            <div>
              <Heading level="h2" className="mb-4">How Qognition Applies It</Heading>
              <p className="text-lg text-[var(--text-muted)] leading-relaxed">
                In client work, {page.term.toLowerCase()} is translated into pages, technical
                fixes, dashboards, content briefs, paid media tests, internal links, schema,
                lead magnets, or conversion experiments depending on the business model and
                market.
              </p>
            </div>
            {related.length > 0 && (
              <div>
                <Heading level="h2" className="mb-4">Related Terms</Heading>
                <div className="flex flex-wrap gap-3">
                  {related.map(
                    (item) =>
                      item && (
                        <Link
                          key={item.slug}
                          href={`/glossary/${item.slug}`}
                          className="rounded-lg border border-[var(--border)] bg-[var(--card-bg)] px-4 py-2 text-sm text-[var(--text-muted)] hover:border-[var(--accent)]/40 hover:text-[var(--text)] transition-all"
                        >
                          {item.term}
                        </Link>
                      )
                  )}
                </div>
              </div>
            )}
          </div>
        </Section>
      </main>
    </>
  );
}
