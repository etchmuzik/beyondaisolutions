import { BarChart2 } from 'lucide-react';
import { usePerformanceData } from '../../../hooks/usePerformanceData';

export function UserPerformance() {
  const { data, loading } = usePerformanceData();

  return (
    <div className="bg-card border border-border rounded-lg p-6">
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-2">
          <BarChart2 className="h-5 w-5 text-primary" />
          <h2 className="text-lg font-semibold text-foreground">Performance Overview</h2>
        </div>
      </div>

      {loading ? (
        <div className="h-64 bg-background animate-pulse rounded-lg" />
      ) : (
        <div className="h-64 flex items-center justify-center">
          <p className="text-foreground/70">Performance chart will be implemented here</p>
        </div>
      )}
    </div>
  );
}