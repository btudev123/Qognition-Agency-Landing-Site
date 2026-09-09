import type { Metadata } from 'next';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import CalculatorTool from '../../../components/CalculatorTool';
import LeadForm from '../../../components/shared/LeadForm';
import { INDUSTRIES } from '../../../data/industries';
import { FREE_TOOLS, RESOURCES } from '../../../data/seoExpansion';
import { SERVICES } from '../../../data/services';
import { breadcrumbSchema, faqSchema } from '../../../lib/schema';
import Heading from '../../../components/ui/Heading';
import Badge from '../../../components/ui/Badge';

export const dynamicParams = false;

export const generateStaticParams = () => FREE_TOOLS.map((tool) => ({ tool: tool.slug }));

export const generateMetadata = async ({ params }: { params: Promise<{ tool: string }> }): Promise<Metadata> => {
  const { tool } = await params;
  const page = FREE_TOOLS.find((item) => item.slug === tool);
  if (!page) return { title: 'Tool Not Found', description: 'Tool not found.', robots: { index: false } };
  return { title: page.title, description: page.description, alternates: { canonical: `/free-tools/${page.slug}` } };
};

export default async function Page({ params }: { params: Promise<{ tool: string }> }) {
  const { tool } = await params;
  const page = FREE_TOOLS.find((item) => item.slug === tool);
  if (!page) notFound();

  const path = `/free-tools/${page.slug}`;

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify([
            {
              '@context': 'https://schema.org',
              '@graph': [
                {
                  '@type': 'SoftwareApplication',
                  name: page.title,
                  applicationCategory: 'BusinessApplication',
                  operatingSystem: 'Web',
                  description: page.description,
                  url: `https://www.qognitionagency.com${path}`,
                  offers: { '@type': 'Offer', price: '0', priceCurrency: 'USD' },
                },
                {
                  '@type': 'Product',
                  name: page.title,
                  description: page.description,
                  brand: { '@type': 'Organization', name: 'Qognition', url: 'https://www.qognitionagency.com' },
                  offers: { '@type': 'Offer', price: '0', priceCurrency: 'USD' },
                },
              ],
            },
            ...(page.faqs?.length ? [faqSchema(page.faqs)] : []),
            breadcrumbSchema([
              { name: 'Home', path: '/' },
              { name: 'Free Tools', path: '/free-tools' },
              { name: page.title, path },
            ]),
          ]),
        }}
      />
      <main className="min-h-screen pt-36 pb-20 px-4 sm:px-6">
        <div className="max-w-7xl mx-auto">
          <Badge className="mb-4">Free Tool</Badge>
          <Heading level="h1" className="mb-6">{page.h1}</Heading>
          <p className="text-body text-[var(--text-muted)] max-w-4xl">{page.intro}</p>

          <div className="mt-12 grid grid-cols-1 md:grid-cols-3 gap-4">
            {[
              'Quick summary: use this tool to frame the business case before you spend budget or brief a team.',
              'The output is directional, so pair it with CRM, analytics, search console, and margin data before making final budget calls.',
              'Each result links back into Qognition service, industry, resource, and case-study pages so the next step is clear.',
            ].map((item) => (
              <div
                key={item}
                className="rounded-xl border border-[var(--accent)]/20 bg-[rgba(var(--accent-rgb),0.04)] p-5 text-sm leading-relaxed text-[var(--text-muted)]"
              >
                {item}
              </div>
            ))}
          </div>

          <div className="mt-16">
            <CalculatorTool tool={page.slug} />
          </div>

          <div className="mt-20 grid grid-cols-1 lg:grid-cols-3 gap-8">
            <div className="lg:col-span-2 grid grid-cols-1 md:grid-cols-3 gap-6">
              <Info title="Inputs" items={page.inputs} />
              <Info title="Outputs" items={page.outputs} />
              <Info title="Use Cases" items={page.useCases} />
            </div>
            <div>
              <Heading level="h2" className="mb-4">Want the full model?</Heading>
              <p className="text-body text-[var(--text-muted)] mb-6">
                Send the estimate to Qognition and we will review the assumptions with you.
              </p>
              <LeadForm spoke="marketing" intent="audit" sourcePage={path} ctaLabel="Review My Estimate" />
            </div>
          </div>

          <div className="mt-20 grid grid-cols-1 lg:grid-cols-2 gap-8">
            <div className="rounded-2xl border border-[var(--border)] bg-[var(--card-bg)] p-8">
              <Heading level="h2" className="mb-5">How to Use This Result</Heading>
              <div className="space-y-5 text-[var(--text-muted)] leading-relaxed">
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
            <div className="rounded-2xl border border-[var(--border)] bg-[var(--card-bg)] p-8">
              <Heading level="h2" className="mb-5">Related Growth Paths</Heading>
              <div className="grid grid-cols-1 gap-3">
                {[
                  ...SERVICES.slice(0, 3).map((service) => ({ label: service.title, href: `/services/${service.id}` })),
                  ...INDUSTRIES.slice(0, 2).map((industry) => ({
                    label: `${industry.name} Marketing`,
                    href: `/industries/${industry.id}`,
                  })),
                  ...RESOURCES.slice(0, 2).map((resource) => ({
                    label: resource.title,
                    href: resource.href || `/${resource.slug}`,
                  })),
                  { label: 'Book a Strategy Call', href: 'https://api.leadconnectorhq.com/widget/bookings/discovery-call-qognition-agency' },
                ].map((item) => (
                  <Link
                    key={item.href}
                    href={item.href}
                    className="rounded-lg border border-[var(--border)] bg-[var(--surface)] p-4 text-sm text-[var(--text-muted)] hover:border-[var(--accent)]/40 hover:text-[var(--text)] transition-all"
                  >
                    {item.label}
                  </Link>
                ))}
              </div>
            </div>
          </div>
        </div>
      </main>
    </>
  );
}

const Info = ({ title, items }: { title: string; items: string[] }) => (
  <div className="rounded-2xl border border-[var(--border)] bg-[var(--card-bg)] p-6">
    <h2 className="text-h2 text-[var(--text)] mb-5 font-semibold">{title}</h2>
    <div className="space-y-3">
      {items.map((item) => (
        <p key={item} className="text-body text-[var(--text-muted)]">{item}</p>
      ))}
    </div>
  </div>
);
