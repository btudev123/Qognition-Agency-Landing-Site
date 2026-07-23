import type { Metadata } from 'next';
import Link from 'next/link';
import { ArrowLeft, Star } from 'lucide-react';
import { DIRECTORY_PRODUCTS } from '../../../data/directoryProducts';
import { TOOL_CATEGORIES } from '../../../data/toolCategories';
import { breadcrumbSchema } from '../../../lib/schema';
import Section from '../../../components/ui/Section';
import Heading from '../../../components/ui/Heading';
import Badge from '../../../components/ui/Badge';

export const dynamicParams = true;

export const generateStaticParams = () =>
  Array.from(new Set(DIRECTORY_PRODUCTS.map((product) => product.categorySlug))).map((category) => ({ category }));

export const generateMetadata = async ({ params }: { params: Promise<{ category: string }> }): Promise<Metadata> => {
  const { category } = await params;
  const name = category.replace(/-/g, ' ');
  return {
    title: `${name} Tools Directory | Qognition`,
    description: `Browse useful software profiles for ${name} tools.`,
    alternates: { canonical: `/directory/${category}` },
  };
};

export default async function Page({ params }: { params: Promise<{ category: string }> }) {
  const { category } = await params;
  const products = DIRECTORY_PRODUCTS.filter((product) => product.categorySlug === category);
  const categoryData = TOOL_CATEGORIES.find((c) => c.slug === category);
  const categoryName = categoryData?.name || category.replace(/-/g, ' ');
  const path = `/directory/${category}`;

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify([
            {
              '@context': 'https://schema.org',
              '@type': 'CollectionPage',
              name: `${categoryName} Tools Directory`,
              url: `https://qognition.com${path}`,
              mainEntity: {
                '@type': 'ItemList',
                itemListElement: products.slice(0, 100).map((product, index) => ({
                  '@type': 'ListItem',
                  position: index + 1,
                  name: product.name,
                  url: `https://qognition.com/directory/${product.categorySlug}/${product.slug}`,
                })),
              },
            },
            breadcrumbSchema([
              { name: 'Home', path: '/' },
              { name: 'Directory', path: '/directory' },
              { name: categoryName, path },
            ]),
          ]),
        }}
      />
      <main className="min-h-screen pt-36 pb-20 px-4 sm:px-6">
        <Section spacing="lg">
          <Link
            href="/directory"
            className="inline-flex items-center gap-2 text-[var(--text-muted)] hover:text-[var(--text)] mb-10 text-sm transition-colors"
          >
            <ArrowLeft size={16} /> Back to Directory
          </Link>

          <div className="max-w-3xl mb-14">
            <Badge className="mb-4">{products.length} tools</Badge>
            <Heading level="h1" className="mb-4">{categoryName} Tools</Heading>
            <p className="text-body text-[var(--text-muted)]">
              {categoryData?.description || `Browse useful software profiles for ${categoryName.toLowerCase()} tools.`}
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {products.map((product) => (
              <Link
                key={product.slug}
                href={`/directory/${category}/${product.slug}`}
                className="rounded-xl border border-[var(--border)] bg-[var(--card-bg)] p-5 hover:border-[var(--accent)]/40 transition-all"
              >
                <div className="flex items-center gap-3 mb-3">
                  {product.imageUrl ? (
                    <img
                      src={product.imageUrl}
                      alt={product.name}
                      className="w-10 h-10 rounded-lg object-cover border border-[var(--border)]"
                    />
                  ) : (
                    <div className="w-10 h-10 rounded-lg bg-[var(--surface)] border border-[var(--border)] flex items-center justify-center font-bold text-lg text-[var(--accent)]">
                      {product.name.charAt(0)}
                    </div>
                  )}
                  <div>
                    <h3 className="text-h3 text-[var(--text)] font-semibold">{product.name}</h3>
                    <div className="flex items-center gap-1 text-xs text-[var(--accent)]">
                      <Star size={12} fill="currentColor" /> {product.rating}/5
                    </div>
                  </div>
                </div>
                <p className="text-meta text-[var(--text-muted)] line-clamp-2">
                  {product.shortDescription}
                </p>
              </Link>
            ))}
          </div>
        </Section>
      </main>
    </>
  );
}
