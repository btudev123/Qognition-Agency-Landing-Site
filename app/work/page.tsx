import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Our Work | Qognition Agency',
  description: 'Explore our case studies and success stories. See how we\'ve helped clients achieve their digital marketing goals.',
  alternates: {
    canonical: 'https://qognitionagency.com/work'
  }
};

export default function WorkPage() {
  return (
    <main className="min-h-screen bg-black text-white pt-32 pb-24 px-6 md:px-12">
      <div className="max-w-8xl mx-auto">
        <h1 className="text-5xl md:text-7xl font-display font-medium mb-6">Our Work</h1>
        <p className="text-xl text-gray-300 max-w-2xl mb-16">
          Case studies showcasing how we&apos;ve helped brands dominate their categories.
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {[
            { client: 'Noon Group', sector: 'E-commerce', result: '340% organic traffic increase' },
            { client: 'Accent Group', sector: 'Retail', result: '180% conversion boost' },
            { client: 'FinTech Scale', sector: 'Fintech', result: '$50M revenue generated' },
            { client: 'Meesho', sector: 'E-commerce', result: '12x ROAS on ads' }
          ].map((caseStudy, i) => (
            <div key={i} className="group border border-white/10 rounded-lg overflow-hidden hover:border-teal-400/30 transition-colors">
              <div className="aspect-video bg-gray-800 flex items-center justify-center">
                <span className="text-4xl font-display text-gray-600">{caseStudy.client}</span>
              </div>
              <div className="p-8">
                <p className="text-sm text-teal-400 mb-2">{caseStudy.sector}</p>
                <h2 className="text-2xl font-semibold mb-4">{caseStudy.client}</h2>
                <p className="text-gray-300">{caseStudy.result}</p>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-20 text-center">
          <h2 className="text-3xl font-display font-medium mb-6">Ready to write your success story?</h2>
          <a 
            href="/contact" 
            className="inline-block px-8 py-4 bg-teal-400 text-black font-display font-medium text-sm uppercase tracking-wider rounded-lg hover:bg-white transition-colors"
          >
            Start a Project
          </a>
        </div>
      </div>
    </main>
  );
}