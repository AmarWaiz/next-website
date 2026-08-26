import type { CollectionConfig } from 'payload';

export const Testimonials: CollectionConfig = {
  slug: 'testimonials',
  admin: {
    useAsTitle: 'author',
    defaultColumns: ['author', 'company', 'role', 'rating'],
  },
  fields: [
    {
      name: 'quote',
      type: 'textarea',
      required: true,
    },
    {
      name: 'author',
      type: 'text',
      required: true,
    },
    {
      name: 'role',
      type: 'text',
      required: true,
    },
    {
      name: 'company',
      type: 'text',
      required: true,
    },
    {
      name: 'initials',
      type: 'text',
      required: true,
      defaultValue: 'TC',
    },
    {
      name: 'rating',
      type: 'number',
      defaultValue: 5,
      min: 1,
      max: 5,
    },
    {
      name: 'verifiedTag',
      type: 'text',
      defaultValue: 'Verified Enterprise Deployment',
    },
  ],
};
