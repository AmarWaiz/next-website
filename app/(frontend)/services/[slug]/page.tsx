import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import Link from 'next/link';
import Image from 'next/image';
import { getServiceBySlug, getAllServices } from '@/lib/mdx';
import { Button } from '@/ui/Button';
import { Badge } from '@/ui/Badge';
import { SectionHeading } from '@/components/sections/SectionHeading';
import { Accordion } from '@/ui/Accordion';
import { ServiceCard } from '@/components/sections/ServiceCard';
import { CTABand } from '@/components/sections/CTABand';
import { ArrowRight, CheckCircle2 } from 'lucide-react';

interface Props {
  params: Promise<{ slug: string }>;
}

const serviceImages: Record<string, string> = {
  'ai-receptionist': '/images/ai-receptionist.jpg',
  'ai-customer-support': '/images/ai-support.jpg',
  'ai-workflow-automation': '/images/ai-workflow.jpg',
  'custom-crm-erp': '/images/custom-crm-erp.jpg',
};

export async function generateStaticParams() {
  const services = getAllServices();
  return services.map(s => ({
    slug: s.frontmatter.slug,
  }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const service = getServiceBySlug(slug);
  if (!service) return { title: 'Service Not Found' };

  return {
    title: `${service.frontmatter.title} | TechCentera Enterprise Services`,
    description: service.frontmatter.shortDescription,
    openGraph: {
      title: `${service.frontmatter.title} | TechCentera`,
      description: service.frontmatter.shortDescription,
    },
  };
}

export default async function SingleServicePage({ params }: Props) {
  const { slug } = await params;
  const service = getServiceBySlug(slug);
  if (!service) notFound();

  const allServices = getAllServices();
  const otherServices = allServices.filter(s => s.frontmatter.slug !== slug);

  const { frontmatter } = service;
  const heroImg = serviceImages[slug] || '/images/hero-preview.jpg';

  // JSON-LD Service schema
  const serviceSchema = {
    '@context': 'https://schema.org',
    '@type': 'Service',
    name: frontmatter.title,
    provider: {
      '@type': 'Organization',
      name: 'TechCentera',
      url: 'https://techcentera.com',
    },
    description: frontmatter.shortDescription,
    offers: {
      '@type': 'Offer',
      priceCurrency: 'USD',
      availability: 'https://schema.org/InStock',
    },
  };

  return (
    <div className="space-y-24 md:space-y-36 pb-16">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(serviceSchema) }}
      />

      {/* 1. SERVICE HERO */}
      <section className="relative pt-12 md:pt-20 lg:pt-28 overflow-hidden">
        <div className="pointer-events-none absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[400px] bg-accent/15 blur-[120px] rounded-full -z-10" />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-12 space-y-12">
          <div className="max-w-4xl space-y-6">
            <div className="flex items-center gap-3">
              <Link href="/services" className="text-xs font-mono text-ink-muted hover:text-accent transition-colors">
                ← Back to Services Hub
              </Link>
              <span className="text-ink-subtle">/</span>
              <Badge variant="accent" withDot>
                {frontmatter.title}
              </Badge>
            </div>

            <h1 className="text-4xl sm:text-6xl lg:text-7xl font-extrabold tracking-tight text-ink leading-[1.08]">
              {frontmatter.tagline}
            </h1>

            <p className="text-lg sm:text-xl text-ink-muted leading-relaxed prose-measure">
              {frontmatter.shortDescription}
            </p>

            <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-4 pt-2">
              <Link href="/contact">
                <Button variant="accent" size="lg" className="w-full sm:w-auto text-sm font-bold gap-2 shadow-lg shadow-accent/25" rightIcon={<ArrowRight className="h-4 w-4" />}>
                  Book a Consultation
                </Button>
              </Link>
            </div>
          </div>

          {/* High-Res Service Architecture Image Preview */}
          <div className="relative aspect-video w-full rounded-3xl overflow-hidden border border-border bg-surface-raised shadow-2xl shadow-accent/10">
            <Image
              src={heroImg}
              alt={frontmatter.title}
              fill
              priority
              className="object-cover"
              sizes="(max-width: 1200px) 100vw, 1200px"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent" />
          </div>
        </div>
      </section>

      {/* 2. WHAT IT IS */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-12">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
          <div className="lg:col-span-5 space-y-4">
            <Badge variant="default">Architecture Overview</Badge>
            <h2 className="text-3xl sm:text-4xl font-bold text-ink leading-tight">
              Engineered for Mission-Critical Operational Flow
            </h2>
          </div>
          <div className="lg:col-span-7 space-y-6 text-base sm:text-lg text-ink-muted leading-relaxed">
            <p>
              Traditional off-the-shelf software forces businesses to bend their operational models around rigid templates. We build custom-tailored systems that match your exact business logic, data models, and team roles.
            </p>
            <p>
              Every deployment includes deterministic guardrails, real-time telemetry, and complete intellectual property ownership. You operate with absolute sovereignty and zero recurring license taxes.
            </p>
          </div>
        </div>
      </section>

      {/* 3. WHAT'S INCLUDED */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-12 space-y-12">
        <SectionHeading
          badge="Scope & Features"
          title="Everything Included in Your Dedicated Deployment"
          description="Every component is custom-engineered, tested against your historical data, and transferred with complete source code."
        />

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {frontmatter.includedFeatures.map((feat, idx) => (
            <div
              key={idx}
              className="flex items-start gap-4 rounded-2xl border border-border bg-surface-raised p-6 card-hover-effect hover:border-accent/40"
            >
              <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-accent/15 border border-accent/30 text-accent mt-0.5">
                <CheckCircle2 className="h-4 w-4" />
              </div>
              <p className="text-sm font-medium text-ink leading-relaxed">
                {feat}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* 4. OUTCOMES */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-12 space-y-12">
        <SectionHeading
          badge="Measured Impact"
          title="Performance Benchmarks Verified in Production"
          description="Real outcomes delivered across customer workflows, data pipelines, and operational capacity."
        />

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {frontmatter.outcomes.map((item, idx) => (
            <div
              key={idx}
              className="rounded-3xl border border-border bg-surface-raised p-8 space-y-3 card-hover-effect hover:border-accent/40"
            >
              <span className="font-mono text-4xl sm:text-5xl font-black text-accent">
                {item.metric}
              </span>
              <h3 className="text-lg font-bold text-ink">{item.label}</h3>
              <p className="text-xs sm:text-sm text-ink-muted leading-relaxed">
                {item.context}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* 5. HOW IT WORKS */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-12 space-y-12">
        <SectionHeading
          badge="Implementation Stages"
          title="Three Stages from Architecture to Autonomy"
          description="Our structured delivery roadmap ensures seamless onboarding and rapid time to value."
        />

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {frontmatter.processSteps.map(p => (
            <div
              key={p.step}
              className="rounded-3xl border border-border bg-surface-raised p-8 space-y-4 card-hover-effect hover:border-accent/40"
            >
              <span className="font-mono text-2xl font-black text-accent">{p.step}</span>
              <h3 className="text-lg font-bold text-ink">{p.title}</h3>
              <p className="text-xs sm:text-sm text-ink-muted leading-relaxed">
                {p.description}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* 6. OTHER 3 SERVICES CROSS-LINKS */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-12 space-y-12">
        <SectionHeading
          badge="Related Services"
          title="Complementary Systems for Full Operational Coverage"
          description="Explore our other core engineering disciplines to build an integrated automation architecture."
        />

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {otherServices.map(s => (
            <ServiceCard
              key={s.frontmatter.slug}
              title={s.frontmatter.title}
              slug={s.frontmatter.slug}
              order={s.frontmatter.order}
              shortDescription={s.frontmatter.shortDescription}
            />
          ))}
        </div>
      </section>

      {/* 7. FAQ & CTA BAND */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-12 space-y-12">
        <SectionHeading
          badge="Service FAQ"
          title={`Frequently Asked Questions About ${frontmatter.title}`}
        />

        <div className="w-full">
          <Accordion items={frontmatter.faqs} />
        </div>
      </section>

      <CTABand
        title={`Deploy Your Custom ${frontmatter.title} Today`}
        description="Connect with our lead architects to discuss requirements, data schemas, and deployment timelines."
      />
    </div>
  );
}
