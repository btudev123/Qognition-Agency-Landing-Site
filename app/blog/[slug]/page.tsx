import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import Link from 'next/link';
import { ArrowRight } from 'lucide-react';
import { BLOG_POSTS } from '../../../data/blog';
import { articleSchema, breadcrumbSchema } from '../../../lib/schema';
import Heading from '../../../components/ui/Heading';
import Badge from '../../../components/ui/Badge';
import FunnelCTA from '../../../components/shared/FunnelCTA';

export const dynamicParams = false;

export const generateStaticParams = () => BLOG_POSTS.map((post) => ({ slug: post.id }));

export const generateMetadata = async ({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> => {
  const { slug } = await params;
  const post = BLOG_POSTS.find((item) => item.id === slug);
  if (!post) return { title: 'Post Not Found', description: 'Blog post not found.', robots: { index: false } };
  return {
    title: `${post.title} | Qognition Blog`,
    description: post.excerpt,
    alternates: { canonical: `/blog/${post.id}` },
    openGraph: { images: [post.image] },
  };
};

const parseMarkdown = (content: string) => {
  return content.split('\n').map((line, index) => {
    if (line.startsWith('# ')) {
      return (
        <Heading key={index} level="h2" className="mt-10 mb-5">
          {line.replace('# ', '')}
        </Heading>
      );
    }
    if (line.startsWith('## ')) {
      return (
        <h2 key={index} className="text-2xl font-bold text-[var(--text)] mt-8 mb-4">
          {line.replace('## ', '')}
        </h2>
      );
    }
    if (line.startsWith('### ')) {
      return (
        <h3 key={index} className="text-xl font-semibold text-[var(--text)] mt-6 mb-3">
          {line.replace('### ', '')}
        </h3>
      );
    }
    if (line.startsWith('- ')) {
      return (
        <li key={index} className="ml-4 mb-2 text-[var(--text-muted)] leading-relaxed">
          {line.replace('- ', '')}
        </li>
      );
    }
    if (line.match(/^\d+\. /)) {
      return (
        <li key={index} className="ml-4 mb-2 list-decimal text-[var(--text-muted)] leading-relaxed">
          {line.replace(/^\d+\. /, '')}
        </li>
      );
    }
    if (line.startsWith('**') && line.endsWith('**')) {
      const text = line.replace(/\*\*/g, '');
      return (
        <p key={index} className="mb-4 font-bold text-[var(--text)]">
          {text}
        </p>
      );
    }
    if (line.trim() === '') {
      return <br key={index} />;
    }
    // Handle inline bold markers
    const parts = line.split(/(\*\*.*?\*\*)/g);
    if (parts.length > 1) {
      return (
        <p key={index} className="mb-4 text-[var(--text-muted)] leading-relaxed">
          {parts.map((part, i) => {
            if (part.startsWith('**') && part.endsWith('**')) {
              return (
                <strong key={i} className="text-[var(--text)]">
                  {part.slice(2, -2)}
                </strong>
              );
            }
            return part;
          })}
        </p>
      );
    }
    return (
      <p key={index} className="mb-4 text-[var(--text-muted)] leading-relaxed">
        {line}
      </p>
    );
  });
};

export default async function Page({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const post = BLOG_POSTS.find((item) => item.id === slug);
  if (!post) notFound();

  const path = `/blog/${post.id}`;

  const relatedPosts = BLOG_POSTS.filter((p) => p.id !== post.id).slice(0, 2);

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify([
            articleSchema({
              title: post.title,
              description: post.excerpt,
              slug: post.id,
              date: post.date,
              authorName: post.author.name,
              imageUrl: post.image,
            }),
            breadcrumbSchema([
              { name: 'Home', path: '/' },
              { name: 'Blog', path: '/blog' },
              { name: post.title, path },
            ]),
          ]),
        }}
      />
      <main className="min-h-screen pt-36 pb-20 px-4 sm:px-6">
        <div className="max-w-4xl mx-auto">
          {/* Breadcrumbs */}
          <nav className="mb-8 text-sm text-[var(--text-muted)]">
            <Link href="/" className="hover:text-[var(--accent)] transition-colors">
              Home
            </Link>
            <span className="mx-2">/</span>
            <Link href="/blog" className="hover:text-[var(--accent)] transition-colors">
              Blog
            </Link>
            <span className="mx-2">/</span>
            <span className="text-[var(--text)]">{post.title}</span>
          </nav>

          {/* Post Header */}
          <article className="mb-12">
            <div className="flex items-center gap-3 mb-4">
              <Badge>{post.category}</Badge>
            </div>
            <Heading level="h1" className="mb-6">
              {post.title}
            </Heading>
            <div className="flex items-center gap-4 text-sm text-[var(--text-muted)] mb-8">
              <span>{post.date}</span>
              <span>&middot;</span>
              <span>{post.readTime}</span>
              <span>&middot;</span>
              <span>By {post.author.name}</span>
            </div>
            {post.image && (
              <div className="aspect-video mb-8 rounded-xl overflow-hidden bg-[var(--card-bg)] border border-[var(--border)]">
                <img src={post.image} alt={post.title} className="w-full h-full object-cover" />
              </div>
            )}
          </article>

          {/* Post Content */}
          <div className="prose-custom max-w-none">{parseMarkdown(post.content)}</div>

          {/* Call to Action */}
          <div className="mt-16 p-8 rounded-2xl border border-[var(--accent)]/20 bg-[rgba(var(--accent-rgb),0.04)]">
            <Heading level="h2" className="mb-6">
              Ready to implement these strategies?
            </Heading>
            <p className="mb-6 text-lg text-[var(--text-muted)]">
              Let Qognition help you leverage AI marketing and SEO to grow your business.
            </p>
            <a
              href="https://cal.com/qognition-agency/15min"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 rounded-lg bg-[var(--accent)] text-[var(--accent-deep)] font-medium px-6 py-3 hover:brightness-110 transition-all text-sm"
            >
              Get Started Today <ArrowRight size={16} />
            </a>
          </div>

          <FunnelCTA stage="tofu" className="mt-16" />

          {/* Related Posts */}
          {relatedPosts.length > 0 && (
            <div className="mt-16">
              <Heading level="h2" className="mb-6">
                Related Insights
              </Heading>
              <div className="grid gap-6 md:grid-cols-2">
                {relatedPosts.map((related) => (
                  <Link
                    key={related.id}
                    href={`/blog/${related.id}`}
                    className="group block rounded-xl border border-[var(--border)] bg-[var(--card-bg)] overflow-hidden hover:border-[var(--accent)]/40 transition-all"
                  >
                    <div className="p-6">
                      <Badge className="mb-3">{related.category}</Badge>
                      <h3 className="text-xl font-semibold text-[var(--text)] mb-3 line-clamp-2 group-hover:text-[var(--accent)] transition-colors">
                        {related.title}
                      </h3>
                      <p className="text-[var(--text-muted)] mb-4 line-clamp-3">{related.excerpt}</p>
                      <div className="flex items-center gap-3 text-sm text-[var(--text-muted)]">
                        <span>{related.date}</span>
                        <span>&middot;</span>
                        <span>{related.readTime}</span>
                      </div>
                    </div>
                  </Link>
                ))}
              </div>
            </div>
          )}
        </div>
      </main>
    </>
  );
}
