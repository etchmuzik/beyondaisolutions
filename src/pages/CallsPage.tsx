import { CallsHeader } from '../components/calls/CallsHeader';
import { CallsList } from '../components/calls/CallsList';
import { DashboardLayout } from '../components/dashboard/DashboardLayout';

export function CallsPage() {
  return (
    <DashboardLayout>
      <CallsHeader />
      <CallsList />
    </DashboardLayout>
  );
}