/* The context row above a screen's table: what is tracked, where, and which run. */
export default function ScreenContext({ items }: { items: readonly (readonly [string, string])[] }) {
  return (
    <dl className="m-0 grid grid-cols-2 gap-x-4 gap-y-2 text-meta">
      {items.map(([term, value]) => (
        <div key={term} className="min-w-0">
          <dt className="font-mono uppercase tracking-[0.12em]" style={{ color: 'var(--s-text-faint)' }}>
            {term}
          </dt>
          <dd className="m-0 break-words" style={{ color: 'var(--s-text)' }}>
            {value}
          </dd>
        </div>
      ))}
    </dl>
  );
}
