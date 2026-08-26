import { z } from 'zod';

export const serviceInterestEnum = z.enum([
  'ai-receptionist',
  'ai-customer-support',
  'ai-workflow-automation',
  'custom-crm-erp',
  'something-else'
]);

export const budgetRangeEnum = z.enum([
  '10k-25k',
  '25k-50k',
  '50k-100k',
  '100k-plus'
]);

export const contactFormSchema = z.object({
  name: z.string().min(2, 'Name must be at least 2 characters').max(100, 'Name is too long'),
  email: z.string().email('Please enter a valid work email address'),
  company: z.string().min(2, 'Company name is required').max(100, 'Company name is too long'),
  service: serviceInterestEnum,
  budget: budgetRangeEnum,
  message: z.string().min(10, 'Please provide a brief description (at least 10 characters)').max(2000, 'Message is too long'),
  honeypot: z.string().max(0, 'Bot detected').optional(),
});

export type ContactFormData = z.infer<typeof contactFormSchema>;

export const serviceFrontmatterSchema = z.object({
  title: z.string(),
  tagline: z.string(),
  slug: z.string(),
  order: z.number(),
  shortDescription: z.string(),
  includedFeatures: z.array(z.string()),
  outcomes: z.array(z.object({
    metric: z.string(),
    label: z.string(),
    context: z.string(),
  })),
  processSteps: z.array(z.object({
    step: z.string(),
    title: z.string(),
    description: z.string(),
  })),
  faqs: z.array(z.object({
    question: z.string(),
    answer: z.string(),
  })),
});

export type ServiceFrontmatter = z.infer<typeof serviceFrontmatterSchema>;

export const blogFrontmatterSchema = z.object({
  title: z.string(),
  slug: z.string(),
  date: z.string(),
  category: z.string(),
  author: z.object({
    name: z.string(),
    role: z.string(),
    avatar: z.string(),
  }),
  excerpt: z.string(),
  readTime: z.string(),
});

export type BlogFrontmatter = z.infer<typeof blogFrontmatterSchema>;
