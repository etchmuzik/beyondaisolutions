import { Send } from 'lucide-react';
import { CTAButton } from '../CTAButton';
import type { CTAButtonProps } from '../types';

export function SubmitButton({ children = 'Submit', ...props }: Partial<CTAButtonProps>) {
  return (
    <CTAButton
      type="submit"
      icon={<Send className="h-4 w-4" />}
      {...props}
    >
      {children}
    </CTAButton>
  );
}