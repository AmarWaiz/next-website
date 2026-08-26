import * as React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { cn } from '@/lib/utils';
import { ArrowUpRight, CheckCircle2 } from 'lucide-react';

export interface ServiceCardProps {
  title: string;
  slug: string;
  order: number;
  shortDescription: string;
  features?: string[];
  imageSrc?: string;
  className?: string;
}

const serviceImages: Record<string, string> = {
  'ai-receptionist': '/images/ai-receptionist.jpg',
  'ai-customer-support': '/images/ai-support.jpg',
  'ai-workflow-automation': '/images/ai-workflow.jpg',
  'custom-crm-erp': '/images/custom-crm-erp.jpg',
};

export function ServiceCard({
  title,
  slug,
  order,
  shortDescription,
  features = [],
  imageSrc,
  className,
}: ServiceCardProps) {
  const formattedOrder = String(order).padStart(2, '0');
  const img = imageSrc || serviceImages[slug] || '/images/hero-preview.jpg';

  return (
    <Link
      href={`/services/${slug}`}
      className={cn(
        'group relative flex flex-col justify-between overflow-hidden rounded-3xl border border-border bg-surface-raised card-hover-effect hover:border-accent/60 hover:bg-surface-card hover:shadow-xl hover:shadow-accent/10 transition-all duration-300',
        className
      )}
    >
      {/* Top Image Preview with Subtle Gradient Overlay */}
      <div className="relative h-48 sm:h-56 w-full overflow-hidden border-b border-border/80 bg-surface">
        <Image
          src={img}
          alt={title}
          fill
          className="object-cover object-top transition-transform duration-500 group-hover:scale-105 opacity-90 group-hover:opacity-100"
          sizes="(max-width: 768px) 100vw, 50vw"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-surface-raised via-transparent to-transparent opacity-80" />
        
        <div className="absolute top-4 left-4">
          <span className="font-mono text-xs font-bold text-white px-3 py-1 rounded-full bg-accent/90 backdrop-blur-md shadow-md">
            {formattedOrder}
          </span>
        </div>

        <div className="absolute top-4 right-4">
          <span className="flex h-9 w-9 items-center justify-center rounded-full border border-white/20 bg-black/60 text-white group-hover:bg-accent group-hover:border-accent transition-all backdrop-blur-md">
            <ArrowUpRight className="h-4 w-4" />
          </span>
        </div>
      </div>

      {/* Content Section */}
      <div className="p-6 sm:p-8 space-y-4 flex-1 flex flex-col justify-between">
        <div className="space-y-2.5">
          <h3 className="text-xl sm:text-2xl font-bold tracking-tight text-ink group-hover:text-accent transition-colors">
            {title}
          </h3>
          <p className="text-xs sm:text-sm text-ink-muted leading-relaxed line-clamp-2">
            {shortDescription}
          </p>
        </div>

        {features.length > 0 && (
          <ul className="pt-3 space-y-2 border-t border-border/60 text-xs text-ink-muted">
            {features.slice(0, 3).map((feat, i) => (
              <li key={i} className="flex items-start gap-2">
                <CheckCircle2 className="h-3.5 w-3.5 text-accent shrink-0 mt-0.5" />
                <span className="line-clamp-1">{feat}</span>
              </li>
            ))}
          </ul>
        )}

        <div className="pt-3 flex items-center gap-1 text-xs font-bold text-accent group-hover:translate-x-1.5 transition-transform">
          <span>Explore System Architecture</span>
          <ArrowUpRight className="h-3.5 w-3.5" />
        </div>
      </div>
    </Link>
  );
}
