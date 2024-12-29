import { Bot } from 'lucide-react';
import { Link } from 'react-router-dom';

interface AuthHeaderProps {
  title: string;
  subtitle: string;
}

export function AuthHeader({ title, subtitle }: AuthHeaderProps) {
  return (
    <div className="mb-8">
      <Link to="/" className="flex items-center gap-2 mb-6">
        <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center">
          <Bot className="h-6 w-6 text-primary" />
        </div>
        <span className="text-lg font-semibold text-foreground">Beyond AI</span>
      </Link>
      <h1 className="text-2xl font-bold text-foreground">{title}</h1>
      <p className="text-foreground/70 mt-2">{subtitle}</p>
    </div>
  );
}