import { Globe } from 'lucide-react';

export function LanguageSwitch() {
  return (
    <button className="flex items-center space-x-1 text-white/80 hover:text-white">
      <Globe className="h-4 w-4" />
      <span>EN</span>
    </button>
  );
}