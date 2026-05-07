import type { Metadata } from 'next';
import SchemaScript from '../../SchemaScript';
import ViewRenderer from '../../ViewRenderer';
import { DIRECTORY_PRODUCTS } from '../../../data/directoryProducts';
import { breadcrumbSchema, getDirectoryCategoryMetadata, SITE_URL } from '../../../lib/seo';

export const dynamicParams = true;

export const generateStaticParams = () =>
  Array.from(new Set(DIRECTORY_PRODUCTS.map((product) => product.categorySlug))).map((category) => ({ category }));

export const generateMetadata = async ({ params }: { params: Promise<{ category: string }> }): Promise<Metadata> => {
  const { category } = await params;
  return getDirectoryCategoryMetadata(category);
};

export default async function Page({ params }: { params: Promise<{ category: string }> }) {
  const { category } = await params;
  const products = DIRECTORY_PRODUCTS.filter((product) => product.categorySlug === category);
  const path = `/directory/${category}`;

  return (
    <>
      <SchemaScript
        data={{
          '@context': 'https://schema.org',
          '@type': 'CollectionPage',
          name: `${category.replace(/-/g, ' ')} Tools Directory`,
          url: `${SITE_URL}${path}`,
          mainEntity: {
            '@type': 'ItemList',
            itemListElement: products.slice(0, 100).map((product, index) => ({
              '@type': 'ListItem',
              position: index + 1,
              name: product.name,
              url: `${SITE_URL}/directory/${product.categorySlug}/${product.slug}`
            }))
          }
        }}
      />
      <SchemaScript
        data={breadcrumbSchema([
          { name: 'Home', path: '/' },
          { name: 'Directory', path: '/directory' },
          { name: category.replace(/-/g, ' '), path }
        ])}
      />
      <ViewRenderer view="directory" params={{ category }} />
    </>
  );
}
