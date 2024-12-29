import { useState, useCallback } from 'react';
import type { SearchState } from '../types';

export function useSearch() {
  const [state, setState] = useState<SearchState>({
    query: '',
    results: [],
    loading: false,
    error: null
  });

  const setQuery = useCallback((query: string) => {
    setState(prev => ({ ...prev, query }));
  }, []);

  const clearSearch = useCallback(() => {
    setState({
      query: '',
      results: [],
      loading: false,
      error: null
    });
  }, []);

  const handleSearch = useCallback(async () => {
    if (!state.query.trim()) {
      clearSearch();
      return;
    }

    setState(prev => ({ ...prev, loading: true, error: null }));

    try {
      // Implement search logic here
      const results = [];
      setState(prev => ({ ...prev, results, loading: false }));
    } catch (error) {
      setState(prev => ({
        ...prev,
        loading: false,
        error: 'Failed to perform search'
      }));
    }
  }, [state.query, clearSearch]);

  return {
    ...state,
    setQuery,
    clearSearch,
    handleSearch
  };
}