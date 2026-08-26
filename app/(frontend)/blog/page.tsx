import type { Metadata } from 'next';
import Link from 'next/link';
import { getAllBlogPosts } from '@/lib/mdx';
import { Badge } from '@/ui/Badge';
import { formatDate } from '@/lib/utils';
import { ArrowUpRight, Calendar, Clock } from 'lucide-react';
import { CTABand } from '@/components/sections/CTABand';

export const metadata: Metadata = {
  title: 'Architecture & Technical Insights',
  description:
    'Deep dives on governed AI systems, enterprise ERP integration, and data-sovereign custom software architecture.',
};

export default function BlogIndexPage() {
  const posts = getAllBlogPosts();

  const categories = ['All Articles', 'Enterprise AI', 'System Integration', 'Technology Strategy'];

  return (
    <div className="space-y-20 md:space-y-28 pb-12">
      {/* 1. HEADING */}
      <section className="relative pt-12 md:pt-20 lg:pt-28 overflow-hidden">
        <div className="max-w-7xl mx-auto px-6 md:px-12">
          <div className="max-w-3xl space-y-6">
            <Badge variant="accent" withDot>
              Engineering Publications
            </Badge>

            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight text-ink leading-tight">
              Architecture & Insights.
            </h1>

            <p className="text-base sm:text-lg text-ink-muted leading-relaxed prose-measure">
              Technical essays on enterprise AI governance, legacy data integration, and software ownership economics.
            </p>
          </div>
        </div>
      </section>

      {/* 2. CATEGORY FILTER & POST GRID */}
      <section className="max-w-7xl mx-auto px-6 md:px-12 space-y-10">
        {/* Category Pills */}
        <div className="flex flex-wrap items-center gap-2">
          {categories.map((cat, idx) => (
            <span
              key={cat}
              className={`px-4 py-1.5 text-xs font-semibold rounded-full border transition-colors cursor-pointer select-none ${
                idx === 0
                  ? 'bg-accent text-white border-accent shadow-md shadow-accent/20'
                  : 'bg-surface-raised border-border text-ink-muted hover:border-border-hover hover:text-ink'
              }`}
            >
              {cat}
            </span>
          ))}
        </div>

        {/* Card Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {posts.map(post => (
            <Link
              key={post.frontmatter.slug}
              href={`/blog/${post.frontmatter.slug}`}
              className="group flex flex-col justify-between rounded-3xl border border-border bg-surface-raised p-8 card-hover-effect hover:border-accent/50 hover:bg-surface-card"
            >
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <Badge variant="accent">{post.frontmatter.category}</Badge>
                  <span className="flex h-8 w-8 items-center justify-center rounded-full border border-border bg-surface text-ink-muted group-hover:border-accent group-hover:bg-accent group-hover:text-white transition-all">
                    <ArrowUpRight className="h-4 w-4" />
                  </span>
                </div>

                <div className="space-y-2">
                  <h2 className="text-xl font-bold text-ink leading-snug group-hover:text-accent transition-colors">
                    {post.frontmatter.title}
                  </h2>
                  <p className="text-xs sm:text-sm text-ink-muted leading-relaxed line-clamp-3">
                    {post.frontmatter.excerpt}
                  </p>
                </div>
              </div>

              <div className="mt-8 pt-4 border-t border-border/50 flex items-center justify-between text-xs text-ink-subtle font-mono">
                <span className="flex items-center gap-1.5">
                  <Calendar className="h-3.5 w-3.5" />
                  {formatDate(post.frontmatter.date)}
                </span>
                <span className="flex items-center gap-1.5">
                  <Clock className="h-3.5 w-3.5" />
                  {post.frontmatter.readTime}
                </span>
              </div>
            </Link>
          ))}
        </div>
      </section>

      {/* 3. CTA BAND */}
      <CTABand
        title="Looking for Specific Architectural Advice?"
        description="Connect directly with our engineering authors to discuss your enterprise systems roadmap."
      />
    </div>
  );
}
