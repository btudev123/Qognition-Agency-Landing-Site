import React, { useRef, useEffect } from 'react';

const NeuronBackground: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d', { alpha: false }); // Optimization
    if (!ctx) return;

    let width = window.innerWidth;
    let height = window.innerHeight;
    canvas.width = width;
    canvas.height = height;

    const particles: Particle[] = [];
    // Drastically reduce particles on mobile for performance
    const isMobile = width < 768;
    const particleCount = isMobile ? 10 : 30; // Further reduced for performance
    const connectionDistance = isMobile ? 80 : 140;
    
    // Throttle mouse interaction
    let mouse = { x: -1000, y: -1000 };
    let animationFrameId: number;

    class Particle {
      x: number;
      y: number;
      vx: number;
      vy: number;
      size: number;

      constructor() {
        this.x = Math.random() * width;
        this.y = Math.random() * height;
        this.vx = (Math.random() - 0.5) * 0.2;
        this.vy = (Math.random() - 0.5) * 0.2;
        this.size = Math.random() * 1.5 + 0.5;
      }

      update() {
        this.x += this.vx;
        this.y += this.vy;

        if (this.x < 0 || this.x > width) this.vx *= -1;
        if (this.y < 0 || this.y > height) this.vy *= -1;

        // Skip mouse interaction on mobile to save cycles
        if (!isMobile) {
            const dx = mouse.x - this.x;
            const dy = mouse.y - this.y;
            const distSq = dx * dx + dy * dy;
            const mouseDistSq = 250 * 250;

            if (distSq < mouseDistSq) {
                const force = (mouseDistSq - distSq) / mouseDistSq;
                this.vx -= (dx / Math.sqrt(distSq)) * force * 0.05;
                this.vy -= (dy / Math.sqrt(distSq)) * force * 0.05;
            }
        }
      }

      draw() {
        if (!ctx) return;
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
        ctx.fill();
      }
    }

    for (let i = 0; i < particleCount; i++) {
      particles.push(new Particle());
    }

    const animate = () => {
      // Use solid fill instead of clearRect for trail effect removal (cleaner redraw)
      ctx.fillStyle = '#0B0B0B'; 
      ctx.fillRect(0, 0, width, height);
      
      ctx.fillStyle = 'rgba(255, 255, 255, 0.3)';
      ctx.strokeStyle = `rgba(0, 194, 168, 0.15)`;
      ctx.lineWidth = 0.5;

      // Update and Draw Particles
      for (let i = 0; i < particles.length; i++) {
        const p = particles[i];
        p.update();
        p.draw(); // Draw dot

        // Draw Connections
        for (let j = i + 1; j < particles.length; j++) {
            const p2 = particles[j];
            const dx = p.x - p2.x;
            const dy = p.y - p2.y;
            const distSq = dx * dx + dy * dy;

            if (distSq < connectionDistance * connectionDistance) {
                ctx.beginPath();
                ctx.moveTo(p.x, p.y);
                ctx.lineTo(p2.x, p2.y);
                ctx.stroke();
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

    const handleMouseMove = (e: MouseEvent) => {
      mouse.x = e.clientX;
      mouse.y = e.clientY;
    };

    window.addEventListener('resize', handleResize);
    if (!isMobile) window.addEventListener('mousemove', handleMouseMove);

    return () => {
      window.removeEventListener('resize', handleResize);
      if (!isMobile) window.removeEventListener('mousemove', handleMouseMove);
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="fixed top-0 left-0 w-full h-full pointer-events-none z-0"
    />
  );
};

export default NeuronBackground;