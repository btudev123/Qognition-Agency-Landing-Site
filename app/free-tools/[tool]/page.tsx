import type { Metadata } from 'next';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import SchemaScript from '../../SchemaScript';
import CalculatorTool from '../../../components/CalculatorTool';
import HubSpotLeadForm from '../../../components/HubSpotLeadForm';
import { CALENDLY_LINK } from '../../../constants';
import { INDUSTRIES } from '../../../data/industries';
import { FREE_TOOLS, RESOURCES } from '../../../data/seoExpansion';
import { SERVICES } from '../../../data/services';
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
          '@graph': [
            {
              '@type': 'SoftwareApplication',
              name: page.title,
              applicationCategory: 'BusinessApplication',
              operatingSystem: 'Web',
              description: page.description,
              url: `${SITE_URL}${path}`,
              offers: { '@type': 'Offer', price: '0', priceCurrency: 'USD' }
            },
            {
              '@type': 'Product',
              name: page.title,
              description: page.description,
              brand: { '@type': 'Organization', name: 'Qognition Agency', url: SITE_URL },
              offers: { '@type': 'Offer', price: '0', priceCurrency: 'USD' }
            }
          ]
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
        <section className="max-w-7xl mx-auto mt-12 grid grid-cols-1 md:grid-cols-3 gap-4">
          {[
            `TL;DR: use this tool to frame the business case before you spend budget or brief a team.`,
            `The output is directional, so pair it with CRM, analytics, search console, and margin data before making final budget calls.`,
            `Each result links back into Qognition service, industry, resource, and case-study pages so the next step is clear.`
          ].map((item) => (
            <div key={item} className="rounded-xl border border-teal-400/20 bg-teal-400/5 p-5 text-sm leading-relaxed text-gray-300">
              {item}
            </div>
          ))}
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
        <section className="max-w-7xl mx-auto mt-20 grid grid-cols-1 lg:grid-cols-2 gap-8">
          <div className="rounded-2xl border border-white/10 bg-white/[0.03] p-8">
            <h2 className="font-display text-4xl mb-5">How to Use This Result</h2>
            <div className="space-y-5 text-gray-300 leading-relaxed">
              <p>
                Treat the number as a planning baseline, not a promise. The best marketing decisions come from combining this estimate with your
                real conversion rates, lead quality, close rates, average order value, sales cycle, and channel constraints.
              </p>
              <p>
                If the result looks attractive, the next step is to validate the assumptions with a small campaign, a landing page, and clear
                attribution. If the result looks weak, the answer is usually better offer clarity, stronger traffic intent, better creative, or a
                tighter conversion path.
              </p>
            </div>
          </div>
          <div className="rounded-2xl border border-white/10 bg-white/[0.03] p-8">
            <h2 className="font-display text-4xl mb-5">Related Growth Paths</h2>
            <div className="grid grid-cols-1 gap-3">
              {[
                ...SERVICES.slice(0, 3).map((service) => ({ label: service.title, href: `/services/${service.id}` })),
                ...INDUSTRIES.slice(0, 2).map((industry) => ({ label: `${industry.name} Marketing`, href: `/industries/${industry.id}` })),
                ...RESOURCES.slice(0, 2).map((resource) => ({ label: resource.title, href: `/resources/${resource.slug}` })),
                { label: 'Book a Strategy Call', href: CALENDLY_LINK }
              ].map((item) => (
                <Link key={item.href} href={item.href} className="rounded-lg border border-white/10 bg-black/40 p-4 text-sm text-gray-300 hover:border-teal-400/50 hover:text-white">
                  {item.label}
                </Link>
              ))}
            </div>
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
