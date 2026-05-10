
import React from 'react';

interface ParallaxImageProps {
  src: string;
  alt: string;
  className?: string;
  aspectRatio?: string;
  priority?: boolean;
}

const ParallaxImage: React.FC<ParallaxImageProps> = ({ 
  src, 
  alt, 
  className = "",
  aspectRatio = "aspect-video",
  priority = false
}) => {
  return (
    <div className={`overflow-hidden relative ${aspectRatio} ${className}`}>
      <img
        src={src} 
        alt={alt}
        className="w-full h-full object-cover absolute top-0 left-0 scale-[1.03] transition-transform duration-700 hover:scale-[1.08]"
        loading={priority ? "eager" : "lazy"}
        decoding="async"
      />
    </div>
  );
};

export default ParallaxImage;
