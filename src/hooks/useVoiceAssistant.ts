import { useState, useEffect, useCallback } from 'react';
import { ELEVENLABS_CONFIG } from '../config/elevenlabs';

interface VoiceAssistantState {
  isLoaded: boolean;
  isScriptLoaded: boolean;
  error: string | null;
}

export function useVoiceAssistant() {
  const [state, setState] = useState<VoiceAssistantState>({
    isLoaded: false,
    isScriptLoaded: false,
    error: null
  });

  const loadScript = useCallback(async () => {
    try {
      // Check if script is already loaded
      if (document.querySelector('script[src*="convai-widget"]')) {
        setState(prev => ({ ...prev, isScriptLoaded: true }));
        return;
      }

      const script = document.createElement('script');
      script.src = ELEVENLABS_CONFIG.widgetUrl;
      script.async = true;
      script.defer = true;

      // Create a promise to handle script loading
      await new Promise((resolve, reject) => {
        script.onload = resolve;
        script.onerror = reject;
        document.head.appendChild(script);
      });

      setState(prev => ({ 
        ...prev, 
        isScriptLoaded: true,
        isLoaded: true 
      }));
    } catch (err) {
      setState(prev => ({ 
        ...prev, 
        error: 'Failed to load voice assistant' 
      }));
      console.error('Voice Assistant Error:', err);
    }
  }, []);

  useEffect(() => {
    loadScript();
  }, [loadScript]);

  const retryLoading = useCallback(() => {
    setState({
      isLoaded: false,
      isScriptLoaded: false,
      error: null
    });
    loadScript();
  }, [loadScript]);

  return {
    ...state,
    retryLoading
  };
}