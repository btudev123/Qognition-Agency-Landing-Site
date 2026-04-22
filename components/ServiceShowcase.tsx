import React, { useState, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import { SERVICES } from '../constants';

const ServiceShowcase: React.FC = () => {
  const [activeService, setActiveService] = useState<number | null>(null);
  const [cursorPos, setCursorPos] = useState({ x: 0, y: 0 });
  const containerRef = useRef<HTMLDivElement>(null);

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    setCursorPos({
      x: e.clientX - rect.left,
      y: e.clientY - rect.top
    });
  };

  return (
    <section 
      ref={containerRef}
      onMouseMove={handleMouseMove}
      className="py-24 px-6 md:px-12 border-t border-white/10 relative overflow-hidden"
    >
      <div className="max-w-7xl mx-auto relative z-10">
        <div className="flex flex-col md:flex-row justify-between items-end mb-16">
          <h2 className="font-display text-4xl md:text-6xl">Our Expertise</h2>
          <Link to="/services" className="text-teal-400 hover:text-white transition-colors mt-4 md:mt-0 flex items-center gap-2">
            View all services <ArrowRight size={16}/>
          </Link>
        </div>

        {/* Desktop Cursor Follower Image */}
        <div className="hidden md:block absolute pointer-events-none z-0 mix-blend-difference"
             style={{ 
               top: 0, 
               left: 0, 
               width: '100%', 
               height: '100%' 
             }}>
          <motion.div
            className="fixed w-[400px] h-[300px] rounded-xl overflow-hidden pointer-events-none z-20"
            animate={{
              x: cursorPos.x + 20,
              y: cursorPos.y - 150,
              opacity: activeService !== null ? 1 : 0,
              scale: activeService !== null ? 1 : 0.8,
            }}
            transition={{
              type: "spring",
              stiffness: 150,
              damping: 15,
              mass: 0.1
            }}
            style={{ position: 'absolute' }}
          >
             <AnimatePresence mode='wait'>
                {activeService !== null && (
                  <motion.div
                    key={activeService}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.2 }}
                    className="w-full h-full bg-teal-900 flex items-center justify-center text-teal-400 border border-teal-500/30"
                  >
                     {/* Placeholder for service imagery - using abstract patterns or icons in real app */}
                     <div className="bg-gradient-to-br from-teal-900 to-black w-full h-full flex flex-col items-center justify-center p-8">
                        <span className="font-display text-4xl mb-2">{SERVICES[activeService].title}</span>
                        <div className="text-sm uppercase tracking-widest border-t border-teal-500/50 pt-4 mt-4 w-full text-center">
                          {SERVICES[activeService].kpis[0]}
                        </div>
                     </div>
                  </motion.div>
                )}
             </AnimatePresence>
          </motion.div>
        </div>

        {/* List Layout */}
        <div className="flex flex-col">
          {SERVICES.map((service, index) => (
            <Link 
              key={service.id} 
              to="/services"
              className="group relative border-b border-white/10 py-12 transition-colors hover:bg-white/5 md:hover:bg-transparent"
              onMouseEnter={() => setActiveService(index)}
              onMouseLeave={() => setActiveService(null)}
            >
              <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 relative z-10">
                <div className="flex items-baseline gap-8">
                  <span className="font-mono text-sm text-teal-400/50 group-hover:text-teal-400 transition-colors">0{index + 1}</span>
                  <h3 className="font-display text-3xl md:text-5xl group-hover:translate-x-4 transition-transform duration-500">{service.title}</h3>
                </div>
                
                <div className="flex items-center gap-12 md:opacity-0 group-hover:opacity-100 transition-opacity duration-500 transform md:translate-x-10 group-hover:translate-x-0">
                  <p className="hidden md:block text-sm text-gray-400 max-w-xs text-right">
                    {service.shortDescription}
                  </p>
                  <div className="w-12 h-12 rounded-full border border-white/20 flex items-center justify-center group-hover:bg-teal-400 group-hover:border-teal-400 group-hover:text-black transition-all">
                    <ArrowRight size={20} className="-rotate-45 group-hover:rotate-0 transition-transform duration-500"/>
                  </div>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ServiceShowcase;