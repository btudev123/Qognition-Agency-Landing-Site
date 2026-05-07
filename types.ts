
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

export interface ExpertQuote {
    author: string;
    role: string;
    quote: string;
    image?: string;
}

export interface DeepDiveSection {
    title: string;
    content: string; // Markdown-like string or long text
}

export interface MarketData {
    label: string;
    value: string;
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
  // New Fields for Content Depth
  deepDive?: DeepDiveSection[]; 
  expertQuote?: ExpertQuote;
}

export interface SubIndustry {
  name: string;
  slug: string; // URL friendly ID
  description: string;
  features: string[];
  benefits?: string[]; // New: Key selling points
  faqs?: FAQ[];       // New: Specific FAQs
}

export interface Industry {
  id: string;
  name: string;
  description: string;
  subIndustries: SubIndustry[]; 
  painPoints: string[];
  solutions: string[];
  relatedServices: string[];
  caseStudyRef?: string;
  faqs: FAQ[];
  // New Fields
  expertQuote?: ExpertQuote;
  marketData?: MarketData[];
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

export interface Location {
  name: string;
  slug: string;
  country: string;
  region: string;
  type: 'city' | 'state' | 'province' | 'country' | 'continent' | 'region';
  marketFocus: string[];
  intro: string;
  localModifiers: string[];
  canonicalParent?: string;
  schemaType: 'ServiceArea' | 'AdministrativeArea' | 'City' | 'Country';
}

export interface ProgrammaticPage {
  route: string;
  title: string;
  description: string;
  h1: string;
  intro: string;
  faq: FAQ[];
  relatedLinks: { label: string; href: string }[];
  schema: SchemaData;
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
  type?: 'Organization' | 'WebSite' | 'Service' | 'Article' | 'Place' | 'SoftwareApplication' | 'CollectionPage' | 'LocalBusiness';
  [key: string]: any;
}

// DIRECTORY TYPES
export interface Tool {
  id: string;
  name: string;
  category: string;
  shortDescription: string;
  fullDescription: string;
  pricing: 'Free' | 'Freemium' | 'Paid' | 'Enterprise' | 'Open Source';
  websiteUrl: string;
  rating: number;
  tags: string[];
  agencyVerdict: string;
  relatedServiceId?: string;
  imageUrl?: string;
  votesCount?: number;
}

export interface DirectoryProduct extends Tool {
  slug: string;
  categorySlug: string;
  source: 'curated' | 'product-hunt' | 'generated';
}

export interface ToolCategory {
  id: string;
  name: string;
  description: string;
  slug: string;
  phTopicSlug?: string;
}

export interface PHPost {
  id: string;
  name: string;
  tagline: string;
  description: string;
  url: string;
  slug: string;
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
