interface ProofBarProps {
  stats: { label: string; value: string }[];
  logoSrcs?: string[];
}

export default function ProofBar({ stats, logoSrcs }: ProofBarProps) {
  return (
    <div className="bg-[var(--card-bg)] border-y border-[var(--border)] py-10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        {logoSrcs && logoSrcs.length > 0 && (
          <div className="flex flex-wrap justify-center items-center gap-8 mb-8 opacity-40">
            {logoSrcs.map((src, i) => (
              <img key={i} src={src} alt="" className="h-7 object-contain" loading="lazy" />
            ))}
          </div>
        )}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
          {stats.map((stat) => (
            <div key={stat.label}>
              <p className="text-2xl sm:text-3xl font-semibold text-[var(--accent)] tracking-tight">
                {stat.value}
              </p>
              <p className="text-sm text-[var(--text-muted)] mt-1">{stat.label}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
