import { useEffect, useState } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { Check, AlertTriangle } from 'lucide-react';
import { supabase } from '../../lib/supabase';
import { Button } from '../../components/ui/Button';
import { AuthLayout } from '../../components/auth/AuthLayout';

export function VerifyEmail() {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const [verifying, setVerifying] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const token = searchParams.get('token');
    if (!token) {
      setError('Invalid verification link');
      setVerifying(false);
      return;
    }

    async function verifyEmail() {
      try {
        const { error: verifyError } = await supabase.auth.verifyOtp({
          token_hash: token,
          type: 'email'
        });

        if (verifyError) throw verifyError;
        setVerifying(false);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Failed to verify email');
        setVerifying(false);
      }
    }

    verifyEmail();
  }, [searchParams]);

  if (verifying) {
    return (
      <AuthLayout>
        <div className="text-center">
          <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-primary mx-auto mb-4" />
          <h2 className="text-2xl font-bold text-foreground mb-2">Verifying your email</h2>
          <p className="text-foreground/70">Please wait while we verify your email address.</p>
        </div>
      </AuthLayout>
    );
  }

  if (error) {
    return (
      <AuthLayout>
        <div className="text-center">
          <div className="w-12 h-12 rounded-full bg-red-500/10 flex items-center justify-center mx-auto mb-4">
            <AlertTriangle className="h-6 w-6 text-red-500" />
          </div>
          <h2 className="text-2xl font-bold text-foreground mb-2">Verification failed</h2>
          <p className="text-foreground/70 mb-8">{error}</p>
          <Button variant="primary" onClick={() => navigate('/login')}>
            Return to login
          </Button>
        </div>
      </AuthLayout>
    );
  }

  return (
    <AuthLayout>
      <div className="text-center">
        <div className="w-12 h-12 rounded-full bg-green-500/10 flex items-center justify-center mx-auto mb-4">
          <Check className="h-6 w-6 text-green-500" />
        </div>
        <h2 className="text-2xl font-bold text-foreground mb-2">Email verified</h2>
        <p className="text-foreground/70 mb-8">
          Your email has been successfully verified. You can now sign in to your account.
        </p>
        <Button variant="primary" onClick={() => navigate('/login')}>
          Sign in
        </Button>
      </div>
    </AuthLayout>
  );
}