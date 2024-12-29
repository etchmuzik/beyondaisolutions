import { forwardRef } from 'react';
import { Link } from 'react-router-dom';
import { Loader2 } from 'lucide-react';
import { cn } from '../../../utils/cn';
import { getButtonStyles } from './styles';
import type { CTAButtonProps } from './types';

export const CTAButton = forwardRef<HTMLButtonElement, CTAButtonProps>(({
  children,
  className,
  size = 'md',
  variant = 'primary',
  intent,
  icon,
  iconPosition = 'left',
  loading = false,
  fullWidth = false,
  disabled = false,
  href,
  external = false,
  ...props
}, ref) => {
  const styles = getButtonStyles({ size, variant, intent, fullWidth, disabled });
  const content = (
    <>
      {loading && (
        <Loader2 className="h-4 w-4 animate-spin" />
      )}
      {!loading && icon && iconPosition === 'left' && (
        <span className="mr-2">{icon}</span>
      )}
      <span>{children}</span>
      {!loading && icon && iconPosition === 'right' && (
        <span className="ml-2">{icon}</span>
      )}
    </>
  );

  const buttonProps = {
    className: cn(styles, className),
    disabled: disabled || loading,
    'aria-disabled': disabled || loading,
    ref,
    ...props
  };

  if (href) {
    if (external) {
      return (
        <a 
          href={href}
          target="_blank"
          rel="noopener noreferrer"
          className={buttonProps.className}
        >
          {content}
        </a>
      );
    }
    return (
      <Link to={href} className={buttonProps.className}>
        {content}
      </Link>
    );
  }

  return (
    <button {...buttonProps}>
      {content}
    </button>
  );
});

CTAButton.displayName = 'CTAButton';