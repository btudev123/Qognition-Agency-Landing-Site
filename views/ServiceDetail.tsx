import React, { useEffect } from 'react';
import { useParams, Link, useNavigate } from '../lib/routerCompat';
import { motion } from 'framer-motion';
import { ArrowLeft, CheckCircle, Quote, Layers, BarChart } from 'lucide-react';
import { SERVICES, CALENDLY_LINK } from '../constants';
import MagneticButton from '../components/MagneticButton';
import AccordionItem from '../components/Accordion';
import SEO from '../components/SEO';

const ServiceDetail: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const service = SERVICES.find(s => s.id === id);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [id]);

  if (!service) {
    return <div className="min-h-screen pt-32 text-center text-white">Service Not Found</div>;
  }

  return (
    <>
      <SEO 
        title={`${service.title} Services | Expert Digital Marketing`}
        description={`${service.shortDescription} Get expert ${service.title.toLowerCase()} services from Qognition Agency. Our team delivers measurable results with proven strategies. Contact us today!`}
        path={`/services/${service.id}`}
        schemaData={{
          type: "Service",
          name: `${service.title} Services`,
          url: `https://www.qognitionagency.com/services/${service.id}`
        }}
      />
      
      <div className="min-h-screen pt-32 pb-24 px-6 md:px-12 max-w-7xl mx-auto">
        <Link to="/services" className="inline-flex items-center gap-2 text-gray-400 hover:text-white mb-12 transition-colors">
            <ArrowLeft size={16} /> Back to Services
        </Link>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-16">
            <div className="lg:col-span-8">
                <header className="mb-12">
                   <h1 className="font-display text-5xl md:text-8xl mb-8">{service.title}</h1>
                   <p className="text-xl md:text-2xl text-gray-300 leading-relaxed mb-12 border-l-2 border-teal-400 pl-6">
                       {service.fullDescription}
                   </p>
                </header>

                {/* Expert Quote - Authority Signal */}
                {service.expertQuote && (
                    <div className="my-16 p-8 md:p-10 bg-gradient-to-br from-white/5 to-transparent border border-white/10 rounded-2xl relative overflow-hidden">
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
                    </div>
                )}

                {/* Deep Dive Content - SEO Depth */}
                {service.deepDive && (
                    <div className="space-y-12 mb-16">
                        {service.deepDive.map((section, idx) => (
                            <section key={idx}>
                                <h2 className="font-display text-3xl mb-4 text-white">{section.title}</h2>
                                <p className="text-gray-400 leading-relaxed text-lg whitespace-pre-wrap">
                                    {section.content}
                                </p>
                            </section>
                        ))}
                    </div>
                )}

                {/* Sub Services */}
                <div className="mb-16">
                    <h2 className="font-display text-3xl mb-8 flex items-center gap-2"><Layers className="text-teal-400"/> Capabilities</h2>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                        {service.subServices.map((sub, i) => (
                            <div key={i} className="p-6 bg-white/5 border border-white/10 rounded-lg hover:border-teal-400/50 transition-colors">
                                <h3 className="font-bold text-xl mb-3">{sub.name}</h3>
                                <p className="text-gray-400 text-sm">{sub.description}</p>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Process Section */}
                <div className="mb-16">
                    <h2 className="font-display text-3xl mb-8">Our Process</h2>
                    <div className="space-y-6">
                        {service.process.map((step, i) => (
                            <div key={i} className="flex gap-6 items-start group">
                                <div className="w-12 h-12 rounded-full border border-teal-400/30 flex items-center justify-center bg-teal-900/10 shrink-0 text-teal-400 font-bold font-display text-lg group-hover:bg-teal-400 group-hover:text-black transition-all">
                                    {i + 1}
                                </div>
                                <div>
                                    <h3 className="text-xl font-bold mb-2">{step.title}</h3>
                                    <p className="text-gray-400 leading-relaxed">{step.description}</p>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>

                 {/* Tech Stack */}
                 <div className="mb-16">
                    <h2 className="font-display text-3xl mb-8">Tech Stack</h2>
                    <div className="flex flex-wrap gap-3">
                        {service.techStack.map(tech => (
                            <span key={tech} className="px-4 py-2 bg-white/5 border border-white/10 rounded-full text-sm hover:border-teal-400 transition-colors cursor-default">
                                {tech}
                            </span>
                        ))}
                    </div>
                </div>

                {/* Related Industries */}
                <div className="mb-16 p-8 bg-zinc-900/50 rounded-xl border border-white/10">
                    <h2 className="font-display text-2xl mb-6">Industries Served</h2>
                    <div className="flex flex-wrap gap-4">
                        {service.relatedIndustries.map(ind => (
                            <Link key={ind} to="/industries" className="text-teal-400 border-b border-teal-400/30 hover:text-white transition-colors">
                                {ind}
                            </Link>
                        ))}
                    </div>
                </div>

                <div className="mb-16">
                     <h2 className="font-display text-3xl mb-8">Common Questions</h2>
                     <div className="border-t border-white/10">
                        {service.faqs.map((faq, i) => (
                            <AccordionItem key={i} question={faq.question} answer={faq.answer} />
                        ))}
                     </div>
                </div>
            </div>

            <div className="lg:col-span-4">
                <div className="sticky top-32 p-8 bg-white/5 border border-white/10 rounded-xl">
                    <h3 className="font-display text-xl mb-6 flex items-center gap-2">
                        <BarChart className="text-teal-400" size={20} /> Typical Results
                    </h3>
                    <div className="space-y-6 mb-8">
                        {service.kpis.map((kpi, i) => (
                            <div key={i} className="flex items-center gap-3 text-white">
                                <CheckCircle size={20} className="text-teal-400 shrink-0" />
                                <span className="font-medium">{kpi}</span>
                            </div>
                        ))}
                    </div>
                    <p className="text-sm text-gray-400 mb-8 border-t border-white/10 pt-4">
                        Stop guessing. Start growing. Schedule a consultation with our {service.title} leads.
                    </p>
                    <a href={CALENDLY_LINK} target="_blank" rel="noopener noreferrer">
                        <MagneticButton className="w-full">Book Consultation</MagneticButton>
                    </a>
                </div>
            </div>
        </div>
      </div>
    </>
  );
};

export default ServiceDetail;