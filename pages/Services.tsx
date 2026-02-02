import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { ArrowRight, Search, Globe, Brain, Code, Zap } from 'lucide-react';
import { SERVICES } from '../constants';
import JsonLd from '../components/JsonLd';

// Icon mapping for dynamic rendering
const IconMap: { [key: string]: React.ElementType } = {
  'Search': Search,
  'Globe': Globe,
  'Brain': Brain,
  'Code': Code,
  'Zap': Zap,
};

const Services: React.FC = () => {
  return (
    <>
      <JsonLd 
        data={{
          title: "Services | Qognition Agency",
          description: "Full-service digital capabilities including SEO, PPC, Web Development, and AI Integration.",
          url: "/services",
          type: "Service"
        }}
      />
      
      <div className="pt-32 px-6 md:px-12 max-w-7xl mx-auto pb-32">
        <header className="mb-24 text-center">
          <motion.div
             initial={{ opacity: 0, scale: 0.9 }}
             animate={{ opacity: 1, scale: 1 }}
             className="inline-block mb-6 px-4 py-2 rounded-full border border-teal-500/20 bg-teal-500/5 text-teal-400 text-sm font-mono"
          >
            // SYSTEM.CAPABILITIES
          </motion.div>
          <h1 className="font-display text-6xl md:text-8xl mb-8">Our Expertise</h1>
          <p className="text-xl md:text-2xl text-gray-400 max-w-3xl mx-auto">
            A comprehensive suite of digital growth services, engineered for enterprise scale and startup agility.
          </p>
        </header>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {SERVICES.map((service, index) => {
                const IconComponent = IconMap[service.icon] || Search;
                
                return (
                  <Link to={`/services/${service.id}`} key={service.id} className="group block h-full">
                      <motion.div 
                          initial={{ opacity: 0, y: 20 }}
                          whileInView={{ opacity: 1, y: 0 }}
                          whileHover="hover"
                          viewport={{ once: true }}
                          transition={{ delay: index * 0.05 }}
                          variants={{
                            hover: { y: -8 }
                          }}
                          className="h-full p-8 border border-white/10 rounded-xl bg-white/5 relative overflow-hidden transition-colors duration-500 hover:border-teal-400/40"
                      >
                          {/* Animated Gradient Background on Hover */}
                          <motion.div 
                            variants={{
                                hover: { opacity: 0.15, scale: 1.2 }
                            }}
                            initial={{ opacity: 0, scale: 0.8 }}
                            transition={{ duration: 0.5 }}
                            className="absolute -top-10 -right-10 w-64 h-64 bg-teal-400 blur-[80px] rounded-full pointer-events-none"
                          />

                          <div className="mb-8 flex justify-between items-start relative z-10">
                               <motion.div 
                                 className="text-teal-400"
                                 variants={{
                                     hover: { scale: 1.1, rotate: 5, color: '#ffffff' }
                                 }}
                                 transition={{ type: "spring", stiffness: 300 }}
                               >
                                   <div className="w-16 h-16 rounded-2xl bg-black border border-white/10 flex items-center justify-center group-hover:bg-teal-500 group-hover:border-teal-400 transition-colors duration-300 shadow-xl">
                                       <IconComponent size={32} />
                                   </div>
                               </motion.div>
                               
                               {/* Interactive Arrow Cue */}
                               <motion.div
                                 variants={{
                                     hover: { x: 0, opacity: 1 }
                                 }}
                                 initial={{ x: -10, opacity: 0 }}
                                 className="w-10 h-10 rounded-full border border-teal-400/30 flex items-center justify-center text-teal-400"
                               >
                                  <ArrowRight size={18} />
                               </motion.div>
                          </div>
                          
                          <div className="relative z-10">
                              <h3 className="font-display text-3xl mb-4 group-hover:text-teal-400 transition-colors">{service.title}</h3>
                              <p className="text-gray-400 text-base leading-relaxed mb-8 group-hover:text-gray-300 transition-colors">
                                  {service.shortDescription}
                              </p>
                              
                              <div className="flex flex-wrap gap-2">
                                  {service.subServices.slice(0, 3).map((sub, i) => (
                                      <span key={i} className="text-xs px-2 py-1 bg-black/50 border border-white/10 rounded text-gray-500 group-hover:border-teal-400/30 group-hover:text-teal-200 transition-colors">
                                          {sub.name}
                                      </span>
                                  ))}
                              </div>
                          </div>
                      </motion.div>
                  </Link>
                );
            })}
        </div>
      </div>
    </>
  );
};

export default Services;