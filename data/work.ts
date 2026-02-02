import { CaseStudy } from '../types';

export const CASE_STUDIES: CaseStudy[] = [
  {
    id: 'fintech-scale',
    client: 'NovaPay',
    industry: 'FinTech',
    title: 'Scaling User Acquisition for Series B Fintech',
    image: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?q=80&w=2070&auto=format&fit=crop',
    tags: ['SEO', 'Web Design', 'Performance'],
    stats: [
      { label: 'User Growth', value: '+315%' },
      { label: 'CAC Reduction', value: '-40%' }
    ]
  },
  {
    id: 'saas-brand',
    client: 'FlowState',
    industry: 'SaaS',
    title: 'Rebranding an Enterprise Workflow Platform',
    image: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?q=80&w=2015&auto=format&fit=crop',
    tags: ['Branding', 'Web Dev'],
    stats: [
      { label: 'Demo Requests', value: '+150%' },
      { label: 'Session Duration', value: '4m 20s' }
    ]
  },
  {
    id: 'retail-ai',
    client: 'LuxeCart',
    industry: 'E-commerce',
    title: 'AI-Driven Personalization Engine',
    image: 'https://images.unsplash.com/photo-1556742049-0cfed4f7a07d?q=80&w=2070&auto=format&fit=crop',
    tags: ['AI', 'Automation'],
    stats: [
      { label: 'Conversion Rate', value: '+22%' },
      { label: 'AOV', value: '+15%' }
    ]
  }
];