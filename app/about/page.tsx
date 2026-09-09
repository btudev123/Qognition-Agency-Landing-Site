import type { Metadata } from 'next';
import Link from 'next/link';
import { Target, Rocket, Zap, Globe, Users } from 'lucide-react';
import { organizationSchema, breadcrumbSchema } from '../../lib/schema';
import { ABOUT_DATA } from '../../constants';
import Heading from '../../components/ui/Heading';

export const metadata: Metadata = {
  title: 'About Qognition | AI-Native Growth Partner',
  description:
    'Qognition is an AI growth marketing partner for SEO, paid media, web, creative, content, and AI search visibility — built for founders who need qualified pipeline.',
  alternates: { canonical: '/about' },
};

export default function Page() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify([
            organizationSchema(),
            breadcrumbSchema([{ name: 'Home', path: '/' }, { name: 'About', path: '/about' }]),
          ]),
        }}
      />
      <main className="pt-32 pb-24 px-6 md:px-12 max-w-7xl mx-auto">
        <div className="max-w-5xl mx-auto mb-32">
          <Heading level="h1" className="!text-5xl md:!text-8xl mb-12">
            Engineering<br />
            <span className="text-[var(--accent)]">Digital Domination.</span>
          </Heading>
          <div className="text-xl md:text-3xl text-[var(--text-muted)] leading-relaxed space-y-8">
            <p>Qognition was founded on a simple premise: growth marketing should feel intelligent, creative, measurable, and fast.</p>
            <p>We built Qognition as an AI growth marketing partner: strategy, SEO, paid media, content, design, web engineering, analytics, and AI visibility working as one system.</p>
          </div>
        </div>

        <div className="mb-32">
          <div className="max-w-4xl mx-auto">
            <Heading level="h2" className="mb-8 text-center">Our Story</Heading>
            <div className="space-y-6 text-[var(--text-muted)] text-lg leading-relaxed">
              <p>Founded in 2020, Qognition Agency emerged from a frustration with traditional digital marketing agencies. We saw businesses being charged premium fees for generic strategies that rarely moved the needle on their bottom line.</p>
              <p>We set out to change that. Our founders, with backgrounds in data science, engineering, and creative marketing, built Qognition as a new kind of agency—one that combines the analytical rigor of a consultancy with the creative excellence of a top-tier agency.</p>
              <p>Today, we work with ambitious brands across the globe, from startups building their first acquisition system to established companies expanding into new markets. Our core philosophy remains the same: build beautiful growth systems that create qualified demand and can be measured honestly.</p>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mb-32 border-y border-[var(--border)] py-16">
          {ABOUT_DATA.stats.map((stat, i) => (
            <div key={i} className="text-center md:text-left">
              <div className="text-4xl md:text-6xl font-bold text-[var(--text)] mb-2">{stat.value}</div>
              <div className="text-sm text-[var(--text-muted)] uppercase tracking-widest">{stat.label}</div>
            </div>
          ))}
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-16 mb-32">
          <div className="p-12 rounded-2xl border border-[var(--border)] bg-[var(--card-bg)]">
            <Target className="text-[var(--accent)] mb-6" size={48} />
            <Heading level="h2" className="mb-6">Our Mission</Heading>
            <p className="text-body text-[var(--text-muted)]">{ABOUT_DATA.mission}</p>
          </div>
          <div className="p-12 rounded-2xl border border-[var(--accent)]/20 bg-[rgba(var(--accent-rgb),0.04)]">
            <Rocket className="text-[var(--accent)] mb-6" size={48} />
            <Heading level="h2" className="mb-6">Our Vision</Heading>
            <p className="text-body text-[var(--text-muted)]">{ABOUT_DATA.vision}</p>
          </div>
        </div>

        <div className="mb-32">
          <Heading level="h2" className="text-center mb-16 !text-4xl md:!text-6xl">Operating Principles</Heading>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-x-16 gap-y-12">
            {ABOUT_DATA.values.map((value, i) => (
              <div key={i} className="flex gap-6 border-t border-[var(--border)] pt-8">
                <div className="text-[var(--accent)] font-mono text-xl">0{i + 1}</div>
                <div>
                  <h3 className="text-h3 text-[var(--text)] mb-4 font-semibold">{value.title}</h3>
                  <p className="text-body text-[var(--text-muted)]">{value.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="mb-32">
          <Heading level="h2" className="text-center mb-16 !text-4xl md:!text-6xl">The Squad Model</Heading>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[{ icon: Zap, name: 'Growth Squad', focus: 'Acquisition, SEO, PPC.', roles: ['Performance Marketers', 'SEO Strategists', 'Data Analysts'] },
              { icon: Globe, name: 'Creative Squad', focus: 'Brand, UI/UX, Content.', roles: ['Art Directors', 'Motion Designers', 'UX Researchers'] },
              { icon: Users, name: 'Tech Squad', focus: 'Dev, Automation, AI.', roles: ['Full-Stack Engineers', 'AI Architects', 'DevOps'] }].map((squad) => (
              <div key={squad.name} className="p-8 border border-[var(--border)] rounded-xl hover:bg-[var(--ink)]/5 transition-colors">
                <squad.icon className="text-[var(--accent)] mb-6" size={32} />
                <h3 className="text-h3 text-[var(--text)] mb-4 font-semibold">{squad.name}</h3>
                <p className="text-body text-[var(--text-muted)] mb-4">Focus: {squad.focus}</p>
                <ul className="text-sm text-[var(--text-muted)] space-y-2">
                  {squad.roles.map((r) => <li key={r}>&bull; {r}</li>)}
                </ul>
              </div>
            ))}
          </div>
        </div>

        <div className="text-center py-24 border-t border-[var(--border)]">
          <Heading level="h2" className="mb-8 !text-4xl md:!text-6xl">Join the movement.</Heading>
          <p className="text-body text-[var(--text-muted)] mb-12 max-w-2xl mx-auto">We are always looking for world-class talent and ambitious partners.</p>
          <div className="flex flex-col md:flex-row justify-center gap-6 mb-12">
            <a href="https://api.leadconnectorhq.com/widget/bookings/discovery-call-qognition-agency" target="_blank" rel="noopener noreferrer" className="rounded-lg bg-[var(--accent)] text-[var(--accent-deep)] font-medium px-8 py-4 text-sm hover:brightness-110 transition-all">Book Strategy Call</a>
            <a href="mailto:hello@qognitionagency.com" className="rounded-lg border border-[var(--border)] text-[var(--text)] font-medium px-8 py-4 text-sm hover:border-[var(--accent)] hover:text-[var(--accent)] transition-all">Join the Team</a>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-16 text-left">
            {[{ label: 'Our Services', desc: 'Discover how we can help grow your business.', href: '/services' },
              { label: 'Case Studies', desc: "See the results we've delivered for our clients.", href: '/case-studies' },
              { label: 'Industries', desc: 'Learn about the sectors we specialize in.', href: '/industries' }].map((link) => (
              <Link key={link.href} href={link.href} className="p-6 border border-[var(--border)] rounded-xl hover:border-[var(--accent)]/40 transition-all">
                <h3 className="text-h3 text-[var(--text)] mb-3 font-semibold">{link.label}</h3>
                <p className="text-body text-[var(--text-muted)] mb-4">{link.desc}</p>
                <span className="text-[var(--accent)] text-sm">Explore &rarr;</span>
              </Link>
            ))}
          </div>
        </div>
      </main>
    </>
  );
}
