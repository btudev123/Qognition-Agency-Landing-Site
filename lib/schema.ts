import { SITE_URL } from './seo';
import { OFFICES, CONTACT_EMAIL, PHONE_NUMBER } from '../data/siteConfig';
import { offeredSubServices } from '../data/services';
import type { SpokeConfig } from './spokes';

const absoluteUrl = (path: string) => `${SITE_URL}${path}`;

/* ONE entity, referenced by @id everywhere (revised 2026-10-06, Nadia).
 *
 * The site emitted the organisation as "Qognition" in ~40 nodes and as
 * "Qognition Agency" in the insights family, with no @id, while /insights/*
 * already pointed at `${SITE_URL}/#organization`, which resolved to nothing.
 * "Qognition" alone is also ambiguous with the sibling Qognition Labs.
 * The legal-style name is "Qognition Agency"; "Qognition" stays as an
 * alternateName so nothing that matched it before stops matching.
 *
 * Standing decision (clients/qognition-agency/context.md): no
 * subOrganization / parentOrganization edge to Salt Accounting Group, ever.
 * Rollback: git checkout lib/schema.ts app/layout.tsx. */
export const ORG_ID = `${SITE_URL}/#organization`;
export const WEBSITE_ID = `${SITE_URL}/#website`;
export const ORG_NAME = 'Qognition Agency';

/** Minimal reference for provider / publisher fields. */
export const orgRef = () => ({ '@type': 'Organization', '@id': ORG_ID, name: ORG_NAME, url: SITE_URL });

/** OFFICES as schema.org Places: addressLocality and addressCountry only. */
export function officeLocations() {
  return OFFICES.map((office) => ({
    '@type': 'Place',
    name: `${ORG_NAME}, ${office.city}`,
    address: {
      '@type': 'PostalAddress',
      addressLocality: office.city,
      addressCountry: office.countryCode,
    },
  }));
}

export function organizationSchema() {
  return {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    '@id': ORG_ID,
    name: ORG_NAME,
    alternateName: ['Qognition'],
    url: SITE_URL,
    logo: `${SITE_URL}/icon-512.png`,
    description:
      'B2B AI search visibility agency. We get established B2B firms found when their buyers ask an AI which vendor to hire.',
    knowsAbout: [
      'AI Search Visibility',
      'Generative Engine Optimization',
      'AI SEO',
      'Answer Engine Optimization',
      'Local SEO',
      'Search Engine Optimization',
      'Entity Optimization',
      'Pay-Per-Click Advertising',
      'B2B Marketing',
    ],
    // Five offices and no headquarters (operator, 2026-10-08), so there is no
    // `address` property: on an Organization that reads as the main address.
    // Each office is a `location` Place carrying city and country only, never a
    // street address. Generated from OFFICES so schema and copy cannot drift.
    location: officeLocations(),
    sameAs: [
      'https://www.linkedin.com/company/qognition-tech',
      'https://x.com/qognition_tech',
      'https://www.instagram.com/qognition_agency/',
      'https://www.facebook.com/qognitiontech',
      'https://www.youtube.com/@QognitionAgency',
    ],
    contactPoint: {
      '@type': 'ContactPoint',
      email: CONTACT_EMAIL,
      telephone: `+${PHONE_NUMBER}`,
      contactType: 'sales',
      availableLanguage: 'English',
      url: `${SITE_URL}/contact`,
    },
  };
}

/* Google's site-name system reads WebSite.name and alternateName. The domain
 * is listed because "qognitionagency.com" is a real navigational query
 * (GSC, 3 months to 2026-10-03) and averaged position 34.2. */
export function websiteSchema() {
  return {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    '@id': WEBSITE_ID,
    name: ORG_NAME,
    alternateName: ['Qognition', 'qognitionagency.com'],
    url: SITE_URL,
    inLanguage: 'en',
    publisher: { '@id': ORG_ID },
  };
}

export function serviceSchema(spoke: SpokeConfig, path: string) {
  return {
    '@context': 'https://schema.org',
    '@type': 'Service',
    name: `Qognition ${spoke.label}`,
    provider: orgRef(),
    description: spoke.description,
    url: `${SITE_URL}${path}`,
    areaServed: 'Worldwide',
    serviceType: spoke.label,
  };
}

// Service schema for the 11 marketing service categories (data/services.ts).
export function serviceCategorySchema(service: {
  id: string;
  title: string;
  shortDescription: string;
  subServices: { name: string; slug?: string }[];
}) {
  return {
    '@context': 'https://schema.org',
    '@type': 'Service',
    name: service.title,
    serviceType: service.title,
    description: service.shortDescription,
    url: `${SITE_URL}/services/${service.id}`,
    provider: orgRef(),
    areaServed: 'Worldwide',
    hasOfferCatalog: {
      '@type': 'OfferCatalog',
      name: `${service.title} sub-services`,
      /* Not-offered rows stay routable but never enter the catalogue (data/services.ts). */
      itemListElement: offeredSubServices(service.id, service.subServices).map((sub) => ({
        '@type': 'Offer',
        itemOffered: { '@type': 'Service', name: sub.name },
      })),
    },
  };
}

export function localBusinessSchema(location: {
  name: string;
  slug: string;
  schemaType: string;
}) {
  return {
    '@context': 'https://schema.org',
    '@type': 'ProfessionalService',
    name: `Qognition Agency: B2B search marketing for ${location.name}`,
    url: `${SITE_URL}/locations/${location.slug}`,
    areaServed: { '@type': location.schemaType, name: location.name },
    provider: orgRef(),
    email: 'hello@qognitionagency.com',
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
    publisher: orgRef(),
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
    headline: `Qognition vs ${competitor.name}: an honest comparison`,
    url: `${SITE_URL}/comparisons/${competitor.slug}`,
    publisher: orgRef(),
  };
}
