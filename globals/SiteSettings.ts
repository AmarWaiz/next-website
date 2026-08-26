import type { GlobalConfig } from 'payload';

export const SiteSettings: GlobalConfig = {
  slug: 'site-settings',
  admin: {
    group: 'Settings',
  },
  fields: [
    // 1. Branding & Header Logo
    {
      name: 'branding',
      type: 'group',
      label: '1. Brand & Header Logo',
      fields: [
        {
          name: 'brandName',
          type: 'text',
          label: 'Brand Name Text',
          defaultValue: 'TechCentera',
          required: true,
        },
        {
          name: 'logoIconText',
          type: 'text',
          label: 'Logo Icon Initials',
          defaultValue: 'TC',
        },
        {
          name: 'tagline',
          type: 'text',
          label: 'Tagline',
          defaultValue: 'Governed AI Automation & Custom Enterprise Software',
        },
      ],
    },

    // 2. Header Navigation Menu Items
    {
      name: 'navItems',
      type: 'array',
      label: '2. Header Navigation Menu Links',
      fields: [
        {
          name: 'label',
          type: 'text',
          label: 'Menu Label (e.g. Home, Services, About)',
          required: true,
        },
        {
          name: 'url',
          type: 'text',
          label: 'Page URL / Path',
          required: true,
        },
        {
          name: 'hasDropdown',
          type: 'checkbox',
          label: 'Enable Dropdown Sub-menu',
          defaultValue: false,
        },
        {
          name: 'dropdownItems',
          type: 'array',
          label: 'Dropdown Sub-menu Items',
          admin: {
            condition: (data, siblingData) => Boolean(siblingData?.hasDropdown),
          },
          fields: [
            {
              name: 'title',
              type: 'text',
              label: 'Sub-link Title',
              required: true,
            },
            {
              name: 'url',
              type: 'text',
              label: 'Sub-link URL',
              required: true,
            },
            {
              name: 'description',
              type: 'text',
              label: 'Short Description',
            },
            {
              name: 'badge',
              type: 'text',
              label: 'Badge / Tag (e.g. Hub, New)',
            },
          ],
        },
      ],
    },

    // 3. Header Action Button
    {
      name: 'headerCta',
      type: 'group',
      label: '3. Header CTA Action Button',
      fields: [
        {
          name: 'label',
          type: 'text',
          label: 'Button Label',
          defaultValue: 'Book a Consultation',
        },
        {
          name: 'url',
          type: 'text',
          label: 'Button URL',
          defaultValue: '/contact',
        },
      ],
    },

    // 4. Contact Credentials
    {
      name: 'contactInfo',
      type: 'group',
      label: '4. Global Contact Information',
      fields: [
        {
          name: 'phone',
          type: 'text',
          label: 'Phone Number',
          defaultValue: '+1 (786) 827-3650',
        },
        {
          name: 'email',
          type: 'text',
          label: 'Contact Email Address',
          defaultValue: 'contact@techcentera.com',
        },
        {
          name: 'address',
          type: 'text',
          label: 'Physical Address',
          defaultValue: '625 Orange Street, Suite 231B, Wilmington DE 19801',
        },
      ],
    },

    // 5. Footer Details
    {
      name: 'footer',
      type: 'group',
      label: '5. Footer Settings',
      fields: [
        {
          name: 'description',
          type: 'textarea',
          label: 'Footer About Blurb',
          defaultValue:
            'Governed AI automation and custom software engineering for mid-market and enterprise operations. Zero vendor lock-in. Full IP ownership.',
        },
        {
          name: 'copyright',
          type: 'text',
          label: 'Copyright Notice',
          defaultValue: '© 2026 TechCentera Inc. All rights reserved.',
        },
      ],
    },
  ],
};
