import { Call } from '../../types/calls';
import { CallHeader } from './CallHeader';
import { CallMetrics } from './CallMetrics';

interface CallCardProps {
  call: Call;
}

export function CallCard({ call }: CallCardProps) {
  return (
    <div className="p-4 rounded-lg bg-white/5 border border-white/10 hover:border-primary/50 transition-colors">
      <CallHeader call={call} />
      <CallMetrics call={call} />
    </div>
  );
}