import * as React from 'react';
import { cn } from '@/lib/utils';
import { Loader2 } from 'lucide-react';

export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'outline' | 'ghost' | 'accent';
  size?: 'sm' | 'md' | 'lg';
  isLoading?: boolean;
  leftIcon?: React.ReactNode;
  rightIcon?: React.ReactNode;
  asChild?: boolean;
}

export const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  (
    {
      className,
      variant = 'primary',
      size = 'md',
      isLoading = false,
      leftIcon,
      rightIcon,
      disabled,
      children,
      ...props
    },
    ref
  ) => {
    const baseStyles =
      'inline-flex items-center justify-center font-medium whitespace-nowrap shrink-0 transition-all duration-200 cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed disabled:pointer-events-none select-none active:scale-[0.98]';

    const variants = {
      primary:
        'bg-white text-black hover:bg-neutral-200 border border-transparent shadow-sm',
      accent:
        'bg-accent text-white hover:bg-[#1a73e8] border border-transparent shadow-md shadow-accent/20 hover:shadow-lg hover:shadow-accent/30',
      secondary:
        'bg-surface-raised text-ink hover:bg-surface-card hover:text-white border border-border hover:border-white/25',
      outline:
        'bg-transparent text-ink border border-border hover:border-white/30 hover:bg-white/[0.04] hover:text-white',
      ghost:
        'bg-transparent text-ink-muted hover:text-white hover:bg-white/[0.05]',
    };

    const sizes = {
      sm: 'h-9 px-4 text-xs rounded-lg gap-1.5',
      md: 'h-11 px-5 sm:px-6 text-sm rounded-xl gap-2',
      lg: 'h-13 px-6 sm:px-8 text-base rounded-xl gap-2.5',
    };

    return (
      <button
        ref={ref}
        disabled={disabled || isLoading}
        className={cn(baseStyles, variants[variant], sizes[size], className)}
        {...props}
      >
        {isLoading ? (
          <Loader2 className="h-4 w-4 animate-spin text-current" />
        ) : (
          leftIcon
        )}
        <span className="whitespace-nowrap">{children}</span>
        {!isLoading && rightIcon}
      </button>
    );
  }
);

Button.displayName = 'Button';
