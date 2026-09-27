import { useState, useEffect, useRef } from 'react';

interface UseCountUpOptions {
  start?: number;
  end: number;
  duration?: number;
  startOnMount?: boolean;
}

export function useCountUp({
  start = 0,
  end,
  duration = 2000,
  startOnMount = true,
}: UseCountUpOptions) {
  const [count, setCount] = useState(start);
  const [isComplete, setIsComplete] = useState(false);
  const countRef = useRef(start);
  const rafRef = useRef<number | null>(null);

  const easeOutQuad = (t: number) => t * (2 - t);

  const animate = (startTime: number) => {
    const now = performance.now();
    const elapsed = now - startTime;
    const progress = Math.min(elapsed / duration, 1);
    const easedProgress = easeOutQuad(progress);

    const currentCount = Math.floor(start + (end - start) * easedProgress);
    setCount(currentCount);
    countRef.current = currentCount;

    if (progress < 1) {
      rafRef.current = requestAnimationFrame(() => animate(startTime));
    } else {
      setCount(end);
      setIsComplete(true);
    }
  };

  const startAnimation = () => {
    if (rafRef.current) {
      cancelAnimationFrame(rafRef.current);
    }
    const startTime = performance.now();
    animate(startTime);
  };

  useEffect(() => {
    if (startOnMount) {
      startAnimation();
    }
    return () => {
      if (rafRef.current) {
        cancelAnimationFrame(rafRef.current);
      }
    };
  }, [end, duration, startOnMount]);

  return { count, isComplete, startAnimation };
}
