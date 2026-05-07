'use client';

import React from 'react';
import About from '../views/About';
import CaseStudyDetail from '../views/CaseStudyDetail';
import Contact from '../views/Contact';
import Home from '../views/Home';
import Industries from '../views/Industries';
import IndustryDetail from '../views/IndustryDetail';
import LLM from '../views/LLM';
import NotFound from '../views/NotFound';
import RegionDetail from '../views/RegionDetail';
import Regions from '../views/Regions';
import ServiceDetail from '../views/ServiceDetail';
import Services from '../views/Services';
import Sitemap from '../views/Sitemap';
import SubIndustryDetail from '../views/SubIndustryDetail';
import Work from '../views/Work';
import BlogPage from '../views/blog';
import BlogPostPage from '../views/blog/[slug]';
import DirectoryHome from '../views/directory/DirectoryHome';
import DirectoryToolDetail from '../views/directory/DirectoryToolDetail';
import { ParamProvider } from '../lib/routerCompat';

const views = {
  about: About,
  blog: BlogPage,
  blogPost: BlogPostPage,
  caseStudy: CaseStudyDetail,
  contact: Contact,
  directory: DirectoryHome,
  directoryTool: DirectoryToolDetail,
  home: Home,
  industries: Industries,
  industry: IndustryDetail,
  llm: LLM,
  notFound: NotFound,
  region: RegionDetail,
  regions: Regions,
  service: ServiceDetail,
  services: Services,
  sitemap: Sitemap,
  subIndustry: SubIndustryDetail,
  work: Work
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
