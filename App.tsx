
import React, { useEffect, Suspense, lazy } from 'react';
import { HashRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import Layout from './components/Layout';

// Lazy load pages for performance optimization (Code Splitting)
const Home = lazy(() => import('./pages/Home'));
const Services = lazy(() => import('./pages/Services'));
const ServiceDetail = lazy(() => import('./pages/ServiceDetail'));
const Industries = lazy(() => import('./pages/Industries'));
const IndustryDetail = lazy(() => import('./pages/IndustryDetail'));
const Work = lazy(() => import('./pages/Work'));
const CaseStudyDetail = lazy(() => import('./pages/CaseStudyDetail'));
const Contact = lazy(() => import('./pages/Contact'));
const Regions = lazy(() => import('./pages/Regions'));
const RegionDetail = lazy(() => import('./pages/RegionDetail'));
const About = lazy(() => import('./pages/About'));
const LLM = lazy(() => import('./pages/LLM'));
const Sitemap = lazy(() => import('./pages/Sitemap'));
const DirectoryHome = lazy(() => import('./pages/directory/DirectoryHome'));
const DirectoryToolDetail = lazy(() => import('./pages/directory/DirectoryToolDetail'));

// Loading Fallback
const PageLoader = () => (
  <div className="min-h-screen flex items-center justify-center bg-black">
    <div className="w-8 h-8 border-2 border-teal-400 border-t-transparent rounded-full animate-spin"></div>
  </div>
);

// Scroll to top component
const ScrollToTop = () => {
  const { pathname } = useLocation();
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);
  return null;
};

const App: React.FC = () => {
  return (
    <Router>
      <ScrollToTop />
      <Layout>
        <Suspense fallback={<PageLoader />}>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/services" element={<Services />} />
            <Route path="/services/:id" element={<ServiceDetail />} />
            <Route path="/industries" element={<Industries />} />
            <Route path="/industries/:id" element={<IndustryDetail />} />
            <Route path="/regions" element={<Regions />} />
            <Route path="/regions/:slug" element={<RegionDetail />} />
            <Route path="/work" element={<Work />} />
            <Route path="/work/:id" element={<CaseStudyDetail />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/about" element={<About />} />
            <Route path="/llm" element={<LLM />} />
            <Route path="/sitemap" element={<Sitemap />} />
            
            {/* Directory Routes - SEO Optimized Structure */}
            <Route path="/directory" element={<DirectoryHome />} />
            <Route path="/directory/:category" element={<DirectoryHome />} />
            <Route path="/directory/:category/:toolId" element={<DirectoryToolDetail />} />
          </Routes>
        </Suspense>
      </Layout>
    </Router>
  );
};

export default App;
