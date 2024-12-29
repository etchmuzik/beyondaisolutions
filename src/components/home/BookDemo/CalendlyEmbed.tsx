import { useEffect } from 'react';

interface CalendlyEmbedProps {
  url: string;
  className?: string;
}

declare global {
  interface Window {
    Calendly: any;
  }
}

export function CalendlyEmbed({ url, className = '' }: CalendlyEmbedProps) {
  useEffect(() => {
    const script = document.createElement('script');
    script.src = 'https://assets.calendly.com/assets/external/widget.js';
    script.async = true;
    document.body.appendChild(script);

    return () => {
      document.body.removeChild(script);
    };
  }, []);

  return (
    <div 
      className={`calendly-inline-widget ${className}`} 
      data-url={url}
      style={{ minWidth: '320px', height: '700px' }} 
    />
  );
}