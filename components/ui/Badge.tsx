import * as React from 'react';
import { cn } from '@/lib/utils';

export interface BadgeProps extends React.HTMLAttributes<HTMLSpanElement> {
  variant?: 'default' | 'accent' | 'outline' | 'subtle';
  withDot?: boolean;
}

export function Badge({
  className,
  variant = 'default',
  withDot = false,
  children,
  ...props
}: BadgeProps) {
  const baseStyles =
    'inline-flex items-center gap-1.5 px-3 py-1 text-xs font-medium rounded-full border tracking-tight select-none';

  const variants = {
    default: 'bg-surface-raised border-border text-ink-muted',
    accent: 'bg-accent/10 border-accent/30 text-accent font-semibold',
    outline: 'bg-transparent border-border text-ink-muted',
    subtle: 'bg-surface-card border-transparent text-ink-muted',
  };

  return (
    <span className={cn(baseStyles, variants[variant], className)} {...props}>
      {withDot && (
        <span className="h-1.5 w-1.5 rounded-full bg-accent animate-pulse" />
      )}
      {children}
    </span>
  );
}
