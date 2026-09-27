import { useState, useEffect, useCallback } from 'react';

type ScrollDirection = 'up' | 'down' | null;

export function useScrollDirection(threshold = 10) {
  const [scrollDirection, setScrollDirection] = useState<ScrollDirection>(null);
  const [lastScrollY, setLastScrollY] = useState(0);
  const [isVisible, setIsVisible] = useState(true);

  const updateScrollDirection = useCallback(() => {
    const scrollY = window.scrollY;
    const direction = scrollY > lastScrollY ? 'down' : 'up';

    if (
      direction !== scrollDirection &&
      Math.abs(scrollY - lastScrollY) > threshold
    ) {
      setScrollDirection(direction);
      setIsVisible(direction === 'up' || scrollY < threshold);
    }

    if (scrollY < threshold) {
      setIsVisible(true);
    }

    setLastScrollY(scrollY);
  }, [scrollDirection, lastScrollY, threshold]);

  useEffect(() => {
    const handleScroll = () => {
      updateScrollDirection();
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, [updateScrollDirection]);

  return { scrollDirection, isVisible };
}
