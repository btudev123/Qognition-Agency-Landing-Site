import type { Metadata } from 'next';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { ArrowLeft, ArrowRight, BarChart, CheckCircle, CheckCircle2, Layers, Quote } from 'lucide-react';
import SchemaScript from '../../SchemaScript';
import { CALENDLY_LINK } from '../../../constants';
import { SERVICE_SUB_PAGES } from '../../../data/seoExpansion';
import { INDUSTRIES } from '../../../data/industries';
import { SERVICES } from '../../../data/services';
import { breadcrumbSchema, faqSchema, getServiceMetadata, serviceSchema } from '../../../lib/seo';

export const dynamicParams = false;

export const generateStaticParams = () => SERVICES.map((service) => ({ service: service.id }));

export const generateMetadata = async ({ params }: { params: Promise<{ service: string }> }): Promise<Metadata> => {
  const { service } = await params;
  return getServiceMetadata(service);
};

const subServiceSlug = (sub: { name: string; slug?: string }) =>
  sub.slug || sub.name.toLowerCase().replace(/&/g, 'and').replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '');

export default async function Page({ params }: { params: Promise<{ service: string }> }) {
  const { service: serviceSlug } = await params;
  const service = SERVICES.find((item) => item.id === serviceSlug);
  if (!service) notFound();

  const path = `/services/${service.id}`;
  const serviceSubPages = SERVICE_SUB_PAGES.filter((page) => page.serviceId === service.id);
  const relatedIndustries = INDUSTRIES.filter((industry) =>
    service.relatedIndustries.some((name) => industry.name.toLowerCase().includes(name.toLowerCase().split(' ')[0]))
  ).slice(0, 6);

  return (
    <>
      <SchemaScript data={serviceSchema(service, path)} />
      <SchemaScript data={faqSchema(service.faqs)} />
      <SchemaScript
        data={breadcrumbSchema([
          { name: 'Home', path: '/' },
          { name: 'Services', path: '/services' },
          { name: service.title, path }
        ])}
      />
      <main className="min-h-screen pt-32 pb-24 px-6 md:px-12 max-w-7xl mx-auto">
        <Link href="/services" className="inline-flex items-center gap-2 text-gray-400 hover:text-white mb-12 transition-colors">
          <ArrowLeft size={16} /> Back to Services
        </Link>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-16">
          <article className="lg:col-span-8">
            <header className="mb-12">
              <h1 className="font-display text-5xl md:text-8xl mb-8">{service.title.replace('Web Development', 'Web Design')}</h1>
              <p className="text-xl md:text-2xl text-gray-300 leading-relaxed mb-12 border-l-2 border-teal-400 pl-6">
                {service.fullDescription}
              </p>
            </header>

            <section className="mb-16 grid grid-cols-1 md:grid-cols-3 gap-4">
              {[
                `Quick summary: ${service.title} should create qualified pipeline, not just channel activity.`,
                'Qognition connects strategy, execution, analytics, creative, and AI-search discoverability in one operating model.',
                'This page links to sub-services, industries, tools, case studies, FAQs, and strategy calls so buyers can find the right next step.'
              ].map((item) => (
                <div key={item} className="rounded-xl border border-teal-400/20 bg-teal-400/5 p-5 text-sm leading-relaxed text-gray-300">
                  {item}
                </div>
              ))}
            </section>

            {service.expertQuote && (
              <section className="my-16 p-8 md:p-10 bg-gradient-to-br from-white/5 to-transparent border border-white/10 rounded-2xl relative overflow-hidden">
                <Quote size={80} className="absolute top-4 right-4 text-teal-500/10 rotate-180" />
                <blockquote className="relative z-10">
                  <p className="font-display text-2xl md:text-3xl leading-relaxed italic mb-8">"{service.expertQuote.quote}"</p>
                  <footer className="flex items-center gap-4">
                    <div className="w-12 h-12 bg-teal-400 rounded-full flex items-center justify-center font-bold text-black">
                      {service.expertQuote.author.charAt(0)}
                    </div>
                    <div>
                      <cite className="not-italic font-bold block text-white">{service.expertQuote.author}</cite>
                      <span className="text-sm text-teal-400">{service.expertQuote.role}</span>
                    </div>
                  </footer>
                </blockquote>
              </section>
            )}

            {service.deepDive && (
              <div className="space-y-12 mb-16">
                {service.deepDive.map((section) => (
                  <section key={section.title}>
                    <h2 className="font-display text-3xl mb-4 text-white">{section.title}</h2>
                    <p className="text-gray-400 leading-relaxed text-lg whitespace-pre-wrap">{section.content}</p>
                  </section>
                ))}
              </div>
            )}

            <section className="mb-16">
              <h2 className="font-display text-3xl mb-8 flex items-center gap-2"><Layers className="text-teal-400" /> Capabilities</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                {service.subServices.map((sub) => (
                  <Link
                    key={sub.name}
                    href={`/services/${service.id}/${subServiceSlug(sub)}`}
                    className="group block p-6 bg-white/5 border border-white/10 rounded-lg hover:border-teal-400/50 transition-colors"
                  >
                    <h3 className="font-bold text-xl mb-3">{sub.name}</h3>
                    <p className="text-gray-400 text-sm">{sub.description}</p>
                    <span className="mt-5 inline-flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-teal-400 group-hover:text-white">
                      Explore sub-service <ArrowRight size={14} />
                    </span>
                  </Link>
                ))}
              </div>
            </section>

            {serviceSubPages.length > 0 && (
              <section className="mb-16 p-8 rounded-xl border border-teal-400/20 bg-teal-400/5">
                <h2 className="font-display text-3xl mb-5">AI-Readable Service Map</h2>
                <p className="text-gray-300 leading-relaxed mb-6">
                  These sub-pages explain workflows, deliverables, FAQs, and related routes for buyers, Googlebot, Bingbot, and AI answer engines.
                </p>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {serviceSubPages.slice(0, 6).map((page) => (
                    <Link key={page.slug} href={`/services/${page.serviceId}/${page.slug}`} className="rounded-lg border border-white/10 bg-black/40 p-4 text-sm text-gray-300 hover:border-teal-400/50 hover:text-white">
                      {page.title}
                    </Link>
                  ))}
                </div>
              </section>
            )}

            <section className="mb-16">
              <h2 className="font-display text-3xl mb-8">Our Process</h2>
              <div className="space-y-6">
                {service.process.map((step, index) => (
                  <div key={step.title} className="flex gap-6 items-start group">
                    <div className="w-12 h-12 rounded-full border border-teal-400/30 flex items-center justify-center bg-teal-900/10 shrink-0 text-teal-400 font-bold font-display text-lg">
                      {index + 1}
                    </div>
                    <div>
                      <h3 className="text-xl font-bold mb-2">{step.title}</h3>
                      <p className="text-gray-400 leading-relaxed">{step.description}</p>
                    </div>
                  </div>
                ))}
              </div>
            </section>

            <section className="mb-16">
              <h2 className="font-display text-3xl mb-8">Tech Stack</h2>
              <div className="flex flex-wrap gap-3">
                {service.techStack.map((tech) => (
                  <span key={tech} className="px-4 py-2 bg-white/5 border border-white/10 rounded-full text-sm">
                    {tech}
                  </span>
                ))}
              </div>
            </section>

            <section className="mb-16 p-8 bg-zinc-900/50 rounded-xl border border-white/10">
              <h2 className="font-display text-2xl mb-6">Industries Served</h2>
              <div className="flex flex-wrap gap-4">
                {(relatedIndustries.length ? relatedIndustries : INDUSTRIES.slice(0, 6)).map((industry) => (
                  <Link key={industry.id} href={`/industries/${industry.id}`} className="text-teal-400 border-b border-teal-400/30 hover:text-white transition-colors">
                    {industry.name}
                  </Link>
                ))}
              </div>
            </section>

            <section className="mb-16">
              <h2 className="font-display text-3xl mb-8">Common Questions</h2>
              <div className="space-y-4">
                {service.faqs.map((faq) => (
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
              <h2 className="font-display text-xl mb-6 flex items-center gap-2">
                <BarChart className="text-teal-400" size={20} /> Typical Results
              </h2>
              <div className="space-y-6 mb-8">
                {service.kpis.map((kpi) => (
                  <div key={kpi} className="flex items-center gap-3 text-white">
                    <CheckCircle size={20} className="text-teal-400 shrink-0" />
                    <span className="font-medium">{kpi}</span>
                  </div>
                ))}
              </div>
              <div className="border-t border-white/10 pt-5 mb-8 space-y-3">
                <Link href="/work" className="flex items-center justify-between text-sm text-gray-300 hover:text-white">
                  Case studies <CheckCircle2 size={16} className="text-teal-400" />
                </Link>
                <Link href="/locations" className="flex items-center justify-between text-sm text-gray-300 hover:text-white">
                  Location pages <CheckCircle2 size={16} className="text-teal-400" />
                </Link>
                <Link href="/resources" className="flex items-center justify-between text-sm text-gray-300 hover:text-white">
                  Lead magnets <CheckCircle2 size={16} className="text-teal-400" />
                </Link>
              </div>
              <p className="text-sm text-gray-400 mb-8 border-t border-white/10 pt-4">
                Stop guessing. Start growing. Schedule a consultation with our {service.title} leads.
              </p>
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
