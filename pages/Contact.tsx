import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import MagneticButton from '../components/MagneticButton';
import { CALENDLY_LINK } from '../constants';
import SEO from '../components/SEO';

const Contact: React.FC = () => {
  return (
    <>
      <SEO 
        title="Contact Qognition | Free Marketing Consultation"
        description="Ready to scale your business? Get a free consultation with our digital marketing experts. Email us at hello@qognition.agency or book a call today!"
        path="/contact"
        schemaData={{
          type: "Organization",
          name: "Qognition Agency",
          url: "https://qognitionagency.com/contact"
        }}
      />
      <div className="min-h-screen pt-20 px-6 md:px-12 max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-32">
        <div>
          <h1 className="font-display text-5xl md:text-7xl mb-8">Let's build something <span className="text-teal-400">extraordinary</span>.</h1>
          <p className="text-xl text-gray-400 mb-12 leading-relaxed">
            We're excited to learn about your project and explore how we can help you achieve your digital marketing goals. Whether you're looking to increase traffic, generate leads, or build your brand, we're here to help.
          </p>

          <div className="space-y-8 mb-12">
            <div>
              <h3 className="text-white font-bold mb-2">New Business Inquiries</h3>
              <p className="text-gray-400 mb-2">Ready to start your project? Send us a message.</p>
              <a href="mailto:hello@qognition.agency" className="text-gray-400 hover:text-teal-400 transition-colors text-lg">hello@qognition.agency</a>
            </div>
            <div>
              <h3 className="text-white font-bold mb-2">Careers</h3>
              <p className="text-gray-400 mb-2">Join our team of digital marketing experts.</p>
              <a href="mailto:careers@qognition.agency" className="text-gray-400 hover:text-teal-400 transition-colors text-lg">careers@qognition.agency</a>
            </div>
            <div>
              <h3 className="text-white font-bold mb-2">General Inquiries</h3>
              <p className="text-gray-400 mb-2">Questions about our services? We're happy to help.</p>
              <a href="mailto:info@qognition.agency" className="text-gray-400 hover:text-teal-400 transition-colors text-lg">info@qognition.agency</a>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-12">
            <div className="p-6 bg-white/5 border border-white/10 rounded-xl">
              <h4 className="font-bold text-white mb-2">Global Presence</h4>
              <p className="text-gray-400 text-sm">Offices in London, New York, Dubai, and Mumbai</p>
              <Link to="/regions" className="text-teal-400 text-sm hover:underline mt-2 inline-block">View all locations →</Link>
            </div>
            <div className="p-6 bg-white/5 border border-white/10 rounded-xl">
              <h4 className="font-bold text-white mb-2">Industries We Serve</h4>
              <p className="text-gray-400 text-sm">Technology, Healthcare, Finance, E-commerce & more</p>
              <Link to="/industries" className="text-teal-400 text-sm hover:underline mt-2 inline-block">View industries →</Link>
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
            <label className="block text-sm font-bold uppercase tracking-wider text-gray-500 mb-2 group-focus-within:text-teal-400 transition-colors">Full Name</label>
            <input type="text" className="w-full bg-transparent border-b border-white/20 py-4 text-xl outline-none focus:border-teal-400 transition-colors placeholder-white/20" placeholder="John Doe" />
          </div>
          <div className="group">
            <label className="block text-sm font-bold uppercase tracking-wider text-gray-500 mb-2 group-focus-within:text-teal-400 transition-colors">Email Address</label>
            <input type="email" className="w-full bg-transparent border-b border-white/20 py-4 text-xl outline-none focus:border-teal-400 transition-colors placeholder-white/20" placeholder="john@company.com" />
          </div>
          <div className="group">
            <label className="block text-sm font-bold uppercase tracking-wider text-gray-500 mb-2 group-focus-within:text-teal-400 transition-colors">Company Website</label>
            <input type="url" className="w-full bg-transparent border-b border-white/20 py-4 text-xl outline-none focus:border-teal-400 transition-colors placeholder-white/20" placeholder="https://yourcompany.com" />
          </div>
          <div className="group">
            <label className="block text-sm font-bold uppercase tracking-wider text-gray-500 mb-2 group-focus-within:text-teal-400 transition-colors">Services You're Interested In</label>
            <div className="flex flex-wrap gap-2 py-2">
              <label className="flex items-center gap-2 text-sm text-gray-400 cursor-pointer">
                <input type="checkbox" className="rounded border-white/20" /> SEO
              </label>
              <label className="flex items-center gap-2 text-sm text-gray-400 cursor-pointer">
                <input type="checkbox" className="rounded border-white/20" /> PPC
              </label>
              <label className="flex items-center gap-2 text-sm text-gray-400 cursor-pointer">
                <input type="checkbox" className="rounded border-white/20" /> Social Media
              </label>
              <label className="flex items-center gap-2 text-sm text-gray-400 cursor-pointer">
                <input type="checkbox" className="rounded border-white/20" /> Web Development
              </label>
            </div>
          </div>
          <div className="group">
            <label className="block text-sm font-bold uppercase tracking-wider text-gray-500 mb-2 group-focus-within:text-teal-400 transition-colors">Project Details</label>
            <textarea rows={4} className="w-full bg-transparent border-b border-white/20 py-4 text-xl outline-none focus:border-teal-400 transition-colors placeholder-white/20 resize-none" placeholder="Tell us about your project, goals, and timeline..."></textarea>
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