import * as React from 'react';
import Link from 'next/link';

export interface FooterProps {
  settings?: {
    branding?: {
      brandName?: string;
      logoIconText?: string;
    };
    contactInfo?: {
      phone?: string;
      email?: string;
      address?: string;
    };
    footer?: {
      description?: string;
      copyright?: string;
    };
  };
}

export function Footer({ settings }: FooterProps) {
  const currentYear = new Date().getFullYear();

  const brandName = settings?.branding?.brandName || 'TechCentera';
  const logoIcon = settings?.branding?.logoIconText || 'TC';
  const footerDesc =
    settings?.footer?.description ||
    'Governed AI automation and custom software engineering for mid-market and enterprise operations. Zero vendor lock-in. Full IP ownership.';
  const phone = settings?.contactInfo?.phone || '+1 (786) 827-3650';
  const email = settings?.contactInfo?.email || 'contact@techcentera.com';
  const address = settings?.contactInfo?.address || '625 Orange Street, Suite 231B, Wilmington DE 19801';
  const copyright = settings?.footer?.copyright || `© ${currentYear} ${brandName} Inc. All rights reserved.`;

  return (
    <footer className="border-t border-border bg-surface-raised py-16 md:py-24 text-ink-muted">
      <div className="max-w-7xl mx-auto px-6 md:px-12">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-12 lg:gap-16">
          {/* Brand & Contact Column */}
          <div className="md:col-span-5 space-y-6">
            <Link href="/" className="flex items-center gap-2.5 text-xl font-bold tracking-tight text-ink">
              <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-accent text-white font-black text-sm shadow-md shadow-accent/20">
                {logoIcon}
              </span>
              <span>{brandName}</span>
            </Link>
            <p className="text-sm leading-relaxed text-ink-muted max-w-sm">
              {footerDesc}
            </p>
            <div className="space-y-2 text-xs text-ink-muted pt-2">
              <p className="font-mono text-ink">{address}</p>
              <p className="pt-2">
                <a href={`tel:${phone.replace(/[^0-9+]/g, '')}`} className="hover:text-accent transition-colors font-mono">
                  {phone}
                </a>
              </p>
              <p>
                <a href={`mailto:${email}`} className="hover:text-accent transition-colors font-mono">
                  {email}
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

          {/* Company & Trust Column */}
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
        <div className="mt-16 pt-8 border-t border-border flex flex-col md:flex-row items-center justify-between gap-4 text-xs font-mono">
          <p>{copyright}</p>
          <div className="flex items-center gap-6">
            <Link href="/privacy" className="hover:text-white transition-colors">
              Privacy
            </Link>
            <Link href="/terms" className="hover:text-white transition-colors">
              Terms
            </Link>
            <span className="text-accent flex items-center gap-1.5">
              <span className="h-1.5 w-1.5 rounded-full bg-accent animate-pulse" />
              SOC-2 Type II Certified Practice
            </span>
          </div>
        </div>
      </div>
    </footer>
  );
}
