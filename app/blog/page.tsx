import type { Metadata } from 'next';
import Link from 'next/link';
import { BLOG_POSTS } from '../../data/blog';
import { breadcrumbSchema } from '../../lib/schema';
import Heading from '../../components/ui/Heading';
import Badge from '../../components/ui/Badge';

export const metadata: Metadata = {
  title: 'Blog | Qognition',
  description: 'Expert insights on AI marketing, SEO strategies, and digital transformation from Qognition. Stay ahead with actionable guides and thought leadership.',
  alternates: { canonical: '/blog' },
};

export default function Page() {
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
            <Heading level="h1" className="mb-6">Our Blog</Heading>
            <p className="text-lg text-[var(--text-muted)] max-w-2xl mx-auto">
              Expert insights on AI marketing, SEO strategies, and digital transformation to help your business thrive in 2026 and beyond.
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
                  <h2 className="text-2xl font-semibold text-[var(--text)] mb-3 line-clamp-2 group-hover:text-[var(--accent)] transition-colors">
                    {post.title}
                  </h2>
                  <p className="text-[var(--text-muted)] mb-4 line-clamp-3">{post.excerpt}</p>
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
              href="https://cal.com/qognition-agency/15min"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex rounded-lg bg-[var(--accent)] text-[var(--accent-deep)] font-medium px-6 py-3 text-sm hover:brightness-110 transition-all"
            >
              Book a Strategy Call
            </a>
          </div>
        </div>
      </main>
    </>
  );
}
