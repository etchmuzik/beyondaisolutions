import { Bot } from 'lucide-react';
import { Link } from 'react-router-dom';

export function Logo() {
  return (
    <Link to="/" className="flex items-center gap-2 group hover:opacity-90 transition-opacity">
      <div className="relative w-10 h-10">
        {/* Outer gear animation */}
        <div className="absolute inset-0 flex items-center justify-center">
          <Bot className="h-10 w-10 text-primary/20 animate-spin-slow" />
        </div>
        {/* Inner gear animation */}
        <div className="absolute inset-0 flex items-center justify-center">
          <Bot className="h-6 w-6 text-primary animate-spin-reverse-slow" />
        </div>
      </div>
      <div className="flex flex-col">
        <span className="text-lg font-bold text-white">Beyond AI</span>
        <span className="text-xs text-gray-400">Automation Solutions</span>
      </div>
    </Link>
  );
}