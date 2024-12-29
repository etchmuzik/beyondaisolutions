import { Calendar } from 'lucide-react';
import { useUpcomingCalls } from '../../../hooks/useUpcomingCalls';
import { CallCard } from '../../calls/CallCard';
import { CardHeader } from '../common/CardHeader';
import { LoadingCard } from '../common/LoadingCard';
import { Button } from '../../ui/Button';

export function UpcomingCalls() {
  const { calls, loading } = useUpcomingCalls();

  return (
    <div className="bg-card border border-border rounded-lg p-6">
      <CardHeader 
        icon={Calendar} 
        title="Upcoming Calls"
        action={
          <Button variant="outline" size="sm" to="/dashboard/schedule">
            Schedule
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