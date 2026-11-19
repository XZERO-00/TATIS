import * as React from 'react';
import { cva, type VariantProps } from 'class-variance-authority';
import { cn } from '@/lib/utils';
import { AlertCircle, CheckCircle2, Info, AlertTriangle } from 'lucide-react';

const alertVariants = cva(
  'relative w-full rounded-lg border p-4 text-sm flex items-start gap-3 [&>svg]:shrink-0',
  {
    variants: {
      variant: {
        default: 'bg-background text-foreground border-border',
        destructive:
          'border-destructive/30 text-destructive bg-destructive/10 [&>svg]:text-destructive',
        success:
          'border-emerald-500/30 text-emerald-800 dark:text-emerald-300 bg-emerald-50 dark:bg-emerald-950/40 [&>svg]:text-emerald-600',
        warning:
          'border-amber-500/30 text-amber-800 dark:text-amber-300 bg-amber-50 dark:bg-amber-950/40 [&>svg]:text-amber-600',
        info:
          'border-blue-500/30 text-blue-800 dark:text-blue-300 bg-blue-50 dark:bg-blue-950/40 [&>svg]:text-blue-600',
      },
    },
    defaultVariants: {
      variant: 'default',
    },
  }
);

const iconMap = {
  default: Info,
  destructive: AlertCircle,
  success: CheckCircle2,
  warning: AlertTriangle,
  info: Info,
};

export interface AlertProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof alertVariants> {
  title?: string;
}

export const Alert: React.FC<AlertProps> = ({
  className,
  variant = 'default',
  title,
  children,
  ...props
}) => {
  const Icon = iconMap[variant || 'default'];

  return (
    <div
      role="alert"
      className={cn(alertVariants({ variant }), className)}
      {...props}
    >
      <Icon className="h-4 w-4 mt-0.5" />
      <div className="flex-1 space-y-1">
        {title && <h5 className="font-semibold leading-none">{title}</h5>}
        <div className="text-xs leading-relaxed opacity-90">{children}</div>
      </div>
    </div>
  );
};
