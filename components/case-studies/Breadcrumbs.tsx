import Link from 'next/link';

interface Crumb {
  name: string;
  href: string;
}

/**
 * Visual breadcrumb trail. The BreadcrumbList JSON-LD on each page carries the SEO weight —
 * this is the on-screen orientation aid for a library that is six page types deep.
 */
export default function Breadcrumbs({ items }: { items: Crumb[] }) {
  return (
    <nav aria-label="Breadcrumb" className="mb-6">
      <ol className="flex flex-wrap items-center gap-x-2 gap-y-1 text-meta text-[var(--text-muted)]">
        {items.map((item, i) => (
          <li key={item.href} className="flex items-center gap-2">
            {i > 0 && (
              <span aria-hidden="true" className="text-[var(--text-faint)]">
                /
              </span>
            )}
            {i === items.length - 1 ? (
              <span className="text-[var(--text)]" aria-current="page">
                {item.name}
              </span>
            ) : (
              <Link href={item.href} className="hover:text-[var(--accent)] transition-colors">
                {item.name}
              </Link>
            )}
          </li>
        ))}
      </ol>
    </nav>
  );
}
