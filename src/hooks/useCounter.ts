import { useState, useEffect, useRef } from 'react';

/**
 * Animates a number counter from 0 to target value
 */
export function useCounter(target: number, duration: number = 2000, start: boolean = true): number {
  const [value, setValue] = useState(0);
  const startTime = useRef<number | null>(null);
  const rafId = useRef<number>(0);

  useEffect(() => {
    if (!start) return;

    const animate = (timestamp: number) => {
      if (!startTime.current) startTime.current = timestamp;
      const progress = Math.min((timestamp - startTime.current) / duration, 1);
      // Ease out cubic
      const eased = 1 - Math.pow(1 - progress, 3);
      setValue(Math.floor(target * eased));

      if (progress < 1) {
        rafId.current = requestAnimationFrame(animate);
      }
    };

    rafId.current = requestAnimationFrame(animate);

    return () => {
      cancelAnimationFrame(rafId.current);
      startTime.current = null;
    };
  }, [target, duration, start]);

  return value;
}

/**
 * Live incrementing counter (simulates real-time data)
 */
export function useLiveCounter(baseValue: number, incrementPerSecond: number): number {
  const [value, setValue] = useState(baseValue);

  useEffect(() => {
    const interval = setInterval(() => {
      setValue(prev => prev + incrementPerSecond);
    }, 1000);
    return () => clearInterval(interval);
  }, [incrementPerSecond]);

  return value;
}
