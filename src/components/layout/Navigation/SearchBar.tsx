import { Search, X } from 'lucide-react';
import { useState } from 'react';

interface SearchBarProps {
  onClose: () => void;
}

export function SearchBar({ onClose }: SearchBarProps) {
  const [query, setQuery] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Handle search
    console.log('Search:', query);
  };

  return (
    <form onSubmit={handleSubmit} className="relative">
      <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-foreground/40" />
      <input
        type="search"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        placeholder="Search..."
        className="w-full pl-12 pr-12 py-2 bg-background border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
      />
      <button
        type="button"
        onClick={onClose}
        className="absolute right-4 top-1/2 -translate-y-1/2 text-foreground/40 hover:text-foreground"
      >
        <X className="h-5 w-5" />
      </button>
    </form>
  );
}