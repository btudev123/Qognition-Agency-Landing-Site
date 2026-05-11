import type { Metadata } from 'next';
import type { ElementType } from 'react';
import Link from 'next/link';
import { ArrowRight, Brain, Code, Globe, Palette, Search, Zap } from 'lucide-react';
import SchemaScript from '../SchemaScript';
import { CALENDLY_LINK, CONTACT_MAILTO } from '../../constants';
import { SERVICE_SUB_PAGES } from '../../data/seoExpansion';
import { SERVICES } from '../../data/services';
import { breadcrumbSchema, getCoreMetadata, SITE_NAME, SITE_URL } from '../../lib/seo';

export const metadata: Metadata = getCoreMetadata('/services');

const IconMap: Record<string, ElementType> = {
  Search,
  Globe,
  Brain,
  Code,
  Zap,
  Palette
};

const subServiceSlug = (sub: { name: string; slug?: string }) =>
  sub.slug || sub.name.toLowerCase().replace(/&/g, 'and').replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '');

export default function Page() {
  return (
    <>
      <SchemaScript
        data={{
          '@context': 'https://schema.org',
          '@type': 'Organization',
          name: SITE_NAME,
          url: SITE_URL,
          knowsAbout: SERVICES.flatMap((service) => [service.title, ...service.subServices.map((sub) => sub.name)])
        }}
      />
      <SchemaScript data={breadcrumbSchema([{ name: 'Home', path: '/' }, { name: 'Services', path: '/services' }])} />
      <main className="pt-32 px-6 md:px-12 max-w-7xl mx-auto pb-32">
        <header className="mb-20 text-center">
          <div className="inline-block mb-6 px-4 py-2 rounded-full border border-teal-500/20 bg-teal-500/5 text-teal-400 text-sm font-mono">
            // AI.GROWTH.MARKETING.PARTNER
          </div>
          <h1 className="font-display text-6xl md:text-8xl mb-8">AI Growth Marketing Services</h1>
          <p className="text-xl md:text-2xl text-gray-400 max-w-3xl mx-auto">
            Qognition helps companies get qualified leads through SEO, SMM, AI SEO, web design, PPC, branding, and creative systems that connect to measurable pipeline.
          </p>
        </header>

        <section className="mb-16 grid grid-cols-1 md:grid-cols-3 gap-4">
          {[
            'Quick summary: we combine search, paid media, creative, web performance, and AI visibility into one growth operating system.',
            'Each service hub below links to six focused sub-services with useful copy, FAQs, schema, and internal links.',
            'Book a strategy call when you want the shortest path from visibility to qualified opportunities.'
          ].map((item) => (
            <div key={item} className="rounded-xl border border-teal-400/20 bg-teal-400/5 p-5 text-sm leading-relaxed text-gray-300">
              {item}
            </div>
          ))}
        </section>

        <section className="mb-20 max-w-4xl mx-auto text-center">
          <p className="text-lg text-gray-300 leading-relaxed mb-8">
            Your buyers do not move through one channel. They search Google, compare agencies, read case studies, ask AI tools for options, check LinkedIn, and judge your website before they speak to sales. Qognition builds the connected system around that journey.
          </p>
          <p className="text-lg text-gray-300 leading-relaxed">
            Use this page as the map: each service connects to sub-service pages, location pages, industry pages, case studies, resources, tools, and directory content so buyers can compare options and choose the right next step. <a href={CONTACT_MAILTO} className="text-teal-400 hover:underline">Email hello@qognitionagency.com</a> or <a href={CALENDLY_LINK} target="_blank" rel="noopener noreferrer" className="text-teal-400 hover:underline">book a strategy call</a>.
          </p>
        </section>

        <section className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {SERVICES.map((service) => {
            const IconComponent = IconMap[service.icon] || Search;
            const relatedSubPages = SERVICE_SUB_PAGES.filter((page) => page.serviceId === service.id).slice(0, 6);

            return (
              <article key={service.id} className="group h-full p-8 border border-white/10 rounded-xl bg-white/5 relative overflow-hidden transition-colors duration-500 hover:border-teal-400/40">
                <div className="absolute -top-10 -right-10 w-64 h-64 bg-teal-400/0 blur-[80px] rounded-full pointer-events-none transition-opacity group-hover:bg-teal-400/15" />
                <div className="mb-8 flex justify-between items-start relative z-10">
                  <div className="w-16 h-16 rounded-2xl bg-black border border-white/10 flex items-center justify-center text-teal-400 group-hover:bg-teal-500 group-hover:text-white group-hover:border-teal-400 transition-colors duration-300 shadow-xl">
                    <IconComponent size={32} />
                  </div>
                  <ArrowRight size={18} className="text-teal-400" />
                </div>
                <h2 className="font-display text-3xl mb-4 group-hover:text-teal-400 transition-colors">
                  <Link href={`/services/${service.id}`}>{service.title.replace('Web Development', 'Web Design')}</Link>
                </h2>
                <p className="text-gray-400 text-base leading-relaxed mb-8 group-hover:text-gray-300 transition-colors">
                  {service.shortDescription}
                </p>
                <div className="flex flex-wrap gap-2">
                  {service.subServices.slice(0, 6).map((sub) => (
                    <Link
                      key={sub.name}
                      href={`/services/${service.id}/${subServiceSlug(sub)}`}
                      className="text-xs px-2 py-1 bg-black/50 border border-white/10 rounded text-gray-400 hover:border-teal-400/60 hover:text-teal-200 transition-colors"
                    >
                      {sub.name}
                    </Link>
                  ))}
                </div>
                {relatedSubPages.length > 0 && (
                  <div className="sr-only">
                    {relatedSubPages.map((page) => (
                      <Link key={page.slug} href={`/services/${page.serviceId}/${page.slug}`}>{page.title}</Link>
                    ))}
                  </div>
                )}
                <Link href={`/services/${service.id}`} className="mt-8 inline-flex items-center gap-2 text-sm font-bold uppercase tracking-widest text-teal-400 hover:text-white">
                  View service <ArrowRight size={14} />
                </Link>
              </article>
            );
          })}
        </section>

        <section className="mt-24 grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="p-8 border border-white/10 rounded-xl bg-white/5">
            <h2 className="font-display text-3xl mb-4 text-teal-400">AI Growth Partner</h2>
            <p className="text-gray-400 mb-4">
              Strategy, engineering, SEO, content, creative, and paid media leadership work from one growth model, so every page and campaign has a clear job.
            </p>
            <Link href="/team" className="text-teal-400 hover:underline">Meet the team</Link>
          </div>
          <div className="p-8 border border-white/10 rounded-xl bg-white/5">
            <h2 className="font-display text-3xl mb-4 text-teal-400">Proof and Planning</h2>
            <p className="text-gray-400 mb-4">
              Use our case studies, lead magnets, free tools, and location pages to see how the system fits your market before a call.
            </p>
            <Link href="/work" className="text-teal-400 hover:underline">View case studies</Link>
          </div>
        </section>

        <section className="mt-20 text-center">
          <p className="text-xl text-gray-300 mb-8">Ready to turn visibility into pipeline?</p>
          <div className="flex flex-col md:flex-row gap-4 justify-center">
            <a href={CALENDLY_LINK} target="_blank" rel="noopener noreferrer" className="px-8 py-4 bg-teal-400 text-black font-bold rounded-full hover:bg-teal-300 transition-colors">
              Book Strategy Call
            </a>
            <Link href="/lead-generation-roadmap" className="px-8 py-4 border border-white/30 text-white font-bold rounded-full hover:bg-white/10 transition-colors">
              Lead Generation Roadmap
            </Link>
          </div>
        </section>
      </main>
    </>
  );
}
