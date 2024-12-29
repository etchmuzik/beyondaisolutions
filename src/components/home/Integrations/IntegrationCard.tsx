import { useState } from 'react';
import type { IntegrationCardProps } from './types';

export function IntegrationCard({ name, icon: Icon, description }: IntegrationCardProps) {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <div
      className="flex flex-col items-center justify-center p-6 bg-black border border-white/10 rounded-lg transition-all duration-300 hover:border-white/30 group"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div className="relative w-12 h-12 mb-3 flex items-center justify-center">
        <Icon 
          className={`w-8 h-8 text-white/50 group-hover:text-white transition-all duration-300 ${
            isHovered ? 'scale-110' : 'scale-100'
          }`}
        />
      </div>
      <span className="text-sm text-white/50 group-hover:text-white transition-colors duration-300">
        {name}
      </span>
      <span className="mt-1 text-xs text-white/30 group-hover:text-white/50 transition-colors duration-300">
        {description}
      </span>
    </div>
  );
}