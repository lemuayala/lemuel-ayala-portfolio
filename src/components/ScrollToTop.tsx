import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { ArrowUp } from 'lucide-react';

export const ScrollToTop = () => {
  const [scrollPosition, setScrollPosition] = useState(0);

  useEffect(() => {
    const handleScroll = () => setScrollPosition(window.pageYOffset);
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const visible = scrollPosition > 240;

  return (
    <div className="fixed bottom-6 right-6 z-50">
      <motion.button
        initial={{ y: 60, opacity: 0 }}
        animate={
          visible ? { y: 0, opacity: 1 } : { y: 60, opacity: 0 }
        }
        transition={{ type: 'spring', stiffness: 260, damping: 24 }}
        onClick={scrollToTop}
        aria-label="Scroll to top"
        className="w-11 h-11 rounded-full glass-panel flex items-center justify-center shadow-lg shadow-black/20 hover:bg-zinc-900/5 dark:hover:bg-white/10 transition-colors"
      >
        <ArrowUp className="w-4 h-4" />
      </motion.button>
    </div>
  );
};
