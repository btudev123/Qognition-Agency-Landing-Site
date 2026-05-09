import Link from 'next/link';
import SchemaScript from '../SchemaScript';
import { PRICING_PACKAGES } from '../../data/seoExpansion';
import { breadcrumbSchema, faqSchema, metadataFor } from '../../lib/seo';
import { CALENDLY_LINK } from '../../constants';

export const dynamic = 'force-static';

const faqs = [
  {
    question: 'How much does digital marketing cost?',
    answer:
      'Most serious SEO, PPC, content, and conversion programs start at a few thousand dollars per month and scale based on markets, speed, content depth, ad spend, and technical complexity.'
  },
  {
    question: 'Do you offer one-time audits?',
    answer:
      'Yes. Qognition can run technical SEO, paid media, website, and AI search audits before a longer engagement.'
  },
  {
    question: 'Do plans include ad spend?',
    answer:
      'No. Management fees and media spend are separate so reporting stays transparent.'
  }
];

export const metadata = metadataFor({
  title: 'Digital Marketing Pricing Guide | Qognition Agency',
  description: 'Learn how much SEO, PPC, web development, AI search visibility, and digital marketing services cost.',
  path: '/pricing'
});

export default function Page() {
  return (
    <>
      <SchemaScript data={faqSchema(faqs)} />
      <SchemaScript data={breadcrumbSchema([{ name: 'Home', path: '/' }, { name: 'Pricing', path: '/pricing' }])} />
      <main className="min-h-screen pt-32 px-6 md:px-12 pb-28">
        <section className="max-w-7xl mx-auto">
          <span className="text-teal-400 font-mono text-sm uppercase tracking-widest">Pricing Guide</span>
          <h1 className="font-display text-5xl md:text-8xl leading-none mt-6 mb-8">How Much Does Digital Marketing Cost?</h1>
          <p className="text-xl text-gray-300 max-w-4xl leading-relaxed">
            Pricing depends on market difficulty, speed, content depth, technical scope, and whether Qognition is handling strategy, execution, or both.
          </p>
        </section>
        <section className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-6 mt-16">
          {PRICING_PACKAGES.map((tier) => (
            <div key={tier.name} className="rounded-2xl border border-white/10 bg-white/[0.03] p-6">
              <h2 className="font-display text-3xl mb-3">{tier.name}</h2>
              <div className="text-2xl text-teal-400 mb-5">{tier.price}</div>
              <p className="text-gray-400 mb-6">{tier.bestFor}</p>
              <div className="space-y-3">
                {tier.includes.map((item) => (
                  <p key={item} className="text-sm text-gray-300">{item}</p>
                ))}
              </div>
            </div>
          ))}
        </section>
        <section className="max-w-7xl mx-auto mt-16 rounded-2xl border border-teal-400/20 bg-teal-400/5 p-8">
          <h2 className="font-display text-4xl mb-5">Get a custom recommendation</h2>
          <p className="text-gray-300 max-w-3xl mb-8">
            The fastest way to scope budget is to review your website, market, current traffic, lead quality, and revenue target.
          </p>
          <a href={CALENDLY_LINK} target="_blank" rel="noopener noreferrer" className="inline-flex rounded-full bg-teal-400 px-8 py-4 font-display text-sm uppercase tracking-wider text-black hover:bg-white">
            Book a Strategy Call
          </a>
        </section>
        <section className="max-w-5xl mx-auto mt-16">
          <h2 className="font-display text-4xl mb-8">Pricing FAQs</h2>
          <div className="space-y-4">
            {faqs.map((faq) => (
              <div key={faq.question} className="rounded-xl border border-white/10 bg-white/[0.03] p-5">
                <h3 className="font-display text-xl mb-2">{faq.question}</h3>
                <p className="text-gray-400">{faq.answer}</p>
              </div>
            ))}
          </div>
          <Link href="/free-tools/seo-roi-calculator" className="mt-8 inline-flex text-teal-400 hover:text-white">
            Estimate SEO ROI before you book
          </Link>
        </section>
      </main>
    </>
  );
}
