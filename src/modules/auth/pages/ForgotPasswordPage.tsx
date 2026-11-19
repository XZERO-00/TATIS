import * as React from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { Link } from 'react-router-dom';
import { forgotPasswordSchema, type ForgotPasswordFormData } from '@/schemas/auth.schema';
import { authService } from '@/services/auth/authService';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { FormField } from '@/components/forms/FormField';
import { Alert } from '@/components/feedback/Alert';
import { ArrowLeft, MailCheck, Send } from 'lucide-react';

export const ForgotPasswordPage: React.FC = () => {
  const [authError, setAuthError] = React.useState<string | null>(null);
  const [isSubmitted, setIsSubmitted] = React.useState(false);
  const [submittedEmail, setSubmittedEmail] = React.useState('');
  const [isLoading, setIsLoading] = React.useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<ForgotPasswordFormData>({
    resolver: zodResolver(forgotPasswordSchema),
    defaultValues: { email: '' },
  });

  const onSubmit = async (data: ForgotPasswordFormData) => {
    setAuthError(null);
    setIsLoading(true);

    try {
      await authService.requestPasswordReset(data.email);
      setSubmittedEmail(data.email);
      setIsSubmitted(true);
    } catch (err: unknown) {
      const error = err as Error;
      setAuthError(error.message || 'Failed to send reset link.');
    } finally {
      setIsLoading(false);
    }
  };

  if (isSubmitted) {
    return (
      <div className="space-y-6 text-center animate-fade-in">
        <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-emerald-100 text-emerald-600 dark:bg-emerald-950/60 dark:text-emerald-400">
          <MailCheck className="h-7 w-7" />
        </div>
        <div className="space-y-2">
          <h2 className="text-2xl font-bold tracking-tight text-foreground">
            Check your inbox
          </h2>
          <p className="text-xs text-muted-foreground leading-relaxed max-w-sm mx-auto">
            We have dispatched password reset instructions to{' '}
            <strong className="text-foreground">{submittedEmail}</strong>. Follow the link inside to set your new credentials.
          </p>
        </div>
        <div className="pt-4">
          <Link to="/auth/login">
            <Button variant="outline" className="w-full text-xs">
              <ArrowLeft className="h-4 w-4 mr-2" />
              Return to Sign In
            </Button>
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6 animate-fade-in">
      <div className="space-y-2">
        <h2 className="text-2xl font-bold tracking-tight text-foreground">
          Reset Password
        </h2>
        <p className="text-sm text-muted-foreground">
          Enter your registered email address to receive recovery instructions.
        </p>
      </div>

      {authError && (
        <Alert variant="destructive" title="Request Failed">
          {authError}
        </Alert>
      )}

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        <FormField
          label="Registered Email"
          htmlFor="email"
          required
          error={errors.email?.message}
        >
          <Input
            id="email"
            type="email"
            placeholder="admin@tuitioncentre.edu"
            autoComplete="email"
            disabled={isLoading}
            {...register('email')}
          />
        </FormField>

        <Button
          type="submit"
          className="w-full text-sm h-10 font-medium"
          isLoading={isLoading}
        >
          <Send className="h-4 w-4 mr-2" />
          Send Reset Instructions
        </Button>
      </form>

      <div className="text-center text-xs text-muted-foreground pt-2">
        Remember your credentials?{' '}
        <Link
          to="/auth/login"
          className="font-semibold text-primary underline underline-offset-4 hover:opacity-80"
        >
          Back to sign in
        </Link>
      </div>
    </div>
  );
};
