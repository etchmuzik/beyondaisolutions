import { useState } from 'react';
import { Button } from '../../ui/Button';

export function Newsletter() {
  const [email, setEmail] = useState('');
  const [consent, setConsent] = useState(false);
  const [status, setStatus] = useState<'idle' | 'success' | 'error'>('idle');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || !consent) return;

    // Simulate API call
    setStatus('success');
    setEmail('');
    setConsent(false);
  };

  return (
    <div className="space-y-4">
      <h3 className="text-lg font-semibold text-foreground">Stay Updated</h3>
      <p className="text-foreground/70">
        Get the latest updates on AI technology and industry insights
      </p>
      
      <form onSubmit={handleSubmit} className="space-y-4">
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="Enter your email"
          className="w-full px-4 py-2 bg-background border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
          required
        />
        
        <label className="flex items-start space-x-3">
          <input
            type="checkbox"
            checked={consent}
            onChange={(e) => setConsent(e.target.checked)}
            className="mt-1"
            required
          />
          <span className="text-sm text-foreground/70">
            I agree to receive marketing communications and consent to the processing of my data as per the Privacy Policy
          </span>
        </label>

        {status === 'success' && (
          <p className="text-green-500">Thank you for subscribing!</p>
        )}
        {status === 'error' && (
          <p className="text-red-500">Something went wrong. Please try again.</p>
        )}

        <Button type="submit" variant="primary" className="w-full">
          Subscribe
        </Button>
      </form>
    </div>
  );
}