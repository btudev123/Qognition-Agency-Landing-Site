import type { Metadata } from 'next';
import { TEAM_MEMBERS } from '../../data/seoExpansion';
import { breadcrumbSchema } from '../../lib/schema';
import Section from '../../components/ui/Section';
import Heading from '../../components/ui/Heading';
import Badge from '../../components/ui/Badge';

export const dynamic = 'force-static';

export const metadata: Metadata = {
  title: 'Meet the Team | Qognition',
  description: 'Meet the strategy, SEO, performance, and engineering leaders behind Qognition.',
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
              employee: TEAM_MEMBERS.map((member) => ({
                '@type': 'Person',
                name: member.name,
                jobTitle: member.role,
                description: member.focus,
              })),
            },
            breadcrumbSchema([{ name: 'Home', path: '/' }, { name: 'Team', path: '/team' }]),
          ]),
        }}
      />
      <main className="min-h-screen pt-36 pb-20 px-4 sm:px-6">
        <Section spacing="lg">
          <div className="max-w-3xl">
            <Badge className="mb-4">Leadership</Badge>
            <Heading level="h1" className="mb-4">Meet the Team Behind the Strategy</Heading>
            <p className="text-body text-[var(--text-muted)] max-w-3xl">
              Enterprise buyers want to know who is accountable for strategy. Qognition combines senior growth strategy, SEO systems, paid media, and engineering leadership.
            </p>
          </div>
        </Section>

        <Section spacing="lg">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {TEAM_MEMBERS.map((member) => (
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
        </Section>
      </main>
    </>
  );
}
