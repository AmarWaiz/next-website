import type { ContactFormData } from './schema';

export interface EmailDispatchResult {
  success: boolean;
  messageId?: string;
  error?: string;
}

export async function sendContactEmail(data: ContactFormData): Promise<EmailDispatchResult> {
  // In development, log the structured inquiry
  console.log('----------------------------------------------------');
  console.log('[LEAD DISPATCH] New Contact Submission Received:');
  console.log('Name:   ', data.name);
  console.log('Email:  ', data.email);
  console.log('Company:', data.company);
  console.log('Service:', data.service);
  console.log('Budget: ', data.budget);
  console.log('Message:', data.message);
  console.log('Time:   ', new Date().toISOString());
  console.log('----------------------------------------------------');

  // Ready for production provider (e.g. Resend / Postmark / SendGrid):
  // if (process.env.RESEND_API_KEY) {
  //   const resend = new Resend(process.env.RESEND_API_KEY);
  //   await resend.emails.send({ ... });
  // }

  return {
    success: true,
    messageId: `mock_${Date.now()}_${Math.random().toString(36).substring(7)}`,
  };
}
