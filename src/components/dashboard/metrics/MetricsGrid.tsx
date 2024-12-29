import { Phone, Users, Clock, TrendingUp } from 'lucide-react';
import { MetricCard } from './MetricCard';
import { useMetrics } from '../../../hooks/useMetrics';
import { formatDuration } from '../../../utils/formatters';

export function MetricsGrid() {
  const { metrics, loading, error } = useMetrics();

  if (loading) {
    return <div className="text-gray-400">Loading metrics...</div>;
  }

  if (error) {
    return <div className="text-red-400">{error}</div>;
  }

  const metricsData = [
    {
      label: 'Total Calls',
      value: metrics.totalCalls.toString(),
      change: '+12.3%',
      icon: Phone,
      trend: 'up' as const
    },
    {
      label: 'Active Users',
      value: metrics.activeUsers.toString(),
      change: '+5.6%',
      icon: Users,
      trend: 'up' as const
    },
    {
      label: 'Avg. Call Time',
      value: formatDuration(metrics.avgCallTime),
      change: '-2.1%',
      icon: Clock,
      trend: 'down' as const
    },
    {
      label: 'Conversion Rate',
      value: `${metrics.conversionRate}%`,
      change: '+3.2%',
      icon: TrendingUp,
      trend: 'up' as const
    }
  ];

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
      {metricsData.map((metric) => (
        <MetricCard key={metric.label} {...metric} />
      ))}
    </div>
  );
}