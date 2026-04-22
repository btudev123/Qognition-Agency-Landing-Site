import React, { useRef, useState } from 'react';
import { motion } from 'framer-motion';

interface MagneticButtonProps {
  children: React.ReactNode;
  className?: string;
  onClick?: () => void;
  variant?: 'primary' | 'secondary' | 'outline';
}

const MagneticButton: React.FC<MagneticButtonProps> = ({ children, className = '', onClick, variant = 'primary' }) => {
  const ref = useRef<HTMLDivElement>(null);
  const [position, setPosition] = useState({ x: 0, y: 0 });

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const { clientX, clientY } = e;
    const { left, top, width, height } = ref.current?.getBoundingClientRect() || { left: 0, top: 0, width: 0, height: 0 };
    const center = { x: left + width / 2, y: top + height / 2 };
    const distance = { x: clientX - center.x, y: clientY - center.y };

    setPosition({ x: distance.x * 0.15, y: distance.y * 0.15 });
  };

  const handleMouseLeave = () => {
    setPosition({ x: 0, y: 0 });
  };

  const baseStyles = "relative px-8 py-4 rounded-full font-display font-medium text-sm uppercase tracking-wider transition-colors duration-300 flex items-center justify-center gap-2 overflow-hidden group";
  
  const variants = {
    primary: "bg-teal-400 text-black hover:bg-white",
    secondary: "bg-white text-black hover:bg-teal-400",
    outline: "border border-white/20 text-white hover:border-teal-400 hover:text-teal-400"
  };

  return (
    <motion.div
      ref={ref}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      animate={{ x: position.x, y: position.y }}
      transition={{ type: "spring", stiffness: 150, damping: 15, mass: 0.1 }}
      className={`inline-block cursor-pointer ${className}`}
      onClick={onClick}
    >
      <div className={`${baseStyles} ${variants[variant]}`}>
        <span className="relative z-10 flex items-center gap-2">{children}</span>
      </div>
    </motion.div>
  );
};

export default MagneticButton;