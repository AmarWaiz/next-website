import type { Metadata } from 'next';
import Link from 'next/link';
import { Button } from '@/ui/Button';
import { Badge } from '@/ui/Badge';
import { SectionHeading } from '@/components/sections/SectionHeading';
import { StatsStrip } from '@/components/sections/StatsStrip';
import { CTABand } from '@/components/sections/CTABand';
import { ArrowRight, ShieldCheck, Code2, RefreshCw } from 'lucide-react';
import { getPayload } from 'payload';
import config from '@payload-config';

export const dynamic = 'force-dynamic';

export const metadata: Metadata = {
  title: 'About Our Engineering Approach',
  description:
    'TechCentera builds bespoke AI automation and custom software for mid-market leaders who value code ownership, data privacy, and deterministic reliability.',
};

const defaultPrinciples = [
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

export default async function AboutPage() {
  let cmsAbout: any = null;
  try {
    const payload = await getPayload({ config });
    const { docs } = await payload.find({
      collection: 'pages',
      where: { slug: { equals: 'about' } },
    });
    cmsAbout = docs[0] || null;
  } catch (err) {
    console.error('Payload fetch error on About page:', err);
  }

  const badge = cmsAbout?.hero?.badge || 'About TechCentera';
  const headline = cmsAbout?.hero?.headline || 'Engineering Autonomous Systems You Actually Own.';
  const description =
    cmsAbout?.hero?.description ||
    'We help operations and technology leaders eliminate manual work through bespoke AI automation pipelines and custom enterprise software without recurring licensing extortion.';
  const primaryBtn = cmsAbout?.hero?.primaryButton || { label: 'Book a Consultation', url: '/contact' };
  const secondaryBtn = cmsAbout?.hero?.secondaryButton || { label: 'Explore Live Systems', url: '/services' };

  return (
    <div className="space-y-24 md:space-y-36 pb-16">
      {/* 1. HERO */}
      <section className="relative pt-12 md:pt-20 lg:pt-28 overflow-hidden">
        <div className="pointer-events-none absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[400px] bg-accent/15 blur-[120px] rounded-full -z-10" />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-12 space-y-12">
          <div className="max-w-4xl space-y-8">
            <Badge variant="accent" withDot>
              {badge}
            </Badge>

            <h1 className="text-4xl sm:text-6xl lg:text-7xl font-extrabold tracking-tight text-ink leading-[1.06]">
              {headline}
            </h1>

            <p className="text-lg sm:text-xl text-ink-muted leading-relaxed prose-measure">
              {description}
            </p>

            <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-4 pt-2">
              <Link href={primaryBtn.url || '/contact'}>
                <Button variant="accent" size="lg" className="w-full sm:w-auto text-sm font-bold gap-2 shadow-lg shadow-accent/25 whitespace-nowrap" rightIcon={<ArrowRight className="h-4 w-4" />}>
                  {primaryBtn.label || 'Book a Consultation'}
                </Button>
              </Link>
              <Link href={secondaryBtn.url || '/services'}>
                <Button variant="secondary" size="lg" className="w-full sm:w-auto text-sm font-semibold hover:border-white/30 whitespace-nowrap">
                  {secondaryBtn.label || 'Explore Live Systems'}
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* 2. STATS */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-12">
        <StatsStrip />
      </section>

      {/* 3. CORE PRINCIPLES */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-12 space-y-12">
        <SectionHeading
          badge="Core Philosophy"
          title="The Principles That Drive Our Engineering"
          description="How we approach technical challenges differently than traditional digital agencies and SaaS vendors."
        />

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {defaultPrinciples.map(p => {
            const Icon = p.icon;
            return (
              <div
                key={p.title}
                className="rounded-3xl border border-border bg-surface-raised p-8 space-y-4 card-hover-effect hover:border-white/25"
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

      {/* 4. CTA */}
      <CTABand />
    </div>
  );
}
