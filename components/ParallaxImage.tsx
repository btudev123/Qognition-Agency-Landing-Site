import React, { useRef } from 'react';
import { motion, useScroll, useTransform, useSpring } from 'framer-motion';

interface ParallaxImageProps {
  src: string;
  alt: string;
  className?: string;
  aspectRatio?: string;
}

const ParallaxImage: React.FC<ParallaxImageProps> = ({ 
  src, 
  alt, 
  className = "",
  aspectRatio = "aspect-video" 
}) => {
  const ref = useRef<HTMLDivElement>(null);
  
  // Track scroll progress of the container relative to the viewport
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"]
  });

  // Map scroll progress to vertical movement (parallax effect)
  // We move the image slightly opposite to the scroll direction
  const y = useTransform(scrollYProgress, [0, 1], ["-10%", "10%"]);
  
  // Smooth out the movement
  const smoothY = useSpring(y, { stiffness: 100, damping: 20 });

  return (
    <div ref={ref} className={`overflow-hidden relative ${aspectRatio} ${className}`}>
      <motion.img 
        src={src} 
        alt={alt}
        style={{ y: smoothY, scale: 1.15 }} // Scale up slightly to avoid empty edges during parallax
        className="w-full h-full object-cover absolute top-0 left-0"
      />
    </div>
  );
};

export default ParallaxImage;