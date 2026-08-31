import type { Metadata } from 'next';
import { BLOG_POSTS } from '../data/blog';
import { DIRECTORY_PRODUCTS } from '../data/directoryProducts';
import { INDUSTRIES } from '../data/industries';
import { getLocationBySlug } from '../data/locations';
import { REGIONS } from '../data/regions';
import { SERVICES } from '../data/services';
import { CASE_STUDIES } from '../data/work';
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
  '/': {
    title: 'AI Marketing Agency | SEO, GEO and AI Search | Qognition',
    description:
      'Qognition is an AI marketing agency helping brands rank on Google and get cited by ChatGPT, Gemini & Perplexity. SEO, GEO, PPC & content. Book a free call.'
  },
  '/services': {
    title: 'Digital Marketing Services: SEO, PPC, GEO & Content | Qognition',
    description:
      "Explore Qognition's 11 growth services, including SEO, GEO/AEO, PPC, branding and web development, run as one system to grow revenue. Get a free audit."
  },
  '/services/seo': {
    title: 'SEO Services for Enterprise Growth | Qognition Agency',
    description:
      'Technical, content and off-page SEO built for enterprise scale. Qognition has driven up to +200% organic traffic. Get your free SEO audit today.'
  },
  '/services/ai-seo': {
    title: 'GEO & AEO Services: Get Cited by ChatGPT & AI Overviews | Qognition',
    description:
      "Qognition's Generative Engine Optimization (GEO) gets your brand cited in ChatGPT, Gemini, Perplexity and Google AI Overviews. See how it works."
  },
  '/services/ppc': {
    title: 'PPC & Paid Media Management Services | Qognition Agency',
    description:
      "Performance advertising across Google, Shopping, Microsoft and CTV. Qognition's paid media programs cut CPA by up to 25%. Book a free strategy call."
  },
  '/services/web-development': {
    title: 'Web Design & Development Agency | Qognition',
    description:
      "High-performance websites built to convert, using Next.js, Webflow, WordPress and Shopify, with 100 PageSpeed scores. See Qognition's web development work."
  },
  '/services/content': {
    title: 'Content Marketing Services That Drive Organic Growth | Qognition',
    description:
      "Strategy, writing and content assets that build authority and rankings. Qognition's content marketing has delivered up to +180% organic reach."
  },
  '/services/branding-creative': {
    title: 'Branding & Creative Agency | Identity & Design | Qognition',
    description:
      "Brand naming, logo design, visual identity and messaging from Qognition's creative team. Build a brand that looks as sharp as it performs. Book a call."
  },
  '/services/cro-analytics': {
    title: 'CRO & Analytics Agency | Conversion Rate Optimization | Qognition',
    description:
      "A/B testing, landing page optimization and attribution that turn traffic into revenue. Qognition's CRO programs lift conversions by up to 35%."
  },
  '/industries': {
    title: 'Industries We Serve: Law, Finance, SaaS & More | Qognition',
    description:
      'Qognition delivers industry-specific SEO, GEO and growth marketing for law, finance, consulting, real estate and manufacturing. Explore our sectors.'
  },
  '/case-studies': {
    title: 'Case Studies: Real Growth Results | Qognition Agency',
    description:
      'See how Qognition helped clients like NovaPay and Opal Consulting grow traffic, leads and revenue, with real numbers behind every case study.'
  },
  '/free-seo-audit': {
    title: 'Free SEO Audit | Get Your Custom Report | Qognition',
    description:
      'Get a free, no-obligation SEO audit from Qognition. Uncover technical issues, content gaps and quick wins, delivered within 48 hours. Claim yours now.'
  },
  '/locations/new-york': {
    title: 'Digital Marketing Agency New York | SEO, PPC, GEO | Qognition',
    description:
      'Qognition is a New York digital marketing agency offering SEO, GEO/AEO, PPC and web design for ambitious NYC brands. Book a free strategy call.'
  },
  '/locations/london': {
    title: 'Digital Marketing Agency London | SEO & AI Search | Qognition',
    description:
      'Qognition helps London businesses grow with SEO, GEO/AEO, PPC and content marketing built around local buyer demand. Get a free audit today.'
  },
  '/locations/dubai': {
    title: 'Digital Marketing Agency Dubai | SEO, GEO & PPC | Qognition',
    description:
      'Qognition delivers SEO, AI search optimization and performance marketing for Dubai brands targeting MENA growth. Book a free strategy call now.'
  },
  '/locations/perth': {
    title: 'Digital Marketing Agency in Perth | SEO, PPC & GEO | Qognition',
    description:
      'Grow your Perth business with SEO, paid media, content & AI search optimisation. Qognition is a results-driven digital marketing agency in Perth.'
  },
  '/locations/perth/seo': {
    title: 'Perth SEO agency | Expert Enterprise & Local SEO Services in Perth',
    description:
      "Partner with Perth's best SEO agency. Qognition delivers specialised and ROI-focused SEO strategies built to grow your rankings, traffic, and revenue."
  },
  '/locations/perth/ai-seo': {
    title: 'Qognition: Perth AI SEO & GEO Agency',
    description:
      'Get found on ChatGPT, Gemini, Perplexity & Google AI Overviews. Qognition delivers AI SEO, generative engine optimisation & AI visibility for Perth businesses. Book a free audit.'
  }
};

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
      index: !noIndex,
      follow: !noIndex
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
      },
      aggregateRating: {
        '@type': 'AggregateRating',
        ratingValue: product.rating,
        ratingCount: product.votesCount || 25
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
        reviewBody: product.agencyVerdict,
        reviewRating: {
          '@type': 'Rating',
          ratingValue: product.rating,
          bestRating: 5
        }
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
      title: 'Global Offices | Digital Marketing Agency Near You',
      description:
        'Qognition delivers local digital marketing strategy across the US, UK, UAE, India, Australia, Europe, GCC, and global revenue markets.'
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

export const getCaseStudyMetadata = (id: string): Metadata => {
  const study = CASE_STUDIES.find((item) => item.id === id);
  if (!study) return metadataFor({ title: 'Case Study Not Found', description: 'Case study not found.', path: `/case-studies/${id}`, noIndex: true });
  return metadataFor({
    title: `${study.title} | Case Study`,
    description: `${study.title} for ${study.client}. See how Qognition delivered measurable digital growth.`,
    path: `/case-studies/${study.id}`,
    image: study.image
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
