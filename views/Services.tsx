import React from 'react';
import { motion } from 'framer-motion';
import { Link } from '../lib/routerCompat';
import { ArrowRight, Search, Globe, Brain, Code, Zap, Palette } from 'lucide-react';
import { CALENDLY_LINK, CONTACT_MAILTO, SERVICES } from '../constants';
import SEO from '../components/SEO';

// Icon mapping for dynamic rendering
const IconMap: { [key: string]: React.ElementType } = {
  'Search': Search,
  'Globe': Globe,
  'Brain': Brain,
  'Code': Code,
  'Zap': Zap,
  'Palette': Palette,
};

const subServiceSlug = (sub: { name: string; slug?: string }) =>
  sub.slug || sub.name.toLowerCase().replace(/&/g, 'and').replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '');

const Services: React.FC = () => {
  return (
    <>
      <SEO 
        title="AI Growth Marketing Services | SEO, PPC, AI SEO & Web Design"
        description="AI growth marketing services across SEO, SMM, AI SEO, web design, PPC, and branding creative. Build qualified leads, search visibility, and measurable revenue."
        path="/services"
        schemaData={{
          type: "Service",
          name: "Digital Marketing Services",
          url: "https://www.qognitionagency.com/services"
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
            An AI growth marketing partner for companies that need qualified leads, stronger search visibility, better creative, and measurable revenue systems.
          </p>
        </header>

        {/* Introduction Content */}
        <div className="mb-20 max-w-4xl mx-auto text-center">
          <p className="text-lg text-gray-300 leading-relaxed mb-8">
            Qognition builds the growth system around your buyer journey: technical SEO, AI search visibility, paid acquisition, social distribution, conversion websites, and brand creative all connected to measurable pipeline.
          </p>
          <p className="text-lg text-gray-300 leading-relaxed">
            Whether you need to rank in Google, appear in AI answers, enter a new location, improve paid media efficiency, or turn a better brand into booked calls, our service pages below connect the strategy, sub-services, proof, tools, and next steps. <Link to={CONTACT_MAILTO} className="text-teal-400 hover:underline">Email us</Link> or book a strategy call when you are ready.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {SERVICES.map((service, index) => {
                const IconComponent = IconMap[service.icon] || Search;
                
                return (
                  <motion.article
                          key={service.id}
                          initial={{ opacity: 0, y: 20 }}
                          whileInView={{ opacity: 1, y: 0 }}
                          whileHover="hover"
                          viewport={{ once: true }}
                          transition={{ delay: index * 0.05 }}
                          variants={{
                            hover: { y: -8 }
                          }}
                          className="group h-full p-8 border border-white/10 rounded-xl bg-white/5 relative overflow-hidden transition-colors duration-500 hover:border-teal-400/40"
                      >
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
                              <h2 className="font-display text-3xl mb-4 group-hover:text-teal-400 transition-colors">
                                <Link to={`/services/${service.id}`}>{service.title.replace('Web Development', 'Web Design')}</Link>
                              </h2>
                              <p className="text-gray-400 text-base leading-relaxed mb-8 group-hover:text-gray-300 transition-colors">
                                  {service.shortDescription}
                              </p>
                              
                              <div className="flex flex-wrap gap-2">
                                  {service.subServices.slice(0, 6).map((sub, i) => (
                                      <Link
                                        key={i}
                                        to={`/services/${service.id}/${subServiceSlug(sub)}`}
                                        className="text-xs px-2 py-1 bg-black/50 border border-white/10 rounded text-gray-400 hover:border-teal-400/60 hover:text-teal-200 transition-colors"
                                      >
                                          {sub.name}
                                      </Link>
                                  ))}
                              </div>
                              <Link to={`/services/${service.id}`} className="mt-8 inline-flex items-center gap-2 text-sm font-bold uppercase tracking-widest text-teal-400 hover:text-white">
                                View service <ArrowRight size={14} />
                              </Link>
                          </div>
                      </motion.article>
                );
            })}
        </div>

        {/* Why Choose Our Services */}
        <div className="mt-32">
          <div className="text-center mb-16">
            <h2 className="font-display text-4xl md:text-5xl mb-6">Why Choose Our Services?</h2>
            <p className="text-gray-400 max-w-2xl mx-auto">
              We connect each channel to pipeline, attribution, search visibility, and the conversion actions your team can actually use.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="p-8 border border-white/10 rounded-xl bg-white/5">
              <h3 className="font-display text-2xl mb-4 text-teal-400">Proven Results</h3>
              <p className="text-gray-400 mb-4">Our track record speaks for itself. We've helped hundreds of clients achieve significant growth in their digital presence. From increasing organic traffic by over 200% to generating qualified leads that convert at higher rates, our results-driven approach delivers measurable outcomes.</p>
              <Link to="/case-studies" className="text-teal-400 hover:underline">View our case studies →</Link>
            </div>
            <div className="p-8 border border-white/10 rounded-xl bg-white/5">
              <h3 className="font-display text-2xl mb-4 text-teal-400">AI Growth Partner</h3>
              <p className="text-gray-400 mb-4">When you work with Qognition, you get strategy, engineering, SEO, content, creative, and paid media leadership focused on the same revenue model instead of disconnected channel work.</p>
              <Link to="/team" className="text-teal-400 hover:underline">Meet our team →</Link>
            </div>
            <div className="p-8 border border-white/10 rounded-xl bg-white/5">
              <h3 className="font-display text-2xl mb-4 text-teal-400">Transparent Reporting</h3>
              <p className="text-gray-400 mb-4">We believe in complete transparency. You'll receive detailed reports showing exactly how your campaigns are performing, with clear insights and recommendations for improvement. No hidden fees, no surprise charges.</p>
              <a href={CALENDLY_LINK} target="_blank" rel="noopener noreferrer" className="text-teal-400 hover:underline">Start your project →</a>
            </div>
            <div className="p-8 border border-white/10 rounded-xl bg-white/5">
              <h3 className="font-display text-2xl mb-4 text-teal-400">Cutting-Edge Technology</h3>
              <p className="text-gray-400 mb-4">We leverage the latest digital marketing tools and technologies to give you a competitive edge. From advanced analytics platforms to AI-powered optimization tools, we invest in the best resources to drive your success.</p>
              <Link to="/industries" className="text-teal-400 hover:underline">Explore industries →</Link>
            </div>
          </div>
        </div>

        {/* CTA */}
        <div className="mt-20 text-center">
          <p className="text-xl text-gray-300 mb-8">Ready to transform your digital presence?</p>
          <div className="flex flex-col md:flex-row gap-4 justify-center">
            <a href={CALENDLY_LINK} target="_blank" rel="noopener noreferrer" className="px-8 py-4 bg-teal-400 text-black font-bold rounded-full hover:bg-teal-300 transition-colors">
              Book Strategy Call
            </a>
            <Link to="/case-studies" className="px-8 py-4 border border-white/30 text-white font-bold rounded-full hover:bg-white/10 transition-colors">
              View Case Studies
            </Link>
          </div>
        </div>
      </div>
    </>
  );
};

export default Services;
