import { Phone } from 'lucide-react';
import { Call } from '../../types/calls';
import { StatusBadge } from '../ui/StatusBadge';

interface CallHeaderProps {
  call: Call;
}

export function CallHeader({ call }: CallHeaderProps) {
  return (
    <div className="flex items-center justify-between mb-4">
      <div className="flex items-center space-x-3">
        <div className={`p-2 rounded-lg bg-${call.status}-400/10`}>
          <Phone className={`text-${call.status}-400`} />
        </div>
        <div>
          <h3 className="text-white font-medium">{call.contactName}</h3>
          <p className="text-sm text-gray-400">{call.company}</p>
        </div>
      </div>
      <StatusBadge status={call.status} />
    </div>
  );
}