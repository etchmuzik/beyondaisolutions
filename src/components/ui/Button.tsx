import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';

interface ButtonProps {
  children: React.ReactNode;
  variant?: 'primary' | 'secondary' | 'outline';
  to?: string;
  className?: string;
  showArrow?: boolean;
  onClick?: () => void;
  type?: 'button' | 'submit' | 'reset';
  disabled?: boolean;
  size?: 'sm' | 'md' | 'lg';
}

export function Button({ 
  children, 
  variant = 'primary', 
  to, 
  className = '',
  showArrow,
  onClick,
  type = 'button',
  disabled = false,
  size = 'md'
}: ButtonProps) {
  const baseStyles = 'inline-flex items-center justify-center rounded-lg font-medium transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed focus:ring-2 focus:ring-offset-2 focus:ring-primary/50';
  
  const sizes = {
    sm: 'px-3 py-1.5 text-sm',
    md: 'px-6 py-2',
    lg: 'px-8 py-3 text-lg'
  };

  const variants = {
    primary: 'bg-primary text-black hover:brightness-110 hover-glow',
    secondary: 'bg-card text-card-foreground hover:bg-card/90',
    outline: 'border-2 border-primary text-primary hover:bg-primary/10 hover-glow'
  };

  const classes = `${baseStyles} ${sizes[size]} ${variants[variant]} ${className}`;
  const content = (
    <>
      {children}
      {showArrow && (
        <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
      )}
    </>
  );

  if (to) {
    return <Link to={to} className={`${classes} hover-scale`}>{content}</Link>;
  }

  return (
    <button 
      type={type}
      onClick={onClick}
      disabled={disabled}
      className={classes}
    >
      {content}
    </button>
  );
}