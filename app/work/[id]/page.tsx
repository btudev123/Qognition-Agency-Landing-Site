import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import SchemaScript from '../../SchemaScript';
import ViewRenderer from '../../ViewRenderer';
import { CASE_STUDIES } from '../../../data/work';
import { breadcrumbSchema, getCaseStudyMetadata, SITE_NAME, SITE_URL } from '../../../lib/seo';

export const dynamicParams = false;

export const generateStaticParams = () => CASE_STUDIES.map((study) => ({ id: study.id }));

export const generateMetadata = async ({ params }: { params: Promise<{ id: string }> }): Promise<Metadata> => {
  const { id } = await params;
  return getCaseStudyMetadata(id);
};

export default async function Page({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const study = CASE_STUDIES.find((item) => item.id === id);
  if (!study) notFound();

  const path = `/work/${study.id}`;

  return (
    <>
      <SchemaScript
        data={{
          '@context': 'https://schema.org',
          '@type': 'Article',
          headline: study.title,
          image: study.image,
          author: { '@type': 'Organization', name: SITE_NAME, url: SITE_URL },
          publisher: { '@type': 'Organization', name: SITE_NAME, url: SITE_URL },
          url: `${SITE_URL}${path}`
        }}
      />
      <SchemaScript
        data={breadcrumbSchema([
          { name: 'Home', path: '/' },
          { name: 'Work', path: '/work' },
          { name: study.title, path }
        ])}
      />
      <ViewRenderer view="caseStudy" params={{ id: study.id }} />
    </>
  );
}
