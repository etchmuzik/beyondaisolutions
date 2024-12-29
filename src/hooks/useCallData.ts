import { useState, useEffect } from 'react';
import { Call } from '../types/calls';
import { supabase } from '../lib/supabase';
import { useAuth } from '../contexts/AuthContext';

export function useCallData() {
  const [calls, setCalls] = useState<Call[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const { user } = useAuth();

  useEffect(() => {
    if (!user) return;

    async function fetchCalls() {
      try {
        const { data, error } = await supabase
          .from('calls')
          .select('*')
          .eq('assigned_to', user.id)
          .order('timestamp', { ascending: false });

        if (error) throw error;
        setCalls(data || []);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Failed to load calls');
      } finally {
        setLoading(false);
      }
    }

    fetchCalls();
  }, [user]);

  return { calls, loading, error };
}