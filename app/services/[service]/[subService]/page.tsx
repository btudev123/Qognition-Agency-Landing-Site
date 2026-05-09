import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import SchemaScript from '../../../SchemaScript';
import { SERVICE_SUB_PAGES, getServiceSubPage } from '../../../../data/seoExpansion';
import { SERVICES } from '../../../../data/services';
import { breadcrumbSchema, faqSchema, metadataFor, serviceSchema } from '../../../../lib/seo';
import { ArrowRight, CheckCircle2 } from 'lucide-react';
import Link from 'next/link';

export const dynamicParams = false;

export const generateStaticParams = () =>
  SERVICE_SUB_PAGES.map((page) => ({
    service: page.serviceId,
    subService: page.slug
  }));

export const generateMetadata = async ({
  params
}: {
  params: Promise<{ service: string; subService: string }>;
}): Promise<Metadata> => {
  const { service, subService } = await params;
  const page = getServiceSubPage(service, subService);
  if (!page) {
    return metadataFor({
      title: 'Service Page Not Found',
      description: 'Service page not found.',
      path: `/services/${service}/${subService}`,
      noIndex: true
    });
  }
  return metadataFor({
    title: page.title,
    description: page.description,
    path: `/services/${page.serviceId}/${page.slug}`
  });
};

export default async function Page({ params }: { params: Promise<{ service: string; subService: string }> }) {
  const { service, subService } = await params;
  const page = getServiceSubPage(service, subService);
  const parent = SERVICES.find((item) => item.id === service);
  if (!page || !parent) notFound();

  const path = `/services/${page.serviceId}/${page.slug}`;

  return (
    <>
      <SchemaScript data={serviceSchema(parent, path, { name: page.title, description: page.description, serviceType: page.title })} />
      <SchemaScript data={faqSchema(page.faqs)} />
      <SchemaScript
        data={breadcrumbSchema([
          { name: 'Home', path: '/' },
          { name: 'Services', path: '/services' },
          { name: parent.title, path: `/services/${parent.id}` },
          { name: page.title, path }
        ])}
      />
      <main className="min-h-screen pt-32 px-6 md:px-12 pb-28">
        <section className="max-w-7xl mx-auto">
          <Link href={`/services/${parent.id}`} className="text-sm uppercase tracking-widest text-teal-400 hover:text-white">
            {parent.title}
          </Link>
          <h1 className="font-display text-5xl md:text-8xl leading-none mt-6 mb-8">{page.h1}</h1>
          <p className="text-xl md:text-2xl text-gray-300 max-w-4xl leading-relaxed">{page.intro}</p>
        </section>

        <section className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-10 mt-20">
          <div className="lg:col-span-4">
            <div className="sticky top-32 rounded-2xl border border-white/10 bg-white/[0.04] p-6">
              <h2 className="font-display text-2xl mb-6">Deliverables</h2>
              <div className="space-y-4">
                {page.deliverables.map((item) => (
                  <div key={item} className="flex gap-3 text-gray-300">
                    <CheckCircle2 className="text-teal-400 shrink-0 mt-0.5" size={18} />
                    <span>{item}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
          <div className="lg:col-span-8 space-y-12">
            {page.sections.map((section) => (
              <section key={section.title} className="border-b border-white/10 pb-10 last:border-0">
                <h2 className="font-display text-3xl md:text-4xl mb-5">{section.title}</h2>
                <p className="text-lg text-gray-300 leading-relaxed">{section.content}</p>
              </section>
            ))}
          </div>
        </section>

        <section className="max-w-7xl mx-auto mt-20 grid grid-cols-1 lg:grid-cols-2 gap-8">
          <div>
            <h2 className="font-display text-4xl mb-8">Common Questions</h2>
            <div className="space-y-4">
              {page.faqs.map((faq) => (
                <div key={faq.question} className="rounded-xl border border-white/10 bg-white/[0.03] p-5">
                  <h3 className="font-display text-xl mb-3">{faq.question}</h3>
                  <p className="text-gray-400 leading-relaxed">{faq.answer}</p>
                </div>
              ))}
            </div>
          </div>
          <div className="rounded-2xl border border-teal-400/20 bg-teal-400/5 p-8">
            <h2 className="font-display text-4xl mb-6">Related Growth Paths</h2>
            <div className="space-y-3">
              {page.relatedLinks.map((link) => (
                <Link key={link.href} href={link.href} className="flex items-center justify-between rounded-lg border border-white/10 bg-black/40 p-4 hover:border-teal-400/50">
                  <span>{link.label}</span>
                  <ArrowRight size={18} className="text-teal-400" />
                </Link>
              ))}
            </div>
          </div>
        </section>
      </main>
    </>
  );
}
