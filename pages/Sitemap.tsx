import React from 'react';
import { Link } from 'react-router-dom';
import { SERVICES, INDUSTRIES, REGIONS, CASE_STUDIES } from '../constants';
import JsonLd from '../components/JsonLd';
import { ArrowRight } from 'lucide-react';

const Sitemap: React.FC = () => {
  return (
    <>
      <JsonLd 
        data={{
          title: "Sitemap | Qognition Agency",
          description: "Full directory of Qognition Agency pages, services, industries, and locations.",
          url: "/sitemap",
          type: "WebSite"
        }}
      />
      
      <div className="pt-32 px-6 md:px-12 max-w-7xl mx-auto pb-32 min-h-screen">
        <header className="mb-24">
          <h1 className="font-display text-5xl md:text-7xl mb-8">Sitemap</h1>
          <p className="text-xl text-gray-400 max-w-2xl">
            A comprehensive overview of our digital ecosystem.
          </p>
        </header>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-16">
            
            {/* Core Pages */}
            <div className="space-y-6">
                <h2 className="font-display text-2xl text-teal-400 border-b border-teal-500/30 pb-4">Company</h2>
                <ul className="space-y-4">
                    <li><Link to="/" className="text-lg hover:text-teal-400 transition-colors flex items-center gap-2 group">Home <ArrowRight size={14} className="opacity-0 group-hover:opacity-100 transition-opacity"/></Link></li>
                    <li><Link to="/about" className="text-lg hover:text-teal-400 transition-colors flex items-center gap-2 group">About Us <ArrowRight size={14} className="opacity-0 group-hover:opacity-100 transition-opacity"/></Link></li>
                    <li><Link to="/contact" className="text-lg hover:text-teal-400 transition-colors flex items-center gap-2 group">Contact <ArrowRight size={14} className="opacity-0 group-hover:opacity-100 transition-opacity"/></Link></li>
                    <li><Link to="/llm" className="text-lg hover:text-teal-400 transition-colors flex items-center gap-2 group">LLM Transparency <ArrowRight size={14} className="opacity-0 group-hover:opacity-100 transition-opacity"/></Link></li>
                </ul>
            </div>

            {/* Services */}
            <div className="space-y-6">
                <h2 className="font-display text-2xl text-teal-400 border-b border-teal-500/30 pb-4">Services</h2>
                <ul className="space-y-4">
                    <li><Link to="/services" className="text-lg font-bold hover:text-teal-400 transition-colors">All Services</Link></li>
                    {SERVICES.map(service => (
                        <li key={service.id}>
                            <Link to={`/services/${service.id}`} className="text-gray-300 hover:text-white transition-colors">
                                {service.title}
                            </Link>
                        </li>
                    ))}
                </ul>
            </div>

            {/* Industries */}
            <div className="space-y-6">
                <h2 className="font-display text-2xl text-teal-400 border-b border-teal-500/30 pb-4">Industries</h2>
                <ul className="space-y-4">
                    <li><Link to="/industries" className="text-lg font-bold hover:text-teal-400 transition-colors">All Sectors</Link></li>
                    {INDUSTRIES.map(ind => (
                        <li key={ind.id}>
                            <Link to={`/industries/${ind.id}`} className="text-gray-300 hover:text-white transition-colors">
                                {ind.name}
                            </Link>
                        </li>
                    ))}
                </ul>
            </div>

            {/* Regions */}
            <div className="space-y-6">
                <h2 className="font-display text-2xl text-teal-400 border-b border-teal-500/30 pb-4">Global Hubs</h2>
                <ul className="space-y-4">
                    <li><Link to="/regions" className="text-lg font-bold hover:text-teal-400 transition-colors">All Locations</Link></li>
                    {REGIONS.map(region => (
                        <li key={region.id}>
                            <Link to={`/regions/${region.slug}`} className="text-gray-300 hover:text-white transition-colors">
                                {region.name}
                            </Link>
                        </li>
                    ))}
                </ul>
            </div>

            {/* Case Studies */}
            <div className="space-y-6">
                <h2 className="font-display text-2xl text-teal-400 border-b border-teal-500/30 pb-4">Work</h2>
                <ul className="space-y-4">
                    <li><Link to="/work" className="text-lg font-bold hover:text-teal-400 transition-colors">Case Studies Hub</Link></li>
                    {CASE_STUDIES.map(study => (
                        <li key={study.id}>
                            <Link to={`/work/${study.id}`} className="text-gray-300 hover:text-white transition-colors">
                                {study.client}: {study.title}
                            </Link>
                        </li>
                    ))}
                </ul>
            </div>

            {/* Legal */}
            <div className="space-y-6">
                <h2 className="font-display text-2xl text-teal-400 border-b border-teal-500/30 pb-4">Legal</h2>
                <ul className="space-y-4">
                    <li><span className="text-gray-500 cursor-not-allowed">Privacy Policy</span></li>
                    <li><span className="text-gray-500 cursor-not-allowed">Terms of Service</span></li>
                    <li><span className="text-gray-500 cursor-not-allowed">Cookie Policy</span></li>
                </ul>
            </div>
        </div>
      </div>
    </>
  );
};

export default Sitemap;