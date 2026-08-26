import type { Metadata } from 'next';
import { Badge } from '@/ui/Badge';
import { SectionHeading } from '@/components/sections/SectionHeading';
import { ContactForm } from './ContactForm';
import { Accordion } from '@/ui/Accordion';
import { Mail, Phone, MapPin, Clock, ShieldCheck } from 'lucide-react';

export const metadata: Metadata = {
  title: 'Contact Engineering & Consultations',
  description:
    'Schedule a technical consultation with TechCentera. Direct engineering response within 24 hours.',
};

const contactFaqs = [
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

export default function ContactPage() {
  return (
    <div className="space-y-20 md:space-y-28 pb-12">
      {/* 1. SHORT HERO */}
      <section className="relative pt-12 md:pt-20 lg:pt-28 overflow-hidden">
        <div className="max-w-7xl mx-auto px-6 md:px-12">
          <div className="max-w-3xl space-y-6">
            <Badge variant="accent" withDot>
              Technical Consultations
            </Badge>

            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight text-ink leading-tight">
              Talk Directly with Our Engineering Team.
            </h1>

            <p className="text-base sm:text-lg text-ink-muted leading-relaxed prose-measure">
              Review your legacy architecture, automation targets, and data models with our systems architects.
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
            {/* Response Promise Card */}
            <div className="rounded-3xl border border-border bg-surface-raised p-8 space-y-4">
              <div className="flex items-center gap-3 text-accent">
                <Clock className="h-5 w-5" />
                <span className="text-sm font-bold font-mono uppercase tracking-wider">
                  24-Hour SLA Promise
                </span>
              </div>
              <h3 className="text-xl font-bold text-ink">Engineering-First Review</h3>
              <p className="text-sm text-ink-muted leading-relaxed">
                Your request goes straight to technical leads, not high-pressure sales reps. We assess technical feasibility upfront.
              </p>
            </div>

            {/* Direct Contact Credentials */}
            <div className="rounded-3xl border border-border bg-surface-raised p-8 space-y-6">
              <h3 className="text-lg font-bold text-ink">Office & Coordinates</h3>

              <div className="space-y-4 text-sm text-ink-muted">
                <div className="flex items-start gap-3">
                  <MapPin className="h-4 w-4 text-accent shrink-0 mt-1" />
                  <div>
                    <p className="font-semibold text-ink">Wilmington Headquarters</p>
                    <p className="font-mono text-xs">625 Orange Street, Suite 231B</p>
                    <p className="font-mono text-xs">Wilmington, DE 19801</p>
                  </div>
                </div>

                <div className="flex items-center gap-3">
                  <Phone className="h-4 w-4 text-accent shrink-0" />
                  <a href="tel:+17868273650" className="font-mono text-xs hover:text-accent transition-colors">
                    +1 (786) 827-3650
                  </a>
                </div>

                <div className="flex items-center gap-3">
                  <Mail className="h-4 w-4 text-accent shrink-0" />
                  <a href="mailto:contact@techcentera.com" className="font-mono text-xs hover:text-accent transition-colors">
                    contact@techcentera.com
                  </a>
                </div>
              </div>

              <div className="pt-4 border-t border-border flex items-center gap-2 text-xs text-ink-subtle">
                <ShieldCheck className="h-4 w-4 text-accent" />
                <span>Mutual NDAs executed upon request</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 3. COMPACT FAQ */}
      <section className="max-w-7xl mx-auto px-6 md:px-12 space-y-8">
        <SectionHeading
          badge="Inquiry FAQ"
          title="Common Consultation Questions"
        />

        <div className="w-full">
          <Accordion items={contactFaqs} />
        </div>
      </section>
    </div>
  );
}
