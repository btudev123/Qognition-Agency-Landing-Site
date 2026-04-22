import React from 'react';
import { SchemaData } from '../types';

const SITE_URL = 'https://qognitionagency.com';
const SITE_NAME = 'Qognition Agency';

const JsonLd: React.FC<{ data: SchemaData }> = ({ data }) => {
  const schema = {
    "@context": "https://schema.org",
    "@type": data.type || "WebSite",
    "name": data.name || SITE_NAME,
    "url": SITE_URL + data.url,
    "description": data.description,
    "logo": `${SITE_URL}/logo.png`,
    "publisher": {
      "@type": "Organization",
      "name": SITE_NAME,
      "url": SITE_URL,
      "logo": {
        "@type": "ImageObject",
        "url": `${SITE_URL}/logo.png`
      }
    },
    "sameAs": [
      "https://www.linkedin.com/company/qognition-tech",
      "https://twitter.com/qognition_tech",
      "https://www.instagram.com/qognition_agency/",
      "https://www.facebook.com/qognitiontech",
      "https://www.youtube.com/@QognitionAgency"
    ],
    "contactPoint": {
      "@type": "ContactPoint",
      "email": "hello@qognition.agency",
      "contactType": "sales",
      "areaServed": ["GB", "US", "AE", "IN"],
      "availableLanguage": ["English"]
    }
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  );
};

export default JsonLd;