import React from 'react';

interface TextRevealProps {
  children: string;
  className?: string;
  delay?: number;
}

const TextReveal: React.FC<TextRevealProps> = ({ children, className = "", delay = 0 }) => {
  const words = children.split(" ");
  void delay;

  return (
    <div
      className={`overflow-hidden flex flex-wrap gap-x-[0.25em] ${className}`}
    >
      {words.map((word, index) => (
        <span key={index} className="inline-block">
          {word}
        </span>
      ))}
    </div>
  );
};

export default TextReveal;
