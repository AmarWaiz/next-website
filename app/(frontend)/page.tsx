import Link from 'next/link';
import { Button } from '@/components/ui/Button';
import { StatsStrip } from '@/components/sections/StatsStrip';
import { SectionHeading } from '@/components/sections/SectionHeading';
import { ServiceCard } from '@/components/sections/ServiceCard';
import { HeroBackgroundVideo } from '@/components/sections/HeroBackgroundVideo';
import { ReviewsCarousel } from '@/components/sections/ReviewsCarousel';
import { Accordion } from '@/components/ui/Accordion';
import { CTABand } from '@/components/sections/CTABand';
import { getAllServices } from '@/lib/mdx';
import { ArrowRight, ShieldCheck, Database, Cpu, CheckCircle2 } from 'lucide-react';
import { getPayload } from 'payload';
import config from '@payload-config';

export const dynamic = 'force-dynamic';

const defaultFaqs = [
  {
    question: 'How is TechCentera different from off-the-shelf AI wrappers and SaaS tools?',
    answer:
      'Off-the-shelf tools force your workflows into rigid templates, store your data in shared multi-tenant clouds, and charge per-seat monthly subscription taxes. TechCentera engineers sovereign, bespoke software and agentic workflows that you own 100% with no recurring licensing fees and deterministic data security.',
  },
  {
    question: 'Do we own the intellectual property and source code?',
    answer:
      'Yes. Unlike SaaS platforms where you rent features, TechCentera delivers 100% intellectual property ownership upon project completion. You receive all application repositories, relational schemas, pipeline configurations, and infrastructure-as-code scripts.',
  },
  {
    question: 'How do you prevent hallucinations in AI receptionists and support systems?',
    answer:
      'We implement deterministic guardrails, structured JSON schema validation, and confidence-gated Retrieval-Augmented Generation (RAG). Every prompt execution is constrained by strict domain rules, and low-confidence requests gracefully escalate to human operators.',
  },
  {
    question: 'Can your solutions integrate with our legacy on-premise or cloud ERP systems?',
    answer:
      'Yes. Our engineers specialize in bi-directional API bridges, custom event queues (Kafka, RabbitMQ, SQS), and direct database synchronization for legacy systems including SAP, NetSuite, Salesforce, Microsoft Dynamics, and custom SQL databases.',
  },
  {
    question: 'What is your typical project implementation timeline and handover process?',
    answer:
      'A typical bespoke deployment follows our 4-stage engineering methodology and takes between 4 to 8 weeks from schema audit to live cloud handover. Every deployment includes complete documentation, observability dashboards, and operator onboarding.',
  },
];

const defaultDifferentiators = [
  {
    icon: ShieldCheck,
    title: 'Deterministic Guardrails',
    description:
      'We reject unconstrained prompt wrappers. Our systems validate inputs against strict business rules, schema constraints, and compliance checks before execution.',
  },
  {
    icon: Database,
    title: '100% Sovereign IP Ownership',
    description:
      'You own all schemas, models, and application repositories. Zero proprietary license lock-in or recurring seat taxes.',
  },
  {
    icon: Cpu,
    title: 'Sub-Second Edge Latency',
    description:
      'Engineered on high-throughput microservices for voice synthesis and multi-system synchronization without operational delay.',
  },
];

const defaultProcessSteps = [
  {
    step: '01',
    title: 'Architecture & Workflow Audit',
    description: 'Map data flows, operational bottlenecks, telephony trunks, and data security parameters across your core business.',
  },
  {
    step: '02',
    title: 'Bespoke Pipeline Engineering',
    description: 'Build deterministic pipelines, telephony bridges, and relational schemas tailored to your exact data model.',
  },
  {
    step: '03',
    title: 'Rigorous Verification & Testing',
    description: 'Test thousands of real-world edge cases with automated evaluation benchmarks to ensure 99.4%+ accuracy.',
  },
  {
    step: '04',
    title: 'Production Handover & Autonomy',
    description: 'Deploy into your cloud infrastructure with telemetry monitoring and complete documentation.',
  },
];

export default async function HomePage() {
  let cmsHome: any = null;
  let cmsServices: any[] = [];
  let cmsTestimonials: any[] = [];

  try {
    const payload = await getPayload({ config });
    const { docs: pages } = await payload.find({
      collection: 'pages',
      where: { slug: { equals: 'home' } },
    });
    cmsHome = pages[0] || null;

    const { docs: sDocs } = await payload.find({
      collection: 'services',
      sort: 'order',
    });
    cmsServices = sDocs || [];

    const { docs: tDocs } = await payload.find({
      collection: 'testimonials',
    });
    cmsTestimonials = tDocs || [];
  } catch (err) {
    console.error('Payload CMS data fetch error:', err);
  }

  const reviewsList = cmsTestimonials.length > 0
    ? cmsTestimonials.map((t: any) => ({
        id: String(t.id),
        quote: t.quote,
        author: t.author,
        role: t.role,
        company: t.company,
        initials: t.initials,
        verifiedTag: t.verifiedTag,
      }))
    : undefined;

  // Fallback to MDX services if CMS collection empty
  const fallbackServices = getAllServices();
  const servicesList = cmsServices.length > 0
    ? cmsServices.map((s: any) => {
        let img = s.heroImage || '/images/hero-preview.jpg';
        if (s.mediaImage && typeof s.mediaImage === 'object' && s.mediaImage.url) {
          img = s.mediaImage.url;
        }
        return {
          title: s.title,
          slug: s.slug,
          order: s.order,
          shortDescription: s.shortDescription,
          imageSrc: img,
          features: (s.includedFeatures || []).map((f: any) => typeof f === 'string' ? f : f.item || f.feature),
        };
      })
    : fallbackServices.map((s: any) => ({
        title: s.frontmatter.title,
        slug: s.frontmatter.slug,
        order: s.frontmatter.order,
        shortDescription: s.frontmatter.shortDescription,
        imageSrc: `/images/${s.frontmatter.slug}.jpg`,
        features: s.frontmatter.includedFeatures,
      }));

  // Extract CMS fields with fallbacks
  const heroBadge = cmsHome?.hero?.badge || 'ENTERPRISE GOVERNED AI & CUSTOM SOFTWARE';
  const heroHeadline = cmsHome?.hero?.headline || 'Governed AI Automation & Custom Enterprise Software.';
  const heroDescription = cmsHome?.hero?.description || 'We engineer bespoke conversational AI receptionists, autonomous workflow pipelines, and custom ERP systems for mid-market operations. Zero vendor lock-in. Full IP ownership.';
  const heroPrimaryBtn = cmsHome?.hero?.primaryButton || { label: 'Book a Consultation', url: '/contact' };
  const heroSecondaryBtn = cmsHome?.hero?.secondaryButton || { label: 'Explore Live Systems', url: '/services' };
  const heroTrustPoints = cmsHome?.hero?.trustPoints && cmsHome.hero.trustPoints.length > 0
    ? cmsHome.hero.trustPoints.map((tp: any) => typeof tp === 'string' ? tp : tp.text)
    : ['Zero Vendor Lock-In', '100% Code Ownership', 'Sub-500ms Execution'];

  const differentiatorsList = cmsHome?.differentiators && cmsHome.differentiators.length > 0
    ? cmsHome.differentiators.map((d: any) => ({
        title: d.title,
        description: d.description,
        icon: d.icon === 'database' ? Database : d.icon === 'cpu' ? Cpu : ShieldCheck,
      }))
    : defaultDifferentiators;

  const processList = cmsHome?.processSteps && cmsHome.processSteps.length > 0
    ? cmsHome.processSteps.map((p: any) => ({
        step: p.stepNumber || p.step,
        title: p.title,
        description: p.description,
      }))
    : defaultProcessSteps;

  const faqsList = cmsHome?.faqs && cmsHome.faqs.length > 0
    ? cmsHome.faqs.map((f: any) => ({ question: f.question, answer: f.answer }))
    : defaultFaqs;

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
              <span>{heroBadge}</span>
            </div>

            <h1 className="text-4xl sm:text-6xl lg:text-7xl font-extrabold tracking-tight text-ink leading-[1.06]">
              {heroHeadline}
            </h1>

            <p className="text-base sm:text-xl text-ink-muted leading-relaxed max-w-3xl mx-auto">
              {heroDescription}
            </p>

            <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-2">
              <Link href={heroPrimaryBtn.url || '/contact'} className="w-full sm:w-auto">
                <Button variant="accent" size="lg" className="w-full sm:w-auto text-sm font-bold gap-2 shadow-xl shadow-accent/25 whitespace-nowrap" rightIcon={<ArrowRight className="h-4 w-4" />}>
                  {heroPrimaryBtn.label || 'Book a Consultation'}
                </Button>
              </Link>
              <Link href={heroSecondaryBtn.url || '/services'} className="w-full sm:w-auto">
                <Button variant="secondary" size="lg" className="w-full sm:w-auto text-sm font-semibold hover:border-white/30 whitespace-nowrap">
                  {heroSecondaryBtn.label || 'Explore Live Systems'}
                </Button>
              </Link>
            </div>

            {/* Credential highlights strip */}
            <div className="pt-6 flex flex-wrap items-center justify-center gap-6 text-xs font-mono text-ink-muted border-t border-border/50 max-w-2xl mx-auto">
              {heroTrustPoints.map((text: string, idx: number) => (
                <span key={idx} className="flex items-center gap-1.5 text-ink">
                  <CheckCircle2 className="h-3.5 w-3.5 text-accent" /> {text}
                </span>
              ))}
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
            <Button variant="outline" size="md" className="gap-2 font-semibold whitespace-nowrap">
              <span>View All Services</span>
              <ArrowRight className="h-4 w-4" />
            </Button>
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {servicesList.map((s: any) => (
            <ServiceCard
              key={s.slug}
              title={s.title}
              slug={s.slug}
              order={s.order}
              shortDescription={s.shortDescription}
              imageSrc={s.imageSrc}
              features={s.features}
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
          {differentiatorsList.map((item: any) => {
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
          {processList.map((p: any) => (
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
      <ReviewsCarousel initialReviews={reviewsList} />

      {/* 7. FULL-WIDTH FAQ SECTION */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-12 space-y-12">
        <SectionHeading
          badge="Frequently Asked Questions"
          title="Clear Answers on Architecture, Security, and Governance"
          description="Everything you need to evaluate our engineering approach, deployment parameters, and data sovereignty safeguards."
        />

        <div className="w-full">
          <Accordion items={faqsList} />
        </div>
      </section>

      {/* 8. CTA BAND */}
      <CTABand />
    </div>
  );
}
