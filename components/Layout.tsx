
import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X, ArrowUpRight, Instagram, Linkedin, Twitter, Youtube, Facebook, Dribbble } from 'lucide-react';
import { NAV_ITEMS, CALENDLY_LINK, TOOL_CATEGORIES } from '../constants';
import MagneticButton from './MagneticButton';
import NeuronBackground from './NeuronBackground';

// Custom Icons for ones missing in Lucide (or style preference)
const BehanceIcon = ({ size = 20 }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M19 19h-5l-.7-2.3h-3.6L9 19H4l6-16h4l5 16ZM14.1 13h-3.2l1.6-4.9 1.6 4.9ZM22 5h-5M3 5h5M5 3v4" opacity="0" /> {/* Fallback if needed, using custom path for Behance */}
    <path d="M8 5h7a3 3 0 0 1 0 6H8V5zm7 6a3 3 0 0 1 0 6H8v-6h7zM17 11h5v2h-5z" stroke="none" fill="currentColor"/> 
    <path d="M18.5 5.5h-3c-1.1 0-2 .9-2 2v.5h-1v-.5c0-1.1-.9-2-2-2h-3c-1.1 0-2 .9-2 2v9c0 1.1.9 2 2 2h3c1.1 0 2-.9 2-2v-.5h1v.5c0 1.1.9 2 2 2h3c1.1 0 2-.9 2-2v-9c0-1.1-.9-2-2-2zm-3 7h-2v-2h2v2zm-2-4v-2h2v2h-2zm-6 4h-2v-2h2v2zm-2-4v-2h2v2h-2z" fillRule="evenodd"/>
    {/* Simple Behance text representation for clarity if path fails */}
    <text x="2" y="18" fontSize="16" fontWeight="bold" fill="currentColor">Be</text>
  </svg>
);

// Custom Qognition Logo Component
const Logo: React.FC<{ className?: string }> = ({ className = "w-10 h-10" }) => (
  <svg viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg" className={className}>
    <path d="M50 20 C66.5685 20 80 33.4315 80 50 C80 66.5685 66.5685 80 50 80 C33.4315 80 20 66.5685 20 50 C20 33.4315 33.4315 20 50 20" stroke="currentColor" strokeWidth="6" strokeLinecap="round" className="opacity-100" />
    <path d="M50 32 C59.9411 32 68 40.0589 68 50 C68 59.9411 59.9411 68 50 68 C40.0589 68 32 59.9411 32 50 C32 40.0589 40.0589 32 50 32" stroke="currentColor" strokeWidth="5" strokeLinecap="round" className="opacity-70" />
    <path d="M50 42 C54.4183 42 58 45.5817 58 50 C58 54.4183 54.4183 58 50 58 C45.5817 58 42 54.4183 42 50 C42 45.5817 45.5817 42 50 42" stroke="currentColor" strokeWidth="4" strokeLinecap="round" className="opacity-40" />
    <path d="M50 85 L62 100 L38 100 Z" fill="#00C2A8" />
  </svg>
);

const Layout: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [hoveredPath, setHoveredPath] = useState<string | null>(null);
  const location = useLocation();

  useEffect(() => {
    setIsMenuOpen(false);
  }, [location]);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const socialLinks = [
    { name: 'Twitter / X', url: 'https://x.com/qognition_tech', icon: Twitter },
    { name: 'LinkedIn', url: 'https://in.linkedin.com/company/qognition-tech', icon: Linkedin },
    { name: 'YouTube', url: 'https://www.youtube.com/@QognitionAgency', icon: Youtube },
    { name: 'Facebook', url: 'https://www.facebook.com/qognitiontech', icon: Facebook },
    { name: 'Instagram', url: 'https://www.instagram.com/qognition_agency/', icon: Instagram },
    { name: 'Dribbble', url: 'https://dribbble.com/qognition?utm_source=chatgpt.com', icon: Dribbble },
    { name: 'Behance', url: 'https://www.behance.net/qognition-agency', icon: BehanceIcon },
  ];

  return (
    <div className="min-h-screen relative font-sans text-white selection:bg-teal-500/30">
      <NeuronBackground />
      
      {/* Navbar */}
      <nav 
        className={`fixed top-0 left-0 w-full z-[100] transition-all duration-500 ease-out border-b ${
          scrolled 
            ? 'py-4 bg-black/80 backdrop-blur-xl border-white/10 shadow-2xl shadow-black/50' 
            : 'py-6 md:py-8 bg-transparent border-transparent'
        }`}
      >
        <div className="px-6 md:px-12 max-w-8xl mx-auto flex justify-between items-center relative">
          <Link to="/" className="z-50 group relative flex items-center gap-3">
            <div className={`transition-colors duration-300 ${scrolled ? 'text-white' : 'text-white'}`}>
              <Logo className="w-10 h-10 md:w-12 md:h-12" />
            </div>
            <span className={`font-display font-bold text-2xl tracking-tighter hidden md:block transition-colors duration-300 ${scrolled ? 'text-white' : 'text-white'}`}>
              Qognition
            </span>
          </Link>

          {/* Desktop Nav */}
          <div className="hidden lg:flex items-center gap-1 p-1 rounded-full bg-white/5 border border-white/5 backdrop-blur-sm">
            {NAV_ITEMS.map((item) => {
              const isActive = item.path === location.pathname;
              return (
                <Link 
                  key={item.path} 
                  to={item.path} 
                  className={`relative px-6 py-2.5 text-xs font-medium uppercase tracking-widest transition-colors duration-300 z-10 ${isActive ? 'text-black' : 'text-gray-300 hover:text-white'}`}
                  onMouseEnter={() => setHoveredPath(item.path)}
                  onMouseLeave={() => setHoveredPath(null)}
                >
                  <span className="relative z-10">{item.label}</span>
                  {isActive && (
                      <motion.div
                          layoutId="navbar-indicator"
                          className="absolute inset-0 bg-teal-400 rounded-full z-0"
                          transition={{ type: "spring", bounce: 0.15, duration: 0.5 }}
                      />
                  )}
                  {hoveredPath === item.path && !isActive && (
                      <motion.div
                          layoutId="navbar-hover"
                          className="absolute inset-0 bg-white/10 rounded-full z-0"
                          initial={{ opacity: 0 }}
                          animate={{ opacity: 1 }}
                          exit={{ opacity: 0 }}
                          transition={{ duration: 0.2 }}
                      />
                  )}
                </Link>
              );
            })}
          </div>

          <div className="flex items-center gap-6">
            <div className="hidden md:block">
                <a href={CALENDLY_LINK} target="_blank" rel="noopener noreferrer">
                   <MagneticButton variant="primary" className="scale-90 origin-right">
                      Start Project
                   </MagneticButton>
                </a>
            </div>
            <button 
                className="lg:hidden z-50 p-2 text-white hover:text-teal-400 transition-colors"
                onClick={() => setIsMenuOpen(!isMenuOpen)}
                aria-label="Toggle Menu"
            >
                {isMenuOpen ? <X size={28} /> : <Menu size={28} />}
            </button>
          </div>
        </div>
      </nav>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: "-100%" }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: "-100%" }}
            transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
            className="fixed inset-0 z-[90] bg-black/95 backdrop-blur-3xl flex flex-col items-center justify-center border-b border-white/10"
          >
            <div className="flex flex-col gap-6 text-center">
              {NAV_ITEMS.map((item, i) => (
                <motion.div
                  key={item.path}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.1 * i + 0.2 }}
                >
                  <Link 
                    to={item.path} 
                    className="font-display text-5xl font-light hover:text-teal-400 transition-colors block py-2"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    {item.label}
                  </Link>
                </motion.div>
              ))}
              <motion.div 
                 initial={{ opacity: 0 }}
                 animate={{ opacity: 1 }}
                 transition={{ delay: 0.5 }}
                 className="mt-8"
              >
                  <a href={CALENDLY_LINK} target="_blank" rel="noopener noreferrer">
                    <MagneticButton variant="primary">Schedule Call</MagneticButton>
                  </a>
              </motion.div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <main className="relative z-10 min-h-screen">
        {children}
      </main>

      {/* Footer */}
      <footer className="relative z-10 bg-black pt-24 pb-12 px-6 md:px-12 border-t border-white/10">
        <div className="max-w-8xl mx-auto grid grid-cols-1 md:grid-cols-12 gap-12 mb-20">
          <div className="md:col-span-4">
            <Link to="/" className="flex items-center gap-3 mb-8 group">
                <div className="w-10 h-10 text-white group-hover:text-teal-400 transition-colors">
                    <Logo />
                </div>
                <span className="font-display font-bold text-2xl tracking-tight text-white group-hover:text-teal-400 transition-colors">Qognition</span>
            </Link>
            <p className="text-gray-400 text-lg max-w-md mb-8 font-light leading-relaxed">
              Global Digital Growth Partner. We fuse creative strategy, technical engineering, and performance marketing to build category-defining brands.
            </p>
            <div className="flex gap-4 flex-wrap">
              {socialLinks.map((social) => (
                <a 
                  key={social.name} 
                  href={social.url} 
                  target="_blank" 
                  rel="noopener noreferrer" 
                  aria-label={social.name}
                  className="w-10 h-10 rounded-full border border-white/20 flex items-center justify-center hover:bg-white hover:text-black hover:border-white transition-all duration-300"
                >
                  <social.icon size={18} />
                </a>
              ))}
            </div>
          </div>

            <div className="md:col-span-2 md:col-start-6">
              <h4 className="font-mono text-xs font-bold text-teal-400 uppercase tracking-widest mb-8">Sitemap</h4>
              <ul className="space-y-4 text-gray-400 text-sm">
                <li><Link to="/services" className="hover:text-white transition-colors">Capabilities</Link></li>
                <li><Link to="/industries" className="hover:text-white transition-colors">Industries</Link></li>
                <li><Link to="/regions" className="hover:text-white transition-colors">Global Hubs</Link></li>
                <li><Link to="/work" className="hover:text-white transition-colors">Case Studies</Link></li>
                <li><Link to="/blog" className="hover:text-white transition-colors">Blog</Link></li>
              </ul>
            </div>
          
          <div className="md:col-span-2">
            <h4 className="font-mono text-xs font-bold text-teal-400 uppercase tracking-widest mb-8">Resources</h4>
            <ul className="space-y-4 text-gray-400 text-sm">
              <li><Link to="/directory" className="hover:text-white transition-colors font-bold text-teal-200">Tools Directory</Link></li>
              {TOOL_CATEGORIES.slice(0, 4).map(cat => (
                 <li key={cat.id}>
                    <Link to={`/directory/${cat.slug}`} className="hover:text-white transition-colors">
                        {cat.name}
                    </Link>
                 </li>
              ))}
            </ul>
          </div>

          <div className="md:col-span-2">
             <h4 className="font-mono text-xs font-bold text-teal-400 uppercase tracking-widest mb-8">Company</h4>
             <ul className="space-y-4 text-gray-400 text-sm">
               <li><Link to="/about" className="hover:text-white transition-colors">About Us</Link></li>
               <li><Link to="/contact" className="hover:text-white transition-colors">Careers</Link></li>
               <li><Link to="/contact" className="hover:text-white transition-colors">Contact</Link></li>
               <li><Link to="/sitemap" className="hover:text-white transition-colors">Sitemap</Link></li>
             </ul>
          </div>
        </div>
        
<div className="max-w-8xl mx-auto pt-8 border-t border-white/5 flex flex-col md:flex-row justify-between items-center text-gray-600 text-xs font-mono uppercase tracking-wider">
            <p>© {new Date().getFullYear()} Qognition Agency.</p>
            <p className="mt-2 md:mt-0">London • New York • Dubai • Bangalore • Sydney</p>
        </div>
      </footer>

      {/* WhatsApp Floating Button */}
      <a 
        href="https://wa.me/919217129349"
        target="_blank"
        rel="noopener noreferrer"
        className="fixed bottom-6 right-6 z-50 bg-green-500 hover:bg-green-400 text-white p-4 rounded-full shadow-2xl shadow-green-500/30 transition-all duration-300 hover:scale-110 group"
        aria-label="Chat on WhatsApp"
      >
        <svg width="28" height="28" viewBox="0 0 24 24" fill="currentColor">
          <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273.099-.472.162-.672.162.175 1.331.565 2.423 1.703 2.896l-.297-.149c-.509-.256-1.071-.508-1.573-.732-.254-.119-.491-.223-.708.223-.297.297-.783.925-1.003 1.115-.146.124-.291.149-.424.049-.385-.298-.736-.672-1.059-1.141-.245-.362-.441-.749-.441-1.232 0-1.525 1.372-2.795 1.943-3.208.294-.214.671-.248 1.009-.124.297.116.783.925 1.003 1.115.146.124.291.149.424.049.385-.298.736-.672 1.059-1.141.245-.362.441-.749.441-1.232 0-1.525-1.372-2.795-1.943-3.208-.294-.214-.671-.248-1.009-.124-.297.116-.783.925-1.003 1.115-.146.124-.291.149-.424.049-.385-.298-.736-.672-1.059-1.141-.245-.362-.441-.749-.441-1.232 0-.483.121-.939.33-1.331l1.897.789c.146.049.297.124.424.049.385-.298.736-.672 1.059-1.141.245-.362.441-.749.441-1.232 0-.483-.121-.939-.33-1.331l1.897.789c.146.049.297.124.424.049zM12.704 22c4.15 0 7.532-3.07 7.532-7.21 0-.478-.101-.947-.293-1.371l-1.133-3.692c-.072-.234-.465-.35-.703-.293l-2.959.789c-1.335-.896-2.859-1.549-4.511-1.549-4.15 0-7.532 3.07-7.532 7.21 0 1.525.459 2.963 1.259 4.207l1.133-3.692c.072-.234.465-.35.703-.293l2.959.789c1.335.896 2.859 1.549 4.511 1.549z"/>
        </svg>
        <span className="absolute right-0 top-0 w-3 h-3 bg-green-400 rounded-full border-2 border-black animate-pulse"></span>
      </a>
    </div>
  );
};

export default Layout;
