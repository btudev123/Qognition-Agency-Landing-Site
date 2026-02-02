
import React, { useEffect } from 'react';
import { HashRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import Layout from './components/Layout';
import Home from './pages/Home';
import Services from './pages/Services';
import ServiceDetail from './pages/ServiceDetail';
import Industries from './pages/Industries';
import IndustryDetail from './pages/IndustryDetail';
import Work from './pages/Work';
import CaseStudyDetail from './pages/CaseStudyDetail';
import Contact from './pages/Contact';
import Regions from './pages/Regions';
import RegionDetail from './pages/RegionDetail';
import About from './pages/About';
import LLM from './pages/LLM';
import Sitemap from './pages/Sitemap';
import DirectoryHome from './pages/directory/DirectoryHome';
import DirectoryToolDetail from './pages/directory/DirectoryToolDetail';

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
      </Layout>
    </Router>
  );
};

export default App;
