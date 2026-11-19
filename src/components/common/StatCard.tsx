import * as React from 'react';
import { Card, CardContent } from '../ui/card';
import { Badge } from '../ui/badge';
import { cn } from '@/lib/utils';
import { LucideIcon } from 'lucide-react';

export interface StatCardProps {
  title: string;
  value: string | number;
  subtitle?: string;
  change?: {
    value: string;
    trend: 'up' | 'down' | 'neutral';
  };
  icon: LucideIcon;
  isDemoData?: boolean;
  className?: string;
}

export const StatCard: React.FC<StatCardProps> = ({
  title,
  value,
  subtitle,
  change,
  icon: Icon,
  isDemoData = false,
  className,
}) => {
  return (
    <Card className={cn('relative overflow-hidden hover:border-brand-soft/40 transition-all', className)}>
      <CardContent className="p-5">
        <div className="flex items-start justify-between">
          <div className="space-y-1">
            <div className="flex items-center gap-2">
              <span className="text-xs font-medium uppercase tracking-wider text-muted-foreground">
                {title}
              </span>
              {isDemoData && (
                <Badge
                  variant="outline"
                  className="text-[10px] py-0 px-1.5 h-4 border-amber-500/30 text-amber-600 dark:text-amber-400 font-mono"
                >
                  Demo
                </Badge>
              )}
            </div>
            <div className="text-2xl font-bold tracking-tight text-foreground">
              {value}
            </div>
          </div>
          <div className="rounded-lg bg-brand-midnight/5 dark:bg-brand-soft/15 p-2.5 text-brand-midnight dark:text-brand-neon">
            <Icon className="h-5 w-5" />
          </div>
        </div>

        {(change || subtitle) && (
          <div className="mt-3 flex items-center gap-2 text-xs">
            {change && (
              <span
                className={cn(
                  'font-medium inline-flex items-center gap-0.5',
                  change.trend === 'up' && 'text-emerald-600 dark:text-emerald-400',
                  change.trend === 'down' && 'text-rose-600 dark:text-rose-400',
                  change.trend === 'neutral' && 'text-muted-foreground'
                )}
              >
                {change.trend === 'up' && '↑ '}
                {change.trend === 'down' && '↓ '}
                {change.value}
              </span>
            )}
            {subtitle && (
              <span className="text-muted-foreground text-[11px] truncate">
                {subtitle}
              </span>
            )}
          </div>
        )}
      </CardContent>
    </Card>
  );
};
