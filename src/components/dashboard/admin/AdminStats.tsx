import { Users, Phone, TrendingUp, Clock } from 'lucide-react';
import { StatCard } from '../common/StatCard';
import { useAdminStats } from '../../../hooks/useAdminStats';

export function AdminStats() {
  const { stats, loading } = useAdminStats();

  if (loading) {
    return <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
      {[...Array(4)].map((_, i) => (
        <div key={i} className="h-32 bg-card animate-pulse rounded-lg" />
      ))}
    </div>;
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
      <StatCard
        title="Total Users"
        value={stats.totalUsers}
        change={stats.userGrowth}
        icon={Users}
      />
      <StatCard
        title="Total Calls"
        value={stats.totalCalls}
        change={stats.callGrowth}
        icon={Phone}
      />
      <StatCard
        title="Conversion Rate"
        value={`${stats.conversionRate}%`}
        change={stats.conversionGrowth}
        icon={TrendingUp}
      />
      <StatCard
        title="Avg. Call Duration"
        value={stats.avgCallDuration}
        change={stats.durationChange}
        icon={Clock}
      />
    </div>
  );
}