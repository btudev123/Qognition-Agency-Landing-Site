import React from 'react';
import { CLIENT_LOGOS } from '../data/trust';

const ClientLogos: React.FC = () => {
  return (
    <section className="py-12 border-b border-white/5 bg-black/50 overflow-hidden">
      <div className="max-w-7xl mx-auto px-6 mb-8 text-center">
        <p className="text-sm uppercase tracking-widest text-gray-400">Trusted by Global Brands</p>
      </div>
      <div className="relative flex overflow-x-hidden group">
        <div className="flex w-max animate-brand-marquee whitespace-nowrap" aria-label="Selected brand experience">
          {CLIENT_LOGOS.map((logo) => (
            <div key={logo.name} className="mx-8 h-14 w-36 opacity-70 grayscale invert hover:opacity-100 transition-opacity duration-300">
              <img src={logo.url} alt={logo.name} className="h-full w-full object-contain" loading="lazy" decoding="async" />
            </div>
          ))}
          <div className="flex" aria-hidden="true">
            {CLIENT_LOGOS.map((logo) => (
              <div key={`${logo.name}-duplicate`} className="mx-8 h-14 w-36 opacity-70 grayscale invert transition-opacity duration-300">
                <img src={logo.url} alt="" className="h-full w-full object-contain" loading="lazy" decoding="async" />
              </div>
            ))}
          </div>
        </div>
      </div>
      <style>{`
        .animate-brand-marquee {
          animation: brand-marquee 28s linear infinite;
        }
        @keyframes brand-marquee {
          0% { transform: translateX(0%); }
          100% { transform: translateX(-50%); }
        }
      `}</style>
    </section>
  );
};

export default ClientLogos;
