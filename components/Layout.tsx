
import React, { useState, useEffect } from 'react';
import { Link, useLocation } from '../lib/routerCompat';
import { Menu, X, Instagram, Linkedin, Twitter, Youtube, Facebook, Dribbble, ChevronDown } from 'lucide-react';
import { AnimatePresence, motion } from 'framer-motion';
import { CALENDLY_LINK, CONTACT_MAILTO, WHATSAPP_LINK } from '../data/siteConfig';
import { TOOL_CATEGORIES } from '../data/toolCategories';
import { SERVICES } from '../data/services';
import { INDUSTRIES } from '../data/industries';
import { REGIONS } from '../data/regions';
import { LOCATIONS } from '../data/locations';
import { RESOURCES, SERVICE_SUB_PAGES } from '../data/seoExpansion';
import { B2B_MOFU_PAGES } from '../data/b2bPages';
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

const Logo: React.FC<{ className?: string }> = ({ className = "w-11 h-11" }) => (
  <img
    src="/favicon-192x192.png"
    srcSet="/favicon-32x32.png 32w, /favicon-192x192.png 192w"
    sizes="(min-width: 768px) 40px, 32px"
    alt=""
    className={`${className} object-contain transition-transform duration-300 group-hover:scale-105`}
    width={56}
    height={56}
    draggable={false}
  />
);

const Layout: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [hoveredPath, setHoveredPath] = useState<string | null>(null);
  const [activeMega, setActiveMega] = useState<string | null>(null);
  const [activeMobileGroup, setActiveMobileGroup] = useState('Services');
  const [activeMobileColumn, setActiveMobileColumn] = useState('Services:SEO & Organic Growth');
  const location = useLocation();

  useEffect(() => {
    setIsMenuOpen(false);
  }, [location.pathname]);

  useEffect(() => {
    document.body.style.overflow = isMenuOpen ? 'hidden' : '';
    return () => {
      document.body.style.overflow = '';
    };
  }, [isMenuOpen]);

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

  const getServiceSubPages = (serviceId: string) =>
    SERVICE_SUB_PAGES.filter((page) => page.serviceId === serviceId).slice(0, 6);

  const navGroups = [
    {
      label: 'Services',
      path: '/services',
      columns: SERVICES.map((service) => ({
        title: service.title.replace('Web Development', 'Web Design'),
        links: [
          { label: `${service.title.replace('Web Development', 'Web Design')} Overview`, path: `/services/${service.id}` },
          ...getServiceSubPages(service.id).map((page) => ({
            label: page.title.replace(' Services', '').replace(' | Qognition', ''),
            path: `/services/${page.serviceId}/${page.slug}`
          }))
        ]
      }))
    },
    {
      label: 'Industries',
      path: '/industries',
      columns: [
        { title: 'Industries', links: INDUSTRIES.slice(0, 9).map((industry) => ({ label: industry.name, path: `/industries/${industry.id}` })) },
        {
          title: 'Specialist Verticals',
          links: INDUSTRIES.flatMap((industry) =>
            industry.subIndustries.slice(0, 2).map((sub) => ({ label: sub.name, path: `/industries/${industry.id}/${sub.slug}` }))
          ).slice(0, 10)
        }
      ]
    },
    {
      label: 'Regions',
      path: '/regions',
      columns: [
        { title: 'Region Hubs', links: REGIONS.map((region) => ({ label: region.name, path: `/regions/${region.slug}` })) },
        { title: 'Top Cities', links: LOCATIONS.filter((location) => location.type === 'city').slice(0, 14).map((location) => ({ label: location.name, path: `/locations/${location.slug}` })) },
        { title: 'Location Services', links: LOCATIONS.filter((location) => location.type === 'city').slice(0, 6).map((location) => ({ label: `SEO in ${location.name}`, path: `/locations/${location.slug}/seo` })) }
      ]
    },
    {
      label: 'Case Studies',
      path: '/case-studies',
      columns: [
        {
          title: 'Proof',
          links: [
            { label: 'Case Studies', path: '/case-studies' },
            { label: 'Team and Leadership', path: '/team' },
            { label: 'Lead Generation Roadmap', path: '/lead-generation-roadmap' }
          ]
        }
      ]
    },
    {
      label: 'Resources',
      path: '/resources',
      columns: [
        { title: 'Free Audits', links: RESOURCES.map((resource) => ({ label: resource.title, path: resource.href || `/${resource.slug}` })) },
        {
          title: 'B2B Guides',
          links: B2B_MOFU_PAGES.map((page) => ({ label: page.title.replace('Best ', '').replace('Effective ', ''), path: `/${page.slug}` }))
        },
        {
          title: 'Discovery Pages',
          links: [
            { label: 'Tools Directory', path: '/directory' },
            { label: 'Digital Marketing Glossary', path: '/glossary' },
            { label: 'Agency Comparisons', path: '/comparisons' },
            { label: 'Backlink Roadmap', path: '/backlink-authority-roadmap' },
            { label: 'Lead Generation Roadmap', path: '/lead-generation-roadmap' },
            { label: 'Global Markets', path: '/global' },
            { label: 'Multilingual SEO', path: '/languages' },
            { label: 'Blog', path: '/blog' },
            { label: 'LLM Transparency', path: '/llm' }
          ]
        },
        { title: 'Tool Categories', links: TOOL_CATEGORIES.slice(0, 6).map((cat) => ({ label: cat.name, path: `/directory/${cat.slug}` })) }
      ]
    },
    {
      label: 'About',
      path: '/about',
      columns: [
        {
          title: 'Company',
          links: [
            { label: 'About Qognition', path: '/about' },
            { label: 'Leadership', path: '/team' },
            { label: 'Contact', path: CONTACT_MAILTO }
          ]
        }
      ]
    }
  ];

  const activeMobileNav = navGroups.find((group) => group.label === activeMobileGroup) || navGroups[0];
  const activeMobileColumnKey = activeMobileColumn || `${activeMobileNav.label}:${activeMobileNav.columns[0]?.title || ''}`;
  const activeMobileColumnData =
    activeMobileNav.columns.find((column) => `${activeMobileNav.label}:${column.title}` === activeMobileColumnKey) || activeMobileNav.columns[0];

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
        <div className="px-5 md:px-10 max-w-8xl mx-auto grid grid-cols-[auto_1fr_auto] items-center gap-4 relative">
          <Link to="/" aria-label="Qognition home" className="z-50 group relative flex items-center gap-3">
            <div className="h-12 w-12 md:h-14 md:w-14 rounded-2xl bg-white border border-white/20 p-2 shadow-lg shadow-black/20 transition-colors duration-300 group-hover:border-teal-400/60">
              <Logo className="w-full h-full" />
            </div>
            <span className="font-display font-bold text-2xl tracking-tighter hidden md:block text-white transition-colors duration-300 group-hover:text-teal-100">
              Qognition
            </span>
          </Link>

          {/* Desktop Nav */}
          <div
            className="hidden lg:flex justify-center"
            onMouseLeave={() => {
              setHoveredPath(null);
              setActiveMega(null);
            }}
          >
          <div className="flex items-center gap-1 p-1 rounded-full bg-white/5 border border-white/5 backdrop-blur-sm">
            {navGroups.map((item) => {
              const isActive = item.path === location.pathname;
              return (
                <Link 
                  key={item.path} 
                  to={item.path} 
                  className={`relative px-4 xl:px-5 py-2.5 text-xs font-medium uppercase tracking-widest transition-colors duration-300 z-10 flex items-center gap-1 ${isActive ? 'text-black' : 'text-gray-300 hover:text-white'}`}
                  onMouseEnter={() => {
                    setHoveredPath(item.path);
                    setActiveMega(item.label);
                  }}
                >
                  <span className="relative z-10">{item.label}</span>
                  <ChevronDown size={12} className="relative z-10 opacity-60" />
                  {isActive && (
                      <div
                          className="absolute inset-0 bg-teal-400 rounded-full z-0"
                      />
                  )}
                  {hoveredPath === item.path && !isActive && (
                      <div
                          className="absolute inset-0 bg-white/10 rounded-full z-0"
                      />
                  )}
                </Link>
              );
            })}
          </div>
            <AnimatePresence>
              {activeMega && (
                <motion.div
                  key={activeMega}
                  initial={{ opacity: 0, y: 14, scale: 0.98 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  exit={{ opacity: 0, y: 8, scale: 0.98 }}
                  transition={{ duration: 0.22, ease: [0.22, 1, 0.36, 1] }}
                  className="absolute left-1/2 top-full w-[min(1120px,calc(100vw-48px))] -translate-x-1/2 pt-3"
                >
                <div className="grid max-h-[72vh] grid-cols-1 gap-4 overflow-y-auto rounded-2xl border border-white/10 bg-black/95 p-5 shadow-2xl shadow-black/60 backdrop-blur-xl md:grid-cols-2 xl:grid-cols-3">
                  {navGroups.find((group) => group.label === activeMega)?.columns.map((column) => (
                    <div key={column.title} className="rounded-xl border border-white/10 bg-white/[0.03] p-4 transition-colors hover:border-teal-400/30">
                      <h3 className="mb-4 text-xs font-bold uppercase tracking-widest text-teal-400">{column.title}</h3>
                      <div className="space-y-2">
                        {column.links.map((link) => (
                          <Link key={link.path} to={link.path} className="block rounded-lg px-3 py-2 text-sm text-gray-300 transition-colors hover:bg-white/5 hover:text-white">
                            {link.label}
                          </Link>
                        ))}
                      </div>
                    </div>
                  ))}
                </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          <div className="flex items-center justify-end gap-3 justify-self-end md:gap-6">
            <div className="hidden md:block">
                <a href={CALENDLY_LINK} target="_blank" rel="noopener noreferrer">
                   <MagneticButton variant="primary" className="scale-90 origin-right">
                      Book Strategy Call
                   </MagneticButton>
                </a>
            </div>
            <button 
                type="button"
                className="z-[120] -mr-2 ml-auto rounded-full p-3 text-white transition-colors hover:bg-white/10 hover:text-teal-400 lg:hidden"
                onClick={() => setIsMenuOpen((open) => !open)}
                aria-label="Toggle Menu"
                aria-controls="mobile-menu"
                aria-expanded={isMenuOpen}
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
            id="mobile-menu"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="fixed inset-0 z-[90] flex flex-col items-center justify-start overflow-y-auto border-b border-white/10 bg-black/95 px-5 pb-12 pt-28 backdrop-blur-3xl"
          >
            <motion.div
              initial={{ opacity: 0, y: 18 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 12 }}
              transition={{ duration: 0.26, ease: [0.22, 1, 0.36, 1] }}
              className="w-full max-w-2xl space-y-3 text-left"
            >
              {navGroups.map((item) => (
                <div
                  key={item.path}
                  className="rounded-2xl border border-white/10 bg-white/[0.03] p-4 transition-colors"
                >
                  <button
                    type="button"
                    className="flex w-full items-center justify-between gap-4 py-1 text-left"
                    onClick={() => {
                      const nextGroup = activeMobileGroup === item.label ? '' : item.label;
                      setActiveMobileGroup(nextGroup);
                      if (nextGroup) {
                        setActiveMobileColumn(`${item.label}:${item.columns[0]?.title || ''}`);
                      }
                    }}
                    aria-expanded={activeMobileGroup === item.label}
                  >
                    <span className="font-display text-2xl font-light sm:text-3xl">{item.label}</span>
                    <ChevronDown
                      size={22}
                      className={`text-teal-400 transition-transform ${activeMobileGroup === item.label ? 'rotate-180' : ''}`}
                    />
                  </button>
                    <AnimatePresence>
                    {activeMobileGroup === item.label && (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: 'auto', opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.24, ease: [0.22, 1, 0.36, 1] }}
                        className="overflow-hidden"
                      >
                        <Link 
                          to={item.path} 
                          className="mt-4 block rounded-xl bg-teal-400 px-4 py-3 text-center text-sm font-bold uppercase tracking-widest text-black"
                          onClick={() => setIsMenuOpen(false)}
                        >
                          {item.label} Overview
                        </Link>
                        <div className="mt-4 flex gap-2 overflow-x-auto pb-2">
                          {item.columns.map((column) => (
                            <button
                              key={column.title}
                              type="button"
                              onClick={() => setActiveMobileColumn(`${item.label}:${column.title}`)}
                              className={`shrink-0 rounded-full border px-4 py-2 text-xs font-bold uppercase tracking-wider transition-colors ${
                                activeMobileColumn === `${item.label}:${column.title}`
                                  ? 'border-teal-400 bg-teal-400 text-black'
                                  : 'border-white/10 bg-black/40 text-gray-300'
                              }`}
                            >
                              {column.title}
                            </button>
                          ))}
                        </div>
                        <motion.div
                          key={activeMobileColumnData?.title}
                          initial={{ opacity: 0, y: 8 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ duration: 0.18 }}
                          className="mt-4 grid grid-cols-1 gap-2"
                        >
                          {activeMobileColumnData?.links.map((link) => (
                            <Link
                              key={link.path}
                              to={link.path}
                              className="block rounded-lg border border-white/10 bg-black/40 px-4 py-3 text-sm text-gray-300 transition-colors hover:border-teal-400/50 hover:text-white"
                              onClick={() => setIsMenuOpen(false)}
                            >
                              {link.label}
                            </Link>
                          ))}
                        </motion.div>
                      </motion.div>
                    )}
                    </AnimatePresence>
                </div>
              ))}
              <div className="mt-6">
                  <a href={CALENDLY_LINK} target="_blank" rel="noopener noreferrer">
                    <MagneticButton variant="primary">Book Strategy Call</MagneticButton>
                  </a>
              </div>
            </motion.div>
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
            <Link to="/" aria-label="Qognition home" className="flex items-center gap-3 mb-8 group">
                <div className="h-12 w-12 rounded-2xl bg-white border border-white/20 p-2 group-hover:border-teal-400/60 transition-colors">
                    <Logo className="w-full h-full" />
                </div>
                <span className="font-display font-bold text-2xl tracking-tight text-white group-hover:text-teal-400 transition-colors">Qognition</span>
            </Link>
            <p className="text-gray-400 text-lg max-w-md mb-8 font-light leading-relaxed">
              AI growth marketing partner for companies that need qualified leads, better search visibility, sharper creative, and measurable revenue systems.
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
              <p className="font-mono text-xs font-bold text-teal-400 uppercase tracking-widest mb-8">Sitemap</p>
              <ul className="space-y-4 text-gray-400 text-sm">
                <li><Link to="/services" className="hover:text-white transition-colors">Capabilities</Link></li>
                <li><Link to="/industries" className="hover:text-white transition-colors">Industries</Link></li>
                <li><Link to="/locations" className="hover:text-white transition-colors">Locations</Link></li>
                <li><Link to="/regions" className="hover:text-white transition-colors">Global Hubs</Link></li>
                <li><Link to="/case-studies" className="hover:text-white transition-colors">Case Studies</Link></li>
                <li><Link to="/lead-generation-roadmap" className="hover:text-white transition-colors">Lead Roadmap</Link></li>
                <li><Link to="/blog" className="hover:text-white transition-colors">Blog</Link></li>
              </ul>
            </div>
          
          <div className="md:col-span-2">
            <p className="font-mono text-xs font-bold text-teal-400 uppercase tracking-widest mb-8">Resources</p>
            <ul className="space-y-4 text-gray-400 text-sm">
              <li><Link to="/directory" className="hover:text-white transition-colors font-bold text-teal-200">Tools Directory</Link></li>
              <li><Link to="/resources" className="hover:text-white transition-colors">Free Audits</Link></li>
              <li><Link to="/free-tools" className="hover:text-white transition-colors">Free Tools</Link></li>
              <li><Link to="/glossary" className="hover:text-white transition-colors">Glossary</Link></li>
              <li><Link to="/comparisons" className="hover:text-white transition-colors">Comparisons</Link></li>
              <li><Link to="/lead-generation-roadmap" className="hover:text-white transition-colors">Lead Roadmap</Link></li>
              <li><Link to="/global" className="hover:text-white transition-colors">Global Markets</Link></li>
              <li><Link to="/languages" className="hover:text-white transition-colors">Languages</Link></li>
            </ul>
          </div>

          <div className="md:col-span-2">
             <p className="font-mono text-xs font-bold text-teal-400 uppercase tracking-widest mb-8">Company</p>
             <ul className="space-y-4 text-gray-400 text-sm">
               <li><Link to="/about" className="hover:text-white transition-colors">About Us</Link></li>
               <li><Link to="/team" className="hover:text-white transition-colors">Leadership</Link></li>
               <li><Link to={CONTACT_MAILTO} className="hover:text-white transition-colors">Careers</Link></li>
               <li><Link to={CONTACT_MAILTO} className="hover:text-white transition-colors">Contact</Link></li>
               <li><Link to="/sitemap" className="hover:text-white transition-colors">Sitemap</Link></li>
             </ul>
          </div>
        </div>
        
<div className="max-w-8xl mx-auto pt-8 border-t border-white/5 flex flex-col md:flex-row justify-between items-center text-gray-400 text-xs font-mono uppercase tracking-wider">
            <p>© {new Date().getFullYear()} Qognition Agency.</p>
            <p className="mt-2 md:mt-0">London • New York • Dubai • Bangalore • Sydney</p>
        </div>
      </footer>

      {/* WhatsApp Floating Button */}
      <a 
        href={WHATSAPP_LINK}
        target="_blank"
        rel="noopener noreferrer"
        className="fixed bottom-5 right-5 z-[110] flex h-14 w-14 items-center justify-center rounded-full bg-[#25D366] text-white shadow-2xl shadow-[#25D366]/30 ring-1 ring-white/20 transition-all duration-300 hover:scale-110 hover:bg-[#20BD5A] focus:outline-none focus:ring-2 focus:ring-white"
        aria-label="Chat on WhatsApp"
      >
        <svg width="30" height="30" viewBox="0 0 448 512" fill="currentColor" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
          <path d="M380.9 97.1C339 55.1 283.2 32 223.9 32 101 32 1 132 1 254.9c0 39.1 10.2 77.3 29.6 111L0 480l116.9-30.7c32.5 17.7 69 27 106.9 27h.1c122.8 0 222.8-100 222.8-222.9 0-59.4-23.1-115.2-65.8-156.3zM223.9 438.6h-.1c-33.7 0-66.8-9.1-95.7-26.2l-6.9-4.1-69.3 18.2 18.5-67.6-4.5-7c-18.9-30-28.9-64.8-28.9-100.7 0-103.2 83.9-187.1 187.1-187.1 50 0 97 19.5 132.4 54.9 35.9 35.9 55.6 83.3 55.6 133.9 0 103.2-84 187.7-188.2 187.7zm101.9-140.2c-5.6-2.8-33.1-16.3-38.2-18.2-5.1-1.9-8.8-2.8-12.5 2.8-3.7 5.6-14.3 18.2-17.5 21.9-3.2 3.7-6.5 4.2-12.1 1.4-33.1-16.5-54.8-29.5-76.6-66.8-5.8-10 5.8-9.3 16.5-30.9 1.8-3.7.9-6.9-.5-9.7-1.4-2.8-12.5-30.1-17.1-41.2-4.5-10.8-9.1-9.3-12.5-9.5-3.2-.2-6.9-.2-10.6-.2s-9.7 1.4-14.8 6.9c-5.1 5.6-19.4 19-19.4 46.3s19.9 53.7 22.7 57.4c2.8 3.7 39.1 59.7 94.8 83.7 13.2 5.7 23.5 9.1 31.5 11.7 13.2 4.2 25.3 3.6 34.8 2.2 10.6-1.6 33.1-13.5 37.8-26.6 4.7-13.1 4.7-24.3 3.2-26.6-1.4-2.4-5.1-3.8-10.7-6.6z" />
        </svg>
        <span className="absolute right-1.5 top-1.5 h-3 w-3 rounded-full border-2 border-black bg-[#20BD5A] animate-pulse"></span>
      </a>
    </div>
  );
};

export default Layout;
