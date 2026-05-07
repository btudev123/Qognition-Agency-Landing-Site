
import React from 'react';
import { motion } from 'framer-motion';
import { Link } from '../lib/routerCompat';
import { ArrowRight } from 'lucide-react';
import { INDUSTRIES } from '../constants';
import SEO from '../components/SEO';

const Industries: React.FC = () => {
  return (
    <>
      <SEO 
        title="Industries We Serve | Expert Digital Marketing"
        description="Specialized digital marketing for tech, healthcare, finance & e-commerce. Get industry-tailored strategies that drive results. Request a free consultation today!"
        path="/industries"
        schemaData={{
          type: "WebSite",
          name: "Industries We Serve",
          url: "https://www.qognitionagency.com/industries"
        }}
      />
      
      <div className="pt-32 px-6 md:px-12 max-w-7xl mx-auto pb-32">
        <header className="mb-24 text-center">
          <h1 className="font-display text-6xl md:text-8xl mb-8">Sectors</h1>
          <p className="text-xl md:text-2xl text-gray-400 max-w-3xl mx-auto">
            Deep vertical expertise. We understand the regulatory landscapes and buyer journeys of your specific industry.
          </p>
        </header>

        {/* Industry Introduction */}
        <div className="mb-20 max-w-4xl mx-auto text-center">
          <p className="text-lg text-gray-300 leading-relaxed mb-8">
            At Qognition Agency, we believe that successful digital marketing requires a deep understanding of the industries we serve. Each sector has its unique challenges, competitive landscape, and customer behaviors. Our team has accumulated years of experience working with businesses across diverse industries, allowing us to develop specialized strategies that resonate with your target audience.
          </p>
          <p className="text-lg text-gray-300 leading-relaxed">
            Whether you're in <Link to="/industries/financial-services" className="text-teal-400 hover:underline">finance</Link>, <Link to="/industries/care-homes" className="text-teal-400 hover:underline">care</Link>, <Link to="/industries/manufacturing" className="text-teal-400 hover:underline">manufacturing</Link>, or <Link to="/industries/real-estate" className="text-teal-400 hover:underline">real estate</Link>, we have the expertise to help you achieve your digital marketing goals. Our data-driven approach ensures that every strategy is backed by insights and optimized for results.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {INDUSTRIES.map((ind, index) => (
                <div key={ind.id} className="p-12 border border-white/10 rounded-2xl bg-gradient-to-br from-white/5 to-transparent hover:border-teal-400/30 transition-colors group relative">
                     <h2 className="font-display text-3xl mb-6">{ind.name}</h2>
                     <p className="text-gray-400 mb-8 text-lg">{ind.description}</p>
                     
                     <div className="mb-8">
                        <h4 className="text-xs font-bold uppercase tracking-widest text-teal-400 mb-4">Focus Areas</h4>
                        <div className="flex flex-wrap gap-3">
                            {ind.subIndustries.slice(0, 4).map(sub => (
                                <Link key={sub.slug} to={`/industries/${ind.id}/${sub.slug}`} className="px-3 py-1 bg-black/40 border border-white/10 rounded-full text-sm text-gray-300 hover:text-teal-400 hover:border-teal-400 transition-colors">
                                    {sub.name}
                                </Link>
                            ))}
                            {ind.subIndustries.length > 4 && (
                                <Link to={`/industries/${ind.id}`} className="px-3 py-1 text-sm text-gray-500 hover:text-white transition-colors">+{ind.subIndustries.length - 4} more</Link>
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

        {/* CTA Section */}
        <div className="mt-20 text-center">
          <h2 className="font-display text-3xl mb-6">Don't see your industry?</h2>
          <p className="text-gray-400 mb-8 max-w-2xl mx-auto">
            We have experience across many more sectors. Contact us to discuss your specific needs.
          </p>
          <div className="flex gap-4 justify-center">
            <Link to="/contact" className="px-8 py-4 bg-teal-400 text-black font-bold rounded-full hover:bg-teal-300 transition-colors">
              Get in Touch
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

export default Industries;
