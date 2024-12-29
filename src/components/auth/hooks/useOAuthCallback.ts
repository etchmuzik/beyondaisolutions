import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { supabase } from '../../../lib/supabase';

export function useOAuthCallback() {
  const navigate = useNavigate();

  useEffect(() => {
    const handleAuthCallback = async () => {
      const { data: { session }, error } = await supabase.auth.getSession();
      
      if (error) {
        console.error('Auth callback error:', error);
        navigate('/login?error=auth_callback_failed');
        return;
      }

      if (session) {
        navigate('/dashboard');
      }
    };

    handleAuthCallback();
  }, [navigate]);
}