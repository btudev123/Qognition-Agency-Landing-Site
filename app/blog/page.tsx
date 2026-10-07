
import type { Metadata } from 'next';
import Link from 'next/link';
import { getBlogPosts } from '../../lib/sanityContent';
import { breadcrumbSchema } from '../../lib/schema';
import Heading from '../../components/ui/Heading';
import Badge from '../../components/ui/Badge';

export const metadata: Metadata = {
  title: 'Blog | Qognition',
  description: 'B2B AI SEO and GEO guidance on search visibility, useful content, evidence and the path to qualified enquiries.',
  alternates: { canonical: '/blog' },
};

export default async function Page() {
  const BLOG_POSTS = await getBlogPosts();
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify([
            breadcrumbSchema([{ name: 'Home', path: '/' }, { name: 'Blog', path: '/blog' }]),
          ]),
        }}
      />
      <main className="min-h-screen pt-36 pb-20 px-4 sm:px-6">
        <div className="max-w-7xl mx-auto">
          <header className="mb-16 text-center">
            <Heading level="h1" className="mb-6">B2B search insights</Heading>
            <p className="text-body text-[var(--text-muted)] max-w-2xl mx-auto">
              Practical ideas for making your expertise discoverable and easier to evaluate. Explore AI SEO, GEO, content and measurement through the decisions your buyers make.
            </p>
          </header>

          <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
            {BLOG_POSTS.map((post) => (
              <Link
                key={post.id}
                href={`/blog/${post.id}`}
                className="group rounded-xl border border-[var(--border)] overflow-hidden hover:border-[var(--accent)]/40 transition-all bg-[var(--card-bg)]"
              >
                <div className="aspect-video overflow-hidden">
                  <img src={post.image} alt={post.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                </div>
                <div className="p-6">
                  <Badge className="mb-3">{post.category}</Badge>
                  <h2 className="text-h2 text-[var(--text)] mb-3 line-clamp-2 group-hover:text-[var(--accent)] transition-colors font-semibold">
                    {post.title}
                  </h2>
                  <p className="text-body text-[var(--text-muted)] mb-4 line-clamp-3">{post.excerpt}</p>
                  <div className="flex items-center gap-3 text-sm text-[var(--text-muted)]">
                    <span>{post.date}</span>
                    <span>&middot;</span>
                    <span>{post.readTime}</span>
                  </div>
                </div>
              </Link>
            ))}
          </div>

          <div className="mt-16 text-center">
            <a
              href="/book"
              className="inline-flex rounded-lg bg-[var(--accent)] text-[var(--accent-deep)] font-medium px-6 py-3 text-sm hover:brightness-110 transition-all"
            >
              Book a call
            </a>
            <Link href="/contact#enquiry" className="mt-4 block text-[var(--accent)]">Send an enquiry</Link>
          </div>
        </div>
      </main>
    </>
  );
}
