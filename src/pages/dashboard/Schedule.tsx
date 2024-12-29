import { DashboardLayout } from '../../components/dashboard/DashboardLayout';
import { PageHeader } from '../../components/dashboard/common/PageHeader';
import { Calendar } from 'lucide-react';

export function Schedule() {
  return (
    <DashboardLayout>
      <PageHeader
        title="Schedule"
        description="Plan and manage your upcoming calls"
        icon={Calendar}
      />
      {/* Add schedule components here */}
    </DashboardLayout>
  );
}