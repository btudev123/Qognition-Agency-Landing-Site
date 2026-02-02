import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';
import { INDUSTRIES } from '../constants';
import JsonLd from '../components/JsonLd';

const Industries: React.FC = () => {
  return (
    <>
      <JsonLd 
        data={{
          title: "Industries | Qognition Agency",
          description: "Specialized digital marketing for Law, Finance, Real Estate, Manufacturing, and more.",
          url: "/industries",
          type: "WebSite"
        }}
      />
      
      <div className="pt-32 px-6 md:px-12 max-w-7xl mx-auto pb-32">
        <header className="mb-24 text-center">
          <h1 className="font-display text-6xl md:text-8xl mb-8">Sectors</h1>
          <p className="text-xl md:text-2xl text-gray-400 max-w-3xl mx-auto">
            Deep vertical expertise. We understand the regulatory landscapes and buyer journeys of your specific industry.
          </p>
        </header>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {INDUSTRIES.map((ind, index) => (
                <div key={ind.id} className="p-12 border border-white/10 rounded-2xl bg-gradient-to-br from-white/5 to-transparent hover:border-teal-400/30 transition-colors group relative">
                     <h2 className="font-display text-3xl mb-6">{ind.name}</h2>
                     <p className="text-gray-400 mb-8 text-lg">{ind.description}</p>
                     
                     <div className="mb-8">
                        <h4 className="text-xs font-bold uppercase tracking-widest text-teal-400 mb-4">Focus Areas</h4>
                        <div className="flex flex-wrap gap-3">
                            {ind.subIndustries.slice(0, 4).map(sub => (
                                <span key={sub} className="px-3 py-1 bg-black/40 border border-white/10 rounded-full text-sm text-gray-300">
                                    {sub}
                                </span>
                            ))}
                            {ind.subIndustries.length > 4 && (
                                <span className="px-3 py-1 text-sm text-gray-500">+{ind.subIndustries.length - 4} more</span>
                            )}
                        </div>
                     </div>

                     <div className="flex gap-4">
                        <Link to={`/industries/${ind.id}`} className="inline-flex items-center gap-2 text-white border-b border-teal-400 pb-1 hover:gap-4 transition-all">
                            View Sector Strategy <ArrowRight size={16}/>
                        </Link>
                     </div>
                </div>
            ))}
        </div>
      </div>
    </>
  );
};

export default Industries;