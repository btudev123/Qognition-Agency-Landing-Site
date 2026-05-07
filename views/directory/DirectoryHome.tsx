
import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Link, useParams } from '../../lib/routerCompat';
import { Search, ArrowRight, Star, Filter, Loader2, Plus, Hash } from 'lucide-react';
import { DIRECTORY_PRODUCTS, TOOL_CATEGORIES } from '../../constants';
import SEO from '../../components/SEO';
import { fetchToolsByTopic, fetchTrendingTools, fetchTopics, PHFetchResult, PHTopic } from '../../lib/productHunt';
import { DirectoryProduct, Tool, PHPost } from '../../types';

const DirectoryHome: React.FC = () => {
  const { category } = useParams<{ category: string }>();
  
  const [searchTerm, setSearchTerm] = useState('');
  const [phTools, setPhTools] = useState<Tool[]>([]);
  const [topics, setTopics] = useState<PHTopic[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [pageInfo, setPageInfo] = useState<{ endCursor: string; hasNextPage: boolean } | null>(null);

  // Load Categories/Topics for navigation
  useEffect(() => {
    const loadTopics = async () => {
        const data = await fetchTopics();
        setTopics(data);
    };
    loadTopics();
  }, []);

  const loadTools = async (isLoadMore = false) => {
    setIsLoading(true);
    
    const cursor = isLoadMore && pageInfo ? pageInfo.endCursor : undefined;
    
    try {
      let result: PHFetchResult;
      
      // Determine Product Hunt Topic from local config if available, otherwise assume slug is topic
      const categoryConfig = TOOL_CATEGORIES.find(c => c.slug === category);
      const phTopic = categoryConfig?.phTopicSlug || category;

      if (phTopic) {
          result = await fetchToolsByTopic(phTopic, cursor);
      } else {
          result = await fetchTrendingTools(cursor);
      }

      const mappedTools: Tool[] = result.posts.map((post: PHPost) => ({
          id: post.slug || post.id,
          name: post.name,
          category: post.topics.edges[0]?.node.name || 'Tech',
          shortDescription: post.tagline,
          fullDescription: post.description || post.tagline,
          pricing: 'Freemium', 
          websiteUrl: post.website,
          rating: 5,
          tags: post.topics.edges.map((e: any) => e.node.name).slice(0, 3),
          agencyVerdict: `${post.votesCount} Upvotes.`,
          imageUrl: post.thumbnail.url,
          votesCount: post.votesCount
      }));

      setPhTools(prev => isLoadMore ? [...prev, ...mappedTools] : mappedTools);
      setPageInfo(result.pageInfo);
    } catch (err) {
      console.error("Failed to fetch tools", err);
    } finally {
      setIsLoading(false);
    }
  };

  // Reset and load initial data when category changes
  useEffect(() => {
    setPhTools([]);
    setPageInfo(null);
    loadTools(false);
  }, [category]);

  const internalFiltered = DIRECTORY_PRODUCTS.filter(tool => !category || tool.categorySlug === category);

  const allTools = [...internalFiltered, ...phTools].filter(t => 
      t.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
      t.shortDescription.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const categoryConfig = TOOL_CATEGORIES.find(c => c.slug === category);
  const pageTitle = category 
    ? `${categoryConfig?.name || category.split('-').map(w => w.charAt(0).toUpperCase() + w.slice(1)).join(' ')} Tools` 
    : "Growth Stack Directory";

  const currentCategorySlug = category || 'all';
  const getToolHref = (tool: Tool | DirectoryProduct) => {
    const generated = tool as DirectoryProduct;
    return `/directory/${generated.categorySlug || currentCategorySlug}/${generated.slug || tool.id}`;
  };

  return (
    <>
      <SEO 
        title={`${pageTitle} | Qognition Directory`}
        description={`Curated list of the best ${category || 'digital'} tools for growth, engineering, and design.`}
        path={`/directory${category ? '/' + category : ''}`}
        schemaData={{
          type: "CollectionPage",
          name: pageTitle,
          description: "Curated directory of software tools.",
          url: `https://www.qognitionagency.com/directory${category ? '/' + category : ''}`,
          mainEntity: {
             "@type": "ItemList",
             "itemListElement": allTools.map((tool, index) => ({
                "@type": "ListItem",
                "position": index + 1,
                "url": `https://www.qognitionagency.com/directory/${currentCategorySlug}/${tool.id}`,
                "name": tool.name
             }))
          }
        }}
      />
      
      <div className="pt-32 px-6 md:px-12 max-w-7xl mx-auto pb-32 min-h-screen">
        <header className="mb-16 text-center">
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-teal-500/30 bg-teal-500/10 text-teal-400 text-xs uppercase tracking-widest mb-6"
            >
                <Filter size={12} /> Curated Tech Stack
            </motion.div>
            <h1 className="font-display text-5xl md:text-7xl mb-6 capitalize">{pageTitle}</h1>
            <p className="text-xl text-gray-400 max-w-2xl mx-auto">
                Discover the software powering the next generation of digital companies.
            </p>
        </header>

        <div className="mb-16 max-w-4xl mx-auto">
            <div className="relative mb-8">
                <Search className="absolute left-6 top-1/2 -translate-y-1/2 text-gray-500" />
                <input 
                    type="text" 
                    placeholder="Search tools..." 
                    className="w-full bg-white/5 border border-white/10 rounded-full py-4 pl-16 pr-8 text-lg focus:outline-none focus:border-teal-400 transition-colors"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                />
            </div>
            
            <div className="flex flex-wrap gap-2 justify-center mb-6">
                <Link 
                    to="/directory"
                    className={`px-6 py-2 rounded-full text-sm border transition-colors ${!category ? 'bg-teal-400 text-black border-teal-400' : 'bg-transparent border-white/20 hover:border-white'}`}
                >
                    Trending
                </Link>
                {TOOL_CATEGORIES.map(cat => (
                    <Link 
                        key={cat.id}
                        to={`/directory/${cat.slug}`}
                        className={`px-6 py-2 rounded-full text-sm border transition-colors ${category === cat.slug ? 'bg-teal-400 text-black border-teal-400' : 'bg-transparent border-white/20 hover:border-white'}`}
                    >
                        {cat.name}
                    </Link>
                ))}
            </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-16">
            {allTools.length > 0 ? (
                allTools.map((tool, index) => (
                    <Link to={getToolHref(tool)} key={tool.id} className="group">
                        <motion.div 
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: index * 0.05 }}
                            className="h-full p-8 border border-white/10 rounded-2xl bg-gradient-to-br from-white/5 to-transparent hover:border-teal-400/40 hover:bg-white/10 transition-all duration-300 flex flex-col"
                        >
                            <div className="flex justify-between items-start mb-6">
                                {tool.imageUrl ? (
                                    <img src={tool.imageUrl} alt={tool.name} className="w-12 h-12 rounded-lg object-cover border border-white/10" />
                                ) : (
                                    <div className="w-12 h-12 rounded-lg bg-black border border-white/10 flex items-center justify-center font-display font-bold text-xl text-white">
                                        {tool.name.charAt(0)}
                                    </div>
                                )}
                                
                                {tool.votesCount ? (
                                    <div className="flex items-center gap-1 text-orange-400 text-xs font-bold bg-orange-900/20 px-3 py-1 rounded-full border border-orange-500/20">
                                        ▲ {tool.votesCount}
                                    </div>
                                ) : (
                                    <div className="flex items-center gap-1 text-teal-400 text-xs font-bold bg-teal-900/20 px-3 py-1 rounded-full border border-teal-500/20">
                                        <Star size={12} fill="currentColor" /> {tool.rating}
                                    </div>
                                )}
                            </div>
                            
                            <h3 className="font-display text-2xl mb-2 group-hover:text-teal-400 transition-colors line-clamp-1">{tool.name}</h3>
                            <p className="text-gray-400 text-sm mb-6 flex-grow leading-relaxed line-clamp-3">
                                {tool.shortDescription}
                            </p>

                            <div className="flex flex-wrap gap-2 mb-6">
                                {tool.tags.slice(0, 3).map(tag => (
                                    <span key={tag} className="text-[10px] px-2 py-1 bg-black rounded border border-white/10 text-gray-500">
                                        {tag}
                                    </span>
                                ))}
                            </div>

                            <div className="mt-auto flex items-center text-sm font-bold text-white group-hover:gap-2 transition-all">
                                View Analysis <ArrowRight size={16} className="ml-2 text-teal-400"/>
                            </div>
                        </motion.div>
                    </Link>
                ))
            ) : !isLoading && (
                <div className="col-span-full text-center py-20 text-gray-500">
                    No tools found in this category.
                </div>
            )}
            
            {isLoading && (
               [...Array(3)].map((_, i) => (
                  <div key={`skeleton-${i}`} className="h-96 p-8 border border-white/5 rounded-2xl bg-white/5 animate-pulse">
                      <div className="w-12 h-12 bg-white/10 rounded-lg mb-6"></div>
                      <div className="h-8 bg-white/10 rounded mb-4 w-3/4"></div>
                      <div className="h-4 bg-white/10 rounded mb-2 w-full"></div>
                      <div className="h-4 bg-white/10 rounded mb-6 w-1/2"></div>
                  </div>
               ))
            )}
        </div>

        {pageInfo?.hasNextPage && !isLoading && (
            <div className="text-center mb-24">
                <button 
                    onClick={() => loadTools(true)}
                    className="inline-flex items-center gap-2 px-8 py-4 rounded-full border border-white/20 hover:border-teal-400 hover:text-teal-400 transition-all uppercase tracking-widest text-sm font-bold"
                >
                    <Plus size={16} /> Load More Tools
                </button>
            </div>
        )}

        {topics.length > 0 && (
            <div className="border-t border-white/10 pt-16">
                <h2 className="font-display text-2xl md:text-3xl mb-8 flex items-center gap-2">
                    <Hash className="text-teal-400" /> Explore 50+ Categories
                </h2>
                <div className="flex flex-wrap gap-3">
                    {topics.map(topic => (
                        <Link 
                            key={topic.id} 
                            to={`/directory/${topic.slug}`}
                            className={`px-4 py-2 rounded-lg text-sm border transition-colors ${category === topic.slug ? 'bg-teal-900/30 border-teal-400 text-teal-400' : 'bg-white/5 border-white/10 hover:border-white/40 text-gray-300'}`}
                        >
                            {topic.name}
                        </Link>
                    ))}
                </div>
            </div>
        )}
      </div>
    </>
  );
};

export default DirectoryHome;
