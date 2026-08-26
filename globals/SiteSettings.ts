import type { GlobalConfig } from 'payload';

export const SiteSettings: GlobalConfig = {
  slug: 'site-settings',
  admin: {
    group: 'Settings',
  },
  fields: [
    {
      name: 'brandName',
      type: 'text',
      label: 'Brand Name',
      defaultValue: 'TechCentera',
      required: true,
    },
    {
      name: 'tagline',
      type: 'text',
      label: 'Brand Tagline',
      defaultValue: 'Governed AI Automation & Custom Enterprise Software',
    },
    {
      name: 'headerCta',
      type: 'group',
      label: 'Header Action Button',
      fields: [
        { name: 'label', type: 'text', defaultValue: 'Book a Consultation' },
        { name: 'url', type: 'text', defaultValue: '/contact' },
      ],
    },
    {
      name: 'contactInfo',
      type: 'group',
      label: 'Global Contact Credentials',
      fields: [
        { name: 'phone', type: 'text', defaultValue: '+1 (786) 827-3650' },
        { name: 'email', type: 'text', defaultValue: 'contact@techcentera.com' },
        { name: 'address', type: 'text', defaultValue: '625 Orange Street, Suite 231B, Wilmington DE 19801' },
      ],
    },
    {
      name: 'footerDescription',
      type: 'textarea',
      label: 'Footer Description',
      defaultValue: 'Governed AI automation and custom software engineering for mid-market and enterprise operations. Zero vendor lock-in. Full IP ownership.',
    },
    {
      name: 'copyrightText',
      type: 'text',
      label: 'Copyright Notice',
      defaultValue: '© 2026 TechCentera Inc. All rights reserved.',
    },
  ],
};
