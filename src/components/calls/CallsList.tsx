import { CallCard } from './CallCard';
import { useCallData } from '../../hooks/useCallData';
import { useFilter } from '../../hooks/useFilter';
import { filterCalls } from '../../utils/callUtils';

export function CallsList() {
  const { calls, loading, error } = useCallData();
  const { filters } = useFilter({
    status: 'all',
    timeRange: '7'
  });

  if (loading) {
    return <div className="text-gray-400 text-center py-8">Loading calls...</div>;
  }

  if (error) {
    return <div className="text-red-400 text-center py-8">{error}</div>;
  }

  const filteredCalls = filterCalls(calls, filters);

  return (
    <div className="space-y-4">
      {filteredCalls.map((call) => (
        <CallCard key={call.id} call={call} />
      ))}
    </div>
  );
}