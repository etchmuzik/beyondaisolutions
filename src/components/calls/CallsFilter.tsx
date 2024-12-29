import { Filter } from 'lucide-react';
import { Select } from '../ui/Select';
import { useFilter, FilterState } from '../../hooks/useFilter';

const statusOptions = [
  { value: 'all', label: 'All Calls' },
  { value: 'completed', label: 'Completed' },
  { value: 'scheduled', label: 'Scheduled' },
  { value: 'failed', label: 'Failed' }
];

const timeOptions = [
  { value: '7', label: 'Last 7 days' },
  { value: '30', label: 'Last 30 days' },
  { value: '90', label: 'Last 90 days' }
];

export function CallsFilter() {
  const { filters, updateFilter } = useFilter({
    status: 'all',
    timeRange: '7'
  });

  return (
    <div className="mt-6 flex items-center space-x-4 p-4 rounded-lg bg-white/5 border border-white/10">
      <div className="flex items-center space-x-2 text-gray-400">
        <Filter className="h-4 w-4" />
        <span>Filter by:</span>
      </div>
      
      <Select 
        options={statusOptions}
        value={filters.status}
        onChange={(e) => updateFilter('status', e.target.value)}
      />
      <Select 
        options={timeOptions}
        value={filters.timeRange}
        onChange={(e) => updateFilter('timeRange', e.target.value)}
      />
    </div>
  );
}