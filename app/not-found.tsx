import Link from 'next/link';

export default function NotFound() {
  return (
    <main className="min-h-screen flex flex-col items-center justify-center text-center px-6 relative overflow-hidden">
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-[var(--accent)]/10 blur-[120px] rounded-full pointer-events-none" />
      <div className="relative z-10">
        <h1 className="text-display text-[var(--ink)]/5 select-none font-semibold">404</h1>
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full">
          <h2 className="text-h2 mb-4 text-[var(--text)] font-semibold">Page Not Found</h2>
          <p className="text-body text-[var(--text-muted)] max-w-md mx-auto mb-8">
            The page you&apos;re looking for doesn&apos;t exist or has been moved.
          </p>
          <Link
            href="/"
            className="inline-flex rounded-lg bg-[var(--accent)] text-[var(--accent-deep)] font-medium px-8 py-4 text-sm hover:brightness-110 transition-all"
          >
            Return Home
          </Link>
        </div>
      </div>
    </main>
  );
}
