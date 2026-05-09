import { BLOG_POSTS } from '../data/blog';
import SEO from '../components/SEO';
import { Link } from '../lib/routerCompat';
import MagneticButton from '../components/MagneticButton';
import { CONTACT_MAILTO } from '../constants';

const BlogPage = () => {
  return (
    <>
      <SEO 
        title="Blog - Qognition Agency" 
        description="Explore our latest insights on AI marketing, SEO strategies, and digital transformation. Learn from industry experts and stay ahead of the curve."
        path="/blog"
        image="/images/blog/blog-banner.jpg"
      />
      
      <div className="container mx-auto px-4 py-12">
        <header className="mb-16 text-center">
          <h1 className="text-4xl font-bold mb-6">Our Blog</h1>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Expert insights on AI marketing, SEO strategies, and digital transformation to help your business thrive in 2026 and beyond.
          </p>
        </header>
        
        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
          {BLOG_POSTS.map((post) => (
            <Link 
              key={post.id} 
              to={`/blog/${post.id}`} 
              className="group hover:shadow-lg transition-shadow duration-300"
            >
              <article className="border rounded-lg overflow-hidden hover:border-primary/20 transition-border duration-300">
                <div className="aspect-w-16 aspect-h-9">
                  <img 
                    src={post.image} 
                    alt={post.title} 
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="p-6">
                  <div className="flex items-center gap-2 mb-3">
                    <span className="text-xs font-medium rounded bg-primary/10 px-2.5 py-0.5 text-primary">
                      {post.category}
                    </span>
                  </div>
                  <h2 className="text-2xl font-semibold mb-3 line-clamp-2 hover:text-primary transition-colors duration-300 group-hover:hover:text-primary">
                    {post.title}
                  </h2>
                  <p className="text-muted-foreground mb-4 line-clamp-3">
                    {post.excerpt}
                  </p>
                  <div className="flex items-center gap-3 text-sm text-muted-foreground">
                    <span>{post.date}</span>
                    <span>·</span>
                    <span>{post.readTime}</span>
                  </div>
                </div>
              </article>
            </Link>
          ))}
        </div>
        
        <div className="mt-16 text-center">
          <a href={CONTACT_MAILTO}>
            <MagneticButton variant="outline">
              Contact Us for Expert Guidance
            </MagneticButton>
          </a>
        </div>
      </div>
    </>
  );
};

export default BlogPage;
