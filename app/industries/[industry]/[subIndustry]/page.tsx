import type { Metadata } from 'next';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { ArrowLeft, CheckCircle2 } from 'lucide-react';
import SchemaScript from '../../../SchemaScript';
import { CALENDLY_LINK } from '../../../../constants';
import { INDUSTRIES } from '../../../../data/industries';
import { SERVICES } from '../../../../data/services';
import { CASE_STUDIES } from '../../../../data/work';
import { breadcrumbSchema, faqSchema, getSubIndustryMetadata, SITE_NAME, SITE_URL } from '../../../../lib/seo';

export const dynamicParams = false;

export const generateStaticParams = () =>
  INDUSTRIES.flatMap((industry) =>
    industry.subIndustries.map((subIndustry) => ({
      industry: industry.id,
      subIndustry: subIndustry.slug
    }))
  );

export const generateMetadata = async ({
  params
}: {
  params: Promise<{ industry: string; subIndustry: string }>;
}): Promise<Metadata> => {
  const { industry, subIndustry } = await params;
  return getSubIndustryMetadata(industry, subIndustry);
};

export default async function Page({ params }: { params: Promise<{ industry: string; subIndustry: string }> }) {
  const { industry: industrySlug, subIndustry: subIndustrySlug } = await params;
  const industry = INDUSTRIES.find((item) => item.id === industrySlug);
  const subIndustry = industry?.subIndustries.find((item) => item.slug === subIndustrySlug);
  if (!industry || !subIndustry) notFound();

  const path = `/industries/${industry.id}/${subIndustry.slug}`;
  const displayFaqs = subIndustry.faqs ? [...subIndustry.faqs, ...industry.faqs.slice(0, 3)] : industry.faqs;

  return (
    <>
      <SchemaScript
        data={{
          '@context': 'https://schema.org',
          '@type': 'Service',
          name: `${subIndustry.name} Digital Marketing`,
          description: subIndustry.description,
          provider: { '@type': 'Organization', name: SITE_NAME, url: SITE_URL },
          serviceType: `${subIndustry.name} Marketing`,
          url: `${SITE_URL}${path}`
        }}
      />
      <SchemaScript data={faqSchema(displayFaqs)} />
      <SchemaScript
        data={breadcrumbSchema([
          { name: 'Home', path: '/' },
          { name: 'Industries', path: '/industries' },
          { name: industry.name, path: `/industries/${industry.id}` },
          { name: subIndustry.name, path }
        ])}
      />
      <main className="min-h-screen pt-32 px-6 md:px-12 max-w-7xl mx-auto pb-24">
        <Link href={`/industries/${industry.id}`} className="inline-flex items-center gap-2 text-gray-400 hover:text-white mb-12">
          <ArrowLeft size={16} /> Back to {industry.name}
        </Link>

        <article className="grid grid-cols-1 lg:grid-cols-12 gap-16">
          <div className="lg:col-span-8">
            <span className="text-teal-400 font-bold uppercase tracking-widest mb-4 block">{industry.name}</span>
            <h1 className="font-display text-5xl md:text-8xl mb-8">{subIndustry.name} Marketing</h1>
            <p className="text-xl md:text-2xl text-gray-300 leading-relaxed mb-12 border-l-2 border-teal-400 pl-6">
              {subIndustry.description}
            </p>

            <section className="mb-16 grid grid-cols-1 md:grid-cols-3 gap-4">
              {[
                `TL;DR: ${subIndustry.name} marketing needs industry proof, precise intent mapping, and conversion paths built for real buyer questions.`,
                `This page links upward to ${industry.name}, sideways to services and proof, and downward to FAQs for AI and search clarity.`,
                'Qognition builds these pages as useful service-area and vertical assets, not keyword-stuffed templates.'
              ].map((item) => (
                <div key={item} className="rounded-xl border border-teal-400/20 bg-teal-400/5 p-5 text-sm leading-relaxed text-gray-300">
                  {item}
                </div>
              ))}
            </section>

            <section className="mb-16">
              <h2 className="font-display text-3xl mb-8">What Buyers Need to See</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {subIndustry.features.map((feature) => (
                  <div key={feature} className="rounded-xl border border-white/10 bg-white/[0.03] p-5">
                    <CheckCircle2 className="text-teal-400 mb-4" size={20} />
                    <h3 className="font-display text-xl mb-3">{feature}</h3>
                    <p className="text-sm text-gray-400 leading-relaxed">
                      We translate this requirement into search pages, ad messaging, creative proof, analytics events, and lead-routing logic.
                    </p>
                  </div>
                ))}
              </div>
            </section>

            {subIndustry.benefits && (
              <section className="mb-16">
                <h2 className="font-display text-3xl mb-8">Business Outcomes</h2>
                <div className="space-y-4">
                  {subIndustry.benefits.map((benefit) => (
                    <div key={benefit} className="rounded-xl border border-teal-400/20 bg-teal-400/5 p-5 text-gray-300">
                      {benefit}
                    </div>
                  ))}
                </div>
              </section>
            )}

            <section className="mb-16">
              <h2 className="font-display text-3xl mb-8">Recommended Services</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {SERVICES.slice(0, 6).map((service) => (
                  <Link key={service.id} href={`/services/${service.id}`} className="rounded-xl border border-white/10 bg-white/[0.03] p-5 hover:border-teal-400/50 transition-colors">
                    <h3 className="font-display text-2xl mb-3">{service.title.replace('Web Development', 'Web Design')}</h3>
                    <p className="text-sm text-gray-400 leading-relaxed">{service.shortDescription}</p>
                  </Link>
                ))}
              </div>
            </section>

            <section>
              <h2 className="font-display text-3xl mb-8">Common Questions</h2>
              <div className="space-y-4">
                {displayFaqs.map((faq) => (
                  <div key={faq.question} className="rounded-xl border border-white/10 bg-white/[0.03] p-5">
                    <h3 className="font-display text-xl mb-3">{faq.question}</h3>
                    <p className="text-gray-400 leading-relaxed">{faq.answer}</p>
                  </div>
                ))}
              </div>
            </section>
          </div>

          <aside className="lg:col-span-4">
            <div className="sticky top-32 rounded-2xl border border-white/10 bg-white/[0.03] p-8">
              <h2 className="font-display text-3xl mb-5">Related Proof</h2>
              {CASE_STUDIES.slice(0, 3).map((study) => (
                <Link key={study.id} href={`/work/${study.id}`} className="mb-3 block rounded-xl border border-white/10 bg-black/40 p-4 hover:border-teal-400/50">
                  <p className="text-xs uppercase tracking-widest text-teal-400 mb-2">{study.industry}</p>
                  <h3 className="font-display text-xl">{study.client}</h3>
                </Link>
              ))}
              <div className="mt-8 space-y-3">
                <Link href="/locations" className="block text-teal-400 hover:text-white">Location pages</Link>
                <Link href="/resources" className="block text-teal-400 hover:text-white">Resources</Link>
                <Link href="/directory" className="block text-teal-400 hover:text-white">Tools directory</Link>
              </div>
              <a href={CALENDLY_LINK} target="_blank" rel="noopener noreferrer" className="mt-8 block text-center rounded-full bg-teal-400 px-6 py-4 font-display text-sm uppercase tracking-wider text-black hover:bg-white">
                Book Strategy Call
              </a>
            </div>
          </aside>
        </article>
      </main>
    </>
  );
}
