import React, { useEffect } from 'react';
import { useParams, Link, useNavigate } from '../lib/routerCompat';
import { motion } from 'framer-motion';
import { ArrowLeft, ArrowRight, CheckCircle2 } from 'lucide-react';
import { CASE_STUDIES, CALENDLY_LINK } from '../constants';
import MagneticButton from '../components/MagneticButton';
import SEO from '../components/SEO';
import ParallaxImage from '../components/ParallaxImage';

const CaseStudyDetail: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const study = CASE_STUDIES.find(s => s.id === id);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [id]);

  if (!study) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center">
        <h2 className="text-2xl mb-4">Case Study Not Found</h2>
        <MagneticButton onClick={() => navigate('/case-studies')}>Back to Case Studies</MagneticButton>
      </div>
    );
  }

  return (
    <>
      <SEO 
        title={`${study.title} | Case Study - Qognition Agency`}
        description={`${study.title} - ${study.client} case study. See how Qognition Agency delivered measurable results with ${study.stats.map(s => s.value + ' ' + s.label).join(', ')}. Read the full success story and get similar results!`}
        path={`/case-studies/${study.id}`}
        schemaData={{
          type: "Article",
          name: study.title,
          url: `https://www.qognitionagency.com/case-studies/${study.id}`
        }}
      />

      <article className="min-h-screen pt-24 md:pt-32">
        {/* Header */}
        <div className="px-6 md:px-12 max-w-8xl mx-auto mb-16 md:mb-24">
          <Link to="/case-studies" className="inline-flex items-center gap-2 text-gray-400 hover:text-white transition-colors mb-8 group">
            <ArrowLeft size={16} className="group-hover:-translate-x-1 transition-transform"/> Back to Case Studies
          </Link>
          
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-end">
            <div className="lg:col-span-8">
              <motion.div 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="flex items-center gap-3 mb-6"
              >
                <span className="w-2 h-2 rounded-full bg-teal-400"></span>
                <span className="uppercase tracking-widest text-xs font-bold text-teal-400">{study.industry}</span>
              </motion.div>
              
              <h1 className="font-display text-4xl md:text-7xl lg:text-8xl leading-none mb-8">
                {study.title}
              </h1>
            </div>
            
            <div className="lg:col-span-4 lg:mb-4">
              <p className="text-xl text-gray-300 border-l border-teal-500/30 pl-6">
                {study.summary || `A strategic partnership focused on scaling ${study.client}'s digital presence through engineering and design.`}
              </p>
            </div>
          </div>
        </div>

        {/* Hero Image */}
        <div className="px-4 md:px-12 max-w-[1920px] mx-auto mb-24 md:mb-32">
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1, ease: [0.22, 1, 0.36, 1] }}
            className="rounded-2xl overflow-hidden"
          >
            <ParallaxImage src={study.image} alt={study.title} aspectRatio="aspect-[21/9]" />
          </motion.div>
        </div>

        {/* Content Grid */}
        <div className="px-6 md:px-12 max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-12 gap-12 md:gap-24 mb-32">
          {/* Sidebar */}
          <div className="md:col-span-4 space-y-12">
            <div className="p-8 border border-white/10 rounded-lg bg-white/5 backdrop-blur-sm sticky top-32">
              <h3 className="font-display text-2xl mb-8">Key Metrics</h3>
              <div className="grid grid-cols-1 sm:grid-cols-3 md:grid-cols-1 gap-4 md:gap-6">
                {study.stats.map((stat, i) => (
                  <div key={i} className="min-w-0 rounded-xl border border-white/10 bg-black/30 p-4">
                    <div className="text-3xl lg:text-4xl font-bold text-teal-400 mb-2 break-words">{stat.value}</div>
                    <div className="text-xs uppercase tracking-wider text-gray-400 leading-relaxed break-words">{stat.label}</div>
                  </div>
                ))}
              </div>
            </div>

            <div>
              <h4 className="font-bold text-sm uppercase tracking-wider text-gray-500 mb-4">Services Provided</h4>
              <div className="flex flex-wrap gap-2">
                {study.tags.map(tag => (
                  <span key={tag} className="px-3 py-1 bg-white/5 border border-white/10 rounded-full text-sm">
                    {tag}
                  </span>
                ))}
              </div>
            </div>

            <div className="p-6 border border-white/10 rounded-xl bg-white/[0.03]">
              <h4 className="font-bold text-sm uppercase tracking-wider text-gray-500 mb-3">Timeline</h4>
              <p className="text-2xl font-display text-white mb-6">{study.timeline || '120 days'}</p>
              <h4 className="font-bold text-sm uppercase tracking-wider text-gray-500 mb-3">ROI Signal</h4>
              <p className="text-sm text-gray-300 leading-relaxed">{study.roi}</p>
            </div>
          </div>

          {/* Main Copy */}
          <div className="md:col-span-8 space-y-16">
            <section>
              <h2 className="font-display text-3xl md:text-4xl mb-6">The Challenge</h2>
              <p className="text-lg text-gray-300 leading-relaxed">
                {study.challenge}
              </p>
            </section>

            <section>
              <h2 className="font-display text-3xl md:text-4xl mb-6">Our Solution</h2>
              <p className="text-lg text-gray-300 leading-relaxed mb-6">{study.solution}</p>
              <ul className="space-y-4">
                {(study.implementation || ['Technical Architecture Overhaul', 'AI-Driven Content Strategy', 'Conversion Rate Optimization']).map((item, i) => (
                  <li key={i} className="flex items-start gap-3">
                    <CheckCircle2 className="text-teal-400 mt-1 shrink-0" size={20} />
                    <span className="text-gray-300">{item}</span>
                  </li>
                ))}
              </ul>
            </section>

            {study.beforeAfter && (
              <section>
                <h2 className="font-display text-3xl md:text-4xl mb-8">Before vs After</h2>
                <div className="space-y-5">
                  {study.beforeAfter.map((row) => (
                    <div key={row.before} className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="p-5 border border-white/10 rounded-xl bg-white/[0.03]">
                        <div className="text-xs uppercase tracking-widest text-gray-500 mb-3">Before</div>
                        <p className="text-gray-400 leading-relaxed">{row.before}</p>
                      </div>
                      <div className="p-5 border border-teal-400/20 rounded-xl bg-teal-400/5">
                        <div className="text-xs uppercase tracking-widest text-teal-400 mb-3">After</div>
                        <p className="text-gray-200 leading-relaxed">{row.after}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </section>
            )}

            {study.funnelStages && (
              <section>
                <h2 className="font-display text-3xl md:text-4xl mb-8">Funnel Journey</h2>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  {study.funnelStages.map((stage) => (
                    <div key={stage.stage} className="p-6 rounded-xl border border-white/10 bg-black/40">
                      <h3 className="font-display text-xl mb-4 text-teal-300">{stage.stage}</h3>
                      <p className="text-xs uppercase tracking-widest text-gray-600 mb-2">Before</p>
                      <p className="text-sm text-gray-400 mb-5">{stage.before}</p>
                      <p className="text-xs uppercase tracking-widest text-gray-600 mb-2">After</p>
                      <p className="text-sm text-gray-200">{stage.after}</p>
                    </div>
                  ))}
                </div>
              </section>
            )}

            {study.analytics && (
              <section>
                <h2 className="font-display text-3xl md:text-4xl mb-8">Analytics Visuals</h2>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  {study.analytics.map((metric) => (
                    <div key={metric.label} className="p-6 border border-white/10 rounded-xl bg-white/[0.03]">
                      <div className="text-4xl font-display text-white mb-2">{metric.value}</div>
                      <div className="text-sm uppercase tracking-widest text-teal-400 mb-4">{metric.label}</div>
                      <div className="h-2 w-full rounded-full bg-white/10 mb-4 overflow-hidden">
                        <div className="h-full w-3/4 rounded-full bg-teal-400"></div>
                      </div>
                      <p className="text-xs text-gray-500 leading-relaxed">{metric.note}</p>
                    </div>
                  ))}
                </div>
              </section>
            )}

            {study.clientJourney && (
              <section>
                <h2 className="font-display text-3xl md:text-4xl mb-8">Client Journey</h2>
                <div className="space-y-4">
                  {study.clientJourney.map((step, index) => (
                    <div key={step} className="flex gap-5 border-l border-white/10 pl-6 py-2">
                      <span className="font-mono text-teal-400 text-sm">0{index + 1}</span>
                      <p className="text-gray-300 leading-relaxed">{step}</p>
                    </div>
                  ))}
                </div>
              </section>
            )}

            {study.contentSections?.map((section) => (
              <section key={section.title}>
                <h2 className="font-display text-3xl md:text-4xl mb-6">{section.title}</h2>
                <p className="text-lg text-gray-300 leading-relaxed">{section.content}</p>
              </section>
            ))}

            <section className="bg-teal-900/10 p-8 md:p-12 rounded-2xl border border-teal-500/10 my-8">
              <h3 className="font-display text-2xl mb-4 text-teal-400">The Impact</h3>
              <p className="text-xl md:text-2xl leading-relaxed">
                "{study.testimonial?.quote || "Qognition didn't just build a website; they built a growth engine. The results were immediate and sustained."}"
              </p>
              <div className="mt-6 text-sm text-gray-500 font-bold uppercase tracking-wider">
                - {study.testimonial?.author || 'VP of Marketing'}, {study.testimonial?.role || study.client}
              </div>
            </section>

            {study.results && (
              <section>
                <h2 className="font-display text-3xl md:text-4xl mb-6">Results</h2>
                <ul className="space-y-4">
                  {study.results.map((result) => (
                    <li key={result} className="flex items-start gap-3">
                      <CheckCircle2 className="text-teal-400 mt-1 shrink-0" size={20} />
                      <span className="text-gray-300">{result}</span>
                    </li>
                  ))}
                </ul>
              </section>
            )}

            <div className="pt-12 border-t border-white/10">
               <h3 className="font-display text-3xl mb-6">Ready for similar results?</h3>
               <a href={CALENDLY_LINK} target="_blank" rel="noopener noreferrer">
                 <MagneticButton variant="primary">Schedule Strategy Call</MagneticButton>
               </a>
            </div>
          </div>
        </div>

        {/* Next Project (Simple Navigation) */}
        <div className="border-t border-white/10">
          <Link to="/case-studies" className="block py-24 px-6 md:px-12 hover:bg-white/5 transition-colors group">
            <div className="max-w-7xl mx-auto flex justify-between items-center">
              <div>
                <span className="text-sm text-gray-500 uppercase tracking-widest mb-2 block">Next Project</span>
                <span className="font-display text-4xl md:text-6xl group-hover:text-teal-400 transition-colors">View All Case Studies</span>
              </div>
              <div className="w-16 h-16 rounded-full border border-white/20 flex items-center justify-center group-hover:bg-white group-hover:text-black transition-all">
                 <ArrowRight size={24} />
              </div>
            </div>
          </Link>
        </div>
      </article>
    </>
  );
};

export default CaseStudyDetail;
