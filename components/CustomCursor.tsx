'use client';

import { useEffect, useState } from 'react';
import { motion, useMotionValue, useSpring } from 'framer-motion';

export default function CustomCursor() {
  const [isMounted, setIsMounted] = useState(false);
  const [isHovering, setIsHovering] = useState(false);
  const [isClicking, setIsClicking] = useState(false);

  const mouseX = useMotionValue(-100);
  const mouseY = useMotionValue(-100);

  // Dot follows immediately
  const dotX = useSpring(mouseX, { stiffness: 800, damping: 35 });
  const dotY = useSpring(mouseY, { stiffness: 800, damping: 35 });

  // Ring lags behind for the trailing feel
  const ringX = useSpring(mouseX, { stiffness: 120, damping: 20 });
  const ringY = useSpring(mouseY, { stiffness: 120, damping: 20 });

  useEffect(() => {
    setIsMounted(true);

    const onMove = (e: MouseEvent) => {
      mouseX.set(e.clientX);
      mouseY.set(e.clientY);
    };

    const onDown = () => setIsClicking(true);
    const onUp = () => setIsClicking(false);

    const onEnterInteractive = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      if (target.closest('a, button, [data-cursor="magnetic"], [role="button"]')) {
        setIsHovering(true);
      }
    };

    const onLeaveInteractive = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      if (target.closest('a, button, [data-cursor="magnetic"], [role="button"]')) {
        setIsHovering(false);
      }
    };

    window.addEventListener('mousemove', onMove);
    window.addEventListener('mousedown', onDown);
    window.addEventListener('mouseup', onUp);
    document.addEventListener('mouseover', onEnterInteractive);
    document.addEventListener('mouseout', onLeaveInteractive);

    return () => {
      window.removeEventListener('mousemove', onMove);
      window.removeEventListener('mousedown', onDown);
      window.removeEventListener('mouseup', onUp);
      document.removeEventListener('mouseover', onEnterInteractive);
      document.removeEventListener('mouseout', onLeaveInteractive);
    };
  }, [mouseX, mouseY]);

  if (!isMounted) return null;

  const ringSize = isHovering ? 56 : isClicking ? 20 : 36;
  const dotSize = isHovering ? 4 : isClicking ? 12 : 8;

  return (
    <div className="hidden lg:block" aria-hidden="true">
      {/* Outer ring — lags */}
      <motion.div
        className="rf-cursor-ring"
        style={{
          x: ringX,
          y: ringY,
          translateX: '-50%',
          translateY: '-50%',
        }}
        animate={{
          width: ringSize,
          height: ringSize,
          border: isHovering
            ? '1.5px solid rgba(20,184,166, 0.9)'
            : '1.5px solid rgba(250, 250, 248, 0.5)',
          opacity: isHovering ? 1 : 0.65,
        }}
        transition={{ duration: 0.2, ease: [0.22, 1, 0.36, 1] }}
      />

      {/* Inner dot — snappy */}
      <motion.div
        className="rf-cursor-dot"
        style={{
          x: dotX,
          y: dotY,
          translateX: '-50%',
          translateY: '-50%',
          backgroundColor: isHovering ? 'var(--accent)' : '#FAFAF8',
        }}
        animate={{
          width: dotSize,
          height: dotSize,
          opacity: isClicking ? 0.5 : 1,
        }}
        transition={{ duration: 0.15 }}
      />
    </div>
  );
}
