import { DashboardLayout } from '../../components/dashboard/DashboardLayout';
import { PageHeader } from '../../components/dashboard/common/PageHeader';
import { Phone } from 'lucide-react';

export function Calls() {
  return (
    <DashboardLayout>
      <PageHeader
        title="Calls"
        description="Manage your AI-powered calls"
        icon={Phone}
      />
      {/* Add calls components here */}
    </DashboardLayout>
  );
}