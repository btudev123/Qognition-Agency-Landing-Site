import type { Metadata } from 'next';
import Link from 'next/link';
import { ArrowLeft, ArrowRight, CheckCircle2, ShieldCheck, Star, XCircle } from 'lucide-react';
import SchemaScript from '../../../SchemaScript';
import ViewRenderer from '../../../ViewRenderer';
import { TOOL_CATEGORIES } from '../../../../constants';
import { DIRECTORY_PRODUCTS } from '../../../../data/directoryProducts';
import { INDUSTRIES } from '../../../../data/industries';
import { FREE_TOOLS, RESOURCES } from '../../../../data/seoExpansion';
import { SERVICES } from '../../../../data/services';
import { breadcrumbSchema, directoryProductSchema, faqSchema, getDirectoryProductMetadata } from '../../../../lib/seo';

export const dynamicParams = true;

export const generateStaticParams = () =>
  DIRECTORY_PRODUCTS.map((product) => ({
    category: product.categorySlug,
    toolId: product.slug
  }));

export const generateMetadata = async ({
  params
}: {
  params: Promise<{ category: string; toolId: string }>;
}): Promise<Metadata> => {
  const { category, toolId } = await params;
  return getDirectoryProductMetadata(category, toolId);
};

export default async function Page({ params }: { params: Promise<{ category: string; toolId: string }> }) {
  const { category, toolId } = await params;
  const product = DIRECTORY_PRODUCTS.find((item) => item.categorySlug === category && item.slug === toolId);
  if (!product) return <ViewRenderer view="directoryTool" params={{ category, toolId }} />;

  const path = `/directory/${category}/${product.slug}`;
  const relatedService = SERVICES.find((service) => service.id === product.relatedServiceId);
  const currentCategory = TOOL_CATEGORIES.find((item) => item.slug === category);

  return (
    <>
      <SchemaScript data={directoryProductSchema(product, path)} />
      {product.faqs && <SchemaScript data={faqSchema(product.faqs)} />}
      <SchemaScript
        data={breadcrumbSchema([
          { name: 'Home', path: '/' },
          { name: 'Directory', path: '/directory' },
          { name: product.category, path: `/directory/${category}` },
          { name: product.name, path }
        ])}
      />
      <main className="min-h-screen pt-32 px-6 md:px-12 max-w-5xl mx-auto pb-32">
        <Link href={`/directory/${category}`} className="inline-flex items-center gap-2 text-gray-400 hover:text-white mb-12">
          <ArrowLeft size={16} /> Back to {(currentCategory?.name || category).replace('-', ' ')}
        </Link>

        <article className="grid grid-cols-1 md:grid-cols-12 gap-12">
          <div className="md:col-span-8">
            <header className="mb-12">
              <div className="flex items-center gap-4 mb-6">
                {product.imageUrl ? (
                  <img src={product.imageUrl} alt={product.name} className="w-20 h-20 rounded-xl object-cover border border-white/20" />
                ) : (
                  <div className="w-20 h-20 rounded-xl bg-white/10 border border-white/20 flex items-center justify-center font-display font-bold text-3xl">
                    {product.name.charAt(0)}
                  </div>
                )}
                <div>
                  <h1 className="font-display text-4xl md:text-6xl">{product.name}</h1>
                  <div className="flex flex-wrap items-center gap-4 mt-2 text-sm md:text-base">
                    <span className="text-teal-400 font-bold flex items-center gap-1">
                      <Star fill="currentColor" size={16} /> {product.rating}/5.0
                    </span>
                    <span className="text-gray-500">|</span>
                    <span className="text-gray-400">{product.category}</span>
                    <span className="text-gray-500">|</span>
                    <span className="text-gray-400">{product.pricing}</span>
                  </div>
                </div>
              </div>
              <p className="text-xl text-gray-300 leading-relaxed">{product.shortDescription}</p>
            </header>

            <section className="mb-12 grid grid-cols-1 md:grid-cols-3 gap-4">
              {[
                `${product.name} is useful when it solves a defined workflow bottleneck, not when it becomes another unused subscription.`,
                `For SEO and AI discovery, pair ${product.name} with human review, analytics, documented prompts, and clear ownership.`,
                'This profile includes verdict, best fit, use cases, pros/cons, workflow, alternatives, FAQs, and internal links.'
              ].map((item) => (
                <div key={item} className="rounded-xl border border-teal-400/20 bg-teal-400/5 p-5 text-sm leading-relaxed text-gray-300">
                  {item}
                </div>
              ))}
            </section>

            <div className="space-y-12">
              <section className="bg-white/5 border border-white/10 p-8 rounded-2xl relative overflow-hidden">
                <div className="absolute top-0 right-0 p-12 bg-teal-500/10 blur-[60px] rounded-full" />
                <h2 className="font-display text-2xl mb-4 flex items-center gap-2">
                  <ShieldCheck className="text-teal-400" /> Qognition Take
                </h2>
                <p className="text-lg text-gray-300 leading-relaxed border-l-2 border-teal-400 pl-6 mb-6">
                  "{product.agencyVerdict}"
                </p>
              </section>

              <section>
                <h2 className="font-display text-3xl mb-6">Overview</h2>
                <p className="text-gray-400 text-lg leading-relaxed whitespace-pre-wrap">{product.fullDescription}</p>
              </section>

              {product.bestFor && (
                <section>
                  <h2 className="font-display text-3xl mb-6">Best Fit</h2>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    {product.bestFor.map((item) => (
                      <div key={item} className="p-5 bg-white/[0.03] border border-white/10 rounded-xl">
                        <CheckCircle2 className="text-teal-400 mb-4" size={20} />
                        <p className="text-sm text-gray-300 leading-relaxed">{item}</p>
                      </div>
                    ))}
                  </div>
                </section>
              )}

              {product.useCases && (
                <section>
                  <h2 className="font-display text-3xl mb-6">Practical Use Cases</h2>
                  <div className="space-y-4">
                    {product.useCases.map((item, index) => (
                      <div key={item} className="flex gap-4 border border-white/10 bg-black/40 rounded-xl p-5">
                        <span className="font-mono text-teal-400 text-sm">0{index + 1}</span>
                        <p className="text-gray-300 leading-relaxed">{item}</p>
                      </div>
                    ))}
                  </div>
                </section>
              )}

              {(product.pros || product.cons) && (
                <section>
                  <h2 className="font-display text-3xl mb-6">Pros and Limits</h2>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="p-6 border border-teal-400/20 bg-teal-400/5 rounded-xl">
                      <h3 className="font-display text-xl mb-5 text-teal-300">Where it helps</h3>
                      <div className="space-y-4">
                        {(product.pros || []).map((item) => (
                          <div key={item} className="flex gap-3 text-sm text-gray-300">
                            <CheckCircle2 className="text-teal-400 shrink-0 mt-0.5" size={16} />
                            <span>{item}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                    <div className="p-6 border border-white/10 bg-white/[0.03] rounded-xl">
                      <h3 className="font-display text-xl mb-5">Watch-outs</h3>
                      <div className="space-y-4">
                        {(product.cons || []).map((item) => (
                          <div key={item} className="flex gap-3 text-sm text-gray-300">
                            <XCircle className="text-gray-500 shrink-0 mt-0.5" size={16} />
                            <span>{item}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                </section>
              )}

              {product.workflowExample && (
                <section className="border border-white/10 rounded-2xl p-8 bg-white/[0.03]">
                  <h2 className="font-display text-3xl mb-6">Workflow Example</h2>
                  <p className="text-gray-300 text-lg leading-relaxed mb-6">{product.workflowExample}</p>
                  {product.implementationSteps && (
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      {product.implementationSteps.map((step, index) => (
                        <div key={step} className="flex gap-4 p-4 bg-black/50 rounded-lg border border-white/10">
                          <span className="text-teal-400 font-mono text-xs mt-1">{index + 1}</span>
                          <span className="text-sm text-gray-300">{step}</span>
                        </div>
                      ))}
                    </div>
                  )}
                </section>
              )}

              {product.seoNotes && (
                <section className="border-l-2 border-teal-400 pl-6">
                  <h2 className="font-display text-3xl mb-4">SEO and AI Search Notes</h2>
                  <p className="text-gray-300 text-lg leading-relaxed">{product.seoNotes}</p>
                </section>
              )}

              <section>
                <h2 className="font-display text-3xl mb-6">How to Evaluate {product.name}</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                  {[
                    ['Workflow fit', `Does ${product.name} remove a bottleneck in research, production, publishing, reporting, sales handoff, or conversion tracking?`],
                    ['Data quality', 'Can your team export, audit, and explain the data it creates, or does it become another black box?'],
                    ['Team adoption', 'Will the owner use it weekly, and is there a simple operating procedure for handoff?'],
                    ['SEO and AI value', 'Does it help you publish clearer, more useful, more structured content, or only generate more volume?']
                  ].map(([title, copy]) => (
                    <div key={title} className="rounded-xl border border-white/10 bg-white/[0.03] p-5">
                      <h3 className="font-display text-xl mb-3">{title}</h3>
                      <p className="text-sm text-gray-400 leading-relaxed">{copy}</p>
                    </div>
                  ))}
                </div>
              </section>

              {product.alternatives && product.alternatives.length > 0 && (
                <section>
                  <h2 className="font-display text-3xl mb-6">Alternatives to Compare</h2>
                  <div className="flex flex-wrap gap-3">
                    {product.alternatives.map((item) => (
                      <span key={item} className="px-4 py-2 border border-white/10 bg-white/[0.03] rounded-full text-gray-300">
                        {item}
                      </span>
                    ))}
                  </div>
                </section>
              )}

              {product.faqs && (
                <section>
                  <h2 className="font-display text-3xl mb-6">FAQs</h2>
                  <div className="space-y-4">
                    {product.faqs.map((faq) => (
                      <div key={faq.question} className="p-5 border border-white/10 rounded-xl bg-white/[0.03]">
                        <h3 className="font-display text-lg mb-2">{faq.question}</h3>
                        <p className="text-sm text-gray-400 leading-relaxed">{faq.answer}</p>
                      </div>
                    ))}
                  </div>
                </section>
              )}

              <section className="rounded-2xl border border-white/10 bg-white/[0.03] p-8">
                <h2 className="font-display text-3xl mb-6">Related Qognition Pages</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                  {[
                    ...(relatedService ? [{ label: `${relatedService.title} Services`, path: `/services/${relatedService.id}` }] : []),
                    ...INDUSTRIES.slice(0, 2).map((industry) => ({ label: `${industry.name} Marketing`, path: `/industries/${industry.id}` })),
                    ...RESOURCES.slice(0, 2).map((resource) => ({ label: resource.title, path: `/resources/${resource.slug}` })),
                    ...FREE_TOOLS.slice(0, 2).map((freeTool) => ({ label: freeTool.title, path: `/free-tools/${freeTool.slug}` })),
                    { label: 'Growth Stack Directory', path: '/directory' }
                  ].map((item) => (
                    <Link key={item.path} href={item.path} className="rounded-lg border border-white/10 bg-black/40 p-4 text-sm text-gray-300 hover:border-teal-400/50 hover:text-white">
                      {item.label}
                    </Link>
                  ))}
                </div>
              </section>
            </div>
          </div>

          <aside className="md:col-span-4 space-y-8">
            <div className="p-6 bg-white/5 border border-white/10 rounded-xl sticky top-32">
              <a href={product.websiteUrl} target="_blank" rel="noopener noreferrer" className="mb-6 block rounded-full bg-teal-400 px-6 py-4 text-center font-display text-sm uppercase tracking-wider text-black hover:bg-white">
                Visit Website
              </a>
              <div className="border-t border-white/10 pt-6">
                <h2 className="text-sm font-bold uppercase tracking-wider text-gray-500 mb-4">Related Service</h2>
                {relatedService ? (
                  <Link href={`/services/${relatedService.id}`} className="group block">
                    <div className="flex items-center justify-between p-4 bg-black rounded-lg border border-white/10 group-hover:border-teal-400/50 transition-colors">
                      <span className="font-display text-lg">{relatedService.title}</span>
                      <ArrowRight size={16} className="text-teal-400" />
                    </div>
                    <p className="text-xs text-gray-500 mt-2">
                      Need help implementing {product.name}? Our {relatedService.title} team can turn the tool into a measurable workflow.
                    </p>
                  </Link>
                ) : (
                  <p className="text-sm text-gray-500">Contact us for enterprise implementation.</p>
                )}
              </div>
            </div>
          </aside>
        </article>
      </main>
    </>
  );
}
