import { SITE_URL } from './seo';
import type { SpokeConfig } from './spokes';

const absoluteUrl = (path: string) => `${SITE_URL}${path}`;

export function organizationSchema() {
  return {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    name: 'Qognition',
    url: SITE_URL,
    logo: `${SITE_URL}/favicon.png`,
    description:
      'The operating partner for founders. We run marketing, tech, finance, and automation so founders can build.',
    serviceType: [
      'AI-Native Growth Marketing',
      'Revenue-Focused Engineering',
      'Financial Operations',
      'AI Agents & Intelligent Automation',
    ],
    sameAs: [
      'https://www.linkedin.com/company/qognition-tech',
      'https://twitter.com/qognition_tech',
      'https://www.instagram.com/qognition_agency/',
      'https://www.facebook.com/qognitiontech',
      'https://www.youtube.com/@QognitionAgency',
    ],
    contactPoint: {
      '@type': 'ContactPoint',
      email: 'hello@qognitionagency.com',
      contactType: 'sales',
    },
  };
}

export function websiteSchema() {
  return {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    name: 'Qognition',
    url: SITE_URL,
    potentialAction: {
      '@type': 'SearchAction',
      target: `${SITE_URL}/resources?q={search_term_string}`,
      'query-input': 'required name=search_term_string',
    },
  };
}

export function serviceSchema(spoke: SpokeConfig, path: string) {
  return {
    '@context': 'https://schema.org',
    '@type': 'Service',
    name: `Qognition ${spoke.label}`,
    provider: {
      '@type': 'Organization',
      name: 'Qognition',
      url: SITE_URL,
    },
    description: spoke.description,
    url: `${SITE_URL}${path}`,
    areaServed: 'Worldwide',
    serviceType: spoke.label,
    offers: {
      '@type': 'Offer',
      priceSpecification: {
        '@type': 'PriceSpecification',
        price: spoke.pricingModel,
      },
    },
  };
}

export function faqPageSchema(faqs: { question: string; answer: string }[]) {
  return {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: faqs.slice(0, 8).map((faq) => ({
      '@type': 'Question',
      name: faq.question,
      acceptedAnswer: {
        '@type': 'Answer',
        text: faq.answer,
      },
    })),
  };
}

// Alias for backward compatibility
export const faqSchema = faqPageSchema;

export function breadcrumbSchema(items: { name: string; path: string }[]) {
  return {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: items.map((item, i) => ({
      '@type': 'ListItem',
      position: i + 1,
      name: item.name,
      item: absoluteUrl(item.path),
    })),
  };
}

export function articleSchema(post: {
  title: string;
  description: string;
  slug: string;
  date: string;
  modifiedDate?: string;
  authorName: string;
  authorUrl?: string;
  imageUrl?: string;
}) {
  return {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: post.title,
    description: post.description,
    url: `${SITE_URL}/blog/${post.slug}`,
    datePublished: post.date,
    dateModified: post.modifiedDate || post.date,
    author: {
      '@type': 'Person',
      name: post.authorName,
      url: post.authorUrl,
    },
    image: post.imageUrl,
    publisher: {
      '@type': 'Organization',
      name: 'Qognition',
      url: SITE_URL,
    },
  };
}

export function reviewSchema(caseStudy: {
  client: string;
  title: string;
  slug: string;
  stats: { label: string; value: string }[];
  testimonial?: { quote: string; author: string; role: string };
}) {
  return {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: caseStudy.title,
    url: `${SITE_URL}/case-studies/${caseStudy.slug}`,
    about: {
      '@type': 'Thing',
      name: caseStudy.client,
    },
    publisher: {
      '@type': 'Organization',
      name: 'Qognition',
      url: SITE_URL,
    },
    ...(caseStudy.testimonial && {
      review: {
        '@type': 'Review',
        reviewBody: caseStudy.testimonial.quote,
        author: {
          '@type': 'Person',
          name: caseStudy.testimonial.author,
          jobTitle: caseStudy.testimonial.role,
        },
      },
    }),
  };
}

export function softwareAppSchema(tool: {
  name: string;
  description: string;
  slug: string;
}) {
  return {
    '@context': 'https://schema.org',
    '@type': 'SoftwareApplication',
    name: tool.name,
    description: tool.description,
    url: `${SITE_URL}/free-tools/${tool.slug}`,
    applicationCategory: 'BusinessApplication',
    offers: {
      '@type': 'Offer',
      price: '0',
      priceCurrency: 'USD',
    },
  };
}

export function comparisonSchema(competitor: {
  name: string;
  slug: string;
}) {
  return {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: `Qognition vs ${competitor.name} — Honest Comparison for Founders`,
    url: `${SITE_URL}/comparisons/${competitor.slug}`,
    publisher: {
      '@type': 'Organization',
      name: 'Qognition',
      url: SITE_URL,
    },
  };
}
