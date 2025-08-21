import { useState } from 'react';

interface UseCounterOptions {
  end: number;
  start?: number;
  duration?: number;
  decimals?: number;
  suffix?: string;
  prefix?: string;
}

export const useCounter = ({
  end,
  start = 0,
  duration = 2000,
  decimals = 0,
  suffix = '',
  prefix = '',
}: UseCounterOptions) => {
  const [count, setCount] = useState(start);
  const [isAnimating, setIsAnimating] = useState(false);

  const startCounting = () => {
    if (isAnimating) return;
    
    setIsAnimating(true);
    const startTime = Date.now();
    const startValue = start;
    const endValue = end;
    const totalChange = endValue - startValue;

    const updateCount = () => {
      const now = Date.now();
      const elapsed = now - startTime;
      const progress = Math.min(elapsed / duration, 1);
      
      // Easing function (ease-out)
      const easedProgress = 1 - Math.pow(1 - progress, 3);
      
      const currentValue = startValue + (totalChange * easedProgress);
      setCount(currentValue);

      if (progress < 1) {
        requestAnimationFrame(updateCount);
      } else {
        setCount(endValue);
        setIsAnimating(false);
      }
    };

    requestAnimationFrame(updateCount);
  };

  const formatNumber = (num: number) => {
    const formatted = num.toFixed(decimals);
    return `${prefix}${formatted}${suffix}`;
  };

  return {
    count: formatNumber(count),
    startCounting,
    isAnimating,
  };
};