
import React, { useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { ArrowLeft, CheckCircle2, Target, BarChart3, ArrowRight, ShieldCheck, HelpCircle } from 'lucide-react';
import { INDUSTRIES, CALENDLY_LINK } from '../constants';
import MagneticButton from '../components/MagneticButton';
import AccordionItem from '../components/Accordion';
import SEO from '../components/SEO';

const SubIndustryDetail: React.FC = () => {
  const { id, subId } = useParams<{ id: string; subId: string }>();

  const industry = INDUSTRIES.find(i => i.id === id);
  const subIndustry = industry?.subIndustries.find(s => s.slug === subId);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [id, subId]);

  if (!industry || !subIndustry) {
    return (
        <div className="min-h-screen pt-32 text-center flex flex-col items-center justify-center">
            <h1 className="text-2xl mb-4">Vertical Not Found</h1>
            <Link to="/industries">
                <MagneticButton variant="primary">Return to Industries</MagneticButton>
            </Link>
        </div>
    );
  }

  // Combine industry generic FAQs with specific sub-industry FAQs if they exist
  const displayFaqs = subIndustry.faqs 
    ? [...subIndustry.faqs, ...industry.faqs.slice(0, 3)]
    : industry.faqs;

  return (
    <>
      <SEO 
        title={`${subIndustry.name} Marketing | Digital Strategies for ${subIndustry.name}`}
        description={`Specialized digital marketing for ${subIndustry.name}. ${subIndustry.description} Get expert SEO, PPC, and growth strategies tailored for the ${subIndustry.name} industry from Qognition Agency.`}
        path={`/industries/${industry.id}/${subIndustry.slug}`}
        schemaData={{
          type: "Service",
          name: `${subIndustry.name} Digital Marketing`,
          url: `https://qognitionagency.com/industries/${industry.id}/${subIndustry.slug}`
        }}
      />
      
      <div className="min-h-screen pt-32 px-6 md:px-12 max-w-7xl mx-auto pb-32">
        {/* Breadcrumbs */}
        <div className="flex items-center gap-2 text-sm text-gray-500 mb-8 uppercase tracking-wider font-mono">
            <Link to="/industries" className="hover:text-teal-400">Industries</Link>
            <span>/</span>
            <Link to={`/industries/${industry.id}`} className="hover:text-teal-400">{industry.name}</Link>
            <span>/</span>
            <span className="text-teal-400">{subIndustry.name}</span>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-16">
            <div className="lg:col-span-8">
                <header className="mb-12">
                     <span className="text-teal-400 font-bold uppercase tracking-widest mb-4 block">Specialized Vertical</span>
                     <h1 className="font-display text-4xl md:text-7xl mb-6 leading-tight">
                        Marketing for <br/><span className="text-teal-400">{subIndustry.name}</span>
                     </h1>
                     <p className="text-xl md:text-2xl text-gray-300 leading-relaxed border-l-2 border-teal-400 pl-6">
                         {subIndustry.description}
                     </p>
                </header>

                <section className="mb-16">
                    <h2 className="font-display text-3xl mb-8">Why Generalist Agencies Fail</h2>
                    <p className="text-gray-400 mb-8 leading-relaxed text-lg">
                        {subIndustry.name} requires a nuanced approach. Generic strategies don't work here. 
                        We understand the specific regulatory environment, buyer journey, and lexicon of your sector.
                    </p>
                    <div className="grid gap-6">
                        <div className="p-6 bg-red-900/10 border border-red-500/20 rounded-xl">
                            <h3 className="flex items-center gap-2 text-red-400 font-bold mb-2">
                                <Target size={20}/> The Pain Point
                            </h3>
                            <p className="text-gray-300">
                                Most agencies treat {subIndustry.name} like e-commerce. They fail to build the necessary trust and authority required for high-value conversions in this space.
                            </p>
                        </div>
                         <div className="p-6 bg-teal-900/10 border border-teal-500/20 rounded-xl">
                            <h3 className="flex items-center gap-2 text-teal-400 font-bold mb-2">
                                <CheckCircle2 size={20}/> The Qognition Way
                            </h3>
                            <p className="text-gray-300">
                                We deploy E-E-A-T (Experience, Expertise, Authoritativeness, Trust) strategies specifically engineered for {subIndustry.name}, ensuring you rank for high-intent technical terms, not just vanity keywords.
                            </p>
                        </div>
                    </div>
                </section>

                <section className="mb-16">
                    <h2 className="font-display text-3xl mb-8">Strategic Features</h2>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        {subIndustry.features.map((feature, i) => (
                            <div key={i} className="flex items-center gap-3 p-4 bg-white/5 border border-white/10 rounded-lg">
                                <BarChart3 className="text-teal-400" size={20} />
                                <span className="font-bold text-white">{feature}</span>
                            </div>
                        ))}
                    </div>
                </section>

                {subIndustry.benefits && (
                    <section className="mb-16">
                        <h2 className="font-display text-3xl mb-8">Key Outcomes</h2>
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                            {subIndustry.benefits.map((benefit, i) => (
                                <div key={i} className="p-6 border border-white/10 rounded-xl bg-gradient-to-br from-white/5 to-transparent">
                                    <ShieldCheck className="text-teal-400 mb-4" size={24}/>
                                    <h3 className="font-bold text-lg">{benefit}</h3>
                                </div>
                            ))}
                        </div>
                    </section>
                )}

                <section className="mb-16">
                     <h2 className="font-display text-3xl mb-8 flex items-center gap-3">
                         <HelpCircle className="text-teal-400"/> Expert FAQ
                     </h2>
                     <div className="border-t border-white/10">
                        {displayFaqs.map((faq, i) => (
                            <AccordionItem key={i} question={faq.question} answer={faq.answer} />
                        ))}
                     </div>
                </section>
                
                <section>
                    <h2 className="font-display text-3xl mb-6">Ready to lead the market?</h2>
                    <p className="text-gray-400 mb-8">
                        Stop competing with generic noise. Partner with a specialist agency that speaks your language.
                    </p>
                     <div className="flex flex-col md:flex-row gap-6">
                        <a href={CALENDLY_LINK} target="_blank" rel="noopener noreferrer">
                            <MagneticButton variant="primary" className="px-8 py-4">
                                Book {subIndustry.name} Strategy
                            </MagneticButton>
                        </a>
                        <Link to="/contact">
                            <MagneticButton variant="outline" className="px-8 py-4">
                                Contact Sales
                            </MagneticButton>
                        </Link>
                     </div>
                </section>
            </div>

            <div className="lg:col-span-4">
                 <div className="sticky top-32 p-8 bg-white/5 border border-white/10 rounded-xl">
                    <h3 className="font-display text-xl mb-6">Sector Expertise</h3>
                    <p className="text-gray-400 mb-6 text-sm">
                        Qognition has deep experience in the wider {industry.name} ecosystem.
                    </p>
                    
                    <div className="mb-8">
                        <h4 className="text-xs font-bold uppercase tracking-widest text-gray-500 mb-4">Other {industry.name} Areas</h4>
                        <div className="flex flex-wrap gap-2">
                            {industry.subIndustries.filter(s => s.slug !== subId).map(s => (
                                <Link key={s.slug} to={`/industries/${industry.id}/${s.slug}`} className="text-xs px-3 py-2 bg-black border border-white/20 rounded hover:border-teal-400 hover:text-teal-400 transition-colors">
                                    {s.name}
                                </Link>
                            ))}
                        </div>
                    </div>

                    <div className="border-t border-white/10 pt-6">
                        <h4 className="text-xs font-bold uppercase tracking-widest text-gray-500 mb-4">Recommended Tech</h4>
                        <ul className="space-y-2 text-sm text-gray-300">
                            <li className="flex items-center gap-2"><ArrowRight size={12} className="text-teal-400"/> Next.js for Performance</li>
                            <li className="flex items-center gap-2"><ArrowRight size={12} className="text-teal-400"/> HubSpot CRM</li>
                            <li className="flex items-center gap-2"><ArrowRight size={12} className="text-teal-400"/> Schema Markup</li>
                        </ul>
                    </div>
                 </div>
            </div>
        </div>
      </div>
    </>
  );
};

export default SubIndustryDetail;
