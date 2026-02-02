import React, { useEffect } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowLeft, CheckCircle, Cpu, Layers } from 'lucide-react';
import { SERVICES, CALENDLY_LINK } from '../constants';
import MagneticButton from '../components/MagneticButton';
import AccordionItem from '../components/Accordion';
import JsonLd from '../components/JsonLd';

const ServiceDetail: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const service = SERVICES.find(s => s.id === id);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [id]);

  if (!service) {
    return <div className="min-h-screen pt-32 text-center">Service Not Found</div>;
  }

  return (
    <>
      <JsonLd 
        data={{
          title: `${service.title} Services | Qognition Agency`,
          description: service.shortDescription,
          url: `/services/${service.id}`,
          type: "Service"
        }}
      />
      
      <div className="min-h-screen pt-32 pb-24 px-6 md:px-12 max-w-7xl mx-auto">
        <Link to="/services" className="inline-flex items-center gap-2 text-gray-400 hover:text-white mb-12">
            <ArrowLeft size={16} /> Back to Services
        </Link>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-16">
            <div className="lg:col-span-8">
                <h1 className="font-display text-5xl md:text-8xl mb-8">{service.title}</h1>
                <p className="text-xl md:text-2xl text-gray-300 leading-relaxed mb-12 border-l-2 border-teal-400 pl-6">
                    {service.fullDescription}
                </p>

                {/* Sub Services */}
                <div className="mb-16">
                    <h2 className="font-display text-3xl mb-8">Capabilities</h2>
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
                            <div key={i} className="flex gap-6 items-start">
                                <div className="w-12 h-12 rounded-full border border-teal-400/30 flex items-center justify-center bg-teal-900/10 shrink-0 text-teal-400 font-bold font-display text-lg">
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
                <div className="mb-16 p-8 bg-gray-900 rounded-xl border border-white/10">
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
                    <h3 className="font-display text-xl mb-6">Typical Results</h3>
                    <div className="space-y-6 mb-8">
                        {service.kpis.map((kpi, i) => (
                            <div key={i} className="flex items-center gap-3 text-teal-400">
                                <CheckCircle size={20} />
                                <span className="font-bold">{kpi}</span>
                            </div>
                        ))}
                    </div>
                    <p className="text-sm text-gray-400 mb-8">
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