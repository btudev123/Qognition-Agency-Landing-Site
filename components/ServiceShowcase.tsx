import React from 'react';
import { ArrowRight } from 'lucide-react';
import { Link } from '../lib/routerCompat';
import { SERVICES } from '../data/services';

const ServiceShowcase: React.FC = () => {
  return (
    <section 
      className="py-24 px-6 md:px-12 border-t border-white/10 relative overflow-hidden"
    >
      <div className="max-w-7xl mx-auto relative z-10">
        <div className="flex flex-col md:flex-row justify-between items-end mb-16">
          <h2 className="font-display text-4xl md:text-6xl">Our Expertise</h2>
          <Link to="/services" className="text-teal-400 hover:text-white transition-colors mt-4 md:mt-0 flex items-center gap-2">
            View all services <ArrowRight size={16}/>
          </Link>
        </div>

        {/* List Layout */}
        <div className="flex flex-col">
          {SERVICES.map((service, index) => (
            <Link 
              key={service.id} 
              to="/services"
              className="group relative border-b border-white/10 py-12 transition-colors hover:bg-white/5 md:hover:bg-transparent"
            >
              <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 relative z-10">
                <div className="flex items-baseline gap-8">
                  <span className="font-mono text-sm text-teal-300 group-hover:text-teal-200 transition-colors">0{index + 1}</span>
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
