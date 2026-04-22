import { Region } from '../types';

const COMMON_FAQS = [
    { question: "Do you have local teams?", answer: "Yes, we have strategic hubs in these regions to ensure cultural context and timezone alignment." }
];

export const REGIONS: Region[] = [
  { 
    id: 'usa', 
    name: 'USA', 
    slug: 'usa', 
    description: 'Serving the largest digital economy in the world with hubs in New York, San Francisco, and Austin.', 
    marketFocus: ['SaaS', 'Fintech', 'Enterprise'],
    localStrategy: "Aggressive growth hacking combined with Fortune 500 compliance standards.",
    officeCoordinates: "40.7128° N, 74.0060° W",
    relatedCaseStudy: 'saas-brand',
    marketDynamics: "The US market is characterized by extreme saturation and high cost-per-acquisition. Success here requires hyper-niche targeting and brand differentiation.",
    competitiveLandscape: "The landscape is dominated by large holding companies and specialized boutique agencies.",
    localInsights: [
        "CCPA and State Privacy Laws: Strict compliance is non-negotiable for targeting CA, VA, CO residents.",
        "Voice Search Dominance: over 40% of US adults use voice search daily, necessitating conversational SEO strategies."
    ],
    stats: [
        { label: "Ad Spend Managed", value: "$150M+" },
        { label: "US Leads Generated", value: "2.5M+" },
        { label: "Revenue Driven", value: "$400M" },
        { label: "States Covered", value: "50" }
    ],
    faqs: [
        { question: "Do you have a physical office in New York?", answer: "Yes, our US headquarters is located in Manhattan." },
        ...COMMON_FAQS
    ]
  },
  { 
    id: 'uk', 
    name: 'United Kingdom', 
    slug: 'uk', 
    description: 'Our European HQ in London driving innovation across EMEA.', 
    marketFocus: ['Fintech', 'Fashion', 'Professional Services'],
    localStrategy: "Balancing creativity with data-privacy regulations (GDPR).",
    officeCoordinates: "51.5074° N, 0.1278° W",
    relatedCaseStudy: 'fintech-scale',
    marketDynamics: "UK consumers are highly cynical of overt advertising. Content must be authentic, value-driven, and culturally nuanced.",
    competitiveLandscape: "London is a global creative hub. Design standards are exceptionally high.",
    localInsights: [
        "GDPR Stringency: The UK (and EU) requires explicit cookie consent. We implement server-side tracking to mitigate data loss.",
        "Mobile First: 80% of UK e-commerce traffic is mobile. We prioritize mobile UX/UI above desktop."
    ],
    stats: [
        { label: "UK Clients", value: "45+" },
        { label: "Traffic Generated", value: "10M+" },
        { label: "Awards Won", value: "12" },
        { label: "Avg Retention", value: "3.5 Yrs" }
    ],
    faqs: [
        { question: "Are you GDPR compliant?", answer: "100%. We have a dedicated data protection officer." },
        ...COMMON_FAQS
    ]
  },
  { 
    id: 'uae', 
    name: 'UAE & KSA', 
    slug: 'uae-ksa', 
    description: 'The fastest growing digital market. Hubs in Dubai and Riyadh.', 
    marketFocus: ['Real Estate', 'Government', 'Luxury Retail'],
    localStrategy: "Mobile-first, video-centric strategies tailored for Arabic and Expat audiences.",
    officeCoordinates: "25.2048° N, 55.2708° E",
    relatedCaseStudy: 'retail-ai',
    marketDynamics: "High smartphone penetration and social media usage. Snapchat and TikTok are dominant platforms in KSA.",
    competitiveLandscape: "Rapidly digitizing economy with Vision 2030 driving massive government and infrastructure investment.",
    localInsights: [
        "Localization: Standard translation fails. We use native Arabic copywriters to capture dialect nuances (Khaleeji vs. Levantine).",
        "WhatsApp Commerce: WhatsApp is a primary business channel. We integrate chatbots and CRM directly into WhatsApp API."
    ],
    stats: [
        { label: "Regional Spend", value: "$50M+" },
        { label: "Arabic Campaigns", value: "200+" },
        { label: "Leads/Mo", value: "50k+" },
        { label: "Growth YoY", value: "120%" }
    ],
    faqs: [
        { question: "Do you create Arabic content?", answer: "Yes, we have a fully bilingual team in Dubai." },
        ...COMMON_FAQS
    ]
  },
   { 
    id: 'india', 
    name: 'India', 
    slug: 'india', 
    description: 'Our technical center of excellence in Bangalore.', 
    marketFocus: ['Startups', 'E-commerce', 'EdTech'],
    localStrategy: "High-volume, high-scale engineering and SEO execution.",
    officeCoordinates: "12.9716° N, 77.5946° E",
    relatedCaseStudy: 'fintech-scale',
    marketDynamics: "Price-sensitive but volume-heavy market. Requires scalable automated systems.",
    competitiveLandscape: "Highly competitive with many domestic players.",
    localInsights: [
        "Scale: Systems must handle massive concurrent traffic.",
        "Vernacular: Tier 2/3 cities require local language optimization."
    ],
    stats: [
        { label: "Engineering Team", value: "60+" },
        { label: "Code Deployed", value: "Daily" },
        { label: "Uptime", value: "99.99%" },
        { label: "Support", value: "24/7" }
    ],
    faqs: [
        { question: "Is this an outsourcing center?", answer: "No, it is a core part of our global agency with strategic leadership." },
        ...COMMON_FAQS
    ]
  },
   { 
    id: 'australia', 
    name: 'Australia', 
    slug: 'australia', 
    description: 'Serving APAC from Sydney.', 
    marketFocus: ['Mining', 'Retail', 'Tourism'],
    localStrategy: "Lifestyle-oriented branding with robust backend performance.",
    officeCoordinates: "33.8688° S, 151.2093° E",
    relatedCaseStudy: 'retail-ai',
    marketDynamics: "High cost of media. Requires high conversion rates to be profitable.",
    competitiveLandscape: "Mature market with high expectations for design quality.",
    localInsights: [
        "Timezone: We use the timezone difference to offer 'follow the sun' development cycles.",
        "Video: High consumption of video content across platforms."
    ],
    stats: [
        { label: "APAC Revenue", value: "$20M" },
        { label: "Brands", value: "15" },
        { label: "Campaigns", value: "50+" },
        { label: "ROAS", value: "4.5x" }
    ],
    faqs: [
        { question: "Do you handle Asian markets from Aus?", answer: "Yes, our Sydney team coordinates strategies for SEA and ANZ." },
        ...COMMON_FAQS
    ]
  }
];