'use client';

import * as React from 'react';
import { cn } from '@/lib/utils';
import { ChevronDown } from 'lucide-react';

export interface AccordionItemData {
  id?: string;
  question: string;
  answer: string;
}

export interface AccordionProps {
  items: AccordionItemData[];
  allowMultiple?: boolean;
  className?: string;
}

export function Accordion({ items, allowMultiple = false, className }: AccordionProps) {
  const [openIndices, setOpenIndices] = React.useState<number[]>([0]);

  const toggle = (index: number) => {
    setOpenIndices(prev => {
      if (allowMultiple) {
        return prev.includes(index) ? prev.filter(i => i !== index) : [...prev, index];
      } else {
        return prev.includes(index) ? [] : [index];
      }
    });
  };

  return (
    <div className={cn('w-full divide-y divide-border border-y border-border', className)}>
      {items.map((item, index) => {
        const isOpen = openIndices.includes(index);
        return (
          <div key={item.id ?? index} className="py-6 transition-colors">
            <button
              type="button"
              onClick={() => toggle(index)}
              aria-expanded={isOpen}
              className="flex w-full items-center justify-between gap-6 text-left transition-colors duration-150 group cursor-pointer select-none"
            >
              <span className="text-lg sm:text-xl font-semibold text-ink group-hover:text-white transition-colors">
                {item.question}
              </span>
              <span
                className={cn(
                  'flex h-9 w-9 shrink-0 items-center justify-center rounded-xl border border-border bg-surface-raised text-ink-muted transition-all duration-200 group-hover:border-white/30 group-hover:text-white',
                  isOpen && 'rotate-180 bg-accent text-white border-accent shadow-md shadow-accent/20'
                )}
              >
                <ChevronDown className="h-4 w-4" />
              </span>
            </button>
            
            {/* Answer Panel with resilient CSS transition */}
            <div
              className={cn(
                'grid transition-all duration-200 ease-in-out',
                isOpen ? 'grid-rows-[1fr] opacity-100 mt-4' : 'grid-rows-[0fr] opacity-0 mt-0 pointer-events-none'
              )}
            >
              <div className="overflow-hidden">
                <p className="text-sm sm:text-base leading-relaxed text-ink-muted max-w-5xl">
                  {item.answer}
                </p>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}
