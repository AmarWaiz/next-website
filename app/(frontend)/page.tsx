import Link from 'next/link';
import { Button } from '@/ui/Button';
import { StatsStrip } from '@/components/sections/StatsStrip';
import { SectionHeading } from '@/components/sections/SectionHeading';
import { ServiceCard } from '@/components/sections/ServiceCard';
import { HeroBackgroundVideo } from '@/components/sections/HeroBackgroundVideo';
import { ReviewsCarousel } from '@/components/sections/ReviewsCarousel';
import { Accordion } from '@/ui/Accordion';
import { CTABand } from '@/components/sections/CTABand';
import { getAllServices } from '@/lib/mdx';
import { ArrowRight, ShieldCheck, Database, Cpu, CheckCircle2 } from 'lucide-react';

const homeFaqs = [
  {
    question: 'How does TechCentera prevent AI hallucinations in production workflows?',
    answer:
      'We enforce deterministic boundary checks, structured schema outputs, and multi-stage verification pipelines. Queries exceeding risk thresholds route directly to human operators.',
  },
  {
    question: 'Who owns the intellectual property and codebase of custom systems?',
    answer:
      'You retain 100% ownership of all custom software, database schemas, and orchestration logic with zero recurring seat licensing or vendor lock-in.',
  },
  {
    question: 'Can your automation pipelines connect to legacy on-premise ERPs?',
    answer:
      'Yes. We engineer resilient middleware connectors that interface safely with legacy SQL, AS400, SOAP endpoints, and custom databases.',
  },
  {
    question: 'What is the typical timeline for an enterprise AI deployment?',
    answer:
      'Standard automated workflows and voice systems deploy within 3 to 4 weeks, including knowledge ingestion, compliance calibration, and operator onboarding.',
  },
  {
    question: 'How do you handle data privacy and compliance standards?',
    answer:
      'All solutions deploy directly into your private cloud (AWS, GCP, Azure) with strict role-based access controls, automated PII redaction, and full audit logs.',
  },
];

const differentiators = [
  {
    icon: ShieldCheck,
    title: 'Governed AI Guardrails',
    description:
      'Deterministic verification rules guarantee error-free transactions and zero unconstrained model outputs.',
  },
  {
    icon: Cpu,
    title: '100% Code & IP Ownership',
    description:
      'No recurring per-seat software licensing fees or closed-ecosystem lock-in. You own every line of code.',
  },
  {
    icon: Database,
    title: 'Legacy System Interoperability',
    description:
      'Connect modern artificial intelligence agents to existing SQL, ERP, and CRM databases without rip-and-replace.',
  },
];

const processSteps = [
  {
    step: '01',
    title: 'System & Workflow Audit',
    description: 'Map operational bottlenecks, existing data models, and high-impact automation targets.',
  },
  {
    step: '02',
    title: 'Bespoke Architecture Engineering',
    description: 'Build validated schemas, deterministic agent pipelines, and high-velocity operator interfaces.',
  },
  {
    step: '03',
    title: 'Shadow Testing & Calibration',
    description: 'Run parallel validation against historical workflows to verify precision and safety bounds.',
  },
  {
    step: '04',
    title: 'Production Handover & Autonomy',
    description: 'Deploy into your cloud infrastructure with telemetry monitoring and complete documentation.',
  },
];

export default function HomePage() {
  const services = getAllServices();

  return (
    <div className="space-y-24 md:space-y-32 pb-16">
      {/* 1. HERO WITH AI-STYLE AUTOPLAY BACKGROUND VIDEO & NEURAL CANVAS */}
      <section className="relative pt-20 md:pt-28 lg:pt-32 pb-6 overflow-hidden flex flex-col justify-center">
        {/* Autoplay AI Neural / Video Canvas Background */}
        <HeroBackgroundVideo />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-12 space-y-12 w-full">
          {/* Hero Typography & CTA Block */}
          <div className="max-w-4xl mx-auto text-center space-y-8">
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-accent/40 bg-accent/15 text-accent text-xs font-mono font-bold tracking-tight shadow-lg shadow-accent/10 backdrop-blur-md">
              <span className="h-2 w-2 rounded-full bg-accent animate-ping" />
              <span>ENTERPRISE GOVERNED AI & CUSTOM SOFTWARE</span>
            </div>

            <h1 className="text-4xl sm:text-6xl lg:text-7xl font-extrabold tracking-tight text-ink leading-[1.06]">
              Governed AI Automation & Custom Enterprise Software.
            </h1>

            <p className="text-base sm:text-xl text-ink-muted leading-relaxed max-w-3xl mx-auto">
              We engineer bespoke conversational AI receptionists, autonomous workflow pipelines, and custom ERP systems for mid-market operations. Zero vendor lock-in. Full IP ownership.
            </p>

            <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-2">
              <Link href="/contact" className="w-full sm:w-auto">
                <Button variant="accent" size="lg" className="w-full sm:w-auto text-sm font-bold gap-2 shadow-xl shadow-accent/25" rightIcon={<ArrowRight className="h-4 w-4" />}>
                  Book a Consultation
                </Button>
              </Link>
              <Link href="/services" className="w-full sm:w-auto">
                <Button variant="secondary" size="lg" className="w-full sm:w-auto text-sm font-semibold hover:border-white/30">
                  Explore Live Systems
                </Button>
              </Link>
            </div>

            {/* Credential highlights strip */}
            <div className="pt-6 flex flex-wrap items-center justify-center gap-6 text-xs font-mono text-ink-muted border-t border-border/50 max-w-2xl mx-auto">
              <span className="flex items-center gap-1.5 text-ink">
                <CheckCircle2 className="h-3.5 w-3.5 text-accent" /> Zero Vendor Lock-In
              </span>
              <span className="flex items-center gap-1.5 text-ink">
                <CheckCircle2 className="h-3.5 w-3.5 text-accent" /> 100% Code Ownership
              </span>
              <span className="flex items-center gap-1.5 text-ink">
                <CheckCircle2 className="h-3.5 w-3.5 text-accent" /> Sub-500ms Execution
              </span>
            </div>
          </div>
        </div>
      </section>

      {/* 2. STATS SECTION */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-12">
        <StatsStrip />
      </section>

      {/* 3. SERVICES SECTION */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-12 space-y-12">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
          <SectionHeading
            badge="Capabilities"
            title="Purpose-Built Engineering Across Your Core Operations"
            description="Replace disjointed SaaS subscriptions with integrated agentic infrastructure tailored to your exact operational workflows."
          />
          <Link href="/services" className="shrink-0">
            <Button variant="outline" size="md" className="gap-2 font-semibold">
              <span>View All Services</span>

            </Button>
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {services.map(s => (
            <ServiceCard
              key={s.frontmatter.slug}
              title={s.frontmatter.title}
              slug={s.frontmatter.slug}
              order={s.frontmatter.order}
              shortDescription={s.frontmatter.shortDescription}
              features={s.frontmatter.includedFeatures}
            />
          ))}
        </div>
      </section>

      {/* 4. WHY US / DIFFERENTIATORS */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-12 space-y-12">
        <SectionHeading
          badge="Why TechCentera"
          title="Engineered for Autonomy, Precision, and Permanent Ownership"
          description="We reject disposable prompt wrappers. We build resilient software infrastructure that scales your operational capacity without recurring software debt."
        />

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {differentiators.map(item => {
            const Icon = item.icon;
            return (
              <div
                key={item.title}
                className="rounded-3xl border border-border bg-surface-raised p-8 space-y-4 card-hover-effect hover:border-white/25"
              >
                <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-accent/15 border border-accent/30 text-accent">
                  <Icon className="h-6 w-6" />
                </div>
                <h3 className="text-xl font-bold text-ink">{item.title}</h3>
                <p className="text-sm text-ink-muted leading-relaxed">
                  {item.description}
                </p>
              </div>
            );
          })}
        </div>
      </section>

      {/* 5. PROCESS SECTION */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-12 space-y-12">
        <SectionHeading
          badge="Execution Methodology"
          title="A Disciplined Four-Stage Engineering Lifecycle"
          description="From initial schema audit to sovereign cloud deployment, our process ensures zero downtime and rapid return on investment."
        />

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {processSteps.map(p => (
            <div
              key={p.step}
              className="relative rounded-2xl border border-border bg-surface-raised p-7 space-y-4 card-hover-effect hover:border-white/25"
            >
              <span className="font-mono text-2xl font-black text-accent">
                {p.step}
              </span>
              <h3 className="text-lg font-bold text-ink leading-snug">{p.title}</h3>
              <p className="text-xs sm:text-sm text-ink-muted leading-relaxed">
                {p.description}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* 6. REVIEWS CAROUSEL SECTION */}
      <ReviewsCarousel />

      {/* 7. FULL-WIDTH FAQ SECTION */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-12 space-y-12">
        <SectionHeading
          badge="Frequently Asked Questions"
          title="Clear Answers on Architecture, Security, and Governance"
          description="Everything you need to evaluate our engineering approach, deployment parameters, and data sovereignty safeguards."
        />

        <div className="w-full">
          <Accordion items={homeFaqs} />
        </div>
      </section>

      {/* 8. CTA BAND */}
      <CTABand />
    </div>
  );
}
