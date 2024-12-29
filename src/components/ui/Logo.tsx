import { Cog } from 'lucide-react';
import { Link } from 'react-router-dom';

export function Logo() {
  return (
    <Link 
      to="/" 
      className="flex items-center space-x-2 group hover-scale"
    >
      <div className="relative w-10 h-10">
        {/* Outer gear */}
        <div className="absolute inset-0 flex items-center justify-center">
          <Cog className="w-10 h-10 text-primary/20 animate-spin-slow" />
        </div>
        
        {/* Inner gear */}
        <div className="absolute inset-0 flex items-center justify-center">
          <Cog className="w-6 h-6 text-primary animate-spin-reverse-slow" />
        </div>
      </div>
      
      <div className="flex flex-col">
        <span className="text-lg font-bold text-foreground leading-none">Beyond AI</span>
        <span className="text-xs text-foreground/70">Automation Solutions</span>
      </div>
    </Link>
  );
}