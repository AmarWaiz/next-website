'use client';

import * as React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { cn } from '@/lib/utils';
import { Button } from '@/ui/Button';
import { ChevronDown, Menu, X, ArrowUpRight, ChevronRight } from 'lucide-react';

const servicesNav = [
  {
    title: 'All Services Hub',
    href: '/services',
    description: 'Explore the full AI & custom engineering platform',
    isHub: true,
  },
  {
    title: 'AI Receptionist',
    href: '/services/ai-receptionist',
    description: '24/7 autonomous intake, scheduling & routing',
  },
  {
    title: 'AI Customer Support',
    href: '/services/ai-customer-support',
    description: 'Tier-1 resolution with governed human escalation',
  },
  {
    title: 'AI Workflow Automation',
    href: '/services/ai-workflow-automation',
    description: 'ERP/CRM bi-directional sync & event pipelines',
  },
  {
    title: 'Custom CRM & ERP',
    href: '/services/custom-crm-erp',
    description: 'Bespoke systems built to your exact data model',
  },
];

export function Header() {
  const pathname = usePathname();
  const [isScrolled, setIsScrolled] = React.useState(false);
  const [servicesOpen, setServicesOpen] = React.useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = React.useState(false);
  const [mobileServicesExpanded, setMobileServicesExpanded] = React.useState(true);
  const dropdownContainerRef = React.useRef<HTMLDivElement>(null);

  // Close menus on path change
  const [prevPath, setPrevPath] = React.useState(pathname);
  if (prevPath !== pathname) {
    setPrevPath(pathname);
    setServicesOpen(false);
    setMobileMenuOpen(false);
  }

  React.useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 15);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Close dropdown on click outside
  React.useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        dropdownContainerRef.current &&
        !dropdownContainerRef.current.contains(event.target as Node)
      ) {
        setServicesOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  // Lock body scroll when mobile menu open
  React.useEffect(() => {
    if (mobileMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [mobileMenuOpen]);

  return (
    <>
      <header
        className={cn(
          'fixed top-0 left-0 right-0 z-50 transition-all duration-300',
          isScrolled
            ? 'py-3 bg-surface/95 backdrop-blur-md border-b border-border shadow-lg shadow-black/40'
            : 'py-5 bg-gradient-to-b from-surface/80 to-transparent backdrop-blur-sm'
        )}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-12 flex items-center justify-between">
          {/* Brand Logo */}
          <Link
            href="/"
            className="flex items-center gap-2.5 text-lg sm:text-xl font-bold tracking-tight text-ink group focus:outline-none shrink-0"
          >
            <span className="flex h-9 w-9 items-center justify-center rounded-xl bg-accent text-white font-black text-sm shadow-md shadow-accent/20 group-hover:scale-105 transition-transform">
              TC
            </span>
            <span className="flex items-center gap-1">
              TechCentera
              <span className="h-1.5 w-1.5 rounded-full bg-accent inline-block ml-0.5 animate-pulse" />
            </span>
          </Link>

          {/* Desktop Navigation (visible on lg and above: ≥ 1024px) */}
          <nav className="hidden lg:flex items-center gap-1.5 xl:gap-2" aria-label="Main Navigation">
            <Link
              href="/"
              className={cn(
                'px-3.5 py-2 text-sm font-medium rounded-xl transition-all duration-200',
                pathname === '/'
                  ? 'text-white bg-white/[0.08]'
                  : 'text-ink-muted hover:text-white hover:bg-white/[0.05]'
              )}
            >
              Home
            </Link>

            {/* Services Dropdown (Wrapped with Hover Bridge + Click Toggle) */}
            <div
              ref={dropdownContainerRef}
              className="relative group/nav"
              onMouseEnter={() => setServicesOpen(true)}
              onMouseLeave={() => setServicesOpen(false)}
            >
              <button
                type="button"
                onClick={(e) => {
                  e.stopPropagation();
                  setServicesOpen((prev) => !prev);
                }}
                aria-expanded={servicesOpen}
                aria-haspopup="true"
                className={cn(
                  'flex items-center gap-1.5 px-3.5 py-2 text-sm font-medium rounded-xl transition-all duration-200 cursor-pointer',
                  pathname.startsWith('/services') || servicesOpen
                    ? 'text-white bg-white/[0.08]'
                    : 'text-ink-muted hover:text-white hover:bg-white/[0.05]'
                )}
              >
                <span>Services</span>
                <ChevronDown
                  className={cn(
                    'h-4 w-4 transition-transform duration-200 text-ink-muted',
                    servicesOpen && 'rotate-180 text-accent'
                  )}
                />
              </button>

              {/* Seamless dropdown with invisible top padding bridge */}
              <div
                className={cn(
                  'absolute top-full left-0 pt-2 w-92 z-50 transition-all duration-200',
                  servicesOpen
                    ? 'opacity-100 visible translate-y-0 pointer-events-auto'
                    : 'opacity-0 invisible -translate-y-2 pointer-events-none group-hover/nav:opacity-100 group-hover/nav:visible group-hover/nav:translate-y-0 group-hover/nav:pointer-events-auto'
                )}
              >
                <div className="rounded-2xl border border-border bg-surface-raised/98 backdrop-blur-2xl p-2.5 shadow-2xl shadow-black/80 space-y-1">
                  {servicesNav.map((item) => (
                    <Link
                      key={item.href}
                      href={item.href}
                      onClick={() => setServicesOpen(false)}
                      className={cn(
                        'block rounded-xl p-3 transition-all duration-150 group',
                        item.isHub
                          ? 'bg-accent/10 border border-accent/25 mb-1.5 hover:bg-accent/20'
                          : 'hover:bg-surface-card hover:border-border/60 border border-transparent',
                        pathname === item.href && 'bg-surface-card border-accent/40'
                      )}
                    >
                      <div className="flex items-center justify-between">
                        <span
                          className={cn(
                            'text-sm font-semibold transition-colors',
                            item.isHub ? 'text-accent' : 'text-ink group-hover:text-accent',
                            pathname === item.href && 'text-accent'
                          )}
                        >
                          {item.title}
                        </span>
                        {item.isHub ? (
                          <span className="text-[10px] uppercase font-bold tracking-wider px-2 py-0.5 rounded-full bg-accent text-white font-mono">
                            Hub
                          </span>
                        ) : (
                          <ArrowUpRight className="h-3.5 w-3.5 text-ink-subtle opacity-0 group-hover:opacity-100 group-hover:text-accent transition-all" />
                        )}
                      </div>
                      <p className="mt-0.5 text-xs text-ink-muted leading-relaxed line-clamp-1">
                        {item.description}
                      </p>
                    </Link>
                  ))}
                </div>
              </div>
            </div>

            <Link
              href="/about"
              className={cn(
                'px-3.5 py-2 text-sm font-medium rounded-xl transition-all duration-200',
                pathname === '/about'
                  ? 'text-white bg-white/[0.08]'
                  : 'text-ink-muted hover:text-white hover:bg-white/[0.05]'
              )}
            >
              About
            </Link>

            <Link
              href="/blog"
              className={cn(
                'px-3.5 py-2 text-sm font-medium rounded-xl transition-all duration-200',
                pathname.startsWith('/blog')
                  ? 'text-white bg-white/[0.08]'
                  : 'text-ink-muted hover:text-white hover:bg-white/[0.05]'
              )}
            >
              Blog
            </Link>

            <Link
              href="/contact"
              className={cn(
                'px-3.5 py-2 text-sm font-medium rounded-xl transition-all duration-200',
                pathname === '/contact'
                  ? 'text-white bg-white/[0.08]'
                  : 'text-ink-muted hover:text-white hover:bg-white/[0.05]'
              )}
            >
              Contact
            </Link>
          </nav>

          {/* Desktop CTA */}
          <div className="hidden lg:flex items-center gap-3 shrink-0">
            <Link href="/contact">
              <Button variant="accent" size="sm" className="rounded-xl font-semibold shadow-md whitespace-nowrap">
                Book a Consultation
              </Button>
            </Link>
          </div>

          {/* Tablet/Mobile Hamburger Toggle (visible on < lg: 1024px) */}
          <div className="flex lg:hidden items-center gap-2.5">
            <Link href="/contact" className="hidden sm:inline-block">
              <Button variant="accent" size="sm" className="text-xs py-1.5 px-3 rounded-lg whitespace-nowrap">
                Book Consultation
              </Button>
            </Link>

            <button
              type="button"
              id="mobile-menu-toggle-btn"
              onClick={(e) => {
                e.preventDefault();
                e.stopPropagation();
                setMobileMenuOpen(prev => !prev);
              }}
              aria-label={mobileMenuOpen ? 'Close Menu' : 'Open Navigation Menu'}
              className="flex h-11 w-11 items-center justify-center rounded-xl border border-border bg-surface-raised text-ink cursor-pointer hover:border-white/30 hover:text-white transition-colors focus:outline-none z-50 select-none"
            >
              {mobileMenuOpen ? <X className="h-5 w-5 pointer-events-none" /> : <Menu className="h-5 w-5 pointer-events-none" />}
            </button>
          </div>
        </div>
      </header>

      {/* Fullscreen Independent Mobile Overlay (Immune to parent backdrop-filter trapping) */}
      {mobileMenuOpen && (
        <div
          id="mobile-menu-overlay"
          className="fixed inset-0 z-[99999] bg-surface/98 backdrop-blur-2xl flex flex-col justify-between p-6 sm:p-8 overflow-y-auto"
        >
          {/* Top Bar inside Overlay */}
          <div className="flex items-center justify-between pb-6 border-b border-border/80">
            <Link
              href="/"
              onClick={() => setMobileMenuOpen(false)}
              className="flex items-center gap-2.5 text-lg font-bold text-ink"
            >
              <span className="flex h-9 w-9 items-center justify-center rounded-xl bg-accent text-white font-black text-sm shadow-md shadow-accent/20">
                TC
              </span>
              <span>TechCentera</span>
            </Link>

            <button
              type="button"
              onClick={() => setMobileMenuOpen(false)}
              aria-label="Close Menu"
              className="flex h-11 w-11 items-center justify-center rounded-xl border border-border bg-surface-raised text-ink hover:border-white/30 hover:text-white cursor-pointer select-none"
            >
              <X className="h-6 w-6" />
            </button>
          </div>

          {/* Navigation Links inside Drawer */}
          <div className="py-6 space-y-3">
            <Link
              href="/"
              onClick={() => setMobileMenuOpen(false)}
              className={cn(
                'flex items-center justify-between px-4 py-3.5 text-base font-bold rounded-xl transition-colors',
                pathname === '/'
                  ? 'bg-accent/15 text-accent border border-accent/30'
                  : 'text-ink hover:bg-surface-raised'
              )}
            >
              <span>Home</span>
              <ChevronRight className="h-4 w-4 text-ink-subtle" />
            </Link>

            {/* Mobile Services Accordion */}
            <div className="rounded-xl border border-border/60 bg-surface-raised/60 overflow-hidden">
              <button
                type="button"
                onClick={() => setMobileServicesExpanded(!mobileServicesExpanded)}
                className="flex w-full items-center justify-between px-4 py-3.5 text-base font-bold text-ink cursor-pointer hover:text-accent transition-colors select-none"
              >
                <span className="flex items-center gap-2">
                  <span>Services</span>
                  <span className="text-[10px] uppercase font-bold tracking-wider px-2 py-0.5 rounded-full bg-accent text-white font-mono">
                    4 Systems
                  </span>
                </span>
                <ChevronDown
                  className={cn(
                    'h-4 w-4 transition-transform duration-200 text-ink-muted',
                    mobileServicesExpanded && 'rotate-180 text-accent'
                  )}
                />
              </button>

              {mobileServicesExpanded && (
                <div className="px-3 pb-3 space-y-1.5 border-t border-border/40 pt-2 bg-surface-card/40">
                  {servicesNav.map((item) => (
                    <Link
                      key={item.href}
                      href={item.href}
                      onClick={() => setMobileMenuOpen(false)}
                      className={cn(
                        'block px-3 py-2.5 text-sm rounded-lg transition-colors',
                        item.isHub
                          ? 'bg-accent/15 text-accent font-bold'
                          : pathname === item.href
                          ? 'bg-surface-raised text-accent font-semibold'
                          : 'text-ink-muted hover:text-ink hover:bg-surface-raised'
                      )}
                    >
                      <div className="flex items-center justify-between">
                        <span>{item.title}</span>
                        {item.isHub && (
                          <span className="text-[9px] uppercase font-mono px-1.5 py-0.5 rounded bg-accent text-white">
                            Hub
                          </span>
                        )}
                      </div>
                    </Link>
                  ))}
                </div>
              )}
            </div>

            <Link
              href="/about"
              onClick={() => setMobileMenuOpen(false)}
              className={cn(
                'flex items-center justify-between px-4 py-3.5 text-base font-bold rounded-xl transition-colors',
                pathname === '/about'
                  ? 'bg-accent/15 text-accent border border-accent/30'
                  : 'text-ink hover:bg-surface-raised'
              )}
            >
              <span>About Us</span>
              <ChevronRight className="h-4 w-4 text-ink-subtle" />
            </Link>

            <Link
              href="/blog"
              onClick={() => setMobileMenuOpen(false)}
              className={cn(
                'flex items-center justify-between px-4 py-3.5 text-base font-bold rounded-xl transition-colors',
                pathname.startsWith('/blog')
                  ? 'bg-accent/15 text-accent border border-accent/30'
                  : 'text-ink hover:bg-surface-raised'
              )}
            >
              <span>Insights & Blog</span>
              <ChevronRight className="h-4 w-4 text-ink-subtle" />
            </Link>

            <Link
              href="/contact"
              onClick={() => setMobileMenuOpen(false)}
              className={cn(
                'flex items-center justify-between px-4 py-3.5 text-base font-bold rounded-xl transition-colors',
                pathname === '/contact'
                  ? 'bg-accent/15 text-accent border border-accent/30'
                  : 'text-ink hover:bg-surface-raised'
              )}
            >
              <span>Contact & Inquiries</span>
              <ChevronRight className="h-4 w-4 text-ink-subtle" />
            </Link>
          </div>

          {/* Bottom Actions inside Drawer */}
          <div className="pt-6 border-t border-border mt-auto space-y-4">
            <Link
              href="/contact"
              onClick={() => setMobileMenuOpen(false)}
              className="block w-full"
            >
              <Button
                variant="accent"
                size="lg"
                className="w-full justify-center text-sm font-bold shadow-lg shadow-accent/20 whitespace-nowrap"
              >
                Book a Consultation
              </Button>
            </Link>
            <div className="text-center space-y-1">
              <p className="text-xs font-mono text-ink-muted">
                +1 (786) 827-3650 · contact@techcentera.com
              </p>
              <p className="text-[10px] text-ink-subtle">
                625 Orange St, Wilmington DE 19801
              </p>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
