import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import SchemaScript from '../../SchemaScript';
import CalculatorTool from '../../../components/CalculatorTool';
import HubSpotLeadForm from '../../../components/HubSpotLeadForm';
import { FREE_TOOLS } from '../../../data/seoExpansion';
import { breadcrumbSchema, faqSchema, metadataFor, SITE_URL } from '../../../lib/seo';

export const dynamicParams = false;

export const generateStaticParams = () => FREE_TOOLS.map((tool) => ({ tool: tool.slug }));

export const generateMetadata = async ({ params }: { params: Promise<{ tool: string }> }): Promise<Metadata> => {
  const { tool } = await params;
  const page = FREE_TOOLS.find((item) => item.slug === tool);
  if (!page) return metadataFor({ title: 'Tool Not Found', description: 'Tool not found.', path: `/free-tools/${tool}`, noIndex: true });
  return metadataFor({ title: page.title, description: page.description, path: `/free-tools/${page.slug}` });
};

export default async function Page({ params }: { params: Promise<{ tool: string }> }) {
  const { tool } = await params;
  const page = FREE_TOOLS.find((item) => item.slug === tool);
  if (!page) notFound();

  const path = `/free-tools/${page.slug}`;

  return (
    <>
      <SchemaScript
        data={{
          '@context': 'https://schema.org',
          '@type': 'SoftwareApplication',
          name: page.title,
          applicationCategory: 'BusinessApplication',
          operatingSystem: 'Web',
          description: page.description,
          url: `${SITE_URL}${path}`,
          offers: { '@type': 'Offer', price: '0', priceCurrency: 'USD' }
        }}
      />
      <SchemaScript data={faqSchema(page.faqs)} />
      <SchemaScript
        data={breadcrumbSchema([
          { name: 'Home', path: '/' },
          { name: 'Free Tools', path: '/free-tools' },
          { name: page.title, path }
        ])}
      />
      <main className="min-h-screen pt-32 px-6 md:px-12 pb-28">
        <section className="max-w-7xl mx-auto">
          <span className="text-teal-400 font-mono text-sm uppercase tracking-widest">Free Tool</span>
          <h1 className="font-display text-5xl md:text-8xl leading-none mt-6 mb-8">{page.h1}</h1>
          <p className="text-xl text-gray-300 max-w-4xl leading-relaxed">{page.intro}</p>
        </section>
        <section className="max-w-7xl mx-auto mt-16">
          <CalculatorTool tool={page.slug} />
        </section>
        <section className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-3 gap-8 mt-20">
          <div className="lg:col-span-2 grid grid-cols-1 md:grid-cols-3 gap-6">
            <Info title="Inputs" items={page.inputs} />
            <Info title="Outputs" items={page.outputs} />
            <Info title="Use Cases" items={page.useCases} />
          </div>
          <div>
            <h2 className="font-display text-3xl mb-4">Want the full model?</h2>
            <p className="text-gray-400 mb-6">Send the estimate to Qognition and we will review the assumptions with you.</p>
            <HubSpotLeadForm source="Free Tool" resource={page.slug} buttonLabel="Review My Estimate" />
          </div>
        </section>
      </main>
    </>
  );
}

const Info = ({ title, items }: { title: string; items: string[] }) => (
  <div className="rounded-2xl border border-white/10 bg-white/[0.03] p-6">
    <h2 className="font-display text-2xl mb-5">{title}</h2>
    <div className="space-y-3">
      {items.map((item) => (
        <p key={item} className="text-sm text-gray-400">{item}</p>
      ))}
    </div>
  </div>
);
