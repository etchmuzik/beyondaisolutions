import { Bot } from 'lucide-react';

export function LoadingIndicator() {
  return (
    <div className="flex flex-col items-center justify-center h-[200px] w-full">
      <div className="animate-pulse bg-primary/10 p-4 rounded-full mb-4">
        <Bot className="h-6 w-6 text-primary" />
      </div>
      <p className="text-sm text-foreground/70">Loading AI Assistant...</p>
    </div>
  );
}