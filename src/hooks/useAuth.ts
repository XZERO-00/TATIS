import { useAuthStore } from '@/store/authStore';
import { authService } from '@/services/auth/authService';

export function useAuth() {
  const { session, user, profile, isLoading, isInitialized } = useAuthStore();

  return {
    session,
    user,
    profile,
    isAuthenticated: Boolean(session || user),
    isLoading,
    isInitialized,
    signOut: authService.signOut,
  };
}
