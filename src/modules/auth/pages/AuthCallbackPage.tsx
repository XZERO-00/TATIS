import * as React from 'react';
import { useNavigate } from 'react-router-dom';
import { supabase } from '@/services/supabase/client';
import { useAuthStore } from '@/store/authStore';
import { LoadingSpinner } from '@/components/common/LoadingSpinner';

export const AuthCallbackPage: React.FC = () => {
  const navigate = useNavigate();
  const { setAuth } = useAuthStore();

  React.useEffect(() => {
    async function handleAuthCallback() {
      try {
        const { data, error } = await supabase.auth.getSession();
        if (error) throw error;

        if (data.session) {
          setAuth(data.session, data.session.user);
          navigate('/dashboard', { replace: true });
        } else {
          navigate('/auth/login', { replace: true });
        }
      } catch (err) {
        console.error('Auth callback verification failed:', err);
        navigate('/auth/login', { replace: true });
      }
    }

    handleAuthCallback();
  }, [navigate, setAuth]);

  return (
    <div className="flex min-h-[300px] items-center justify-center">
      <LoadingSpinner label="Completing security handshake..." />
    </div>
  );
};
