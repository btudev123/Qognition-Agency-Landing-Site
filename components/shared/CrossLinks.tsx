import Link from 'next/link';
import { SERVICES } from '../../data/services';
import { INDUSTRIES } from '../../data/industries';
import { REGIONS } from '../../data/regions';

/* Programmatic internal-linking mesh. Renders on every service / industry / region
   page so the three taxonomies fully cross-link each other (good for SEO + LLMs).

   - On a service page, pass `serviceId` so industry links point at the
     service × industry combo page (/services/[serviceId]/industries/[industryId]).
   - `exclude` hides the current entity from its own list. */

interface CrossLinksProps {
  serviceId?: string;
  exclude?: { type: 'service' | 'industry' | 'region'; id: string };
  className?: string;
}

function Column({
  title,
  links,
}: {
  title: string;
  links: { label: string; href: string }[];
}) {
  if (links.length === 0) return null;
  return (
    <div>
      <h3 className="text-h3 mb-4 font-semibold" style={{ color: 'var(--accent)' }}>
        {title}
      </h3>
      <ul className="grid gap-2.5">
        {links.map((l) => (
          <li key={l.href}>
            <Link href={l.href} className="text-[15px] rf-link" style={{ color: 'var(--ink-soft)' }}>
              {l.label}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default function CrossLinks({ serviceId, exclude, className = '' }: CrossLinksProps) {
  const services = SERVICES
    .filter((s) => !(exclude?.type === 'service' && exclude.id === s.id))
    .map((s) => ({ label: s.title, href: `/services/${s.id}` }));

  const industries = INDUSTRIES
    .filter((i) => !(exclude?.type === 'industry' && exclude.id === i.id))
    .map((i) => ({
      label: i.name,
      href: serviceId ? `/services/${serviceId}/industries/${i.id}` : `/industries/${i.id}`,
    }));

  const regions = REGIONS
    .filter((r) => !(exclude?.type === 'region' && exclude.id === r.id))
    .map((r) => ({ label: r.name, href: `/regions/${r.slug}` }));

  return (
    <section className={`py-16 sm:py-20 ${className}`} style={{ borderTop: '1px solid var(--border)' }}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <p className="text-meta font-mono uppercase mb-2" style={{ color: 'var(--text-muted)' }}>
          Keep exploring
        </p>
        <h2 className="text-h2 mb-10 font-semibold" style={{ color: 'var(--ink)' }}>
          One partner across every service, industry, and market
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
          <Column title="Services" links={services} />
          <Column title={serviceId ? 'This service by industry' : 'Industries'} links={industries} />
          <Column title="Regions" links={regions} />
        </div>
      </div>
    </section>
  );
}
