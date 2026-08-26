'use server';

import { contactFormSchema } from '@/lib/schema';
import { sendContactEmail } from '@/lib/email';

export interface ActionState {
  success?: boolean;
  message?: string;
  errors?: Record<string, string[]>;
}

// In-memory rate limiting map (IP / submission count)
const rateLimitMap = new Map<string, { count: number; firstAttempt: number }>();

export async function submitContactForm(
  prevState: ActionState | null,
  formData: FormData
): Promise<ActionState> {
  const rawData = {
    name: formData.get('name') as string,
    email: formData.get('email') as string,
    company: formData.get('company') as string,
    service: formData.get('service') as string,
    budget: formData.get('budget') as string,
    message: formData.get('message') as string,
    honeypot: formData.get('honeypot') as string,
  };

  // 1. Honeypot anti-spam check
  if (rawData.honeypot && rawData.honeypot.trim().length > 0) {
    // Silently succeed for bots
    return { success: true, message: 'Your inquiry has been received.' };
  }

  // 2. Simple Rate limiting (5 requests per 10 minutes per IP/Session)
  const now = Date.now();
  const rateKey = rawData.email || 'anon';
  const record = rateLimitMap.get(rateKey);
  if (record) {
    if (now - record.firstAttempt < 10 * 60 * 1000) {
      if (record.count >= 5) {
        return {
          success: false,
          message: 'Too many submissions. Please wait a few minutes before trying again.',
        };
      }
      record.count += 1;
    } else {
      rateLimitMap.set(rateKey, { count: 1, firstAttempt: now });
    }
  } else {
    rateLimitMap.set(rateKey, { count: 1, firstAttempt: now });
  }

  // 3. Zod validation
  const validation = contactFormSchema.safeParse(rawData);
  if (!validation.success) {
    return {
      success: false,
      message: 'Please resolve the highlighted form errors.',
      errors: validation.error.flatten().fieldErrors,
    };
  }

  // 4. Send email dispatch
  try {
    const result = await sendContactEmail(validation.data);
    if (!result.success) {
      return {
        success: false,
        message: 'Could not send message. Please email contact@techcentera.com directly.',
      };
    }
    return {
      success: true,
      message: 'Thank you. Our engineering team will review your inquiry and respond within 24 hours.',
    };
  } catch {
    return {
      success: false,
      message: 'An unexpected error occurred. Please reach out via email or phone.',
    };
  }
}
