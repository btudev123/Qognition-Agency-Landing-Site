import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import SchemaScript from '../../SchemaScript';
import ViewRenderer from '../../ViewRenderer';
import { BLOG_POSTS } from '../../../data/blog';
import { breadcrumbSchema, getBlogMetadata, SITE_NAME, SITE_URL } from '../../../lib/seo';

export const dynamicParams = false;

export const generateStaticParams = () => BLOG_POSTS.map((post) => ({ slug: post.id }));

export const generateMetadata = async ({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> => {
  const { slug } = await params;
  return getBlogMetadata(slug);
};

export default async function Page({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const post = BLOG_POSTS.find((item) => item.id === slug);
  if (!post) notFound();

  const path = `/blog/${post.id}`;

  return (
    <>
      <SchemaScript
        data={{
          '@context': 'https://schema.org',
          '@type': 'Article',
          headline: post.title,
          description: post.excerpt,
          image: post.image,
          author: { '@type': 'Person', name: post.author.name },
          publisher: { '@type': 'Organization', name: SITE_NAME, url: SITE_URL },
          url: `${SITE_URL}${path}`
        }}
      />
      <SchemaScript
        data={breadcrumbSchema([
          { name: 'Home', path: '/' },
          { name: 'Blog', path: '/blog' },
          { name: post.title, path }
        ])}
      />
      <ViewRenderer view="blogPost" params={{ slug: post.id }} />
    </>
  );
}
