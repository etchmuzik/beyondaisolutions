import { DashboardLayout } from '../../components/dashboard/DashboardLayout';
import { PageHeader } from '../../components/dashboard/common/PageHeader';
import { BarChart2 } from 'lucide-react';

export function Analytics() {
  return (
    <DashboardLayout>
      <PageHeader
        title="Analytics"
        description="Track and analyze your performance"
        icon={BarChart2}
      />
      {/* Add analytics components here */}
    </DashboardLayout>
  );
}