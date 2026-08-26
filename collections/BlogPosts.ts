import type { CollectionConfig } from 'payload';

export const BlogPosts: CollectionConfig = {
  slug: 'blog-posts',
  admin: {
    useAsTitle: 'title',
    defaultColumns: ['title', 'category', 'date', 'readTime'],
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
      name: 'category',
      type: 'select',
      options: [
        { label: 'Enterprise AI', value: 'Enterprise AI' },
        { label: 'System Integration', value: 'System Integration' },
        { label: 'Technology Strategy', value: 'Technology Strategy' },
      ],
      required: true,
      defaultValue: 'Enterprise AI',
      admin: {
        position: 'sidebar',
      },
    },
    {
      name: 'date',
      type: 'date',
      required: true,
      defaultValue: () => new Date().toISOString(),
      admin: {
        position: 'sidebar',
      },
    },
    {
      name: 'readTime',
      type: 'text',
      defaultValue: '4 min read',
      admin: {
        position: 'sidebar',
      },
    },
    {
      name: 'author',
      type: 'text',
      defaultValue: 'TechCentera Engineering Team',
      admin: {
        position: 'sidebar',
      },
    },
    {
      name: 'excerpt',
      type: 'textarea',
      required: true,
    },
    {
      name: 'content',
      type: 'textarea',
      label: 'Markdown / Article Body Content',
      required: true,
    },
  ],
};
