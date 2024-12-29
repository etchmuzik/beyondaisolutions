import { useState } from 'react';
import { useAuth } from '../../../contexts/AuthContext';

interface GoogleButtonProps {
  mode: 'login' | 'signup';
  className?: string;
}

export function GoogleButton({ mode, className = '' }: GoogleButtonProps) {
  const { signInWithGoogle } = useAuth();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleGoogleAuth = async () => {
    try {
      setLoading(true);
      setError(null);
      await signInWithGoogle();
    } catch (err) {
      console.error('Google auth error:', err);
      setError(err instanceof Error ? err.message : 'Failed to authenticate with Google');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <button
        onClick={handleGoogleAuth}
        disabled={loading}
        className={`
          w-full flex items-center justify-center gap-2 
          px-4 py-2 rounded-lg border border-border
          bg-card hover:bg-card/90 transition-colors
          disabled:opacity-50 disabled:cursor-not-allowed
          ${className}
        `}
        type="button"
      >
        <img src="/google.svg" alt="Google" className="w-5 h-5" />
        <span className="text-foreground">
          {loading ? 'Please wait...' : `${mode === 'login' ? 'Sign in' : 'Sign up'} with Google`}
        </span>
      </button>
      
      {error && (
        <p className="mt-2 text-sm text-red-500 text-center">
          {error}
        </p>
      )}
    </div>
  );
}