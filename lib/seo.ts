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
  const cleanTitle = title.replace(/\s*\|\s*Qognition Agency$/i, '');

  return {
    title: cleanTitle,
    description,
    alternates: {
      canonical: path
    },
    openGraph: {
      type: 'website',
      siteName: SITE_NAME,
      url: absoluteUrl(path),
      title: cleanTitle.includes(SITE_NAME) ? cleanTitle : `${cleanTitle} | ${SITE_NAME}`,
      description,
      images: [image]
    },
    twitter: {
      card: 'summary_large_image',
      title: cleanTitle.includes(SITE_NAME) ? cleanTitle : `${cleanTitle} | ${SITE_NAME}`,
      description,
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
      title: 'Qognition | AI Growth Marketing Partner',
      description:
        "Scale qualified leads with Qognition's AI growth marketing across SEO, AI search visibility, PPC, SMM, web design, branding, and creative."
    },
    '/services': {
      title: 'AI Growth Marketing Services | SEO, PPC, AI SEO & Web Design',
      description:
        'SEO, SMM, AI SEO, web design, PPC, branding, and creative services for qualified leads and measurable revenue.'
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
    '/work': {
      title: 'Our Work | Case Studies & Success Stories',
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
  if (!study) return metadataFor({ title: 'Case Study Not Found', description: 'Case study not found.', path: `/work/${id}`, noIndex: true });
  return metadataFor({
    title: `${study.title} | Case Study`,
    description: `${study.title} for ${study.client}. See how Qognition delivered measurable digital growth.`,
    path: `/work/${study.id}`,
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
