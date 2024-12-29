import { Phone, Users, Clock, TrendingUp } from 'lucide-react';

const metrics = [
  {
    label: 'Total Calls',
    value: '1,234',
    change: '+12.3%',
    icon: Phone,
    trend: 'up'
  },
  {
    label: 'Active Users',
    value: '567',
    change: '+5.6%',
    icon: Users,
    trend: 'up'
  },
  {
    label: 'Avg. Call Time',
    value: '5m 23s',
    change: '-2.1%',
    icon: Clock,
    trend: 'down'
  },
  {
    label: 'Conversion Rate',
    value: '23.4%',
    change: '+3.2%',
    icon: TrendingUp,
    trend: 'up'
  }
];

export function MetricsGrid() {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
      {metrics.map((metric) => (
        <div
          key={metric.label}
          className="p-6 rounded-lg border border-white/10 bg-white/5"
        >
          <div className="flex items-center justify-between mb-4">
            <metric.icon className="h-5 w-5 text-primary" />
            <span className={`text-sm ${
              metric.trend === 'up' ? 'text-green-400' : 'text-red-400'
            }`}>
              {metric.change}
            </span>
          </div>
          <p className="text-sm text-gray-400">{metric.label}</p>
          <p className="text-2xl font-bold text-white">{metric.value}</p>
        </div>
      ))}
    </div>
  );
}