import Link from 'next/link';
import { ArrowRight, BarChart3, CheckCircle, Layers } from 'lucide-react';
import { CALENDLY_LINK } from '../../../../constants';
import { Industry, Service } from '../../../../types';

const ServiceIndustryView = ({ service, industry }: { service: Service; industry: Industry }) => (
  <div className="pt-32 px-6 md:px-12 max-w-7xl mx-auto pb-32">
    <div className="flex items-center gap-2 text-sm text-gray-500 mb-8 uppercase tracking-wider font-mono">
      <Link href="/services" className="hover:text-teal-400">Services</Link>
      <span>/</span>
      <Link href={`/services/${service.id}`} className="hover:text-teal-400">{service.title}</Link>
      <span>/</span>
      <Link href={`/industries/${industry.id}`} className="hover:text-teal-400">{industry.name}</Link>
    </div>

    <div className="grid grid-cols-1 lg:grid-cols-12 gap-16">
      <main className="lg:col-span-8">
        <span className="text-teal-400 font-bold uppercase tracking-widest mb-4 block">Service + Industry</span>
        <h1 className="font-display text-5xl md:text-8xl mb-8">{service.title} for {industry.name}</h1>
        <p className="text-xl md:text-2xl text-gray-300 leading-relaxed border-l-2 border-teal-400 pl-6 mb-16">
          {service.shortDescription} For {industry.name}, we tailor strategy around buyer trust, compliance, search demand, and conversion paths.
        </p>

        <section className="mb-16">
          <h2 className="font-display text-4xl mb-8 flex items-center gap-3"><Layers className="text-teal-400" /> Industry-Specific Execution</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {service.process.map((step, index) => (
              <div key={step.title} className="p-6 bg-white/5 border border-white/10 rounded-xl">
                <span className="text-teal-400 font-mono">0{index + 1}</span>
                <h3 className="font-display text-2xl my-3">{step.title}</h3>
                <p className="text-gray-400">{step.description}</p>
              </div>
            ))}
          </div>
        </section>

        <section className="mb-16">
          <h2 className="font-display text-4xl mb-8">Pain Points We Solve</h2>
          <div className="space-y-4">
            {industry.painPoints.map((pain) => (
              <div key={pain} className="flex gap-4 p-5 border border-white/10 bg-white/5 rounded-xl">
                <BarChart3 className="text-teal-400 shrink-0" />
                <p className="text-gray-300">{pain}</p>
              </div>
            ))}
          </div>
        </section>

        <section>
          <h2 className="font-display text-4xl mb-8">Recommended Stack</h2>
          <div className="flex flex-wrap gap-3">
            {service.techStack.map((item) => (
              <span key={item} className="px-4 py-2 bg-black border border-white/10 rounded-full text-gray-300">
                {item}
              </span>
            ))}
          </div>
        </section>
      </main>

      <aside className="lg:col-span-4">
        <div className="sticky top-32 p-8 bg-teal-900/10 border border-teal-500/20 rounded-2xl">
          <CheckCircle className="text-teal-400 mb-6" size={40} />
          <h2 className="font-display text-3xl mb-4">Built for {industry.name}</h2>
          <p className="text-gray-400 mb-8">{industry.description}</p>
          <div className="space-y-3 mb-8">
            <Link href={`/industries/${industry.id}`} className="block text-teal-400 hover:text-white">View industry strategy</Link>
            <Link href={`/services/${service.id}`} className="block text-teal-400 hover:text-white">View service details</Link>
          </div>
          <a
            href={CALENDLY_LINK}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center justify-center gap-2 rounded-full bg-teal-400 text-black font-bold px-6 py-4 hover:bg-white transition-colors"
          >
            Book Strategy <ArrowRight size={16} />
          </a>
        </div>
      </aside>
    </div>
  </div>
);

export default ServiceIndustryView;
