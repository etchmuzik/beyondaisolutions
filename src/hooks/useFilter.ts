import { useState } from 'react';

export interface FilterState {
  status: string;
  timeRange: string;
}

export function useFilter(initialState: FilterState) {
  const [filters, setFilters] = useState<FilterState>(initialState);

  const updateFilter = (key: keyof FilterState, value: string) => {
    setFilters(prev => ({ ...prev, [key]: value }));
  };

  return {
    filters,
    updateFilter
  };
}