import { ArrowLeft } from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';
import { Logo } from '../../ui/Logo';

interface AuthHeaderProps {
  title: string;
  subtitle: string;
}

export function AuthHeader({ title, subtitle }: AuthHeaderProps) {
  const navigate = useNavigate();

  return (
    <div className="mb-8">
      <div className="flex items-center justify-between mb-6">
        <Link to="/" className="flex items-center gap-2">
          <Logo />
        </Link>
      </div>

      <button
        onClick={() => navigate(-1)}
        className="flex items-center text-sm text-foreground/70 hover:text-foreground mb-6 transition-colors"
      >
        <ArrowLeft className="h-4 w-4 mr-2" />
        Back
      </button>

      <h1 className="text-2xl font-bold text-foreground">{title}</h1>
      <p className="text-foreground/70 mt-2">{subtitle}</p>
    </div>
  );
}