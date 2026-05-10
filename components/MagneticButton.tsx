import React from 'react';

interface MagneticButtonProps {
  children: React.ReactNode;
  className?: string;
  onClick?: () => void;
  variant?: 'primary' | 'secondary' | 'outline';
}

const MagneticButton: React.FC<MagneticButtonProps> = ({ children, className = '', onClick, variant = 'primary' }) => {
  const baseStyles = "relative px-8 py-4 rounded-full font-display font-medium text-sm uppercase tracking-wider transition-colors duration-300 flex items-center justify-center gap-2 overflow-hidden group";
  
  const variants = {
    primary: "bg-teal-400 text-black hover:bg-white",
    secondary: "bg-white text-black hover:bg-teal-400",
    outline: "border border-white/20 text-white hover:border-teal-400 hover:text-teal-400"
  };

  return (
    <div
      className={`inline-block cursor-pointer transition-transform duration-200 hover:-translate-y-0.5 ${className}`}
      onClick={onClick}
    >
      <div className={`${baseStyles} ${variants[variant]}`}>
        <span className="relative z-10 flex items-center gap-2">{children}</span>
      </div>
    </div>
  );
};

export default MagneticButton;
