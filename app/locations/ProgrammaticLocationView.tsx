import Link from 'next/link';
import { ArrowRight, CheckCircle, Globe, MapPin, Search, TrendingUp } from 'lucide-react';
import { INDUSTRIES } from '../../data/industries';
import { SERVICES } from '../../data/services';
import { FREE_TOOLS, RESOURCES } from '../../data/seoExpansion';
import { CASE_STUDIES } from '../../data/work';
import { Location, Service } from '../../types';
import Heading from '../../components/ui/Heading';
import Badge from '../../components/ui/Badge';

export const LocationsIndexView = ({ locations }: { locations: Location[] }) => (
  <div className="pt-36 pb-20 px-4 sm:px-6">
    <div className="max-w-7xl mx-auto">
      <div className="text-center mb-16">
        <Badge className="mb-4">Service Areas</Badge>
        <Heading level="h1" className="mb-4">Locations</Heading>
        <p className="text-lg text-[var(--text-muted)] max-w-2xl mx-auto leading-relaxed">
          Revenue-market pages for brands that need local search visibility, paid media efficiency, and conversion-focused web experiences.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
        {locations.map((location) => (
          <Link
            key={location.slug}
            href={`/locations/${location.slug}`}
            className="group p-7 border border-[var(--border)] rounded-2xl bg-[var(--card-bg)] hover:border-[var(--accent)]/40 transition-all hover:-translate-y-0.5"
          >
            <div className="flex justify-between items-start mb-6">
              <MapPin size={20} className="text-[var(--accent)]" />
              <span className="text-xs text-[var(--text-muted)] uppercase tracking-widest">
                {location.type}
              </span>
            </div>
            <h2 className="text-xl font-semibold text-[var(--text)] mb-3 group-hover:text-[var(--accent)] transition-colors">
              {location.name}
            </h2>
            <p className="text-sm text-[var(--text-muted)] mb-5 line-clamp-3 leading-relaxed">
              {location.intro}
            </p>
            <div className="flex flex-wrap gap-2 mb-6">
              {location.marketFocus.slice(0, 3).map((focus) => (
                <span
                  key={focus}
                  className="text-xs px-2.5 py-1 bg-[var(--surface)] border border-[var(--border)] rounded-full text-[var(--text-muted)]"
                >
                  {focus}
                </span>
              ))}
            </div>
            <span className="inline-flex items-center gap-2 text-[var(--accent)] text-sm">
              View location <ArrowRight size={14} />
            </span>
          </Link>
        ))}
      </div>
    </div>
  </div>
);

const ServicePills = ({ location }: { location: Location }) => (
  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
    {SERVICES.map((service) => (
      <Link
        key={service.id}
        href={`/locations/${location.slug}/${service.id}`}
        className="group p-5 border border-[var(--border)] bg-[var(--card-bg)] rounded-xl hover:border-[var(--accent)]/40 transition-all"
      >
        <h3 className="font-semibold text-[var(--text)] mb-2 group-hover:text-[var(--accent)] transition-colors">
          {service.title}
        </h3>
        <p className="text-sm text-[var(--text-muted)] leading-relaxed">{service.shortDescription}</p>
      </Link>
    ))}
  </div>
);

export const LocationOverviewView = ({ location }: { location: Location }) => (
  <div className="pt-36 pb-20 px-4 sm:px-6">
    <div className="max-w-7xl mx-auto">
      <Link
        href="/locations"
        className="inline-flex items-center gap-2 text-[var(--text-muted)] hover:text-[var(--text)] mb-10 text-sm transition-colors"
      >
        <ArrowRight size={16} className="rotate-180" /> Back to Locations
      </Link>

      <div className="mb-14 max-w-4xl">
        <Badge className="mb-4">{location.region}</Badge>
        <Heading level="h1" className="mb-5">Digital Marketing Agency in {location.name}</Heading>
        <p className="text-xl text-[var(--text-muted)] leading-relaxed border-l-2 border-[var(--accent)] pl-6">
          {location.intro}
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-14">
        {[
          `Quick summary: Qognition helps companies grow in ${location.name} with SEO, paid media, AI search visibility, web design, and conversion tracking.`,
          `The strategy is built around how buyers in ${location.name} compare providers, check proof, and decide who to contact.`,
          `Use this page to choose priority services, review relevant industries and case studies, and plan a measurable path to qualified enquiries.`,
        ].map((item) => (
          <div
            key={item}
            className="rounded-xl border border-[var(--border)] bg-[var(--card-bg)] p-5 text-sm leading-relaxed text-[var(--text-muted)]"
          >
            {item}
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-14">
        <main className="lg:col-span-8 space-y-14">
          <section>
            <Heading level="h2" className="mb-5">Local Growth Strategy</Heading>
            <p className="text-[var(--text-muted)] leading-relaxed mb-6">
              We build search, ads, content, and conversion systems around how buyers in {location.name} evaluate vendors. Each page is
              built around clear offers, fast load times, local proof, and measurable conversion paths without implying an office that does not exist.
            </p>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {['Local SEO architecture', 'Paid media testing', 'Conversion tracking'].map((item) => (
                <div
                  key={item}
                  className="p-5 border border-[var(--border)] bg-[rgba(var(--accent-rgb),0.04)] rounded-xl"
                >
                  <CheckCircle size={20} className="text-[var(--accent)] mb-3" />
                  <h3 className="font-semibold text-[var(--text)] text-sm">{item}</h3>
                </div>
              ))}
            </div>
          </section>

          <section>
            <Heading level="h2" className="mb-5">{location.name} Market Demand</Heading>
            <div className="space-y-4 text-[var(--text-muted)] leading-relaxed">
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
            <Heading level="h2" className="mb-5">Services in {location.name}</Heading>
            <ServicePills location={location} />
          </section>

          <section>
            <Heading level="h2" className="mb-5">Industries We Prioritize</Heading>
            <div className="flex flex-wrap gap-3">
              {INDUSTRIES.slice(0, 8).map((industry) => (
                <Link
                  key={industry.id}
                  href={`/industries/${industry.id}`}
                  className="px-4 py-2 border border-[var(--border)] bg-[var(--card-bg)] rounded-full text-sm text-[var(--text-muted)] hover:border-[var(--accent)]/40 hover:text-[var(--accent)] transition-all"
                >
                  {industry.name}
                </Link>
              ))}
            </div>
          </section>

          <section>
            <Heading level="h2" className="mb-5">Relevant Case Studies</Heading>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {CASE_STUDIES.slice(0, 4).map((study) => (
                <Link
                  key={study.id}
                  href={`/case-studies/${study.id}`}
                  className="rounded-xl border border-[var(--border)] bg-[var(--card-bg)] p-5 hover:border-[var(--accent)]/40 transition-all"
                >
                  <p className="text-xs font-semibold uppercase tracking-widest text-[var(--accent)] mb-2">
                    {study.industry}
                  </p>
                  <h3 className="font-semibold text-[var(--text)] mb-2">{study.client}</h3>
                  <p className="text-sm text-[var(--text-muted)] leading-relaxed">
                    {study.summary || study.title}
                  </p>
                </Link>
              ))}
            </div>
          </section>

          <section>
            <Heading level="h2" className="mb-5">Resources for {location.name} Teams</Heading>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {[
                ...RESOURCES.slice(0, 2).map((resource) => ({
                  label: resource.title,
                  href: resource.href || `/${resource.slug}`,
                  note: resource.description,
                })),
                ...FREE_TOOLS.slice(0, 2).map((tool) => ({
                  label: tool.title,
                  href: `/free-tools/${tool.slug}`,
                  note: tool.description,
                })),
              ].map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  className="rounded-xl border border-[var(--border)] bg-[var(--surface)] p-5 hover:border-[var(--accent)]/40 transition-all"
                >
                  <h3 className="font-semibold text-[var(--text)] mb-2">{item.label}</h3>
                  <p className="text-sm text-[var(--text-muted)] leading-relaxed">{item.note}</p>
                </Link>
              ))}
            </div>
          </section>

          <section>
            <Heading level="h2" className="mb-5">Common Questions</Heading>
            <div className="space-y-3">
              {[
                [
                  `Can Qognition help a company generate leads in ${location.name}?`,
                  `Yes. We map local intent, build landing pages, connect analytics, and prioritize services that match buyer demand in ${location.name}.`,
                ],
                [
                  `Will this strategy help with Google and AI search visibility?`,
                  'Yes. We use clear sections, useful FAQs, schema markup, strong internal links, and natural-language answers so buyers and search systems can understand the offer.',
                ],
                [
                  `Which industries work best in ${location.name}?`,
                  `${location.marketFocus.join(', ')} are current priority segments, but we also support B2B, professional services, ecommerce, healthcare, and local services.`,
                ],
                [
                  `What is the fastest channel for ${location.name}?`,
                  'Paid search and landing pages can create near-term tests, while SEO, resources, and AI search visibility compound over several months.',
                ],
              ].map(([question, answer]) => (
                <div
                  key={question}
                  className="rounded-xl border border-[var(--border)] bg-[var(--card-bg)] p-5"
                >
                  <h3 className="font-semibold text-[var(--text)] mb-2">{question}</h3>
                  <p className="text-sm text-[var(--text-muted)] leading-relaxed">{answer}</p>
                </div>
              ))}
            </div>
          </section>
        </main>

        <aside className="lg:col-span-4">
          <div className="sticky top-28 p-7 border border-[var(--border)] bg-[var(--card-bg)] rounded-2xl space-y-5">
            <Globe size={36} className="text-[var(--accent)]" />
            <div>
              <Heading level="h3" className="text-lg mb-1">{location.name} Market</Heading>
              <p className="text-sm text-[var(--text-muted)]">
                {location.country} · {location.type}
              </p>
            </div>
            <div className="space-y-2">
              {location.marketFocus.map((focus) => (
                <div key={focus} className="flex items-center gap-2 text-sm text-[var(--text-muted)]">
                  <TrendingUp size={14} className="text-[var(--accent)] shrink-0" /> {focus}
                </div>
              ))}
            </div>
            <a
              href="https://calendly.com/hello-qognitionagency/30min"
              target="_blank"
              rel="noopener noreferrer"
              className="block text-center w-full px-5 py-3 text-sm font-medium bg-[var(--accent)] text-[var(--accent-deep)] rounded-lg hover:brightness-110 transition-all"
            >
              Book Location Strategy
            </a>
          </div>
        </aside>
      </div>
    </div>
  </div>
);

export const LocationServiceView = ({
  location,
  service,
}: {
  location: Location;
  service: Service;
}) => (
  <div className="pt-36 pb-20 px-4 sm:px-6">
    <div className="max-w-7xl mx-auto">
      <Link
        href={`/locations/${location.slug}`}
        className="inline-flex items-center gap-2 text-[var(--text-muted)] hover:text-[var(--text)] mb-10 text-sm transition-colors"
      >
        <ArrowRight size={16} className="rotate-180" /> Back to {location.name}
      </Link>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-14">
        <main className="lg:col-span-8">
          <Badge className="mb-4">Location Service Strategy</Badge>
          <Heading level="h1" className="mb-5">
            {service.title} in {location.name}
          </Heading>
          <p className="text-xl text-[var(--text-muted)] leading-relaxed border-l-2 border-[var(--accent)] pl-6 mb-14">
            {service.shortDescription} Qognition adapts {service.title.toLowerCase()} for companies targeting {location.name}, with clear offers,
            fast pages, conversion tracking, and market-specific proof that helps the right buyers take action.
          </p>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-14">
            {[
              `${service.title} in ${location.name} should make the offer obvious, load quickly, and turn local demand into booked calls.`,
              `The plan is shaped around how ${location.name} buyers compare providers: search results, reviews, proof, pricing confidence, and follow-up speed.`,
              `We connect the page to relevant services, industries, case studies, tools, and resources so visitors can move from research to decision.`,
            ].map((item) => (
              <div
                key={item}
                className="rounded-xl border border-[var(--border)] bg-[var(--card-bg)] p-5 text-sm leading-relaxed text-[var(--text-muted)]"
              >
                {item}
              </div>
            ))}
          </div>

          <section className="mb-14">
            <Heading level="h2" className="mb-5">What We Build</Heading>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
              {service.subServices.map((subService) => (
                <div
                  key={subService.name}
                  className="p-6 border border-[var(--border)] bg-[var(--card-bg)] rounded-xl"
                >
                  <Search size={20} className="text-[var(--accent)] mb-3" />
                  <h3 className="font-semibold text-[var(--text)] mb-2">{subService.name}</h3>
                  <p className="text-sm text-[var(--text-muted)]">{subService.description}</p>
                </div>
              ))}
            </div>
          </section>

          <section className="mb-14">
            <Heading level="h2" className="mb-5">
              How We Adapt {service.title} for {location.name}
            </Heading>
            <div className="space-y-4 text-[var(--text-muted)] leading-relaxed">
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

          <section className="mb-14">
            <Heading level="h2" className="mb-5">Proof and Planning Assets</Heading>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {CASE_STUDIES.slice(0, 2).map((study) => (
                <Link
                  key={study.id}
                  href={`/case-studies/${study.id}`}
                  className="rounded-xl border border-[var(--border)] bg-[var(--card-bg)] p-5 hover:border-[var(--accent)]/40 transition-all"
                >
                  <p className="text-xs font-semibold uppercase tracking-widest text-[var(--accent)] mb-2">
                    {study.industry}
                  </p>
                  <h3 className="font-semibold text-[var(--text)] mb-2">{study.title}</h3>
                  <p className="text-sm text-[var(--text-muted)] leading-relaxed">
                    {study.results?.[0] || study.summary}
                  </p>
                </Link>
              ))}
              {FREE_TOOLS.slice(0, 2).map((tool) => (
                <Link
                  key={tool.slug}
                  href={`/free-tools/${tool.slug}`}
                  className="rounded-xl border border-[var(--border)] bg-[var(--surface)] p-5 hover:border-[var(--accent)]/40 transition-all"
                >
                  <p className="text-xs font-semibold uppercase tracking-widest text-[var(--accent)] mb-2">
                    Free Tool
                  </p>
                  <h3 className="font-semibold text-[var(--text)] mb-2">{tool.title}</h3>
                  <p className="text-sm text-[var(--text-muted)] leading-relaxed">{tool.description}</p>
                </Link>
              ))}
            </div>
          </section>

          <section>
            <Heading level="h2" className="mb-5">Common Questions</Heading>
            <div className="space-y-3">
              {[
                [
                  `Do you need an office in ${location.name}?`,
                  `No. Qognition can support companies targeting ${location.name} remotely or as a regional growth partner. We only claim a physical office where one exists.`,
                ],
                [
                  `Will this support Google discovery?`,
                  'Yes. The page is statically generated with useful content, metadata, schema, sitemap inclusion, and internal links.',
                ],
                [
                  `What makes ${service.title} different by location?`,
                  `Search intent, competitor density, CPC, local trust signals, and buyer language all change in ${location.name}.`,
                ],
                [
                  `Which industries can use this ${location.name} plan?`,
                  `${location.marketFocus.join(', ')}, professional services, SaaS, ecommerce, healthcare, and local services can all use this structure.`,
                ],
                [
                  `How fast can the first leads arrive?`,
                  'Paid media and landing page tests can launch first, while organic and AI-search visibility build as the supporting content and proof improve.',
                ],
              ].map(([question, answer]) => (
                <div
                  key={question}
                  className="p-5 border border-[var(--border)] bg-[var(--card-bg)] rounded-xl"
                >
                  <h3 className="font-semibold text-[var(--text)] mb-2">{question}</h3>
                  <p className="text-sm text-[var(--text-muted)]">{answer}</p>
                </div>
              ))}
            </div>
          </section>
        </main>

        <aside className="lg:col-span-4">
          <div className="sticky top-28 p-7 border border-[var(--border)] bg-[rgba(var(--accent-rgb),0.04)] rounded-2xl space-y-3">
            <Heading level="h3" className="text-base">Related Routes</Heading>
            <Link
              href={`/services/${service.id}`}
              className="block text-sm text-[var(--text-muted)] hover:text-[var(--accent)] transition-colors"
            >
              {service.title}
            </Link>
            <Link
              href={`/locations/${location.slug}`}
              className="block text-sm text-[var(--text-muted)] hover:text-[var(--accent)] transition-colors"
            >
              {location.name} Digital Marketing
            </Link>
            <a
              href="https://calendly.com/hello-qognitionagency/30min"
              target="_blank"
              rel="noopener noreferrer"
              className="block text-sm text-[var(--text-muted)] hover:text-[var(--accent)] transition-colors"
            >
              Get a Strategy Call
            </a>
          </div>
        </aside>
      </div>
    </div>
  </div>
);
