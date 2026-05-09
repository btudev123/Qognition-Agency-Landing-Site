import React from 'react';
import { CLIENT_LOGOS } from '../constants';

const ClientLogos: React.FC = () => {
  const repeated = [...CLIENT_LOGOS, ...CLIENT_LOGOS];

  return (
    <section className="py-12 border-b border-white/5 bg-black/50 overflow-hidden">
      <div className="max-w-7xl mx-auto px-6 mb-8 text-center">
        <p className="text-sm uppercase tracking-widest text-gray-500">Trusted by Global Brands</p>
      </div>
      <div className="relative flex overflow-x-hidden group">
        <div className="flex animate-marquee whitespace-nowrap" aria-label="Selected brand experience">
          {repeated.map((logo, index) => (
            <div key={`${logo.name}-${index}`} className="mx-10 h-14 w-36 opacity-60 grayscale invert hover:opacity-100 transition-opacity duration-300">
               <img src={logo.url} alt={index < CLIENT_LOGOS.length ? logo.name : ''} className="h-full w-full object-contain" loading="lazy" />
            </div>
          ))}
        </div>
        <div className="absolute top-0 flex animate-marquee2 whitespace-nowrap" aria-hidden="true">
           {repeated.map((logo, index) => (
            <div key={`${logo.name}-duplicate-${index}`} className="mx-10 h-14 w-36 opacity-60 grayscale invert transition-opacity duration-300">
               <img src={logo.url} alt="" className="h-full w-full object-contain" loading="lazy" />
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
