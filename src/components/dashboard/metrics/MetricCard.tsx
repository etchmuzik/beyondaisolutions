import { LucideIcon } from 'lucide-react';

interface MetricCardProps {
  label: string;
  value: string;
  change: string;
  icon: LucideIcon;
  trend: 'up' | 'down';
}

export function MetricCard({ label, value, change, icon: Icon, trend }: MetricCardProps) {
  return (
    <div className="p-6 rounded-lg border border-white/10 bg-white/5">
      <div className="flex items-center justify-between mb-4">
        <Icon className="h-5 w-5 text-primary" />
        <span className={`text-sm ${
          trend === 'up' ? 'text-green-400' : 'text-red-400'
        }`}>
          {change}
        </span>
      </div>
      <p className="text-sm text-gray-400">{label}</p>
      <p className="text-2xl font-bold text-white">{value}</p>
    </div>
  );
}