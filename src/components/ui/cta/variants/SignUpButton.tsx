import { UserPlus } from 'lucide-react';
import { CTAButton } from '../CTAButton';
import type { CTAButtonProps } from '../types';

export function SignUpButton({ children = 'Sign Up', ...props }: Partial<CTAButtonProps>) {
  return (
    <CTAButton
      href="/signup"
      icon={<UserPlus className="h-4 w-4" />}
      {...props}
    >
      {children}
    </CTAButton>
  );
}