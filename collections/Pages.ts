import type { CollectionConfig } from 'payload';

export const Pages: CollectionConfig = {
  slug: 'pages',
  admin: {
    useAsTitle: 'title',
    defaultColumns: ['title', 'slug', 'updatedAt'],
  },
  fields: [
    {
      name: 'title',
      type: 'text',
      required: true,
    },
    {
      name: 'slug',
      type: 'text',
      required: true,
      unique: true,
      admin: {
        position: 'sidebar',
      },
    },
    {
      name: 'metaDescription',
      type: 'textarea',
      label: 'SEO Meta Description',
      admin: {
        position: 'sidebar',
      },
    },

    // Hero Section Group
    {
      name: 'hero',
      type: 'group',
      label: '1. Hero Section',
      fields: [
        {
          name: 'badge',
          type: 'text',
          label: 'Top Badge / Tagline',
        },
        {
          name: 'headline',
          type: 'text',
          label: 'Main Headline (H1)',
          required: true,
        },
        {
          name: 'description',
          type: 'textarea',
          label: 'Subheadline / Paragraph Text',
          required: true,
        },
        {
          name: 'primaryButton',
          type: 'group',
          label: 'Primary CTA Button',
          fields: [
            { name: 'label', type: 'text', defaultValue: 'Book a Consultation' },
            { name: 'url', type: 'text', defaultValue: '/contact' },
          ],
        },
        {
          name: 'secondaryButton',
          type: 'group',
          label: 'Secondary Button',
          fields: [
            { name: 'label', type: 'text', defaultValue: 'Explore Live Systems' },
            { name: 'url', type: 'text', defaultValue: '/services' },
          ],
        },
        {
          name: 'trustPoints',
          type: 'array',
          label: 'Trust Badges / Bullet Highlights',
          fields: [
            { name: 'text', type: 'text', required: true },
          ],
        },
      ],
    },

    // Stats Section Group
    {
      name: 'stats',
      type: 'array',
      label: '2. Metrics & Key Statistics',
      fields: [
        { name: 'value', type: 'text', label: 'Metric Value (e.g. < 500ms, 99.4%, $180k+)', required: true },
        { name: 'label', type: 'text', label: 'Metric Label', required: true },
        { name: 'description', type: 'textarea', label: 'Short Description' },
      ],
    },

    // Differentiators Group
    {
      name: 'differentiators',
      type: 'array',
      label: '3. Why Us / Core Capabilities',
      fields: [
        { name: 'title', type: 'text', required: true },
        { name: 'description', type: 'textarea', required: true },
        { name: 'icon', type: 'text', label: 'Icon identifier (shield, database, cpu)' },
      ],
    },

    // Process Lifecycle Group
    {
      name: 'processSteps',
      type: 'array',
      label: '4. Methodology & Stages',
      fields: [
        { name: 'stepNumber', type: 'text', label: 'Step (e.g. 01, 02)', required: true },
        { name: 'title', type: 'text', required: true },
        { name: 'description', type: 'textarea', required: true },
      ],
    },

    // Page Specific FAQs
    {
      name: 'faqs',
      type: 'array',
      label: '5. FAQ Accordion Section',
      fields: [
        { name: 'question', type: 'text', required: true },
        { name: 'answer', type: 'textarea', required: true },
      ],
    },

    // Call to Action Band
    {
      name: 'ctaBand',
      type: 'group',
      label: '6. Bottom CTA Band',
      fields: [
        { name: 'badge', type: 'text', defaultValue: 'Enterprise Consultation' },
        { name: 'title', type: 'text', defaultValue: 'Ready to Eliminate Operational Debt with Governed AI?' },
        { name: 'description', type: 'textarea', defaultValue: 'Schedule a confidential architecture review with our principal systems engineers.' },
        { name: 'buttonLabel', type: 'text', defaultValue: 'Schedule Architecture Call' },
        { name: 'buttonUrl', type: 'text', defaultValue: '/contact' },
      ],
    },

    // General Page Body (Used for About, Privacy, Terms, etc.)
    {
      name: 'bodyContent',
      type: 'textarea',
      label: 'General Page Content / Body Markdown',
    },
  ],
};
