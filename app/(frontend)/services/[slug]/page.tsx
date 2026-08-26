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
import { getPayload } from 'payload';
import config from '@payload-config';

export const dynamic = 'force-dynamic';

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
  let title = 'Service | TechCentera Enterprise Services';
  let description = 'Enterprise Governed AI & Custom Software';

  try {
    const payload = await getPayload({ config });
    const { docs } = await payload.find({
      collection: 'services',
      where: { slug: { equals: slug } },
    });
    if (docs[0]) {
      title = `${docs[0].title} | TechCentera Enterprise Services`;
      description = docs[0].shortDescription || description;
    }
  } catch {
    const service = getServiceBySlug(slug);
    if (service) {
      title = `${service.frontmatter.title} | TechCentera Enterprise Services`;
      description = service.frontmatter.shortDescription;
    }
  }

  return {
    title,
    description,
  };
}

export default async function SingleServicePage({ params }: Props) {
  const { slug } = await params;
  let cmsService: any = null;
  let allCmsServices: any[] = [];

  try {
    const payload = await getPayload({ config });
    const { docs } = await payload.find({
      collection: 'services',
      where: { slug: { equals: slug } },
    });
    cmsService = docs[0] || null;

    const { docs: allDocs } = await payload.find({
      collection: 'services',
      sort: 'order',
    });
    allCmsServices = allDocs || [];
  } catch (err) {
    console.error('Payload fetch error on service detail:', err);
  }

  const fallbackService = getServiceBySlug(slug);
  if (!cmsService && !fallbackService) {
    notFound();
  }

  // Resolve dynamic fields
  const title = cmsService?.title || fallbackService?.frontmatter.title || '';
  const order = cmsService?.order || fallbackService?.frontmatter.order || 1;
  const tagline = cmsService?.tagline || fallbackService?.frontmatter.tagline || '';
  const shortDescription = cmsService?.shortDescription || fallbackService?.frontmatter.shortDescription || '';

  let heroImg = cmsService?.heroImage || serviceImages[slug] || '/images/hero-preview.jpg';
  if (cmsService?.mediaImage && typeof cmsService.mediaImage === 'object' && cmsService.mediaImage.url) {
    heroImg = cmsService.mediaImage.url;
  }

  const includedFeatures = (cmsService?.includedFeatures && cmsService.includedFeatures.length > 0)
    ? cmsService.includedFeatures.map((f: any) => typeof f === 'string' ? f : f.item || f.feature)
    : (fallbackService?.frontmatter.includedFeatures || []);

  const outcomes = (cmsService?.outcomes && cmsService.outcomes.length > 0)
    ? cmsService.outcomes
    : (fallbackService?.frontmatter.outcomes || []);

  const stages = (cmsService?.stages && cmsService.stages.length > 0)
    ? cmsService.stages
    : (fallbackService?.frontmatter.processSteps || []);

  const faqs = (cmsService?.faqs && cmsService.faqs.length > 0)
    ? cmsService.faqs
    : (fallbackService?.frontmatter.faqs || []);

  // Other services list
  const fallbackServices = getAllServices();
  const otherServices = allCmsServices.length > 0
    ? allCmsServices
        .filter(s => s.slug !== slug)
        .map(s => ({
          title: s.title,
          slug: s.slug,
          order: s.order,
          shortDescription: s.shortDescription,
          imageSrc: (s.mediaImage && typeof s.mediaImage === 'object' && s.mediaImage.url) ? s.mediaImage.url : (s.heroImage || serviceImages[s.slug] || '/images/hero-preview.jpg'),
          features: (s.includedFeatures || []).map((f: any) => typeof f === 'string' ? f : f.item),
        }))
    : fallbackServices
        .filter(s => s.frontmatter.slug !== slug)
        .map(s => ({
          title: s.frontmatter.title,
          slug: s.frontmatter.slug,
          order: s.frontmatter.order,
          shortDescription: s.frontmatter.shortDescription,
          imageSrc: serviceImages[s.frontmatter.slug] || '/images/hero-preview.jpg',
          features: s.frontmatter.includedFeatures,
        }));

  return (
    <div className="space-y-24 md:space-y-36 pb-16">
      {/* 1. HERO */}
      <section className="relative pt-12 md:pt-20 lg:pt-28 overflow-hidden">
        <div className="pointer-events-none absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[400px] bg-accent/15 blur-[120px] rounded-full -z-10" />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-12 space-y-12">
          <div className="max-w-4xl space-y-8">
            <Badge variant="accent" withDot>
              Service {String(order).padStart(2, '0')} · {tagline}
            </Badge>

            <h1 className="text-4xl sm:text-6xl lg:text-7xl font-extrabold tracking-tight text-ink leading-[1.06]">
              {title}
            </h1>

            <p className="text-lg sm:text-xl text-ink-muted leading-relaxed prose-measure">
              {shortDescription}
            </p>

            <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-4 pt-2">
              <Link href="/contact">
                <Button variant="accent" size="lg" className="w-full sm:w-auto text-sm font-bold gap-2 shadow-lg shadow-accent/20 whitespace-nowrap" rightIcon={<ArrowRight className="h-4 w-4" />}>
                  Book Architecture Scoping
                </Button>
              </Link>
              <Link href="/services">
                <Button variant="secondary" size="lg" className="w-full sm:w-auto text-sm font-semibold hover:border-white/30 whitespace-nowrap">
                  All Services Hub
                </Button>
              </Link>
            </div>
          </div>

          {/* Hero Banner Image */}
          <div className="relative aspect-[21/9] w-full rounded-3xl overflow-hidden border border-border bg-surface-raised shadow-2xl">
            <Image
              src={heroImg}
              alt={title}
              fill
              priority
              className="object-cover"
              sizes="(max-width: 1280px) 100vw, 1200px"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-surface via-transparent to-transparent opacity-70" />
          </div>
        </div>
      </section>

      {/* 2. OUTCOMES / METRICS */}
      {outcomes.length > 0 && (
        <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-12">
          <div className="rounded-3xl border border-border bg-surface-raised p-8 sm:p-12">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
              {outcomes.map((o: any, idx: number) => (
                <div key={idx} className="space-y-2 border-l-2 border-accent pl-6">
                  <span className="font-mono text-3xl sm:text-4xl font-extrabold text-accent">
                    {o.metric}
                  </span>
                  <p className="text-base font-bold text-ink">{o.label}</p>
                  {o.context && (
                    <p className="text-xs sm:text-sm text-ink-muted leading-relaxed">
                      {o.context}
                    </p>
                  )}
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* 3. CAPABILITIES / INCLUDED FEATURES */}
      {includedFeatures.length > 0 && (
        <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-12 space-y-12">
          <SectionHeading
            badge="Architecture Breakdown"
            title="Included Engineering Capabilities"
            description="Every deployment includes complete source code, private cloud configuration, and operational test suites."
          />

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {includedFeatures.map((feat: string, idx: number) => (
              <div
                key={idx}
                className="flex items-start gap-4 rounded-2xl border border-border bg-surface-raised p-6 card-hover-effect"
              >
                <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-xl bg-accent/15 text-accent border border-accent/30 mt-0.5">
                  <CheckCircle2 className="h-4 w-4" />
                </div>
                <p className="text-sm font-semibold text-ink leading-relaxed">
                  {feat}
                </p>
              </div>
            ))}
          </div>
        </section>
      )}

      {/* 4. FOUR-STAGE IMPLEMENTATION METHODOLOGY */}
      {stages.length > 0 && (
        <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-12 space-y-12">
          <SectionHeading
            badge="Methodology"
            title="How We Engineer and Deploy This System"
            description="Our structured engineering lifecycle ensures complete compliance and zero operational interruption."
          />

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {stages.map((st: any) => (
              <div
                key={st.step}
                className="rounded-2xl border border-border bg-surface-raised p-7 space-y-4 card-hover-effect"
              >
                <span className="font-mono text-2xl font-black text-accent">
                  {st.step}
                </span>
                <h3 className="text-lg font-bold text-ink">{st.title}</h3>
                <p className="text-xs sm:text-sm text-ink-muted leading-relaxed">
                  {st.description}
                </p>
              </div>
            ))}
          </div>
        </section>
      )}

      {/* 5. SERVICE FAQS */}
      {faqs.length > 0 && (
        <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-12 space-y-10">
          <SectionHeading
            badge="Service FAQ"
            title={`Frequently Asked Questions: ${title}`}
            description="Technical, operational, and integration specifics."
          />
          <div className="max-w-4xl mx-auto">
            <Accordion items={faqs} />
          </div>
        </section>
      )}

      {/* 6. OTHER SERVICES EXPLORER */}
      {otherServices.length > 0 && (
        <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-12 space-y-12">
          <SectionHeading
            badge="Related Solutions"
            title="Explore Other Enterprise Disciplines"
            description="Combine conversational front-office agents with automated back-office pipelines."
          />

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {otherServices.slice(0, 3).map(s => (
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
      )}

      {/* 7. CTA BAND */}
      <CTABand />
    </div>
  );
}
