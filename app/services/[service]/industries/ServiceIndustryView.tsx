import Link from 'next/link';
import { ArrowRight, BarChart3, CheckCircle, Layers } from 'lucide-react';
import { Industry, Service } from '../../../../types';
import Heading from '../../../../components/ui/Heading';

const ServiceIndustryView = ({ service, industry }: { service: Service; industry: Industry }) => (
  <div className="pt-36 pb-20 px-4 sm:px-6 max-w-7xl mx-auto">
    <div className="flex items-center gap-2 text-xs text-[var(--text-muted)] mb-8 uppercase tracking-wider">
      <Link href="/services" className="hover:text-[var(--accent)] transition-colors">Services</Link>
      <span>/</span>
      <Link href={`/services/${service.id}`} className="hover:text-[var(--accent)] transition-colors">{service.title}</Link>
      <span>/</span>
      <Link href={`/industries/${industry.id}`} className="hover:text-[var(--accent)] transition-colors">{industry.name}</Link>
    </div>

    <div className="grid grid-cols-1 lg:grid-cols-12 gap-16">
      <main className="lg:col-span-8">
        <span className="text-[var(--accent)] font-semibold uppercase tracking-widest mb-4 block text-xs">Service + Industry</span>
        <Heading level="h1" className="mb-6">{service.title} for {industry.name}</Heading>
        <p className="text-xl text-[var(--text-muted)] leading-relaxed border-l-2 border-[var(--accent)] pl-6 mb-16">
          {service.shortDescription} For {industry.name}, we tailor strategy around buyer trust, compliance, search demand, and conversion paths.
        </p>

        <section className="mb-16">
          <Heading level="h2" className="mb-8 flex items-center gap-3">
            <Layers className="text-[var(--accent)]" /> Industry-Specific Execution
          </Heading>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {service.process.map((step, index) => (
              <div key={step.title} className="p-6 border border-[var(--border)] bg-[var(--card-bg)] rounded-xl">
                <span className="text-[var(--accent)] font-mono">0{index + 1}</span>
                <h3 className="text-xl font-semibold text-[var(--text)] my-3">{step.title}</h3>
                <p className="text-sm text-[var(--text-muted)]">{step.description}</p>
              </div>
            ))}
          </div>
        </section>

        <section className="mb-16">
          <Heading level="h2" className="mb-8">Pain Points We Solve</Heading>
          <div className="space-y-4">
            {industry.painPoints.map((pain) => (
              <div key={pain} className="flex gap-4 p-5 border border-[var(--border)] bg-[var(--card-bg)] rounded-xl">
                <BarChart3 className="text-[var(--accent)] shrink-0" />
                <p className="text-[var(--text-muted)]">{pain}</p>
              </div>
            ))}
          </div>
        </section>

        <section>
          <Heading level="h2" className="mb-8">Recommended Stack</Heading>
          <div className="flex flex-wrap gap-3">
            {service.techStack.map((item) => (
              <span key={item} className="px-4 py-2 bg-[var(--surface)] border border-[var(--border)] rounded-full text-sm text-[var(--text-muted)]">
                {item}
              </span>
            ))}
          </div>
        </section>
      </main>

      <aside className="lg:col-span-4">
        <div className="sticky top-28 p-8 border border-[var(--accent)]/20 bg-[rgba(var(--accent-rgb),0.04)] rounded-2xl">
          <CheckCircle className="text-[var(--accent)] mb-6" size={40} />
          <Heading level="h2" className="mb-4">Built for {industry.name}</Heading>
          <p className="text-[var(--text-muted)] mb-8">{industry.description}</p>
          <div className="space-y-3 mb-8">
            <Link href={`/industries/${industry.id}`} className="block text-sm text-[var(--accent)] hover:text-[var(--text)] transition-colors">
              View industry strategy
            </Link>
            <Link href={`/services/${service.id}`} className="block text-sm text-[var(--accent)] hover:text-[var(--text)] transition-colors">
              View service details
            </Link>
          </div>
          <a
            href="https://cal.com/qognition-agency/15min"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center justify-center gap-2 rounded-lg bg-[var(--accent)] text-[var(--accent-deep)] font-medium px-6 py-4 hover:brightness-110 transition-all text-sm"
          >
            Book Strategy Call <ArrowRight size={16} />
          </a>
        </div>
      </aside>
    </div>
  </div>
);

export default ServiceIndustryView;
