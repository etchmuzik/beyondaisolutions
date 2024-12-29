import { useEffect, useCallback } from 'react';
import { LoadingSpinner } from './LoadingSpinner';

interface ReCAPTCHAProps {
  siteKey: string;
  onVerify: (token: string) => void;
  theme?: 'light' | 'dark';
}

export function ReCAPTCHA({ siteKey, onVerify, theme = 'dark' }: ReCAPTCHAProps) {
  const containerId = 'recaptcha-container';

  const initializeReCAPTCHA = useCallback(() => {
    if (!window.grecaptcha) return;

    window.grecaptcha.render(containerId, {
      sitekey: siteKey,
      theme,
      callback: onVerify
    });
  }, [siteKey, onVerify, theme]);

  useEffect(() => {
    // Check if reCAPTCHA script is already loaded
    if (window.grecaptcha) {
      initializeReCAPTCHA();
      return;
    }

    // Load reCAPTCHA script
    const script = document.createElement('script');
    script.src = `https://www.google.com/recaptcha/api.js?render=explicit`;
    script.async = true;
    script.defer = true;
    script.onload = initializeReCAPTCHA;

    document.head.appendChild(script);

    return () => {
      document.head.removeChild(script);
    };
  }, [initializeReCAPTCHA]);

  return (
    <div className="flex justify-center">
      <div id={containerId}>
        <LoadingSpinner />
      </div>
    </div>
  );
}