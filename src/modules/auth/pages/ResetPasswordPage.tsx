import * as React from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { Link, useNavigate } from 'react-router-dom';
import { resetPasswordSchema, type ResetPasswordFormData } from '@/schemas/auth.schema';
import { authService } from '@/services/auth/authService';
import { Button } from '@/components/ui/button';
import { FormField } from '@/components/forms/FormField';
import { PasswordInput } from '@/components/forms/PasswordInput';
import { Alert } from '@/components/feedback/Alert';
import { KeyRound, CheckCircle2 } from 'lucide-react';

export const ResetPasswordPage: React.FC = () => {
  const navigate = useNavigate();
  const [authError, setAuthError] = React.useState<string | null>(null);
  const [isSuccess, setIsSuccess] = React.useState(false);
  const [isLoading, setIsLoading] = React.useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<ResetPasswordFormData>({
    resolver: zodResolver(resetPasswordSchema),
    defaultValues: {
      password: '',
      confirmPassword: '',
    },
  });

  const onSubmit = async (data: ResetPasswordFormData) => {
    setAuthError(null);
    setIsLoading(true);

    try {
      await authService.updatePassword(data.password);
      setIsSuccess(true);
      setTimeout(() => {
        navigate('/auth/login', { replace: true });
      }, 2500);
    } catch (err: unknown) {
      const error = err as Error;
      setAuthError(error.message || 'Failed to update password. Recovery link may have expired.');
    } finally {
      setIsLoading(false);
    }
  };

  if (isSuccess) {
    return (
      <div className="space-y-6 text-center animate-fade-in">
        <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-emerald-100 text-emerald-600 dark:bg-emerald-950/60 dark:text-emerald-400">
          <CheckCircle2 className="h-7 w-7" />
        </div>
        <div className="space-y-2">
          <h2 className="text-2xl font-bold tracking-tight text-foreground">
            Password Updated
          </h2>
          <p className="text-xs text-muted-foreground leading-relaxed">
            Your credentials have been securely updated. Redirecting to sign in...
          </p>
        </div>
        <div className="pt-2">
          <Link to="/auth/login">
            <Button className="w-full text-xs">Proceed to Sign In</Button>
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6 animate-fade-in">
      <div className="space-y-2">
        <h2 className="text-2xl font-bold tracking-tight text-foreground">
          Set New Password
        </h2>
        <p className="text-sm text-muted-foreground">
          Enter your updated security password to restore account access.
        </p>
      </div>

      {authError && (
        <Alert variant="destructive" title="Update Failed">
          {authError}
        </Alert>
      )}

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        <FormField
          label="New Password"
          htmlFor="password"
          required
          helperText="Minimum 8 characters with at least one number."
          error={errors.password?.message}
        >
          <PasswordInput
            id="password"
            placeholder="Enter new password"
            autoComplete="new-password"
            disabled={isLoading}
            {...register('password')}
          />
        </FormField>

        <FormField
          label="Confirm New Password"
          htmlFor="confirmPassword"
          required
          error={errors.confirmPassword?.message}
        >
          <PasswordInput
            id="confirmPassword"
            placeholder="Repeat new password"
            autoComplete="new-password"
            disabled={isLoading}
            {...register('confirmPassword')}
          />
        </FormField>

        <Button
          type="submit"
          className="w-full text-sm h-10 font-medium"
          isLoading={isLoading}
        >
          <KeyRound className="h-4 w-4 mr-2" />
          Update Password
        </Button>
      </form>
    </div>
  );
};
