import type { Metadata } from 'next';
import Link from 'next/link';
const DELIVERY_ROLES = [
  { slug: 'strategy', name: 'Search strategy', role: 'Buyer research and prioritisation', focus: 'AI SEO · GEO · search intent', bio: 'Define the buyer questions, commercial pages and evidence that should guide the programme.' },
  { slug: 'technical', name: 'Technical delivery', role: 'Site access and measurement', focus: 'Technical SEO · analytics · lead capture', bio: 'Review crawlability, implementation requirements and the path from enquiry to sales follow-up.' },
  { slug: 'editorial', name: 'Content and evidence', role: 'Expert input and editorial review', focus: 'Commercial content · source review', bio: 'Turn subject-matter expertise into useful explanations, evaluation pages and documented claims.' },
  { slug: 'coordination', name: 'Client coordination', role: 'Scope, responsibilities and review', focus: 'Approvals · delivery dependencies · reporting', bio: 'Agree who owns each decision, what access is required and how progress will be assessed.' },
];
import { breadcrumbSchema } from '../../lib/schema';
import Section from '../../components/ui/Section';
import Heading from '../../components/ui/Heading';
import Badge from '../../components/ui/Badge';
import OfficeList from '../../components/shared/OfficeList';

export const dynamic = 'force-static';

export const metadata: Metadata = {
  title: 'Working with Qognition | AI SEO & GEO',
  description: 'How search strategy, technical delivery, editorial review and client coordination fit into a Qognition AI SEO and GEO engagement.',
  alternates: { canonical: '/team' },
};

export default function Page() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify([
            {
              '@context': 'https://schema.org',
              '@type': 'Organization',
              name: 'Qognition',
              url: 'https://www.qognitionagency.com',
            },
            breadcrumbSchema([{ name: 'Home', path: '/' }, { name: 'Team', path: '/team' }]),
          ]),
        }}
      />
      <main className="min-h-screen pt-36 pb-20 px-4 sm:px-6">
        <Section spacing="lg">
          <div className="max-w-3xl">
            <Badge className="mb-4">How we work</Badge>
            <Heading level="h1" className="mb-4">Know who owns the work</Heading>
            <p className="text-body text-[var(--text-muted)] max-w-3xl">
              An effective AI SEO and GEO programme needs clear ownership. Your proposal identifies the people responsible for delivery, reviews and communication. These are the responsibilities we agree before work starts.
            </p>
          </div>
        </Section>

        <Section spacing="lg">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {DELIVERY_ROLES.map((member) => (
              <article
                key={member.slug}
                className="rounded-2xl border border-[var(--border)] bg-[var(--card-bg)] p-8"
              >
                <div className="mb-8 h-20 w-20 rounded-2xl border border-[var(--border)] bg-[var(--surface)] flex items-center justify-center text-3xl font-bold text-[var(--accent)]">
                  {member.name
                    .split(' ')
                    .map((part) => part[0])
                    .join('')
                    .slice(0, 2)}
                </div>
                <h2 className="text-h2 text-[var(--text)] mb-2 font-semibold">{member.name}</h2>
                <p className="text-body text-[var(--accent)] mb-4">{member.role}</p>
                <p className="text-meta uppercase text-[var(--text-muted)] mb-5">{member.focus}</p>
                <p className="text-body text-[var(--text-muted)]">{member.bio}</p>
              </article>
            ))}
          </div>
          <section aria-labelledby="team-offices-heading" className="mt-12">
            <h2 id="team-offices-heading" className="text-h4 font-semibold text-[var(--text)] mb-4">Our offices</h2>
            <OfficeList labelledBy="team-offices-heading" className="grid-cols-1 sm:grid-cols-3 lg:grid-cols-5" />
            <p className="text-body text-[var(--text-muted)] mt-4 mb-0">We serve every other market remotely.</p>
          </section>
          <div className="mt-10 flex flex-wrap gap-4"><Link className="btn-primary" href="/book">Book a call</Link><Link className="btn-outline" href="/contact#enquiry">Send an enquiry</Link></div>
        </Section>
      </main>
    </>
  );
}
