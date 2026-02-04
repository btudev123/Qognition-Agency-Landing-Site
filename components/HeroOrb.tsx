import React, { useRef, useEffect } from 'react';

const HeroOrb: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d', { alpha: true }); // optimize
    if (!ctx) return;

    let width = window.innerWidth;
    let height = window.innerHeight;
    canvas.width = width;
    canvas.height = height;

    // Reduced density for mobile for better INP/FPS
    const isMobile = width < 768;
    const globeRadius = isMobile ? 100 : 200;
    const dotDensity = isMobile ? 25 : 60; 
    const rotationSpeed = 0.001; // Slower rotation for elegance
    let rotation = 0;
    
    let animationFrameId: number;

    const points: { x: number; y: number; z: number }[] = [];

    // Generate points
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
      
      const cx = width / 2 + (isMobile ? 0 : width * 0.15);
      const cy = height / 2;

      rotation += rotationSpeed;
      const cosRot = Math.cos(rotation);
      const sinRot = Math.sin(rotation);

      // Batch drawing operations
      ctx.fillStyle = `rgba(0, 194, 168, 0.6)`;
      
      for (let i = 0; i < points.length; i++) {
        const p = points[i];
        
        // Simple Y-axis rotation
        const x1 = p.x * cosRot - p.z * sinRot;
        const z1 = p.z * cosRot + p.x * sinRot;
        
        // Perspective
        const scale = 400 / (400 + z1);
        const x2D = x1 * scale + cx;
        const y2D = p.y * scale + cy;

        // Culling
        if (scale > 0 && z1 > -100) {
           const alpha = (z1 + globeRadius) / (2 * globeRadius);
           // Only draw visible points
           if (alpha > 0.1) {
             ctx.beginPath();
             ctx.arc(x2D, y2D, 1.5 * scale, 0, Math.PI * 2);
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
      className="absolute top-0 left-0 w-full h-full pointer-events-none z-0 opacity-60"
    />
  );
};

export default HeroOrb;