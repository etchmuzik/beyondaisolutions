import { Call } from '../types/calls';
import { FilterState } from '../hooks/useFilter';
import { getDateRange } from './dateUtils';

export function filterCalls(calls: Call[], filters: FilterState): Call[] {
  return calls.filter(call => {
    const matchesStatus = filters.status === 'all' || call.status === filters.status;
    const { start } = getDateRange(parseInt(filters.timeRange));
    const matchesTime = new Date(call.timestamp) >= start;
    
    return matchesStatus && matchesTime;
  });
}