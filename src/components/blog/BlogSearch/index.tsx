import { useState } from 'react';
import { SearchInput } from './SearchInput';
import { SearchResults } from './SearchResults';
import { useSearchPosts } from '../../../hooks/useSearchPosts';

interface BlogSearchProps {
  className?: string;
}

export function BlogSearch({ className = '' }: BlogSearchProps) {
  const [query, setQuery] = useState('');
  const { results, loading } = useSearchPosts(query);

  return (
    <div className={className}>
      <SearchInput
        value={query}
        onChange={setQuery}
        placeholder="Search articles..."
      />
      {query && (
        <SearchResults
          results={results}
          loading={loading}
          className="mt-2"
        />
      )}
    </div>
  );
}