import type { Metadata } from 'next';
import { Badge } from '@/components/ui/Badge';

export const metadata: Metadata = {
  title: 'Privacy Policy',
  description: 'TechCentera Enterprise Data Privacy & Security Commitments',
};

export default function PrivacyPage() {
  return (
    <div className="max-w-4xl mx-auto px-6 md:px-12 py-16 md:py-24 space-y-10">
      <div className="space-y-4">
        <Badge variant="accent">Data Governance</Badge>
        <h1 className="text-3xl sm:text-5xl font-bold text-ink">Privacy Policy</h1>
        <p className="text-xs text-ink-subtle font-mono">Last updated: August 2026</p>
      </div>

      <div className="space-y-6 text-sm sm:text-base text-ink-muted leading-relaxed">
        <h2 className="text-xl font-bold text-ink pt-4">1. Enterprise Data Sovereignty</h2>
        <p>
          TechCentera Inc. (&ldquo;TechCentera&rdquo;) is committed to absolute data sovereignty. When you deploy our custom AI systems, all customer conversations, database records, and operational logs remain within your designated cloud perimeter (AWS, GCP, Azure, or on-premise).
        </p>

        <h2 className="text-xl font-bold text-ink pt-4">2. Zero Model Training on Customer Data</h2>
        <p>
          We strictly enforce contractual and technical zero-data retention policies with underlying inference providers. Your proprietary inputs and corporate data are never used to train public or commercial foundation models.
        </p>

        <h2 className="text-xl font-bold text-ink pt-4">3. Information Collection & Contact Inquiries</h2>
        <p>
          Information submitted via our consultation and contact forms (name, work email, company, and project scope) is used solely to evaluate technical feasibility and respond to your direct inquiry. We never sell, rent, or lease corporate contact records.
        </p>

        <h2 className="text-xl font-bold text-ink pt-4">4. Compliance & Security Inquiries</h2>
        <p>
          For compliance audits, mutual NDAs, or security questionnaires, contact our data protection team directly at{' '}
          <a href="mailto:contact@techcentera.com" className="text-accent hover:underline">
            contact@techcentera.com
          </a>
          .
        </p>
      </div>
    </div>
  );
}
