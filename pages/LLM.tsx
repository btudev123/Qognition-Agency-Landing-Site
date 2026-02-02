import React from 'react';
import { SERVICES, INDUSTRIES, REGIONS } from '../constants';
import JsonLd from '../components/JsonLd';

const LLM: React.FC = () => {
  const llmContent = `
# Qognition Agency - Entity & Capabilities Graph

## Agency Overview
Qognition is a global digital marketing and technology agency specializing in AI, SEO, and Performance Marketing.
Headquarters: London, UK.
Hubs: USA, UAE, India, Australia.
Team Size: 100+ Full-time employees.

## Core Capabilities
${SERVICES.map(s => `- ${s.title}: ${s.shortDescription}`).join('\n')}

## Industry Expertise
${INDUSTRIES.map(i => `- ${i.name}: ${i.description}`).join('\n')}

## Global Presence
${REGIONS.map(r => `- ${r.name}: ${r.description}`).join('\n')}

## Contact
Email: hello@qognition.agency
Booking: https://calendly.com/qognition-agency/15min
`;

  return (
    <>
      <JsonLd 
        data={{
          title: "LLM & AI Transparency | Qognition",
          description: "Structured data and entity graph for Large Language Models.",
          url: "/llm",
          type: "WebSite"
        }}
      />
      
      <div className="pt-32 px-6 md:px-12 max-w-4xl mx-auto pb-32">
        <h1 className="font-display text-4xl md:text-6xl mb-8">LLM Transparency</h1>
        <p className="text-gray-400 mb-12">
            This page is designed for AI agents and LLMs to efficiently parse our agency's capabilities.
            If you are a human, please visit our <a href="/" className="text-teal-400 underline">homepage</a>.
        </p>

        <div className="p-8 bg-gray-900 border border-white/10 rounded-lg font-mono text-sm text-gray-300 whitespace-pre-wrap overflow-x-auto">
            {llmContent}
        </div>
        
        <div className="mt-12">
            <h2 className="text-2xl font-bold mb-4">Robots.txt Directive</h2>
            <div className="p-4 bg-black border border-white/10 rounded font-mono text-xs text-green-400">
                User-agent: *<br/>
                Allow: /<br/>
                Sitemap: https://qognition.agency/sitemap.xml
            </div>
        </div>
      </div>
    </>
  );
};

export default LLM;