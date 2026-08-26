import type { Metadata } from 'next';
import { Inter, JetBrains_Mono } from 'next/font/google';
import '../globals.css';
import { Header } from '@/components/layout/Header';
import { Footer } from '@/components/layout/Footer';
import { ThemeProvider } from '@/components/layout/ThemeProvider';

const inter = Inter({
  variable: '--font-inter',
  subsets: ['latin'],
  display: 'swap',
});

const jetbrainsMono = JetBrains_Mono({
  variable: '--font-mono',
  subsets: ['latin'],
  display: 'swap',
});

export const metadata: Metadata = {
  metadataBase: new URL('https://techcentera.com'),
  title: {
    default: 'TechCentera | Governed AI Automation & Custom Enterprise Software',
    template: '%s | TechCentera',
  },
  description:
    'Tailored AI automation pipelines, voice receptionists, and custom ERP/CRM platforms engineered for mid-market and enterprise operations. Zero vendor lock-in.',
  keywords: [
    'AI Automation',
    'Enterprise AI',
    'Custom CRM',
    'Custom ERP',
    'AI Receptionist',
    'AI Customer Support',
    'Workflow Automation',
    'Wilmington DE',
  ],
  authors: [{ name: 'TechCentera Inc.' }],
  creator: 'TechCentera Inc.',
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: 'https://techcentera.com',
    siteName: 'TechCentera',
    title: 'TechCentera | Governed AI Automation & Custom Enterprise Software',
    description:
      'Autonomous workflow automation, conversational voice receptionists, and custom enterprise software with complete IP ownership.',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'TechCentera | Governed AI Automation & Custom Enterprise Software',
    description:
      'Autonomous workflow automation, conversational voice receptionists, and custom enterprise software with complete IP ownership.',
  },
  robots: {
    index: true,
    follow: true,
  },
};

const jsonLdOrg = {
  '@context': 'https://schema.org',
  '@type': 'Organization',
  name: 'TechCentera',
  url: 'https://techcentera.com',
  logo: 'https://techcentera.com/logo.png',
  contactPoint: {
    '@type': 'ContactPoint',
    telephone: '+1-786-827-3650',
    contactType: 'customer service',
    email: 'contact@techcentera.com',
    areaServed: 'US',
    availableLanguage: 'English',
  },
  address: {
    '@type': 'PostalAddress',
    streetAddress: '625 Orange Street, Suite 231B',
    addressLocality: 'Wilmington',
    addressRegion: 'DE',
    postalCode: '19801',
    addressCountry: 'US',
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang="en"
      suppressHydrationWarning
      className={`${inter.variable} ${jetbrainsMono.variable} h-full antialiased`}
    >
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLdOrg) }}
        />
      </head>
      <body className="min-h-full flex flex-col bg-surface text-ink selection:bg-accent selection:text-white">
        <ThemeProvider attribute="class" defaultTheme="dark" enableSystem={false}>
          <a href="#main-content" className="skip-link">
            Skip to main content
          </a>
          <Header />
          <main id="main-content" className="flex-1 pt-20">
            {children}
          </main>
          <Footer />
        </ThemeProvider>
      </body>
    </html>
  );
}
