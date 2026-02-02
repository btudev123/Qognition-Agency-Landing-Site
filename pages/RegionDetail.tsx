import React, { useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { ArrowLeft, Globe, MapPin, TrendingUp, BarChart3, Radio, Info, ArrowRight } from 'lucide-react';
import { REGIONS, CASE_STUDIES, CALENDLY_LINK } from '../constants';
import MagneticButton from '../components/MagneticButton';
import AccordionItem from '../components/Accordion';
import JsonLd from '../components/JsonLd';
import ParallaxImage from '../components/ParallaxImage';
import { motion } from 'framer-motion';

const RegionDetail: React.FC = () => {
  const { slug } = useParams<{ slug: string }>();
  const region = REGIONS.find(r => r.slug === slug);
  const regionCaseStudy = region?.relatedCaseStudy 
    ? CASE_STUDIES.find(c => c.id === region.relatedCaseStudy) 
    : null;

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [slug]);

  if (!region) {
    return <div className="min-h-screen pt-32 text-center">Region Not Found</div>;
  }

  return (
    <>
      <JsonLd 
        data={{
          title: `Digital Marketing Agency in ${region.name} | Qognition`,
          description: `Premier digital growth agency serving ${region.name}. ${region.localStrategy}`,
          url: `/regions/${region.slug}`,
          type: "Place"
        }}
      />
      
      <div className="min-h-screen pt-32 px-6 md:px-12 max-w-7xl mx-auto pb-32">
        <Link to="/regions" className="inline-flex items-center gap-2 text-gray-400 hover:text-white mb-12">
            <ArrowLeft size={16} /> Back to Regions
        </Link>

        <div className="text-center mb-24">
            <span className="text-teal-400 font-bold uppercase tracking-widest mb-4 block">Global Presence</span>
            <h1 className="font-display text-6xl md:text-9xl mb-8">{region.name}</h1>
            <p className="text-2xl text-gray-400 max-w-2xl mx-auto">
                Helping brands in the {region.name} market scale through AI-driven digital strategies.
            </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-12 gap-16 border-t border-white/10 pt-16">
            <div className="md:col-span-8">
                <section className="mb-16">
                     <h2 className="font-display text-4xl mb-6">Regional Strategy</h2>
                     <p className="text-xl text-gray-300 leading-relaxed border-l-2 border-teal-400 pl-6">
                         {region.localStrategy}
                     </p>
                </section>

                <section className="mb-16">
                    <h2 className="font-display text-3xl mb-8 flex items-center gap-3">
                         <TrendingUp className="text-teal-400" /> Success Metrics
                    </h2>
                    <div className="grid grid-cols-2 gap-6 md:gap-8">
                        {region.stats.map(stat => (
                            <div key={stat.label} className="p-8 bg-gradient-to-br from-teal-900/20 to-transparent border border-teal-500/20 rounded-xl">
                                <div className="text-3xl md:text-5xl font-bold text-white mb-2">{stat.value}</div>
                                <div className="text-sm text-gray-400 uppercase tracking-widest">{stat.label}</div>
                            </div>
                        ))}
                    </div>
                </section>

                <section className="mb-16">
                    <h2 className="font-display text-3xl mb-6 flex items-center gap-3">
                        <BarChart3 className="text-teal-400" /> Market Dynamics
                    </h2>
                    <p className="text-gray-300 leading-relaxed text-lg mb-8">
                        {region.marketDynamics}
                    </p>
                </section>

                <section className="mb-16">
                    <h2 className="font-display text-3xl mb-6 flex items-center gap-3">
                        <Radio className="text-teal-400" /> Competitive Landscape
                    </h2>
                    <p className="text-gray-300 leading-relaxed text-lg mb-8">
                        {region.competitiveLandscape}
                    </p>
                </section>

                <section className="mb-16">
                    <h2 className="font-display text-3xl mb-6 flex items-center gap-3">
                        <Info className="text-teal-400" /> Strategic Insights
                    </h2>
                    <ul className="grid gap-4">
                        {region.localInsights.map((insight, index) => (
                             <li key={index} className="bg-white/5 border border-white/10 p-6 rounded-lg flex gap-4">
                                <span className="text-teal-400 font-mono text-xl">0{index + 1}</span>
                                <p className="text-gray-300">{insight}</p>
                             </li>
                        ))}
                    </ul>
                </section>

                {/* Regional Success Story / Case Study */}
                {regionCaseStudy && (
                  <section className="mb-24 mt-24">
                     <div className="flex justify-between items-end mb-8">
                        <h2 className="font-display text-3xl md:text-4xl">Success in {region.name}</h2>
                        <Link to="/work" className="text-teal-400 hover:text-white transition-colors text-sm uppercase tracking-wider hidden md:block">
                            View All Case Studies
                        </Link>
                     </div>
                     <div className="bg-black border border-white/10 rounded-2xl overflow-hidden group hover:border-teal-400/50 transition-colors duration-500">
                        <div className="grid grid-cols-1 md:grid-cols-2">
                           <div className="h-64 md:h-auto overflow-hidden">
                              <ParallaxImage src={regionCaseStudy.image} alt={regionCaseStudy.title} className="h-full w-full object-cover" />
                           </div>
                           <div className="p-8 md:p-12 flex flex-col justify-center">
                              <span className="text-teal-400 text-xs font-bold uppercase tracking-widest mb-4">Featured Case Study</span>
                              <h3 className="font-display text-3xl mb-6 leading-tight group-hover:text-teal-400 transition-colors">{regionCaseStudy.title}</h3>
                              <p className="text-gray-400 mb-8">Helping {regionCaseStudy.client} dominate the {regionCaseStudy.industry} sector with precision marketing.</p>
                              
                              <div className="flex gap-8 mb-8">
                                 {regionCaseStudy.stats.map(stat => (
                                    <div key={stat.label}>
                                       <div className="text-2xl font-bold text-white">{stat.value}</div>
                                       <div className="text-xs text-gray-500 uppercase">{stat.label}</div>
                                    </div>
                                 ))}
                              </div>

                              <Link to={`/work/${regionCaseStudy.id}`} className="inline-flex items-center gap-2 text-white border-b border-white/20 pb-1 self-start hover:border-teal-400 hover:text-teal-400 transition-colors">
                                 Read Full Story <ArrowRight size={16} />
                              </Link>
                           </div>
                        </div>
                     </div>
                  </section>
                )}

                <section className="mb-16">
                    <h2 className="font-display text-3xl mb-6">Market Focus</h2>
                    <p className="text-gray-400 mb-8">
                        Our {region.name} teams specialize in high-growth verticals tailored to the local economy.
                    </p>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        {region.marketFocus.map(focus => (
                            <div key={focus} className="flex items-center gap-3 p-4 bg-white/5 rounded-lg border border-white/10">
                                <TrendingUp className="text-teal-400" size={20} />
                                <span className="text-lg font-bold">{focus}</span>
                            </div>
                        ))}
                    </div>
                </section>

                <section className="mb-16">
                    <h2 className="font-display text-3xl mb-6">Local Services</h2>
                    <p className="text-gray-400 mb-6">Popular services in {region.name}:</p>
                    <div className="flex flex-wrap gap-4">
                        <Link to="/services/seo" className="px-4 py-2 border border-white/20 rounded-full hover:bg-white hover:text-black transition-colors">SEO</Link>
                        <Link to="/services/ppc" className="px-4 py-2 border border-white/20 rounded-full hover:bg-white hover:text-black transition-colors">PPC</Link>
                        <Link to="/services/web-development" className="px-4 py-2 border border-white/20 rounded-full hover:bg-white hover:text-black transition-colors">Web Dev</Link>
                    </div>
                </section>

                <section>
                    <h2 className="font-display text-4xl mb-8">FAQs</h2>
                    <div className="border-t border-white/10">
                        {region.faqs.map((faq, i) => (
                            <AccordionItem key={i} question={faq.question} answer={faq.answer} />
                        ))}
                    </div>
                </section>
            </div>
            
            <div className="md:col-span-4">
                <div className="bg-white/5 border border-white/10 p-8 rounded-2xl sticky top-32">
                    <MapPin size={48} className="text-teal-400 mb-6" />
                    <h3 className="font-display text-3xl mb-4">{region.name} HQ</h3>
                    <p className="text-gray-400 mb-4">{region.description}</p>
                    <div className="flex items-center gap-2 text-sm text-gray-500 mb-8 font-mono">
                        <Globe size={14} />
                        {region.officeCoordinates}
                    </div>
                    <a href={CALENDLY_LINK} target="_blank" rel="noopener noreferrer">
                        <MagneticButton variant="primary" className="w-full">Schedule {region.name} Call</MagneticButton>
                    </a>
                </div>
            </div>
        </div>
      </div>
    </>
  );
};

export default RegionDetail;