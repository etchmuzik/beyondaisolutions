import { Rocket } from 'lucide-react';
import { CTAButton } from '../CTAButton';
import type { CTAButtonProps } from '../types';

export function GetStartedButton({ children = 'Get Started', ...props }: Partial<CTAButtonProps>) {
  return (
    <CTAButton
      href="/get-started"
      icon={<Rocket className="h-4 w-4" />}
      {...props}
    >
      {children}
    </CTAButton>
  );
}