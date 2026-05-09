import Link from 'next/link';
import SchemaScript from '../SchemaScript';
import { FREE_TOOLS } from '../../data/seoExpansion';
import { breadcrumbSchema, metadataFor, SITE_URL } from '../../lib/seo';

export const dynamic = 'force-static';

export const metadata = metadataFor({
  title: 'Free SEO and Marketing Calculators | Qognition Agency',
  description: 'Free calculators for SEO ROI, Google Ads budgets, website traffic, ROAS, and content ideas.',
  path: '/free-tools'
});

export default function Page() {
  return (
    <>
      <SchemaScript
        data={{
          '@context': 'https://schema.org',
          '@type': 'CollectionPage',
          name: 'Free SEO and Marketing Tools',
          url: `${SITE_URL}/free-tools`,
          mainEntity: {
            '@type': 'ItemList',
            itemListElement: FREE_TOOLS.map((tool, index) => ({
              '@type': 'ListItem',
              position: index + 1,
              name: tool.title,
              url: `${SITE_URL}/free-tools/${tool.slug}`
            }))
          }
        }}
      />
      <SchemaScript data={breadcrumbSchema([{ name: 'Home', path: '/' }, { name: 'Free Tools', path: '/free-tools' }])} />
      <main className="min-h-screen pt-32 px-6 md:px-12 pb-28">
        <section className="max-w-7xl mx-auto">
          <span className="text-teal-400 font-mono text-sm uppercase tracking-widest">Free Tools</span>
          <h1 className="font-display text-5xl md:text-8xl leading-none mt-6 mb-8">SEO and Marketing Calculators</h1>
          <p className="text-xl text-gray-300 max-w-3xl leading-relaxed">
            Estimate ROI, budget, traffic, ROAS, and content opportunities before you commit spend or build a campaign.
          </p>
        </section>
        <section className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-16">
          {FREE_TOOLS.map((tool) => (
            <Link key={tool.slug} href={`/free-tools/${tool.slug}`} className="group rounded-2xl border border-white/10 bg-white/[0.03] p-6 hover:border-teal-400/50">
              <h2 className="font-display text-3xl mb-4 group-hover:text-teal-300">{tool.title}</h2>
              <p className="text-gray-400 leading-relaxed mb-6">{tool.description}</p>
              <div className="text-sm text-teal-400">Open calculator</div>
            </Link>
          ))}
        </section>
      </main>
    </>
  );
}
