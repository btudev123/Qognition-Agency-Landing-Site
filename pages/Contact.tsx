import React from 'react';
import { motion } from 'framer-motion';
import MagneticButton from '../components/MagneticButton';
import { CALENDLY_LINK } from '../constants';
import JsonLd from '../components/JsonLd';

const Contact: React.FC = () => {
  return (
    <>
       <JsonLd 
        data={{
          title: "Contact Us | Qognition Agency",
          description: "Start your project with Qognition. London, New York, Dubai.",
          url: "/contact",
          type: "Organization"
        }}
      />
      <div className="min-h-screen pt-20 px-6 md:px-12 max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-32">
        <div>
          <h1 className="font-display text-5xl md:text-7xl mb-8">Let's build something <span className="text-teal-400">extraordinary</span>.</h1>
          <p className="text-xl text-gray-400 mb-12 leading-relaxed">
            We are currently accepting new partnerships for Q3 2024. 
            Tell us about your project, timeline, and goals.
          </p>

          <div className="space-y-8">
            <div>
              <h3 className="text-white font-bold mb-2">New Business</h3>
              <a href="mailto:hello@qognition.agency" className="text-gray-400 hover:text-teal-400 transition-colors text-lg">hello@qognition.agency</a>
            </div>
            <div>
              <h3 className="text-white font-bold mb-2">Careers</h3>
              <a href="mailto:careers@qognition.agency" className="text-gray-400 hover:text-teal-400 transition-colors text-lg">careers@qognition.agency</a>
            </div>
          </div>
          
          <div className="mt-12 p-8 bg-white/5 border border-teal-500/20 rounded-xl">
             <h4 className="font-display text-xl mb-4">Skip the email?</h4>
             <p className="text-sm text-gray-400 mb-6">Book a 15-minute discovery call directly with our strategy director.</p>
             <a href={CALENDLY_LINK} target="_blank" rel="noopener noreferrer">
               <MagneticButton variant="primary">Schedule Call</MagneticButton>
             </a>
          </div>
        </div>

        <motion.form 
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.3 }}
          className="space-y-8 bg-white/5 p-8 md:p-12 rounded-2xl border border-white/5"
          onSubmit={(e) => e.preventDefault()}
        >
          <div className="group">
            <label className="block text-sm font-bold uppercase tracking-wider text-gray-500 mb-2 group-focus-within:text-teal-400 transition-colors">Name</label>
            <input type="text" className="w-full bg-transparent border-b border-white/20 py-4 text-xl outline-none focus:border-teal-400 transition-colors placeholder-white/20" placeholder="John Doe" />
          </div>
          <div className="group">
            <label className="block text-sm font-bold uppercase tracking-wider text-gray-500 mb-2 group-focus-within:text-teal-400 transition-colors">Email</label>
            <input type="email" className="w-full bg-transparent border-b border-white/20 py-4 text-xl outline-none focus:border-teal-400 transition-colors placeholder-white/20" placeholder="john@company.com" />
          </div>
          <div className="group">
            <label className="block text-sm font-bold uppercase tracking-wider text-gray-500 mb-2 group-focus-within:text-teal-400 transition-colors">Project Details</label>
            <textarea rows={4} className="w-full bg-transparent border-b border-white/20 py-4 text-xl outline-none focus:border-teal-400 transition-colors placeholder-white/20 resize-none" placeholder="Tell us about your goals..."></textarea>
          </div>
          
          <div className="pt-4">
            <MagneticButton className="w-full">Send Inquiry</MagneticButton>
          </div>
        </motion.form>
      </div>
    </>
  );
};

export default Contact;