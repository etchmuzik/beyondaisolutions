import { Link } from 'react-router-dom';
import type { BlogPost } from '../../../types/blog';

interface SearchResultsProps {
  results: BlogPost[];
  loading: boolean;
  className?: string;
}

export function SearchResults({ results, loading, className = '' }: SearchResultsProps) {
  if (loading) {
    return (
      <div className={`${className} p-4 text-center text-foreground/70`}>
        Searching...
      </div>
    );
  }

  if (results.length === 0) {
    return (
      <div className={`${className} p-4 text-center text-foreground/70`}>
        No results found
      </div>
    );
  }

  return (
    <div className={`${className} bg-card border border-border rounded-lg overflow-hidden`}>
      {results.map((post) => (
        <Link
          key={post.id}
          to={`/blog/${post.slug}`}
          className="block p-4 hover:bg-background transition-colors"
        >
          <h3 className="font-medium text-foreground mb-1">{post.title}</h3>
          <p className="text-sm text-foreground/70 line-clamp-2">{post.excerpt}</p>
        </Link>
      ))}
    </div>
  );
}