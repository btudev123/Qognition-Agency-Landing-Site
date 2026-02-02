import React, { useRef, useEffect } from 'react';

const HeroOrb: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let width = window.innerWidth;
    let height = window.innerHeight;
    canvas.width = width;
    canvas.height = height;

    // Sphere parameters
    const globeRadius = width < 768 ? 120 : 200;
    const dotDensity = width < 768 ? 40 : 80; // Latitude lines
    const rotationSpeed = 0.002;
    let rotation = 0;
    
    // Mouse interaction
    let mouseX = 0;
    let mouseY = 0;
    let targetRotationX = 0;
    let targetRotationY = 0;

    const points: { x: number; y: number; z: number; originalX: number; originalY: number; originalZ: number }[] = [];

    // Generate points on a sphere
    for (let lat = 0; lat < dotDensity; lat++) {
      const theta = (lat * Math.PI) / dotDensity;
      const sinTheta = Math.sin(theta);
      const cosTheta = Math.cos(theta);

      const dotsOnLat = Math.round(dotDensity * 2 * sinTheta); // More dots on equator

      for (let lon = 0; lon < dotsOnLat; lon++) {
        const phi = (lon * 2 * Math.PI) / dotsOnLat;
        const x = globeRadius * sinTheta * Math.cos(phi);
        const y = globeRadius * cosTheta;
        const z = globeRadius * sinTheta * Math.sin(phi);

        points.push({ x, y, z, originalX: x, originalY: y, originalZ: z });
      }
    }

    const animate = () => {
      ctx.clearRect(0, 0, width, height);
      
      const cx = width / 2 + width * 0.15; // Offset to the right slightly
      const cy = height / 2;

      // Mouse influence
      targetRotationY += (mouseX - width / 2) * 0.00005;
      targetRotationX += (mouseY - height / 2) * 0.00005;

      rotation += rotationSpeed;

      points.forEach(p => {
        // Rotate around Y
        let x1 = p.x * Math.cos(rotation + targetRotationY * 0.1) - p.z * Math.sin(rotation + targetRotationY * 0.1);
        let z1 = p.z * Math.cos(rotation + targetRotationY * 0.1) + p.x * Math.sin(rotation + targetRotationY * 0.1);
        
        // Rotate around X
        let y1 = p.y * Math.cos(targetRotationX * 0.1) - z1 * Math.sin(targetRotationX * 0.1);
        let z2 = z1 * Math.cos(targetRotationX * 0.1) + p.y * Math.sin(targetRotationX * 0.1);

        // Perspective projection
        const scale = 400 / (400 + z2);
        const x2D = x1 * scale + cx;
        const y2D = y1 * scale + cy;

        // Draw points
        const alpha = (z2 + globeRadius) / (2 * globeRadius); // Fade back points
        if (alpha > 0) {
           ctx.fillStyle = `rgba(0, 194, 168, ${alpha})`;
           ctx.beginPath();
           ctx.arc(x2D, y2D, 1.5 * scale, 0, Math.PI * 2);
           ctx.fill();
           
           // Connect nearby points
           points.forEach(p2 => {
             const dx = p.x - p2.x;
             const dy = p.y - p2.y;
             const dz = p.z - p2.z;
             const dist = Math.sqrt(dx*dx + dy*dy + dz*dz);
             if (dist < 30 && Math.random() > 0.95) {
                // Occasional connections for "neural" look
                 ctx.strokeStyle = `rgba(0, 194, 168, ${alpha * 0.3})`;
                 ctx.lineWidth = 0.5;
                 ctx.beginPath();
                 ctx.moveTo(x2D, y2D);
                 
                 // Project p2
                 let x1_2 = p2.x * Math.cos(rotation) - p2.z * Math.sin(rotation);
                 let z1_2 = p2.z * Math.cos(rotation) + p2.x * Math.sin(rotation);
                 const scale2 = 400 / (400 + z1_2);
                 const x2D_2 = x1_2 * scale2 + cx;
                 const y2D_2 = p2.y * scale2 + cy;
                 
                 ctx.lineTo(x2D_2, y2D_2);
                 ctx.stroke();
             }
           });
        }
      });

      requestAnimationFrame(animate);
    };

    animate();

    const handleResize = () => {
      width = window.innerWidth;
      height = window.innerHeight;
      canvas.width = width;
      canvas.height = height;
    };
    
    const handleMouseMove = (e: MouseEvent) => {
        mouseX = e.clientX;
        mouseY = e.clientY;
    }

    window.addEventListener('resize', handleResize);
    window.addEventListener('mousemove', handleMouseMove);

    return () => {
      window.removeEventListener('resize', handleResize);
      window.removeEventListener('mousemove', handleMouseMove);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="absolute top-0 left-0 w-full h-full pointer-events-none z-0"
    />
  );
};

export default HeroOrb;