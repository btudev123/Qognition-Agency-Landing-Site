import React, { useEffect, useInsertionEffect } from 'react';
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

// Builds the canonical URL dynamically from the real browser URL,
// always enforcing www — works for every page without any hardcoding.
const getDynamicCanonicalUrl = (fallbackPath: string): string => {
  if (typeof window !== 'undefined') {
    // Read the actual live URL from the browser
    const protocol = window.location.protocol;        // "https:"
    let hostname   = window.location.hostname;        // "qognitionagency.com" or "www.qognitionagency.com"
    const path     = window.location.pathname;        // "/about", "/services/seo", etc.
    const search   = window.location.search;          // "?ref=google" or ""

    // Always enforce www — even if the visitor landed on the non-www version
    if (!hostname.startsWith('www.')) {
      hostname = `www.${hostname}`;
    }

    return `${protocol}//${hostname}${path}${search}`;
  }

  // SSR / build-time fallback: use the prop passed in
  const cleanPath =
    fallbackPath === '/' || !fallbackPath
      ? ''
      : fallbackPath.startsWith('/')
      ? fallbackPath
      : `/${fallbackPath}`;
  return `${SITE_URL}${cleanPath}`;
};

const SEO: React.FC<SEOProps> = ({ title, description, path, schemaData, image }) => {
  const canonicalUrl = getDynamicCanonicalUrl(path);
  const fullTitle = title.includes('Qognition') ? title : `${title} | ${SITE_NAME}`;

  // useInsertionEffect runs BEFORE first paint — critical for Google SEO
  useInsertionEffect(() => {
    let linkCanon = document.querySelector("link[rel='canonical']");
    if (!linkCanon) {
      linkCanon = document.createElement("link");
      linkCanon.setAttribute("rel", "canonical");
      document.head.appendChild(linkCanon);
    }
    linkCanon.setAttribute("href", canonicalUrl);

    let metaDesc = document.querySelector("meta[name='description']");
    if (!metaDesc) {
      metaDesc = document.createElement("meta");
      metaDesc.setAttribute("name", "description");
      document.head.appendChild(metaDesc);
    }
    metaDesc.setAttribute("content", description);

    document.title = fullTitle;
  }, [canonicalUrl, description, fullTitle]);

  // useEffect for secondary OG tags (after React hydrates)
  useEffect(() => {
    document.title = fullTitle;

    const setMeta = (attr: string, value: string, content: string) => {
      let el = document.querySelector(`meta[${attr}='${value}']`);
      if (!el) {
        el = document.createElement("meta");
        el.setAttribute(attr, value);
        document.head.appendChild(el);
      }
      el.setAttribute("content", content);
    };

    setMeta("property", "og:url",         canonicalUrl);
    setMeta("property", "og:title",        fullTitle);
    setMeta("property", "og:description",  description);
    setMeta("property", "og:image",        image || `${SITE_URL}/og-image.png`);
    setMeta("property", "og:site_name",    SITE_NAME);
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