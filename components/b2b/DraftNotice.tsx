/* The draft banner.
 *
 * A `draft` entity renders at its URL, is `noindex`, is absent from the sitemap
 * and is linked from nothing indexable. It exists so a page can be read and
 * reviewed at its real URL before anybody's name goes on it.
 *
 * WHY IT IS VISIBLE AND NOT A COMMENT. The whole risk of a draft tier is that
 * somebody sees the page, assumes it is live, and quotes it. An HTML comment or
 * a meta tag does not reach that person. This does, it says which state the page
 * is in and what is missing, and it disappears the moment the entity is promoted
 * because the banner is bound to the state and not to a flag someone clears.
 *
 * It is deliberately plain. A yellow warning stripe would read as a site-wide
 * error state to a reader who arrived here by accident.
 */
export default function DraftNotice({ path }: { path: string }) {
  return (
    <div
      role="note"
      aria-label="Publication state"
      className="pt-28 sm:pt-32"
    >
      <div className="mx-auto w-full max-w-[1440px] px-5 sm:px-8 lg:px-10">
        <div
          className="p-4 sm:p-5"
          style={{ background: 'var(--s-surface-2)', border: '1px solid var(--s-rule-strong)' }}
        >
          <span className="font-mono text-meta tracking-[0.14em] uppercase" style={{ color: 'var(--s-accent)' }}>
            Draft: not published
          </span>
          <p className="text-meta mt-2 m-0 max-w-[80ch]" style={{ color: 'var(--s-text-muted)' }}>
            <span className="font-mono">{path}</span> is marked <span className="font-mono">draft</span>{' '}
            in <span className="font-mono">data/b2b/verticals.ts</span>. It is served with{' '}
            <span className="font-mono">noindex</span>, is absent from the XML sitemap, and no
            indexable page links to it. It has no named reviewer and no review date, which is exactly
            what promotion to <span className="font-mono">published</span> adds. Do not quote it.
          </p>
        </div>
      </div>
    </div>
  );
}
