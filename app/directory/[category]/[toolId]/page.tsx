import type { Metadata } from 'next';
import Link from 'next/link';
import { ArrowLeft, ArrowRight, CheckCircle2, ShieldCheck, Star, XCircle } from 'lucide-react';
import { DIRECTORY_PRODUCTS } from '../../../../data/directoryProducts';
import { INDUSTRIES } from '../../../../data/industries';
import { FREE_TOOLS, RESOURCES } from '../../../../data/seoExpansion';
import { SERVICES } from '../../../../data/services';
import { TOOL_CATEGORIES } from '../../../../data/toolCategories';
import { breadcrumbSchema, faqSchema } from '../../../../lib/schema';
import { getDirectoryProductMetadata } from '../../../../lib/seo';
import Heading from '../../../../components/ui/Heading';
import Badge from '../../../../components/ui/Badge';

export const dynamicParams = true;

export const generateStaticParams = () =>
  DIRECTORY_PRODUCTS.map((product) => ({
    category: product.categorySlug,
    toolId: product.slug,
  }));

export const generateMetadata = async ({
  params,
}: {
  params: Promise<{ category: string; toolId: string }>;
}): Promise<Metadata> => {
  const { category, toolId } = await params;
  return getDirectoryProductMetadata(category, toolId);
};

export default async function Page({ params }: { params: Promise<{ category: string; toolId: string }> }) {
  const { category, toolId } = await params;
  const product = DIRECTORY_PRODUCTS.find((item) => item.categorySlug === category && item.slug === toolId);
  if (!product) {
    return (
      <main className="min-h-screen pt-36 pb-20 px-4 sm:px-6 flex items-center justify-center">
        <p className="text-body text-[var(--text-muted)]">Tool not found.</p>
      </main>
    );
  }

  const path = `/directory/${category}/${product.slug}`;
  const relatedService = SERVICES.find((service) => service.id === product.relatedServiceId);
  const currentCategory = TOOL_CATEGORIES.find((item) => item.slug === category);

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
                  name: product.name,
                  applicationCategory: product.category,
                  operatingSystem: 'Web',
                  description: product.shortDescription,
                  url: `https://qognition.com${path}`,
                  offers: {
                    '@type': 'Offer',
                    price: product.pricing === 'Free' || product.pricing === 'Open Source' ? '0' : undefined,
                    priceCurrency: 'USD',
                    category: product.pricing,
                  },
                  aggregateRating: {
                    '@type': 'AggregateRating',
                    ratingValue: product.rating,
                    ratingCount: product.votesCount || 25,
                  },
                },
                {
                  '@type': 'Product',
                  name: product.name,
                  description: product.shortDescription,
                  category: product.category,
                  brand: { '@type': 'Brand', name: product.name },
                  review: {
                    '@type': 'Review',
                    author: { '@type': 'Organization', name: 'Qognition' },
                    reviewBody: product.agencyVerdict,
                    reviewRating: {
                      '@type': 'Rating',
                      ratingValue: product.rating,
                      bestRating: 5,
                    },
                  },
                  url: `https://qognition.com${path}`,
                },
              ],
            },
            ...(product.faqs?.length ? [faqSchema(product.faqs)] : []),
            breadcrumbSchema([
              { name: 'Home', path: '/' },
              { name: 'Directory', path: '/directory' },
              { name: product.category, path: `/directory/${category}` },
              { name: product.name, path },
            ]),
          ]),
        }}
      />
      <main className="min-h-screen pt-36 pb-20 px-4 sm:px-6 max-w-5xl mx-auto">
        <Link
          href={`/directory/${category}`}
          className="inline-flex items-center gap-2 text-[var(--text-muted)] hover:text-[var(--text)] mb-12 text-sm transition-colors"
        >
          <ArrowLeft size={16} /> Back to {(currentCategory?.name || category).replace('-', ' ')}
        </Link>

        <article className="grid grid-cols-1 md:grid-cols-12 gap-12">
          <div className="md:col-span-8">
            <header className="mb-12">
              <div className="flex items-center gap-4 mb-6">
                {product.imageUrl ? (
                  <img
                    src={product.imageUrl}
                    alt={product.name}
                    className="w-20 h-20 rounded-xl object-cover border border-[var(--border)]"
                  />
                ) : (
                  <div className="w-20 h-20 rounded-xl bg-[var(--surface)] border border-[var(--border)] flex items-center justify-center font-bold text-3xl text-[var(--accent)]">
                    {product.name.charAt(0)}
                  </div>
                )}
                <div>
                  <Heading level="h1">{product.name}</Heading>
                  <div className="flex flex-wrap items-center gap-4 mt-2 text-sm">
                    <span className="text-[var(--accent)] font-bold flex items-center gap-1">
                      <Star fill="currentColor" size={16} /> {product.rating}/5.0
                    </span>
                    <span className="text-[var(--text-muted)]">|</span>
                    <span className="text-[var(--text-muted)]">{product.category}</span>
                    <span className="text-[var(--text-muted)]">|</span>
                    <span className="text-[var(--text-muted)]">{product.pricing}</span>
                  </div>
                </div>
              </div>
              <p className="text-body text-[var(--text-muted)]">{product.shortDescription}</p>
            </header>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-12">
              {[
                `${product.name} is useful when it solves a defined workflow bottleneck, not when it becomes another unused subscription.`,
                `For SEO and AI discovery, pair ${product.name} with human review, analytics, documented prompts, and clear ownership.`,
                'This profile includes verdict, best fit, use cases, pros/cons, workflow, alternatives, FAQs, and internal links.',
              ].map((item) => (
                <div
                  key={item}
                  className="rounded-xl border border-[var(--accent)]/20 bg-[rgba(var(--accent-rgb),0.04)] p-5 text-sm leading-relaxed text-[var(--text-muted)]"
                >
                  {item}
                </div>
              ))}
            </div>

            <div className="space-y-12">
              <section className="border border-[var(--border)] bg-[var(--card-bg)] p-8 rounded-2xl relative overflow-hidden">
                <div className="absolute top-0 right-0 p-12 bg-[var(--accent)]/10 blur-[60px] rounded-full" />
                <h2 className="text-h2 text-[var(--text)] mb-4 flex items-center gap-2 font-semibold">
                  <ShieldCheck className="text-[var(--accent)]" /> Qognition Take
                </h2>
                <p className="text-body text-[var(--text-muted)] border-l-2 border-[var(--accent)] pl-6 mb-6">
                  &ldquo;{product.agencyVerdict}&rdquo;
                </p>
              </section>

              <section>
                <Heading level="h2" className="mb-6">Overview</Heading>
                <p className="text-body text-[var(--text-muted)] whitespace-pre-wrap">
                  {product.fullDescription}
                </p>
              </section>

              {product.bestFor && (
                <section>
                  <Heading level="h2" className="mb-6">Best Fit</Heading>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    {product.bestFor.map((item) => (
                      <div
                        key={item}
                        className="p-5 border border-[var(--border)] bg-[var(--card-bg)] rounded-xl"
                      >
                        <CheckCircle2 className="text-[var(--accent)] mb-4" size={20} />
                        <p className="text-body text-[var(--text-muted)]">{item}</p>
                      </div>
                    ))}
                  </div>
                </section>
              )}

              {product.useCases && (
                <section>
                  <Heading level="h2" className="mb-6">Practical Use Cases</Heading>
                  <div className="space-y-4">
                    {product.useCases.map((item, index) => (
                      <div
                        key={item}
                        className="flex gap-4 border border-[var(--border)] bg-[var(--surface)] rounded-xl p-5"
                      >
                        <span className="font-mono text-[var(--accent)] text-sm">0{index + 1}</span>
                        <p className="text-body text-[var(--text-muted)]">{item}</p>
                      </div>
                    ))}
                  </div>
                </section>
              )}

              {(product.pros || product.cons) && (
                <section>
                  <Heading level="h2" className="mb-6">Pros and Limits</Heading>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="p-6 border border-[var(--accent)]/20 bg-[rgba(var(--accent-rgb),0.04)] rounded-xl">
                      <h3 className="text-h3 text-[var(--accent)] mb-5 font-semibold">Where it helps</h3>
                      <div className="space-y-4">
                        {(product.pros || []).map((item) => (
                          <div key={item} className="flex gap-3 text-sm text-[var(--text-muted)]">
                            <CheckCircle2 className="text-[var(--accent)] shrink-0 mt-0.5" size={16} />
                            <span>{item}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                    <div className="p-6 border border-[var(--border)] bg-[var(--card-bg)] rounded-xl">
                      <h3 className="text-h3 text-[var(--text)] mb-5 font-semibold">Watch-outs</h3>
                      <div className="space-y-4">
                        {(product.cons || []).map((item) => (
                          <div key={item} className="flex gap-3 text-sm text-[var(--text-muted)]">
                            <XCircle className="text-[var(--text-muted)] shrink-0 mt-0.5" size={16} />
                            <span>{item}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                </section>
              )}

              {product.workflowExample && (
                <section className="border border-[var(--border)] rounded-2xl p-8 bg-[var(--card-bg)]">
                  <Heading level="h2" className="mb-6">Workflow Example</Heading>
                  <p className="text-body text-[var(--text-muted)] mb-6">
                    {product.workflowExample}
                  </p>
                  {product.implementationSteps && (
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      {product.implementationSteps.map((step, index) => (
                        <div
                          key={step}
                          className="flex gap-4 p-4 bg-[var(--surface)] rounded-lg border border-[var(--border)]"
                        >
                          <span className="text-[var(--accent)] font-mono text-xs mt-1">{index + 1}</span>
                          <span className="text-sm text-[var(--text-muted)]">{step}</span>
                        </div>
                      ))}
                    </div>
                  )}
                </section>
              )}

              {product.seoNotes && (
                <section className="border-l-2 border-[var(--accent)] pl-6">
                  <Heading level="h2" className="mb-4">SEO and AI Search Notes</Heading>
                  <p className="text-body text-[var(--text-muted)]">{product.seoNotes}</p>
                </section>
              )}

              <section>
                <Heading level="h2" className="mb-6">How to Evaluate {product.name}</Heading>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                  {[
                    [
                      'Workflow fit',
                      `Does ${product.name} remove a bottleneck in research, production, publishing, reporting, sales handoff, or conversion tracking?`,
                    ],
                    [
                      'Data quality',
                      'Can your team export, audit, and explain the data it creates, or does it become another black box?',
                    ],
                    [
                      'Team adoption',
                      'Will the owner use it weekly, and is there a simple operating procedure for handoff?',
                    ],
                    [
                      'SEO and AI value',
                      'Does it help you publish clearer, more useful, more structured content, or only generate more volume?',
                    ],
                  ].map(([title, copy]) => (
                    <div
                      key={title}
                      className="rounded-xl border border-[var(--border)] bg-[var(--card-bg)] p-5"
                    >
                      <h3 className="text-h3 text-[var(--text)] mb-3 font-semibold">{title}</h3>
                      <p className="text-body text-[var(--text-muted)]">{copy}</p>
                    </div>
                  ))}
                </div>
              </section>

              {product.alternatives && product.alternatives.length > 0 && (
                <section>
                  <Heading level="h2" className="mb-6">Alternatives to Compare</Heading>
                  <div className="flex flex-wrap gap-3">
                    {product.alternatives.map((item) => (
                      <span
                        key={item}
                        className="px-4 py-2 border border-[var(--border)] bg-[var(--card-bg)] rounded-full text-sm text-[var(--text-muted)]"
                      >
                        {item}
                      </span>
                    ))}
                  </div>
                </section>
              )}

              {product.faqs && (
                <section>
                  <Heading level="h2" className="mb-6">FAQs</Heading>
                  <div className="space-y-4">
                    {product.faqs.map((faq) => (
                      <div
                        key={faq.question}
                        className="p-5 border border-[var(--border)] rounded-xl bg-[var(--card-bg)]"
                      >
                        <h3 className="text-h3 text-[var(--text)] mb-2 font-semibold">{faq.question}</h3>
                        <p className="text-body text-[var(--text-muted)]">{faq.answer}</p>
                      </div>
                    ))}
                  </div>
                </section>
              )}

              <section className="rounded-2xl border border-[var(--border)] bg-[var(--card-bg)] p-8">
                <Heading level="h2" className="mb-6">Related Qognition Pages</Heading>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                  {[
                    ...(relatedService
                      ? [{ label: `${relatedService.title} Services`, path: `/services/${relatedService.id}` }]
                      : []),
                    ...INDUSTRIES.slice(0, 2).map((industry) => ({
                      label: `${industry.name} Marketing`,
                      path: `/industries/${industry.id}`,
                    })),
                    ...RESOURCES.slice(0, 2).map((resource) => ({
                      label: resource.title,
                      path: resource.href || `/${resource.slug}`,
                    })),
                    ...FREE_TOOLS.slice(0, 2).map((freeTool) => ({
                      label: freeTool.title,
                      path: `/free-tools/${freeTool.slug}`,
                    })),
                    { label: 'Growth Stack Directory', path: '/directory' },
                  ].map((item) => (
                    <Link
                      key={item.path}
                      href={item.path}
                      className="rounded-lg border border-[var(--border)] bg-[var(--surface)] p-4 text-sm text-[var(--text-muted)] hover:border-[var(--accent)]/40 hover:text-[var(--text)] transition-all"
                    >
                      {item.label}
                    </Link>
                  ))}
                </div>
              </section>
            </div>
          </div>

          <aside className="md:col-span-4 space-y-8">
            <div className="p-6 border border-[var(--border)] bg-[var(--card-bg)] rounded-xl sticky top-28">
              <a
                href={product.websiteUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="mb-6 block rounded-lg bg-[var(--accent)] px-6 py-4 text-center text-sm font-medium text-[var(--accent-deep)] hover:brightness-110 transition-all"
              >
                Visit Website
              </a>
              <div className="border-t border-[var(--border)] pt-6">
                <h2 className="text-h2 text-[var(--text-muted)] mb-4 font-semibold">
                  Related Service
                </h2>
                {relatedService ? (
                  <Link href={`/services/${relatedService.id}`} className="group block">
                    <div className="flex items-center justify-between p-4 bg-[var(--surface)] rounded-lg border border-[var(--border)] group-hover:border-[var(--accent)]/40 transition-colors">
                      <span className="font-semibold text-[var(--text)]">{relatedService.title}</span>
                      <ArrowRight size={16} className="text-[var(--accent)]" />
                    </div>
                    <p className="text-meta text-[var(--text-muted)] mt-2">
                      Need help implementing {product.name}? Our {relatedService.title} team can turn the tool into a
                      measurable workflow.
                    </p>
                  </Link>
                ) : (
                  <p className="text-body text-[var(--text-muted)]">Contact us for enterprise implementation.</p>
                )}
              </div>
            </div>
          </aside>
        </article>
      </main>
    </>
  );
}
