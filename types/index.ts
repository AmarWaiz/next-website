export type {
  ServiceFrontmatter,
  BlogFrontmatter,
  ContactFormData,
} from '@/lib/schema';

export interface NavItem {
  name: string;
  href: string;
  description?: string;
  isHub?: boolean;
}

export interface MetricOutcome {
  metric: string;
  label: string;
  context: string;
}

export interface ProcessStep {
  step: string;
  title: string;
  description: string;
}

export interface FAQItem {
  question: string;
  answer: string;
}
