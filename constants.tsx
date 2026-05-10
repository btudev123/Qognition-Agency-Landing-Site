
import React from 'react';
import { NavItem, ClientLogo, Testimonial } from './types';

// Re-export data from separate files
export { SERVICES } from './data/services';
export { INDUSTRIES } from './data/industries';
export { REGIONS } from './data/regions';
export { LOCATIONS } from './data/locations';
export { CASE_STUDIES } from './data/work';
export { TOOLS } from './data/tools';
export { DIRECTORY_PRODUCTS } from './data/directoryProducts';
export {
  COMPARISONS,
  FREE_TOOLS,
  GLOSSARY_TERMS,
  PRICING_PACKAGES,
  RESOURCES,
  SERVICE_SUB_PAGES,
  TEAM_MEMBERS
} from './data/seoExpansion';

// Updated categories with URL-friendly slugs that map to Logic
export const TOOL_CATEGORIES = [
    { id: 'llms', name: 'LLMs & AI Models', description: 'Foundation models and large language models for enterprise intelligence.', slug: 'llm', phTopicSlug: 'artificial-intelligence' },
    { id: 'engineering', name: 'Engineering & Dev', description: 'Tools for building, deploying, and scaling modern web applications.', slug: 'engineering', phTopicSlug: 'developer-tools' },
    { id: 'marketing', name: 'Marketing & Sales', description: 'Platforms for growth, CRM, and customer acquisition.', slug: 'marketing', phTopicSlug: 'marketing' },
    { id: 'design', name: 'Design & Creative', description: 'Generative AI and UI/UX tools for world-class aesthetics.', slug: 'design', phTopicSlug: 'design-tools' },
    { id: 'social', name: 'Social & Community', description: 'Tools to manage, schedule, and grow social presence.', slug: 'social', phTopicSlug: 'social-media-tools' },
    { id: 'finance', name: 'Finance & Ops', description: 'Modern financial stacks for scaling agencies and startups.', slug: 'finance', phTopicSlug: 'fintech' },
    { id: 'ai-agents', name: 'AI Agents', description: 'Autonomous agents for task automation and research.', slug: 'ai-agents', phTopicSlug: 'artificial-intelligence' },
];

export const CALENDLY_LINK = "https://calendly.com/hello-qognitionagency/30min";
export const CONTACT_EMAIL = "hello@qognitionagency.com";
export const CONTACT_MAILTO = `mailto:${CONTACT_EMAIL}`;
export const WHATSAPP_NUMBER = "919217129349";
export const WHATSAPP_DISPLAY = "+91 92171 29349";
export const WHATSAPP_LINK = `https://wa.me/${WHATSAPP_NUMBER}`;

export const NAV_ITEMS: NavItem[] = [
  { label: 'Services', path: '/services' },
  { label: 'Industries', path: '/industries' },
  { label: 'Regions', path: '/regions' },
  { label: 'Work', path: '/work' },
  { label: 'Resources', path: '/resources' },
  { label: 'About', path: '/about' },
  { label: 'Contact', path: CONTACT_MAILTO },
];

export const CLIENT_LOGOS: ClientLogo[] = [
  { name: "Magalu", url: "/brand-logos/magalu.svg" },
  { name: "Wildberries", url: "/brand-logos/wildberries.svg" },
  { name: "Meesho", url: "/brand-logos/meesho.svg" },
  { name: "Daraz", url: "/brand-logos/daraz.svg" },
  { name: "Noon", url: "/brand-logos/noon.svg" },
  { name: "Accent Group", url: "/brand-logos/accent-group.svg" },
  { name: "Ozon", url: "/brand-logos/ozon.svg" },
  { name: "Rakuten", url: "/brand-logos/rakuten.svg" }
];

export const ABOUT_DATA = {
  mission: "To engineer the digital infrastructure of the future, enabling ambitious brands to dominate their categories through AI, speed, and aesthetic precision.",
  vision: "A world where marketing is autonomous, beautiful, and hyper-personalized.",
  values: [
    { title: "Radical Transparency", desc: "No black boxes. We share our code, our data, and our logic." },
    { title: "Speed as a Habit", desc: "We move faster than the market. Velocity is our primary currency." },
    { title: "Aesthetic Integrity", desc: "Performance without beauty is spam. We refuse to ship ugly code." },
    { title: "Data Sovereignty", desc: "Your data is your asset. We build systems that you own and control." }
  ],
  stats: [
    { label: "Full-Time Experts", value: "120+" },
    { label: "Revenue Generated", value: "$500M+" },
    { label: "Global Hubs", value: "12" },
    { label: "Client Retention", value: "94%" }
  ]
};

export const TESTIMONIALS: Testimonial[] = [
  {
    quote: "Qognition's architectural approach to SEO is simply unrivaled. They didn't just optimize our site; they restructured our entire digital footprint for the AI era.",
    author: "Sarah Jenkins",
    role: "Global CMO",
    company: "Noon Group",
    service: "Enterprise SEO",
    proof: "Campaign leadership testimonial"
  },
  {
    quote: "We needed a partner who understood the luxury aesthetic while delivering hard-core technical performance. Qognition delivered on both fronts flawlessly.",
    author: "Michael Ross",
    role: "Director of Digital",
    company: "Accent Group",
    service: "Web Development",
    proof: "Website performance testimonial"
  },
  {
    quote: "Their team acts less like an agency and more like a high-performance special ops unit embedded in our company. The velocity of execution is insane.",
    author: "Priya Patel",
    role: "Founder",
    company: "FinTech Scale",
    service: "Performance Marketing",
    proof: "Founder testimonial"
  },
  {
    quote: "The technical SEO sprint finally made our site crawlable and gave our sales team pages they were proud to send to prospects.",
    author: "Aarav Mehta",
    role: "VP Growth",
    company: "CloudPilot",
    service: "Technical SEO",
    proof: "SaaS growth testimonial"
  },
  {
    quote: "Qognition connected our HubSpot pipeline data to search and paid campaigns, which changed how we planned budget.",
    author: "Elena Brooks",
    role: "Revenue Operations Lead",
    company: "NorthBridge Accounting",
    service: "HubSpot and Analytics",
    proof: "Revenue operations testimonial"
  },
  {
    quote: "The city pages and review strategy helped us compete in local searches where we had been invisible.",
    author: "Dr. Maya Kapoor",
    role: "Managing Director",
    company: "Apex Dental Clinics",
    service: "Local SEO",
    proof: "Healthcare marketing testimonial"
  },
  {
    quote: "Their content briefs are unusually specific. Our writers stopped guessing and started publishing pages that sales could use.",
    author: "Nora Stein",
    role: "Head of Marketing",
    company: "LedgerOps",
    service: "Content Strategy",
    proof: "Content operations testimonial"
  },
  {
    quote: "We wanted AI search visibility without thin AI content. Qognition built an entity and proof system that made sense.",
    author: "Leo Martins",
    role: "Founder",
    company: "SignalAI Labs",
    service: "AI Search Visibility",
    proof: "Founder testimonial"
  },
  {
    quote: "Paid search became much easier to defend once landing pages, tracking, and lead quality were part of the same dashboard.",
    author: "Hannah Scott",
    role: "Commercial Director",
    company: "Atlas Logistics",
    service: "Google Ads",
    proof: "Paid media testimonial"
  },
  {
    quote: "The team cleaned up our messaging, our technical SEO, and our conversion path in one coordinated launch.",
    author: "James Whitaker",
    role: "Managing Partner",
    company: "Meridian Law Group",
    service: "Legal SEO",
    proof: "Professional services testimonial"
  },
  {
    quote: "Our old website looked premium but did not convert. The new architecture made the offer obvious.",
    author: "Sofia Mendes",
    role: "Brand Director",
    company: "Pearl Hospitality Group",
    service: "Conversion Website",
    proof: "Hospitality testimonial"
  },
  {
    quote: "Qognition gave us a repeatable content and internal linking system, not random blog posts.",
    author: "Amelia Grant",
    role: "Marketing Lead",
    company: "Harbor Wealth",
    service: "E-E-A-T SEO",
    proof: "Financial services testimonial"
  }
  ,
  {
    quote: "The combination of SEO, CRO, and paid search helped us understand exactly where qualified calls were coming from.",
    author: "Owen Clarke",
    role: "Operations Director",
    company: "Summit HVAC",
    service: "Local Growth",
    proof: "Home services testimonial"
  },
  {
    quote: "Their Next.js SEO work turned a beautiful site into a discoverable site.",
    author: "Mila Torres",
    role: "Digital Lead",
    company: "Quantum Retail",
    service: "Next.js SEO",
    proof: "Retail testimonial"
  },
  {
    quote: "The team brought clarity to a very technical category and helped buyers understand why we were different.",
    author: "Victor Chen",
    role: "VP Marketing",
    company: "Falcon Cybersecurity",
    service: "B2B SEO",
    proof: "Cybersecurity testimonial"
  }
];
