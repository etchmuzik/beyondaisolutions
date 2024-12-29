import { Bot } from 'lucide-react';

export function AnimatedGear() {
  return (
    <div className="relative w-10 h-10">
      <div className="absolute inset-0 flex items-center justify-center">
        <Bot className="h-10 w-10 text-primary/20 animate-spin-slow" />
      </div>
      <div className="absolute inset-0 flex items-center justify-center">
        <Bot className="h-6 w-6 text-primary animate-spin-reverse-slow" />
      </div>
    </div>
  );
}