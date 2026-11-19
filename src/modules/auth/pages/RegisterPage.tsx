import * as React from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { Link, useNavigate } from 'react-router-dom';
import { registerSchema, type RegisterFormData } from '@/schemas/auth.schema';
import { authService } from '@/services/auth/authService';
import { isSupabaseConfigured } from '@/services/supabase/config';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { FormField } from '@/components/forms/FormField';
import { PasswordInput } from '@/components/forms/PasswordInput';
import { Alert } from '@/components/feedback/Alert';
import { UserPlus } from 'lucide-react';

export const RegisterPage: React.FC = () => {
  const navigate = useNavigate();
  const [authError, setAuthError] = React.useState<string | null>(null);
  const [isLoading, setIsLoading] = React.useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<RegisterFormData>({
    resolver: zodResolver(registerSchema),
    defaultValues: {
      fullName: '',
      email: '',
      password: '',
      confirmPassword: '',
    },
  });

  const onSubmit = async (data: RegisterFormData) => {
    setAuthError(null);
    setIsLoading(true);

    try {
      await authService.signUp({
        fullName: data.fullName,
        email: data.email,
        password: data.password,
      });

      navigate('/auth/verify-email', {
        state: { email: data.email },
        replace: true,
      });
    } catch (err: unknown) {
      const error = err as Error;
      setAuthError(error.message || 'Registration failed. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="space-y-6 animate-fade-in">
      <div className="space-y-2">
        <h2 className="text-2xl font-bold tracking-tight text-foreground">
          Register Administrator Account
        </h2>
        <p className="text-sm text-muted-foreground">
          Create your primary tuition centre administrator profile.
        </p>
      </div>

      {!isSupabaseConfigured && (
        <Alert variant="warning" title="Supabase Not Connected">
          Registration requires an active Supabase project. Add your keys to{' '}
          <code className="font-mono text-[11px]">.env</code> to enable user creation and database triggers.
        </Alert>
      )}

      {authError && (
        <Alert variant="destructive" title="Registration Error">
          {authError}
        </Alert>
      )}

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        <FormField
          label="Full Name"
          htmlFor="fullName"
          required
          error={errors.fullName?.message}
        >
          <Input
            id="fullName"
            type="text"
            placeholder="Dr. Eleanor Vance"
            autoComplete="name"
            disabled={isLoading}
            {...register('fullName')}
          />
        </FormField>

        <FormField
          label="Work Email Address"
          htmlFor="email"
          required
          error={errors.email?.message}
        >
          <Input
            id="email"
            type="email"
            placeholder="director@tuitioncentre.edu"
            autoComplete="email"
            disabled={isLoading}
            {...register('email')}
          />
        </FormField>

        <FormField
          label="Password"
          htmlFor="password"
          required
          helperText="Minimum 8 characters with at least one number."
          error={errors.password?.message}
        >
          <PasswordInput
            id="password"
            placeholder="Create a strong password"
            autoComplete="new-password"
            disabled={isLoading}
            {...register('password')}
          />
        </FormField>

        <FormField
          label="Confirm Password"
          htmlFor="confirmPassword"
          required
          error={errors.confirmPassword?.message}
        >
          <PasswordInput
            id="confirmPassword"
            placeholder="Repeat password"
            autoComplete="new-password"
            disabled={isLoading}
            {...register('confirmPassword')}
          />
        </FormField>

        <div className="pt-2">
          <Button
            type="submit"
            className="w-full text-sm h-10 font-medium"
            isLoading={isLoading}
          >
            <UserPlus className="h-4 w-4 mr-2" />
            Create Administrator Account
          </Button>
        </div>
      </form>

      <div className="text-center text-xs text-muted-foreground pt-2">
        Already have an account?{' '}
        <Link
          to="/auth/login"
          className="font-semibold text-primary underline underline-offset-4 hover:opacity-80"
        >
          Sign in here
        </Link>
      </div>
    </div>
  );
};
