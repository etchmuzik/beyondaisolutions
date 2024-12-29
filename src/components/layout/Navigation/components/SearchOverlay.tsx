import { useEffect, useState } from 'react';
import { X } from 'lucide-react';
import { SearchBar } from './SearchBar';
import { SearchResults } from './SearchResults';
import { useSearchResults } from '../hooks/useSearchResults';

interface SearchOverlayProps {
  isOpen: boolean;
  onClose: () => void;
}

export function SearchOverlay({ isOpen, onClose }: SearchOverlayProps) {
  const [query, setQuery] = useState('');
  const { results, loading } = useSearchResults(query);

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }

    return () => {
      document.body.style.overflow = '';
    };
  }, [isOpen]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 bg-background/80 backdrop-blur-sm">
      <div className="fixed inset-x-0 top-0 bg-background border-b border-border">
        <div className="max-w-3xl mx-auto p-4">
          <div className="flex items-center gap-4">
            <SearchBar
              value={query}
              onChange={setQuery}
              onClear={() => setQuery('')}
              placeholder="Search anything..."
            />
            <button
              onClick={onClose}
              className="p-2 text-foreground/70 hover:text-foreground"
            >
              <X className="h-5 w-5" />
            </button>
          </div>
          {query && (
            <div className="mt-4">
              <SearchResults
                results={results}
                loading={loading}
                onClose={onClose}
              />
            </div>
          )}
        </div>
      </div>
    </div>
  );
}