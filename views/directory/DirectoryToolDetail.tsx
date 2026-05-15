import React, { useEffect, useState } from 'react';
import { useParams, Link } from '../../lib/routerCompat';
import { ArrowLeft, ExternalLink, Star, ArrowRight, ShieldCheck, Loader2, CheckCircle2, XCircle } from 'lucide-react';
import { motion } from 'framer-motion';
import { DIRECTORY_PRODUCTS, TOOLS, SERVICES, FREE_TOOLS, RESOURCES, INDUSTRIES } from '../../constants';
import MagneticButton from '../../components/MagneticButton';
import SEO from '../../components/SEO';
import { fetchToolDetails, fetchToolsByTopic } from '../../lib/productHunt';
import { DirectoryProduct, Tool, PHPost } from '../../types';

const DirectoryToolDetail: React.FC = () => {
  const { category, toolId } = useParams<{ category: string; toolId: string }>();
  const initialTool =
    DIRECTORY_PRODUCTS.find(t => t.categorySlug === category && t.slug === toolId) ||
    TOOLS.find(t => t.id === toolId) ||
    null;
  const [tool, setTool] = useState<Tool | null>(initialTool);
  const [relatedTools, setRelatedTools] = useState<Tool[]>([]);
  const [loading, setLoading] = useState(!initialTool);

  // Load Main Tool Data
  useEffect(() => {
    window.scrollTo(0, 0);
    const loadTool = async () => {
        if (!toolId) return;
        const staticTool =
            DIRECTORY_PRODUCTS.find(t => t.categorySlug === category && t.slug === toolId) ||
            TOOLS.find(t => t.id === toolId);
        if (staticTool) {
            setTool(staticTool);
            setLoading(false);
            return;
        }
        setLoading(true);

        // If numeric/PH ID, fetch from API
        try {
            const phData = await fetchToolDetails(toolId);
            if (phData) {
                const mappedTool: Tool = {
                    id: phData.id,
                    name: phData.name,
                    category: phData.topics.edges[0]?.node.name || 'Tech',
                    shortDescription: phData.tagline,
                    fullDescription: phData.description,
                    pricing: 'Freemium',
                    websiteUrl: phData.website,
                    rating: 4.5,
                    tags: phData.topics.edges.map((e: any) => e.node.name),
                    agencyVerdict: `Trending in ${phData.topics.edges[0]?.node.name || 'Tech'} with ${phData.votesCount} community upvotes.`,
                    imageUrl: phData.thumbnail?.url,
                    votesCount: phData.votesCount
                };
                setTool(mappedTool);
            }
        } catch (error) {
            console.error("Error fetching tool details", error);
        } finally {
            setLoading(false);
        }
    };
    loadTool();
  }, [category, toolId]);

  // Load Related Tools based on category
  useEffect(() => {
      const loadRelated = async () => {
          if (!tool || !category) return;
          
          try {
              // Fetch from same topic/category
              const result = await fetchToolsByTopic(category);
              const mapped = result.posts
                  .filter((post: PHPost) => post.id !== tool.id) // Exclude current
                  .slice(0, 3) // Limit to 3
                  .map((post: PHPost) => ({
                    id: post.id,
                    name: post.name,
                    category: post.topics.edges[0]?.node.name || 'Tech',
                    shortDescription: post.tagline,
                    fullDescription: post.description,
                    pricing: 'Freemium' as const,
                    websiteUrl: post.website,
                    rating: 5,
                    tags: post.topics.edges.map((e: any) => e.node.name),
                    agencyVerdict: '',
                    imageUrl: post.thumbnail.url,
                    votesCount: post.votesCount
                  }));
              setRelatedTools(mapped);
          } catch (err) {
              console.error("Failed to load related tools", err);
          }
      };
      
      if (!loading && tool) {
          loadRelated();
      }
  }, [tool, category, loading]);

  if (loading) {
      return (
        <div className="min-h-screen pt-32 flex flex-col items-center justify-center text-teal-400">
            <Loader2 className="animate-spin mb-4" size={32} />
            <p>Analyzing Tool Data...</p>
        </div>
      );
  }

  if (!tool) {
    return <div className="min-h-screen pt-32 text-center text-white">Tool Not Found</div>;
  }

  const relatedService = SERVICES.find(s => s.id === tool.relatedServiceId);
  const currentCategorySlug = category || 'tech';
  const directoryTool = tool as DirectoryProduct;
  const currentToolSlug = directoryTool.slug || tool.id;

  return (
    <>
      <SEO 
        title={`${tool.name} Review | Qognition Agency`}
        description={tool.shortDescription}
        path={`/directory/${currentCategorySlug}/${currentToolSlug}`}
        image={tool.imageUrl}
        schemaData={{
          type: "SoftwareApplication",
          name: tool.name,
          applicationCategory: tool.category,
          operatingSystem: "Web",
          offers: {
            "@type": "Offer",
            "price": "0",
            "priceCurrency": "USD"
          },
          aggregateRating: tool.votesCount ? {
             "@type": "AggregateRating",
             "ratingValue": "4.8",
             "ratingCount": tool.votesCount
          } : undefined
        }}
      />

      <div className="min-h-screen pt-32 px-6 md:px-12 max-w-5xl mx-auto pb-32">
        <Link to={`/directory/${currentCategorySlug}`} className="inline-flex items-center gap-2 text-gray-400 hover:text-white mb-12">
            <ArrowLeft size={16} /> Back to {currentCategorySlug.replace('-', ' ')}
        </Link>

        <div className="grid grid-cols-1 md:grid-cols-12 gap-12">
            {/* Main Content */}
            <div className="md:col-span-8">
                <header className="mb-12">
                    <div className="flex items-center gap-4 mb-6">
                        {tool.imageUrl ? (
                             <img src={tool.imageUrl} alt={tool.name} className="w-20 h-20 rounded-xl object-cover border border-white/20" />
                        ) : (
                            <div className="w-20 h-20 rounded-xl bg-white/10 border border-white/20 flex items-center justify-center font-display font-bold text-3xl">
                                {tool.name.charAt(0)}
                            </div>
                        )}
                        <div>
                             <h1 className="font-display text-4xl md:text-6xl">{tool.name}</h1>
                             <div className="flex items-center gap-4 mt-2 text-sm md:text-base">
                                {tool.votesCount ? (
                                    <span className="text-orange-400 font-bold flex items-center gap-1">
                                        ▲ {tool.votesCount} Upvotes
                                    </span>
                                ) : (
                                    <span className="text-teal-400 font-bold flex items-center gap-1">
                                        <Star fill="currentColor" size={16} /> {tool.rating}/5.0
                                    </span>
                                )}
                                <span className="text-gray-500">|</span>
                                <span className="text-gray-400">{tool.category}</span>
                             </div>
                        </div>
                    </div>
                    <p className="text-xl text-gray-300 leading-relaxed">
                        {tool.shortDescription}
                    </p>
                </header>

                <div className="space-y-12">
                    <section className="bg-white/5 border border-white/10 p-8 rounded-2xl relative overflow-hidden">
                        <div className="absolute top-0 right-0 p-12 bg-teal-500/10 blur-[60px] rounded-full"></div>
                        <h2 className="font-display text-2xl mb-4 flex items-center gap-2">
                            <ShieldCheck className="text-teal-400" /> Qognition Take
                        </h2>
                        <p className="text-lg text-gray-300 leading-relaxed border-l-2 border-teal-400 pl-6 mb-6">
                            "{tool.agencyVerdict}"
                        </p>
                    </section>

                    <section>
                        <h2 className="font-display text-3xl mb-6">Key Takeaways</h2>
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                            {[
                                `${tool.name} is most useful when it solves a real workflow constraint, not when it is added as another unused subscription.`,
                                `For SEO and AI discovery, pair ${tool.name} with documented processes, human review, analytics, and clear ownership.`,
                                `Before buying, compare integrations, reporting quality, data exports, team permissions, pricing at scale, and alternatives.`
                            ].map((item) => (
                                <div key={item} className="rounded-xl border border-teal-400/20 bg-teal-400/5 p-5 text-sm leading-relaxed text-gray-300">
                                    {item}
                                </div>
                            ))}
                        </div>
                    </section>

                    <section>
                        <h2 className="font-display text-3xl mb-6">Overview</h2>
                        <p className="text-gray-400 text-lg leading-relaxed whitespace-pre-wrap">
                            {tool.fullDescription}
                        </p>
                    </section>

                    {directoryTool.bestFor && (
                        <section>
                            <h2 className="font-display text-3xl mb-6">Best Fit</h2>
                            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                                {directoryTool.bestFor.map((item) => (
                                    <div key={item} className="p-5 bg-white/[0.03] border border-white/10 rounded-xl">
                                        <CheckCircle2 className="text-teal-400 mb-4" size={20} />
                                        <p className="text-sm text-gray-300 leading-relaxed">{item}</p>
                                    </div>
                                ))}
                            </div>
                        </section>
                    )}

                    {directoryTool.useCases && (
                        <section>
                            <h2 className="font-display text-3xl mb-6">Practical Use Cases</h2>
                            <div className="space-y-4">
                                {directoryTool.useCases.map((item, index) => (
                                    <div key={item} className="flex gap-4 border border-white/10 bg-black/40 rounded-xl p-5">
                                        <span className="font-mono text-teal-400 text-sm">0{index + 1}</span>
                                        <p className="text-gray-300 leading-relaxed">{item}</p>
                                    </div>
                                ))}
                            </div>
                        </section>
                    )}

                    {(directoryTool.pros || directoryTool.cons) && (
                        <section>
                            <h2 className="font-display text-3xl mb-6">Pros and Limits</h2>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                <div className="p-6 border border-teal-400/20 bg-teal-400/5 rounded-xl">
                                    <h3 className="font-display text-xl mb-5 text-teal-300">Where it helps</h3>
                                    <div className="space-y-4">
                                        {(directoryTool.pros || []).map((item) => (
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
                                        {(directoryTool.cons || []).map((item) => (
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

                    {directoryTool.workflowExample && (
                        <section className="border border-white/10 rounded-2xl p-8 bg-white/[0.03]">
                            <h2 className="font-display text-3xl mb-6">Workflow Example</h2>
                            <p className="text-gray-300 text-lg leading-relaxed mb-6">{directoryTool.workflowExample}</p>
                            {directoryTool.implementationSteps && (
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                    {directoryTool.implementationSteps.map((step, index) => (
                                        <div key={step} className="flex gap-4 p-4 bg-black/50 rounded-lg border border-white/10">
                                            <span className="text-teal-400 font-mono text-xs mt-1">{index + 1}</span>
                                            <span className="text-sm text-gray-300">{step}</span>
                                        </div>
                                    ))}
                                </div>
                            )}
                        </section>
                    )}

                    <section>
                        <h2 className="font-display text-3xl mb-6">How to Evaluate {tool.name}</h2>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                            {[
                                ['Workflow fit', `Does ${tool.name} remove a bottleneck in research, production, publishing, reporting, sales handoff, or conversion tracking?`],
                                ['Data quality', 'Can your team export, audit, and explain the data it creates, or does it become another black box?'],
                                ['Team adoption', 'Will the person who owns the workflow use it weekly, and is there a simple operating procedure for handoff?'],
                                ['SEO and AI value', 'Does it help you publish clearer, more useful, more structured content, or only generate more volume?']
                            ].map(([title, copy]) => (
                                <div key={title} className="rounded-xl border border-white/10 bg-white/[0.03] p-5">
                                    <h3 className="font-display text-xl mb-3">{title}</h3>
                                    <p className="text-sm text-gray-400 leading-relaxed">{copy}</p>
                                </div>
                            ))}
                        </div>
                    </section>

                    {directoryTool.seoNotes && (
                        <section className="border-l-2 border-teal-400 pl-6">
                            <h2 className="font-display text-3xl mb-4">SEO and AI Search Notes</h2>
                            <p className="text-gray-300 text-lg leading-relaxed">{directoryTool.seoNotes}</p>
                        </section>
                    )}

                    {directoryTool.alternatives && directoryTool.alternatives.length > 0 && (
                        <section>
                            <h2 className="font-display text-3xl mb-6">Alternatives to Compare</h2>
                            <div className="flex flex-wrap gap-3">
                                {directoryTool.alternatives.map((item) => (
                                    <span key={item} className="px-4 py-2 border border-white/10 bg-white/[0.03] rounded-full text-gray-300">
                                        {item}
                                    </span>
                                ))}
                            </div>
                        </section>
                    )}

                    {directoryTool.faqs && (
                        <section>
                            <h2 className="font-display text-3xl mb-6">FAQs</h2>
                            <div className="space-y-4">
                                {directoryTool.faqs.map((faq) => (
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
                        <p className="text-gray-400 leading-relaxed mb-6">
                            Internal links help users connect this tool profile to the wider growth system: services, industries,
                            resources, calculators, and implementation pages.
                        </p>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                            {[
                                ...(relatedService ? [{ label: `${relatedService.title} Services`, path: `/services/${relatedService.id}` }] : []),
                                ...INDUSTRIES.slice(0, 2).map((industry) => ({ label: `${industry.name} Marketing`, path: `/industries/${industry.id}` })),
                                ...RESOURCES.slice(0, 2).map((resource) => ({ label: resource.title, path: resource.href || `/${resource.slug}` })),
                                ...FREE_TOOLS.slice(0, 2).map((freeTool) => ({ label: freeTool.title, path: `/free-tools/${freeTool.slug}` })),
                                { label: 'Growth Stack Directory', path: '/directory' },
                                { label: 'Book a Strategy Call', path: 'https://calendly.com/hello-qognitionagency/30min' }
                            ].map((item) => (
                                <Link key={item.path} to={item.path} className="rounded-lg border border-white/10 bg-black/40 p-4 text-sm text-gray-300 hover:border-teal-400/50 hover:text-white">
                                    {item.label}
                                </Link>
                            ))}
                        </div>
                    </section>

                    <section>
                        <h2 className="font-display text-3xl mb-6">Tags</h2>
                        <div className="flex flex-wrap gap-3">
                            {tool.tags.map(tag => (
                                <Link to={`/directory/${currentCategorySlug}?q=${tag}`} key={tag} className="px-4 py-2 bg-black border border-white/10 rounded-full text-gray-300 hover:border-teal-400 transition-colors">
                                    {tag}
                                </Link>
                            ))}
                        </div>
                    </section>
                </div>
            </div>

            {/* Sidebar */}
            <div className="md:col-span-4 space-y-8">
                <div className="p-6 bg-white/5 border border-white/10 rounded-xl sticky top-32">
                    <a href={tool.websiteUrl} target="_blank" rel="noopener noreferrer" className="block mb-6">
                        <MagneticButton variant="primary" className="w-full">
                            Visit Website <ExternalLink size={16} className="ml-2"/>
                        </MagneticButton>
                    </a>

                    <div className="border-t border-white/10 pt-6">
                         <h3 className="text-sm font-bold uppercase tracking-wider text-gray-500 mb-4">Related Service</h3>
                         {relatedService ? (
                             <Link to={`/services/${relatedService.id}`} className="group block">
                                <div className="flex items-center justify-between p-4 bg-black rounded-lg border border-white/10 group-hover:border-teal-400/50 transition-colors">
                                    <span className="font-display text-lg">{relatedService.title}</span>
                                    <ArrowRight size={16} className="text-teal-400 group-hover:translate-x-1 transition-transform"/>
                                </div>
                                <p className="text-xs text-gray-500 mt-2">
                                    Need help implementing {tool.name}? Our {relatedService.title} team are experts.
                                </p>
                             </Link>
                         ) : (
                             <p className="text-sm text-gray-500">Contact us for enterprise implementation.</p>
                         )}
                    </div>
                </div>
            </div>
        </div>

        {/* Related Tools Section */}
        {relatedTools.length > 0 && (
            <div className="mt-32 pt-16 border-t border-white/10">
                <h2 className="font-display text-3xl md:text-4xl mb-12 text-center">Similar Tools</h2>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    {relatedTools.map((relatedTool, index) => (
                        <Link to={`/directory/${currentCategorySlug}/${relatedTool.id}`} key={relatedTool.id} className="group">
                             <motion.div 
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ delay: index * 0.1 }}
                                className="h-full p-6 border border-white/10 rounded-xl bg-white/5 hover:bg-white/10 transition-colors"
                             >
                                <div className="flex items-start justify-between mb-4">
                                     {relatedTool.imageUrl ? (
                                         <img src={relatedTool.imageUrl} alt={relatedTool.name} className="w-12 h-12 rounded-lg object-cover" />
                                     ) : (
                                         <div className="w-12 h-12 bg-black border border-white/10 rounded-lg flex items-center justify-center font-bold">
                                             {relatedTool.name.charAt(0)}
                                         </div>
                                     )}
                                     <span className="text-xs text-orange-400 font-bold flex items-center gap-1">
                                         ▲ {relatedTool.votesCount}
                                     </span>
                                </div>
                                <h3 className="font-bold text-xl mb-2 group-hover:text-teal-400 transition-colors">{relatedTool.name}</h3>
                                <p className="text-sm text-gray-400 line-clamp-2">{relatedTool.shortDescription}</p>
                             </motion.div>
                        </Link>
                    ))}
                </div>
            </div>
        )}

      </div>
    </>
  );
};

export default DirectoryToolDetail;
