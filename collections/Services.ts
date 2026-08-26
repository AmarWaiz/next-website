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
      name: 'order',
      type: 'number',
      required: true,
      defaultValue: 1,
      admin: {
        position: 'sidebar',
      },
    },
    {
      name: 'tagline',
      type: 'text',
      required: true,
    },
    {
      name: 'shortDescription',
      type: 'textarea',
      required: true,
    },
    {
      name: 'heroImage',
      type: 'text',
      label: 'Image URL / Path',
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
          required: true,
        },
      ],
    },
    {
      name: 'outcomes',
      type: 'array',
      label: 'Measurable Outcomes / Metrics',
      fields: [
        {
          name: 'metric',
          type: 'text',
          required: true,
        },
        {
          name: 'label',
          type: 'text',
          required: true,
        },
        {
          name: 'context',
          type: 'text',
          required: true,
        },
      ],
    },
    {
      name: 'processSteps',
      type: 'array',
      label: 'Implementation Stages',
      fields: [
        {
          name: 'step',
          type: 'text',
          required: true,
        },
        {
          name: 'title',
          type: 'text',
          required: true,
        },
        {
          name: 'description',
          type: 'textarea',
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
          required: true,
        },
        {
          name: 'answer',
          type: 'textarea',
          required: true,
        },
      ],
    },
  ],
};
