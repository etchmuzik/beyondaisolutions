import { useState, useEffect } from 'react';
import { loadReCAPTCHA } from '../utils/loadScript';

interface UseReCAPTCHAProps {
  siteKey: string;
  onVerify: (token: string) => void;
  theme?: 'light' | 'dark';
}

export function useReCAPTCHA({ siteKey, onVerify, theme }: UseReCAPTCHAProps) {
  const [isLoading, setIsLoading] = useState(true);
  const [isReady, setIsReady] = useState(false);
  const containerId = 'recaptcha-container';

  useEffect(() => {
    const initReCAPTCHA = async () => {
      try {
        await loadReCAPTCHA();
        
        window.grecaptcha.ready(() => {
          window.grecaptcha.render(containerId, {
            sitekey: siteKey,
            theme,
            callback: onVerify
          });
          setIsReady(true);
          setIsLoading(false);
        });
      } catch (error) {
        console.error('Failed to load reCAPTCHA:', error);
        setIsLoading(false);
      }
    };

    initReCAPTCHA();

    return () => {
      // Cleanup
      const script = document.querySelector('script[src*="recaptcha"]');
      if (script) {
        script.remove();
      }
    };
  }, [siteKey, onVerify, theme]);

  return {
    isLoading,
    isReady,
    containerId
  };
}