import { DashboardLayout } from '../components/dashboard/DashboardLayout';
import { DashboardHeader } from '../components/dashboard/DashboardHeader';
import { MetricsGrid } from '../components/dashboard/MetricsGrid';
import { RecentActivity } from '../components/dashboard/RecentActivity';
import { PerformanceChart } from '../components/dashboard/PerformanceChart';

export function Dashboard() {
  return (
    <DashboardLayout>
      <DashboardHeader />
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        <MetricsGrid />
        <div className="lg:col-span-2">
          <PerformanceChart />
        </div>
      </div>
      <RecentActivity />
    </DashboardLayout>
  );
}