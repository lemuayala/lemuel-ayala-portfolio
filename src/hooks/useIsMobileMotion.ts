import { useEffect, useState } from 'react';

const MOBILE_MOTION_QUERY =
  '(max-width: 768px), (hover: none) and (pointer: coarse), (prefers-reduced-motion: reduce)';

export const useIsMobileMotion = () => {
  const [isMobileMotion, setIsMobileMotion] = useState(() => {
    if (typeof window === 'undefined') return false;
    return window.matchMedia(MOBILE_MOTION_QUERY).matches;
  });

  useEffect(() => {
    const mediaQuery = window.matchMedia(MOBILE_MOTION_QUERY);
    const onChange = (event: MediaQueryListEvent) => {
      setIsMobileMotion(event.matches);
    };

    mediaQuery.addEventListener('change', onChange);
    return () => mediaQuery.removeEventListener('change', onChange);
  }, []);

  return isMobileMotion;
};
