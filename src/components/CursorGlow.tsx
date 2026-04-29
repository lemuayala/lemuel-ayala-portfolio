import { useEffect, useState } from 'react';
import { motion, useMotionValue, useSpring } from 'framer-motion';

/**
 * CursorGlow — efecto "lumos" premium.
 * Una luz radial sigue al cursor con un dot interior reactivo.
 * Se desactiva en dispositivos táctiles automáticamente.
 */
export const CursorGlow = () => {
  const [isCoarsePointer, setIsCoarsePointer] = useState(true);
  const [isPointer, setIsPointer] = useState(false);
  const [isVisible, setIsVisible] = useState(false);

  const x = useMotionValue(-200);
  const y = useMotionValue(-200);

  // Glow grande con resorte suave
  const glowX = useSpring(x, { damping: 30, stiffness: 150, mass: 0.6 });
  const glowY = useSpring(y, { damping: 30, stiffness: 150, mass: 0.6 });

  // Dot interior más reactivo
  const dotX = useSpring(x, { damping: 25, stiffness: 500, mass: 0.3 });
  const dotY = useSpring(y, { damping: 25, stiffness: 500, mass: 0.3 });

  useEffect(() => {
    const mq = window.matchMedia('(hover: hover) and (pointer: fine)');
    const update = () => setIsCoarsePointer(!mq.matches);
    update();
    mq.addEventListener('change', update);
    return () => mq.removeEventListener('change', update);
  }, []);

  useEffect(() => {
    if (isCoarsePointer) {
      document.body.classList.remove('cursor-lumos');
      return;
    }
    document.body.classList.add('cursor-lumos');

    const handleMove = (e: MouseEvent) => {
      x.set(e.clientX);
      y.set(e.clientY);
      if (!isVisible) setIsVisible(true);

      const target = e.target as HTMLElement | null;
      if (!target) return;
      const interactive = !!target.closest(
        'a, button, [role="button"], input, textarea, select, label'
      );
      setIsPointer(interactive);
    };

    const handleLeave = () => setIsVisible(false);
    const handleEnter = () => setIsVisible(true);

    window.addEventListener('mousemove', handleMove);
    document.addEventListener('mouseleave', handleLeave);
    document.addEventListener('mouseenter', handleEnter);
    return () => {
      window.removeEventListener('mousemove', handleMove);
      document.removeEventListener('mouseleave', handleLeave);
      document.removeEventListener('mouseenter', handleEnter);
      document.body.classList.remove('cursor-lumos');
    };
  }, [x, y, isCoarsePointer, isVisible]);

  if (isCoarsePointer) return null;

  return (
    <>
      {/* Glow grande */}
      <motion.div
        aria-hidden
        className="pointer-events-none fixed left-0 top-0 z-[60] h-[520px] w-[520px] rounded-full mix-blend-screen"
        style={{
          x: glowX,
          y: glowY,
          translateX: '-50%',
          translateY: '-50%',
          background:
            'radial-gradient(circle, rgba(96,165,250,0.22) 0%, rgba(167,139,250,0.12) 35%, transparent 65%)',
          filter: 'blur(40px)',
          opacity: isVisible ? 1 : 0,
          transition: 'opacity 300ms ease',
        }}
      />

      {/* Dot interior */}
      <motion.div
        aria-hidden
        className="pointer-events-none fixed left-0 top-0 z-[61] rounded-full"
        style={{
          x: dotX,
          y: dotY,
          translateX: '-50%',
          translateY: '-50%',
          width: isPointer ? 44 : 8,
          height: isPointer ? 44 : 8,
          background: isPointer
            ? 'rgba(255,255,255,0.08)'
            : 'rgba(255,255,255,0.85)',
          border: isPointer
            ? '1px solid rgba(255,255,255,0.35)'
            : '1px solid rgba(255,255,255,0.4)',
          backdropFilter: isPointer ? 'blur(4px)' : 'none',
          boxShadow: isPointer
            ? '0 0 24px rgba(96,165,250,0.35)'
            : '0 0 12px rgba(255,255,255,0.4)',
          opacity: isVisible ? 1 : 0,
          transition:
            'width 200ms ease, height 200ms ease, background 200ms ease, opacity 200ms ease, box-shadow 200ms ease',
        }}
      />
    </>
  );
};
