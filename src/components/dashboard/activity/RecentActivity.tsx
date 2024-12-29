import { Activity } from 'lucide-react';
import { ActivityItem } from './ActivityItem';
import { useRecentActivity } from '../../../hooks/useRecentActivity';

export function RecentActivity() {
  const { activities, loading, error } = useRecentActivity();

  if (loading) {
    return <div className="text-gray-400">Loading activities...</div>;
  }

  if (error) {
    return <div className="text-red-400">{error}</div>;
  }

  return (
    <div className="mt-8 p-6 rounded-lg border border-white/10 bg-white/5">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-lg font-semibold text-white">Recent Activity</h2>
        <Activity className="h-5 w-5 text-primary" />
      </div>
      <div className="space-y-4">
        {activities.map((activity) => (
          <ActivityItem key={activity.id} {...activity} />
        ))}
      </div>
    </div>
  );
}