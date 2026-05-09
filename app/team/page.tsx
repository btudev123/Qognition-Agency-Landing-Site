import SchemaScript from '../SchemaScript';
import { TEAM_MEMBERS } from '../../data/seoExpansion';
import { breadcrumbSchema, metadataFor, SITE_NAME, SITE_URL } from '../../lib/seo';

export const dynamic = 'force-static';

export const metadata = metadataFor({
  title: 'Meet the Team | Qognition Leadership',
  description: 'Meet the strategy, SEO, performance, and engineering leaders behind Qognition Agency.',
  path: '/team'
});

export default function Page() {
  return (
    <>
      <SchemaScript
        data={{
          '@context': 'https://schema.org',
          '@type': 'Organization',
          name: SITE_NAME,
          url: SITE_URL,
          employee: TEAM_MEMBERS.map((member) => ({
            '@type': 'Person',
            name: member.name,
            jobTitle: member.role,
            description: member.focus
          }))
        }}
      />
      <SchemaScript data={breadcrumbSchema([{ name: 'Home', path: '/' }, { name: 'Team', path: '/team' }])} />
      <main className="min-h-screen pt-32 px-6 md:px-12 pb-28">
        <section className="max-w-7xl mx-auto">
          <span className="text-teal-400 font-mono text-sm uppercase tracking-widest">Leadership</span>
          <h1 className="font-display text-5xl md:text-8xl leading-none mt-6 mb-8">Meet the Team Behind the Strategy</h1>
          <p className="text-xl text-gray-300 max-w-4xl leading-relaxed">
            Enterprise buyers want to know who is accountable for strategy. Qognition combines senior growth strategy, SEO systems, paid media, and engineering leadership.
          </p>
        </section>
        <section className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-6 mt-16">
          {TEAM_MEMBERS.map((member) => (
            <article key={member.slug} className="rounded-2xl border border-white/10 bg-white/[0.03] p-8">
              <div className="mb-8 h-20 w-20 rounded-2xl border border-white/10 bg-white/[0.05] flex items-center justify-center font-display text-3xl text-teal-300">
                {member.name.split(' ').map((part) => part[0]).join('').slice(0, 2)}
              </div>
              <h2 className="font-display text-3xl mb-2">{member.name}</h2>
              <p className="text-teal-400 mb-4">{member.role}</p>
              <p className="text-sm uppercase tracking-widest text-gray-500 mb-5">{member.focus}</p>
              <p className="text-gray-300 leading-relaxed">{member.bio}</p>
            </article>
          ))}
        </section>
      </main>
    </>
  );
}
