import { Phone } from 'lucide-react';
import { useRecentCalls } from '../../../hooks/useRecentCalls';
import { CallCard } from '../../calls/CallCard';
import { CardHeader } from '../common/CardHeader';
import { LoadingCard } from '../common/LoadingCard';
import { Button } from '../../ui/Button';

export function RecentCalls() {
  const { calls, loading } = useRecentCalls();

  return (
    <div className="bg-card border border-border rounded-lg p-6">
      <CardHeader 
        icon={Phone} 
        title="Recent Calls"
        action={
          <Button variant="outline" size="sm" to="/dashboard/calls">
            View All
          </Button>
        }
      />

      {loading ? (
        <LoadingCard count={3} />
      ) : (
        <div className="space-y-4">
          {calls.map((call) => (
            <CallCard key={call.id} call={call} />
          ))}
        </div>
      )}
    </div>
  );
}