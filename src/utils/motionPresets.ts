export const easeOutExpo = [0.22, 1, 0.36, 1] as const;

const isMobileMotion = () => {
  if (typeof window === 'undefined') return false;
  return window.matchMedia(
    '(max-width: 768px), (hover: none) and (pointer: coarse), (prefers-reduced-motion: reduce)'
  ).matches;
};

const baseInitial = isMobileMotion() ? false : { opacity: 0, y: 30 };
const baseTransition = isMobileMotion()
  ? { duration: 0.16, ease: easeOutExpo }
  : { duration: 0.8, ease: easeOutExpo };

export const sectionReveal = {
  initial: baseInitial,
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, margin: isMobileMotion() ? '-20px' : '-80px' },
  transition: baseTransition,
};

export const contentReveal = {
  initial: baseInitial,
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, margin: isMobileMotion() ? '-12px' : '-100px' },
  transition: baseTransition,
};

export const cardReveal = (delay = 0) => ({
  initial: baseInitial,
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, margin: isMobileMotion() ? '-10px' : '-60px' },
  transition: isMobileMotion()
    ? { duration: 0.14, delay: 0, ease: easeOutExpo }
    : { duration: 0.7, delay, ease: easeOutExpo },
});
