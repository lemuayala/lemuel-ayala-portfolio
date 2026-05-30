import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { ArrowUp } from 'lucide-react';
import { useIsMobileMotion } from '../hooks/useIsMobileMotion';

export const ScrollToTop = () => {
  const [scrollPosition, setScrollPosition] = useState(0);
  const isMobileMotion = useIsMobileMotion();

  useEffect(() => {
    const handleScroll = () => setScrollPosition(window.pageYOffset);
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: isMobileMotion ? 'auto' : 'smooth' });
  };

  const visible = scrollPosition > (isMobileMotion ? 420 : 240);

  return (
    <div className="fixed bottom-[max(0.9rem,env(safe-area-inset-bottom))] right-4 z-50 sm:bottom-6 sm:right-6">
      <motion.button
        initial={false}
        animate={
          visible
            ? { y: 0, opacity: 1, scale: 1 }
            : { y: isMobileMotion ? 22 : 60, opacity: 0, scale: 0.95 }
        }
        transition={
          isMobileMotion
            ? { duration: 0.2, ease: 'easeOut' }
            : { type: 'spring', stiffness: 260, damping: 24 }
        }
        onClick={scrollToTop}
        aria-label="Scroll to top"
        className={`h-11 w-11 rounded-full glass-panel flex items-center justify-center shadow-lg shadow-black/20 transition-colors ${
          visible ? 'pointer-events-auto' : 'pointer-events-none'
        } hover:bg-zinc-900/5 dark:hover:bg-white/10`}
      >
        <ArrowUp className="w-4 h-4" />
      </motion.button>
    </div>
  );
};
