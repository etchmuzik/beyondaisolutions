import { useState, useEffect } from 'react';
import { supabase } from '../lib/supabase';
import { useAuth } from '../contexts/AuthContext';
import { formatTimeAgo } from '../utils/dateUtils';

interface Activity {
  id: number;
  type: string;
  description: string;
  time: string;
  status: 'success' | 'pending';
}

export function useRecentActivity() {
  const [activities, setActivities] = useState<Activity[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const { user } = useAuth();

  useEffect(() => {
    if (!user) return;

    async function fetchActivities() {
      try {
        const { data, error } = await supabase
          .from('calls')
          .select('*')
          .eq('assigned_to', user.id)
          .order('timestamp', { ascending: false })
          .limit(5);

        if (error) throw error;

        const formattedActivities = data.map(call => ({
          id: call.id,
          type: 'call',
          description: `${call.status} call with ${call.contact_name}`,
          time: formatTimeAgo(new Date(call.timestamp)),
          status: call.status === 'completed' ? 'success' : 'pending'
        }));

        setActivities(formattedActivities);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Failed to load activities');
      } finally {
        setLoading(false);
      }
    }

    fetchActivities();
  }, [user]);

  return { activities, loading, error };
}