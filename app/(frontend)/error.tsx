'use client';

import * as React from 'react';
import { Button } from '@/components/ui/Button';
import { AlertTriangle, RotateCcw } from 'lucide-react';

export default function GlobalError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  React.useEffect(() => {
    console.error('System Error Logged:', error);
  }, [error]);

  return (
    <div className="min-h-[70vh] flex items-center justify-center px-6">
      <div className="text-center space-y-6 max-w-md">
        <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-2xl bg-red-500/10 border border-red-500/30 text-red-400">
          <AlertTriangle className="h-7 w-7" />
        </div>
        <h1 className="text-2xl sm:text-3xl font-bold text-ink">System Exception Occurred</h1>
        <p className="text-sm text-ink-muted leading-relaxed">
          An unexpected error occurred during execution. Our telemetry has logged the incident.
        </p>
        <div className="pt-2">
          <Button
            variant="accent"
            size="md"
            onClick={() => reset()}
            className="gap-2"
            leftIcon={<RotateCcw className="h-4 w-4" />}
          >
            Retry Transaction
          </Button>
        </div>
      </div>
    </div>
  );
}
