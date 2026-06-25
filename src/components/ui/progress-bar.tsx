"use client";

import clsx from "clsx";
import { useEffect, useRef, useState } from "react";

interface ProgressBarProps {
  value: number; // 0-100
  color?: string;
  className?: string;
  animate?: boolean;
}

const ProgressBar = ({
  value,
  color = "bg-foreground",
  className,
  animate = true,
}: ProgressBarProps) => {
  const [width, setWidth] = useState(animate ? 0 : value);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!animate) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          // Small delay for visual effect
          setTimeout(() => setWidth(value), 100);
          observer.disconnect();
        }
      },
      { threshold: 0.3 }
    );

    if (ref.current) {
      observer.observe(ref.current);
    }

    return () => observer.disconnect();
  }, [value, animate]);

  return (
    <div
      ref={ref}
      className={clsx("h-1 w-full rounded-full bg-border-light", className)}
    >
      <div
        className={clsx("h-full rounded-full transition-all duration-1000 ease-out", color)}
        style={{ width: `${width}%` }}
      />
    </div>
  );
};

export default ProgressBar;
