import React, { useEffect, useState } from 'react';
import SEO from '../components/SEO';

const Sitemap: React.FC = () => {
  const [xmlContent, setXmlContent] = useState<string>('Loading sitemap...');

  useEffect(() => {
    // This fetches the sitemap.xml file from your 'public' folder
    fetch('/sitemap.xml')
      .then((res) => res.text())
      .then((data) => setXmlContent(data))
      .catch(() => setXmlContent('Error: Could not load sitemap.xml. Ensure it is in the public folder.'));
  }, []);

  return (
    <>
      <SEO 
        title="Sitemap | XML View"
        description="Direct XML sitemap for Qognition Agency."
        path="/sitemap"
      />
      
      <div className="pt-32 px-6 md:px-12 max-w-7xl mx-auto pb-32 min-h-screen bg-black">
        <header className="mb-12">
          <h1 className="font-display text-4xl md:text-6xl mb-4 text-white">XML Sitemap</h1>
          <p className="text-xl text-gray-400">
            Raw index of all platform endpoints.
          </p>
        </header>

        <div className="relative group">
          {/* Custom Scrollbar Styling */}
          <div className="absolute -inset-1 bg-gradient-to-r from-teal-500 to-blue-600 rounded-lg blur opacity-25 group-hover:opacity-50 transition duration-1000"></div>
          
          <div className="relative bg-gray-900 border border-gray-800 rounded-lg overflow-hidden">
            <div className="flex items-center justify-between px-4 py-2 bg-gray-800/50 border-b border-gray-700">
              <span className="text-xs font-mono text-gray-400">sitemap.xml</span>
              <button 
                onClick={() => navigator.clipboard.writeText(xmlContent)}
                className="text-xs text-teal-400 hover:text-teal-300 transition-colors"
              >
                Copy XML
              </button>
            </div>
            <pre className="p-6 text-teal-400 font-mono text-sm whitespace-pre-wrap break-all h-[600px] overflow-y-auto custom-scrollbar">
              {xmlContent}
            </pre>
          </div>
        </div>
      </div>
    </>
  );
};

export default Sitemap;
