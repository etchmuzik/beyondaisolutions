import { useState, useEffect } from 'react';
import { supabase } from '../lib/supabase';
import { useAuth } from '../contexts/AuthContext';

interface Metrics {
  totalCalls: number;
  activeUsers: number;
  avgCallTime: number;
  conversionRate: number;
}

export function useMetrics() {
  const [metrics, setMetrics] = useState<Metrics>({
    totalCalls: 0,
    activeUsers: 0,
    avgCallTime: 0,
    conversionRate: 0
  });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const { user } = useAuth();

  useEffect(() => {
    if (!user) return;

    async function fetchMetrics() {
      try {
        const { data, error } = await supabase
          .from('calls')
          .select('duration')
          .eq('assigned_to', user.id);

        if (error) throw error;

        // Calculate metrics from data
        const totalCalls = data.length;
        const avgCallTime = data.reduce((acc, call) => acc + call.duration, 0) / totalCalls;

        setMetrics({
          totalCalls,
          activeUsers: 0, // To be implemented
          avgCallTime,
          conversionRate: 0 // To be implemented
        });
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Failed to load metrics');
      } finally {
        setLoading(false);
      }
    }

    fetchMetrics();
  }, [user]);

  return { metrics, loading, error };
}