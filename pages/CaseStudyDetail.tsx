import React, { useEffect } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowLeft, ArrowRight, CheckCircle2 } from 'lucide-react';
import { CASE_STUDIES, CALENDLY_LINK } from '../constants';
import MagneticButton from '../components/MagneticButton';
import JsonLd from '../components/JsonLd';
import ParallaxImage from '../components/ParallaxImage';

const CaseStudyDetail: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const study = CASE_STUDIES.find(s => s.id === id);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [id]);

  if (!study) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center">
        <h2 className="text-2xl mb-4">Case Study Not Found</h2>
        <MagneticButton onClick={() => navigate('/work')}>Back to Work</MagneticButton>
      </div>
    );
  }

  return (
    <>
      <JsonLd 
        data={{
          title: `${study.title} | Qognition Case Study`,
          description: `How we helped ${study.client} achieve ${study.stats[0].value} ${study.stats[0].label}.`,
          url: `/work/${study.id}`,
          type: "Article"
        }}
      />

      <article className="min-h-screen pt-24 md:pt-32">
        {/* Header */}
        <div className="px-6 md:px-12 max-w-8xl mx-auto mb-16 md:mb-24">
          <Link to="/work" className="inline-flex items-center gap-2 text-gray-400 hover:text-white transition-colors mb-8 group">
            <ArrowLeft size={16} className="group-hover:-translate-x-1 transition-transform"/> Back to Work
          </Link>
          
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-end">
            <div className="lg:col-span-8">
              <motion.div 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="flex items-center gap-3 mb-6"
              >
                <span className="w-2 h-2 rounded-full bg-teal-400"></span>
                <span className="uppercase tracking-widest text-xs font-bold text-teal-400">{study.industry}</span>
              </motion.div>
              
              <h1 className="font-display text-4xl md:text-7xl lg:text-8xl leading-none mb-8">
                {study.title}
              </h1>
            </div>
            
            <div className="lg:col-span-4 lg:mb-4">
              <p className="text-xl text-gray-300 border-l border-teal-500/30 pl-6">
                A strategic partnership focused on scaling {study.client}'s digital presence through engineering and design.
              </p>
            </div>
          </div>
        </div>

        {/* Hero Image */}
        <div className="px-4 md:px-12 max-w-[1920px] mx-auto mb-24 md:mb-32">
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1, ease: [0.22, 1, 0.36, 1] }}
            className="rounded-2xl overflow-hidden"
          >
            <ParallaxImage src={study.image} alt={study.title} aspectRatio="aspect-[21/9]" />
          </motion.div>
        </div>

        {/* Content Grid */}
        <div className="px-6 md:px-12 max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-12 gap-12 md:gap-24 mb-32">
          {/* Sidebar */}
          <div className="md:col-span-4 space-y-12">
            <div className="p-8 border border-white/10 rounded-lg bg-white/5 backdrop-blur-sm sticky top-32">
              <h3 className="font-display text-2xl mb-8">Key Metrics</h3>
              <div className="space-y-8">
                {study.stats.map((stat, i) => (
                  <div key={i} className="border-b border-white/10 pb-6 last:border-0 last:pb-0">
                    <div className="text-4xl md:text-5xl font-bold text-teal-400 mb-2">{stat.value}</div>
                    <div className="text-sm uppercase tracking-wider text-gray-400">{stat.label}</div>
                  </div>
                ))}
              </div>
            </div>

            <div>
              <h4 className="font-bold text-sm uppercase tracking-wider text-gray-500 mb-4">Services Provided</h4>
              <div className="flex flex-wrap gap-2">
                {study.tags.map(tag => (
                  <span key={tag} className="px-3 py-1 bg-white/5 border border-white/10 rounded-full text-sm">
                    {tag}
                  </span>
                ))}
              </div>
            </div>
          </div>

          {/* Main Copy */}
          <div className="md:col-span-8 space-y-16">
            <section>
              <h2 className="font-display text-3xl md:text-4xl mb-6">The Challenge</h2>
              <p className="text-lg text-gray-300 leading-relaxed">
                In an increasingly crowded {study.industry} market, {study.client} needed to differentiate themselves not just through product, but through digital experience. The existing infrastructure was limiting SEO growth and conversion rates were stagnating despite increased ad spend.
              </p>
            </section>

            <section>
              <h2 className="font-display text-3xl md:text-4xl mb-6">Our Solution</h2>
              <p className="text-lg text-gray-300 leading-relaxed mb-6">
                We engineered a bespoke solution focusing on three core pillars:
              </p>
              <ul className="space-y-4">
                {['Technical Architecture Overhaul', 'AI-Driven Content Strategy', 'Conversion Rate Optimization'].map((item, i) => (
                  <li key={i} className="flex items-start gap-3">
                    <CheckCircle2 className="text-teal-400 mt-1 shrink-0" size={20} />
                    <span className="text-gray-300">{item}</span>
                  </li>
                ))}
              </ul>
            </section>

            <section className="bg-teal-900/10 p-8 md:p-12 rounded-2xl border border-teal-500/10 my-8">
              <h3 className="font-display text-2xl mb-4 text-teal-400">The Impact</h3>
              <p className="text-xl md:text-2xl leading-relaxed">
                "Qognition didn't just build a website; they built a growth engine. The results were immediate and sustained."
              </p>
              <div className="mt-6 text-sm text-gray-500 font-bold uppercase tracking-wider">
                — VP of Marketing, {study.client}
              </div>
            </section>

            <div className="pt-12 border-t border-white/10">
               <h3 className="font-display text-3xl mb-6">Ready for similar results?</h3>
               <a href={CALENDLY_LINK} target="_blank" rel="noopener noreferrer">
                 <MagneticButton variant="primary">Schedule Strategy Call</MagneticButton>
               </a>
            </div>
          </div>
        </div>

        {/* Next Project (Simple Navigation) */}
        <div className="border-t border-white/10">
          <Link to="/work" className="block py-24 px-6 md:px-12 hover:bg-white/5 transition-colors group">
            <div className="max-w-7xl mx-auto flex justify-between items-center">
              <div>
                <span className="text-sm text-gray-500 uppercase tracking-widest mb-2 block">Next Project</span>
                <span className="font-display text-4xl md:text-6xl group-hover:text-teal-400 transition-colors">View All Work</span>
              </div>
              <div className="w-16 h-16 rounded-full border border-white/20 flex items-center justify-center group-hover:bg-white group-hover:text-black transition-all">
                 <ArrowRight size={24} />
              </div>
            </div>
          </Link>
        </div>
      </article>
    </>
  );
};

export default CaseStudyDetail;