import { Bot } from 'lucide-react';
import { Link } from 'react-router-dom';

export function Logo() {
  return (
    <Link to="/" className="flex items-center space-x-2">
      <Bot className="h-8 w-8 text-cyan-400" />
      <span className="text-xl font-bold text-white">Beyond AI</span>
    </Link>
  );
}