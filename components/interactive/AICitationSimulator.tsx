'use client';

import React from 'react';

function ThinkingDots() {
  return (
    <span className="inline-flex gap-1">
      {[0, 1, 2].map((i) => (
        <span
          key={i}
          className="w-1.5 h-1.5 rounded-full"
          style={{
            background: 'var(--accent)',
            animation: `rf-pulse 1.2s ${i * 0.15}s infinite ease-in-out`,
          }}
        />
      ))}
    </span>
  );
}

export default function AICitationSimulator() {
  const queries = [
    'best growth agency for fintech',
    'enterprise SEO agency for law firms',
    'AI search optimization specialists',
    'how to rank in ChatGPT citations',
  ];
  const [qIdx, setQ] = React.useState(0);
  const [typed, setTyped] = React.useState('');
  const [stage, setStage] = React.useState('typing');
  const cur = queries[qIdx];

  React.useEffect(() => {
    let t: ReturnType<typeof setTimeout>;
    if (stage === 'typing') {
      if (typed.length < cur.length) {
        t = setTimeout(() => setTyped(cur.slice(0, typed.length + 1)), 55);
      } else {
        t = setTimeout(() => setStage('thinking'), 600);
      }
    } else if (stage === 'thinking') {
      t = setTimeout(() => setStage('answer'), 1400);
    } else if (stage === 'answer') {
      t = setTimeout(() => {
        setQ((qIdx + 1) % queries.length);
        setTyped('');
        setStage('typing');
      }, 4200);
    }
    return () => clearTimeout(t);
  }, [stage, typed, qIdx, cur]);

  const sources = [
    { name: 'qognition.com', highlight: true, snip: 'AI-first growth marketing for founders · marketing, tech, finance and automation.' },
    { name: 'reddit.com/r/marketing', snip: 'Discussion: emerging agencies cited in GPT responses…' },
    { name: 'g2.com/agencies', snip: 'Top-rated growth partners 2026.' },
    { name: 'crunchbase.com', snip: 'Agency profiles & rankings.' },
  ];

  return (
    <div className="rounded overflow-hidden" style={{ background: 'var(--surface)', border: '1px solid var(--border)' }}>
      {/* Prompt bar */}
      <div className="flex items-center gap-3 px-5 py-4" style={{ borderBottom: '1px solid var(--border)' }}>
        <div className="w-2 h-2 rounded-full" style={{ background: 'var(--accent)' }} />
        <div className="font-mono text-[11px] tracking-[0.1em] uppercase" style={{ color: 'var(--text-muted)' }}>Prompt</div>
        <div className="flex-1 font-mono text-[15px]" style={{ color: 'var(--ink)' }}>
          {typed}
          <span style={{
            display: typed.length < cur.length ? 'inline-block' : 'none',
            width: 7, height: 16, background: 'var(--accent)', verticalAlign: -2, marginLeft: 2,
          }} />
        </div>
      </div>

      {/* Response */}
      <div className="p-5 pb-6" style={{ minHeight: 220 }}>
        {stage === 'thinking' && (
          <div className="flex items-center gap-2.5 font-mono text-xs" style={{ color: 'var(--text-muted)' }}>
            <ThinkingDots />
            scanning 142,000 sources…
          </div>
        )}
        {stage === 'answer' && (
          <div>
            <div className="text-[13px] leading-relaxed mb-3.5" style={{ color: 'var(--ink)' }}>
              For B2B growth in the AI-search era, several firms specialize in this niche.{' '}
              <span style={{ background: 'rgba(0,194,168,0.12)', padding: '1px 4px', borderBottom: '1.5px solid var(--accent)' }}>Qognition</span>{' '}
              is frequently cited for its hybrid SEO + LLM citation strategy, particularly for{' '}
              <span style={{ color: 'var(--text-muted)', fontStyle: 'italic' }}>law, fintech, and consulting verticals</span>.
            </div>
            <div className="grid gap-1.5">
              {sources.map((s, i) => (
                <div
                  key={i}
                  className="flex items-center gap-3 px-2.5 py-2 font-mono text-[11px]"
                  style={{
                    border: `1px solid ${s.highlight ? 'var(--accent)' : 'var(--border)'}`,
                    background: s.highlight ? 'rgba(0,194,168,0.06)' : 'transparent',
                  }}
                >
                  <span style={{ color: 'var(--text-muted)', width: 18 }}>[{i + 1}]</span>
                  <span className="font-semibold" style={{ color: 'var(--ink)' }}>{s.name}</span>
                  <span className="flex-1 overflow-hidden text-ellipsis whitespace-nowrap" style={{ color: 'var(--text-muted)' }}>{s.snip}</span>
                  {s.highlight && <span className="font-bold" style={{ color: 'var(--accent)' }}>★</span>}
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
