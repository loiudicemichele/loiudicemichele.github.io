import { useEffect, useRef } from "react";

interface ScrollObserverProps {
  children: React.ReactNode;
  className?: string;
  threshold?: number;
  delay?: number;
}

export const ScrollObserver = ({ 
  children, 
  className = "", 
  threshold = 0.1, 
  delay = 0 
}: ScrollObserverProps) => {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const element = ref.current;
    if (!element) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setTimeout(() => {
              entry.target.classList.remove("opacity-0");
              entry.target.classList.add("animate-fade-in");
            }, delay);
          }
        });
      },
      { threshold }
    );

    observer.observe(element);

    return () => observer.disconnect();
  }, [threshold, delay]);

  return (
    <div ref={ref} className={`opacity-0 transition-opacity duration-300 ${className}`}>
      {children}
    </div>
  );
};