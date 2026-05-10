import React from 'react';
import { useParams, Link } from '../../lib/routerCompat';
import { BLOG_POSTS } from '../../data/blog';
import SEO from '../../components/SEO';
import MagneticButton from '../../components/MagneticButton';
import { CALENDLY_LINK } from '../../constants';

const BlogPostPage: React.FC = () => {
  const { slug } = useParams<{ slug: string }>();
  const post = BLOG_POSTS.find((p) => p.id === slug);

  if (!post) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-4xl font-bold mb-4">Post Not Found</h1>
          <p className="text-muted-foreground mb-8">The blog post you're looking for doesn't exist.</p>
          <Link to="/blog" className="text-teal-400 hover:underline">
            ← Back to Blog
          </Link>
        </div>
      </div>
    );
  }

  const parseContent = (content: string) => {
    return content
      .split('\n')
      .map((line, index) => {
        if (line.startsWith('# ')) {
          return <h2 key={index} className="text-3xl font-bold mt-10 mb-5">{line.replace('# ', '')}</h2>;
        }
        if (line.startsWith('## ')) {
          return <h2 key={index} className="text-2xl font-bold mt-8 mb-4">{line.replace('## ', '')}</h2>;
        }
        if (line.startsWith('### ')) {
          return <h3 key={index} className="text-xl font-semibold mt-6 mb-3">{line.replace('### ', '')}</h3>;
        }
        if (line.startsWith('- ')) {
          return <li key={index} className="ml-4 mb-2">{line.replace('- ', '')}</li>;
        }
        if (line.match(/^\d+\. /)) {
          return <li key={index} className="ml-4 mb-2 list-decimal">{line.replace(/^\d+\. /, '')}</li>;
        }
        if (line.trim() === '') {
          return <br key={index} />;
        }
        return <p key={index} className="mb-4">{line}</p>;
      });
  };

  return (
    <>
      <SEO 
        title={`${post.title} - Qognition Agency`} 
        description={post.excerpt}
        path={`/blog/${post.id}`}
        image={post.image}
      />
      
      <div className="container mx-auto px-4 py-12">
        <div className="max-w-4xl mx-auto">
          {/* Breadcrumbs */}
          <nav className="mb-8 text-sm text-muted-foreground">
            <Link to="/" className="hover:text-teal-400 transition-colors">Home</Link>
            <span className="mx-2">/</span>
            <Link to="/blog" className="hover:text-teal-400 transition-colors">Blog</Link>
            <span className="mx-2">/</span>
            <span>{post.title}</span>
          </nav>
          
          {/* Post Header */}
          <article className="mb-12">
            <div className="flex items-center gap-3 mb-4">
              <span className="text-xs font-medium rounded bg-teal-400/10 px-2.5 py-0.5 text-teal-400">
                {post.category}
              </span>
            </div>
            <h1 className="text-4xl font-bold mb-6">{post.title}</h1>
            <div className="flex items-center gap-4 text-sm text-muted-foreground mb-8">
              <span>{post.date}</span>
              <span>·</span>
              <span>{post.readTime}</span>
              <span>·</span>
              <span>By {post.author.name}</span>
            </div>
            <div className="aspect-w-16 aspect-h-9 mb-8 bg-gray-800 rounded-lg flex items-center justify-center">
              <img 
                src={post.image} 
                alt={post.title} 
                className="w-full h-full object-cover rounded-lg"
              />
            </div>
          </article>
          
          {/* Post Content */}
          <div className="prose dark:prose-invert max-w-none">
            {parseContent(post.content)}
          </div>
          
          {/* Call to Action */}
          <div className="mt-16 p-8 bg-gray-900/50 rounded-lg border border-white/10">
            <h2 className="text-2xl font-semibold mb-6">Ready to implement these strategies?</h2>
            <p className="mb-6 text-lg">Let Qognition Agency help you leverage AI marketing and SEO to grow your business.</p>
            <a href={CALENDLY_LINK} target="_blank" rel="noopener noreferrer">
              <MagneticButton variant="primary">Get Started Today</MagneticButton>
            </a>
          </div>
          
          {/* Related Posts */}
          <div className="mt-16">
            <h2 className="text-2xl font-semibold mb-6">Related Insights</h2>
            <div className="grid gap-6 md:grid-cols-2">
              {BLOG_POSTS
                .filter((p) => p.id !== post.id)
                .slice(0, 2)
                .map((related) => (
                  <Link 
                    key={related.id} 
                    to={`/blog/${related.id}`}
                    className="group block hover:shadow-lg transition-shadow duration-300"
                  >
                    <article className="border rounded-lg overflow-hidden hover:border-teal-400/20">
                      <div className="p-6">
                        <span className="text-xs font-medium rounded bg-teal-400/10 px-2.5 py-0.5 text-teal-400 mb-3 inline-block">
                          {related.category}
                        </span>
                        <h3 className="text-xl font-semibold mb-3 line-clamp-2">
                          {related.title}
                        </h3>
                        <p className="text-muted-foreground mb-4 line-clamp-3">
                          {related.excerpt}
                        </p>
                        <div className="flex items-center gap-3 text-sm text-muted-foreground">
                          <span>{related.date}</span>
                          <span>·</span>
                          <span>{related.readTime}</span>
                        </div>
                      </div>
                    </article>
                  </Link>
                ))}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default BlogPostPage;
