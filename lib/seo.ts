import type { Metadata } from 'next';
import { isLegacyIndexable } from './legacy-publication';
import { BLOG_POSTS } from '../data/blog';
import { DIRECTORY_PRODUCTS } from '../data/directoryProducts';
import { INDUSTRIES } from '../data/industries';
import { getLocationBySlug } from '../data/locations';
import { REGIONS } from '../data/regions';
import { SERVICES } from '../data/services';
import { DirectoryProduct, FAQ, Industry, Location, Service } from '../types';

export const SITE_URL = 'https://www.qognitionagency.com';
export const SITE_NAME = 'Qognition Agency';

export const absoluteUrl = (path = '/') => `${SITE_URL}${path === '/' ? '' : path}`;

/**
 * Hand-written title/description for priority pages, keyed by canonical path.
 *
 * These come from the keyword-mapped SEO spec and must render byte-for-byte, so
 * `metadataFor` emits them as `title.absolute` — bypassing both the
 * "| Qognition" template in app/layout.tsx and the suffix-stripping below.
 * Anything not listed here keeps the generated title.
 */
export const SEO_OVERRIDES: Record<string, { title: string; description: string }> = {
  /* Priority pages, revised 2026-10-06 by Nadia (search) against the operator's
   * keyword sheet. Each title keeps the operator's target keyword. Claims the
   * sheet proposed that have no source in data/case-studies or CLAUDE.md §4
   * (traffic and CPA percentages, PageSpeed scores, named clients, "best",
   * "within 48 hours") are NOT here; they are listed as operator decisions in
   * docs/strategy/2026-10/02-search-sprint.md §3.4. Rollback: git checkout this block. */
  '/': {
    title: 'AI-Native B2B Growth Agency: AI SEO & GEO | Qognition Agency',
    description:
      'Qognition Agency is an AI-native growth agency for B2B companies, including SaaS. AI SEO, GEO, SEO and PPC tied to qualified enquiries. Book a call.'
  },
  '/services': {
    // No "B2B" before "marketing" in this title: "b2b marketing agency" is one of
    // the five white-label strings no page targets (CLAUDE.md, 2026-09-29).
    title: 'Digital Marketing Services: AI SEO, GEO & PPC | Qognition',
    description:
      'Digital marketing services for B2B companies: AI SEO, GEO, SEO and PPC, with content, web and CRO that support them. Scoped to your buyers. Book a call.'
  },
  '/services/seo': {
    title: 'Enterprise SEO Agency: B2B SEO Services | Qognition',
    description:
      'SEO services for B2B and enterprise companies: technical SEO, commercial content and authority work, measured against qualified enquiries. Book a call.'
  },
  '/services/ai-seo': {
    title: 'GEO Services & AI Search Optimization for B2B | Qognition',
    description:
      'GEO and AI search optimization for B2B: entity work, answer-ready content and dated prompt tracking across ChatGPT, Perplexity, Gemini and AI Overviews.'
  },
  '/services/ppc': {
    title: 'B2B PPC Agency & Paid Media Management | Qognition',
    description:
      'PPC and paid media management for B2B: search and paid social campaigns, landing pages and conversion tracking, judged on qualified enquiries. Book a call.'
  },
  '/services/web-development': {
    title: 'B2B Web Design & Development Agency | Qognition',
    description:
      'Web design and development for B2B companies: accessible, fast sites with clear buyer journeys, search foundations and conversion tracking. Book a call.'
  },
  '/services/content': {
    title: 'B2B Content Marketing Services: SEO & AI Search | Qognition',
    description:
      'Content marketing services for B2B: commercial pages, expert guides and buyer evidence written to rank in Google and be quoted in AI answers. Book a call.'
  },
  '/services/branding-creative': {
    title: 'B2B Branding & Creative Agency | Brand Identity | Qognition',
    description:
      'Branding and creative for B2B companies: naming, visual identity, messaging and sales assets that keep your claims consistent everywhere. Book a call.'
  },
  '/services/cro-analytics': {
    title: 'Conversion Rate Optimization (CRO) & Analytics | Qognition',
    description:
      'Conversion rate optimization and analytics for B2B: find form and page friction, track enquiries and bookings, and tie them to sales outcomes. Book a call.'
  },
  '/industries': {
    title: 'B2B Industries We Serve: AI SEO, SEO & PPC | Qognition',
    description:
      'AI SEO, GEO, SEO and PPC for B2B firms. Find your sector, from SaaS and IT services to manufacturing, testing labs and professional services.'
  },
  '/case-studies': {
    title: 'Case Studies: Client Programmes | Qognition Agency',
    description:
      'Named B2B client programmes with dated results, plus HVAC, dental and insurance programmes whose targets stay targets until client reporting confirms them.'
  },
  // /free-seo-audit 308s here (next.config.mjs). One offer, one URL; the title
  // carries both the operator's "free SEO audit" intent and the AI half.
  '/free-ai-audit': {
    title: 'Free AI Search & SEO Visibility Audit | Qognition',
    description:
      'Request a free, human-reviewed audit of how your firm appears in Google and AI answers. We confirm scope and timing after we review your request.'
  },
  '/locations/new-york': {
    title: 'Digital Marketing Agency New York: SEO, PPC, GEO | Qognition',
    description:
      'Qognition helps B2B companies win New York buyers with AI SEO, GEO, SEO and PPC tied to qualified enquiries. Office in New York. Book a call or enquire.'
  },
  '/locations/london': {
    title: 'Digital Marketing Agency London: SEO & AI Search | Qognition',
    description:
      'Qognition helps B2B companies win London buyers with AI SEO, GEO, SEO and PPC tied to qualified enquiries. Remote delivery. Book a call or send an enquiry.'
  },
  '/locations/dubai': {
    title: 'Digital Marketing Agency Dubai | SEO, GEO & PPC | Qognition',
    description:
      'Qognition helps B2B companies selling into Dubai and the UAE with AI SEO, GEO, SEO and PPC. Office in Dubai. Book a call or send an enquiry.'
  },
  '/locations/perth': {
    title: 'Digital Marketing Agency Perth: SEO, PPC & GEO | Qognition',
    description:
      'Qognition helps B2B companies win Perth buyers with AI SEO, GEO, SEO and PPC tied to qualified enquiries. Remote delivery. Book a call or send an enquiry.'
  },
  '/locations/perth/seo': {
    title: 'Perth SEO Agency for B2B: Enterprise & Local SEO | Qognition',
    description:
      'SEO for Perth B2B companies: technical SEO, local SEO, commercial content and authority work, measured against qualified enquiries. Remote delivery.'
  },
  '/locations/perth/ai-seo': {
    title: 'AI SEO Perth: GEO & AI Search Agency for B2B | Qognition',
    description:
      'AI SEO and GEO for Perth B2B companies: how you appear in ChatGPT, Gemini, Perplexity and Google AI Overviews, tracked by prompt and date. Book a call.'
  }
};

/**
 * Hand-written H1s for priority pages whose template H1 dropped the target
 * keyword (the 2026-10-03 service renames, e.g. "B2B Messaging & Creative" on
 * /services/branding-creative). Keyed by canonical path, consumed only by the
 * service and location templates through `h1For`. Delete an entry to fall back
 * to the template H1; nothing else reads this map.
 */
export const H1_OVERRIDES: Record<string, string> = {
  '/services/seo': 'Enterprise and B2B SEO Services',
  // Carries both the operator's "GEO services" and paid ad group 1A's "AI SEO"
  // promise (docs/strategy/2026-10/03-paid-and-cro.md §3.4).
  '/services/ai-seo': 'AI SEO and GEO Services for B2B',
  '/services/ppc': 'B2B PPC and Paid Media Management',
  '/services/web-development': 'B2B Web Design and Development',
  '/services/content': 'B2B Content Marketing Services',
  '/services/branding-creative': 'B2B Branding and Creative Services',
  '/services/cro-analytics': 'Conversion Rate Optimization and Analytics',
  '/locations/new-york': 'Digital marketing agency for B2B companies in New York',
  '/locations/london': 'Digital marketing agency for B2B companies in London',
  '/locations/dubai': 'Digital marketing agency for B2B companies in Dubai',
  '/locations/perth': 'Digital marketing agency for B2B companies in Perth',
  '/locations/perth/seo': 'SEO agency for Perth B2B companies',
  '/locations/perth/ai-seo': 'AI SEO and GEO for Perth B2B companies'
};

export const h1For = (path: string, fallback: string) => H1_OVERRIDES[path] ?? fallback;

export const metadataFor = ({
  title,
  description,
  path,
  image = '/default-og.svg',
  noIndex = false
}: {
  title: string;
  description: string;
  path: string;
  image?: string;
  noIndex?: boolean;
}): Metadata => {
  const override = SEO_OVERRIDES[path];
  const finalDescription = override?.description ?? description;
  const cleanTitle = (override?.title ?? title).replace(/\s*\|\s*Qognition Agency$/i, '');
  const socialTitle = override?.title ?? (cleanTitle.includes(SITE_NAME) ? cleanTitle : `${cleanTitle} | ${SITE_NAME}`);

  return {
    // `absolute` keeps a spec'd title exactly as written; without it the root
    // layout would append "| Qognition" and the suffix strip would rewrite it.
    title: override ? { absolute: override.title } : cleanTitle,
    description: finalDescription,
    alternates: {
      canonical: path
    },
    openGraph: {
      type: 'website',
      siteName: SITE_NAME,
      url: absoluteUrl(path),
      title: socialTitle,
      description: finalDescription,
      images: [image]
    },
    twitter: {
      card: 'summary_large_image',
      title: socialTitle,
      description: finalDescription,
      images: [image]
    },
    robots: {
      index: !noIndex && isLegacyIndexable(path),
      follow: true
    }
  };
};

export const faqSchema = (faqs: FAQ[] = []) => ({
  '@context': 'https://schema.org',
  '@type': 'FAQPage',
  mainEntity: faqs.slice(0, 8).map((faq) => ({
    '@type': 'Question',
    name: faq.question,
    acceptedAnswer: {
      '@type': 'Answer',
      text: faq.answer
    }
  }))
});

export const breadcrumbSchema = (items: { name: string; path: string }[]) => ({
  '@context': 'https://schema.org',
  '@type': 'BreadcrumbList',
  itemListElement: items.map((item, index) => ({
    '@type': 'ListItem',
    position: index + 1,
    name: item.name,
    item: absoluteUrl(item.path)
  }))
});

export const serviceSchema = (service: Service, path: string, extra?: Record<string, unknown>) => ({
  '@context': 'https://schema.org',
  '@type': 'Service',
  name: service.title,
  description: service.fullDescription,
  provider: {
    '@type': 'Organization',
    name: SITE_NAME,
    url: SITE_URL
  },
  areaServed: 'Global',
  serviceType: service.title,
  url: absoluteUrl(path),
  ...extra
});

export const locationSchema = (location: Location, path: string) => ({
  '@context': 'https://schema.org',
  '@type': 'Service',
  name: `Digital Marketing Services in ${location.name}`,
  description: location.intro,
  provider: {
    '@type': 'Organization',
    name: SITE_NAME,
    url: SITE_URL
  },
  areaServed: {
    '@type': location.schemaType,
    name: location.name
  },
  url: absoluteUrl(path)
});

export const directoryProductSchema = (product: DirectoryProduct, path: string) => ({
  '@context': 'https://schema.org',
  '@graph': [
    {
      '@type': 'SoftwareApplication',
      name: product.name,
      applicationCategory: product.category,
      operatingSystem: 'Web',
      description: product.shortDescription,
      url: absoluteUrl(path),
      offers: {
        '@type': 'Offer',
        price: product.pricing === 'Free' || product.pricing === 'Open Source' ? '0' : undefined,
        priceCurrency: 'USD',
        category: product.pricing
      }
    },
    {
      '@type': 'Product',
      name: product.name,
      description: product.shortDescription,
      category: product.category,
      brand: {
        '@type': 'Brand',
        name: product.name
      },
      review: {
        '@type': 'Review',
        author: {
          '@type': 'Organization',
          name: SITE_NAME
        },
        reviewBody: product.agencyVerdict
      },
      url: absoluteUrl(path)
    }
  ]
});

export const getCoreMetadata = (path: string): Metadata => {
  const pages: Record<string, { title: string; description: string }> = {
    '/': {
      title: 'Qognition | AI Growth Marketing Partner for Founders',
      description:
        'Qognition helps founders win with AI-native marketing, SEO, paid media, web design, and conversion strategy built to generate qualified pipeline.'
    },
    '/services': {
      title: 'AI Growth Marketing Services | SEO, PPC, AI Search & Web Design',
      description:
        'Qognition delivers SEO, AI search visibility, paid media, web design, content, and CRO that turn attention into qualified opportunities.'
    },
    '/industries': {
      title: 'Industries We Serve | Expert Digital Marketing',
      description:
        'Specialized digital marketing for finance, legal, real estate, manufacturing, care, SaaS, and local service companies.'
    },
    '/regions': {
      title: 'Regions | Qognition',
      description: 'Explore AI SEO and GEO planning for B2B companies reaching buyers across regional markets.'
    },
    '/case-studies': {
      title: 'Case Studies | Digital Marketing Results',
      description:
        'Explore successful digital marketing campaigns, SEO growth, web development, and performance marketing case studies.'
    },
    '/work': {
      title: 'Case Studies | Digital Marketing Results',
      description:
        'Explore successful digital marketing campaigns, SEO growth, web development, and performance marketing case studies.'
    },
    '/about': {
      title: 'About Qognition | Your Digital Growth Partner',
      description:
        'Meet Qognition Agency, a digital growth partner specializing in SEO, PPC, web development, AI search, and performance marketing.'
    },
    '/contact': {
      title: 'Contact Qognition | Free Marketing Consultation',
      description:
        'Ready to scale your business? Get a free consultation with Qognition digital marketing experts.'
    },
    '/blog': {
      title: 'Blog | Qognition Agency',
      description:
        'Insights on AI marketing, SEO strategy, local search, performance marketing, web design, and digital transformation.'
    },
    '/directory': {
      title: 'Growth Stack Directory | Qognition Agency',
      description:
        'Browse 1000 software and AI product profiles for SEO, PPC, content, social media, web development, and automation.'
    },
    '/llm': {
      title: 'LLM & AI Transparency | Qognition Agency',
      description:
        "Structured entity data and capabilities graph for AI systems and Large Language Models."
    },
    '/sitemap': {
      title: 'Sitemap | Qognition Agency',
      description: 'Index of Qognition Agency services, industries, locations, directory, and resource pages.'
    }
  };

  const page = pages[path] || pages['/'];
  return metadataFor({ ...page, path });
};

export const getServiceMetadata = (serviceSlug: string): Metadata => {
  const service = SERVICES.find((item) => item.id === serviceSlug);
  if (!service) return metadataFor({ title: 'Service Not Found', description: 'Service not found.', path: `/services/${serviceSlug}`, noIndex: true });
  return metadataFor({
    title: `${service.title} Services | Expert Digital Marketing`,
    description: `${service.shortDescription} Get expert ${service.title.toLowerCase()} services from Qognition Agency.`,
    path: `/services/${service.id}`
  });
};

export const getIndustryMetadata = (industrySlug: string): Metadata => {
  const industry = INDUSTRIES.find((item) => item.id === industrySlug);
  if (!industry) return metadataFor({ title: 'Industry Not Found', description: 'Industry not found.', path: `/industries/${industrySlug}`, noIndex: true });
  return metadataFor({
    title: `${industry.name} Digital Marketing | Industry Experts`,
    description: `Specialized digital marketing for ${industry.name}. ${industry.description}`,
    path: `/industries/${industry.id}`
  });
};

export const getSubIndustryMetadata = (industrySlug: string, subIndustrySlug: string): Metadata => {
  const industry = INDUSTRIES.find((item) => item.id === industrySlug);
  const subIndustry = industry?.subIndustries.find((item) => item.slug === subIndustrySlug);
  if (!industry || !subIndustry) {
    return metadataFor({
      title: 'Vertical Not Found',
      description: 'Vertical not found.',
      path: `/industries/${industrySlug}/${subIndustrySlug}`,
      noIndex: true
    });
  }
  return metadataFor({
    title: `${subIndustry.name} Marketing | Digital Strategies for ${subIndustry.name}`,
    description: `Specialized digital marketing for ${subIndustry.name}. ${subIndustry.description}`,
    path: `/industries/${industry.id}/${subIndustry.slug}`
  });
};

export const getRegionMetadata = (regionSlug: string): Metadata => {
  const region = REGIONS.find((item) => item.slug === regionSlug);
  if (!region) return metadataFor({ title: 'Region Not Found', description: 'Region not found.', path: `/regions/${regionSlug}`, noIndex: true });
  return metadataFor({
    title: `Digital Marketing Agency ${region.name} | Local SEO & PPC Services`,
    description: `Qognition Agency in ${region.name}. ${region.description}`,
    path: `/regions/${region.slug}`
  });
};

export const getLocationMetadata = (locationSlug: string, serviceSlug?: string): Metadata => {
  const location = getLocationBySlug(locationSlug);
  const service = serviceSlug ? SERVICES.find((item) => item.id === serviceSlug) : undefined;
  if (!location || (serviceSlug && !service)) {
    return metadataFor({
      title: 'Location Not Found',
      description: 'Location not found.',
      path: serviceSlug ? `/locations/${locationSlug}/${serviceSlug}` : `/locations/${locationSlug}`,
      noIndex: true
    });
  }

  const path = service ? `/locations/${location.slug}/${service.id}` : `/locations/${location.slug}`;
  return metadataFor({
    title: service ? `${service.title} in ${location.name} | Qognition Agency` : `Digital Marketing Agency ${location.name} | SEO, PPC & Web Design`,
    description: service
      ? `${service.shortDescription} Qognition provides ${service.title.toLowerCase()} for companies targeting ${location.name} and nearby revenue markets.`
      : `Qognition provides digital marketing, SEO, PPC, AI search, and web development for companies targeting ${location.name}.`,
    path
  });
};

export const getServiceIndustryMetadata = (serviceSlug: string, industrySlug: string): Metadata => {
  const service = SERVICES.find((item) => item.id === serviceSlug);
  const industry = INDUSTRIES.find((item) => item.id === industrySlug);
  if (!service || !industry) {
    return metadataFor({
      title: 'Page Not Found',
      description: 'Page not found.',
      path: `/services/${serviceSlug}/industries/${industrySlug}`,
      noIndex: true
    });
  }
  return metadataFor({
    title: `${service.title} for ${industry.name} | Qognition Agency`,
    description: `${service.shortDescription} Qognition adapts ${service.title.toLowerCase()} for ${industry.name}, including strategy, implementation, and reporting.`,
    path: `/services/${service.id}/industries/${industry.id}`
  });
};

export const getBlogMetadata = (slug: string): Metadata => {
  const post = BLOG_POSTS.find((item) => item.id === slug);
  if (!post) return metadataFor({ title: 'Post Not Found', description: 'Post not found.', path: `/blog/${slug}`, noIndex: true });
  return metadataFor({
    title: post.title,
    description: post.excerpt,
    path: `/blog/${post.id}`,
    image: post.image
  });
};

export const getDirectoryCategoryMetadata = (category?: string): Metadata =>
  metadataFor({
    title: category ? `${category.replace(/-/g, ' ')} Tools Directory` : 'Growth Stack Directory',
    description: `Browse useful software profiles for ${category || 'SEO, AI, marketing, development, design, and automation'} tools.`,
    path: category ? `/directory/${category}` : '/directory'
  });

export const getDirectoryProductMetadata = (category: string, toolId: string): Metadata => {
  const product = DIRECTORY_PRODUCTS.find((item) => item.categorySlug === category && item.slug === toolId);
  if (!product) {
    return metadataFor({
      title: 'Tool Not Found',
      description: 'Tool not found.',
      path: `/directory/${category}/${toolId}`,
      noIndex: true
    });
  }
  return metadataFor({
    title: `${product.name} Review`,
    description: product.shortDescription,
    path: `/directory/${category}/${product.slug}`,
    image: product.imageUrl
  });
};

export const industryForSlug = (slug: string): Industry | undefined => INDUSTRIES.find((item) => item.id === slug);
