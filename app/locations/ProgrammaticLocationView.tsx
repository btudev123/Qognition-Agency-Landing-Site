import Link from 'next/link';
import { ArrowRight, CheckCircle, Globe, MapPin, Search, TrendingUp } from 'lucide-react';
import { CALENDLY_LINK } from '../../data/siteConfig';
import { INDUSTRIES } from '../../data/industries';
import { SERVICES } from '../../data/services';
import { FREE_TOOLS, RESOURCES } from '../../data/seoExpansion';
import { CASE_STUDIES } from '../../data/work';
import { Location, Service } from '../../types';

export const LocationsIndexView = ({ locations }: { locations: Location[] }) => (
  <div className="pt-32 px-6 md:px-12 max-w-7xl mx-auto pb-32">
    <header className="mb-20 text-center">
      <span className="text-teal-400 font-bold uppercase tracking-widest mb-4 block">Service Areas</span>
      <h1 className="font-display text-5xl md:text-8xl mb-8">Locations</h1>
      <p className="text-xl md:text-2xl text-gray-400 max-w-3xl mx-auto">
        Revenue-market pages for brands that need local search visibility, paid media efficiency, and conversion-focused web experiences.
      </p>
    </header>

    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {locations.map((location) => (
        <Link
          key={location.slug}
          href={`/locations/${location.slug}`}
          className="group p-8 border border-white/10 rounded-2xl bg-gradient-to-br from-white/5 to-transparent hover:border-teal-400/50 transition-all"
        >
          <div className="flex justify-between items-start mb-8">
            <MapPin className="text-teal-400" />
            <span className="text-xs text-gray-500 uppercase tracking-widest">{location.type}</span>
          </div>
          <h2 className="font-display text-3xl mb-4 group-hover:text-teal-400 transition-colors">{location.name}</h2>
          <p className="text-gray-400 mb-6 line-clamp-3">{location.intro}</p>
          <div className="flex flex-wrap gap-2 mb-8">
            {location.marketFocus.slice(0, 3).map((focus) => (
              <span key={focus} className="text-xs px-2 py-1 bg-black/50 border border-white/10 rounded text-gray-400">
                {focus}
              </span>
            ))}
          </div>
          <span className="inline-flex items-center gap-2 text-teal-400 text-sm uppercase tracking-widest">
            View location <ArrowRight size={14} />
          </span>
        </Link>
      ))}
    </div>
  </div>
);

const ServicePills = ({ location }: { location: Location }) => (
  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
    {SERVICES.map((service) => (
      <Link
        key={service.id}
        href={`/locations/${location.slug}/${service.id}`}
        className="group p-5 bg-white/5 border border-white/10 rounded-xl hover:border-teal-400/50 transition-colors"
      >
        <h3 className="font-display text-xl mb-2 group-hover:text-teal-400">{service.title}</h3>
        <p className="text-sm text-gray-400">{service.shortDescription}</p>
      </Link>
    ))}
  </div>
);

export const LocationOverviewView = ({ location }: { location: Location }) => (
  <div className="pt-32 px-6 md:px-12 max-w-7xl mx-auto pb-32">
    <Link href="/locations" className="inline-flex items-center gap-2 text-gray-400 hover:text-white mb-12">
      <ArrowRight size={16} className="rotate-180" /> Back to Locations
    </Link>

    <header className="mb-20 max-w-5xl">
      <span className="text-teal-400 font-bold uppercase tracking-widest mb-4 block">{location.region}</span>
      <h1 className="font-display text-5xl md:text-8xl mb-8">Digital Marketing Agency in {location.name}</h1>
      <p className="text-xl md:text-2xl text-gray-300 leading-relaxed border-l-2 border-teal-400 pl-6">
        {location.intro}
      </p>
    </header>

    <section className="mb-16 grid grid-cols-1 md:grid-cols-3 gap-4">
      {[
        `Quick summary: Qognition helps companies grow in ${location.name} with SEO, paid media, AI search visibility, web design, and conversion tracking.`,
        `The strategy is built around how buyers in ${location.name} compare providers, check proof, and decide who to contact.`,
        `Use this page to choose priority services, review relevant industries and case studies, and plan a measurable path to qualified enquiries.`
      ].map((item) => (
        <div key={item} className="rounded-xl border border-teal-400/20 bg-teal-400/5 p-5 text-sm leading-relaxed text-gray-300">
          {item}
        </div>
      ))}
    </section>

    <div className="grid grid-cols-1 lg:grid-cols-12 gap-16">
      <main className="lg:col-span-8 space-y-16">
        <section>
          <h2 className="font-display text-4xl mb-6">Local Growth Strategy</h2>
          <p className="text-gray-300 text-lg leading-relaxed mb-8">
            We build search, ads, content, and conversion systems around how buyers in {location.name} evaluate vendors. Each page is
            built around clear offers, fast load times, local proof, and measurable conversion paths without implying an office that does not exist.
          </p>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {['Local SEO architecture', 'Paid media testing', 'Conversion tracking'].map((item) => (
              <div key={item} className="p-5 bg-teal-900/10 border border-teal-500/20 rounded-xl">
                <CheckCircle className="text-teal-400 mb-3" />
                <h3 className="font-bold">{item}</h3>
              </div>
            ))}
          </div>
        </section>

        <section>
          <h2 className="font-display text-4xl mb-6">{location.name} Market Demand</h2>
          <div className="space-y-5 text-lg text-gray-300 leading-relaxed">
            <p>
              Buyers in {location.name} compare vendors across search results, social proof, review signals, paid landing pages, case studies,
              and AI-generated summaries before they ever submit a form. The goal is not just more traffic; it is qualified demand from the
              segments that match your margins and sales capacity.
            </p>
            <p>
              Qognition builds the page architecture, campaign tracking, and internal links that help a {location.name}-focused strategy become
              discoverable and useful. We connect service pages, industry pages, local proof, lead magnets, and tools so a founder, CMO, or procurement team can
              move from research to booked call without hunting through the site.
            </p>
          </div>
        </section>

        <section>
          <h2 className="font-display text-4xl mb-6">Services in {location.name}</h2>
          <ServicePills location={location} />
        </section>

        <section>
          <h2 className="font-display text-4xl mb-6">Industries We Prioritize</h2>
          <div className="flex flex-wrap gap-3">
            {INDUSTRIES.slice(0, 8).map((industry) => (
              <Link
                key={industry.id}
                href={`/industries/${industry.id}`}
                className="px-4 py-2 bg-white/5 border border-white/10 rounded-full hover:border-teal-400 hover:text-teal-400 transition-colors"
              >
                {industry.name}
              </Link>
            ))}
          </div>
        </section>

        <section>
          <h2 className="font-display text-4xl mb-6">Relevant Case Studies</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {CASE_STUDIES.slice(0, 4).map((study) => (
              <Link key={study.id} href={`/work/${study.id}`} className="rounded-xl border border-white/10 bg-white/[0.03] p-5 hover:border-teal-400/50 transition-colors">
                <p className="text-xs uppercase tracking-widest text-teal-400 mb-3">{study.industry}</p>
                <h3 className="font-display text-2xl mb-3">{study.client}</h3>
                <p className="text-sm text-gray-400 leading-relaxed">{study.summary || study.title}</p>
              </Link>
            ))}
          </div>
        </section>

        <section>
          <h2 className="font-display text-4xl mb-6">Resources for {location.name} Teams</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {[...RESOURCES.slice(0, 2).map((resource) => ({ label: resource.title, href: `/resources/${resource.slug}`, note: resource.description })),
              ...FREE_TOOLS.slice(0, 2).map((tool) => ({ label: tool.title, href: `/free-tools/${tool.slug}`, note: tool.description }))].map((item) => (
              <Link key={item.href} href={item.href} className="rounded-xl border border-white/10 bg-black/40 p-5 hover:border-teal-400/50 transition-colors">
                <h3 className="font-display text-xl mb-3">{item.label}</h3>
                <p className="text-sm text-gray-400 leading-relaxed">{item.note}</p>
              </Link>
            ))}
          </div>
        </section>

        <section>
          <h2 className="font-display text-4xl mb-6">Common Questions</h2>
          <div className="space-y-4">
            {[
              [`Can Qognition help a company generate leads in ${location.name}?`, `Yes. We map local intent, build landing pages, connect analytics, and prioritize services that match buyer demand in ${location.name}.`],
              [`Will this strategy help with Google and AI search visibility?`, 'Yes. We use clear sections, useful FAQs, schema markup, strong internal links, and natural-language answers so buyers and search systems can understand the offer.'],
              [`Which industries work best in ${location.name}?`, `${location.marketFocus.join(', ')} are current priority segments, but we also support B2B, professional services, ecommerce, healthcare, and local services.`],
              [`What is the fastest channel for ${location.name}?`, 'Paid search and landing pages can create near-term tests, while SEO, resources, and AI search visibility compound over several months.']
            ].map(([question, answer]) => (
              <div key={question} className="rounded-xl border border-white/10 bg-white/[0.03] p-5">
                <h3 className="font-display text-xl mb-2">{question}</h3>
                <p className="text-gray-400 leading-relaxed">{answer}</p>
              </div>
            ))}
          </div>
        </section>
      </main>

      <aside className="lg:col-span-4">
        <div className="sticky top-32 p-8 bg-white/5 border border-white/10 rounded-2xl">
          <Globe className="text-teal-400 mb-6" size={40} />
          <h2 className="font-display text-3xl mb-4">{location.name} Market</h2>
          <p className="text-gray-400 mb-6">{location.country} · {location.type}</p>
          <div className="space-y-3 mb-8">
            {location.marketFocus.map((focus) => (
              <div key={focus} className="flex items-center gap-2 text-gray-300">
                <TrendingUp size={16} className="text-teal-400" /> {focus}
              </div>
            ))}
          </div>
          <a
            href={CALENDLY_LINK}
            target="_blank"
            rel="noopener noreferrer"
            className="block text-center rounded-full bg-teal-400 text-black font-bold px-6 py-4 hover:bg-white transition-colors"
          >
            Book Location Strategy
          </a>
        </div>
      </aside>
    </div>
  </div>
);

export const LocationServiceView = ({ location, service }: { location: Location; service: Service }) => (
  <div className="pt-32 px-6 md:px-12 max-w-7xl mx-auto pb-32">
    <Link href={`/locations/${location.slug}`} className="inline-flex items-center gap-2 text-gray-400 hover:text-white mb-12">
      <ArrowRight size={16} className="rotate-180" /> Back to {location.name}
    </Link>

    <div className="grid grid-cols-1 lg:grid-cols-12 gap-16">
      <main className="lg:col-span-8">
        <span className="text-teal-400 font-bold uppercase tracking-widest mb-4 block">Location Service Strategy</span>
        <h1 className="font-display text-5xl md:text-8xl mb-8">{service.title} in {location.name}</h1>
        <p className="text-xl md:text-2xl text-gray-300 leading-relaxed border-l-2 border-teal-400 pl-6 mb-16">
          {service.shortDescription} Qognition adapts {service.title.toLowerCase()} for companies targeting {location.name}, with clear offers,
          fast pages, conversion tracking, and market-specific proof that helps the right buyers take action.
        </p>

        <section className="mb-16 grid grid-cols-1 md:grid-cols-3 gap-4">
          {[
            `Quick summary: ${service.title} in ${location.name} should make the offer obvious, load quickly, and turn local demand into booked calls.`,
            `The plan is shaped around how ${location.name} buyers compare providers: search results, reviews, proof, pricing confidence, and follow-up speed.`,
            `We connect the page to relevant services, industries, case studies, tools, and resources so visitors can move from research to decision.`
          ].map((item) => (
            <div key={item} className="rounded-xl border border-teal-400/20 bg-teal-400/5 p-5 text-sm leading-relaxed text-gray-300">
              {item}
            </div>
          ))}
        </section>

        <section className="mb-16">
          <h2 className="font-display text-4xl mb-8">What We Build</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {service.subServices.map((subService) => (
              <div key={subService.name} className="p-6 bg-white/5 border border-white/10 rounded-xl">
                <Search className="text-teal-400 mb-4" />
                <h3 className="font-display text-2xl mb-3">{subService.name}</h3>
                <p className="text-gray-400">{subService.description}</p>
              </div>
            ))}
          </div>
        </section>

        <section className="mb-16">
          <h2 className="font-display text-4xl mb-6">How We Adapt {service.title} for {location.name}</h2>
          <div className="space-y-5 text-lg text-gray-300 leading-relaxed">
            <p>
              We start with local search demand, buyer language, competitor density, CPC pressure, sales-cycle length, and the trust signals buyers
              expect in {location.name}. From there, we decide which pages, ad groups, content assets, and conversion paths deserve priority.
            </p>
            <p>
              The implementation includes fast landing pages, clear page sections, schema markup, analytics events, lead source attribution, and links to
              the services, industries, case studies, and tools most likely to help a buyer understand your offer.
            </p>
          </div>
        </section>

        <section className="mb-16">
          <h2 className="font-display text-4xl mb-8">Proof and Planning Assets</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {CASE_STUDIES.slice(0, 2).map((study) => (
              <Link key={study.id} href={`/work/${study.id}`} className="rounded-xl border border-white/10 bg-white/[0.03] p-5 hover:border-teal-400/50 transition-colors">
                <p className="text-xs uppercase tracking-widest text-teal-400 mb-3">{study.industry}</p>
                <h3 className="font-display text-2xl mb-3">{study.title}</h3>
                <p className="text-sm text-gray-400 leading-relaxed">{study.results?.[0] || study.summary}</p>
              </Link>
            ))}
            {FREE_TOOLS.slice(0, 2).map((tool) => (
              <Link key={tool.slug} href={`/free-tools/${tool.slug}`} className="rounded-xl border border-white/10 bg-black/40 p-5 hover:border-teal-400/50 transition-colors">
                <p className="text-xs uppercase tracking-widest text-teal-400 mb-3">Free Tool</p>
                <h3 className="font-display text-2xl mb-3">{tool.title}</h3>
                <p className="text-sm text-gray-400 leading-relaxed">{tool.description}</p>
              </Link>
            ))}
          </div>
        </section>

        <section>
          <h2 className="font-display text-4xl mb-8">Common Questions</h2>
          <div className="space-y-4">
            {[
              [`Do you need an office in ${location.name}?`, `No. Qognition can support companies targeting ${location.name} remotely or as a regional growth partner. We only claim a physical office where one exists.`],
              [`Will this support Google discovery?`, 'Yes. The page is statically generated with useful content, metadata, schema, sitemap inclusion, and internal links.'],
              [`What makes ${service.title} different by location?`, `Search intent, competitor density, CPC, local trust signals, and buyer language all change in ${location.name}.`],
              [`Which industries can use this ${location.name} plan?`, `${location.marketFocus.join(', ')}, professional services, SaaS, ecommerce, healthcare, and local services can all use this structure.`],
              [`How fast can the first leads arrive?`, 'Paid media and landing page tests can launch first, while organic and AI-search visibility build as the supporting content and proof improve.']
            ].map(([question, answer]) => (
              <div key={question} className="p-6 border border-white/10 rounded-xl bg-white/5">
                <h3 className="font-bold text-white mb-2">{question}</h3>
                <p className="text-gray-400">{answer}</p>
              </div>
            ))}
          </div>
        </section>
      </main>

      <aside className="lg:col-span-4">
        <div className="sticky top-32 p-8 bg-teal-900/10 border border-teal-500/20 rounded-2xl">
          <h2 className="font-display text-3xl mb-4">Related Routes</h2>
          <div className="space-y-3">
            <Link href={`/services/${service.id}`} className="block text-teal-400 hover:text-white">{service.title}</Link>
            <Link href={`/locations/${location.slug}`} className="block text-teal-400 hover:text-white">{location.name} Digital Marketing</Link>
            <a href={CALENDLY_LINK} target="_blank" rel="noopener noreferrer" className="block text-teal-400 hover:text-white">Get a Strategy Call</a>
          </div>
        </div>
      </aside>
    </div>
  </div>
);
