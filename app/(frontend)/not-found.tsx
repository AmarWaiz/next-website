import Link from 'next/link';
import { Button } from '@/ui/Button';
import { ArrowLeft } from 'lucide-react';

export default function NotFound() {
  return (
    <div className="min-h-[70vh] flex items-center justify-center px-6">
      <div className="text-center space-y-6 max-w-md">
        <span className="font-mono text-5xl sm:text-6xl font-black text-accent">404</span>
        <h1 className="text-3xl font-bold text-ink">Page Not Found</h1>
        <p className="text-sm text-ink-muted leading-relaxed">
          The requested system route does not exist or has been relocated.
        </p>
        <div className="pt-2">
          <Link href="/">
            <Button variant="accent" size="md" className="gap-2" leftIcon={<ArrowLeft className="h-4 w-4" />}>
              Return to Homepage
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
}
