import { cva } from 'class-variance-authority';
import type { CTAButtonStyleProps } from './types';

const buttonStyles = cva(
  'inline-flex items-center justify-center rounded-lg font-medium transition-colors focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2 disabled:opacity-50 disabled:pointer-events-none',
  {
    variants: {
      size: {
        sm: 'px-3 py-1.5 text-sm',
        md: 'px-4 py-2 text-base',
        lg: 'px-6 py-3 text-lg'
      },
      variant: {
        primary: 'bg-primary text-primary-foreground hover:bg-primary/90',
        secondary: 'bg-card text-card-foreground hover:bg-card/90',
        tertiary: 'bg-background text-foreground hover:bg-background/90',
        outline: 'border border-border text-foreground hover:bg-card/50',
        ghost: 'text-foreground hover:bg-card/50'
      },
      intent: {
        success: 'bg-green-600 text-white hover:bg-green-700',
        danger: 'bg-red-600 text-white hover:bg-red-700',
        warning: 'bg-yellow-600 text-white hover:bg-yellow-700',
        info: 'bg-blue-600 text-white hover:bg-blue-700'
      },
      fullWidth: {
        true: 'w-full',
        false: 'w-auto'
      }
    },
    defaultVariants: {
      size: 'md',
      variant: 'primary',
      fullWidth: false
    }
  }
);

export const getButtonStyles = ({
  size,
  variant,
  intent,
  fullWidth,
  disabled
}: CTAButtonStyleProps) => {
  return buttonStyles({ size, variant, intent, fullWidth, disabled });
};