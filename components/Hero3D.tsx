'use client';

import { useRef, useEffect, useState } from 'react';
import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion';

const SPOKES_VISUAL = [
  { label: 'Marketing', accent: '#7C3AED', stat: '$500M+', note: 'Revenue driven' },
  { label: 'Tech', accent: '#2563EB', stat: '200+', note: 'Products shipped' },
  { label: 'Finance', accent: '#059669', stat: '$50M+', note: 'Assets managed' },
  { label: 'Automation', accent: '#F59E0B', stat: '1,000+', note: 'Workflows built' },
];

export default function Hero3D() {
  const containerRef = useRef<HTMLDivElement>(null);
  const cardRef = useRef<HTMLDivElement>(null);
  const [isMounted, setIsMounted] = useState(false);

  const mouseX = useMotionValue(0.5);
  const mouseY = useMotionValue(0.5);

  const smoothX = useSpring(mouseX, { stiffness: 55, damping: 20, restDelta: 0.001 });
  const smoothY = useSpring(mouseY, { stiffness: 55, damping: 20, restDelta: 0.001 });

  const rotateY = useTransform(smoothX, [0, 1], [-15, 15]);
  const rotateX = useTransform(smoothY, [0, 1], [-8, 8]);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  useEffect(() => {
    if (!isMounted) return;
    const section = containerRef.current?.closest('section');
    if (!section) return;

    const onMove = (e: MouseEvent) => {
      const r = section.getBoundingClientRect();
      const nx = Math.max(0, Math.min(1, (e.clientX - r.left) / r.width));
      const ny = Math.max(0, Math.min(1, (e.clientY - r.top) / r.height));
      mouseX.set(nx);
      mouseY.set(ny);

      if (cardRef.current) {
        const cr = cardRef.current.getBoundingClientRect();
        const cx = ((e.clientX - cr.left) / cr.width) * 100;
        const cy = ((e.clientY - cr.top) / cr.height) * 100;
        cardRef.current.style.setProperty('--sx', `${cx}%`);
        cardRef.current.style.setProperty('--sy', `${cy}%`);
      }
    };

    const onLeave = () => {
      mouseX.set(0.5);
      mouseY.set(0.5);
      if (cardRef.current) {
        cardRef.current.style.setProperty('--sx', '50%');
        cardRef.current.style.setProperty('--sy', '50%');
      }
    };

    section.addEventListener('mousemove', onMove);
    section.addEventListener('mouseleave', onLeave);
    return () => {
      section.removeEventListener('mousemove', onMove);
      section.removeEventListener('mouseleave', onLeave);
    };
  }, [isMounted, mouseX, mouseY]);

  if (!isMounted) return null;

  return (
    <div
      ref={containerRef}
      className="absolute inset-0 pointer-events-none overflow-hidden hidden lg:flex items-center justify-end"
      aria-hidden="true"
    >
      {/* Ambient glow */}
      <div
        className="absolute right-[8%] top-1/2 -translate-y-1/2 w-[480px] h-[480px] rounded-full"
        style={{
          background: 'radial-gradient(circle, rgba(0,194,168,0.18) 0%, transparent 68%)',
          filter: 'blur(48px)',
          pointerEvents: 'none',
        }}
      />

      {/* 3D perspective container */}
      <div
        className="relative mr-[7%]"
        style={{ perspective: '1100px', width: 520, height: 520 }}
      >
        <motion.div
          style={{
            rotateX,
            rotateY,
            transformStyle: 'preserve-3d',
            width: '100%',
            height: '100%',
            position: 'relative',
          }}
        >
          {/* Depth shadow — deepest layer */}
          <div
            style={{
              position: 'absolute',
              inset: '14px',
              transform: 'translateZ(-64px)',
              background: 'rgba(10,10,10,0.04)',
              border: '1px solid var(--border)',
            }}
          />

          {/* Grid texture — mid-back layer */}
          <div
            style={{
              position: 'absolute',
              inset: '7px',
              transform: 'translateZ(-28px)',
              background: 'var(--surface)',
              border: '1px solid var(--border)',
              backgroundImage:
                'radial-gradient(circle, rgba(10,10,10,0.065) 1px, transparent 1px)',
              backgroundSize: '22px 22px',
            }}
          />

          {/* Main card */}
          <div
            ref={cardRef}
            style={{
              position: 'absolute',
              inset: 0,
              transform: 'translateZ(22px)',
              background: 'var(--surface)',
              border: '1px solid rgba(10,10,10,0.09)',
              boxShadow:
                '0 2px 4px rgba(0,0,0,0.04), 0 8px 24px rgba(0,0,0,0.06), 0 32px 80px rgba(0,0,0,0.09)',
            } as React.CSSProperties}
          >
            {/* Mouse spotlight */}
            <div
              style={{
                position: 'absolute',
                inset: 0,
                background:
                  'radial-gradient(circle at var(--sx, 50%) var(--sy, 50%), rgba(255,255,255,0.16) 0%, transparent 52%)',
                pointerEvents: 'none',
                zIndex: 1,
              }}
            />

            {/* Content */}
            <div
              style={{
                position: 'relative',
                zIndex: 2,
                padding: '36px',
                height: '100%',
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'space-between',
              }}
            >
              {/* Header */}
              <div>
                <div
                  style={{
                    fontFamily: 'JetBrains Mono, monospace',
                    fontSize: 9,
                    letterSpacing: '0.20em',
                    textTransform: 'uppercase',
                    color: 'var(--text-muted)',
                    marginBottom: 14,
                  }}
                >
                  Operating System · v1.0
                </div>
                <div
                  style={{
                    fontSize: 38,
                    fontWeight: 500,
                    letterSpacing: '-0.045em',
                    lineHeight: 1,
                    color: 'var(--ink)',
                  }}
                >
                  Qognition
                </div>
                <div
                  style={{
                    fontFamily: 'JetBrains Mono, monospace',
                    fontSize: 10,
                    letterSpacing: '0.12em',
                    textTransform: 'uppercase',
                    color: 'var(--accent)',
                    marginTop: 6,
                  }}
                >
                  For Founders
                </div>
              </div>

              {/* 4-spoke grid */}
              <div
                style={{
                  display: 'grid',
                  gridTemplateColumns: '1fr 1fr',
                  gap: 10,
                  flex: 1,
                  margin: '28px 0',
                }}
              >
                {SPOKES_VISUAL.map((spoke) => (
                  <div
                    key={spoke.label}
                    style={{
                      padding: '18px',
                      border: '1px solid var(--border)',
                      background: 'var(--bg)',
                      display: 'flex',
                      flexDirection: 'column',
                      justifyContent: 'space-between',
                      minHeight: 100,
                    }}
                  >
                    <div
                      style={{
                        display: 'flex',
                        alignItems: 'center',
                        gap: 8,
                        marginBottom: 12,
                      }}
                    >
                      <div
                        style={{
                          width: 7,
                          height: 7,
                          borderRadius: '50%',
                          background: spoke.accent,
                          flexShrink: 0,
                        }}
                      />
                      <span
                        style={{
                          fontSize: 12,
                          fontWeight: 500,
                          letterSpacing: '-0.01em',
                          color: 'var(--ink)',
                        }}
                      >
                        {spoke.label}
                      </span>
                    </div>
                    <div>
                      <div
                        style={{
                          fontSize: 22,
                          fontWeight: 500,
                          letterSpacing: '-0.03em',
                          color: 'var(--ink)',
                          lineHeight: 1,
                          fontFeatureSettings: '"tnum"',
                        }}
                      >
                        {spoke.stat}
                      </div>
                      <div
                        style={{
                          fontFamily: 'JetBrains Mono, monospace',
                          fontSize: 9,
                          letterSpacing: '0.10em',
                          textTransform: 'uppercase',
                          color: 'var(--text-muted)',
                          marginTop: 4,
                        }}
                      >
                        {spoke.note}
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              {/* Footer */}
              <div
                style={{
                  borderTop: '1px solid var(--border)',
                  paddingTop: 14,
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                }}
              >
                <span
                  style={{
                    fontFamily: 'JetBrains Mono, monospace',
                    fontSize: 9,
                    letterSpacing: '0.13em',
                    textTransform: 'uppercase',
                    color: 'var(--text-faint)',
                  }}
                >
                  Est. 2019 · NYC · LDN · DXB
                </span>
                <span
                  style={{
                    fontFamily: 'JetBrains Mono, monospace',
                    fontSize: 9,
                    letterSpacing: '0.13em',
                    textTransform: 'uppercase',
                    color: 'var(--accent)',
                  }}
                >
                  ◉ Live
                </span>
              </div>
            </div>
          </div>

          {/* Floating accent ring — foreground */}
          <div
            style={{
              position: 'absolute',
              top: -18,
              right: -18,
              width: 72,
              height: 72,
              transform: 'translateZ(82px)',
              border: '1px solid var(--accent)',
              borderRadius: '50%',
              opacity: 0.45,
            }}
          />

          {/* Inner ring */}
          <div
            style={{
              position: 'absolute',
              top: -6,
              right: -6,
              width: 48,
              height: 48,
              transform: 'translateZ(64px)',
              border: '1px solid var(--accent)',
              borderRadius: '50%',
              opacity: 0.22,
            }}
          />

          {/* Dot grid — floating bottom-left */}
          <div
            style={{
              position: 'absolute',
              bottom: -14,
              left: -14,
              transform: 'translateZ(54px)',
              display: 'grid',
              gridTemplateColumns: 'repeat(5, 1fr)',
              gap: 5,
              opacity: 0.35,
            }}
          >
            {Array.from({ length: 25 }).map((_, i) => (
              <div
                key={i}
                style={{
                  width: 3,
                  height: 3,
                  borderRadius: '50%',
                  background: 'var(--ink)',
                }}
              />
            ))}
          </div>

          {/* Floating corner line — top-left */}
          <div
            style={{
              position: 'absolute',
              top: -24,
              left: 0,
              transform: 'translateZ(48px)',
              display: 'flex',
              flexDirection: 'column',
              gap: 4,
              opacity: 0.25,
            }}
          >
            <div style={{ width: 48, height: 1, background: 'var(--ink)' }} />
            <div style={{ width: 28, height: 1, background: 'var(--ink)' }} />
          </div>
        </motion.div>
      </div>
    </div>
  );
}
