'use client';

import Link from 'next/link';
import { ArrowRight, Calendar, Clock, Video, CheckCircle } from 'lucide-react';
import type { SpokeId } from '../../lib/spokes';
import { SPOKES } from '../../lib/spokes';
import ScrollReveal from '../shared/ScrollReveal';
import MaskReveal from '../shared/MaskReveal';
import CalendlyEmbed from '../shared/CalendlyEmbed';

export default function SpokeBookPage({ spoke }: { spoke: SpokeId }) {
  const config = SPOKES[spoke];

  return (
    <main className="min-h-screen">
      {/* Hero */}
      <section className="relative px-6 md:px-12 pt-32 pb-16 overflow-hidden">
        <div className="absolute top-1/3 right-0 w-[400px] h-[400px] bg-[var(--accent)]/5 blur-[100px] rounded-full pointer-events-none" />
        <div className="relative z-10 max-w-7xl mx-auto">
          <ScrollReveal>
            <Link
              href={`/${spoke}`}
              className="inline-flex items-center gap-2 font-mono text-xs uppercase tracking-widest text-[var(--text-muted)] hover:text-[var(--accent)] transition-colors mb-6"
            >
              ← {config.label}
            </Link>
          </ScrollReveal>

          <MaskReveal>
            <h1 className="text-[clamp(36px,6vw,64px)] font-semibold leading-[1.05] text-[var(--ink)] max-w-3xl text-balance">
              Book a {config.label} Strategy Call
            </h1>
          </MaskReveal>

          <ScrollReveal stagger={150}>
            <p className="mt-6 text-lg text-[var(--text-muted)] max-w-2xl leading-relaxed">
              Pick a time that works for you. We&apos;ll discuss your current situation, answer your questions, and map out what working together could look like. No commitment, no pitch — just a conversation.
            </p>
          </ScrollReveal>

          {/* What to expect */}
          <ScrollReveal stagger={300}>
            <div className="mt-10 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
              {[
                { icon: Clock, title: '30 Minutes', desc: 'Focused, efficient, and respectful of your time' },
                { icon: Video, title: 'Video Call', desc: 'Google Meet or Zoom — whatever you prefer' },
                { icon: Calendar, title: 'Same Week', desc: 'Most calls scheduled within 2-3 business days' },
                { icon: CheckCircle, title: 'No Pitch', desc: 'We listen first. Recommendations come after understanding.' },
              ].map((item) => (
                <div key={item.title} className="rounded-xl border border-[var(--border)] bg-[var(--surface)] p-5">
                  <item.icon size={20} className="text-[var(--accent)] mb-3" />
                  <h3 className="font-semibold text-[var(--ink)] text-sm mb-1">{item.title}</h3>
                  <p className="text-xs text-[var(--text-muted)] leading-relaxed">{item.desc}</p>
                </div>
              ))}
            </div>
          </ScrollReveal>
        </div>
      </section>

      {/* Calendly */}
      <section className="px-6 md:px-12 pb-20">
        <div className="max-w-4xl mx-auto">
          <ScrollReveal>
            <div className="rounded-2xl border border-[var(--border)] bg-[var(--surface)] overflow-hidden min-h-[500px] sm:min-h-[600px] md:min-h-[700px]">
              <CalendlyEmbed url={config.calLink} />
            </div>
          </ScrollReveal>
        </div>
      </section>

      {/* Alternative: Not ready for a call? */}
      <section className="px-6 md:px-12 py-20 bg-[var(--bg-warm)]">
        <div className="max-w-xl mx-auto text-center">
          <ScrollReveal>
            <h2 className="text-2xl font-semibold text-[var(--ink)] mb-4">
              Not ready for a call?
            </h2>
            <p className="text-[var(--text-muted)] mb-8 leading-relaxed">
              Start with a free audit instead. We&apos;ll review your current setup and send a personalized report within 48 hours — no call required.
            </p>
            <Link
              href={`/${spoke}/audit`}
              className="inline-flex items-center gap-2 rounded-lg bg-[var(--accent)] px-6 py-3 text-sm font-medium text-[var(--accent-deep)] hover:brightness-110 transition-all"
            >
              Get Free Audit <ArrowRight size={16} />
            </Link>
          </ScrollReveal>
        </div>
      </section>
    </main>
  );
}
