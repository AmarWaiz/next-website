import * as React from 'react';
import { cn } from '@/lib/utils';
import { Badge } from '@/ui/Badge';

export interface SectionHeadingProps {
  badge?: string;
  title: string;
  description?: string;
  align?: 'left' | 'center';
  className?: string;
}

export function SectionHeading({
  badge,
  title,
  description,
  align = 'left',
  className,
}: SectionHeadingProps) {
  return (
    <div
      className={cn(
        'space-y-4 max-w-3xl',
        align === 'center' ? 'mx-auto text-center' : 'text-left',
        className
      )}
    >
      {badge && (
        <div>
          <Badge variant="accent" withDot>
            {badge}
          </Badge>
        </div>
      )}
      <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight text-ink leading-[1.15]">
        {title}
      </h2>
      {description && (
        <p className="text-base sm:text-lg text-ink-muted leading-relaxed prose-measure">
          {description}
        </p>
      )}
    </div>
  );
}
