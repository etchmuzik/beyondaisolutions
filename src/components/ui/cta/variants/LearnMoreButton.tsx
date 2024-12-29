import { ArrowRight } from 'lucide-react';
import { CTAButton } from '../CTAButton';
import type { CTAButtonProps } from '../types';

export function LearnMoreButton({ children = 'Learn More', ...props }: Partial<CTAButtonProps>) {
  return (
    <CTAButton
      variant="ghost"
      icon={<ArrowRight className="h-4 w-4" />}
      iconPosition="right"
      {...props}
    >
      {children}
    </CTAButton>
  );
}