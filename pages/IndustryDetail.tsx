import React, { useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { ArrowLeft, CheckCircle, Target, ArrowRight } from 'lucide-react';
import { INDUSTRIES, CALENDLY_LINK } from '../constants';
import MagneticButton from '../components/MagneticButton';
import AccordionItem from '../components/Accordion';
import JsonLd from '../components/JsonLd';

const IndustryDetail: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const industry = INDUSTRIES.find(i => i.id === id);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [id]);

  if (!industry) {
    return <div className="min-h-screen pt-32 text-center">Industry Not Found</div>;
  }

  // Helper to extract the first pain point for the dynamic CTA
  const primaryPainPoint = industry.painPoints.length > 0 ? industry.painPoints[0] : "stagnant growth";

  return (
    <>
      <JsonLd 
        data={{
          title: `${industry.name} Marketing Services | Qognition`,
          description: industry.description,
          url: `/industries/${industry.id}`,
          type: "Service"
        }}
      />
      
      <div className="min-h-screen pt-32 px-6 md:px-12 max-w-7xl mx-auto">
        <Link to="/industries" className="inline-flex items-center gap-2 text-gray-400 hover:text-white mb-12">
            <ArrowLeft size={16} /> Back to Sectors
        </Link>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 mb-24">
            <div className="lg:col-span-8">
                <h1 className="font-display text-5xl md:text-8xl mb-8">{industry.name}</h1>
                <p className="text-xl md:text-2xl text-gray-300 leading-relaxed mb-12 border-l-2 border-teal-400 pl-6">
                    {industry.description}
                </p>

                <div className="mb-16">
                    <h2 className="font-display text-3xl mb-8">Specialized Focus</h2>
                    <div className="flex flex-wrap gap-3">
                        {industry.subIndustries.map(sub => (
                            <span key={sub} className="px-4 py-2 bg-white/5 border border-white/10 rounded-full text-sm">
                                {sub}
                            </span>
                        ))}
                    </div>
                </div>

                <div className="mb-16">
                    <h2 className="font-display text-3xl mb-8">Sector Pain Points</h2>
                    <div className="grid gap-6">
                        {industry.painPoints.map((pain, i) => (
                            <div key={i} className="flex items-start gap-4 p-6 border border-red-500/20 bg-red-500/5 rounded-lg">
                                <div className="text-red-400 mt-1">
                                    <Target size={24}/>
                                </div>
                                <div>
                                    <h3 className="font-bold text-lg text-red-100">The Problem</h3>
                                    <p className="text-gray-400">{pain}</p>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>

                <div className="mb-16">
                    <h2 className="font-display text-3xl mb-8">Our Solutions</h2>
                    <div className="space-y-4">
                        {industry.solutions.map((sol, i) => (
                            <div key={i} className="flex items-center gap-3 p-4 border border-teal-500/30 bg-teal-500/5 rounded-lg">
                                <CheckCircle className="text-teal-400" size={24} />
                                <span className="text-lg text-white">{sol}</span>
                            </div>
                        ))}
                    </div>
                </div>

                <div className="mb-16">
                     <h2 className="font-display text-3xl mb-8">Expert Insights (FAQs)</h2>
                     <div className="border-t border-white/10">
                        {industry.faqs.map((faq, i) => (
                            <AccordionItem key={i} question={faq.question} answer={faq.answer} />
                        ))}
                     </div>
                </div>
            </div>

            <div className="lg:col-span-4">
                <div className="sticky top-32 p-8 bg-white/5 border border-white/10 rounded-xl">
                    <h3 className="font-display text-xl mb-6">Case Study Reference</h3>
                    <div className="mb-8">
                        <p className="text-gray-400 mb-4">See how we helped a client in this space:</p>
                        <Link to={`/work/${industry.caseStudyRef}`} className="block p-4 border border-white/20 rounded hover:border-teal-400 transition-colors">
                            <span className="text-teal-400 font-bold">View Case Study &rarr;</span>
                        </Link>
                    </div>
                    
                    <h3 className="font-display text-xl mb-4 mt-8">Recommended Services</h3>
                    <div className="flex flex-wrap gap-2 mb-8">
                        {industry.relatedServices.map(srv => (
                            <Link key={srv} to={`/services/${srv}`} className="text-xs px-2 py-1 bg-black border border-white/20 rounded hover:border-teal-400 transition-colors">
                                {srv.toUpperCase()}
                            </Link>
                        ))}
                    </div>

                    <a href={CALENDLY_LINK} target="_blank" rel="noopener noreferrer">
                        <MagneticButton className="w-full">Book Strategy Call</MagneticButton>
                    </a>
                </div>
            </div>
        </div>

        {/* Dynamic Industry CTA Section */}
        <section className="py-24 border-t border-white/10 relative overflow-hidden mb-24 rounded-2xl bg-gradient-to-br from-teal-900/20 to-black border-x border-b">
            <div className="absolute top-0 right-0 w-96 h-96 bg-teal-500/10 blur-[100px] rounded-full pointer-events-none"></div>
            
            <div className="relative z-10 text-center max-w-4xl mx-auto px-6">
                <h2 className="font-display text-4xl md:text-6xl mb-6">
                    Dominate the <span className="text-teal-400">{industry.name}</span> Market
                </h2>
                <p className="text-xl md:text-2xl text-gray-300 mb-12">
                    Stop struggling with <span className="text-white italic border-b border-teal-400/50">{primaryPainPoint.toLowerCase()}</span>. 
                    We build the digital infrastructure you need to lead.
                </p>
                
                <div className="flex flex-col md:flex-row gap-6 justify-center items-center">
                    <a href={CALENDLY_LINK} target="_blank" rel="noopener noreferrer">
                        <MagneticButton variant="primary" className="text-lg px-12 py-6">
                            Book {industry.name} Strategy
                        </MagneticButton>
                    </a>
                    <Link to="/contact">
                         <MagneticButton variant="outline" className="text-lg px-8 py-6">
                             Contact Sales <ArrowRight size={18} />
                         </MagneticButton>
                    </Link>
                </div>

                <div className="mt-12 flex justify-center gap-4 text-sm text-gray-500 font-mono">
                   <span>AI-Ready</span> • <span>E-E-A-T Compliant</span> • <span>Enterprise Scale</span>
                </div>
            </div>
        </section>

      </div>
    </>
  );
};

export default IndustryDetail;