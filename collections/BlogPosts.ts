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
      label: 'Article Title',
      required: true,
    },
    {
      name: 'slug',
      type: 'text',
      label: 'URL Slug',
      required: true,
      unique: true,
      admin: {
        position: 'sidebar',
      },
    },
    {
      name: 'category',
      type: 'select',
      label: 'Category',
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
      label: 'Publication Date',
      required: true,
      defaultValue: () => new Date().toISOString(),
      admin: {
        position: 'sidebar',
      },
    },
    {
      name: 'readTime',
      type: 'text',
      label: 'Estimated Read Time',
      defaultValue: '4 min read',
      admin: {
        position: 'sidebar',
      },
    },
    {
      name: 'author',
      type: 'text',
      label: 'Author Name',
      defaultValue: 'TechCentera Engineering Team',
      admin: {
        position: 'sidebar',
      },
    },
    {
      name: 'excerpt',
      type: 'textarea',
      label: 'Summary / Excerpt',
      required: true,
    },
    {
      name: 'mediaImage',
      type: 'upload',
      relationTo: 'media',
      label: 'Featured Image (Upload from Media)',
    },
    {
      name: 'coverImage',
      type: 'text',
      label: 'Cover Image URL / Path (Fallback)',
      defaultValue: '/images/hero-preview.jpg',
    },
    {
      name: 'markdownContent',
      type: 'textarea',
      label: 'Article Markdown Content',
    },
  ],
};
