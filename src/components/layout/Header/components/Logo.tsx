import { Bot } from 'lucide-react';
import { Link } from 'react-router-dom';
import { AnimatedGear } from './AnimatedGear';

export function Logo() {
  return (
    <Link to="/" className="flex items-center gap-2 group hover:opacity-90 transition-opacity">
      <AnimatedGear />
      <div className="flex flex-col">
        <span className="text-lg font-bold text-white">Beyond AI</span>
        <span className="text-xs text-gray-400">Automation Solutions</span>
      </div>
    </Link>
  );
}