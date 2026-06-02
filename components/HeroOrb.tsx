'use client';

import React, { useRef, useEffect } from 'react';

const HeroOrb: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReducedMotion) return;

    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d', { alpha: true });
    if (!ctx) return;

    let width = window.innerWidth;
    let height = window.innerHeight;
    canvas.width = width;
    canvas.height = height;

    const isMobile = width < 768;
    const globeRadius = isMobile ? 130 : 200;
    const dotDensity = isMobile ? 36 : 52;
    const rotationSpeed = 0.0008;
    let rotation = 0;
    let animationFrameId: number;

    const points: { x: number; y: number; z: number }[] = [];

    for (let lat = 0; lat < dotDensity; lat++) {
      const theta = (lat * Math.PI) / dotDensity;
      const sinTheta = Math.sin(theta);
      const cosTheta = Math.cos(theta);
      const dotsOnLat = Math.round(dotDensity * 2 * sinTheta);

      for (let lon = 0; lon < dotsOnLat; lon++) {
        const phi = (lon * 2 * Math.PI) / dotsOnLat;
        const x = globeRadius * sinTheta * Math.cos(phi);
        const y = globeRadius * cosTheta;
        const z = globeRadius * sinTheta * Math.sin(phi);
        points.push({ x, y, z });
      }
    }

    const animate = () => {
      ctx.clearRect(0, 0, width, height);

      // Offset: right side on desktop, centered on mobile
      const cx = isMobile ? width / 2 : width / 2 + width * 0.14;
      const cy = height * 0.44;

      rotation += rotationSpeed;
      const cosRot = Math.cos(rotation);
      const sinRot = Math.sin(rotation);

      for (let i = 0; i < points.length; i++) {
        const p = points[i];
        const x1 = p.x * cosRot - p.z * sinRot;
        const z1 = p.z * cosRot + p.x * sinRot;

        const scale = 400 / (400 + z1);
        const x2D = x1 * scale + cx;
        const y2D = p.y * scale + cy;

        if (scale > 0) {
          // Front hemisphere: bright teal
          const depthAlpha = (z1 + globeRadius) / (2 * globeRadius);

          if (depthAlpha > 0.5) {
            // Front dots — bright
            const alpha = (depthAlpha - 0.5) * 2;
            ctx.beginPath();
            ctx.arc(x2D, y2D, 1.8 * scale, 0, Math.PI * 2);
            ctx.fillStyle = `rgba(20,184,166, ${0.75 * alpha})`;
            ctx.fill();
          } else if (depthAlpha > 0.1) {
            // Back hemisphere — dimmer, slightly purple tint
            const alpha = depthAlpha * 0.6;
            ctx.beginPath();
            ctx.arc(x2D, y2D, 1.2 * scale, 0, Math.PI * 2);
            ctx.fillStyle = `rgba(124, 100, 220, ${0.3 * alpha})`;
            ctx.fill();
          }
        }
      }

      animationFrameId = requestAnimationFrame(animate);
    };

    animate();

    const handleResize = () => {
      width = window.innerWidth;
      height = window.innerHeight;
      canvas.width = width;
      canvas.height = height;
    };

    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="absolute top-0 left-0 w-full h-full pointer-events-none z-0"
      style={{ opacity: 0.85 }}
    />
  );
};

export default HeroOrb;
