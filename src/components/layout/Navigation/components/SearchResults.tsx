import { Link } from 'react-router-dom';
import type { SearchResult } from '../types';

interface SearchResultsProps {
  results: SearchResult[];
  loading: boolean;
  onClose: () => void;
}

export function SearchResults({ results, loading, onClose }: SearchResultsProps) {
  if (loading) {
    return (
      <div className="p-6 text-center text-foreground/70">
        <div className="animate-spin rounded-full h-6 w-6 border-t-2 border-primary mx-auto" />
      </div>
    );
  }

  if (results.length === 0) {
    return (
      <div className="p-6 text-center text-foreground/70">
        No results found
      </div>
    );
  }

  return (
    <div className="max-h-[60vh] overflow-y-auto divide-y divide-border">
      {results.map((result) => (
        <Link
          key={result.id}
          to={result.url}
          onClick={onClose}
          className="block p-4 hover:bg-card transition-colors"
        >
          <h3 className="font-medium text-foreground mb-1">{result.title}</h3>
          <p className="text-sm text-foreground/70">{result.description}</p>
        </Link>
      ))}
    </div>
  );
}