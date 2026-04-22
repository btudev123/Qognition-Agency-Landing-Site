import { Metadata } from 'next';
import Link from 'next/link';

export const metadata: Metadata = {
  title: 'Digital Marketing Services | Qognition Agency',
  description: 'Expert digital marketing services including SEO, PPC, social media marketing, web development, and AI integration. Drive growth with data-driven strategies.',
  alternates: {
    canonical: 'https://qognitionagency.com/services'
  }
};

export default function ServicesPage() {
  const services = [
    {
      slug: 'seo-services',
      title: 'SEO Services',
      description: 'Technical SEO, on-page optimization, and content strategy to boost your search rankings and drive organic traffic.',
      features: ['Technical SEO Audit', 'On-Page Optimization', 'Content Strategy', 'Link Building', 'Local SEO', 'E-commerce SEO']
    },
    {
      slug: 'ppc-advertising',
      title: 'PPC Advertising',
      description: 'Results-driven paid advertising campaigns that maximize your ROI with precise targeting.',
      features: ['Google Ads', 'Meta Ads', 'LinkedIn Ads', 'Campaign Optimization', 'A/B Testing', 'Retargeting']
    },
    {
      slug: 'social-media-marketing',
      title: 'Social Media Marketing',
      description: 'Engaging social media strategies that build community and drive conversions.',
      features: ['Content Creation', 'Community Management', 'Influencer Partnerships', 'Social Analytics', 'Platform Strategy', 'Paid Social']
    },
    {
      slug: 'web-development',
      title: 'Web Development',
      description: 'Modern websites and web applications built with cutting-edge technology.',
      features: ['Custom Websites', 'E-commerce', 'Web Apps', 'Performance Optimization', 'CMS Development', 'API Integration']
    },
    {
      slug: 'ai-integration',
      title: 'AI Integration',
      description: 'Leverage AI to automate processes and enhance customer experiences.',
      features: ['Chatbots', 'Automation', 'Predictive Analytics', 'Personalization', 'Machine Learning', 'Voice AI']
    },
    {
      slug: 'content-marketing',
      title: 'Content Marketing',
      description: 'Strategic content that engages audiences and drives growth.',
      features: ['Content Strategy', 'Blog Writing', 'Video Production', 'Infographics', 'Case Studies', 'White Papers']
    }
  ];

  return (
    <main className="min-h-screen bg-black text-white pt-32 pb-24 px-6 md:px-12">
      <div className="max-w-8xl mx-auto">
        <h1 className="text-5xl md:text-7xl font-display font-medium mb-6">Our Services</h1>
        <p className="text-xl text-gray-300 max-w-2xl mb-16">
          Comprehensive digital marketing solutions designed to accelerate your growth.
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {services.map((service) => (
            <div key={service.slug} className="p-8 border border-white/10 rounded-lg hover:border-teal-400/30 transition-colors">
              <h2 className="text-2xl font-semibold mb-4">{service.title}</h2>
              <p className="text-gray-400 mb-6">{service.description}</p>
              <ul className="space-y-2 mb-6">
                {service.features.map((feature, i) => (
                  <li key={i} className="text-sm text-gray-300 flex items-center gap-2">
                    <span className="w-1.5 h-1.5 rounded-full bg-teal-400"></span>
                    {feature}
                  </li>
                ))}
              </ul>
              <Link href={`/services/${service.slug}`} className="text-teal-400 hover:underline">
                Learn More ���
              </Link>
            </div>
          ))}
        </div>

        <div className="mt-20 p-12 bg-gradient-to-r from-teal-900/20 to-black rounded-2xl text-center">
          <h2 className="text-3xl font-display font-medium mb-4">Ready to get started?</h2>
          <p className="text-lg text-gray-300 mb-8">Let&apos;s discuss your digital marketing strategy.</p>
          <Link href="/contact" className="inline-block px-8 py-4 bg-teal-400 text-black font-display font-medium text-sm uppercase tracking-wider rounded-lg hover:bg-white transition-colors">
            Get in Touch
          </Link>
        </div>
      </div>
    </main>
  );
}