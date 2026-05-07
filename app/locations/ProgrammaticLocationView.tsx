import Link from 'next/link';
import { ArrowRight, CheckCircle, Globe, MapPin, Search, TrendingUp } from 'lucide-react';
import { CALENDLY_LINK } from '../../constants';
import { INDUSTRIES } from '../../data/industries';
import { SERVICES } from '../../data/services';
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

    <div className="grid grid-cols-1 lg:grid-cols-12 gap-16">
      <main className="lg:col-span-8 space-y-16">
        <section>
          <h2 className="font-display text-4xl mb-6">Local Growth Strategy</h2>
          <p className="text-gray-300 text-lg leading-relaxed mb-8">
            We build search, ads, content, and conversion systems around how buyers in {location.name} evaluate vendors. Each page is
            structured for crawlability, entity clarity, and commercial intent while avoiding false office claims.
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
        <span className="text-teal-400 font-bold uppercase tracking-widest mb-4 block">Programmatic SEO Page</span>
        <h1 className="font-display text-5xl md:text-8xl mb-8">{service.title} in {location.name}</h1>
        <p className="text-xl md:text-2xl text-gray-300 leading-relaxed border-l-2 border-teal-400 pl-6 mb-16">
          {service.shortDescription} Qognition adapts {service.title.toLowerCase()} for companies targeting {location.name}, with
          local intent mapping, landing page systems, tracking, and technical SEO foundations.
        </p>

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

        <section>
          <h2 className="font-display text-4xl mb-8">Common Questions</h2>
          <div className="space-y-4">
            {[
              [`Do you need an office in ${location.name}?`, `No. This is a service-area page for companies targeting ${location.name}; we do not claim a physical office unless one exists.`],
              [`Can this page support Google Search Console indexing?`, 'Yes. It is statically generated with canonical metadata, schema, and sitemap inclusion.'],
              [`What makes ${service.title} different by location?`, `Search intent, competitor density, CPC, local trust signals, and buyer language all change in ${location.name}.`]
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
            <Link href="/contact" className="block text-teal-400 hover:text-white">Get a Strategy Call</Link>
          </div>
        </div>
      </aside>
    </div>
  </div>
);
