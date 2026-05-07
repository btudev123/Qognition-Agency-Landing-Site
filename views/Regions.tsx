import React from 'react';
import { motion } from 'framer-motion';
import { Link } from '../lib/routerCompat';
import { ArrowRight, Globe, MapPin, TrendingUp } from 'lucide-react';
import { REGIONS } from '../constants';
import SEO from '../components/SEO';

const Regions: React.FC = () => {
  return (
    <>
      <SEO 
        title="Global Offices | Digital Marketing Agency Near You"
        description="Qognition has offices in London, New York, Dubai & Mumbai. Get local expertise with global scale. Contact us for a free consultation in your region!"
        path="/regions"
        schemaData={{
          type: "Organization",
          name: "Global Presence",
          url: "https://www.qognitionagency.com/regions"
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

        {/* Introduction */}
        <div className="mb-20 max-w-4xl mx-auto text-center">
          <p className="text-lg text-gray-300 leading-relaxed mb-6">
            At Qognition Agency, we believe that great digital marketing requires both global perspective and local understanding. Our strategically located offices allow clients across multiple time zones while us to serve understanding the unique characteristics of each market.
          </p>
          <p className="text-lg text-gray-300 leading-relaxed">
            Whether you're based in <Link to="/locations/london" className="text-teal-400 hover:underline">London</Link>, <Link to="/locations/new-york" className="text-teal-400 hover:underline">New York</Link>, <Link to="/locations/dubai" className="text-teal-400 hover:underline">Dubai</Link>, or <Link to="/locations/mumbai" className="text-teal-400 hover:underline">Mumbai</Link>, our team is ready to help you achieve digital marketing success. Each office is staffed with local experts who understand the regional market dynamics, cultural nuances, and business practices.
          </p>
        </div>

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

        {/* CTA */}
        <div className="mt-20 text-center">
          <h2 className="font-display text-3xl mb-6">Need support in a specific region?</h2>
          <p className="text-gray-400 mb-8 max-w-2xl mx-auto">
            Our team can provide localized strategies for virtually any market. Let's discuss your global expansion goals.
          </p>
          <div className="flex gap-4 justify-center">
            <Link to="/contact" className="px-8 py-4 bg-teal-400 text-black font-bold rounded-full hover:bg-teal-300 transition-colors">
              Contact Us
            </Link>
            <Link to="/services" className="px-8 py-4 border border-white/30 text-white font-bold rounded-full hover:bg-white/10 transition-colors">
              Our Services
            </Link>
          </div>
        </div>
      </div>
    </>
  );
};

export default Regions;
