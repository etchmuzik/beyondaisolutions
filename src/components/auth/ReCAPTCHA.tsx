import { useEffect } from 'react';

interface ReCAPTCHAProps {
  onVerify: (token: string) => void;
}

declare global {
  interface Window {
    grecaptcha: any;
    onRecaptchaLoad: () => void;
  }
}

export function ReCAPTCHA({ onVerify }: ReCAPTCHAProps) {
  useEffect(() => {
    // Load reCAPTCHA script
    const script = document.createElement('script');
    script.src = `https://www.google.com/recaptcha/api.js?onload=onRecaptchaLoad&render=explicit`;
    script.async = true;
    script.defer = true;

    // Initialize reCAPTCHA when script loads
    window.onRecaptchaLoad = () => {
      window.grecaptcha.render('recaptcha-container', {
        sitekey: import.meta.env.VITE_RECAPTCHA_SITE_KEY,
        callback: onVerify,
      });
    };

    document.head.appendChild(script);

    return () => {
      document.head.removeChild(script);
      delete window.onRecaptchaLoad;
    };
  }, [onVerify]);

  return <div id="recaptcha-container" className="flex justify-center" />;
}