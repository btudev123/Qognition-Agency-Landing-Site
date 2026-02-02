import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { ArrowRight, Globe, MapPin, TrendingUp } from 'lucide-react';
import { REGIONS } from '../constants';
import JsonLd from '../components/JsonLd';

const Regions: React.FC = () => {
  return (
    <>
      <JsonLd 
        data={{
          title: "Global Regions | Qognition Agency",
          description: "Our global hubs in USA, UK, UAE, Saudi Arabia, India, and Australia.",
          url: "/regions",
          type: "Organization"
        }}
      />
      
      <div className="pt-32 px-6 md:px-12 max-w-7xl mx-auto pb-32">
        <header className="mb-24 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-teal-500/30 bg-teal-500/10 text-teal-400 text-xs uppercase tracking-widest mb-6"
          >
            <Globe size={12} /> Global Network
          </motion.div>
          <motion.h1 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="font-display text-6xl md:text-8xl mb-8"
          >
            Global Hubs
          </motion.h1>
          <motion.p 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2 }}
            className="text-xl md:text-2xl text-gray-400 max-w-3xl mx-auto"
          >
            Local expertise, global scale. We operate strategically across major digital economies to deliver round-the-clock growth.
          </motion.p>
        </header>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {REGIONS.map((region, index) => (
                <Link to={`/regions/${region.slug}`} key={region.id} className="group">
                    <motion.div 
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: index * 0.1 }}
                        className="h-full p-8 border border-white/10 rounded-2xl bg-gradient-to-br from-white/5 to-transparent hover:border-teal-400/50 hover:from-teal-900/10 transition-all duration-500 relative overflow-hidden flex flex-col justify-between"
                    >
                        {/* Map Background Hint */}
                        <div className="absolute inset-0 opacity-10 group-hover:opacity-20 transition-opacity pointer-events-none">
                            <svg className="w-full h-full text-white" viewBox="0 0 100 100" preserveAspectRatio="none">
                                <path d="M0 100 L100 0" stroke="currentColor" strokeWidth="0.5" strokeDasharray="5,5" />
                            </svg>
                        </div>

                        <div>
                            <div className="flex justify-between items-start mb-8">
                                <div className="p-3 bg-black border border-white/10 rounded-lg text-teal-400 group-hover:bg-teal-400 group-hover:text-black transition-colors">
                                    <MapPin size={24} />
                                </div>
                                <div className="text-xs font-mono text-gray-500">{region.officeCoordinates}</div>
                            </div>
                            
                            <h2 className="font-display text-4xl mb-4 group-hover:translate-x-2 transition-transform duration-300">{region.name}</h2>
                            <p className="text-gray-400 mb-8 leading-relaxed">
                                {region.description}
                            </p>

                            <div className="mb-8">
                                <span className="text-xs uppercase tracking-widest text-gray-500 block mb-3">Market Focus</span>
                                <div className="flex flex-wrap gap-2">
                                    {region.marketFocus.map(focus => (
                                        <span key={focus} className="text-xs px-2 py-1 bg-white/5 border border-white/10 rounded text-gray-300">
                                            {focus}
                                        </span>
                                    ))}
                                </div>
                            </div>
                        </div>

                        <div className="flex items-center gap-2 text-teal-400 font-bold uppercase tracking-wider text-sm group-hover:gap-4 transition-all mt-auto pt-8 border-t border-white/5">
                            View Market Strategy <ArrowRight size={16} />
                        </div>
                    </motion.div>
                </Link>
            ))}
        </div>
      </div>
    </>
  );
};

export default Regions;