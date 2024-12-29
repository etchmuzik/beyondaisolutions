import { Phone, Clock, TrendingUp, CheckCircle } from 'lucide-react';
import { StatCard } from '../common/StatCard';
import { useUserStats } from '../../../hooks/useUserStats';

export function UserStats() {
  const { stats, loading } = useUserStats();

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
        title="Total Calls"
        value={stats.totalCalls}
        change={stats.callGrowth}
        icon={Phone}
      />
      <StatCard
        title="Avg. Duration"
        value={stats.avgDuration}
        change={stats.durationChange}
        icon={Clock}
      />
      <StatCard
        title="Success Rate"
        value={`${stats.successRate}%`}
        change={stats.successChange}
        icon={CheckCircle}
      />
      <StatCard
        title="Conversion Rate"
        value={`${stats.conversionRate}%`}
        change={stats.conversionChange}
        icon={TrendingUp}
      />
    </div>
  );
}