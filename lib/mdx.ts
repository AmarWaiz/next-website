import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';
import { serviceFrontmatterSchema, blogFrontmatterSchema, type ServiceFrontmatter, type BlogFrontmatter } from './schema';

const SERVICES_DIR = path.join(process.cwd(), 'content', 'services');
const BLOG_DIR = path.join(process.cwd(), 'content', 'blog');

export interface ServicePost {
  frontmatter: ServiceFrontmatter;
  content: string;
}

export interface BlogPost {
  frontmatter: BlogFrontmatter;
  content: string;
}

export function getAllServices(): ServicePost[] {
  if (!fs.existsSync(SERVICES_DIR)) return [];
  const files = fs.readdirSync(SERVICES_DIR).filter(f => f.endsWith('.mdx') || f.endsWith('.md'));
  
  const services = files.map(file => {
    const filePath = path.join(SERVICES_DIR, file);
    const source = fs.readFileSync(filePath, 'utf-8');
    const { data, content } = matter(source);
    const parsed = serviceFrontmatterSchema.parse(data);
    return {
      frontmatter: parsed,
      content,
    };
  });

  return services.sort((a, b) => a.frontmatter.order - b.frontmatter.order);
}

export function getServiceBySlug(slug: string): ServicePost | null {
  const services = getAllServices();
  return services.find(s => s.frontmatter.slug === slug) ?? null;
}

export function getAllBlogPosts(): BlogPost[] {
  if (!fs.existsSync(BLOG_DIR)) return [];
  const files = fs.readdirSync(BLOG_DIR).filter(f => f.endsWith('.mdx') || f.endsWith('.md'));

  const posts = files.map(file => {
    const filePath = path.join(BLOG_DIR, file);
    const source = fs.readFileSync(filePath, 'utf-8');
    const { data, content } = matter(source);
    const parsed = blogFrontmatterSchema.parse(data);
    return {
      frontmatter: parsed,
      content,
    };
  });

  return posts.sort((a, b) => new Date(b.frontmatter.date).getTime() - new Date(a.frontmatter.date).getTime());
}

export function getBlogPostBySlug(slug: string): BlogPost | null {
  const posts = getAllBlogPosts();
  return posts.find(p => p.frontmatter.slug === slug) ?? null;
}
