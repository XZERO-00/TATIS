import * as React from 'react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { useThemeStore } from '@/store/themeStore';
import { useAuthStore } from '@/store/authStore';
import { useOrganizationStore } from '@/store/organizationStore';
import { authService } from '@/services/auth/authService';
import { supabase } from '@/services/supabase/client';
import { isSupabaseConfigured } from '@/services/supabase/config';
import type { Profile, Organization } from '@/database/types/database.types';

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 1000 * 60 * 5, // 5 minutes
      refetchOnWindowFocus: false,
      retry: 1,
    },
  },
});

export const AppProviders: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const { initTheme } = useThemeStore();
  const { setAuth, setInitialized, reset } = useAuthStore();
  const { setCurrentOrg } = useOrganizationStore();

  React.useEffect(() => {
    // 1. Initialize visual theme
    initTheme();

    // 2. Initialize authentication listener & session
    if (!isSupabaseConfigured) {
      setInitialized(true);
      return;
    }

    async function initSession() {
      try {
        const session = await authService.getSession();
        if (session?.user) {
          // Fetch user profile
          const { data: profile } = await supabase
            .from('profiles')
            .select('*')
            .eq('id', session.user.id)
            .single();

          // Fetch primary organization membership
          const { data: memberData } = await supabase
            .from('organization_members')
            .select('organization_id')
            .eq('user_id', session.user.id)
            .limit(1)
            .maybeSingle();

          if (memberData?.organization_id) {
            const { data: org } = await supabase
              .from('organizations')
              .select('*')
              .eq('id', memberData.organization_id)
              .single();

            if (org) {
              setCurrentOrg(org as Organization);
            }
          }

          setAuth(session, session.user, profile as Profile | null);
        } else {
          reset();
        }
      } catch (err) {
        console.error('Session initialization error:', err);
        reset();
      } finally {
        setInitialized(true);
      }
    }

    initSession();

    const { data: authSubscription } = authService.onAuthStateChange(
      async (session, user) => {
        if (session && user) {
          const { data: profile } = await supabase
            .from('profiles')
            .select('*')
            .eq('id', user.id)
            .single();

          setAuth(session, user, profile as Profile | null);
        } else {
          reset();
        }
      }
    );

    return () => {
      authSubscription?.subscription?.unsubscribe();
    };
  }, [initTheme, setAuth, setInitialized, reset, setCurrentOrg]);

  return (
    <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
  );
};
