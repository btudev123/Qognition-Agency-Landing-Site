import { Metadata } from 'next';
import Link from 'next/link';

export const metadata: Metadata = {
  title: 'Blog | Qognition Agency',
  description: 'Insights and updates on digital marketing, SEO, and AI. Expert tips from the Qognition team.',
  alternates: {
    canonical: 'https://qognitionagency.com/blog'
  }
};

const BLOG_POSTS = [
  {
    id: 'ai-marketing-trends-2026',
    title: 'AI Marketing Trends 2026: What Every CMO Needs to Know',
    excerpt: 'Discover the top AI-powered marketing strategies that are reshaping digital advertising in 2026. From predictive analytics to automated content creation, learn how to stay ahead of the curve.',
    date: 'April 15, 2026',
    readTime: '8 min read',
    category: 'Artificial Intelligence'
  },
  {
    id: 'seo-strategies-for-small-business',
    title: 'SEO Strategies for Small Businesses: Competing with Enterprise Budgets',
    excerpt: 'Learn how small businesses can achieve enterprise-level SEO results without enterprise-level budgets. Practical, actionable strategies that deliver real ROI.',
    date: 'April 10, 2026',
    readTime: '12 min read',
    category: 'Search Engine Optimization'
  }
];

export default function BlogPage() {
  return (
    <main className="min-h-screen bg-black text-white pt-32 pb-24 px-6 md:px-12">
      <div className="max-w-8xl mx-auto">
        <h1 className="text-5xl md:text-7xl font-display font-medium mb-6">Our Blog</h1>
        <p className="text-xl text-gray-300 max-w-2xl mb-16">
          Expert insights on AI marketing, SEO strategies, and digital transformation to help your business thrive.
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {BLOG_POSTS.map((post) => (
            <Link 
              key={post.id} 
              href={`/blog/${post.id}`}
              className="group border border-white/10 rounded-lg overflow-hidden hover:border-teal-400/30 transition-colors"
            >
              <div className="aspect-video bg-gray-800"></div>
              <div className="p-6">
                <span className="text-xs font-medium rounded bg-teal-400/10 px-2.5 py-0.5 text-teal-400 mb-3 inline-block">
                  {post.category}
                </span>
                <h2 className="text-xl font-semibold mb-3 group-hover:text-teal-400 transition-colors">
                  {post.title}
                </h2>
                <p className="text-gray-400 mb-4 line-clamp-3">{post.excerpt}</p>
                <div className="flex items-center gap-3 text-sm text-gray-500">
                  <span>{post.date}</span>
                  <span>·</span>
                  <span>{post.readTime}</span>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </main>
  );
}