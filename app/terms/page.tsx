import type { Metadata } from 'next';
import { Badge } from '@/ui/Badge';

export const metadata: Metadata = {
  title: 'Terms of Service',
  description: 'TechCentera Enterprise Engineering Terms of Service',
};

export default function TermsPage() {
  return (
    <div className="max-w-4xl mx-auto px-6 md:px-12 py-16 md:py-24 space-y-10">
      <div className="space-y-4">
        <Badge variant="accent">Legal Framework</Badge>
        <h1 className="text-3xl sm:text-5xl font-bold text-ink">Terms of Service</h1>
        <p className="text-xs text-ink-subtle font-mono">Last updated: August 2026</p>
      </div>

      <div className="space-y-6 text-sm sm:text-base text-ink-muted leading-relaxed">
        <h2 className="text-xl font-bold text-ink pt-4">1. Scope of Engagement</h2>
        <p>
          These Terms of Service govern the delivery of bespoke software engineering, AI automation pipelines, and technical advisory services provided by TechCentera Inc.
        </p>

        <h2 className="text-xl font-bold text-ink pt-4">2. Intellectual Property & Code Ownership</h2>
        <p>
          Upon full settlement of project invoices pursuant to a Statement of Work (SOW), TechCentera transfers 100% of custom source code, schema definitions, and workflow scripts to the client organization without recurring license fees.
        </p>

        <h2 className="text-xl font-bold text-ink pt-4">3. Warranties & Deployment Standards</h2>
        <p>
          All deliverables undergo rigorous acceptance testing and schema validation. Post-handover support, SLA guarantees, and infrastructure monitoring are governed by specific service level agreements agreed upon prior to project kickoff.
        </p>

        <h2 className="text-xl font-bold text-ink pt-4">4. Governing Law</h2>
        <p>
          These terms and related enterprise contracts are governed by and construed in accordance with the laws of the State of Delaware, without regard to conflict of law principles.
        </p>
      </div>
    </div>
  );
}
