import { LucideIcon } from 'lucide-react';

interface CallMetricProps {
  icon: LucideIcon;
  value: string;
}

export function CallMetric({ icon: Icon, value }: CallMetricProps) {
  return (
    <div className="flex items-center space-x-2 text-gray-400">
      <Icon className="h-4 w-4" />
      <span>{value}</span>
    </div>
  );
}