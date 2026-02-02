import React from 'react';
import { motion } from 'framer-motion';
import { Users, Target, Rocket, Globe, Zap, Heart } from 'lucide-react';
import { ABOUT_DATA, CALENDLY_LINK } from '../constants';
import JsonLd from '../components/JsonLd';
import MagneticButton from '../components/MagneticButton';
import TextReveal from '../components/TextReveal';

const About: React.FC = () => {
  return (
    <>
      <JsonLd 
        data={{
          title: "About Qognition | Global Digital Agency",
          description: "Meet the 120+ experts behind Qognition. We are a next-generation agency fusing AI, creativity, and engineering.",
          url: "/about",
          type: "Organization"
        }}
      />
      
      <div className="pt-32 pb-24 px-6 md:px-12 max-w-7xl mx-auto">
        {/* Hero */}
        <div className="max-w-5xl mx-auto mb-32">
          <motion.h1 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="font-display text-5xl md:text-8xl mb-12"
          >
            Engineering<br/>
            <span className="text-teal-400">Digital Domination.</span>
          </motion.h1>
          <div className="text-xl md:text-3xl text-gray-300 leading-relaxed space-y-8">
            <p>
              Qognition was founded on a simple premise: The old agency model is broken. Slow, bloated, and reactive.
            </p>
            <p>
              We built the anti-agency. A high-velocity collective of data scientists, creative directors, and full-stack engineers embedded directly into your growth stack.
            </p>
          </div>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mb-32 border-y border-white/10 py-16">
            {ABOUT_DATA.stats.map((stat, index) => (
                <motion.div 
                    key={index}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: index * 0.1 }}
                    className="text-center md:text-left"
                >
                    <div className="text-4xl md:text-6xl font-display font-bold text-white mb-2">{stat.value}</div>
                    <div className="text-sm text-gray-500 uppercase tracking-widest">{stat.label}</div>
                </motion.div>
            ))}
        </div>

        {/* Mission & Vision */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-16 mb-32">
            <div className="p-12 bg-white/5 rounded-2xl border border-white/10">
                <Target className="text-teal-400 mb-6" size={48} />
                <h2 className="font-display text-3xl mb-6">Our Mission</h2>
                <p className="text-xl text-gray-300 leading-relaxed">{ABOUT_DATA.mission}</p>
            </div>
            <div className="p-12 bg-teal-900/10 rounded-2xl border border-teal-500/20">
                <Rocket className="text-teal-400 mb-6" size={48} />
                <h2 className="font-display text-3xl mb-6">Our Vision</h2>
                <p className="text-xl text-gray-300 leading-relaxed">{ABOUT_DATA.vision}</p>
            </div>
        </div>

        {/* Values */}
        <div className="mb-32">
            <h2 className="font-display text-4xl md:text-6xl mb-16 text-center">Operating Principles</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-x-16 gap-y-12">
                {ABOUT_DATA.values.map((value, i) => (
                    <motion.div 
                        key={i}
                        initial={{ opacity: 0, x: i % 2 === 0 ? -20 : 20 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        className="flex gap-6 border-t border-white/10 pt-8"
                    >
                        <div className="text-teal-400 font-mono text-xl">0{i + 1}</div>
                        <div>
                            <h3 className="font-display text-2xl mb-4">{value.title}</h3>
                            <p className="text-gray-400 leading-relaxed">{value.desc}</p>
                        </div>
                    </motion.div>
                ))}
            </div>
        </div>

        {/* Team Structure / Squads */}
        <div className="mb-32">
            <h2 className="font-display text-4xl md:text-6xl mb-16 text-center">The Squad Model</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                <div className="p-8 border border-white/10 rounded-xl hover:bg-white/5 transition-colors">
                    <Zap className="text-teal-400 mb-6" size={32} />
                    <h3 className="font-display text-2xl mb-4">Growth Squad</h3>
                    <p className="text-gray-400 mb-4">Focus: Acquisition, SEO, PPC.</p>
                    <ul className="text-sm text-gray-500 space-y-2">
                        <li>• Performance Marketers</li>
                        <li>• SEO Strategists</li>
                        <li>• Data Analysts</li>
                    </ul>
                </div>
                <div className="p-8 border border-white/10 rounded-xl hover:bg-white/5 transition-colors">
                    <Globe className="text-teal-400 mb-6" size={32} />
                    <h3 className="font-display text-2xl mb-4">Creative Squad</h3>
                    <p className="text-gray-400 mb-4">Focus: Brand, UI/UX, Content.</p>
                    <ul className="text-sm text-gray-500 space-y-2">
                        <li>• Art Directors</li>
                        <li>• Motion Designers</li>
                        <li>• UX Researchers</li>
                    </ul>
                </div>
                <div className="p-8 border border-white/10 rounded-xl hover:bg-white/5 transition-colors">
                    <Users className="text-teal-400 mb-6" size={32} />
                    <h3 className="font-display text-2xl mb-4">Tech Squad</h3>
                    <p className="text-gray-400 mb-4">Focus: Dev, Automation, AI.</p>
                    <ul className="text-sm text-gray-500 space-y-2">
                        <li>• Full-Stack Engineers</li>
                        <li>• AI Architects</li>
                        <li>• DevOps</li>
                    </ul>
                </div>
            </div>
        </div>

        {/* CTA */}
        <div className="text-center py-24 border-t border-white/10">
            <h2 className="font-display text-4xl md:text-6xl mb-8">Join the movement.</h2>
            <p className="text-gray-400 mb-12 max-w-2xl mx-auto">
                We are always looking for world-class talent and ambitious partners.
            </p>
            <div className="flex flex-col md:flex-row justify-center gap-6">
                 <a href={CALENDLY_LINK} target="_blank" rel="noopener noreferrer">
                    <MagneticButton variant="primary" className="w-full md:w-auto">Work With Us</MagneticButton>
                 </a>
                 <a href="mailto:careers@qognition.agency">
                    <MagneticButton variant="outline" className="w-full md:w-auto">Join the Team</MagneticButton>
                 </a>
            </div>
        </div>
      </div>
    </>
  );
};

export default About;