'use client';

import * as React from 'react';
import { useActionState } from 'react';
import { submitContactForm, type ActionState } from './actions';
import { Input, Textarea, Select } from '@/ui/FormInputs';
import { Button } from '@/ui/Button';
import { CheckCircle, AlertCircle, Send } from 'lucide-react';

const serviceOptions = [
  { label: 'Select a service of interest...', value: 'something-else' },
  { label: 'AI Receptionist (Voice & Intake)', value: 'ai-receptionist' },
  { label: 'AI Customer Support (Tier-1 Triage)', value: 'ai-customer-support' },
  { label: 'AI Workflow Automation (Data Sync)', value: 'ai-workflow-automation' },
  { label: 'Custom CRM & ERP Systems', value: 'custom-crm-erp' },
  { label: 'Something Else / Custom Architecture', value: 'something-else' },
];

const budgetOptions = [
  { label: 'Select estimated budget range...', value: '25k-50k' },
  { label: '$10,000 – $25,000', value: '10k-25k' },
  { label: '$25,000 – $50,000', value: '25k-50k' },
  { label: '$50,000 – $100,000', value: '50k-100k' },
  { label: '$100,000+', value: '100k-plus' },
];

export function ContactForm() {
  const [state, formAction, isPending] = useActionState<ActionState | null, FormData>(
    submitContactForm,
    null
  );

  if (state?.success) {
    return (
      <div className="rounded-3xl border border-accent/40 bg-surface-raised p-8 md:p-12 text-center space-y-6">
        <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-accent/10 border border-accent/30 text-accent">
          <CheckCircle className="h-8 w-8" />
        </div>
        <div className="space-y-2">
          <h3 className="text-2xl font-bold text-ink">Inquiry Submitted Successfully</h3>
          <p className="text-sm text-ink-muted leading-relaxed max-w-md mx-auto">
            {state.message}
          </p>
        </div>
        <p className="text-xs font-mono text-ink-subtle">
          Direct urgent inquiries: +1 (786) 827-3650 · contact@techcentera.com
        </p>
      </div>
    );
  }

  return (
    <form action={formAction} className="rounded-3xl border border-border bg-surface-raised p-8 md:p-10 space-y-6">
      {/* Honeypot field for bot protection */}
      <input
        type="text"
        name="honeypot"
        className="hidden"
        tabIndex={-1}
        autoComplete="off"
      />

      {state?.message && !state.success && (
        <div className="flex items-center gap-3 rounded-xl border border-red-500/30 bg-red-500/10 p-4 text-xs font-medium text-red-300">
          <AlertCircle className="h-4 w-4 shrink-0" />
          <span>{state.message}</span>
        </div>
      )}

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
        <Input
          label="Full Name"
          name="name"
          placeholder="Jane Doe"
          required
          error={state?.errors?.name?.[0]}
        />
        <Input
          label="Work Email"
          name="email"
          type="email"
          placeholder="jane@company.com"
          required
          error={state?.errors?.email?.[0]}
        />
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
        <Input
          label="Company Name"
          name="company"
          placeholder="Acme Enterprises"
          required
          error={state?.errors?.company?.[0]}
        />
        <Select
          label="Estimated Budget"
          name="budget"
          options={budgetOptions}
          error={state?.errors?.budget?.[0]}
        />
      </div>

      <Select
        label="Service of Interest"
        name="service"
        options={serviceOptions}
        error={state?.errors?.service?.[0]}
      />

      <Textarea
        label="Project Overview & Requirements"
        name="message"
        rows={4}
        placeholder="Briefly describe your systems, key pain points, or automation goals..."
        required
        error={state?.errors?.message?.[0]}
      />

      <Button
        type="submit"
        variant="accent"
        size="lg"
        isLoading={isPending}
        className="w-full text-sm font-semibold gap-2"
        rightIcon={<Send className="h-4 w-4" />}
      >
        Submit Consultation Request
      </Button>

      <p className="text-[11px] text-center text-ink-subtle">
        Protected by rate limiting and zero-spam governance. We never share your data.
      </p>
    </form>
  );
}
