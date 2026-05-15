
import React, { useState, useEffect } from 'react';
import { Link, useLocation } from '../lib/routerCompat';
import { Menu, X, Instagram, Linkedin, Twitter, Youtube, Facebook, Dribbble, ChevronDown } from 'lucide-react';
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
            {activeMega && (
              <div
                className="absolute left-1/2 top-full w-[min(1180px,calc(100vw-48px))] -translate-x-1/2 pt-3"
              >
                <div className="grid max-h-[72vh] grid-cols-3 gap-5 overflow-y-auto rounded-2xl border border-white/10 bg-black/95 p-6 shadow-2xl shadow-black/60 backdrop-blur-xl">
                  {navGroups.find((group) => group.label === activeMega)?.columns.map((column) => (
                    <div key={column.title} className="rounded-xl border border-white/10 bg-white/[0.03] p-4">
                      <h3 className="mb-4 text-xs font-bold uppercase tracking-widest text-teal-400">{column.title}</h3>
                      <div className="space-y-2">
                        {column.links.map((link) => (
                          <Link key={link.path} to={link.path} className="block rounded-lg px-3 py-2 text-sm text-gray-300 hover:bg-white/5 hover:text-white">
                            {link.label}
                          </Link>
                        ))}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}
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
        {isMenuOpen && (
          <div
            id="mobile-menu"
            className="fixed inset-0 z-[90] bg-black/95 backdrop-blur-3xl flex flex-col items-center justify-start border-b border-white/10 overflow-y-auto px-6 pt-28 pb-12"
          >
            <div className="w-full max-w-2xl space-y-4 text-left">
              {navGroups.map((item) => (
                <div
                  key={item.path}
                  className="rounded-2xl border border-white/10 bg-white/[0.03] p-4"
                >
                  <button
                    type="button"
                    className="flex w-full items-center justify-between gap-4 py-1 text-left"
                    onClick={() => setActiveMobileGroup((current) => (current === item.label ? '' : item.label))}
                    aria-expanded={activeMobileGroup === item.label}
                  >
                    <span className="font-display text-3xl sm:text-4xl font-light">{item.label}</span>
                    <ChevronDown
                      size={22}
                      className={`text-teal-400 transition-transform ${activeMobileGroup === item.label ? 'rotate-180' : ''}`}
                    />
                  </button>
                    {activeMobileGroup === item.label && (
                      <div className="overflow-hidden">
                        <Link 
                          to={item.path} 
                          className="mt-4 block rounded-xl bg-teal-400 px-4 py-3 text-center text-sm font-bold uppercase tracking-widest text-black"
                          onClick={() => setIsMenuOpen(false)}
                        >
                          {item.label} Overview
                        </Link>
                        <div className="mt-4 grid grid-cols-1 gap-4">
                          {item.columns.map((column) => (
                            <div key={column.title}>
                              <p className="mb-2 text-xs font-bold uppercase tracking-widest text-teal-400">{column.title}</p>
                              <div className="grid grid-cols-1 gap-2">
                                {column.links.map((link) => (
                                  <Link
                                    key={link.path}
                                    to={link.path}
                                    className="block rounded-lg border border-white/10 bg-black/40 px-4 py-3 text-sm text-gray-300 hover:border-teal-400/50 hover:text-white"
                                    onClick={() => setIsMenuOpen(false)}
                                  >
                                    {link.label}
                                  </Link>
                                ))}
                              </div>
                            </div>
                          ))}
                        </div>
                      </div>
                    )}
                </div>
              ))}
              <div className="mt-6">
                  <a href={CALENDLY_LINK} target="_blank" rel="noopener noreferrer">
                    <MagneticButton variant="primary">Book Strategy Call</MagneticButton>
                  </a>
              </div>
            </div>
          </div>
        )}

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
        className="fixed bottom-24 right-4 z-[110] rounded-full bg-[#25D366] p-4 text-white shadow-2xl shadow-[#25D366]/30 transition-all duration-300 hover:scale-110 hover:bg-[#20BD5A] md:bottom-auto md:top-24"
        aria-label="Chat on WhatsApp"
      >
        <svg width="28" height="28" viewBox="0 0 32 32" fill="currentColor" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
          <path d="M16.02 3.2A12.68 12.68 0 0 0 5.07 22.25L3.6 28.8l6.72-1.42A12.66 12.66 0 1 0 16.02 3.2Zm0 2.45a10.22 10.22 0 0 1 8.65 15.67 10.2 10.2 0 0 1-13.95 3.72l-.46-.24-3.44.73.75-3.32-.28-.5A10.22 10.22 0 0 1 16.02 5.65Zm-4.02 5.32c-.23 0-.6.09-.92.43-.32.35-1.21 1.19-1.21 2.9s1.24 3.36 1.42 3.59c.17.23 2.44 3.73 5.91 5.22.83.36 1.47.57 1.97.73.83.26 1.58.22 2.18.13.66-.1 2.03-.83 2.32-1.63.29-.8.29-1.49.2-1.63-.09-.15-.32-.23-.66-.4-.35-.17-2.03-1-2.35-1.12-.32-.12-.55-.17-.78.17-.23.35-.9 1.12-1.1 1.35-.2.23-.41.26-.75.09-.35-.17-1.46-.54-2.78-1.72-1.03-.92-1.72-2.05-1.92-2.4-.2-.35-.02-.54.15-.71.16-.16.35-.41.52-.61.17-.2.23-.35.35-.58.12-.23.06-.43-.03-.6-.09-.17-.78-1.88-1.07-2.58-.28-.68-.57-.59-.78-.6h-.66Z" />
        </svg>
        <svg className="hidden" width="28" height="28" viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
          <path d="M17.498 14.382C17.256 14.258 16.832 14.058 15.974 13.858C15.916 13.848 15.858 13.838 15.79 13.838C15.336 13.838 14.842 14.258 14.842 14.258L14.842 14.248L14.532 14.488C14.532 14.488 14.312 14.708 14.072 14.708L13.652 14.988C13.652 14.988 13.552 15.048 13.472 15.048C13.392 15.048 13.292 14.988 13.292 14.988C11.172 14.198 10.012 12.768 10.012 12.768C10.012 12.768 10.002 12.748 9.992 12.728L9.982 12.718C9.982 12.718 9.602 12.328 9.602 11.928C9.602 11.928 9.542 11.768 9.662 11.648L9.932 11.378C9.932 11.378 10.212 10.958 10.772 10.958L10.952 10.698C10.952 10.698 11.012 10.568 11.142 10.438C11.142 10.438 11.252 10.328 11.372 10.328L11.432 10.308C11.432 10.308 11.572 10.258 11.712 10.258C11.852 10.258 12.002 10.318 12.002 10.318L12.002 10.298C12.002 10.298 12.322 10.468 13.242 11.388C14.162 12.308 15.552 13.698 15.552 13.698L15.472 13.818C15.472 13.818 16.092 14.508 16.972 14.508C17.852 14.508 18.292 14.128 18.292 14.128L18.212 14.248C18.212 14.248 18.732 14.768 19.332 14.768L19.212 14.628C19.042 14.458 18.722 14.358 18.722 14.358C18.722 14.358 18.522 14.268 18.492 14.428L18.112 15.768C18.112 15.768 17.902 16.438 16.962 16.438L16.502 16.568C16.502 16.568 16.392 16.628 16.302 16.628C16.212 16.628 16.112 16.568 16.112 16.568C16.112 16.568 15.812 16.368 15.812 16.008C15.812 16.008 15.812 15.848 16.112 15.848L16.292 15.618C16.292 15.618 17.762 14.778 17.762 14.778C17.762 14.778 17.672 14.738 17.498 14.382ZM12.002 22C6.852 22 2.502 17.65 2.502 12.5C2.502 7.35 6.852 2 12.002 2C17.152 2 21.502 7.35 21.502 12.5C21.502 17.65 17.152 22 12.002 22ZM12.002 3.5C7.532 3.5 3.852 7.18 3.852 11.65C3.852 14.77 5.822 17.53 8.662 18.83L7.552 22L11.052 20.17C11.442 20.37 11.852 20.5 12.272 20.5C12.702 20.5 13.132 20.36 13.532 20.17L17.832 22.75L20.172 18.5C20.262 18.37 20.342 18.23 20.412 18.09C21.552 15.97 21.552 13.13 20.412 11.01C19.272 8.89 16.432 8.89 15.292 11.01L15.272 11.04C14.132 13.16 11.292 13.16 10.152 11.04C9.012 8.92 6.172 8.92 5.032 11.04L5.022 11.01C3.882 13.13 3.882 15.97 5.022 18.09L5.032 18.08C6.172 20.2 9.012 20.2 10.152 18.08L10.162 18.07C11.302 15.95 14.142 15.95 15.282 18.07L15.292 18.08C15.572 17.55 16.722 16.28 16.722 16.28C17.342 15.52 17.702 14.53 17.702 13.48C17.702 12.43 17.342 11.44 16.722 10.68L16.382 10.27C16.122 9.95 15.762 9.71 15.352 9.58L15.292 9.56C15.112 9.51 14.922 9.5 14.732 9.5C14.542 9.5 14.352 9.51 14.172 9.56L13.872 9.68C13.872 9.68 12.002 10.76 12.002 10.76L11.682 9.94C11.402 9.47 10.832 9.25 10.282 9.25L9.692 9.69C9.442 9.84 9.242 10.06 9.022 10.28L8.782 10.52C8.782 10.52 7.592 11.63 7.592 11.63L8.752 12.79C8.752 12.79 9.602 13.64 9.602 13.64L9.862 14.47C9.862 14.47 10.002 15.22 9.582 15.64C8.402 16.82 7.782 17.32 7.782 17.32L7.292 17.81C7.292 17.81 6.662 18.44 6.092 18.44L5.772 18.68C5.772 18.68 5.272 19.18 4.582 18.49C2.672 16.58 2.672 13.68 2.672 13.68L2.502 12.5L2.662 11.31C2.662 11.31 2.662 8.41 4.572 6.5L4.852 6.22L4.282 5.65C4.282 5.65 3.652 5.02 3.652 4.33L3.902 3.51C4.602 2.82 5.602 2.82 6.292 3.51L6.582 3.8C6.582 3.8 7.682 4.9 7.682 4.9L8.242 5.46C8.242 5.46 8.782 5.92 9.502 5.92L10.322 6.17C10.322 6.17 11.072 6.31 11.802 5.89L12.622 6.24C12.622 6.24 13.362 5.89 14.112 5.89C14.862 5.89 15.602 6.24 15.602 6.24L16.422 6.59C16.422 6.59 17.262 6.93 17.812 5.89L18.202 5.23C18.202 5.23 19.002 4.06 20.662 4.06C22.322 4.06 22.322 5.89 22.322 5.89L22.102 7.55C20.442 7.55 17.582 7.55 15.722 9.41L15.542 9.59C13.682 11.45 13.682 14.31 13.682 14.31C13.682 14.31 14.922 14.918 16.592 14.918C18.262 14.918 19.502 14.31 19.502 14.31L19.322 14.488C19.322 14.488 20.762 16.128 20.762 17.948C20.762 19.768 19.402 21.128 17.582 21.128C15.762 21.128 14.182 20.488 12.742 19.048L12.562 18.868C10.942 17.248 10.942 14.378 10.942 14.378C10.942 14.378 12.002 13.318 12.002 13.318L11.742 12.758C11.742 12.758 11.742 12.508 11.742 12.248C11.742 11.988 11.632 11.798 11.632 11.798L11.462 11.368C11.462 11.368 11.352 11.128 11.352 10.858C11.352 10.588 11.532 10.228 11.532 10.228L11.732 9.688C11.732 9.688 12.002 9.5 12.002 9.5L12.002 3.5Z" fill="currentColor"/>
        </svg>
        <span className="absolute right-0 top-0 w-3 h-3 bg-[#20BD5A] rounded-full border-2 border-black animate-pulse"></span>
      </a>
      <Link
        to="/free-seo-audit"
        className="fixed bottom-4 left-4 right-4 z-[105] rounded-full bg-teal-400 px-5 py-3 text-center font-display text-xs font-bold uppercase tracking-widest text-black shadow-2xl shadow-teal-500/20 transition-colors hover:bg-white sm:left-auto sm:right-5 sm:w-auto"
        aria-label="Get a free SEO and AI audit"
      >
        Get Free SEO + AI Audit
      </Link>
    </div>
  );
};

export default Layout;
