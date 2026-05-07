
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

export const NAV_ITEMS: NavItem[] = [
  { label: 'Expertise', path: '/services' },
  { label: 'Work', path: '/work' },
  { label: 'Regions', path: '/regions' },
  { label: 'About', path: '/about' },
  { label: 'Blog', path: '/blog' },
  { label: 'Contact', path: '/contact' },
];

export const CLIENT_LOGOS: ClientLogo[] = [
  { name: "Magalu", url: "https://placehold.co/200x80/0B0B0B/FFFFFF?text=Magalu" },
  { name: "Wildberries", url: "https://placehold.co/200x80/0B0B0B/FFFFFF?text=Wildberries" },
  { name: "Meesho", url: "https://placehold.co/200x80/0B0B0B/FFFFFF?text=Meesho" },
  { name: "Daraz", url: "https://placehold.co/200x80/0B0B0B/FFFFFF?text=Daraz" },
  { name: "Noon", url: "https://placehold.co/200x80/0B0B0B/FFFFFF?text=Noon" },
  { name: "Accent Group", url: "https://placehold.co/200x80/0B0B0B/FFFFFF?text=Accent" },
  { name: "Ozon", url: "https://placehold.co/200x80/0B0B0B/FFFFFF?text=Ozon" },
  { name: "Rakuten", url: "https://placehold.co/200x80/0B0B0B/FFFFFF?text=Rakuten" }
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
    company: "Noon Group"
  },
  {
    quote: "We needed a partner who understood the luxury aesthetic while delivering hard-core technical performance. Qognition delivered on both fronts flawlessly.",
    author: "Michael Ross",
    role: "Director of Digital",
    company: "Accent Group"
  },
  {
    quote: "Their team acts less like an agency and more like a high-performance special ops unit embedded in our company. The velocity of execution is insane.",
    author: "Priya Patel",
    role: "Founder",
    company: "FinTech Scale"
  }
];
