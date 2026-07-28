import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import Link from 'next/link';
import { ArrowRight } from 'lucide-react';
import { marked } from 'marked';
import { getBlogPost, getBlogPosts } from '../../../lib/sanityContent';
import { articleSchema, breadcrumbSchema } from '../../../lib/schema';
import Heading from '../../../components/ui/Heading';
import Badge from '../../../components/ui/Badge';
import FunnelCTA from '../../../components/shared/FunnelCTA';

export const dynamicParams = true;

export const generateStaticParams = async () => {
  const posts = await getBlogPosts();
  return posts.map((post: any) => ({ slug: post.id }));
};

export const generateMetadata = async ({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> => {
  const { slug } = await params;
  const post = await getBlogPost(slug);
  if (!post) return { title: 'Post Not Found', description: 'Blog post not found.', robots: { index: false } };
  return {
    title: `${post.title} | Qognition Blog`,
    description: post.excerpt,
    alternates: { canonical: `/blog/${post.id}` },
    openGraph: { images: [post.image] },
  };
};

/* Blog bodies are markdown. `marked` handles structure; `.prose-q` (app/globals.css)
   supplies the type scale, so blog h2/h3/body are byte-identical in size to the
   rest of the site. The page already renders the title as <h1>, so any level-1
   heading inside the body is demoted to <h2> — one H1 per page, always. */
const renderMarkdown = (content: string): string => {
  const html = marked.parse(content, { async: false, gfm: true, breaks: false }) as string;
  return html
    .replace(/<h1(\s[^>]*)?>/g, '<h2$1>')
    .replace(/<\/h1>/g, '</h2>')
    .replace(/<table>/g, '<div class="table-scroll"><table>')
    .replace(/<\/table>/g, '</table></div>');
};

export default async function Page({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const post = await getBlogPost(slug);
  if (!post) notFound();

  const path = `/blog/${post.id}`;

  const allPosts = await getBlogPosts();
  const relatedPosts = allPosts.filter((p: any) => p.id !== post.id).slice(0, 2);

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
          <div
            className="prose-q max-w-none"
            dangerouslySetInnerHTML={{ __html: renderMarkdown(post.content) }}
          />

          {/* Call to Action */}
          <div className="mt-16 p-8 rounded-2xl border border-[var(--accent)]/20 bg-[rgba(var(--accent-rgb),0.04)]">
            <Heading level="h2" className="mb-6">
              Ready to implement these strategies?
            </Heading>
            <p className="text-body mb-6 text-[var(--text-muted)]">
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
                      <h3 className="text-h3 text-[var(--text)] mb-3 line-clamp-2 group-hover:text-[var(--accent)] transition-colors font-semibold">
                        {related.title}
                      </h3>
                      <p className="text-body text-[var(--text-muted)] mb-4 line-clamp-3">{related.excerpt}</p>
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
