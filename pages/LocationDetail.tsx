import React, { useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { ArrowLeft, Globe, MapPin, Building2, TrendingUp } from 'lucide-react';
import { REGIONS, CALENDLY_LINK } from '../constants';
import MagneticButton from '../components/MagneticButton';
import JsonLd from '../components/JsonLd';

const LocationDetail: React.FC = () => {
  const { slug } = useParams<{ slug: string }>();
  const region = REGIONS.find(r => r.slug === slug);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [slug]);

  if (!region) {
    return <div className="min-h-screen pt-32 text-center">Location Not Found</div>;
  }

  return (
    <>
      <JsonLd 
        data={{
          title: `Digital Marketing Agency in ${region.name} | Qognition`,
          description: `Premier digital growth agency serving ${region.name}. ${region.localStrategy}`,
          url: `/locations/${region.slug}`,
          type: "Place"
        }}
      />
      
      <div className="min-h-screen pt-32 px-6 md:px-12 max-w-7xl mx-auto pb-32">
        <Link to="/" className="inline-flex items-center gap-2 text-gray-400 hover:text-white mb-12">
            <ArrowLeft size={16} /> Back to Home
        </Link>

        <div className="text-center mb-24">
            <span className="text-teal-400 font-bold uppercase tracking-widest mb-4 block">Global Presence</span>
            <h1 className="font-display text-6xl md:text-9xl mb-8">{region.name}</h1>
            <p className="text-2xl text-gray-400 max-w-2xl mx-auto">
                Helping brands in the {region.name} market scale through AI-driven digital strategies.
            </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-12 gap-16 border-t border-white/10 pt-16">
            <div className="md:col-span-8">
                <section className="mb-16">
                     <h2 className="font-display text-4xl mb-6">Regional Strategy</h2>
                     <p className="text-xl text-gray-300 leading-relaxed border-l-2 border-teal-400 pl-6">
                         {region.localStrategy}
                     </p>
                </section>

                <section className="mb-16">
                    <h2 className="font-display text-4xl mb-6">Market Focus</h2>
                    <p className="text-gray-400 mb-8">
                        Our {region.name} teams specialize in high-growth verticals tailored to the local economy.
                    </p>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        {region.marketFocus.map(focus => (
                            <div key={focus} className="flex items-center gap-3 p-4 bg-white/5 rounded-lg border border-white/10">
                                <TrendingUp className="text-teal-400" size={20} />
                                <span className="text-lg font-bold">{focus}</span>
                            </div>
                        ))}
                    </div>
                </section>

                <section>
                    <h2 className="font-display text-4xl mb-6">Local Services</h2>
                    <p className="text-gray-400 mb-6">Popular services in {region.name}:</p>
                    <div className="flex flex-wrap gap-4">
                        <Link to="/services/seo" className="px-4 py-2 border border-white/20 rounded-full hover:bg-white hover:text-black transition-colors">SEO</Link>
                        <Link to="/services/ppc" className="px-4 py-2 border border-white/20 rounded-full hover:bg-white hover:text-black transition-colors">PPC</Link>
                        <Link to="/services/web-development" className="px-4 py-2 border border-white/20 rounded-full hover:bg-white hover:text-black transition-colors">Web Dev</Link>
                    </div>
                </section>
            </div>
            
            <div className="md:col-span-4">
                <div className="bg-white/5 border border-white/10 p-8 rounded-2xl sticky top-32">
                    <MapPin size={48} className="text-teal-400 mb-6" />
                    <h3 className="font-display text-3xl mb-4">{region.name} HQ</h3>
                    <p className="text-gray-400 mb-4">{region.description}</p>
                    <div className="flex items-center gap-2 text-sm text-gray-500 mb-8 font-mono">
                        <Globe size={14} />
                        {region.officeCoordinates}
                    </div>
                    <a href={CALENDLY_LINK} target="_blank" rel="noopener noreferrer">
                        <MagneticButton variant="primary" className="w-full">Schedule {region.name} Call</MagneticButton>
                    </a>
                </div>
            </div>
        </div>
      </div>
    </>
  );
};

export default LocationDetail;