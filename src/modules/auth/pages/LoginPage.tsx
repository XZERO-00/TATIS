import * as React from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { loginSchema, type LoginFormData } from '@/schemas/auth.schema';
import { authService } from '@/services/auth/authService';
import { useAuthStore } from '@/store/authStore';
import { isSupabaseConfigured } from '@/services/supabase/config';
import type { Session, User } from '@supabase/supabase-js';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { FormField } from '@/components/forms/FormField';
import { PasswordInput } from '@/components/forms/PasswordInput';
import { Alert } from '@/components/feedback/Alert';
import { LogIn } from 'lucide-react';

export const LoginPage: React.FC = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { setAuth } = useAuthStore();
  const [authError, setAuthError] = React.useState<string | null>(null);
  const [isLoading, setIsLoading] = React.useState(false);
  const [isGoogleLoading, setIsGoogleLoading] = React.useState(false);

  const from = (location.state as { from?: { pathname: string } })?.from?.pathname || '/dashboard';

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginFormData>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: '',
      password: '',
    },
  });

  const onSubmit = async (data: LoginFormData) => {
    setAuthError(null);
    setIsLoading(true);

    try {
      const response = await authService.signInWithPassword({
        email: data.email,
        password: data.password,
      });

      if (response.user) {
        setAuth(response.session, response.user);
        navigate(from, { replace: true });
      }
    } catch (err: unknown) {
      const error = err as Error;
      setAuthError(error.message || 'Failed to authenticate. Please check your credentials.');
    } finally {
      setIsLoading(false);
    }
  };

  const handleGoogleSignIn = async () => {
    setAuthError(null);
    setIsGoogleLoading(true);
    try {
      await authService.signInWithGoogle();
    } catch (err: unknown) {
      const error = err as Error;
      setAuthError(error.message || 'Google sign-in failed. Please verify provider setup.');
    } finally {
      setIsGoogleLoading(false);
    }
  };

  return (
    <div className="space-y-6 animate-fade-in">
      <div className="space-y-2">
        <h2 className="text-2xl font-bold tracking-tight text-foreground">
          Sign in to TATIS
        </h2>
        <p className="text-sm text-muted-foreground">
          Enter your credentials to access the tuition administration console.
        </p>
      </div>

      {!isSupabaseConfigured && (
        <div className="space-y-3">
          <Alert variant="warning" title="Supabase Not Connected">
            To log in with real Supabase Auth, please provide your{' '}
            <code className="font-mono text-[11px] font-semibold">VITE_SUPABASE_URL</code> and{' '}
            <code className="font-mono text-[11px] font-semibold">VITE_SUPABASE_ANON_KEY</code> in{' '}
            <code className="font-mono text-[11px]">.env</code>.
          </Alert>
          <Button
            type="button"
            variant="outline"
            className="w-full text-xs h-9 border-amber-500/40 text-amber-700 dark:text-amber-300 hover:bg-amber-500/10"
            onClick={() => {
              // Explicitly opt-in to UI Demo Session for evaluating Application Shell & Dashboard
              setAuth(
                { access_token: 'demo-token', expires_at: 9999999999 } as unknown as Session,
                { id: 'demo-user-id', email: 'admin@tatis.edu', user_metadata: { full_name: 'Tuition Administrator' } } as unknown as User,
                {
                  id: 'demo-user-id',
                  full_name: 'Tuition Administrator',
                  email: 'admin@tatis.edu',
                  phone: null,
                  avatar_url: null,
                  created_at: new Date().toISOString(),
                  updated_at: new Date().toISOString(),
                }
              );
              navigate(from, { replace: true });
            }}
          >
            Explore Application in Demo Mode (Supabase Unconfigured)
          </Button>
        </div>
      )}

      {authError && (
        <Alert variant="destructive" title="Authentication Error">
          {authError}
        </Alert>
      )}

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        <FormField
          label="Email Address"
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

        <FormField
          label="Password"
          htmlFor="password"
          required
          error={errors.password?.message}
        >
          <PasswordInput
            id="password"
            placeholder="Enter your password"
            autoComplete="current-password"
            disabled={isLoading}
            {...register('password')}
          />
        </FormField>

        <div className="flex items-center justify-between text-xs">
          <label className="flex items-center gap-2 cursor-pointer text-muted-foreground">
            <input
              type="checkbox"
              className="rounded border-input text-primary focus:ring-primary h-3.5 w-3.5"
            />
            <span>Remember this device</span>
          </label>
          <Link
            to="/auth/forgot-password"
            className="text-xs font-medium text-brand-soft hover:text-brand-midnight dark:hover:text-brand-neon transition-colors"
          >
            Forgot password?
          </Link>
        </div>

        <Button
          type="submit"
          className="w-full text-sm h-10 font-medium"
          isLoading={isLoading}
        >
          <LogIn className="h-4 w-4 mr-2" />
          Sign In
        </Button>
      </form>

      <div className="relative my-4">
        <div className="absolute inset-0 flex items-center">
          <div className="w-full border-t border-border" />
        </div>
        <div className="relative flex justify-center text-xs uppercase">
          <span className="bg-background px-2 text-muted-foreground font-mono text-[10px]">
            Or continue with
          </span>
        </div>
      </div>

      {/* Google OAuth Button */}
      <Button
        type="button"
        variant="outline"
        className="w-full text-xs h-9 gap-2"
        onClick={handleGoogleSignIn}
        isLoading={isGoogleLoading}
      >
        <svg className="h-4 w-4" viewBox="0 0 24 24">
          <path
            fill="#4285F4"
            d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
          />
          <path
            fill="#34A853"
            d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
          />
          <path
            fill="#FBBC05"
            d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.06H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.94l2.85-2.22.81-.63z"
          />
          <path
            fill="#EA4335"
            d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06l3.66 2.84c.87-2.6 3.3-4.52 6.16-4.52z"
          />
        </svg>
        Sign in with Google
      </Button>

      <div className="text-center text-xs text-muted-foreground pt-2">
        Don&apos;t have an account yet?{' '}
        <Link
          to="/auth/register"
          className="font-semibold text-primary underline underline-offset-4 hover:opacity-80"
        >
          Create administrator account
        </Link>
      </div>
    </div>
  );
};
