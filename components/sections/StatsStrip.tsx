import * as React from 'react';
import { cn } from '@/lib/utils';

export interface StatItem {
  value: string;
  label: string;
  subtext: string;
}

const defaultStats: StatItem[] = [
  {
    value: '99.9%',
    label: 'Platform Reliability',
    subtext: 'Continuous enterprise pipeline execution and uptime.',
  },
  {
    value: '45k+',
    label: 'Daily Automations',
    subtext: 'Autonomous transactions and customer interactions resolved.',
  },
  {
    value: '< 1.8s',
    label: 'Median Latency',
    subtext: 'Zero-lag event processing across voice and API pipelines.',
  },
];

export interface StatsStripProps {
  stats?: StatItem[];
  className?: string;
}

export function StatsStrip({ stats = defaultStats, className }: StatsStripProps) {
  return (
    <div
      className={cn(
        'rounded-3xl border border-border bg-surface-raised p-8 md:p-12 shadow-xl',
        className
      )}
    >
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-12 divide-y md:divide-y-0 md:divide-x divide-border">
        {stats.map((stat, idx) => (
          <div
            key={stat.label}
            className={cn(
              'flex flex-col space-y-2.5',
              idx > 0 && 'pt-6 md:pt-0 md:pl-12'
            )}
          >
            <div className="text-4xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight font-mono text-accent">
              {stat.value}
            </div>
            <p className="text-base sm:text-lg font-bold text-ink pt-0.5">
              {stat.label}
            </p>
            <p className="text-xs sm:text-sm text-ink-muted leading-relaxed max-w-xs">
              {stat.subtext}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}
