import React, { useEffect } from 'react';
import { SchemaData } from '../types';

interface SEOProps {
  title: string;
  description: string;
  path: string; // e.g., "/services"
  schemaData?: SchemaData;
  image?: string;
}

const SEO: React.FC<SEOProps> = ({ title, description, path, schemaData, image }) => {
  useEffect(() => {
    // 1. Update Title
    document.title = title;

    // 2. Update Meta Description
    let metaDesc = document.querySelector("meta[name='description']");
    if (!metaDesc) {
      metaDesc = document.createElement("meta");
      metaDesc.setAttribute("name", "description");
      document.head.appendChild(metaDesc);
    }
    metaDesc.setAttribute("content", description);

    // 3. Update Canonical URL
    const canonicalUrl = `https://qognitionagency.com${path === '/' ? '' : path}`;
    let linkCanon = document.querySelector("link[rel='canonical']");
    if (!linkCanon) {
      linkCanon = document.createElement("link");
      linkCanon.setAttribute("rel", "canonical");
      document.head.appendChild(linkCanon);
    }
    linkCanon.setAttribute("href", canonicalUrl);

    // 4. Update Open Graph URL
    let ogUrl = document.querySelector("meta[property='og:url']");
    if (!ogUrl) {
      ogUrl = document.createElement("meta");
      ogUrl.setAttribute("property", "og:url");
      document.head.appendChild(ogUrl);
    }
    ogUrl.setAttribute("content", canonicalUrl);

    // 5. Update Open Graph Image
    if (image) {
      let ogImage = document.querySelector("meta[property='og:image']");
      if (!ogImage) {
        ogImage = document.createElement("meta");
        ogImage.setAttribute("property", "og:image");
        document.head.appendChild(ogImage);
      }
      ogImage.setAttribute("content", image);
    }

  }, [title, description, path, image]);

  return (
    <>
      {schemaData && (
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ 
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": schemaData.type || "WebSite",
              "name": title,
              "description": description,
              "url": `https://qognitionagency.com${path}`,
              ...schemaData
            }) 
          }}
        />
      )}
    </>
  );
};

export default SEO;
