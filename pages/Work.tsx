import React from 'react';
import { motion, Variants } from 'framer-motion';
import { Link } from 'react-router-dom';
import { CASE_STUDIES } from '../constants';
import JsonLd from '../components/JsonLd';
import ParallaxImage from '../components/ParallaxImage';
import { ArrowRight } from 'lucide-react';

const Work: React.FC = () => {
  const container: Variants = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15
      }
    }
  };

  const item: Variants = {
    hidden: { opacity: 0, y: 50 },
    show: { opacity: 1, y: 0, transition: { type: "spring", stiffness: 50, damping: 20 } }
  };

  return (
    <>
      <JsonLd 
        data={{
          title: "Case Studies | Qognition Agency",
          description: "See how we've helped Fintech, SaaS, and Enterprise clients achieve measurable growth.",
          url: "/work",
          type: "WebSite"
        }}
      />
      <div className="pt-24 md:pt-32 px-6 md:px-12 max-w-[1920px] mx-auto min-h-screen">
        <header className="mb-24 max-w-7xl mx-auto text-center md:text-left">
          <motion.h1 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="font-display text-6xl md:text-9xl mb-8"
          >
            Selected Work
          </motion.h1>
          <motion.p 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2 }}
            className="text-xl md:text-2xl text-gray-400 max-w-2xl"
          >
            Real results for ambitious brands. We let the metrics speak for themselves.
          </motion.p>
        </header>

        <motion.div 
          variants={container}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: "-10%" }}
          className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-x-16 md:gap-y-32 max-w-7xl mx-auto pb-32"
        >
          {CASE_STUDIES.map((study, index) => (
            <motion.div 
              key={study.id}
              variants={item}
              className={`group cursor-pointer ${index === 0 ? 'md:col-span-2' : ''}`}
            >
              <Link to={`/work/${study.id}`} className="block">
                <div className="relative overflow-hidden rounded-xl mb-8 aspect-video md:aspect-[16/10]">
                  <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors z-10 duration-500"></div>
                  <div className="absolute top-4 right-4 z-20 w-12 h-12 bg-white rounded-full flex items-center justify-center opacity-0 translate-y-4 group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-300">
                    <ArrowRight className="text-black" size={20} />
                  </div>
                  <ParallaxImage src={study.image} alt={study.title} className="transition-transform duration-700" />
                </div>
                
                <div className="flex flex-col gap-4">
                  <div className="flex items-center justify-between border-b border-white/10 pb-4">
                     <span className="text-teal-400 text-sm font-bold uppercase tracking-wider">{study.client}</span>
                     <span className="text-xs text-gray-500 uppercase tracking-widest">{study.industry}</span>
                  </div>
                  
                  <h3 className="font-display text-3xl md:text-5xl group-hover:text-teal-400 transition-colors duration-300">
                    {study.title}
                  </h3>
                  
                  <div className="flex gap-2 flex-wrap mt-2">
                     {study.tags.map(tag => (
                       <span key={tag} className="px-3 py-1 border border-white/10 bg-white/5 rounded-full text-xs text-gray-400">
                         {tag}
                       </span>
                     ))}
                  </div>
                </div>
              </Link>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </>
  );
};

export default Work;