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
              inDefinedTermSet: 'https://www.qognitionagency.com/glossary',
              url: `https://www.qognitionagency.com${path}`,
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
            <p className="text-body text-[var(--text-muted)]">
              {page.definition}
            </p>
          </div>
        </Section>

        <Section spacing="md">
          <div className="max-w-3xl space-y-10">
            <div>
              <Heading level="h2" className="mb-4">Why It Matters</Heading>
              <p className="text-body text-[var(--text-muted)]">
                {page.term} matters because modern marketing performance depends on clarity
                across discovery, trust, conversion, and measurement. Qognition uses this
                concept when deciding what to build, what to optimize, and how to connect
                search demand to revenue.
              </p>
            </div>
            <div>
              <Heading level="h2" className="mb-4">How to apply the concept</Heading>
              <p className="text-body text-[var(--text-muted)]">
                For {page.term}, first identify the decision or task it informs. Agree the relevant evidence, implementation owner and measure before choosing a tool or tactic. The application depends on your business model and market.
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
        <Section spacing="lg"><Heading level="h2" className="mb-4">Apply this to your search programme</Heading><p className="text-body mb-6">Tell us which buyer questions or acquisition problems you are working on. We can discuss the relevant AI SEO and GEO scope.</p><div className="flex flex-wrap gap-4"><Link className="btn-primary" href="/book">Book a call</Link><Link className="btn-outline" href="/contact#enquiry">Send an enquiry</Link></div></Section>
      </main>
    </>
  );
}
