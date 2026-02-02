
export interface SubService {
  name: string;
  description: string;
}

export interface FAQ {
  question: string;
  answer: string;
}

export interface ProcessStep {
  title: string;
  description: string;
}

export interface Service {
  id: string;
  title: string;
  shortDescription: string;
  fullDescription: string;
  subServices: SubService[];
  icon: string;
  kpis: string[];
  faqs: FAQ[];
  process: ProcessStep[];
  techStack: string[];
  relatedIndustries: string[];
}

export interface Industry {
  id: string;
  name: string;
  description: string;
  subIndustries: string[];
  painPoints: string[];
  solutions: string[];
  relatedServices: string[];
  caseStudyRef?: string;
  faqs: FAQ[];
}

export interface Region {
  id: string;
  name: string;
  slug: string;
  description: string;
  marketFocus: string[];
  localStrategy: string;
  officeCoordinates: string;
  faqs: FAQ[];
  marketDynamics: string;
  competitiveLandscape: string;
  localInsights: string[];
  stats: { label: string; value: string }[];
  relatedCaseStudy?: string;
}

export interface CaseStudy {
  id: string;
  client: string;
  industry: string;
  title: string;
  image: string;
  tags: string[];
  stats: { label: string; value: string }[];
}

export interface NavItem {
  label: string;
  path: string;
}

export interface Testimonial {
  quote: string;
  author: string;
  role: string;
  company: string;
}

export interface ClientLogo {
  name: string;
  url: string;
}

export interface SchemaData {
  title?: string;
  description?: string;
  url?: string;
  image?: string;
  type?: 'Organization' | 'WebSite' | 'Service' | 'Article' | 'Place' | 'SoftwareApplication';
  [key: string]: any;
}

// DIRECTORY TYPES
export interface Tool {
  id: string;
  name: string;
  category: string; // e.g., "SEO", "AI", "Analytics"
  shortDescription: string;
  fullDescription: string;
  pricing: 'Free' | 'Freemium' | 'Paid' | 'Enterprise' | 'Open Source';
  websiteUrl: string;
  rating: number; // 1-5
  tags: string[];
  agencyVerdict: string; // The "Qognition Take"
  relatedServiceId?: string; // Link back to internal service
  imageUrl?: string; // Optional image from Product Hunt
  votesCount?: number; // Optional Product Hunt votes
}

export interface ToolCategory {
  id: string;
  name: string;
  description: string;
  slug: string;
  phTopicSlug?: string; // Product Hunt Topic Slug
}

// Product Hunt API Types
export interface PHPost {
  id: string;
  name: string;
  tagline: string;
  description: string;
  url: string;
  slug: string; // Added slug
  website: string;
  thumbnail: {
    url: string;
  };
  votesCount: number;
  topics: {
    edges: {
      node: {
        name: string;
        slug?: string;
      }
    }[]
  };
}
