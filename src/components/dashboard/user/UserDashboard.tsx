import { DashboardLayout } from '../DashboardLayout';
import { DashboardHeader } from '../common/DashboardHeader';
import { UserStats } from './UserStats';
import { RecentCalls } from './RecentCalls';
import { UpcomingCalls } from './UpcomingCalls';
import { UserPerformance } from './UserPerformance';
import { useNavigate } from 'react-router-dom';

export function UserDashboard() {
  const navigate = useNavigate();

  const handleNewCall = () => {
    navigate('/dashboard/calls/new');
  };

  return (
    <DashboardLayout>
      <div className="space-y-6">
        <DashboardHeader 
          title="Dashboard" 
          onNewClick={handleNewCall}
        />

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