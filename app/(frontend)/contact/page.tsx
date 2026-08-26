import type { Metadata } from 'next';
import { Badge } from '@/ui/Badge';
import { SectionHeading } from '@/components/sections/SectionHeading';
import { ContactForm } from './ContactForm';
import { Accordion } from '@/ui/Accordion';
import { Mail, Phone, MapPin, Clock, ShieldCheck } from 'lucide-react';
import { getPayload } from 'payload';
import config from '@payload-config';

export const dynamic = 'force-dynamic';

export const metadata: Metadata = {
  title: 'Contact Engineering & Consultations',
  description:
    'Schedule a technical consultation with TechCentera. Direct engineering response within 24 hours.',
};

const defaultContactFaqs = [
  {
    question: 'How quickly will your team respond?',
    answer: 'Our principal architects review and respond to every verified inquiry within 24 business hours.',
  },
  {
    question: 'Do you execute non-disclosure agreements before review?',
    answer: 'Yes. We provide standard mutual NDAs prior to analyzing any proprietary database schemas or workflows.',
  },
  {
    question: 'Can we schedule a live technical discovery call directly?',
    answer: 'Yes. After receiving your initial project overview, our team shares a direct engineering calendar booking link.',
  },
];

export default async function ContactPage() {
  let settings: any = null;
  let cmsContact: any = null;

  try {
    const payload = await getPayload({ config });
    settings = await payload.findGlobal({ slug: 'site-settings' });
    const { docs } = await payload.find({
      collection: 'pages',
      where: { slug: { equals: 'contact' } },
    });
    cmsContact = docs[0] || null;
  } catch (err) {
    console.error('Payload fetch error on Contact page:', err);
  }

  const phone = settings?.contactInfo?.phone || '+1 (786) 827-3650';
  const email = settings?.contactInfo?.email || 'contact@techcentera.com';
  const address = settings?.contactInfo?.address || '625 Orange Street, Suite 231B, Wilmington, DE 19801';

  const badge = cmsContact?.hero?.badge || 'Technical Consultations';
  const headline = cmsContact?.hero?.headline || 'Talk Directly with Our Engineering Team.';
  const description =
    cmsContact?.hero?.description ||
    'Review your legacy architecture, automation targets, and data models with our systems architects.';

  const faqs = (cmsContact?.faqs && cmsContact.faqs.length > 0)
    ? cmsContact.faqs.map((f: any) => ({ question: f.question, answer: f.answer }))
    : defaultContactFaqs;

  return (
    <div className="space-y-20 md:space-y-28 pb-12">
      {/* 1. SHORT HERO */}
      <section className="relative pt-12 md:pt-20 lg:pt-28 overflow-hidden">
        <div className="max-w-7xl mx-auto px-6 md:px-12">
          <div className="max-w-3xl space-y-6">
            <Badge variant="accent" withDot>
              {badge}
            </Badge>

            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight text-ink leading-tight">
              {headline}
            </h1>

            <p className="text-base sm:text-lg text-ink-muted leading-relaxed prose-measure">
              {description}
            </p>
          </div>
        </div>
      </section>

      {/* 2. TWO-COLUMN: FORM LEFT, DETAILS & PROMISE RIGHT */}
      <section className="max-w-7xl mx-auto px-6 md:px-12">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
          {/* Form Left */}
          <div className="lg:col-span-7">
            <ContactForm />
          </div>

          {/* Details & Promise Right */}
          <div className="lg:col-span-5 space-y-8">
            <div className="rounded-3xl border border-border bg-surface-raised p-8 space-y-6">
              <h2 className="text-xl font-bold text-ink">Direct Channels</h2>

              <div className="space-y-5 text-sm">
                <div className="flex items-start gap-4">
                  <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-accent/15 text-accent border border-accent/30">
                    <Mail className="h-5 w-5" />
                  </div>
                  <div>
                    <p className="font-semibold text-ink">Email</p>
                    <a href={`mailto:${email}`} className="text-ink-muted hover:text-accent font-mono transition-colors">
                      {email}
                    </a>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-accent/15 text-accent border border-accent/30">
                    <Phone className="h-5 w-5" />
                  </div>
                  <div>
                    <p className="font-semibold text-ink">Phone</p>
                    <a href={`tel:${phone.replace(/[^0-9+]/g, '')}`} className="text-ink-muted hover:text-accent font-mono transition-colors">
                      {phone}
                    </a>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-accent/15 text-accent border border-accent/30">
                    <MapPin className="h-5 w-5" />
                  </div>
                  <div>
                    <p className="font-semibold text-ink">Office</p>
                    <p className="text-ink-muted font-mono leading-relaxed">
                      {address}
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-accent/15 text-accent border border-accent/30">
                    <Clock className="h-5 w-5" />
                  </div>
                  <div>
                    <p className="font-semibold text-ink">Hours</p>
                    <p className="text-ink-muted">Mon–Fri, 9:00 AM – 6:00 PM EST</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Direct Engineering Promise */}
            <div className="rounded-3xl border border-border/80 bg-surface-raised/40 p-8 space-y-4">
              <div className="flex items-center gap-2 text-accent">
                <ShieldCheck className="h-5 w-5" />
                <span className="font-bold text-sm">Direct Engineering Guarantee</span>
              </div>
              <p className="text-xs text-ink-muted leading-relaxed">
                Your consultation request goes directly to a systems engineer, not a sales representative. We do not engage in aggressive follow-up cadences or sell your contact information.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* 3. FAQ */}
      <section className="max-w-7xl mx-auto px-6 md:px-12 space-y-10">
        <SectionHeading
          badge="Inquiry FAQ"
          title="What to Expect After Submitting"
          description="Straightforward answers about our discovery call process, scoping, and confidentiality."
        />
        <div className="max-w-4xl mx-auto">
          <Accordion items={faqs} />
        </div>
      </section>
    </div>
  );
}
