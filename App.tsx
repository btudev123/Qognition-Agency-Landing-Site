import React, { useEffect, Suspense, lazy } from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import Layout from './components/Layout';

// Lazy load pages
const Home = lazy(() => import('./pages/Home'));
const Services = lazy(() => import('./pages/Services'));
const ServiceDetail = lazy(() => import('./pages/ServiceDetail'));
const Industries = lazy(() => import('./pages/Industries'));
const IndustryDetail = lazy(() => import('./pages/IndustryDetail'));
const SubIndustryDetail = lazy(() => import('./pages/SubIndustryDetail'));
const Work = lazy(() => import('./pages/Work'));
const CaseStudyDetail = lazy(() => import('./pages/CaseStudyDetail'));
const Contact = lazy(() => import('./pages/Contact'));
const Regions = lazy(() => import('./pages/Regions'));
const RegionDetail = lazy(() => import('./pages/RegionDetail'));
const About = lazy(() => import('./pages/About'));
const LLM = lazy(() => import('./pages/LLM'));
const Sitemap = lazy(() => import('./pages/Sitemap')); // The component that shows the XML
const DirectoryHome = lazy(() => import('./pages/directory/DirectoryHome'));
const DirectoryToolDetail = lazy(() => import('./pages/directory/DirectoryToolDetail'));
const NotFound = lazy(() => import('./pages/NotFound'));

const PageLoader = () => (
  <div className="min-h-screen flex items-center justify-center bg-black z-50">
    <div className="w-8 h-8 border-2 border-teal-400 border-t-transparent rounded-full animate-spin"></div>
  </div>
);

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
            <Route path="/industries/:id/:subId" element={<SubIndustryDetail />} />
            <Route path="/regions" element={<Regions />} />
            <Route path="/regions/:slug" element={<RegionDetail />} />
            <Route path="/work" element={<Work />} />
            <Route path="/work/:id" element={<CaseStudyDetail />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/about" element={<About />} />
            <Route path="/llm" element={<LLM />} />
            
            {/* The route for your direct sitemap display */}
            <Route path="/sitemap" element={<Sitemap />} />
            
            <Route path="/directory" element={<DirectoryHome />} />
            <Route path="/directory/:category" element={<DirectoryHome />} />
            <Route path="/directory/:category/:toolId" element={<DirectoryToolDetail />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </Suspense>
      </Layout>
    </Router>
  );
};

export default App;
