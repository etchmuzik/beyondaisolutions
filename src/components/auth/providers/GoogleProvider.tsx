import { useEffect } from 'react';
import { supabase } from '../../../lib/supabase';
import { handleGoogleAuthSuccess } from '../../../utils/auth/google';

export function GoogleProvider() {
  useEffect(() => {
    // Listen for auth state changes
    const { data: { subscription } } = supabase.auth.onAuthStateChange(async (event, session) => {
      if (event === 'SIGNED_IN' && session?.user) {
        await handleGoogleAuthSuccess(session.user);
      }
    });

    return () => {
      subscription.unsubscribe();
    };
  }, []);

  return null;
}