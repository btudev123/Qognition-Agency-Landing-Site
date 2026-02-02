import React from 'react';
import { motion } from 'framer-motion';
import { CLIENT_LOGOS } from '../constants';

const ClientLogos: React.FC = () => {
  return (
    <section className="py-12 border-b border-white/5 bg-black/50 overflow-hidden">
      <div className="max-w-7xl mx-auto px-6 mb-8 text-center">
        <p className="text-sm uppercase tracking-widest text-gray-500">Trusted by Global Brands</p>
      </div>
      <div className="relative flex overflow-x-hidden group">
        <div className="flex animate-marquee whitespace-nowrap">
          {/* Repeat list twice for seamless loop */}
          {[...CLIENT_LOGOS, ...CLIENT_LOGOS, ...CLIENT_LOGOS].map((logo, index) => (
            <div key={index} className="mx-12 opacity-50 hover:opacity-100 transition-opacity duration-300">
               <span className="text-2xl font-display font-bold text-white">{logo.name}</span>
            </div>
          ))}
        </div>
        <div className="absolute top-0 flex animate-marquee2 whitespace-nowrap">
           {[...CLIENT_LOGOS, ...CLIENT_LOGOS, ...CLIENT_LOGOS].map((logo, index) => (
            <div key={index} className="mx-12 opacity-50 hover:opacity-100 transition-opacity duration-300">
               <span className="text-2xl font-display font-bold text-white">{logo.name}</span>
            </div>
          ))}
        </div>
      </div>
      <style>{`
        .animate-marquee {
          animation: marquee 25s linear infinite;
        }
        .animate-marquee2 {
          animation: marquee2 25s linear infinite;
        }
        @keyframes marquee {
          0% { transform: translateX(0%); }
          100% { transform: translateX(-100%); }
        }
        @keyframes marquee2 {
          0% { transform: translateX(100%); }
          100% { transform: translateX(0%); }
        }
      `}</style>
    </section>
  );
};

export default ClientLogos;