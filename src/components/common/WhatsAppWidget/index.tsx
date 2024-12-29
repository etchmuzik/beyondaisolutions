import { MessageCircle } from 'lucide-react';
import { cn } from '../../../utils/cn';
import { styles } from './styles';

interface WhatsAppWidgetProps {
  phoneNumber: string;
  message?: string;
  className?: string;
}

export function WhatsAppWidget({ 
  phoneNumber,
  message = 'Hello! I have a question about Beyond AI.',
  className = ''
}: WhatsAppWidgetProps) {
  const handleClick = () => {
    const encodedMessage = encodeURIComponent(message);
    const url = `https://wa.me/${phoneNumber}?text=${encodedMessage}`;
    window.open(url, '_blank', 'noopener,noreferrer');
  };

  return (
    <button
      onClick={handleClick}
      className={cn(styles.button, className)}
      aria-label="Chat on WhatsApp"
    >
      <MessageCircle className={styles.icon} />
      <span className={styles.label}>Chat with us</span>
    </button>
  );
}