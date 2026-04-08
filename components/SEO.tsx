import React, { useEffect } from 'react';
import { SchemaData } from '../types';

const SITE_URL = 'https://www.qognitionagency.com';
const SITE_NAME = 'Qognition Agency';

interface SEOProps {
  title: string;
  description: string;
  path: string;
  schemaData?: SchemaData;
  image?: string;
}

const SEO: React.FC<SEOProps> = ({ title, description, path, schemaData, image }) => {
    // 2. IMPROVED LOGIC: 
  // If path is "/" or empty, use just the SITE_URL.
  // Otherwise, ensure we don't have double slashes if the path starts with one.
  const cleanPath = path === '/' || !path ? '' : path.startsWith('/') ? path : `/${path}`;
  const canonicalUrl = `${SITE_URL}${cleanPath}`;
  const fullTitle = title.includes('Qognition') ? title : `${title} | ${SITE_NAME}`;
  const ogImage = image || `${SITE_URL}/og-image.png`;

  useEffect(() => {
    document.title = fullTitle;

    let metaDesc = document.querySelector("meta[name='description']");
    if (!metaDesc) {
      metaDesc = document.createElement("meta");
      metaDesc.setAttribute("name", "description");
      document.head.appendChild(metaDesc);
    }
    metaDesc.setAttribute("content", description);

    let linkCanon = document.querySelector("link[rel='canonical']");
    if (!linkCanon) {
      linkCanon = document.createElement("link");
      linkCanon.setAttribute("rel", "canonical");
      document.head.appendChild(linkCanon);
    }
    linkCanon.setAttribute("href", canonicalUrl);

    let ogUrl = document.querySelector("meta[property='og:url']");
    if (!ogUrl) {
      ogUrl = document.createElement("meta");
      ogUrl.setAttribute("property", "og:url");
      document.head.appendChild(ogUrl);
    }
    ogUrl.setAttribute("content", canonicalUrl);

    let ogTitle = document.querySelector("meta[property='og:title']");
    if (!ogTitle) {
      ogTitle = document.createElement("meta");
      ogTitle.setAttribute("property", "og:title");
      document.head.appendChild(ogTitle);
    }
    ogTitle.setAttribute("content", fullTitle);

    let ogDesc = document.querySelector("meta[property='og:description']");
    if (!ogDesc) {
      ogDesc = document.createElement("meta");
      ogDesc.setAttribute("property", "og:description");
      document.head.appendChild(ogDesc);
    }
    ogDesc.setAttribute("content", description);

    let ogImage = document.querySelector("meta[property='og:image']");
    if (!ogImage) {
      ogImage = document.createElement("meta");
      ogImage.setAttribute("property", "og:image");
      document.head.appendChild(ogImage);
    }
    ogImage.setAttribute("content", image || `${SITE_URL}/og-image.png`);

    let ogSiteName = document.querySelector("meta[property='og:site_name']");
    if (!ogSiteName) {
      ogSiteName = document.createElement("meta");
      ogSiteName.setAttribute("property", "og:site_name");
      document.head.appendChild(ogSiteName);
    }
    ogSiteName.setAttribute("content", SITE_NAME);

  }, [fullTitle, description, canonicalUrl, image]);

  return (
    <>
      {schemaData && (
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ 
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": schemaData.type || "WebSite",
              "name": schemaData.name || SITE_NAME,
              "description": description,
              "url": canonicalUrl,
              "publisher": {
                "@type": "Organization",
                "name": SITE_NAME,
                "logo": {
                  "@type": "ImageObject",
                  "url": `${SITE_URL}/logo.png`
                }
              },
              "sameAs": [
                "https://www.linkedin.com/company/qognition-tech",
                "https://twitter.com/qognition_tech",
                "https://www.instagram.com/qognition_agency/",
                "https://www.facebook.com/qognitiontech"
              ],
              ...schemaData
            }) 
          }}
        />
      )}
    </>
  );
};

export default SEO;
