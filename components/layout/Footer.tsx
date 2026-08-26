import * as React from 'react';
import Link from 'next/link';

export function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="border-t border-border bg-surface-raised py-16 md:py-24 text-ink-muted">
      <div className="max-w-7xl mx-auto px-6 md:px-12">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-12 lg:gap-16">
          {/* Brand & Contact Column */}
          <div className="md:col-span-5 space-y-6">
            <Link href="/" className="flex items-center gap-2.5 text-xl font-bold tracking-tight text-ink">
              <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-accent text-white font-black text-sm shadow-md shadow-accent/20">
                TC
              </span>
              <span>TechCentera</span>
            </Link>
            <p className="text-sm leading-relaxed text-ink-muted max-w-sm">
              Governed AI automation and custom software engineering for mid-market and enterprise operations. Zero vendor lock-in. Full IP ownership.
            </p>
            <div className="space-y-2 text-xs text-ink-muted pt-2">
              <p className="font-mono text-ink">625 Orange Street, Suite 231B</p>
              <p className="font-mono">Wilmington, DE 19801</p>
              <p className="pt-2">
                <a href="tel:+17868273650" className="hover:text-accent transition-colors font-mono">
                  +1 (786) 827-3650
                </a>
              </p>
              <p>
                <a href="mailto:contact@techcentera.com" className="hover:text-accent transition-colors font-mono">
                  contact@techcentera.com
                </a>
              </p>
            </div>
          </div>

          {/* Quick Links Column */}
          <div className="md:col-span-3 space-y-4">
            <p className="text-xs font-bold uppercase tracking-wider text-ink font-mono">
              Platform & Services
            </p>
            <ul className="space-y-2.5 text-sm">
              <li>
                <Link href="/services" className="hover:text-accent transition-colors">
                  Services Overview
                </Link>
              </li>
              <li>
                <Link href="/services/ai-receptionist" className="hover:text-accent transition-colors">
                  AI Receptionist
                </Link>
              </li>
              <li>
                <Link href="/services/ai-customer-support" className="hover:text-accent transition-colors">
                  AI Customer Support
                </Link>
              </li>
              <li>
                <Link href="/services/ai-workflow-automation" className="hover:text-accent transition-colors">
                  AI Workflow Automation
                </Link>
              </li>
              <li>
                <Link href="/services/custom-crm-erp" className="hover:text-accent transition-colors">
                  Custom CRM & ERP
                </Link>
              </li>
            </ul>
          </div>

          {/* Company Column */}
          <div className="md:col-span-4 space-y-4">
            <p className="text-xs font-bold uppercase tracking-wider text-ink font-mono">
              Company & Resources
            </p>
            <ul className="space-y-2.5 text-sm">
              <li>
                <Link href="/about" className="hover:text-accent transition-colors">
                  About Our Approach
                </Link>
              </li>
              <li>
                <Link href="/blog" className="hover:text-accent transition-colors">
                  Architecture & Insights
                </Link>
              </li>
              <li>
                <Link href="/contact" className="hover:text-accent transition-colors">
                  Contact & Consultation
                </Link>
              </li>
              <li>
                <Link href="/privacy" className="hover:text-accent transition-colors">
                  Privacy Policy
                </Link>
              </li>
              <li>
                <Link href="/terms" className="hover:text-accent transition-colors">
                  Terms of Service
                </Link>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="mt-16 pt-8 border-t border-border flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-ink-subtle">
          <p>© {currentYear} TechCentera Inc. All rights reserved.</p>
          <div className="flex items-center gap-6">
            <Link href="/privacy" className="hover:text-ink transition-colors">
              Privacy
            </Link>
            <Link href="/terms" className="hover:text-ink transition-colors">
              Terms
            </Link>
            <Link href="/contact" className="hover:text-ink transition-colors">
              Security
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
