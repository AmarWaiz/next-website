import type { Metadata } from 'next';
import Link from 'next/link';
import Image from 'next/image';
import { Button } from '@/ui/Button';
import { Badge } from '@/ui/Badge';
import { SectionHeading } from '@/components/sections/SectionHeading';
import { Accordion } from '@/ui/Accordion';
import { CTABand } from '@/components/sections/CTABand';
import { getAllServices } from '@/lib/mdx';
import { ArrowRight, ArrowUpRight, CheckCircle2, AlertTriangle, Layers, Lock, Zap } from 'lucide-react';

export const metadata: Metadata = {
  title: 'AI & Custom Software Services Hub',
  description:
    'Explore our four core enterprise engineering services: AI Receptionist, AI Customer Support, AI Workflow Automation, and Custom CRM & ERP systems.',
};

const painPoints = [
  {
    icon: AlertTriangle,
    title: 'The SaaS Seat Tax',
    description: 'Off-the-shelf platforms charge escalating recurring fees without adapting to your unique operational edge.',
  },
  {
    icon: Layers,
    title: 'Disconnected Software Silos',
    description: 'Manual data re-entry between CRM, accounting, and ERP engines introduces high error rates and operational lag.',
  },
  {
    icon: Lock,
    title: 'Black-Box AI Risks',
    description: 'Unconstrained model prompts hallucinate and breach compliance when deployed without strict verification guardrails.',
  },
];

const capabilities = [
  {
    icon: Zap,
    title: 'Sub-Second Execution',
    description: 'Real-time voice synthesis and event-driven data sync optimized for ultra-low latency response.',
  },
  {
    icon: Lock,
    title: 'Data Sovereignty',
    description: 'Deploy 100% inside your private cloud. Your customer data and models never train third-party systems.',
  },
  {
    icon: Layers,
    title: 'Legacy Interoperability',
    description: 'Direct SQL, SOAP, and REST bridges connect modern AI agents to decades-old production databases.',
  },
  {
    icon: CheckCircle2,
    title: 'Governed Escalation',
    description: 'Automated confidence checks hand off sensitive or edge-case transactions to human operators instantly.',
  },
];

const hubFaqs = [
  {
    question: 'Can we start with a single service before expanding across operations?',
    answer:
      'Yes. Most clients start by automating one high-volume bottleneck—such as voice intake or ticket triage—before expanding into broader workflow sync and custom ERP modules.',
  },
  {
    question: 'How do you ensure seamless integration with our existing CRM and ERP?',
    answer:
      'We build dedicated schema adapters that validate, transform, and sync data bi-directionally with full transactional rollback safety.',
  },
  {
    question: 'Who maintains the software after deployment?',
    answer:
      'You receive full source code, architecture diagrams, and testing suites. We provide ongoing enterprise SLA support or train your internal team for full handover.',
  },
  {
    question: 'What infrastructure is required to host these systems?',
    answer:
      'We deploy standard containerized microservices onto AWS, GCP, Azure, or on-premise Kubernetes clusters with automated health telemetry.',
  },
];

const serviceImages: Record<string, string> = {
  'ai-receptionist': '/images/ai-receptionist.jpg',
  'ai-customer-support': '/images/ai-support.jpg',
  'ai-workflow-automation': '/images/ai-workflow.jpg',
  'custom-crm-erp': '/images/custom-crm-erp.jpg',
};

export default function ServicesHubPage() {
  const services = getAllServices();

  return (
    <div className="space-y-24 md:space-y-36 pb-16">
      {/* 1. HERO */}
      <section className="relative pt-12 md:pt-20 lg:pt-28 overflow-hidden">
        <div className="pointer-events-none absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[400px] bg-accent/15 blur-[120px] rounded-full -z-10" />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-12">
          <div className="max-w-4xl space-y-8">
            <Badge variant="accent" withDot>
              Engineering Hub
            </Badge>

            <h1 className="text-4xl sm:text-6xl lg:text-7xl font-extrabold tracking-tight text-ink leading-[1.06]">
              AI Automation & Custom Enterprise Software.
            </h1>

            <p className="text-lg sm:text-xl text-ink-muted leading-relaxed prose-measure">
              Four specialized engineering disciplines designed to eliminate manual data entry, automate customer interactions, and give your enterprise absolute software autonomy.
            </p>

            <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-4 pt-2">
              <Link href="/contact">
                <Button variant="accent" size="lg" className="w-full sm:w-auto text-sm font-bold gap-2 shadow-lg shadow-accent/20" rightIcon={<ArrowRight className="h-4 w-4" />}>
                  Book a Consultation
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* 2. THE PROBLEM (3 Pain Points) */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-12 space-y-12">
        <SectionHeading
          badge="Operational Bottlenecks"
          title="Why Standard SaaS and Raw Prompts Fail Modern Enterprises"
          description="Growing mid-market organizations face increasing operational drag when relying on generic tools and manual workarounds."
        />

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {painPoints.map(item => {
            const Icon = item.icon;
            return (
              <div
                key={item.title}
                className="rounded-3xl border border-border bg-surface-raised p-8 space-y-4 card-hover-effect hover:border-red-500/40"
              >
                <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-red-500/10 border border-red-500/30 text-red-400">
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

      {/* 3. THE 4 SERVICES AS SUBSTANTIAL BEXON ROWS WITH IMAGES */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-12 space-y-12">
        <SectionHeading
          badge="Core Services"
          title="Specialized Systems Engineered for Measured Business Outcomes"
          description="Explore our core service lines. Each system is custom-built, fully owned, and integrated directly into your existing infrastructure."
        />

        <div className="space-y-8">
          {services.map(service => {
            const img = serviceImages[service.frontmatter.slug] || '/images/hero-preview.jpg';

            return (
              <div
                key={service.frontmatter.slug}
                className="group rounded-3xl border border-border bg-surface-raised p-6 sm:p-8 lg:p-10 hover:border-accent/50 hover:bg-surface-card transition-all duration-300 shadow-xl"
              >
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
                  {/* Left: Image preview */}
                  <div className="lg:col-span-4 relative aspect-[16/10] w-full rounded-2xl overflow-hidden border border-border/80 bg-surface">
                    <Image
                      src={img}
                      alt={service.frontmatter.title}
                      fill
                      className="object-cover transition-transform duration-500 group-hover:scale-105"
                      sizes="(max-width: 1024px) 100vw, 33vw"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
                    <div className="absolute top-3 left-3">
                      <span className="font-mono text-xs font-bold text-white px-2.5 py-1 rounded-md bg-accent/90 backdrop-blur-sm">
                        {String(service.frontmatter.order).padStart(2, '0')}
                      </span>
                    </div>
                  </div>

                  {/* Middle: Title + Desc + Capabilities */}
                  <div className="lg:col-span-5 space-y-4">
                    <div>
                      <h3 className="text-2xl sm:text-3xl font-bold text-ink group-hover:text-accent transition-colors">
                        {service.frontmatter.title}
                      </h3>
                      <p className="text-sm text-ink-muted leading-relaxed mt-2">
                        {service.frontmatter.shortDescription}
                      </p>
                    </div>

                    <div className="pt-2 space-y-2 border-t border-border/60">
                      <p className="text-xs font-mono font-bold uppercase tracking-wider text-ink-subtle">
                        Included Capabilities
                      </p>
                      <ul className="space-y-1.5 text-xs sm:text-sm text-ink-muted">
                        {service.frontmatter.includedFeatures.slice(0, 3).map((feat, idx) => (
                          <li key={idx} className="flex items-start gap-2">
                            <CheckCircle2 className="h-4 w-4 text-accent shrink-0 mt-0.5" />
                            <span className="line-clamp-1">{feat}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>

                  {/* Right: Actions */}
                  <div className="lg:col-span-3 flex flex-col justify-center items-start lg:items-end gap-3 border-t lg:border-t-0 lg:border-l border-border/60 pt-4 lg:pt-0 lg:pl-6">
                    <Link href={`/services/${service.frontmatter.slug}`} className="w-full">
                      <Button variant="accent" size="md" className="w-full text-xs font-bold gap-1.5 shadow-md shadow-accent/20" rightIcon={<ArrowUpRight className="h-4 w-4" />}>
                        Explore Architecture
                      </Button>
                    </Link>
                    <Link href="/contact" className="w-full">
                      <Button variant="outline" size="md" className="w-full text-xs">
                        Request Quote
                      </Button>
                    </Link>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </section>

      {/* 4. WHAT'S INCLUDED: 4 CAPABILITY CARDS */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-12 space-y-12">
        <SectionHeading
          badge="Enterprise Standards"
          title="Architectural Standards Included with Every Deployment"
          description="Every system we build includes enterprise-grade security, low-latency performance, and comprehensive documentation."
        />

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {capabilities.map(c => {
            const Icon = c.icon;
            return (
              <div
                key={c.title}
                className="rounded-2xl border border-border bg-surface-raised p-7 space-y-3 card-hover-effect hover:border-accent/40"
              >
                <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-accent/15 border border-accent/30 text-accent">
                  <Icon className="h-5 w-5" />
                </div>
                <h3 className="text-lg font-bold text-ink">{c.title}</h3>
                <p className="text-xs sm:text-sm text-ink-muted leading-relaxed">
                  {c.description}
                </p>
              </div>
            );
          })}
        </div>
      </section>

      {/* 5. PROCESS SECTION */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-12 space-y-12">
        <SectionHeading
          badge="Delivery Lifecycle"
          title="From Schema Discovery to Production Autonomy"
          description="A structured, rapid delivery model that keeps your team informed and in full control at every phase."
        />

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="rounded-3xl border border-border bg-surface-raised p-8 space-y-3 card-hover-effect hover:border-accent/40">
            <span className="font-mono text-3xl font-black text-accent">01</span>
            <h3 className="text-xl font-bold text-ink">Discovery & Schema Audit</h3>
            <p className="text-sm text-ink-muted leading-relaxed">
              We analyze your operational workflows, database models, API access points, and security constraints.
            </p>
          </div>
          <div className="rounded-3xl border border-border bg-surface-raised p-8 space-y-3 card-hover-effect hover:border-accent/40">
            <span className="font-mono text-3xl font-black text-accent">02</span>
            <h3 className="text-xl font-bold text-ink">Bespoke System Build</h3>
            <p className="text-sm text-ink-muted leading-relaxed">
              We engineer custom agentic pipelines, validation guardrails, and operator interfaces on modern stacks.
            </p>
          </div>
          <div className="rounded-3xl border border-border bg-surface-raised p-8 space-y-3 card-hover-effect hover:border-accent/40">
            <span className="font-mono text-3xl font-black text-accent">03</span>
            <h3 className="text-xl font-bold text-ink">Governed Deployment</h3>
            <p className="text-sm text-ink-muted leading-relaxed">
              We deploy into your VPC, conduct load validation, and transfer 100% of source code and documentation.
            </p>
          </div>
        </div>
      </section>

      {/* 6. FAQ */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-12 space-y-12">
        <SectionHeading
          badge="Services FAQ"
          title="Common Questions About Implementation & Integration"
          description="Understand our deployment timelines, data privacy architecture, and technical support frameworks."
        />

        <div className="w-full">
          <Accordion items={hubFaqs} />
        </div>
      </section>

      {/* 7. CTA BAND */}
      <CTABand
        title="Ready to Build Bespoke AI Software You Own?"
        description="Schedule a technical consultation to review your existing tools, data models, and workflow opportunities."
      />
    </div>
  );
}
