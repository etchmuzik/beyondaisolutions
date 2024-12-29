import { LucideIcon } from 'lucide-react';

interface StepIconProps {
  icon: LucideIcon;
  number: number;
}

export function StepIcon({ icon: Icon, number }: StepIconProps) {
  return (
    <div className="relative inline-block mb-6">
      {/* Glowing background effect */}
      <div className="absolute inset-0 rounded-full bg-primary/5 blur-xl" />
      
      {/* Main circle */}
      <div className="relative w-32 h-32 rounded-full bg-black border border-primary/20 flex items-center justify-center group-hover:border-primary/30 transition-all duration-300">
        {/* Number */}
        <div className="absolute -top-4 -left-4 w-12 h-12 rounded-full bg-black border border-primary/20 flex items-center justify-center text-primary font-bold text-2xl">
          {number}
        </div>
        
        {/* Icon */}
        <div className="relative">
          <div className="absolute inset-0 rounded-full animate-pulse-slow opacity-20 bg-primary/20" />
          <Icon className="h-16 w-16 text-primary relative z-10 group-hover:scale-110 transition-transform duration-300" />
        </div>
      </div>
    </div>
  );
}