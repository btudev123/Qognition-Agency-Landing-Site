
import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X, ArrowUpRight } from 'lucide-react';
import { NAV_ITEMS, CALENDLY_LINK, TOOL_CATEGORIES } from '../constants';
import MagneticButton from './MagneticButton';
import NeuronBackground from './NeuronBackground';

// Custom Qognition Logo Component - Concentric Q with Pointer
const Logo: React.FC<{ className?: string }> = ({ className = "w-10 h-10" }) => (
  <svg viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg" className={className}>
    {/* Concentric Lines */}
    <path d="M50 20 C66.5685 20 80 33.4315 80 50 C80 66.5685 66.5685 80 50 80 C33.4315 80 20 66.5685 20 50 C20 33.4315 33.4315 20 50 20" stroke="currentColor" strokeWidth="6" strokeLinecap="round" className="opacity-100" />
    <path d="M50 32 C59.9411 32 68 40.0589 68 50 C68 59.9411 59.9411 68 50 68 C40.0589 68 32 59.9411 32 50 C32 40.0589 40.0589 32 50 32" stroke="currentColor" strokeWidth="5" strokeLinecap="round" className="opacity-70" />
    <path d="M50 42 C54.4183 42 58 45.5817 58 50 C58 54.4183 54.4183 58 50 58 C45.5817 58 42 54.4183 42 50 C42 45.5817 45.5817 42 50 42" stroke="currentColor" strokeWidth="4" strokeLinecap="round" className="opacity-40" />
    
    {/* Teal Pointer Triangle */}
    <path d="M50 85 L62 100 L38 100 Z" fill="#00C2A8" />
  </svg>
);

const Layout: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [hoveredPath, setHoveredPath] = useState<string | null>(null);
  const location = useLocation();

  // Close menu on route change
  useEffect(() => {
    setIsMenuOpen(false);
  }, [location]);

  // Handle scroll effect for navbar
  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <div className="min-h-screen relative font-sans text-white selection:bg-teal-500/30">
      <NeuronBackground />
      
      {/* Navbar - Fixed & High Z-Index */}
      <nav 
        className={`fixed top-0 left-0 w-full z-[100] transition-all duration-500 ease-out border-b ${
          scrolled 
            ? 'py-4 bg-black/80 backdrop-blur-xl border-white/10 shadow-2xl shadow-black/50' 
            : 'py-6 md:py-8 bg-transparent border-transparent'
        }`}
      >
        <div className="px-6 md:px-12 max-w-8xl mx-auto flex justify-between items-center relative">
          
          {/* Logo */}
          <Link to="/" className="z-50 group relative flex items-center gap-3">
            <div className={`transition-colors duration-300 ${scrolled ? 'text-white' : 'text-white'}`}>
              <Logo className="w-10 h-10 md:w-12 md:h-12" />
            </div>
            <span className={`font-display font-bold text-2xl tracking-tighter hidden md:block transition-colors duration-300 ${scrolled ? 'text-white' : 'text-white'}`}>
              Qognition
            </span>
          </Link>

          {/* Desktop Nav - Interactive Pill */}
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
                  
                  {/* Active State Background */}
                  {isActive && (
                      <motion.div
                          layoutId="navbar-indicator"
                          className="absolute inset-0 bg-teal-400 rounded-full z-0"
                          transition={{ type: "spring", bounce: 0.15, duration: 0.5 }}
                      />
                  )}
                  
                  {/* Hover State Background */}
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

          {/* CTA & Mobile Toggle */}
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

      {/* Mobile Menu Overlay */}
      <AnimatePresence>
        {isMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: "-100%" }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: "-100%" }}
            transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }} // Luxury easing
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

      {/* Main Content */}
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
            <div className="flex gap-4">
              {['Instagram', 'LinkedIn', 'Twitter'].map((social) => (
                <a key={social} href="#" className="w-10 h-10 rounded-full border border-white/20 flex items-center justify-center hover:bg-white hover:text-black hover:border-white transition-all duration-300">
                  <ArrowUpRight size={18} />
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
            </ul>
          </div>
          
          {/* Updated Resources Column */}
          <div className="md:col-span-2">
            <h4 className="font-mono text-xs font-bold text-teal-400 uppercase tracking-widest mb-8">Resources</h4>
            <ul className="space-y-4 text-gray-400 text-sm">
              <li><Link to="/directory" className="hover:text-white transition-colors font-bold text-teal-200">Tools Directory</Link></li>
              {/* Map top 4 categories dynamically */}
              {TOOL_CATEGORIES.slice(0, 4).map(cat => (
                 <li key={cat.id}>
                    <Link to={`/directory/${cat.slug}`} className="hover:text-white transition-colors">
                        {cat.name}
                    </Link>
                 </li>
              ))}
              <li><Link to="/blog" className="hover:text-white transition-colors">Insights & Blog</Link></li>
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
          
           <div className="md:col-span-2">
             <h4 className="font-mono text-xs font-bold text-teal-400 uppercase tracking-widest mb-8">Legal</h4>
             <ul className="space-y-4 text-gray-400 text-sm">
               <li><Link to="/privacy" className="hover:text-white transition-colors">Privacy Policy</Link></li>
               <li><Link to="/terms" className="hover:text-white transition-colors">Terms of Service</Link></li>
             </ul>
          </div>
        </div>
        
        <div className="max-w-8xl mx-auto pt-8 border-t border-white/5 flex flex-col md:flex-row justify-between items-center text-gray-600 text-xs font-mono uppercase tracking-wider">
           <p>© {new Date().getFullYear()} Qognition Agency.</p>
           <p className="mt-2 md:mt-0">London • New York • Dubai • Bangalore • Sydney</p>
        </div>
      </footer>
    </div>
  );
};

export default Layout;
