import { MetadataRoute } from 'next';
import { getAllServices, getAllBlogPosts } from '@/lib/mdx';

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = 'https://techcentera.com';

  const staticRoutes = [
    '',
    '/services',
    '/about',
    '/contact',
    '/blog',
    '/privacy',
    '/terms',
  ].map(route => ({
    url: `${baseUrl}${route}`,
    lastModified: new Date(),
    changeFrequency: 'weekly' as const,
    priority: route === '' ? 1.0 : 0.8,
  }));

  const serviceRoutes = getAllServices().map(s => ({
    url: `${baseUrl}/services/${s.frontmatter.slug}`,
    lastModified: new Date(),
    changeFrequency: 'weekly' as const,
    priority: 0.9,
  }));

  const blogRoutes = getAllBlogPosts().map(p => ({
    url: `${baseUrl}/blog/${p.frontmatter.slug}`,
    lastModified: new Date(p.frontmatter.date),
    changeFrequency: 'monthly' as const,
    priority: 0.7,
  }));

  return [...staticRoutes, ...serviceRoutes, ...blogRoutes];
}
