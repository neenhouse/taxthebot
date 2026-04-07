import { useState, useEffect } from 'react';

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
