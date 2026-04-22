'use client';

import { useState } from 'react';

export default function ContactPage() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    company: '',
    budget: '',
    message: ''
  });
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus('loading');

    try {
      const response = await fetch('https://formspree.io/f/xlganjog', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData)
      });

      if (response.ok) {
        const whatsappMsg = `New Contact from Qognition Website:\n\nName: ${formData.name}\nEmail: ${formData.email}\nCompany: ${formData.company}\nBudget: ${formData.budget}\nMessage: ${formData.message}`;
        window.open(`https://wa.me/919217129349?text=${encodeURIComponent(whatsappMsg)}`, '_blank');
        setStatus('success');
      } else {
        setStatus('error');
      }
    } catch (error) {
      setStatus('error');
    }
  };

  return (
    <main className="min-h-screen bg-black text-white pt-32 pb-24 px-6 md:px-12">
      <div className="max-w-6xl mx-auto">
        <h1 className="text-5xl md:text-7xl font-display font-medium mb-6">Let&apos;s Work Together</h1>
        <p className="text-xl text-gray-300 max-w-2xl mb-16">
          Ready to accelerate your digital growth? Get in touch for a free strategy consultation.
        </p>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
          <div>
            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <label htmlFor="name" className="block text-sm font-medium text-gray-300 mb-2">Name *</label>
                <input
                  type="text"
                  id="name"
                  required
                  value={formData.name}
                  onChange={(e) => setFormData({...formData, name: e.target.value})}
                  className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-lg focus:border-teal-400 focus:outline-none text-white"
                />
              </div>
              
              <div>
                <label htmlFor="email" className="block text-sm font-medium text-gray-300 mb-2">Email *</label>
                <input
                  type="email"
                  id="email"
                  required
                  value={formData.email}
                  onChange={(e) => setFormData({...formData, email: e.target.value})}
                  className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-lg focus:border-teal-400 focus:outline-none text-white"
                />
              </div>
              
              <div>
                <label htmlFor="company" className="block text-sm font-medium text-gray-300 mb-2">Company</label>
                <input
                  type="text"
                  id="company"
                  value={formData.company}
                  onChange={(e) => setFormData({...formData, company: e.target.value})}
                  className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-lg focus:border-teal-400 focus:outline-none text-white"
                />
              </div>
              
              <div>
                <label htmlFor="budget" className="block text-sm font-medium text-gray-300 mb-2">Monthly Budget</label>
                <select
                  id="budget"
                  value={formData.budget}
                  onChange={(e) => setFormData({...formData, budget: e.target.value})}
                  className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-lg focus:border-teal-400 focus:outline-none text-white"
                >
                  <option value="">Select budget</option>
                  <option value="under-5k">Under $5,000</option>
                  <option value="5k-10k">$5,000 - $10,000</option>
                  <option value="10k-25k">$10,000 - $25,000</option>
                  <option value="25k-50k">$25,000 - $50,000</option>
                  <option value="50k+">$50,000+</option>
                </select>
              </div>
              
              <div>
                <label htmlFor="message" className="block text-sm font-medium text-gray-300 mb-2">Message *</label>
                <textarea
                  id="message"
                  required
                  rows={5}
                  value={formData.message}
                  onChange={(e) => setFormData({...formData, message: e.target.value})}
                  className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-lg focus:border-teal-400 focus:outline-none text-white resize-none"
                />
              </div>

              <button
                type="submit"
                disabled={status === 'loading'}
                className="w-full px-8 py-4 bg-teal-400 text-black font-display font-medium text-sm uppercase tracking-wider rounded-lg hover:bg-white transition-colors disabled:opacity-50"
              >
                {status === 'loading' ? 'Sending...' : 'Send Message'}
              </button>

              {status === 'success' && (
                <p className="text-green-400 text-center">Message sent! We&apos;ll be in touch soon.</p>
              )}
              
              {status === 'error' && (
                <p className="text-red-400 text-center">Something went wrong. Please try again or WhatsApp us directly.</p>
              )}
            </form>
          </div>

          <div>
            <h2 className="text-2xl font-semibold mb-6">Get in Touch</h2>
            <div className="space-y-6">
              <div>
                <h3 className="text-gray-400 text-sm mb-1">Email</h3>
                <a href="mailto:hello@qognition.agency" className="text-teal-400 hover:underline">hello@qognition.agency</a>
              </div>
              <div>
                <h3 className="text-gray-400 text-sm mb-1">WhatsApp</h3>
                <a href="https://wa.me/919217129349" className="text-teal-400 hover:underline">+91 9217129349</a>
              </div>
              <div>
                <h3 className="text-gray-400 text-sm mb-1">Office</h3>
                <p className="text-gray-300">London • New York • Dubai • Bangalore • Sydney</p>
              </div>
            </div>

            <div className="mt-12 p-6 bg-white/5 border border-white/10 rounded-lg">
              <h3 className="text-lg font-semibold mb-4">Book a Call</h3>
              <p className="text-gray-400 mb-4">Schedule a 15-minute consultation to discuss your project.</p>
              <a 
                href="https://calendly.com/qognition-agency/15min" 
                target="_blank" 
                rel="noopener noreferrer"
                className="inline-block px-6 py-3 bg-teal-400 text-black font-medium rounded-lg hover:bg-white transition-colors"
              >
                Schedule Call
              </a>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}