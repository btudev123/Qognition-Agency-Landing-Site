
import { Industry } from '../types';

const COMMON_FAQS = [
    { question: "How do you integrate AI into your workflow?", answer: "We utilize a proprietary stack of LLMs for data analysis, semantic entity mapping, and predictive trend modeling, while maintaining human oversight for strategic creativity." },
    { question: "What is your typical engagement model?", answer: "We operate primarily on a retainer basis for long-term growth partnerships, with project-based execution for specific technical infrastructure builds." }
];

export const INDUSTRIES: Industry[] = [
  {
    id: 'law-legal',
    name: 'Law Firms & Legal Services',
    description: 'We help top-tier firms build authority and attract high-value cases through E-E-A-T focused digital strategies.',
    subIndustries: [
        { 
            name: 'Corporate Law Firms', 
            slug: 'corporate-law', 
            description: 'B2B lead generation for M&A, compliance, and corporate governance.', 
            features: ['LinkedIn ABM', 'Whitepaper Funnels', 'Executive Branding'],
            benefits: ['Target Fortune 500 GCs', 'Establish Thought Leadership', 'Automate Lead Nurturing'],
            faqs: [{ question: "How do you target General Counsels?", answer: "We use LinkedIn Account-Based Marketing to specifically target GCs and decision-makers at your ideal client companies." }]
        },
        { 
            name: 'Criminal Defense Attorneys', 
            slug: 'criminal-defense', 
            description: 'High-urgency local SEO and PPC for immediate representation needs.', 
            features: ['Local Services Ads', '24/7 Call Tracking', 'Speed-to-Lead Automation'],
            benefits: ['Capture High-Intent Search', 'Increase Call Volume', 'Build Local Trust'],
            faqs: [{ question: "Can you help with bad reviews?", answer: "Yes, we implement reputation management systems to generate positive reviews and mitigate the impact of negative ones." }]
        },
        { 
            name: 'Family & Divorce Lawyers', 
            slug: 'family-divorce', 
            description: 'Empathetic content strategy and reputation management for sensitive cases.', 
            features: ['Reputation Management', 'Blog Content', 'Retargeting'],
            benefits: ['Build Emotional Connection', 'Screen for High-Asset Cases', 'Private Consultations'],
            faqs: [{ question: "Is retargeting appropriate?", answer: "We use privacy-first, context-based targeting to reach users without being intrusive during sensitive times." }]
        },
        { 
            name: 'Intellectual Property (IP) Lawyers', 
            slug: 'ip-law', 
            description: 'Authority building for patent and trademark attorneys targeting innovators.', 
            features: ['Tech SEO', 'Global Reach', 'Startup Ecosystem Partnerships'],
            benefits: ['Connect with Inventors', 'Global Market Reach', 'Authority in Tech'],
            faqs: [{ question: "Do you understand patent law?", answer: "Our content team specializes in technical writing to ensure accuracy in complex IP topics." }]
        },
        { 
            name: 'Real Estate Legal Services', 
            slug: 'real-estate-law', 
            description: 'Connecting firms with developers and commercial investors.', 
            features: ['Partnership Marketing', 'Lead Gen', 'Developer Targeting'],
            benefits: ['Commercial Contract Leads', 'Developer Partnerships', 'Closing Agent Status'],
            faqs: [{ question: "Can you target commercial developers?", answer: "Yes, we use data enrichment to identify and target property developers in your region." }]
        },
        { 
            name: 'Litigation & Arbitration Firms', 
            slug: 'litigation', 
            description: 'Positioning firms for high-stakes dispute resolution.', 
            features: ['PR Integration', 'Thought Leadership', 'Crisis Management SEO'],
            benefits: ['Win High-Stakes Cases', 'Manage Public Perception', 'Attract Class Actions'],
            faqs: [{ question: "How does PR help litigation?", answer: "We align digital PR with your legal strategy to manage the narrative in the court of public opinion." }]
        }
    ],
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
    id: 'accounting-cpa',
    name: 'Accounting & CPA Firms',
    description: 'Digital growth for financial professionals. We turn compliance services into high-value advisory brands.',
    subIndustries: [
        { name: 'Chartered Accounting Firms', slug: 'chartered-accounting', description: 'Full-service digital presence for premier accounting houses.', features: ['Client Portals', 'Service SEO'], benefits: ['Attract High-Value Clients', 'Modernize Brand Image'] },
        { name: 'Tax Consultancy & Filing', slug: 'tax-consultancy', description: 'Seasonal scaling strategies to maximize tax-season revenue.', features: ['Seasonal PPC', 'Retargeting'], benefits: ['Maximize Tax Season', 'Retain Clients Year-Round'] },
        { name: 'Audit & Assurance Firms', slug: 'audit-assurance', description: 'Trust-based marketing for corporate audit services.', features: ['Corporate Branding', 'Technical Writing'], benefits: ['Build Corporate Trust', 'Win RFP Bids'] },
        { name: 'Payroll & Compliance', slug: 'payroll-services', description: 'B2B lead generation for outsourced payroll providers.', features: ['SaaS-style Marketing', 'LinkedIn Ads'], benefits: ['Target HR Directors', 'Recurring Revenue Growth'] },
        { name: 'Bookkeeping Services', slug: 'bookkeeping', description: 'Local and remote SEO for outsourced bookkeeping.', features: ['Local Map Pack', 'Review Gen'], benefits: ['Dominate Local Search', 'Automate Lead Intake'] },
        { name: 'GST / VAT Advisory', slug: 'tax-advisory', description: 'Niche authority building for complex tax code consulting.', features: ['Educational Content', 'Webinars'], benefits: ['Establish Niche Authority', 'High-Ticket Consulting'] }
    ],
    painPoints: ['Commoditization of services', 'Seasonal revenue dips', 'Client retention'],
    solutions: ['Lifecycle Email Marketing', 'Niche Authority Content', 'Automated Onboarding'],
    relatedServices: ['seo', 'ppc'],
    caseStudyRef: 'fintech-scale',
    faqs: [
        { question: "Can you help us target high-net-worth individuals?", answer: "Yes, our paid media and audience strategies can specifically target wealth brackets and business owners." },
        ...COMMON_FAQS
    ]
  },
  {
    id: 'financial-services',
    name: 'Financial Services & Investment',
    description: 'Trust is the currency of finance. We build digital fortresses of authority for Fintechs, Wealth Managers, and Banks.',
    subIndustries: [
        { name: 'Wealth Management', slug: 'wealth-management', description: 'High-touch digital experiences for HNW client acquisition.', features: ['Premium UI', 'Trust Signals'], benefits: ['HNW Client Acquisition', 'Trust & Credibility'] },
        { name: 'Investment Advisory', slug: 'investment-advisory', description: 'Compliance-ready marketing for RIAs and advisors.', features: ['YMYL SEO', 'Lead Nurturing'], benefits: ['SEC/FINRA Compliant', 'Automated Nurturing'] },
        { name: 'FinTech Companies', slug: 'fintech', description: 'Aggressive user acquisition for financial technology startups.', features: ['App Store Optimization', 'Viral Loops'], benefits: ['Rapid User Growth', 'Lower CAC'] },
        { name: 'Mutual Fund Managers', slug: 'mutual-funds', description: 'Data-driven campaigns for portfolio products.', features: ['Performance Max', 'Dashboards'], benefits: ['AUM Growth', 'Investor Education'] },
        { name: 'Insurance Advisory', slug: 'insurance', description: 'Lead generation for life, health, and commercial insurance.', features: ['Comparison Funnels', 'High-Volume PPC'], benefits: ['Volume Lead Gen', 'Cross-Selling'] },
        { name: 'Financial Planning', slug: 'financial-planning', description: 'Personalized content strategies for CFPs.', features: ['Local SEO', 'Video Content'], benefits: ['Personal Branding', 'Local Dominance'] }
    ],
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
    id: 'consulting',
    name: 'Management & Business Consultancy',
    description: 'Positioning your firm as the undisputed thought leader in your specific niche.',
    subIndustries: [
        { name: 'Strategy Consulting', slug: 'strategy-consulting', description: 'Blue-chip positioning for high-level strategic advisors.', features: ['Whitepapers', 'Executive Branding'], benefits: ['C-Suite Access', 'Premium Positioning'] },
        { name: 'Operations Consulting', slug: 'operations-consulting', description: 'Case-study driven marketing for efficiency experts.', features: ['Data Visualization', 'LinkedIn Ads'], benefits: ['Demonstrate ROI', 'Target COOs'] },
        { name: 'HR & Talent Consulting', slug: 'hr-consulting', description: 'B2B lead gen for recruitment and organizational design.', features: ['Content Marketing', 'Webinars'], benefits: ['HR Director Targeting', 'Lead Quality'] },
        { name: 'Startup Advisory', slug: 'startup-advisory', description: 'Growth marketing for incubator and accelerator consultants.', features: ['Ecosystem Building', 'Social Proof'], benefits: ['Founder Network', 'Deal Flow'] },
        { name: 'Risk & Compliance', slug: 'risk-compliance', description: 'Authority building for regulatory consultants.', features: ['Technical SEO', 'Trust Badges'], benefits: ['Regulatory Authority', 'Inbound Leads'] },
        { name: 'Digital Transformation', slug: 'digital-transformation', description: 'Lead gen for IT and change management firms.', features: ['ABM', 'Tech Partnerships'], benefits: ['Enterprise Contracts', 'Tech Alliances'] }
    ],
    painPoints: ['Long sales cycles', 'Measuring ROI', 'Differentiating methodology'],
    solutions: ['Account Based Marketing', 'Interactive Case Studies', 'Personal Branding'],
    relatedServices: ['smm', 'web-development'],
    caseStudyRef: 'saas-brand',
    faqs: [
        { question: "Do you write the thought leadership content?", answer: "We interview your subject matter experts and have our technical writers craft the final assets to ensure accuracy." },
        ...COMMON_FAQS
    ]
  },
  {
    id: 'real-estate',
    name: 'Real Estate & Property',
    description: 'Generating qualified leads for luxury developers, brokers, and property managers.',
    subIndustries: [
        { name: 'Commercial Real Estate', slug: 'commercial-real-estate', description: 'Lead generation for office, retail, and industrial leasing.', features: ['LoopNet Integration', 'Targeted PPC'], benefits: ['Lease Velocity', 'Qualified Tenants'] },
        { name: 'Residential Agencies', slug: 'residential-agencies', description: 'Hyper-local SEO and social ads for home sales.', features: ['Local SEO', 'Instagram Ads'], benefits: ['Sell Homes Faster', 'Build Agent Brand'] },
        { name: 'Property Management', slug: 'property-management', description: 'B2B marketing to attract landlords and asset owners.', features: ['Content Marketing', 'Cold Outreach'], benefits: ['Owner Acquisition', 'Portfolio Growth'] },
        { name: 'Facility Management', slug: 'facility-management', description: 'Contract acquisition for maintenance services.', features: ['B2B SEO', 'Tender Support'], benefits: ['Long-Term Contracts', 'B2B Visibility'] },
        { name: 'Leasing Consultants', slug: 'leasing-consultants', description: 'Digital presence for rental market experts.', features: ['Virtual Tours', 'Booking Systems'], benefits: ['Streamlined Bookings', 'Higher Occuapancy'] },
        { name: 'Real Estate Investment', slug: 'real-estate-investment', description: 'Attracting LPs and capital for RE funds.', features: ['Investor Portals', 'Email Automation'], benefits: ['Capital Raising', 'Investor Relations'] }
    ],
    painPoints: ['Lead quality', 'Market volatility', 'Visual presentation'],
    solutions: ['High-End Web Design', 'Lead Gen Funnels', 'Virtual Tour Integration'],
    relatedServices: ['web-development', 'smm'],
    caseStudyRef: 'saas-brand',
    faqs: [
        { question: "Can you integrate with IDX/MLS?", answer: "Yes, we build custom IDX/MLS integrations for real-time property listings on your site." },
        ...COMMON_FAQS
    ]
  },
  {
    id: 'manufacturing',
    name: 'Manufacturing & Industrial',
    description: 'Bridging the gap between legacy industrial strength and modern digital discovery.',
    subIndustries: [
        { name: 'B2B Manufacturing', slug: 'b2b-manufacturing', description: 'Global SEO for contract manufacturing and fabrication.', features: ['International SEO', 'Catalog Design'], benefits: ['Global RFQs', 'Supply Chain Visibility'] },
        { name: 'Industrial Equipment', slug: 'industrial-equipment', description: 'E-commerce and quote-generation for heavy machinery.', features: ['Complex Config', 'PPC'], benefits: ['Sell High-Ticket Items', 'Distributor Support'] },
        { name: 'OEM Manufacturers', slug: 'oem', description: 'Supply chain visibility and partner acquisition.', features: ['Trade Show Support', 'Technical Content'], benefits: ['OEM Partnerships', 'Brand Spec'] },
        { name: 'Raw Material Suppliers', slug: 'raw-materials', description: 'Commodity marketing and bulk order generation.', features: ['Price Tables', 'Logistics SEO'], benefits: ['Bulk Orders', 'Consistent Demand'] },
        { name: 'Factory Automation', slug: 'factory-automation', description: 'Marketing Industry 4.0 solutions to plant managers.', features: ['Video Case Studies', 'Tech Specs'], benefits: ['Target Engineers', 'Showcase ROI'] },
        { name: 'Engineering Units', slug: 'engineering-fabrication', description: 'Niche targeting for specialized engineering services.', features: ['CAD Integration', 'Spec Sheets'], benefits: ['Niche Dominance', 'Technical Credibility'] }
    ],
    painPoints: ['Complex product specs', 'Niche audiences', 'Legacy sales channels'],
    solutions: ['Technical Catalog SEO', 'LinkedIn Sales Nav', 'Digital Catalogs'],
    relatedServices: ['seo', 'web-development'],
    caseStudyRef: 'fintech-scale',
    faqs: [
        { question: "Do you understand technical specs?", answer: "Our team includes technical writers familiar with industrial terminology and spec sheets." },
        ...COMMON_FAQS
    ]
  },
  {
    id: 'coaching',
    name: 'Coaching & Consultancy',
    description: 'Scaling personal brands and educational institutions through automated funnels.',
    subIndustries: [
        { name: 'Exam Coaching Centers', slug: 'exam-coaching', description: 'Local and online student acquisition for competitive exams.', features: ['Student Testimonials', 'Local SEO'], benefits: ['Fill Batches', 'Student Results'] },
        { name: 'Career Coaching', slug: 'career-coaching', description: 'Personal branding and lead gen for career mentors.', features: ['LinkedIn Growth', 'Webinars'], benefits: ['Personal Brand', 'High-Ticket Clients'] },
        { name: 'Business Coaching', slug: 'business-coaching', description: 'High-ticket funnel optimization for executive coaches.', features: ['Funnel Building', 'Ads'], benefits: ['Automated Sales', 'Scalable Offers'] },
        { name: 'Corporate Training', slug: 'corporate-training', description: 'B2B sales enablement for training providers.', features: ['HR Targeting', 'Curriculum Design'], benefits: ['Corporate Contracts', 'L&D Partnerships'] },
        { name: 'Skill Institutes', slug: 'skill-development', description: 'Enrollment campaigns for vocational training.', features: ['Social Ads', 'Geofencing'], benefits: ['Volume Enrollment', 'Local Awareness'] },
        { name: 'Certification Coaching', slug: 'certification-coaching', description: 'SEO for professional credential training.', features: ['Authority Content', 'Email Courses'], benefits: ['Exam Authority', 'Passive Revenue'] }
    ],
    painPoints: ['Filling cohorts', 'Demonstrating ROI', 'Skeptical audiences'],
    solutions: ['Webinar Funnels', 'Social Proof Engines', 'Community Management'],
    relatedServices: ['smm', 'ppc'],
    caseStudyRef: 'retail-ai',
    faqs: [
        { question: "Can you help with course launches?", answer: "Yes, we specialize in 'Launch Formula' style campaigns to maximize enrollment windows." },
        ...COMMON_FAQS
    ]
  },
  {
    id: 'industrial-trade',
    name: 'Industrial & Trade',
    description: 'Digital transformation for the backbone of the economy.',
    subIndustries: [
        { name: 'Manufacturing Units', slug: 'manufacturing-units', description: 'Local visibility for SME production units.', features: ['GMB Optimization', 'Local SEO'], benefits: ['Local RFQs', 'Factory Visibility'] },
        { name: 'Heavy Equipment', slug: 'heavy-equipment', description: 'Global reach for large-scale machinery sales.', features: ['Export SEO', 'Video Demos'], benefits: ['International Sales', 'Asset Liquidation'] },
        { name: 'B2B Factories', slug: 'b2b-factories', description: 'Contract acquisition for specialized factories.', features: ['Lead Gen', 'Industry Directories'], benefits: ['Contract Manufacturing', 'B2B Scale'] },
        { name: 'Industrial Supplies', slug: 'industrial-supplies', description: 'E-commerce solutions for MRO and components.', features: ['Bulk Ordering', 'SKU SEO'], benefits: ['Digital Catalog', 'Easy Reordering'] },
        { name: 'Exporters & Importers', slug: 'export-import', description: 'International trade marketing and trade compliance SEO.', features: ['Multi-language Sites', 'Trade Data'], benefits: ['New Markets', 'Trade Compliance'] },
        { name: 'Logistics & Supply Chain', slug: 'logistics', description: 'Brand authority for 3PL and freight forwarders.', features: ['Tracking UI', 'Trust Signals'], benefits: ['Shipper Trust', 'Route Density'] }
    ],
    painPoints: ['Low digital literacy', 'Global competition', 'Supply chain disruptions'],
    solutions: ['Digital Catalogs', 'Trade Portal SEO', 'Whatsapp Automation'],
    relatedServices: ['web-development', 'seo'],
    caseStudyRef: 'fintech-scale',
    faqs: [
        { question: "Do you handle multi-lingual sites?", answer: "Yes, we build international SEO architectures to target specific export markets." },
        ...COMMON_FAQS
    ]
  },
  {
    id: 'care-homes',
    name: 'Care Homes',
    description: 'Compassionate, trust-first digital marketing for care facilities.',
    subIndustries: [
        { name: 'Assisted Living', slug: 'assisted-living', description: 'Tours and occupancy generation for assisted living.', features: ['Virtual Tours', 'Family Guides'], benefits: ['Fill Vacancies', 'Family Trust'] },
        { name: 'Home Nursing', slug: 'home-nursing', description: 'Local SEO for at-home care providers.', features: ['Local Services Ads', 'Trust Reviews'], benefits: ['Local Inquiries', 'Carer Recruitment'] },
        { name: 'Medical Care Homes', slug: 'medical-care-homes', description: 'Specialized marketing for skilled nursing facilities.', features: ['Medical SEO', 'Referral Networks'], benefits: ['Hospital Referrals', 'Clinical Trust'] },
        { name: 'Rehabilitation Centers', slug: 'rehab-centers', description: 'Patient acquisition for short-term rehab.', features: ['Success Stories', 'Doctor Referrals'], benefits: ['Patient Census', 'Recovery Stories'] },
        { name: 'Disability Care', slug: 'disability-care', description: 'NDIS/Insurance aligned marketing for disability support.', features: ['Accessibility', 'Compliance'], benefits: ['NDIS Participants', 'Accessible Brand'] },
        { name: 'Post-Hospital Care', slug: 'post-hospital', description: 'Connecting with hospital discharge planners digitally.', features: ['B2B Outreach', 'Brochures'], benefits: ['Discharge Partners', 'Continuous Care'] }
    ],
    painPoints: ['Trust deficits', 'Adult children decision makers', 'High emotional stakes'],
    solutions: ['Reputation Management', 'Video Testimonials', 'Empathetic Copywriting'],
    relatedServices: ['seo', 'smm'],
    caseStudyRef: 'saas-brand',
    faqs: [
        { question: "How do you target the families?", answer: "We target the adult children (40-60s) via Facebook and Search who are researching care for their parents." },
        ...COMMON_FAQS
    ]
  },
  {
    id: 'elder-care',
    name: 'Elder Home Services',
    description: 'Dignified marketing for the senior living sector.',
    subIndustries: [
        { name: 'Senior Living Communities', slug: 'senior-living', description: 'Lifestyle marketing for active adult communities.', features: ['Lifestyle Video', 'Event Marketing'], benefits: ['Active Lifestyle', 'Community Growth'] },
        { name: 'Retirement Homes', slug: 'retirement-homes', description: 'Occupancy marketing for retirement villages.', features: ['PPC', 'Open Days'], benefits: ['Sales Velocity', 'Village Life'] },
        { name: 'Memory Care', slug: 'memory-care', description: 'Specialized, sensitive marketing for dementia care.', features: ['Educational Content', 'Support Groups'], benefits: ['Family Support', 'Specialized Care'] },
        { name: 'Independent Living', slug: 'independent-living', description: 'Promoting freedom and security for seniors.', features: ['Benefit-driven Copy', 'Social'], benefits: ['Lifestyle Focus', 'Security'] },
        { name: 'Palliative Care', slug: 'palliative-care', description: 'Awareness and comfort-focused messaging.', features: ['Community Outreach', 'Brand Awareness'], benefits: ['Compassionate Brand', 'Community Ties'] },
        { name: 'Long-Term Care', slug: 'long-term-care', description: 'SEO for nursing homes and long-term facilities.', features: ['Local Map Pack', 'Compliance'], benefits: ['Long-Term Census', 'Quality Ratings'] }
    ],
    painPoints: ['Negative industry perception', 'Staffing shortages', 'Occupancy rates'],
    solutions: ['Staff Recruitment Marketing', 'Virtual Reality Tours', 'Review Generation'],
    relatedServices: ['smm', 'web-development'],
    caseStudyRef: 'saas-brand',
    faqs: [
        { question: "Do you help with staff recruitment?", answer: "Yes, we run employer branding campaigns to attract nurses and care staff." },
        ...COMMON_FAQS
    ]
  },
  {
    id: 'waste-management',
    name: 'Waste Management',
    description: 'Sustainability and logistics marketing for the circular economy.',
    subIndustries: [
        { name: 'Solid Waste Collection', slug: 'waste-collection', description: 'Local SEO for residential and commercial pickup.', features: ['Route Optimization', 'Local Ads'], benefits: ['Route Density', 'Commercial Contracts'] },
        { name: 'Recycling & Scrap', slug: 'recycling-scrap', description: 'B2B sourcing for scrap metal and recycling plants.', features: ['Commodity SEO', 'Trade PPC'], benefits: ['Material Sourcing', 'Buyer Network'] },
        { name: 'E-Waste Management', slug: 'e-waste', description: 'Corporate partnerships for electronic disposal.', features: ['CSR Marketing', 'LinkedIn'], benefits: ['Corporate Accounts', 'Sustainability'] },
        { name: 'Biomedical Waste', slug: 'biomedical-waste', description: 'Compliance-focused marketing for medical disposal.', features: ['Hospital Targeting', 'Trust'], benefits: ['Medical Contracts', 'Safety Compliance'] },
        { name: 'Hazardous Waste', slug: 'hazardous-waste', description: 'Industrial safety marketing for hazmat services.', features: ['Niche SEO', 'Safety Certs'], benefits: ['Industrial Clients', 'Safety Record'] },
        { name: 'Scrap Processing', slug: 'scrap-processing', description: 'Supply chain visibility for processing units.', features: ['B2B Lead Gen', 'Direct Outreach'], benefits: ['Processor Volume', 'Supply Chain'] }
    ],
    painPoints: ['Low public interest', 'Regulatory pressure', 'Contract competition'],
    solutions: ['Green/Sustainability Branding', 'Municipal Tender Support', 'Local SEO'],
    relatedServices: ['seo', 'web-development'],
    caseStudyRef: 'fintech-scale',
    faqs: [
        { question: "Can you help with municipal contracts?", answer: "We can build the digital authority and proposal assets needed to win government tenders." },
        ...COMMON_FAQS
    ]
  }
];
