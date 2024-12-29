import { Phone, Clock, BarChart2 } from 'lucide-react';
import { Call } from '../../types/calls';
import { CallMetric } from './CallMetric';
import { formatDuration, formatDateTime } from '../../utils/formatters';

interface CallMetricsProps {
  call: Call;
}

export function CallMetrics({ call }: CallMetricsProps) {
  return (
    <div className="grid grid-cols-3 gap-4 text-sm">
      <CallMetric icon={Clock} value={formatDateTime(call.timestamp)} />
      <CallMetric icon={Phone} value={formatDuration(call.duration)} />
      <CallMetric icon={BarChart2} value={call.sentiment || 'N/A'} />
    </div>
  );
}