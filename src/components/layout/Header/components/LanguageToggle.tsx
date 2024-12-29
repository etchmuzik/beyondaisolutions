import { Globe } from 'lucide-react';

export function LanguageToggle() {
  return (
    <button 
      className="p-2 text-gray-400 hover:text-white transition-colors"
      aria-label="Change language"
    >
      <Globe className="h-5 w-5" />
    </button>
  );
}