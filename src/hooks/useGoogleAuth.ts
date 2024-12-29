import { useState } from 'react';
import { supabase } from '../lib/supabase';
import { getAuthErrorMessage } from '../utils/auth/errors';
import { useNavigate } from 'react-router-dom';

export function useGoogleAuth() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const navigate = useNavigate();

  const signInWithGoogle = async () => {
    try {
      setLoading(true);
      setError(null);
      
      const { data, error: signInError } = await supabase.auth.signInWithOAuth({
        provider: 'google',
        options: {
          queryParams: {
            access_type: 'offline',
            prompt: 'consent',
          },
          redirectTo: `${window.location.origin}/auth/callback`
        }
      });

      if (signInError) throw signInError;
      
      // If successful, redirect to dashboard
      if (data) {
        navigate('/dashboard');
      }
    } catch (err) {
      console.error('Google auth error:', err);
      throw new Error(getAuthErrorMessage(err as Error));
    } finally {
      setLoading(false);
    }
  };

  return {
    signInWithGoogle,
    loading,
    error
  };
}