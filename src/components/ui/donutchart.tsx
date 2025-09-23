// components/ui/double-donut.tsx
import React from 'react';
import { cn } from '@/lib/utils';

interface DoubleDonutProps {
  solvedPercentage: number;
  acceptanceRate: number;
  size?: 'sm' | 'md' | 'lg' | 'xl';
  className?: string;
}

const DoubleDonut: React.FC<DoubleDonutProps> = ({
  solvedPercentage,
  acceptanceRate,
  size = 'lg',
  className,
}) => {
  const sizeClasses = {
    sm: {
      container: 'w-12 h-12',
      text: 'text-xs',
      percentage: 'text-sm',
      gap: 'gap-6'
    },
    md: {
      container: 'w-16 h-16',
      text: 'text-sm',
      percentage: 'text-base',
      gap: 'gap-7'
    },
    lg: {
      container: 'w-24 h-24',
      text: 'text-base',
      percentage: 'text-xl',
      gap: 'gap-8'
    },
    xl: {
      container: 'w-32 h-32',
      text: 'text-lg',
      percentage: 'text-2xl',
      gap: 'gap-10'
    }
  };

  const radius = {
    sm: 20,
    md: 25,
    lg: 35,
    xl: 45
  };

  const circumference = 2 * Math.PI * radius[size];

  return (
    <div className={cn('flex items-center', sizeClasses[size].gap, className)}>
      {/* Solved Problems Donut */}
      <div className="flex flex-col items-center gap-2">
        <div className={cn('relative', sizeClasses[size].container)}>
          <svg className="transform -rotate-90" width="100%" height="100%" viewBox={`0 0 ${radius[size] * 2 + 20} ${radius[size] * 2 + 20}`}>
            <circle 
              cx={radius[size] + 10} 
              cy={radius[size] + 10} 
              r={radius[size]} 
              fill="none" 
              stroke="hsl(var(--muted))" 
              strokeWidth="8" 
              opacity="0.3" 
            />
            <circle
              cx={radius[size] + 10}
              cy={radius[size] + 10}
              r={radius[size]}
              fill="none"
              stroke="hsl(var(--primary))"
              strokeWidth="8"
              strokeLinecap="round"
              strokeDasharray={circumference}
              strokeDashoffset={circumference - (solvedPercentage / 100) * circumference}
              className="transition-all duration-700 ease-out"
            />
          </svg>
          <div className="absolute inset-0 flex items-center justify-center">
            <span className={cn('font-bold text-primary', sizeClasses[size].percentage)}>
              {solvedPercentage}%
            </span>
          </div>
        </div>
        <span className={cn('text-muted-foreground text-center', sizeClasses[size].text)}>
          of 3691
        </span>
      </div>

      {/* Acceptance Rate Donut */}
      <div className="flex flex-col items-center gap-2">
        <div className={cn('relative', sizeClasses[size].container)}>
          <svg className="transform -rotate-90" width="100%" height="100%" viewBox={`0 0 ${radius[size] * 2 + 20} ${radius[size] * 2 + 20}`}>
            <circle 
              cx={radius[size] + 10} 
              cy={radius[size] + 10} 
              r={radius[size]} 
              fill="none" 
              stroke="hsl(var(--muted))" 
              strokeWidth="8" 
              opacity="0.3" 
            />
            <circle
              cx={radius[size] + 10}
              cy={radius[size] + 10}
              r={radius[size]}
              fill="none"
              stroke="hsl(var(--secondary))"
              strokeWidth="8"
              strokeLinecap="round"
              strokeDasharray={circumference}
              strokeDashoffset={circumference - (acceptanceRate / 100) * circumference}
              className="transition-all duration-700 ease-out"
            />
          </svg>
          <div className="absolute inset-0 flex items-center justify-center">
            <span className={cn('font-bold text-secondary', sizeClasses[size].percentage)}>
              {acceptanceRate}%
            </span>
          </div>
        </div>
        <span className={cn('text-muted-foreground text-center', sizeClasses[size].text)}>
          Acceptance
        </span>
      </div>
    </div>
  );
};

export default DoubleDonut;