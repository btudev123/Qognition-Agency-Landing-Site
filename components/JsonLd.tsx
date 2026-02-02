import React from 'react';
import { SchemaData } from '../types';

const JsonLd: React.FC<{ data: SchemaData }> = ({ data }) => {
  const schema = {
    "@context": "https://schema.org",
    "@type": data.type,
    "name": "Qognition Agency",
    "url": "https://qognition.agency" + data.url,
    "description": data.description,
    "logo": "https://qognition.agency/logo.png",
    "sameAs": [
        "https://www.linkedin.com/company/qognition",
        "https://twitter.com/qognition"
    ],
    "contactPoint": {
        "@type": "ContactPoint",
        "telephone": "+44-20-7123-4567",
        "contactType": "sales",
        "areaServed": ["GB", "US", "AE"],
        "availableLanguage": "English"
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