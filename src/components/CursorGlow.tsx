import { useEffect, useState } from 'react';
import { motion, useMotionValue, useSpring } from 'framer-motion';

function useIsDarkTheme() {
  const [isDark, setIsDark] = useState(() =>
    document.documentElement.classList.contains('dark')
  );

  useEffect(() => {
    const el = document.documentElement;
    const sync = () => setIsDark(el.classList.contains('dark'));
    sync();
    const obs = new MutationObserver(sync);
    obs.observe(el, { attributes: true, attributeFilter: ['class'] });
    return () => obs.disconnect();
  }, []);

  return isDark;
}

/**
 * CursorGlow — efecto "lumos" premium.
 * Una luz radial sigue al cursor con un dot interior reactivo.
 * Se desactiva en dispositivos táctiles automáticamente.
 * En modo claro se evita mix-blend-screen (invisible sobre fondos claros).
 */
export const CursorGlow = () => {
  const isDark = useIsDarkTheme();
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
    const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)');

    const update = () => {
      const isLowEnd = document.documentElement.classList.contains('low-end-device');
      setIsCoarsePointer(!mq.matches || reducedMotion.matches || isLowEnd);
    };

    update();
    mq.addEventListener('change', update);
    reducedMotion.addEventListener('change', update);

    const obs = new MutationObserver(update);
    obs.observe(document.documentElement, { attributes: true, attributeFilter: ['class'] });

    return () => {
      mq.removeEventListener('change', update);
      reducedMotion.removeEventListener('change', update);
      obs.disconnect();
    };
  }, []);

  useEffect(() => {
    if (isCoarsePointer) {
      document.body.classList.remove('cursor-lumos');
      return;
    }
    document.body.classList.add('cursor-lumos');

    let rafId: number;

    const handleMove = (e: MouseEvent) => {
      cancelAnimationFrame(rafId);
      rafId = requestAnimationFrame(() => {
        x.set(e.clientX);
        y.set(e.clientY);
        if (!isVisible) setIsVisible(true);

        const target = e.target as HTMLElement | null;
        if (!target) return;
        const interactive = !!target.closest(
          'a, button, [role="button"], input, textarea, select, label'
        );
        setIsPointer((prev) => (prev !== interactive ? interactive : prev));
      });
    };

    const handleLeave = () => setIsVisible(false);
    const handleEnter = () => setIsVisible(true);

    window.addEventListener('mousemove', handleMove, { passive: true });
    document.addEventListener('mouseleave', handleLeave, { passive: true });
    document.addEventListener('mouseenter', handleEnter, { passive: true });
    return () => {
      cancelAnimationFrame(rafId);
      window.removeEventListener('mousemove', handleMove);
      document.removeEventListener('mouseleave', handleLeave);
      document.removeEventListener('mouseenter', handleEnter);
      document.body.classList.remove('cursor-lumos');
    };
  }, [x, y, isCoarsePointer, isVisible]);

  if (isCoarsePointer) return null;

  const glowBg = isDark
    ? 'radial-gradient(circle, rgba(96,165,250,0.22) 0%, rgba(167,139,250,0.12) 35%, transparent 65%)'
    : 'radial-gradient(circle, rgba(59,130,246,0.28) 0%, rgba(139,92,246,0.18) 40%, rgba(37,99,235,0.08) 58%, transparent 74%)';

  /** Mismo “vidrio” translúcido en ambos temas al hover en controles (como dark). */
  const interactiveDotGlass = {
    background: 'rgba(255, 255, 255, 0.08)',
    backdropFilter: 'blur(4px) saturate(180%)',
    WebkitBackdropFilter: 'blur(4px) saturate(180%)',
    border: isDark
      ? '1px solid rgba(255, 255, 255, 0.35)'
      : '1px solid rgba(255, 255, 255, 0.38)',
    boxShadow: '0 0 24px rgba(96, 165, 250, 0.35)',
  } as const;

  const dotStyles = isDark
    ? {
        background: isPointer
          ? interactiveDotGlass.background
          : 'rgba(255,255,255,0.85)',
        border: isPointer
          ? interactiveDotGlass.border
          : '1px solid rgba(255,255,255,0.4)',
        backdropFilter: isPointer
          ? interactiveDotGlass.backdropFilter
          : 'none',
        WebkitBackdropFilter: isPointer
          ? interactiveDotGlass.WebkitBackdropFilter
          : 'none',
        boxShadow: isPointer
          ? interactiveDotGlass.boxShadow
          : '0 0 12px rgba(255,255,255,0.4)',
      }
    : isPointer
      ? {
          ...interactiveDotGlass,
          /* Borde apenas más marcado en claro para que se lea sobre fondos blancos */
          border: '1px solid rgba(15, 23, 42, 0.07)',
        }
      : {
          background: 'rgba(37,99,235,0.95)',
          border: '1px solid rgba(59,130,246,0.55)',
          backdropFilter: 'none',
          WebkitBackdropFilter: 'none',
          boxShadow:
            '0 0 14px rgba(37,99,235,0.55), 0 0 28px rgba(59,130,246,0.35)',
        };

  return (
    <>
      {/* Glow grande */}
      <motion.div
        aria-hidden
        className={`pointer-events-none fixed left-0 top-0 z-[60] h-[520px] w-[520px] rounded-full ${
          isDark ? 'mix-blend-screen' : ''
        }`}
        style={{
          x: glowX,
          y: glowY,
          translateX: '-50%',
          translateY: '-50%',
          background: glowBg,
          filter: isDark ? 'blur(40px)' : 'blur(48px)',
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
          ...dotStyles,
          opacity: isVisible ? 1 : 0,
          transition:
            'width 200ms ease, height 200ms ease, background 200ms ease, opacity 200ms ease, box-shadow 200ms ease, border 200ms ease',
        }}
      />
    </>
  );
};
