import type { Metadata } from 'next';
import Link from 'next/link';
import Image from 'next/image';
import { Button } from '@/ui/Button';
import { Badge } from '@/ui/Badge';
import { SectionHeading } from '@/components/sections/SectionHeading';
import { StatsStrip } from '@/components/sections/StatsStrip';
import { CTABand } from '@/components/sections/CTABand';
import { ArrowRight, ShieldCheck, Code2, RefreshCw } from 'lucide-react';

export const metadata: Metadata = {
  title: 'About Our Engineering Approach',
  description:
    'TechCentera builds bespoke AI automation and custom software for mid-market leaders who value code ownership, data privacy, and deterministic reliability.',
};

const principles = [
  {
    icon: Code2,
    title: 'Code Ownership Over SaaS Rental',
    description: 'We believe core business software is an asset, not a rental. You receive 100% intellectual property ownership with zero recurring seat fees.',
  },
  {
    icon: ShieldCheck,
    title: 'Governed AI Over Black-Box Prompts',
    description: 'We enforce deterministic validation boundaries and structured schemas so your autonomous systems never hallucinate or compromise compliance.',
  },
  {
    icon: RefreshCw,
    title: 'Interoperability Over Rip-and-Replace',
    description: 'We build intelligent bridges to your existing databases, ERPs, and legacy APIs rather than forcing high-risk software migrations.',
  },
];

export default function AboutPage() {
  return (
    <div className="space-y-24 md:space-y-36 pb-16">
      {/* 1. HERO */}
      <section className="relative pt-12 md:pt-20 lg:pt-28 overflow-hidden">
        <div className="pointer-events-none absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[400px] bg-accent/15 blur-[120px] rounded-full -z-10" />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-12 space-y-12">
          <div className="max-w-4xl space-y-8">
            <Badge variant="accent" withDot>
              About TechCentera
            </Badge>

            <h1 className="text-4xl sm:text-6xl lg:text-7xl font-extrabold tracking-tight text-ink leading-[1.06]">
              Engineering Autonomous Systems You Actually Own.
            </h1>

            <p className="text-lg sm:text-xl text-ink-muted leading-relaxed prose-measure">
              We help operations and technology leaders eliminate manual work through bespoke AI automation pipelines and custom enterprise software without recurring licensing extortion.
            </p>

            <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-4 pt-2">
              <Link href="/contact">
                <Button variant="accent" size="lg" className="w-full sm:w-auto text-sm font-bold gap-2 shadow-lg shadow-accent/25" rightIcon={<ArrowRight className="h-4 w-4" />}>
                  Book a Consultation
                </Button>
              </Link>
            </div>
          </div>

          {/* Hero Visual Mockup */}
          <div className="relative aspect-[21/9] w-full rounded-3xl overflow-hidden border border-border bg-surface-raised shadow-2xl shadow-accent/10">
            <Image
              src="/images/hero-preview.jpg"
              alt="TechCentera Systems Architecture"
              fill
              priority
              className="object-cover opacity-90"
              sizes="(max-width: 1200px) 100vw, 1200px"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent" />
          </div>
        </div>
      </section>

      {/* 2. WHO WE ARE */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-12">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
          <div className="lg:col-span-5 space-y-4">
            <Badge variant="default">Our Focus</Badge>
            <h2 className="text-3xl sm:text-4xl font-bold text-ink leading-tight">
              Enterprise Software Built for Operational Leaders
            </h2>
          </div>
          <div className="lg:col-span-7 space-y-6 text-base sm:text-lg text-ink-muted leading-relaxed">
            <p>
              TechCentera was founded to solve a fundamental problem in enterprise technology: companies were trapped between rigid, overpriced SaaS subscriptions and fragile, unconstrained AI experiments.
            </p>
            <p>
              We engineer mission-critical systems that integrate directly with your existing infrastructure. Our clients gain scalable automated capacity, complete data privacy, and the freedom of total software ownership.
            </p>
          </div>
        </div>
      </section>

      {/* 3. HOW WE WORK */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-12 space-y-12">
        <SectionHeading
          badge="Engineering Philosophy"
          title="The Core Principles Guiding Our Architecture"
          description="We build software designed to withstand heavy enterprise volume, regulatory scrutiny, and long-term organizational growth."
        />

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {principles.map(p => {
            const Icon = p.icon;
            return (
              <div
                key={p.title}
                className="rounded-3xl border border-border bg-surface-raised p-8 space-y-4 card-hover-effect hover:border-accent/40"
              >
                <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-accent/15 border border-accent/30 text-accent">
                  <Icon className="h-6 w-6" />
                </div>
                <h3 className="text-xl font-bold text-ink">{p.title}</h3>
                <p className="text-sm text-ink-muted leading-relaxed">
                  {p.description}
                </p>
              </div>
            );
          })}
        </div>
      </section>

      {/* 4. STATS STRIP */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-12">
        <StatsStrip />
      </section>

      {/* 5. CTA BAND */}
      <CTABand
        title="Build Your Enterprise Automation Roadmap With Us"
        description="Schedule an architectural review with our principal engineers to evaluate your workflows and systems."
      />
    </div>
  );
}
