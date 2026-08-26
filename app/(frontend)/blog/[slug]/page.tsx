import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import Link from 'next/link';
import { getBlogPostBySlug, getAllBlogPosts } from '@/lib/mdx';
import { Badge } from '@/components/ui/Badge';
import { formatDate } from '@/lib/utils';
import { CTABand } from '@/components/sections/CTABand';
import { Calendar, Clock, ArrowLeft, ArrowUpRight, User } from 'lucide-react';

interface Props {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  const posts = getAllBlogPosts();
  return posts.map(p => ({
    slug: p.frontmatter.slug,
  }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const post = getBlogPostBySlug(slug);
  if (!post) return { title: 'Article Not Found' };

  return {
    title: `${post.frontmatter.title} | TechCentera Insights`,
    description: post.frontmatter.excerpt,
    openGraph: {
      type: 'article',
      title: post.frontmatter.title,
      description: post.frontmatter.excerpt,
      publishedTime: post.frontmatter.date,
      authors: [post.frontmatter.author.name],
    },
  };
}

export default async function BlogPostPage({ params }: Props) {
  const { slug } = await params;
  const post = getBlogPostBySlug(slug);
  if (!post) notFound();

  const allPosts = getAllBlogPosts();
  const relatedPosts = allPosts.filter(p => p.frontmatter.slug !== slug).slice(0, 3);

  const { frontmatter, content } = post;

  // Extract H2 headings for desktop TOC
  const headings = [...content.matchAll(/##\s+([^\n]+)/g)].map((m, i) => ({
    id: `heading-${i}`,
    title: m[1]?.trim() ?? '',
  }));

  // JSON-LD Article schema
  const articleSchema = {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: frontmatter.title,
    description: frontmatter.excerpt,
    datePublished: frontmatter.date,
    author: {
      '@type': 'Person',
      name: frontmatter.author.name,
      jobTitle: frontmatter.author.role,
    },
    publisher: {
      '@type': 'Organization',
      name: 'TechCentera',
      url: 'https://techcentera.com',
    },
  };

  return (
    <div className="space-y-16 md:space-y-24 pb-12">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(articleSchema) }}
      />

      {/* ARTICLE HEADER */}
      <section className="relative pt-12 md:pt-20 overflow-hidden">
        <div className="max-w-4xl mx-auto px-6 md:px-12 space-y-6">
          <Link
            href="/blog"
            className="inline-flex items-center gap-1.5 text-xs font-mono text-ink-muted hover:text-accent transition-colors"
          >
            <ArrowLeft className="h-3.5 w-3.5" />
            Back to Publications
          </Link>

          <div className="flex items-center gap-3">
            <Badge variant="accent">{frontmatter.category}</Badge>
            <span className="text-xs text-ink-subtle font-mono">·</span>
            <span className="text-xs text-ink-muted font-mono flex items-center gap-1">
              <Calendar className="h-3.5 w-3.5" />
              {formatDate(frontmatter.date)}
            </span>
            <span className="text-xs text-ink-subtle font-mono">·</span>
            <span className="text-xs text-ink-muted font-mono flex items-center gap-1">
              <Clock className="h-3.5 w-3.5" />
              {frontmatter.readTime}
            </span>
          </div>

          <h1 className="text-3xl sm:text-5xl lg:text-6xl font-bold tracking-tight text-ink leading-[1.12]">
            {frontmatter.title}
          </h1>

          {/* Author Row */}
          <div className="flex items-center gap-3.5 pt-4 border-t border-border">
            <div className="flex h-10 w-10 items-center justify-center rounded-full bg-accent/15 border border-accent/30 text-accent font-bold text-xs font-mono">
              {frontmatter.author.name
                .split(' ')
                .map(n => n[0])
                .join('')}
            </div>
            <div>
              <p className="text-sm font-bold text-ink">{frontmatter.author.name}</p>
              <p className="text-xs text-ink-muted font-mono">{frontmatter.author.role}</p>
            </div>
          </div>
        </div>
      </section>

      {/* TWO-COLUMN LAYOUT: STICKY TOC LEFT, PROSE CONTENT RIGHT */}
      <section className="max-w-7xl mx-auto px-6 md:px-12">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
          {/* Sticky TOC Sidebar */}
          <aside className="hidden lg:block lg:col-span-3 sticky top-28 space-y-4 rounded-2xl border border-border bg-surface-raised p-6">
            <p className="text-xs font-bold uppercase tracking-wider text-ink font-mono">
              Table of Contents
            </p>
            <nav className="space-y-2 text-xs">
              {headings.map((h, idx) => (
                <a
                  key={idx}
                  href={`#${h.title.toLowerCase().replace(/[^a-z0-9]+/g, '-')}`}
                  className="block text-ink-muted hover:text-accent transition-colors leading-relaxed line-clamp-2"
                >
                  {h.title}
                </a>
              ))}
            </nav>
          </aside>

          {/* Prose Content */}
          <article className="lg:col-span-9 max-w-3xl space-y-8 text-base md:text-lg text-ink-muted leading-relaxed">
            {content
              .split('\n\n')
              .filter(p => p.trim().length > 0 && !p.startsWith('# '))
              .map((block, idx) => {
                if (block.startsWith('## ')) {
                  const headingText = block.replace('## ', '').trim();
                  const headingId = headingText.toLowerCase().replace(/[^a-z0-9]+/g, '-');
                  return (
                    <h2
                      key={idx}
                      id={headingId}
                      className="text-2xl sm:text-3xl font-bold tracking-tight text-ink pt-8 text-scroll-margin"
                    >
                      {headingText}
                    </h2>
                  );
                }
                if (block.startsWith('```')) {
                  const code = block.replace(/```[a-z]*\n?/gi, '').trim();
                  return (
                    <div
                      key={idx}
                      className="rounded-2xl border border-border bg-surface-raised p-6 font-mono text-xs text-accent overflow-x-auto"
                    >
                      <pre>{code}</pre>
                    </div>
                  );
                }
                if (block.startsWith('|')) {
                  return (
                    <div key={idx} className="my-6 overflow-x-auto rounded-xl border border-border">
                      <div className="p-4 text-xs font-mono text-ink">
                        {block}
                      </div>
                    </div>
                  );
                }
                if (block.startsWith('1. ') || block.startsWith('- ')) {
                  const items = block.split('\n');
                  return (
                    <ul key={idx} className="space-y-2.5 my-4 pl-4 border-l border-accent/40 text-base text-ink-muted">
                      {items.map((item, i) => (
                        <li key={i} className="leading-relaxed">
                          {item.replace(/^[0-9]+\.\s+|^-\s+/, '')}
                        </li>
                      ))}
                    </ul>
                  );
                }
                return (
                  <p key={idx} className="leading-relaxed">
                    {block}
                  </p>
                );
              })}

            {/* Author Bio Box */}
            <div className="mt-16 rounded-3xl border border-border bg-surface-raised p-8 flex items-start gap-5">
              <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-accent/20 border border-accent/40 text-accent font-bold text-sm font-mono">
                <User className="h-6 w-6" />
              </div>
              <div className="space-y-1.5">
                <h3 className="text-base font-bold text-ink">{frontmatter.author.name}</h3>
                <p className="text-xs text-ink-subtle font-mono">{frontmatter.author.role} at TechCentera</p>
                <p className="text-xs sm:text-sm text-ink-muted leading-relaxed pt-1">
                  Specializing in governed enterprise AI systems, deterministic pipeline orchestration, and legacy ERP interoperability architectures.
                </p>
              </div>
            </div>
          </article>
        </div>
      </section>

      {/* RELATED POSTS (3 Cards) */}
      {relatedPosts.length > 0 && (
        <section className="max-w-7xl mx-auto px-6 md:px-12 space-y-8 border-t border-border pt-16">
          <div className="space-y-2">
            <Badge variant="accent">Continue Reading</Badge>
            <h2 className="text-2xl sm:text-3xl font-bold text-ink">Related Publications</h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {relatedPosts.map(p => (
              <Link
                key={p.frontmatter.slug}
                href={`/blog/${p.frontmatter.slug}`}
                className="group rounded-2xl border border-border bg-surface-raised p-6 card-hover-effect hover:border-accent/40 space-y-3"
              >
                <Badge variant="outline">{p.frontmatter.category}</Badge>
                <h3 className="text-lg font-bold text-ink group-hover:text-accent transition-colors leading-snug">
                  {p.frontmatter.title}
                </h3>
                <p className="text-xs text-ink-muted line-clamp-2 leading-relaxed">
                  {p.frontmatter.excerpt}
                </p>
                <div className="pt-2 text-xs text-accent font-semibold flex items-center gap-1">
                  <span>Read Article</span>
                  <ArrowUpRight className="h-3.5 w-3.5" />
                </div>
              </Link>
            ))}
          </div>
        </section>
      )}

      {/* CTA BAND */}
      <CTABand
        title="Transform Your Operations with Governed Architecture"
        description="Book a technical discovery session to explore custom AI and software for your enterprise."
      />
    </div>
  );
}
