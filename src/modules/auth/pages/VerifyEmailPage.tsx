import * as React from 'react';
import { useLocation, Link } from 'react-router-dom';
import { Mail, ArrowLeft, RefreshCw } from 'lucide-react';
import { Button } from '@/components/ui/button';

export const VerifyEmailPage: React.FC = () => {
  const location = useLocation();
  const email = (location.state as { email?: string })?.email || 'your registered email';

  return (
    <div className="space-y-6 text-center animate-fade-in">
      <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-brand-soft/20 text-brand-midnight dark:text-brand-neon">
        <Mail className="h-7 w-7" />
      </div>

      <div className="space-y-2">
        <h2 className="text-2xl font-bold tracking-tight text-foreground">
          Confirm your email address
        </h2>
        <p className="text-xs text-muted-foreground leading-relaxed max-w-sm mx-auto">
          We have dispatched a verification email to{' '}
          <strong className="text-foreground">{email}</strong>.
          Click the verification link in the email to activate your account.
        </p>
      </div>

      <div className="rounded-lg bg-muted/60 p-4 border border-border text-xs text-muted-foreground text-left space-y-1.5">
        <p className="font-semibold text-foreground">Did not receive the email?</p>
        <ul className="list-disc list-inside text-[11px] space-y-1">
          <li>Check your spam or junk folder.</li>
          <li>Ensure <code className="font-mono text-[10px]">{email}</code> was entered accurately.</li>
          <li>Supabase free tier rate-limits transactional email delivery; allow 1–2 minutes.</li>
        </ul>
      </div>

      <div className="flex flex-col gap-2 pt-2">
        <Link to="/auth/login">
          <Button variant="default" className="w-full text-xs">
            <RefreshCw className="h-3.5 w-3.5 mr-2" />
            Proceed to Sign In
          </Button>
        </Link>
        <Link to="/auth/login">
          <Button variant="ghost" className="w-full text-xs text-muted-foreground">
            <ArrowLeft className="h-3.5 w-3.5 mr-2" />
            Back to Sign In
          </Button>
        </Link>
      </div>
    </div>
  );
};
