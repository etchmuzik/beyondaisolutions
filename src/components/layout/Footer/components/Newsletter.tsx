import { useState } from 'react';
import { FooterSection } from './FooterSection';
import { Button } from '../../../ui/Button';

export function Newsletter() {
  const [email, setEmail] = useState('');
  const [consent, setConsent] = useState(false);
  const [status, setStatus] = useState<'idle' | 'success' | 'error'>('idle');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || !consent) return;

    try {
      setStatus('idle');
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // Open social media in new tab
      window.open('https://twitter.com/beyondaisolutions', '_blank');
      
      setStatus('success');
      setEmail('');
      setConsent(false);
    } catch (error) {
      setStatus('error');
    }
  };

  return (
    <FooterSection title="Stay Updated">
      <form onSubmit={handleSubmit} className="space-y-4">
        <p className="text-foreground/70">
          Get the latest updates on AI technology and industry insights
        </p>
        
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="Enter your email"
          className="w-full px-4 py-2 bg-background border border-border rounded-lg text-white placeholder:text-foreground/40 focus:outline-none focus:ring-2 focus:ring-primary"
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
            I agree to receive marketing communications and consent to the processing of my data
          </span>
        </label>

        <Button type="submit" variant="primary" className="w-full">
          Subscribe
        </Button>

        {status === 'success' && (
          <p className="text-sm text-green-500 text-center">
            Thank you for subscribing! Please check your email to confirm.
          </p>
        )}
        {status === 'error' && (
          <p className="text-sm text-red-500 text-center">
            Something went wrong. Please try again.
          </p>
        )}
      </form>
    </FooterSection>
  );
}