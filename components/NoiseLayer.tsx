'use client';

// Film grain / noise texture overlay — gives premium printed-poster texture.
// Pure CSS SVG filter, zero JS runtime cost, GPU composited.
export default function NoiseLayer() {
  return (
    <>
      <style>{`
        .rf-noise-layer {
          position: fixed;
          inset: 0;
          width: 100%;
          height: 100%;
          pointer-events: none;
          z-index: 9998;
          opacity: 0.035;
          mix-blend-mode: overlay;
          background-image: url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)'/%3E%3C/svg%3E");
          background-repeat: repeat;
          background-size: 180px 180px;
        }
      `}</style>
      <div className="rf-noise-layer" aria-hidden="true" />
    </>
  );
}
