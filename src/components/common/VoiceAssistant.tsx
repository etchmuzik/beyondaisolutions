import { useEffect, useState } from 'react';
import { Bot } from 'lucide-react';

interface VoiceAssistantProps {
  agentId?: string;
  className?: string;
}

export function VoiceAssistant({ 
  agentId = "CPPNw30xz3Nnwpc6lBuE",
  className = "" 
}: VoiceAssistantProps) {
  const [isLoaded, setIsLoaded] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const script = document.createElement('script');
    script.src = "https://elevenlabs.io/convai-widget/index.js";
    script.async = true;
    script.type = "text/javascript";

    script.onload = () => {
      setIsLoaded(true);
    };

    script.onerror = () => {
      setError('Failed to load voice assistant');
    };

    document.body.appendChild(script);

    return () => {
      if (document.body.contains(script)) {
        document.body.removeChild(script);
      }
    };
  }, []);

  if (error) {
    console.error('Voice Assistant Error:', error);
    return null;
  }

  return (
    <div className={`fixed bottom-4 right-4 z-50 ${className}`}>
      {!isLoaded && (
        <div className="bg-primary/10 p-4 rounded-full animate-pulse">
          <Bot className="h-6 w-6 text-primary" />
        </div>
      )}
      <elevenlabs-convai 
        agent-id={agentId}
        class="voice-assistant-widget"
      />
    </div>
  );
}