import type { CollectionConfig } from 'payload';

export const Services: CollectionConfig = {
  slug: 'services',
  admin: {
    useAsTitle: 'title',
    defaultColumns: ['title', 'slug', 'order', 'updatedAt'],
  },
  fields: [
    {
      name: 'title',
      type: 'text',
      label: 'Service Title',
      required: true,
    },
    {
      name: 'slug',
      type: 'text',
      label: 'URL Slug (e.g. ai-receptionist)',
      required: true,
      unique: true,
      admin: {
        position: 'sidebar',
      },
    },
    {
      name: 'order',
      type: 'number',
      label: 'Display Order',
      required: true,
      defaultValue: 1,
      admin: {
        position: 'sidebar',
      },
    },
    {
      name: 'tagline',
      type: 'text',
      label: 'Tagline / Sub-badge',
      required: true,
    },
    {
      name: 'shortDescription',
      type: 'textarea',
      label: 'Short Overview Description',
      required: true,
    },
    {
      name: 'mediaImage',
      type: 'upload',
      relationTo: 'media',
      label: 'Uploaded Media Image (Recommended)',
      admin: {
        description: 'Select an uploaded image from Media or upload a new image.',
      },
    },
    {
      name: 'heroImage',
      type: 'text',
      label: 'Image URL / Path (Fallback)',
      defaultValue: '/images/hero-preview.jpg',
    },
    {
      name: 'includedFeatures',
      type: 'array',
      label: 'Included Features & Capabilities',
      fields: [
        {
          name: 'item',
          type: 'text',
          label: 'Feature Description',
          required: true,
        },
      ],
    },
    {
      name: 'outcomes',
      type: 'array',
      label: 'Measurable ROI & Outcomes',
      fields: [
        {
          name: 'metric',
          type: 'text',
          label: 'Metric / Stat (e.g. 70%+, < 500ms)',
          required: true,
        },
        {
          name: 'label',
          type: 'text',
          label: 'Outcome Label',
          required: true,
        },
        {
          name: 'context',
          type: 'text',
          label: 'Context / Explanation',
        },
      ],
    },
    {
      name: 'stages',
      type: 'array',
      label: 'Implementation Stages',
      fields: [
        {
          name: 'step',
          type: 'text',
          label: 'Stage Number (e.g. 01)',
          required: true,
        },
        {
          name: 'title',
          type: 'text',
          label: 'Stage Title',
          required: true,
        },
        {
          name: 'description',
          type: 'textarea',
          label: 'Stage Details',
          required: true,
        },
      ],
    },
    {
      name: 'faqs',
      type: 'array',
      label: 'Service Specific FAQs',
      fields: [
        {
          name: 'question',
          type: 'text',
          label: 'Question',
          required: true,
        },
        {
          name: 'answer',
          type: 'textarea',
          label: 'Answer',
          required: true,
        },
      ],
    },
  ],
};
