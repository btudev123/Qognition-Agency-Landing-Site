import type { Metadata } from 'next';
import Link from 'next/link';
import { ArrowRight } from 'lucide-react';
import SchemaScript from '../SchemaScript';
import { CALENDLY_LINK } from '../../constants';
import { INDUSTRIES } from '../../data/industries';
import { SERVICES } from '../../data/services';
import { breadcrumbSchema, getCoreMetadata, SITE_NAME, SITE_URL } from '../../lib/seo';

export const metadata: Metadata = getCoreMetadata('/industries');

export default function Page() {
  return (
    <>
      <SchemaScript
        data={{
          '@context': 'https://schema.org',
          '@type': 'CollectionPage',
          name: 'Industries Qognition Serves',
          description: 'Industry-specific AI growth marketing pages for SEO, PPC, web design, AI visibility, social, branding, and creative.',
          publisher: { '@type': 'Organization', name: SITE_NAME, url: SITE_URL },
          url: `${SITE_URL}/industries`
        }}
      />
      <SchemaScript data={breadcrumbSchema([{ name: 'Home', path: '/' }, { name: 'Industries', path: '/industries' }])} />
      <main className="pt-32 px-6 md:px-12 max-w-7xl mx-auto pb-32">
        <header className="mb-20 text-center">
          <span className="text-teal-400 font-bold uppercase tracking-widest mb-4 block">Industry Growth Systems</span>
          <h1 className="font-display text-6xl md:text-8xl mb-8">Industries</h1>
          <p className="text-xl md:text-2xl text-gray-400 max-w-3xl mx-auto">
            AI growth marketing by buyer journey, compliance pressure, local demand, sales cycle, and proof requirements.
          </p>
        </header>

        <section className="mb-16 grid grid-cols-1 md:grid-cols-3 gap-4">
          {[
            'Quick summary: each industry page maps pain points, verticals, services, case studies, FAQs, and internal links into one useful decision cluster.',
            'We focus on qualified demand, not vanity traffic, so the content speaks to founders, CMOs, operators, and revenue teams.',
            'Industry pages connect to services, sub-services, locations, tools, resources, and case studies for Google, Bing, and AI discovery.'
          ].map((item) => (
            <div key={item} className="rounded-xl border border-teal-400/20 bg-teal-400/5 p-5 text-sm leading-relaxed text-gray-300">
              {item}
            </div>
          ))}
        </section>

        <section className="mb-16 rounded-2xl border border-white/10 bg-white/[0.03] p-8">
          <h2 className="font-display text-4xl mb-5">Core Services Across Industries</h2>
          <div className="flex flex-wrap gap-3">
            {SERVICES.map((service) => (
              <Link key={service.id} href={`/services/${service.id}`} className="rounded-full border border-white/10 bg-black/40 px-4 py-2 text-sm text-gray-300 hover:border-teal-400 hover:text-white">
                {service.title.replace('Web Development', 'Web Design')}
              </Link>
            ))}
          </div>
        </section>

        <section className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {INDUSTRIES.map((industry) => (
            <article key={industry.id} className="p-8 md:p-10 border border-white/10 rounded-2xl bg-gradient-to-br from-white/5 to-transparent hover:border-teal-400/30 transition-colors">
              <h2 className="font-display text-3xl mb-5">
                <Link href={`/industries/${industry.id}`}>{industry.name}</Link>
              </h2>
              <p className="text-gray-400 mb-8 text-lg leading-relaxed">{industry.description}</p>
              <div className="mb-8">
                <h3 className="text-xs font-bold uppercase tracking-widest text-teal-400 mb-4">Specialist Verticals</h3>
                <div className="flex flex-wrap gap-3">
                  {industry.subIndustries.slice(0, 6).map((sub) => (
                    <Link key={sub.slug} href={`/industries/${industry.id}/${sub.slug}`} className="px-3 py-1 bg-black/40 border border-white/10 rounded-full text-sm text-gray-300 hover:text-teal-400 hover:border-teal-400 transition-colors">
                      {sub.name}
                    </Link>
                  ))}
                </div>
              </div>
              <div className="mb-8 grid grid-cols-1 sm:grid-cols-2 gap-3">
                {industry.painPoints.slice(0, 2).map((pain) => (
                  <div key={pain} className="rounded-lg border border-red-400/20 bg-red-400/5 p-4 text-sm text-gray-300">
                    {pain}
                  </div>
                ))}
              </div>
              <Link href={`/industries/${industry.id}`} className="inline-flex items-center gap-2 text-white border-b border-teal-400 pb-1 hover:gap-4 transition-all">
                View sector strategy <ArrowRight size={16} />
              </Link>
            </article>
          ))}
        </section>

        <section className="mt-20 text-center">
          <h2 className="font-display text-4xl mb-5">Need a market-specific plan?</h2>
          <p className="text-gray-400 mb-8 max-w-2xl mx-auto">
            Bring your industry, location, offer, sales cycle, and current traffic. We will map the fastest route to qualified demand.
          </p>
          <a href={CALENDLY_LINK} target="_blank" rel="noopener noreferrer" className="inline-flex rounded-full bg-teal-400 px-8 py-4 font-display text-sm uppercase tracking-wider text-black hover:bg-white">
            Book Strategy Call
          </a>
        </section>
      </main>
    </>
  );
}
