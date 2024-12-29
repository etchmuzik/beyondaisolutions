import { useState } from 'react';
import { Bot, X } from 'lucide-react';
import { LoadingIndicator } from './LoadingIndicator';
import { ErrorState } from './ErrorState';
import { useVoiceAssistant } from '../../../hooks/useVoiceAssistant';
import { ELEVENLABS_CONFIG } from '../../../config/elevenlabs';
import { cn } from '../../../utils/cn';
import { styles } from './styles';

interface VoiceAssistantProps {
  className?: string;
}

export function VoiceAssistant({ className = '' }: VoiceAssistantProps) {
  const [isOpen, setIsOpen] = useState(false);
  const { isLoaded, isScriptLoaded, error, retryLoading } = useVoiceAssistant();

  // Only show the widget when it's ready
  const showWidget = isScriptLoaded && isLoaded && !error;

  return (
    <div className={cn(styles.container, className)}>
      {/* Toggle Button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className={cn(
          styles.toggleButton,
          isOpen && styles.toggleButtonActive
        )}
        aria-label={isOpen ? 'Close AI Assistant' : 'Open AI Assistant'}
      >
        {isOpen ? (
          <X className={styles.icon} />
        ) : (
          <>
            <Bot className={styles.icon} />
            <span className={styles.label}>AI Assistant</span>
          </>
        )}
      </button>
      
      {/* Widget Container */}
      <div className={cn(
        styles.widgetContainer,
        isOpen ? styles.widgetOpen : styles.widgetClosed
      )}>
        <div className={styles.widgetWrapper}>
          {showWidget && (
            <elevenlabs-convai 
              agent-id={ELEVENLABS_CONFIG.agentId}
              class={styles.widget}
            />
          )}

          {/* Loading State */}
          {!showWidget && !error && <LoadingIndicator />}

          {/* Error State */}
          {error && <ErrorState onRetry={retryLoading} />}
        </div>
      </div>
    </div>
  );
}