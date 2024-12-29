import { LucideIcon } from 'lucide-react';
import { cn } from '../../../utils/cn';

interface StatCardProps {
  title: string;
  value: string | number;
  change?: number;
  icon: LucideIcon;
  loading?: boolean;
}

export function StatCard({ title, value, change, icon: Icon, loading }: StatCardProps) {
  if (loading) {
    return (
      <div className="bg-card border border-border rounded-lg p-6 animate-pulse">
        <div className="h-20" />
      </div>
    );
  }

  const isPositive = change && change > 0;
  
  return (
    <div className="bg-card border border-border rounded-lg p-6 hover:border-primary/20 transition-colors group">
      <div className="flex items-center justify-between mb-4">
        <div className="p-2 bg-primary/10 rounded-lg group-hover:bg-primary/20 transition-colors">
          <Icon className="h-5 w-5 text-primary" />
        </div>
        {change !== undefined && (
          <span className={cn(
            "text-sm font-medium",
            isPositive ? "text-green-500" : "text-red-500"
          )}>
            {isPositive ? '+' : ''}{change}%
          </span>
        )}
      </div>
      <p className="text-sm text-foreground/70 mb-1">{title}</p>
      <p className="text-2xl font-bold text-foreground">{value}</p>
    </div>
  );
}