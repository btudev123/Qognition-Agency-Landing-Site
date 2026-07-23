import type { Metadata } from 'next';
import Link from 'next/link';
import { ArrowRight, Search } from 'lucide-react';
import { TOOL_CATEGORIES } from '../../data/toolCategories';
import { DIRECTORY_PRODUCTS } from '../../data/directoryProducts';
import { breadcrumbSchema } from '../../lib/schema';
import Section from '../../components/ui/Section';
import Heading from '../../components/ui/Heading';
import Badge from '../../components/ui/Badge';

export const metadata: Metadata = {
  title: 'Growth Stack Directory | Qognition',
  description: 'Browse useful software profiles for SEO, AI, marketing, development, design, and automation tools.',
  alternates: { canonical: '/directory' },
};

export default function Page() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify([
            {
              '@context': 'https://schema.org',
              '@type': 'CollectionPage',
              name: 'Qognition Growth Stack Directory',
              description: 'Useful software profiles for SEO, AI, marketing, development, design, and automation tools.',
              url: 'https://qognition.com/directory',
            },
            breadcrumbSchema([{ name: 'Home', path: '/' }, { name: 'Directory', path: '/directory' }]),
          ]),
        }}
      />
      <main className="min-h-screen pt-36 pb-20 px-4 sm:px-6">
        <Section spacing="lg">
          <div className="max-w-3xl">
            <Badge className="mb-4">Growth Stack</Badge>
            <Heading level="h1" className="mb-4">Tools Directory</Heading>
            <p className="text-body text-[var(--text-muted)] max-w-2xl">
              Browse useful software and AI product profiles for SEO, PPC, content, social media, web development, and automation.
            </p>
          </div>
        </Section>

        <Section spacing="lg">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-14">
            {TOOL_CATEGORIES.map((category) => {
              const count = DIRECTORY_PRODUCTS.filter((p) => p.categorySlug === category.slug).length;
              return (
                <Link
                  key={category.id}
                  href={`/directory/${category.slug}`}
                  className="group p-7 border border-[var(--border)] rounded-2xl bg-[var(--card-bg)] hover:border-[var(--accent)]/40 transition-all hover:-translate-y-0.5"
                >
                  <div className="flex justify-between items-start mb-4">
                    <Search size={20} className="text-[var(--accent)]" />
                    <span className="text-xs text-[var(--text-muted)]">{count} tools</span>
                  </div>
                  <h2 className="text-h2 text-[var(--text)] mb-2 group-hover:text-[var(--accent)] transition-colors font-semibold">
                    {category.name}
                  </h2>
                  <p className="text-body text-[var(--text-muted)] mb-4">{category.description}</p>
                  <span className="inline-flex items-center gap-2 text-[var(--accent)] text-sm">
                    Browse category <ArrowRight size={14} />
                  </span>
                </Link>
              );
            })}
          </div>
        </Section>
      </main>
    </>
  );
}
