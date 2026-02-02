import { Industry } from '../types';

const COMMON_FAQS = [
    { question: "How do you integrate AI into your workflow?", answer: "We utilize a proprietary stack of LLMs for data analysis, semantic entity mapping, and predictive trend modeling, while maintaining human oversight for strategic creativity." },
    { question: "What is your typical engagement model?", answer: "We operate primarily on a retainer basis for long-term growth partnerships, with project-based execution for specific technical infrastructure builds." }
];

export const INDUSTRIES: Industry[] = [
  {
    id: 'law-legal',
    name: 'Law Firms & Legal',
    description: 'We help top-tier firms build authority and attract high-value cases through E-E-A-T focused digital strategies.',
    subIndustries: ['Corporate Law', 'Criminal Defense', 'Family & Divorce', 'IP Law', 'Real Estate Legal', 'Litigation'],
    painPoints: ['High CPA for leads', 'Difficulty differentiating', 'Strict advertising regulations'],
    solutions: ['Authority SEO', 'Professional Content Strategy', 'Local Services Ads'],
    relatedServices: ['seo', 'web-development'],
    caseStudyRef: 'fintech-scale',
    faqs: [
        { question: "Do you understand bar association advertising rules?", answer: "Yes, we ensure all campaigns are compliant with local and state bar advertising ethics." },
        { question: "How do you improve lead quality?", answer: "We use negative keywords, pre-qualifying forms, and high-intent content to filter out tire-kickers." },
        ...COMMON_FAQS
    ]
  },
  {
    id: 'financial-services',
    name: 'Financial Services',
    description: 'Trust is the currency of finance. We build digital fortresses of authority for Fintechs, Wealth Managers, and Banks.',
    subIndustries: ['Fintech', 'Wealth Management', 'Crypto/Web3', 'Insurance', 'Banking'],
    painPoints: ['YMYL Google Filters', 'Long sales cycles', 'Complex compliance requirements'],
    solutions: ['YMYL-Optimized SEO', 'Thought Leadership Content', 'Secure Web Architecture'],
    relatedServices: ['seo', 'ppc'],
    caseStudyRef: 'fintech-scale',
    faqs: [
        { question: "How do you handle YMYL pages?", answer: "We strictly adhere to Google's 'Your Money Your Life' guidelines, ensuring all content is reviewed by qualified experts." },
        ...COMMON_FAQS
    ]
  },
  {
    id: 'ecommerce',
    name: 'E-Commerce & Retail',
    description: 'Scaling DTC brands through high-velocity creative testing and technical SEO architecture.',
    subIndustries: ['Fashion', 'Beauty', 'Home Goods', 'Electronics', 'Luxury'],
    painPoints: ['Rising ad costs', 'Cart abandonment', 'Inventory syncing'],
    solutions: ['Shopify Plus Dev', 'Performance Creative', 'Shopping Feed Optimization'],
    relatedServices: ['ppc', 'smm'],
    caseStudyRef: 'retail-ai',
    faqs: [
        { question: "Which platforms do you support?", answer: "We specialize in Shopify Plus, WooCommerce, and custom Headless builds." },
        ...COMMON_FAQS
    ]
  },
  {
    id: 'saas-tech',
    name: 'SaaS & Technology',
    description: 'Driving demos and ARR for B2B software companies through account-based marketing.',
    subIndustries: ['B2B SaaS', 'Enterprise Software', 'Cybersecurity', 'AI Startups'],
    painPoints: ['High churn', 'Complex product explanation', 'Competitive keywords'],
    solutions: ['Product-Led SEO', 'ABM Campaigns', 'Technical Content'],
    relatedServices: ['seo', 'web-development'],
    caseStudyRef: 'saas-brand',
    faqs: [
        { question: "Do you do ABM?", answer: "Yes, we run targeted LinkedIn and IP-based campaigns to penetrate specific enterprise accounts." },
        ...COMMON_FAQS
    ]
  },
   {
    id: 'healthcare',
    name: 'Healthcare & Medical',
    description: 'Patient-centric digital experiences that prioritize privacy, empathy, and authority.',
    subIndustries: ['Clinics', 'MedTech', 'Telehealth', 'Senior Care'],
    painPoints: ['HIPAA compliance', 'Local competition', 'Reputation management'],
    solutions: ['Local SEO', 'Reputation Management', 'Compliance-Ready Ads'],
    relatedServices: ['seo', 'ppc'],
    caseStudyRef: 'saas-brand',
    faqs: [
        { question: "Is your tracking HIPAA compliant?", answer: "Yes, we use specialized tracking configurations to ensure no PII is leaked to ad platforms." },
        ...COMMON_FAQS
    ]
  },
   {
    id: 'real-estate',
    name: 'Real Estate',
    description: 'Generating qualified leads for luxury developers and high-volume brokerages.',
    subIndustries: ['Luxury Residential', 'Commercial', 'PropTech', 'Property Management'],
    painPoints: ['Lead quality', 'Market volatility', 'Visual presentation'],
    solutions: ['High-End Web Design', 'Lead Gen Funnels', 'Virtual Tour Integration'],
    relatedServices: ['web-development', 'smm'],
    caseStudyRef: 'saas-brand',
    faqs: [
        { question: "Can you integrate with MLS?", answer: "Yes, we build custom IDX/MLS integrations for real-time property listings." },
        ...COMMON_FAQS
    ]
  }
];