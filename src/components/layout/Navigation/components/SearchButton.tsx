import { Search } from 'lucide-react';

interface SearchButtonProps {
  onClick: () => void;
}

export function SearchButton({ onClick }: SearchButtonProps) {
  return (
    <button
      onClick={onClick}
      className="p-2 text-foreground/70 hover:text-foreground transition-colors"
      aria-label="Search"
    >
      <Search className="h-5 w-5" />
    </button>
  );
}