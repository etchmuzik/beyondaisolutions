import { Sparkles } from 'lucide-react';
import { CTAButton } from '../CTAButton';
import type { CTAButtonProps } from '../types';

export function FreeTrialButton({ children = 'Start Free Trial', ...props }: Partial<CTAButtonProps>) {
  return (
    <CTAButton
      href="/trial"
      icon={<Sparkles className="h-4 w-4" />}
      {...props}
    >
      {children}
    </CTAButton>
  );
}