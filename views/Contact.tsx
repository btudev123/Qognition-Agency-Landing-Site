import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Link } from '../lib/routerCompat';
import MagneticButton from '../components/MagneticButton';
import { CALENDLY_LINK, WHATSAPP_DISPLAY, WHATSAPP_LINK } from '../constants';
import SEO from '../components/SEO';

const Contact: React.FC = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    website: '',
    services: [] as string[],
    message: ''
  });
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleCheckbox = (service: string) => {
    setFormData(prev => ({
      ...prev,
      services: prev.services.includes(service)
        ? prev.services.filter(s => s !== service)
        : [...prev.services, service]
    }));
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    
    const form = e.currentTarget;
    
    try {
      const response = await fetch('https://formspree.io/f/xlganjog', {
        method: 'POST',
        body: new FormData(form),
        headers: {
          'Accept': 'application/json'
        }
      });
      
      if (response.ok) {
        setSubmitted(true);
        const waMessage = `*New Form Submission*%0A%0A*Name:* ${formData.name}%0A*Email:* ${formData.email}%0A*Website:* ${formData.website || 'Not provided'}%0A*Services:* ${formData.services.join(', ') || 'Not specified'}%0A*Message:* ${formData.message}`;
        window.open(`${WHATSAPP_LINK}?text=${waMessage}`, '_blank');
      }
    } catch (error) {
      console.error('Form submission error:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <SEO 
        title="Contact Qognition | Free Marketing Consultation"
        description="Ready to scale your business? Get a free consultation with our digital marketing experts. Email us at hello@qognitionagency.com or book a call today!"
        path="/contact"
        schemaData={{
          type: "Organization",
          name: "Qognition Agency",
          url: "https://www.qognitionagency.com/contact"
        }}
      />
      <div className="min-h-screen pt-20 px-6 md:px-12 max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-32">
        <div>
          <h1 className="font-display text-5xl md:text-7xl mb-8">Let's build something <span className="text-teal-400">extraordinary</span>.</h1>
          <p className="text-xl text-gray-400 mb-12 leading-relaxed">
            We're excited to learn about your project and explore how we can help you achieve your digital marketing goals.
          </p>

          <div className="space-y-8 mb-12">
            <div>
              <h3 className="text-white font-bold mb-2">New Business Inquiries</h3>
              <p className="text-gray-400 mb-2">Ready to start your project? Send us a message.</p>
              <a href="mailto:hello@qognitionagency.com" className="text-gray-400 hover:text-teal-400 transition-colors text-lg">hello@qognitionagency.com</a>
            </div>
            <div>
              <h3 className="text-white font-bold mb-2">WhatsApp</h3>
              <p className="text-gray-400 mb-2">Chat with us instantly</p>
              <a href={WHATSAPP_LINK} target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-teal-400 transition-colors text-lg flex items-center gap-2">
                {WHATSAPP_DISPLAY} <span className="text-green-400 text-sm">● Online</span>
              </a>
            </div>
            <div>
              <h3 className="text-white font-bold mb-2">Careers</h3>
              <p className="text-gray-400 mb-2">Join our team of digital marketing experts.</p>
              <a href="mailto:hello@qognitionagency.com" className="text-gray-400 hover:text-teal-400 transition-colors text-lg">hello@qognitionagency.com</a>
            </div>
            <div>
              <h3 className="text-white font-bold mb-2">General Inquiries</h3>
              <p className="text-gray-400 mb-2">Questions about our services? We're happy to help.</p>
              <a href="mailto:hello@qognitionagency.com" className="text-gray-400 hover:text-teal-400 transition-colors text-lg">hello@qognitionagency.com</a>
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
               <MagneticButton variant="primary">Book Strategy Call</MagneticButton>
             </a>
          </div>
        </div>

        <motion.form 
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.3 }}
          action="https://formspree.io/f/xlganjog"
          method="POST"
          className="space-y-8 bg-white/5 p-8 md:p-12 rounded-2xl border border-white/5"
          onSubmit={handleSubmit}
        >
          {submitted ? (
            <div className="text-center py-12">
              <div className="text-6xl mb-6">🎉</div>
              <h3 className="font-display text-3xl mb-4">Thank You!</h3>
              <p className="text-gray-400 mb-8">We've received your message. We'll get back to you within 24 hours.</p>
              <a href={WHATSAPP_LINK} target="_blank" rel="noopener noreferrer" className="text-teal-400 hover:underline">
                Or chat with us on WhatsApp →
              </a>
            </div>
          ) : (
            <>
              <div className="group">
                <label className="block text-sm font-bold uppercase tracking-wider text-gray-500 mb-2 group-focus-within:text-teal-400 transition-colors">Full Name *</label>
                <input 
                  type="text" 
                  name="name"
                  required
                  value={formData.name}
                  onChange={(e) => setFormData({...formData, name: e.target.value})}
                  className="w-full bg-transparent border-b border-white/20 py-4 text-xl outline-none focus:border-teal-400 transition-colors placeholder-white/20" 
                  placeholder="John Doe" 
                />
              </div>
              <div className="group">
                <label className="block text-sm font-bold uppercase tracking-wider text-gray-500 mb-2 group-focus-within:text-teal-400 transition-colors">Email Address *</label>
                <input 
                  type="email" 
                  name="email"
                  required
                  value={formData.email}
                  onChange={(e) => setFormData({...formData, email: e.target.value})}
                  className="w-full bg-transparent border-b border-white/20 py-4 text-xl outline-none focus:border-teal-400 transition-colors placeholder-white/20" 
                  placeholder="john@company.com" 
                />
              </div>
              <div className="group">
                <label className="block text-sm font-bold uppercase tracking-wider text-gray-500 mb-2 group-focus-within:text-teal-400 transition-colors">Company Website</label>
                <input 
                  type="url" 
                  name="website"
                  value={formData.website}
                  onChange={(e) => setFormData({...formData, website: e.target.value})}
                  className="w-full bg-transparent border-b border-white/20 py-4 text-xl outline-none focus:border-teal-400 transition-colors placeholder-white/20" 
                  placeholder="https://yourcompany.com" 
                />
              </div>
              <div className="group">
                <label className="block text-sm font-bold uppercase tracking-wider text-gray-500 mb-2 group-focus-within:text-teal-400 transition-colors">Services You're Interested In</label>
                <div className="flex flex-wrap gap-2 py-2">
                  <label className="flex items-center gap-2 text-sm text-gray-400 cursor-pointer">
                    <input 
                      type="checkbox" 
                      name="services"
                      value="SEO"
                      checked={formData.services.includes('SEO')}
                      onChange={() => handleCheckbox('SEO')}
                      className="rounded border-white/20" 
                    /> SEO
                  </label>
                  <label className="flex items-center gap-2 text-sm text-gray-400 cursor-pointer">
                    <input 
                      type="checkbox" 
                      name="services"
                      value="PPC"
                      checked={formData.services.includes('PPC')}
                      onChange={() => handleCheckbox('PPC')}
                      className="rounded border-white/20" 
                    /> PPC
                  </label>
                  <label className="flex items-center gap-2 text-sm text-gray-400 cursor-pointer">
                    <input 
                      type="checkbox" 
                      name="services"
                      value="Social Media"
                      checked={formData.services.includes('Social Media')}
                      onChange={() => handleCheckbox('Social Media')}
                      className="rounded border-white/20" 
                    /> Social Media
                  </label>
                  <label className="flex items-center gap-2 text-sm text-gray-400 cursor-pointer">
                    <input 
                      type="checkbox" 
                      name="services"
                      value="Web Development"
                      checked={formData.services.includes('Web Development')}
                      onChange={() => handleCheckbox('Web Development')}
                      className="rounded border-white/20" 
                    /> Web Development
                  </label>
                </div>
              </div>
              <div className="group">
                <label className="block text-sm font-bold uppercase tracking-wider text-gray-500 mb-2 group-focus-within:text-teal-400 transition-colors">Project Details</label>
                <textarea 
                  name="message"
                  rows={4} 
                  value={formData.message}
                  onChange={(e) => setFormData({...formData, message: e.target.value})}
                  className="w-full bg-transparent border-b border-white/20 py-4 text-xl outline-none focus:border-teal-400 transition-colors placeholder-white/20 resize-none" 
                  placeholder="Tell us about your project, goals, and timeline..."
                ></textarea>
              </div>
              
              <div className="pt-4">
                <button
                  type="submit"
                  disabled={loading}
                  className="w-full rounded-full bg-teal-400 px-8 py-4 font-display text-sm font-medium uppercase tracking-wider text-black transition-colors hover:bg-white disabled:cursor-not-allowed disabled:opacity-60"
                >
                  {loading ? 'Sending...' : 'Send Inquiry'}
                </button>
              </div>
            </>
          )}
        </motion.form>
      </div>
    </>
  );
};

export default Contact;
