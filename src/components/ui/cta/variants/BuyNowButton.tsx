import { ShoppingCart } from 'lucide-react';
import { CTAButton } from '../CTAButton';
import type { CTAButtonProps } from '../types';

export function BuyNowButton({ children = 'Buy Now', ...props }: Partial<CTAButtonProps>) {
  return (
    <CTAButton
      href="/checkout"
      icon={<ShoppingCart className="h-4 w-4" />}
      intent="success"
      {...props}
    >
      {children}
    </CTAButton>
  );
}