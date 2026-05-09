import Link from 'next/link';
import SchemaScript from '../SchemaScript';
import { RESOURCES } from '../../data/seoExpansion';
import { breadcrumbSchema, metadataFor, SITE_URL } from '../../lib/seo';

export const dynamic = 'force-static';

export const metadata = metadataFor({
  title: 'Resources and Lead Magnets | Qognition Agency',
  description: 'Download SEO, AI search, Next.js technical SEO, and growth strategy resources from Qognition Agency.',
  path: '/resources'
});

export default function Page() {
  return (
    <>
      <SchemaScript
        data={{
          '@context': 'https://schema.org',
          '@type': 'CollectionPage',
          name: 'Qognition Resources',
          url: `${SITE_URL}/resources`,
          mainEntity: {
            '@type': 'ItemList',
            itemListElement: RESOURCES.map((resource, index) => ({
              '@type': 'ListItem',
              position: index + 1,
              name: resource.title,
              url: `${SITE_URL}/resources/${resource.slug}`
            }))
          }
        }}
      />
      <SchemaScript data={breadcrumbSchema([{ name: 'Home', path: '/' }, { name: 'Resources', path: '/resources' }])} />
      <main className="min-h-screen pt-32 px-6 md:px-12 pb-28">
        <section className="max-w-7xl mx-auto">
          <span className="text-teal-400 font-mono text-sm uppercase tracking-widest">Resources</span>
          <h1 className="font-display text-5xl md:text-8xl leading-none mt-6 mb-8">SEO and AI Growth Resources</h1>
          <p className="text-xl text-gray-300 max-w-3xl leading-relaxed">
            Practical guides, checklists, and planning assets for teams improving search visibility, AI discoverability, technical SEO, and qualified lead capture.
          </p>
        </section>
        <section className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-6 mt-16">
          {RESOURCES.map((resource) => (
            <Link key={resource.slug} href={`/resources/${resource.slug}`} className="group rounded-2xl border border-white/10 bg-white/[0.03] p-6 hover:border-teal-400/50">
              <div className="text-xs uppercase tracking-widest text-teal-400 mb-5">{resource.format}</div>
              <h2 className="font-display text-3xl mb-4 group-hover:text-teal-300">{resource.title}</h2>
              <p className="text-gray-400 leading-relaxed mb-6">{resource.description}</p>
              <div className="text-sm text-gray-500">{resource.readingTime} read</div>
            </Link>
          ))}
        </section>
      </main>
    </>
  );
}
