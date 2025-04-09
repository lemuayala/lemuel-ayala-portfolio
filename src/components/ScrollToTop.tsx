import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { ArrowUp } from 'lucide-react';

export const ScrollToTop = () => {
  const [scrollPosition, setScrollPosition] = useState(0);

  const handleScroll = () => {
    setScrollPosition(window.pageYOffset);
  };

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    });
  };

  useEffect(() => {
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <div className="fixed bottom-8 right-8 z-50">
      <motion.button
        initial={{ x: 50, opacity: 0 }}
        animate={
          scrollPosition > 200 ? { x: 0, opacity: 1 } : { x: 50, opacity: 0 }
        }
        transition={{ type: 'spring', stiffness: 1000, damping: 50 }}
        onClick={scrollToTop}
        className="p-3 rounded-full bg-gradient-to-tr from-blue-600/90 to-purple-700/90 text-white shadow-lg hover:bg-blue-800 transition-all duration-300 transform hover:-translate-y-1 focus:outline-none focus:ring-2 focus:ring-blue-800 focus:ring-opacity-50"
        aria-label="Volver al inicio"
      >
        <ArrowUp size={24} />
      </motion.button>
    </div>
  );
};
