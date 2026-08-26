import * as React from 'react';
import Link from 'next/link';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/Button';
import { ArrowRight } from 'lucide-react';

export interface CTABandProps {
  title?: string;
  description?: string;
  primaryLabel?: string;
  secondaryLabel?: string;
  className?: string;
}

export function CTABand({
  title = 'Ready to Deploy Governed AI Without Vendor Lock-In?',
  description = 'Consult with our engineering team to review your legacy workflows, data models, and automation roadmap.',
  primaryLabel = 'Book a Consultation',
  secondaryLabel = 'Explore All Services',
  className,
}: CTABandProps) {
  return (
    <section className={cn('py-16 md:py-24', className)}>
      <div className="max-w-7xl mx-auto px-6 md:px-12">
        <div className="relative overflow-hidden rounded-3xl border border-border bg-gradient-to-b from-surface-raised via-surface-card to-surface p-8 sm:p-12 md:p-16 lg:p-20 text-center">
          {/* Subtle background glow */}
          <div className="pointer-events-none absolute -top-24 left-1/2 -translate-x-1/2 h-64 w-96 rounded-full bg-accent/10 blur-3xl" />

          <div className="relative z-10 max-w-3xl mx-auto space-y-6">
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight text-ink leading-[1.15]">
              {title}
            </h2>
            <p className="text-base sm:text-lg text-ink-muted leading-relaxed prose-measure mx-auto">
              {description}
            </p>
            <div className="pt-4 flex flex-col sm:flex-row items-center justify-center gap-4">
              <Link href="/contact" className="w-full sm:w-auto">
                <Button variant="accent" size="lg" className="w-full sm:w-auto text-sm font-semibold gap-2" rightIcon={<ArrowRight className="h-4 w-4" />}>
                  {primaryLabel}
                </Button>
              </Link>
              <Link href="/services" className="w-full sm:w-auto">
                <Button variant="outline" size="lg" className="w-full sm:w-auto text-sm">
                  {secondaryLabel}
                </Button>
              </Link>
            </div>
            <p className="text-xs text-ink-subtle pt-2 font-mono">
              Direct line: +1 (786) 827-3650 · 24-hour response guarantee
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
