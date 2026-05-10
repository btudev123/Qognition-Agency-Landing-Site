import type { Metadata } from 'next';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import SchemaScript from '../../SchemaScript';
import HubSpotLeadForm from '../../../components/HubSpotLeadForm';
import { FREE_TOOLS, RESOURCES } from '../../../data/seoExpansion';
import { SERVICES } from '../../../data/services';
import { breadcrumbSchema, metadataFor, SITE_NAME, SITE_URL } from '../../../lib/seo';

export const dynamicParams = false;

export const generateStaticParams = () => RESOURCES.map((resource) => ({ slug: resource.slug }));

export const generateMetadata = async ({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> => {
  const { slug } = await params;
  const resource = RESOURCES.find((item) => item.slug === slug);
  if (!resource) {
    return metadataFor({ title: 'Resource Not Found', description: 'Resource not found.', path: `/resources/${slug}`, noIndex: true });
  }
  return metadataFor({ title: resource.title, description: resource.description, path: `/resources/${resource.slug}` });
};

export default async function Page({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const resource = RESOURCES.find((item) => item.slug === slug);
  if (!resource) notFound();

  const path = `/resources/${resource.slug}`;

  return (
    <>
      <SchemaScript
        data={{
          '@context': 'https://schema.org',
          '@type': 'CreativeWork',
          name: resource.title,
          description: resource.description,
          publisher: { '@type': 'Organization', name: SITE_NAME, url: SITE_URL },
          url: `${SITE_URL}${path}`,
          isAccessibleForFree: true
        }}
      />
      <SchemaScript
        data={breadcrumbSchema([
          { name: 'Home', path: '/' },
          { name: 'Resources', path: '/resources' },
          { name: resource.title, path }
        ])}
      />
      <main className="min-h-screen pt-32 px-6 md:px-12 pb-28">
        <section className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-12">
          <div className="lg:col-span-8">
            <div className="text-xs uppercase tracking-widest text-teal-400 mb-6">{resource.format} | {resource.readingTime}</div>
            <h1 className="font-display text-5xl md:text-8xl leading-none mb-8">{resource.title}</h1>
            <p className="text-xl md:text-2xl text-gray-300 leading-relaxed mb-10">{resource.description}</p>
            <div className="mb-10 grid grid-cols-1 md:grid-cols-3 gap-4">
              {[
                'TL;DR: this resource is designed to help a buyer make a clearer marketing decision before a sales call.',
                'Use it with your analytics, CRM, search console, ad account, and sales feedback for the strongest result.',
                'The page links into services, tools, and related resources so humans and AI crawlers can follow the topic cluster.'
              ].map((item) => (
                <div key={item} className="rounded-xl border border-teal-400/20 bg-teal-400/5 p-5 text-sm leading-relaxed text-gray-300">
                  {item}
                </div>
              ))}
            </div>
            <div className="flex flex-wrap gap-3 mb-14">
              {resource.highlights.map((item) => (
                <span key={item} className="rounded-full border border-white/10 bg-white/[0.03] px-4 py-2 text-sm text-gray-300">
                  {item}
                </span>
              ))}
            </div>
            <div className="space-y-12">
              {resource.sections.map((section) => (
                <section key={section.title}>
                  <h2 className="font-display text-3xl md:text-4xl mb-5">{section.title}</h2>
                  <p className="text-lg text-gray-300 leading-relaxed">{section.content}</p>
                </section>
              ))}
            </div>
            <section className="mt-14 rounded-2xl border border-white/10 bg-white/[0.03] p-8">
              <h2 className="font-display text-3xl md:text-4xl mb-5">Next Pages to Read</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                {[
                  ...SERVICES.slice(0, 3).map((service) => ({ label: service.title, href: `/services/${service.id}` })),
                  ...FREE_TOOLS.slice(0, 2).map((tool) => ({ label: tool.title, href: `/free-tools/${tool.slug}` })),
                  ...RESOURCES.filter((item) => item.slug !== resource.slug).slice(0, 2).map((item) => ({ label: item.title, href: `/resources/${item.slug}` })),
                  { label: 'Growth Stack Directory', href: '/directory' }
                ].map((item) => (
                  <Link key={item.href} href={item.href} className="rounded-lg border border-white/10 bg-black/40 p-4 text-sm text-gray-300 hover:border-teal-400/50 hover:text-white">
                    {item.label}
                  </Link>
                ))}
              </div>
            </section>
          </div>
          <aside className="lg:col-span-4">
            <div className="sticky top-32">
              <h2 className="font-display text-3xl mb-4">Download Access</h2>
              <p className="text-gray-400 mb-6">Submit your details and we will send the resource and related strategy notes to your email.</p>
              <HubSpotLeadForm source="Resource Download" resource={resource.slug} buttonLabel="Send Me the Resource" />
            </div>
          </aside>
        </section>
      </main>
    </>
  );
}
