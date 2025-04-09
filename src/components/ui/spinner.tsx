
import React from 'react';
import { cn } from '@/lib/utils';

interface SpinnerProps {
  size?: 'sm' | 'md' | 'lg';
  className?: string;
}

export const Spinner: React.FC<SpinnerProps> = ({ size = 'md', className }) => {
  const sizeClasses = {
    sm: 'h-4 w-4',
    md: 'h-6 w-6',
    lg: 'h-10 w-10',
  };

  return (
    <div className="flex items-center justify-center">
      <div
        className={cn(
          "border-t-transparent rounded-full animate-spin",
          sizeClasses[size],
          size === 'sm' ? 'border-2' : 'border-3',
          "border-eco-green",
          className
        )}
      />
    </div>
  );
};
