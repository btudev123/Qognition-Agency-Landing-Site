import type { Metadata } from 'next';
import SchemaScript from '../../../SchemaScript';
import ViewRenderer from '../../../ViewRenderer';
import { DIRECTORY_PRODUCTS } from '../../../../data/directoryProducts';
import { breadcrumbSchema, directoryProductSchema, getDirectoryProductMetadata } from '../../../../lib/seo';

export const dynamicParams = true;

export const generateStaticParams = () =>
  DIRECTORY_PRODUCTS.map((product) => ({
    category: product.categorySlug,
    toolId: product.slug
  }));

export const generateMetadata = async ({
  params
}: {
  params: Promise<{ category: string; toolId: string }>;
}): Promise<Metadata> => {
  const { category, toolId } = await params;
  return getDirectoryProductMetadata(category, toolId);
};

export default async function Page({ params }: { params: Promise<{ category: string; toolId: string }> }) {
  const { category, toolId } = await params;
  const product = DIRECTORY_PRODUCTS.find((item) => item.categorySlug === category && item.slug === toolId);
  if (!product) return <ViewRenderer view="directoryTool" params={{ category, toolId }} />;

  const path = `/directory/${category}/${product.slug}`;

  return (
    <>
      <SchemaScript data={directoryProductSchema(product, path)} />
      <SchemaScript
        data={breadcrumbSchema([
          { name: 'Home', path: '/' },
          { name: 'Directory', path: '/directory' },
          { name: product.category, path: `/directory/${category}` },
          { name: product.name, path }
        ])}
      />
      <ViewRenderer view="directoryTool" params={{ category, toolId: product.slug }} />
    </>
  );
}
