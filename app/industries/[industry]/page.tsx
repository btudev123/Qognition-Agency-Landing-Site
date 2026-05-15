import type { Metadata } from 'next';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { ArrowLeft, ArrowRight, CheckCircle, Target } from 'lucide-react';
import SchemaScript from '../../SchemaScript';
import { CALENDLY_LINK } from '../../../constants';
import { INDUSTRIES } from '../../../data/industries';
import { SERVICES } from '../../../data/services';
import { CASE_STUDIES } from '../../../data/work';
import { breadcrumbSchema, faqSchema, getIndustryMetadata, SITE_NAME, SITE_URL } from '../../../lib/seo';

export const dynamicParams = false;

export const generateStaticParams = () => INDUSTRIES.map((industry) => ({ industry: industry.id }));

export const generateMetadata = async ({ params }: { params: Promise<{ industry: string }> }): Promise<Metadata> => {
  const { industry } = await params;
  return getIndustryMetadata(industry);
};

export default async function Page({ params }: { params: Promise<{ industry: string }> }) {
  const { industry: industrySlug } = await params;
  const industry = INDUSTRIES.find((item) => item.id === industrySlug);
  if (!industry) notFound();

  const path = `/industries/${industry.id}`;
  const relatedServices = SERVICES.filter((service) => industry.relatedServices.includes(service.id)).slice(0, 6);
  const relatedCaseStudy = CASE_STUDIES.find((study) => study.id === industry.caseStudyRef) || CASE_STUDIES[0];

  return (
    <>
      <SchemaScript
        data={{
          '@context': 'https://schema.org',
          '@type': 'Service',
          name: `${industry.name} Digital Marketing`,
          description: industry.description,
          provider: { '@type': 'Organization', name: SITE_NAME, url: SITE_URL },
          serviceType: 'Industry Digital Marketing',
          url: `${SITE_URL}${path}`
        }}
      />
      <SchemaScript data={faqSchema(industry.faqs)} />
      <SchemaScript
        data={breadcrumbSchema([
          { name: 'Home', path: '/' },
          { name: 'Industries', path: '/industries' },
          { name: industry.name, path }
        ])}
      />
      <main className="min-h-screen pt-32 px-6 md:px-12 max-w-7xl mx-auto pb-24">
        <Link href="/industries" className="inline-flex items-center gap-2 text-gray-400 hover:text-white mb-12">
          <ArrowLeft size={16} /> Back to Industries
        </Link>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 mb-24">
          <article className="lg:col-span-8">
            <h1 className="font-display text-5xl md:text-8xl mb-8">{industry.name}</h1>
            <p className="text-xl md:text-2xl text-gray-300 leading-relaxed mb-12 border-l-2 border-teal-400 pl-6">
              {industry.description}
            </p>

            <section className="mb-16 grid grid-cols-1 md:grid-cols-3 gap-4">
              {[
                `Quick summary: ${industry.name} growth depends on matching channel strategy to buyer trust, compliance, sales cycle, and proof requirements.`,
                'Qognition connects industry pages to service pages, location pages, sub-verticals, case studies, resources, and FAQs.',
                'The page is statically rendered with JSON-LD, semantic headings, and natural-language explanations for Google, Bing, and AI systems.'
              ].map((item) => (
                <div key={item} className="rounded-xl border border-teal-400/20 bg-teal-400/5 p-5 text-sm leading-relaxed text-gray-300">
                  {item}
                </div>
              ))}
            </section>

            <section className="mb-16">
              <h2 className="font-display text-3xl mb-8">Specialized Verticals</h2>
              <p className="text-gray-400 mb-6">Select a specific niche to see tailored strategies:</p>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {industry.subIndustries.map((sub) => (
                  <Link
                    key={sub.slug}
                    href={`/industries/${industry.id}/${sub.slug}`}
                    className="group p-4 bg-white/5 border border-white/10 rounded-lg hover:border-teal-400 hover:bg-white/10 transition-all flex justify-between items-center"
                  >
                    <span className="font-bold text-gray-200 group-hover:text-white">{sub.name}</span>
                    <ArrowRight size={16} className="text-teal-400" />
                  </Link>
                ))}
              </div>
            </section>

            <section className="mb-16">
              <h2 className="font-display text-3xl mb-8">Sector Pain Points</h2>
              <div className="grid gap-6">
                {industry.painPoints.map((pain) => (
                  <div key={pain} className="flex items-start gap-4 p-6 border border-red-500/20 bg-red-500/5 rounded-lg">
                    <Target className="text-red-400 mt-1 shrink-0" size={24} />
                    <div>
                      <h3 className="font-bold text-lg text-red-100">The Problem</h3>
                      <p className="text-gray-400">{pain}</p>
                    </div>
                  </div>
                ))}
              </div>
            </section>

            <section className="mb-16">
              <h2 className="font-display text-3xl mb-8">Our Solutions</h2>
              <div className="space-y-4">
                {industry.solutions.map((solution) => (
                  <div key={solution} className="flex items-center gap-3 p-4 border border-teal-500/30 bg-teal-500/5 rounded-lg">
                    <CheckCircle className="text-teal-400" size={24} />
                    <span className="text-lg text-white">{solution}</span>
                  </div>
                ))}
              </div>
            </section>

            <section className="mb-16">
              <h2 className="font-display text-3xl mb-8">Recommended Services</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {(relatedServices.length ? relatedServices : SERVICES.slice(0, 4)).map((service) => (
                  <Link key={service.id} href={`/services/${service.id}`} className="rounded-xl border border-white/10 bg-white/[0.03] p-5 hover:border-teal-400/50 transition-colors">
                    <h3 className="font-display text-2xl mb-3">{service.title.replace('Web Development', 'Web Design')}</h3>
                    <p className="text-sm text-gray-400 leading-relaxed">{service.shortDescription}</p>
                  </Link>
                ))}
              </div>
            </section>

            <section className="mb-16">
              <h2 className="font-display text-3xl mb-8">Expert Insights</h2>
              <div className="space-y-4">
                {industry.faqs.map((faq) => (
                  <div key={faq.question} className="rounded-xl border border-white/10 bg-white/[0.03] p-5">
                    <h3 className="font-display text-xl mb-3">{faq.question}</h3>
                    <p className="text-gray-400 leading-relaxed">{faq.answer}</p>
                  </div>
                ))}
              </div>
            </section>
          </article>

          <aside className="lg:col-span-4">
            <div className="sticky top-32 p-8 bg-white/5 border border-white/10 rounded-xl">
              <h2 className="font-display text-xl mb-6">Case Study Reference</h2>
              <Link href={`/case-studies/${relatedCaseStudy.id}`} className="block p-5 border border-white/20 rounded-xl hover:border-teal-400 transition-colors mb-8">
                <p className="text-xs uppercase tracking-widest text-teal-400 mb-3">{relatedCaseStudy.industry}</p>
                <h3 className="font-display text-2xl mb-3">{relatedCaseStudy.client}</h3>
                <p className="text-sm text-gray-400">{relatedCaseStudy.summary || relatedCaseStudy.title}</p>
              </Link>
              <h2 className="font-display text-xl mb-4">Internal Links</h2>
              <div className="space-y-3 mb-8">
                <Link href="/locations" className="block text-teal-400 hover:text-white">Location pages</Link>
                <Link href="/resources" className="block text-teal-400 hover:text-white">Lead magnets</Link>
                <Link href="/directory" className="block text-teal-400 hover:text-white">Tools directory</Link>
                <Link href="/free-tools" className="block text-teal-400 hover:text-white">Free calculators</Link>
              </div>
              <a href={CALENDLY_LINK} target="_blank" rel="noopener noreferrer" className="block text-center rounded-full bg-teal-400 px-6 py-4 font-display text-sm uppercase tracking-wider text-black hover:bg-white">
                Book Strategy Call
              </a>
            </div>
          </aside>
        </div>
      </main>
    </>
  );
}
