import { MessageSquare } from 'lucide-react';
import { CTAButton } from '../CTAButton';
import type { CTAButtonProps } from '../types';

export function ContactButton({ children = 'Contact Us', ...props }: Partial<CTAButtonProps>) {
  return (
    <CTAButton
      href="/contact"
      icon={<MessageSquare className="h-4 w-4" />}
      variant="outline"
      {...props}
    >
      {children}
    </CTAButton>
  );
}