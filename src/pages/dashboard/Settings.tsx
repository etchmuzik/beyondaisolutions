import { DashboardLayout } from '../../components/dashboard/DashboardLayout';
import { PageHeader } from '../../components/dashboard/common/PageHeader';
import { Settings as SettingsIcon } from 'lucide-react';

export function Settings() {
  return (
    <DashboardLayout>
      <PageHeader
        title="Settings"
        description="Manage your account and preferences"
        icon={SettingsIcon}
      />
      {/* Add settings components here */}
    </DashboardLayout>
  );
}