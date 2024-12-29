import { useAuth } from '../../../contexts/AuthContext';
import { DashboardLayout } from '../DashboardLayout';
import { UserStats } from '../user/UserStats';
import { RecentCalls } from '../user/RecentCalls';
import { UpcomingCalls } from '../user/UpcomingCalls';
import { UserPerformance } from '../user/UserPerformance';

export function UserDashboard() {
  const { user } = useAuth();

  return (
    <DashboardLayout>
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold text-foreground">Dashboard</h1>
            <p className="text-foreground/70">Welcome back, {user?.email}</p>
          </div>
        </div>

        <UserStats />

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <RecentCalls />
          <UpcomingCalls />
        </div>

        <UserPerformance />
      </div>
    </DashboardLayout>
  );
}