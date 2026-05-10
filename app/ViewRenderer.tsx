'use client';

import dynamic from 'next/dynamic';
import React from 'react';
import { ParamProvider } from '../lib/routerCompat';

const views = {
  about: dynamic(() => import('../views/About')),
  blog: dynamic(() => import('../views/blog')),
  blogPost: dynamic(() => import('../views/blog/[slug]')),
  caseStudy: dynamic(() => import('../views/CaseStudyDetail')),
  contact: dynamic(() => import('../views/Contact')),
  directory: dynamic(() => import('../views/directory/DirectoryHome')),
  directoryTool: dynamic(() => import('../views/directory/DirectoryToolDetail')),
  home: dynamic(() => import('../views/Home')),
  industries: dynamic(() => import('../views/Industries')),
  industry: dynamic(() => import('../views/IndustryDetail')),
  llm: dynamic(() => import('../views/LLM')),
  notFound: dynamic(() => import('../views/NotFound')),
  region: dynamic(() => import('../views/RegionDetail')),
  regions: dynamic(() => import('../views/Regions')),
  service: dynamic(() => import('../views/ServiceDetail')),
  services: dynamic(() => import('../views/Services')),
  sitemap: dynamic(() => import('../views/Sitemap')),
  subIndustry: dynamic(() => import('../views/SubIndustryDetail')),
  work: dynamic(() => import('../views/Work'))
};

type ViewName = keyof typeof views;

const ViewRenderer: React.FC<{ view: ViewName; params?: Record<string, string | undefined> }> = ({ view, params }) => {
  const Component = views[view];
  return (
    <ParamProvider params={params}>
      <Component />
    </ParamProvider>
  );
};

export default ViewRenderer;
