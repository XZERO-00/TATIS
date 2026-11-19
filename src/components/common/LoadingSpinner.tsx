import * as React from 'react';
import { Loader2 } from 'lucide-react';
import { cn } from '@/lib/utils';

export interface LoadingSpinnerProps {
  size?: 'sm' | 'md' | 'lg';
  label?: string;
  className?: string;
}

const sizeClasses = {
  sm: 'h-4 w-4',
  md: 'h-6 w-6',
  lg: 'h-10 w-10',
};

export const LoadingSpinner: React.FC<LoadingSpinnerProps> = ({
  size = 'md',
  label,
  className,
}) => {
  return (
    <div
      className={cn(
        'flex flex-col items-center justify-center gap-2 p-6 text-muted-foreground',
        className
      )}
    >
      <Loader2
        className={cn('animate-spin text-primary', sizeClasses[size])}
      />
      {label && <p className="text-xs">{label}</p>}
    </div>
  );
};
