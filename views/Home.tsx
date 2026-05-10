
import React from 'react';
import { ArrowRight, TrendingUp, Target, Monitor, Play, PenTool, Layers, Globe } from 'lucide-react';
import { Link } from '../lib/routerCompat';
import TextReveal from '../components/TextReveal';
import MagneticButton from '../components/MagneticButton';
import SEO from '../components/SEO';
import ServiceShowcase from '../components/ServiceShowcase';
import ParallaxImage from '../components/ParallaxImage';
import ClientLogos from '../components/ClientLogos';
import Testimonials from '../components/Testimonials';
import HeroOrb from '../components/HeroOrb';
import { CALENDLY_LINK, CONTACT_MAILTO } from '../data/siteConfig';
import { CASE_STUDIES } from '../data/work';
import { REGIONS } from '../data/regions';
import { INDUSTRIES } from '../data/industries';

const Home: React.FC = () => {
  return (
    <>
      <SEO 
        title="Qognition | Future-Ready Digital Marketing Agency"
        description="Scale your business with Qognition's ROI-focused digital marketing. Expert SEO, PPC, social media & web development. Get a free strategy consultation today!"
        path="/"
        schemaData={{
          type: "Organization",
          name: "Qognition Agency",
          url: "https://www.qognitionagency.com",
          logo: "https://www.qognitionagency.com/favicon.png",
          sameAs: [
            "https://www.linkedin.com/company/qognition-tech",
            "https://twitter.com/qognition_tech"
          ]
        }}
      />

      {/* --- HERO SECTION --- */}
      <section className="min-h-screen flex flex-col justify-center relative overflow-hidden bg-black">
        <HeroOrb />
        
        {/* Cinematic Overlays */}
        <div className="absolute inset-0 bg-gradient-to-r from-black via-black/50 to-transparent z-0 pointer-events-none"></div>
        <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-black/40 z-0 pointer-events-none"></div>
        
        <div className="px-6 md:px-12 max-w-8xl mx-auto w-full relative z-10 pt-32 pb-20">
          
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            <div className="lg:col-span-8">
               {/* Badge */}
              <div
                className="inline-flex items-center gap-3 px-4 py-2 rounded-full border border-white/10 bg-white/5 backdrop-blur-md mb-8 md:mb-10"
              >
                 <div className="w-2 h-2 rounded-full bg-teal-400 animate-pulse"></div>
                 <span className="uppercase tracking-widest text-[10px] md:text-[11px] font-bold text-white">Global Growth Partner</span>
              </div>
              
              {/* Main Headline */}
              <h1 className="font-display text-5xl md:text-8xl lg:text-[100px] font-medium leading-[0.95] md:leading-[0.9] tracking-tight text-white mb-8 md:mb-10">
                <div className="overflow-hidden">
                  <TextReveal delay={0.5}>Get qualified</TextReveal>
                </div>
                <div className="overflow-hidden flex items-center gap-2 md:gap-4 flex-wrap">
                   <TextReveal delay={1.5} className="text-gray-300 font-light italic font-serif">leads</TextReveal>
                   <TextReveal delay={2.5}>online.</TextReveal>
                </div>
              </h1>

              {/* Subheadline & CTAs */}
              <div className="max-w-2xl">
                 <p className="text-lg md:text-2xl text-gray-300 leading-relaxed font-light mb-10 md:mb-12">
                    Qognition helps law firms, clinics, consultants, SaaS teams, and B2B companies turn search demand into booked calls with SEO, Google Ads, conversion pages, AI search visibility, and HubSpot tracking.
                </p>

                <div className="flex flex-col sm:flex-row gap-4 sm:gap-6">
                    <Link to="/resources/free-seo-audit-checklist">
                      <MagneticButton variant="primary" className="px-8 py-4 text-base w-full sm:w-auto min-w-[180px]">
                          Get Free Growth Audit
                      </MagneticButton>
                    </Link>
                    <a href={CALENDLY_LINK} target="_blank" rel="noopener noreferrer" className="group flex items-center justify-center gap-4 px-8 py-4 rounded-full border border-white/20 hover:border-white transition-all w-full sm:w-auto">
                       <div className="w-8 h-8 rounded-full bg-white text-black flex items-center justify-center">
                          <Play size={12} fill="currentColor" />
                       </div>
                       <span className="text-sm font-bold uppercase tracking-wider">Book Strategy Call</span>
                    </a>
                </div>
              </div>
            </div>

            {/* Visual Stat Card */}
            <div className="lg:col-span-4 hidden lg:block">
               <div
                  className="p-8 rounded-2xl bg-white/5 border border-white/10 backdrop-blur-md relative overflow-hidden"
               >
                  <div className="absolute top-0 right-0 p-32 bg-teal-500/20 blur-[80px] rounded-full pointer-events-none"></div>
                  <div className="relative z-10">
                     <p className="text-gray-400 text-sm uppercase tracking-widest mb-6">Live Impact</p>
                     <div className="flex justify-between items-end border-b border-white/10 pb-6 mb-6">
                        <span className="text-5xl font-display text-white">$500M+</span>
                        <span className="text-teal-400 text-xs font-bold">Revenue Driven</span>
                     </div>
                     <div className="space-y-4">
                        <div className="flex justify-between text-sm">
                           <span className="text-gray-400">Global Campaigns</span>
                           <span className="text-white">142</span>
                        </div>
                        <div className="flex justify-between text-sm">
                           <span className="text-gray-400">ROAS Average</span>
                           <span className="text-white">4.2x</span>
                        </div>
                         <div className="flex justify-between text-sm">
                           <span className="text-gray-400">Hubs</span>
                           <span className="text-white">12</span>
                        </div>
                     </div>
                  </div>
               </div>
            </div>
          </div>
        </div>
      </section>

      <ClientLogos />

      {/* --- DIGITAL ACCELERATION GRID (Replaces AI Native) --- */}
      <section className="py-20 md:py-32 px-6 md:px-12 bg-zinc-950/50">
        <div className="max-w-8xl mx-auto">
             <div className="flex flex-col md:flex-row justify-between items-end mb-16 md:mb-20">
                 <div className="max-w-3xl">
                    <span className="text-teal-400 font-mono text-sm mb-4 md:mb-6 block tracking-widest">// DIGITAL ACCELERATION</span>
                    <h2 className="font-display text-4xl md:text-7xl mb-6 leading-tight">Everything you need<br/>to scale.</h2>
                 </div>
                 <Link to="/services">
                    <MagneticButton variant="outline">Explore Services</MagneticButton>
                 </Link>
             </div>

             <div className="grid grid-cols-1 md:grid-cols-3 grid-rows-2 gap-6 h-auto md:h-[700px]">
                 
                 {/* 1. Performance */}
                 <div
                    className="md:col-span-2 md:row-span-1 p-8 md:p-10 bg-zinc-900/30 border border-white/5 rounded-3xl flex flex-col md:flex-row justify-between relative overflow-hidden group hover:border-teal-500/30 transition-all duration-500"
                 >
                     <div className="absolute inset-0 bg-gradient-to-r from-teal-900/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity"></div>
                     <div className="relative z-10 max-w-lg">
                        <div className="w-12 h-12 rounded-lg bg-teal-400/10 flex items-center justify-center text-teal-400 mb-6">
                            <TrendingUp size={24} />
                        </div>
                        <h3 className="text-3xl md:text-4xl font-display mb-4 text-white">Performance Marketing</h3>
                        <p className="text-gray-400 leading-relaxed">Precision paid media strategies across Google, Meta, and LinkedIn that convert clicks into revenue. We don't just buy ads; we buy attention.</p>
                     </div>
                     <div className="relative z-10 flex flex-col justify-end mt-8 md:mt-0">
                         <span className="text-5xl font-display text-white">4.2x</span>
                         <span className="text-sm text-gray-400 uppercase tracking-widest">Avg. ROAS</span>
                     </div>
                 </div>

                 {/* 2. SEO */}
                 <div
                    className="md:col-span-1 md:row-span-1 p-8 bg-black border border-white/10 rounded-3xl flex flex-col justify-between group hover:bg-zinc-900 transition-colors"
                 >
                     <div className="w-12 h-12 rounded-lg bg-white/10 flex items-center justify-center text-white mb-6 group-hover:bg-teal-400 group-hover:text-black transition-colors">
                        <Target size={24} />
                     </div>
                     <div>
                        <h3 className="text-2xl font-display mb-2 text-white">Enterprise SEO</h3>
                        <p className="text-gray-400 text-sm">Dominate search results with technical audits and authority-building content.</p>
                     </div>
                 </div>

                 {/* 3. Creative/Brand */}
                 <div
                    className="md:col-span-1 md:row-span-1 p-8 bg-black border border-white/10 rounded-3xl flex flex-col justify-between group hover:bg-zinc-900 transition-colors"
                 >
                     <div className="w-12 h-12 rounded-lg bg-white/10 flex items-center justify-center text-white mb-6 group-hover:bg-teal-400 group-hover:text-black transition-colors">
                        <PenTool size={24} />
                     </div>
                     <div>
                        <h3 className="text-2xl font-display mb-2 text-white">Brand & Creative</h3>
                        <p className="text-gray-400 text-sm">World-class design and motion that elevates your brand perception.</p>
                     </div>
                 </div>

                 {/* 4. Development */}
                 <div
                    className="md:col-span-2 md:row-span-1 p-8 md:p-10 bg-white text-black border border-white/10 rounded-3xl flex flex-col md:flex-row justify-between relative overflow-hidden group"
                 >
                     <div className="relative z-10 max-w-lg">
                        <div className="w-12 h-12 rounded-lg bg-black/10 flex items-center justify-center text-black mb-6">
                            <Monitor size={24} />
                        </div>
                        <h3 className="text-3xl md:text-4xl font-display mb-4">Web Experiences</h3>
                        <p className="text-gray-600 leading-relaxed">Blazing fast Next.js websites and headless commerce stores designed to convert. We build digital flagships, not just websites.</p>
                     </div>
                     <div className="relative z-10 flex flex-col justify-end mt-8 md:mt-0">
                         <span className="text-5xl font-display text-black">100</span>
                         <span className="text-sm text-gray-500 uppercase tracking-widest">PageSpeed Score</span>
                     </div>
                 </div>
             </div>
        </div>
      </section>

      {/* --- HORIZONTAL SCROLL PROCESS (Immersive) --- */}
      <section className="relative bg-black border-y border-white/5 hidden lg:block py-32">
        <div className="max-w-8xl mx-auto px-12">
             <div className="mb-16">
                 <span className="text-teal-400 font-mono text-sm block tracking-widest mb-2">// THE METHODOLOGY</span>
                 <h2 className="font-display text-5xl">How We Win</h2>
             </div>

             <div className="grid grid-cols-2 gap-16">
                {/* Step 1 */}
                <div className="min-w-0">
                    <div className="grid grid-cols-2 gap-12">
                         <div aria-hidden="true" className="text-9xl font-display font-bold text-white/10">01</div>
                         <div>
                             <h3 className="text-5xl font-display mb-8 text-teal-400">Discovery & Audit</h3>
                             <p className="text-2xl text-gray-400 leading-relaxed mb-8">
                                 We start with a forensic audit of your current digital footprint. We analyze competitors, identify keyword gaps, and audit your tech stack.
                             </p>
                             <ul className="space-y-4 text-gray-400">
                                 <li className="flex gap-4"><ArrowRight className="text-teal-400"/> Technical SEO Audit</li>
                                 <li className="flex gap-4"><ArrowRight className="text-teal-400"/> Competitor Reconnaissance</li>
                                 <li className="flex gap-4"><ArrowRight className="text-teal-400"/> User Journey Mapping</li>
                             </ul>
                         </div>
                    </div>
                </div>

                {/* Step 2 */}
                <div className="min-w-0">
                    <div className="grid grid-cols-2 gap-12">
                         <div aria-hidden="true" className="text-9xl font-display font-bold text-white/10">02</div>
                         <div>
                             <h3 className="text-5xl font-display mb-8 text-teal-400">Strategy & Architecture</h3>
                             <p className="text-2xl text-gray-400 leading-relaxed mb-8">
                                 We build the roadmap. Defining the content strategy, designing the visual identity, and architecting the conversion funnels.
                             </p>
                             <ul className="space-y-4 text-gray-400">
                                 <li className="flex gap-4"><ArrowRight className="text-teal-400"/> Brand Positioning</li>
                                 <li className="flex gap-4"><ArrowRight className="text-teal-400"/> Content Calendar</li>
                                 <li className="flex gap-4"><ArrowRight className="text-teal-400"/> UX/UI Prototyping</li>
                             </ul>
                         </div>
                    </div>
                </div>

                {/* Step 3 */}
                <div className="min-w-0">
                    <div className="grid grid-cols-2 gap-12">
                         <div aria-hidden="true" className="text-9xl font-display font-bold text-white/10">03</div>
                         <div>
                             <h3 className="text-5xl font-display mb-8 text-teal-400">Execution & Launch</h3>
                             <p className="text-2xl text-gray-400 leading-relaxed mb-8">
                                 Rapid deployment. Our engineers ship code, our creatives launch ads, and our SEOs optimize content. We move fast.
                             </p>
                             <ul className="space-y-4 text-gray-400">
                                 <li className="flex gap-4"><ArrowRight className="text-teal-400"/> Next.js Development</li>
                                 <li className="flex gap-4"><ArrowRight className="text-teal-400"/> Campaign Activation</li>
                                 <li className="flex gap-4"><ArrowRight className="text-teal-400"/> Content Publishing</li>
                             </ul>
                         </div>
                    </div>
                </div>

                {/* Step 4 */}
                 <div className="min-w-0">
                    <div className="grid grid-cols-2 gap-12">
                         <div aria-hidden="true" className="text-9xl font-display font-bold text-white/10">04</div>
                         <div>
                             <h3 className="text-5xl font-display mb-8 text-teal-400">Scale & Optimize</h3>
                             <p className="text-2xl text-gray-400 leading-relaxed mb-8">
                                 Data-driven iteration. We monitor results in real-time, doubling down on what works and cutting what doesn't.
                             </p>
                             <ul className="space-y-4 text-gray-400">
                                 <li className="flex gap-4"><ArrowRight className="text-teal-400"/> Conversion Optimization</li>
                                 <li className="flex gap-4"><ArrowRight className="text-teal-400"/> Budget Scaling</li>
                                 <li className="flex gap-4"><ArrowRight className="text-teal-400"/> Retention Automation</li>
                             </ul>
                         </div>
                    </div>
                </div>
             </div>
        </div>
      </section>

      {/* --- MOBILE PROCESS (Fallback for mobile) --- */}
      <section className="py-24 px-6 bg-black border-y border-white/5 lg:hidden">
          <span className="text-teal-400 font-mono text-sm block tracking-widest mb-8">// THE METHODOLOGY</span>
          <h2 className="font-display text-4xl mb-12">How We Win</h2>
          <div className="space-y-16">
              {[
                  { title: "Discovery", desc: "Forensic audit of your digital footprint." },
                  { title: "Strategy", desc: "Building the roadmap and conversion architecture." },
                  { title: "Execution", desc: "Rapid deployment of code, content, and ads." },
                  { title: "Scale", desc: "Data-driven iteration to maximize ROI." }
              ].map((step, i) => (
                  <div key={i} className="border-l-2 border-white/10 pl-8 relative">
                      <div className="absolute -left-[9px] top-0 w-4 h-4 rounded-full bg-teal-400"></div>
                      <h3 className="text-2xl font-display mb-4 text-white">{step.title}</h3>
                      <p className="text-gray-400">{step.desc}</p>
                  </div>
              ))}
          </div>
      </section>

      {/* --- TECH STACK MARQUEE --- */}
      <section className="py-12 bg-black border-b border-white/10 overflow-hidden">
         <div className="max-w-7xl mx-auto px-6 mb-8 text-center">
            <p className="text-sm uppercase tracking-widest text-gray-400">Powered By Modern Tech</p>
         </div>
         <div className="flex animate-marquee whitespace-nowrap">
             {[...Array(2)].map((_, i) => (
                 <div key={i} className="flex gap-16 mx-8">
                     {['Next.js 14', 'React', 'TypeScript', 'Tailwind', 'Framer Motion', 'Shopify Plus', 'Sanity CMS', 'Google Cloud', 'Vercel', 'Supabase', 'OpenAI', 'Ahrefs', 'GA4'].map((tech) => (
                         <span key={tech} className="text-xl font-mono text-gray-400 hover:text-teal-400 transition-colors cursor-default">{tech}</span>
                     ))}
                 </div>
             ))}
         </div>
         <style>{`
            .animate-marquee { animation: marquee 30s linear infinite; }
            @keyframes marquee { 0% { transform: translateX(0%); } 100% { transform: translateX(-100%); } }
         `}</style>
      </section>

      {/* Services Interactive Showcase */}
      <ServiceShowcase />

      {/* Industries Grid */}
      <section className="py-32 px-6 md:px-12 border-b border-white/5 relative bg-zinc-950">
        <div className="max-w-8xl mx-auto">
             <div className="flex justify-between items-end mb-20">
                 <div>
                    <span className="text-teal-400 font-mono text-sm mb-6 block tracking-widest">// SECTOR EXPERTISE</span>
                    <h2 className="font-display text-5xl md:text-7xl mb-6">Industries We Dominate</h2>
                 </div>
                 <Link to="/industries">
                    <MagneticButton variant="outline">View All Sectors</MagneticButton>
                 </Link>
             </div>

             <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {INDUSTRIES.slice(0, 6).map((ind, i) => (
                    <Link key={ind.id} to={`/industries/${ind.id}`} className="group block h-full">
                        <div className="h-full p-10 bg-white/[0.02] border border-white/10 rounded-xl hover:bg-white/[0.05] hover:border-teal-400/40 transition-all duration-500 relative overflow-hidden">
                             <div className="flex justify-between items-start mb-8">
                                <Layers className="text-teal-400/50 group-hover:text-teal-400 transition-colors" size={32} />
                                <div className="w-10 h-10 rounded-full border border-white/10 flex items-center justify-center group-hover:bg-white group-hover:text-black transition-all">
                                    <ArrowRight className="-rotate-45 group-hover:rotate-0 transition-all duration-300" size={18} />
                                </div>
                             </div>
                             <h3 className="font-display text-3xl mb-4 text-white group-hover:translate-x-1 transition-transform">{ind.name}</h3>
                             <p className="text-gray-400 text-sm mb-8 line-clamp-2 leading-relaxed">{ind.description}</p>
                             <div className="flex flex-wrap gap-2 mt-auto">
                                {ind.subIndustries.slice(0,3).map(sub => (
                                    <span key={sub.slug} className="text-[10px] uppercase tracking-wider px-3 py-1 bg-black rounded-full border border-white/10 text-gray-400 group-hover:border-white/30 transition-colors">{sub.name}</span>
                                ))}
                             </div>
                        </div>
                    </Link>
                ))}
             </div>
        </div>
      </section>

      {/* Featured Work / Case Studies */}
      <section className="py-32 px-6 md:px-12 bg-black relative">
        <div className="max-w-8xl mx-auto">
          <div className="flex justify-between items-end mb-24">
            <h2 className="font-display text-5xl md:text-7xl text-white">Selected Work</h2>
            <Link to="/work">
               <MagneticButton variant="outline">All Case Studies</MagneticButton>
            </Link>
          </div>
          
          <div className="space-y-40">
            {CASE_STUDIES.slice(0, 2).map((study, index) => (
              <div key={study.id} className={`flex flex-col ${index % 2 === 1 ? 'md:flex-row-reverse' : 'md:flex-row'} gap-12 md:gap-24 items-center group`}>
                <div
                  className="w-full md:w-3/5 overflow-hidden rounded-2xl cursor-pointer shadow-2xl shadow-teal-900/10"
                >
                  <Link to={`/work/${study.id}`}>
                     <ParallaxImage src={study.image} alt={study.title} />
                  </Link>
                </div>
                
                <div className="w-full md:w-2/5">
                  <div className="flex items-center gap-3 text-teal-400 mb-6 text-sm font-bold uppercase tracking-wider">
                    <span className="w-2 h-2 rounded-full bg-teal-400"></span>
                    {study.industry} • {study.client}
                  </div>
                  <Link to={`/work/${study.id}`}>
                    <h3 className="font-display text-4xl md:text-6xl mb-8 text-white hover:text-teal-400 transition-colors leading-[1.1]">{study.title}</h3>
                  </Link>
                  <div className="grid grid-cols-2 gap-8 mb-10 border-t border-white/10 pt-8">
                    {study.stats.map(stat => (
                      <div key={stat.label}>
                        <div className="text-3xl md:text-4xl font-bold text-white mb-2">{stat.value}</div>
                        <div className="text-xs text-gray-400 uppercase tracking-wide">{stat.label}</div>
                      </div>
                    ))}
                  </div>
                  <Link to={`/work/${study.id}`} className="inline-flex items-center gap-2 text-sm uppercase tracking-widest text-white hover:gap-4 transition-all duration-300 border-b border-white/30 pb-1 hover:border-teal-400 hover:text-teal-400">
                    View Case Study <ArrowRight size={16} />
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <Testimonials />

      {/* Global Presence - Enhanced */}
      <section className="py-32 px-6 md:px-12 border-t border-white/10 bg-gradient-to-b from-black to-zinc-950">
        <div className="max-w-8xl mx-auto text-center mb-16">
            <h2 className="font-display text-4xl md:text-6xl mb-6">Global Reach, Local Impact</h2>
            <p className="text-xl text-gray-400 max-w-2xl mx-auto mb-12">
                Strategically located hubs serving major digital economies.
            </p>
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
                {REGIONS.map(region => (
                    <Link key={region.id} to={`/regions/${region.slug}`} className="group">
                        <div className="p-6 border border-white/10 rounded-xl hover:bg-white/5 transition-all hover:border-teal-400/50">
                            <Globe size={24} className="text-teal-400 mb-4 mx-auto group-hover:scale-110 transition-transform"/>
                            <h3 className="font-display text-lg">{region.name}</h3>
                        </div>
                    </Link>
                ))}
            </div>
            <div className="mt-12">
                <Link to="/regions">
                    <MagneticButton variant="secondary">View All Locations</MagneticButton>
                </Link>
            </div>
        </div>
      </section>

      {/* Why Choose Qognition */}
      <section className="py-32 px-6 md:px-12 bg-zinc-950 border-t border-white/5">
        <div className="max-w-8xl mx-auto">
          <div className="text-center mb-20">
            <span className="text-teal-400 font-mono text-sm mb-4 block tracking-widest">// WHY QOGNITION</span>
            <h2 className="font-display text-4xl md:text-6xl mb-6">Your Growth Partner</h2>
            <p className="text-gray-400 max-w-2xl mx-auto text-lg">
              We're not just another digital agency. We are your strategic growth partner, committed to delivering measurable results that impact your bottom line.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="p-8 border border-white/10 rounded-2xl bg-white/5">
              <TrendingUp className="text-teal-400 mb-6" size={40} />
              <h3 className="font-display text-2xl mb-4">Data-Driven Approach</h3>
              <p className="text-gray-400 leading-relaxed">
                Every decision we make is backed by data. Our team analyzes metrics continuously to optimize your campaigns and maximize ROI. We believe in transparent reporting and measurable outcomes that matter to your business.
              </p>
            </div>
            <div className="p-8 border border-white/10 rounded-2xl bg-white/5">
              <Target className="text-teal-400 mb-6" size={40} />
              <h3 className="font-display text-2xl mb-4">ROI-Focused Strategy</h3>
              <p className="text-gray-400 leading-relaxed">
                We focus on strategies that deliver real business results. Our experts work tirelessly to ensure every dollar you invest generates qualified leads and measurable growth for your organization.
              </p>
            </div>
            <div className="p-8 border border-white/10 rounded-2xl bg-white/5">
              <Monitor className="text-teal-400 mb-6" size={40} />
              <h3 className="font-display text-2xl mb-4">Full-Service Solutions</h3>
              <p className="text-gray-400 leading-relaxed">
                From <Link to="/services" className="text-teal-300 underline underline-offset-4 decoration-teal-400/60 hover:text-white">SEO</Link> and <Link to="/services" className="text-teal-300 underline underline-offset-4 decoration-teal-400/60 hover:text-white">PPC</Link> to web development and content marketing, we offer comprehensive digital solutions under one roof. No more managing multiple vendors - we handle everything.
              </p>
            </div>
          </div>
          
          <div className="mt-16 text-center">
            <Link to="/about" className="inline-flex items-center gap-2 text-teal-400 hover:text-white transition-colors">
              Learn more about our mission <ArrowRight size={20} />
            </Link>
          </div>
        </div>
      </section>

      {/* Industries We Serve */}
      <section className="py-32 px-6 md:px-12 bg-black border-t border-white/5">
        <div className="max-w-8xl mx-auto">
          <div className="text-center mb-20">
            <span className="text-teal-400 font-mono text-sm mb-4 block tracking-widest">// INDUSTRIES</span>
            <h2 className="font-display text-4xl md:text-6xl mb-6">Expertise Across Sectors</h2>
            <p className="text-gray-400 max-w-2xl mx-auto text-lg">
              Our team has proven experience driving results for businesses across diverse industries. We understand the unique challenges and opportunities in each sector.
            </p>
          </div>
          
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {INDUSTRIES.slice(0, 8).map((ind) => (
              <Link key={ind.id} to={`/industries/${ind.id}`} className="group p-6 border border-white/10 rounded-xl hover:border-teal-400/50 transition-all bg-white/5 hover:bg-white/10">
                <Layers className="text-teal-400 mb-4 group-hover:scale-110 transition-transform" size={32} />
                <h3 className="font-display text-xl mb-2">{ind.name}</h3>
                <p className="text-gray-400 text-sm line-clamp-2">{ind.description}</p>
              </Link>
            ))}
          </div>
          
          <div className="mt-12 text-center">
            <Link to="/industries" className="inline-flex items-center gap-2 text-teal-400 hover:text-white transition-colors">
              View all industries we serve <ArrowRight size={20} />
            </Link>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-32 px-6 md:px-12 bg-black border-t border-white/5">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-16">
            <span className="text-teal-400 font-mono text-sm mb-4 block tracking-widest">// FAQ</span>
            <h2 className="font-display text-4xl md:text-5xl mb-6">Common Questions</h2>
          </div>
          
          <div className="space-y-6">
            <div className="p-6 border border-white/10 rounded-xl bg-white/5">
              <h3 className="font-display text-xl mb-3">How long does it take to see results from digital marketing?</h3>
              <p className="text-gray-400">Results vary based on your goals and competition. Typically, PPC campaigns show immediate results within days, while SEO takes 3-6 months for significant improvements. Our team provides realistic timelines during the strategy phase.</p>
            </div>
            <div className="p-6 border border-white/10 rounded-xl bg-white/5">
              <h3 className="font-display text-xl mb-3">What makes Qognition different from other agencies?</h3>
              <p className="text-gray-400">We combine data-driven strategies with creative excellence. Our team consists of industry experts who have worked with leading brands globally. We focus on ROI and provide transparent reporting with dedicated account managers.</p>
            </div>
            <div className="p-6 border border-white/10 rounded-xl bg-white/5">
              <h3 className="font-display text-xl mb-3">Do you work with businesses of all sizes?</h3>
              <p className="text-gray-400">Yes! We work with startups, SMBs, and enterprise companies. Our flexible pricing and customized strategies ensure we can meet the unique needs of businesses at any stage of growth.</p>
            </div>
            <div className="p-6 border border-white/10 rounded-xl bg-white/5">
              <h3 className="font-display text-xl mb-3">How do you measure success?</h3>
              <p className="text-gray-400">We define success metrics based on your business goals - whether that's leads generated, revenue growth, website traffic, or brand awareness. Our dashboards provide real-time visibility into performance.</p>
            </div>
          </div>
          
          <div className="mt-12 text-center">
            <p className="text-gray-400 mb-6">Have more questions?</p>
            <Link to={CONTACT_MAILTO} className="inline-flex items-center gap-2 text-teal-400 hover:text-white transition-colors">
              Get in touch with our team <ArrowRight size={20} />
            </Link>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-40 px-6 md:px-12 text-center relative overflow-hidden bg-black">
        <div className="absolute inset-0 bg-teal-900/10 blur-[150px] rounded-full pointer-events-none translate-y-20"></div>
        <div className="max-w-5xl mx-auto relative z-10">
          <h2 className="font-display text-5xl md:text-8xl mb-12 leading-[1.1]">Ready to dominate<br/>your industry?</h2>
          <p className="text-2xl text-gray-300 mb-16 max-w-3xl mx-auto font-light leading-relaxed">
            We only partner with ambitious brands ready for exponential growth. 
            Schedule a strategy session with our executive directors.
          </p>
          <div className="flex flex-col md:flex-row items-center justify-center gap-6">
              <a href={CALENDLY_LINK} target="_blank" rel="noopener noreferrer">
                 <MagneticButton variant="primary" className="text-lg px-12 py-6 w-full md:w-auto">
                    Book Strategy Call
                 </MagneticButton>
              </a>
              <Link to={CONTACT_MAILTO}>
                 <MagneticButton variant="outline" className="text-lg px-12 py-6 w-full md:w-auto">
                    Email Us
                 </MagneticButton>
              </Link>
          </div>
        </div>
      </section>
    </>
  );
};

export default Home;
