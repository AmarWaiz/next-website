'use client';

import * as React from 'react';
import { ChevronLeft, ChevronRight, Star, ShieldCheck, Quote } from 'lucide-react';
import { SectionHeading } from '@/components/sections/SectionHeading';

export interface ReviewItem {
  id: string;
  quote: string;
  author: string;
  role: string;
  company: string;
  initials: string;
  verifiedTag: string;
}

const enterpriseReviews: ReviewItem[] = [
  {
    id: 'rev-1',
    quote:
      'TechCentera replaced our fragile patchwork of third-party automation tools with a custom, governed pipeline. We cut repetitive intake time by 70% while retaining total control over our customer data.',
    author: 'Robert Keller',
    role: 'VP of Operations',
    company: 'Logistics & Supply Network',
    initials: 'RK',
    verifiedTag: 'Verified Enterprise Deployment',
  },
  {
    id: 'rev-2',
    quote:
      'Their deterministic guardrails were the only AI architecture that satisfied our strict compliance officers. Zero hallucination risk, sub-second execution, and 100% intellectual property ownership.',
    author: 'Elena Rostova',
    role: 'Chief Technology Officer',
    company: 'FinServe Global',
    initials: 'ER',
    verifiedTag: 'Financial Services Deployment',
  },
  {
    id: 'rev-3',
    quote:
      'The custom AI voice receptionist handles over 1,400 inbound intake calls daily without a single drop or routing misclassification. It has transformed our front-office capacity completely.',
    author: 'Marcus Vance',
    role: 'Head of Digital Transformation',
    company: 'Apex HealthTech',
    initials: 'MV',
    verifiedTag: 'HealthTech Voice Intake',
  },
  {
    id: 'rev-4',
    quote:
      'We saved over $180,000 in annual recurring SaaS seat licenses by migrating to TechCentera’s custom ERP workflows. The ROI was fully realized within the first 4 months of deployment.',
    author: 'David Sterling',
    role: 'Director of Systems Architecture',
    company: 'Omnia Commerce Group',
    initials: 'DS',
    verifiedTag: 'Custom ERP & Data Sync',
  },
];

export interface ReviewsCarouselProps {
  initialReviews?: ReviewItem[];
}

export function ReviewsCarousel({ initialReviews }: ReviewsCarouselProps) {
  const reviews = (initialReviews && initialReviews.length > 0) ? initialReviews : enterpriseReviews;
  const [currentIndex, setCurrentIndex] = React.useState(0);

  const totalReviews = reviews.length;

  const handleNext = (e?: React.MouseEvent) => {
    if (e) {
      e.preventDefault();
      e.stopPropagation();
    }
    setCurrentIndex(prev => (prev + 1) % totalReviews);
  };

  const handlePrev = (e?: React.MouseEvent) => {
    if (e) {
      e.preventDefault();
      e.stopPropagation();
    }
    setCurrentIndex(prev => (prev - 1 + totalReviews) % totalReviews);
  };

  const handleSelect = (idx: number, e?: React.MouseEvent) => {
    if (e) {
      e.preventDefault();
      e.stopPropagation();
    }
    setCurrentIndex(idx);
  };

  const activeReview = reviews[currentIndex] ?? reviews[0]!;

  return (
    <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-12 space-y-12">
      <SectionHeading
        badge="Client Testimonials"
        title="Trusted by Operational & Technology Leaders"
        description="See how mid-market leaders use our governed AI systems and custom software to eliminate software debt and automate core workflows."
      />

      <div className="relative rounded-3xl border border-border bg-surface-raised p-8 sm:p-12 md:p-16 overflow-hidden shadow-xl">
        {/* Subtle Ambient Glow */}
        <div className="pointer-events-none absolute -right-24 -bottom-24 w-96 h-96 bg-accent/15 rounded-full blur-3xl" />
        <Quote className="pointer-events-none absolute top-8 right-8 h-24 w-24 text-white/[0.04]" />

        {/* Review Card Body */}
        <div className="relative z-10 min-h-[240px] flex flex-col justify-between space-y-8">
          {/* Rating & Verified Tag */}
          <div className="flex flex-wrap items-center justify-between gap-4">
            <div className="flex items-center gap-1.5">
              {[...Array(5)].map((_, i) => (
                <Star key={i} className="h-5 w-5 fill-accent text-accent" />
              ))}
              <span className="text-xs font-mono text-ink-muted ml-2 font-bold">5.0 / 5.0</span>
            </div>

            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-accent/15 border border-accent/30 text-accent text-xs font-mono font-semibold">
              <ShieldCheck className="h-3.5 w-3.5" />
              {activeReview.verifiedTag}
            </span>
          </div>

          {/* Quote */}
          <blockquote className="text-xl sm:text-2xl md:text-3xl font-semibold text-ink leading-relaxed tracking-tight min-h-[80px]">
            &ldquo;{activeReview.quote}&rdquo;
          </blockquote>

          {/* Author Details */}
          <div className="flex items-center gap-4 pt-4 border-t border-border/60">
            <div className="h-12 w-12 rounded-2xl bg-accent text-white font-black font-mono text-base flex items-center justify-center shadow-md shadow-accent/20 shrink-0">
              {activeReview.initials}
            </div>
            <div>
              <p className="text-base font-bold text-ink">{activeReview.author}</p>
              <p className="text-xs text-ink-muted font-mono">
                {activeReview.role} · <span className="text-ink">{activeReview.company}</span>
              </p>
            </div>
          </div>
        </div>

        {/* Carousel Navigation Footer */}
        <div className="relative z-20 pt-8 mt-6 border-t border-border/40 flex items-center justify-between">
          {/* Indicator Dots */}
          <div className="flex items-center gap-2">
            {reviews.map((rev, idx) => (
              <button
                key={rev.id || idx}
                type="button"
                onClick={(e) => handleSelect(idx, e)}
                aria-label={`Go to review ${idx + 1}`}
                className={`h-2.5 rounded-full transition-all duration-200 cursor-pointer ${
                  idx === currentIndex
                    ? 'w-8 bg-accent'
                    : 'w-2.5 bg-white/20 hover:bg-white/50'
                }`}
              />
            ))}
          </div>

          {/* Previous / Next Controls */}
          <div className="flex items-center gap-3">
            <button
              type="button"
              onClick={handlePrev}
              aria-label="Previous Review"
              className="flex h-11 w-11 items-center justify-center rounded-xl border border-border bg-surface text-ink hover:border-accent hover:bg-accent hover:text-white transition-all cursor-pointer shadow-md active:scale-90 select-none z-30"
            >
              <ChevronLeft className="h-5 w-5 pointer-events-none" />
            </button>
            <button
              type="button"
              onClick={handleNext}
              aria-label="Next Review"
              className="flex h-11 w-11 items-center justify-center rounded-xl border border-border bg-surface text-ink hover:border-accent hover:bg-accent hover:text-white transition-all cursor-pointer shadow-md active:scale-90 select-none z-30"
            >
              <ChevronRight className="h-5 w-5 pointer-events-none" />
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
