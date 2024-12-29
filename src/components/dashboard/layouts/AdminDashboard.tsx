import { useAuth } from '../../../contexts/AuthContext';
import { DashboardLayout } from '../DashboardLayout';
import { AdminStats } from '../admin/AdminStats';
import { UserManagement } from '../admin/UserManagement';
import { SystemHealth } from '../admin/SystemHealth';
import { AdminActivity } from '../admin/AdminActivity';

export function AdminDashboard() {
  const { user } = useAuth();

  return (
    <DashboardLayout>
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold text-foreground">Admin Dashboard</h1>
            <p className="text-foreground/70">Welcome back, {user?.email}</p>
          </div>
        </div>

        <AdminStats />
        
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <UserManagement />
          <SystemHealth />
        </div>

        <AdminActivity />
      </div>
    </DashboardLayout>
  );
}