import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { supabase } from '../lib/supabase';
import { getAuthErrorMessage } from '../utils/auth/errors';
import { validateEmail, validatePassword } from '../utils/auth/validation';
import type { User } from '@supabase/supabase-js';

export function useAuth() {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    // Check active sessions
    supabase.auth.getSession().then(({ data: { session } }) => {
      setUser(session?.user ?? null);
      setLoading(false);
    });

    // Listen for auth changes
    const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
      setUser(session?.user ?? null);
    });

    return () => subscription.unsubscribe();
  }, []);

  const signIn = async (email: string, password: string) => {
    if (!validateEmail(email)) {
      throw new Error('Please enter a valid email address');
    }

    try {
      const { data, error } = await supabase.auth.signInWithPassword({ 
        email: email.trim().toLowerCase(),
        password 
      });
      
      if (error) throw error;
      if (data?.user) {
        setUser(data.user);
        navigate('/dashboard');
      }
    } catch (err) {
      throw new Error(getAuthErrorMessage(err as Error));
    }
  };

  const signUp = async (email: string, password: string, username: string) => {
    if (!validateEmail(email)) {
      throw new Error('Please enter a valid email address');
    }

    const { isValid, errors } = validatePassword(password);
    if (!isValid) {
      throw new Error(errors[0]);
    }

    try {
      // Create auth user
      const { data: authData, error: authError } = await supabase.auth.signUp({ 
        email: email.trim().toLowerCase(),
        password,
        options: {
          emailRedirectTo: `${window.location.origin}/auth/callback`
        }
      });
      
      if (authError) throw authError;
      if (!authData.user) throw new Error('Failed to create account');

      // Create user profile
      const { error: profileError } = await supabase
        .from('user_profiles')
        .insert([{ 
          id: authData.user.id,
          username,
          created_at: new Date().toISOString()
        }]);

      if (profileError) {
        // Rollback auth user creation
        await supabase.auth.signOut();
        throw profileError;
      }

      setUser(authData.user);
      navigate('/verify-email');
    } catch (err) {
      throw new Error(getAuthErrorMessage(err as Error));
    }
  };

  const signOut = async () => {
    try {
      const { error } = await supabase.auth.signOut();
      if (error) throw error;
      setUser(null);
      navigate('/login');
    } catch (err) {
      throw new Error(getAuthErrorMessage(err as Error));
    }
  };

  return {
    user,
    loading,
    signIn,
    signUp,
    signOut
  };
}