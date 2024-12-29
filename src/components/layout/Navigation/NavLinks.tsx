import { Link, useLocation } from 'react-router-dom';

const links = [
  { href: '/features', label: 'Features' },
  { href: '/solutions', label: 'Solutions' },
  { href: '/pricing', label: 'Pricing' },
  { href: '/contact', label: 'Contact' }
] as const;

interface NavLinksProps {
  className?: string;
  onClick?: () => void;
}

export function NavLinks({ className = '', onClick }: NavLinksProps) {
  const location = useLocation();

  return (
    <div className={`space-x-6 ${className}`}>
      {links.map(({ href, label }) => (
        <Link
          key={href}
          to={href}
          onClick={onClick}
          className={`text-sm font-medium transition-colors ${
            location.pathname === href
              ? 'text-primary'
              : 'text-foreground/70 hover:text-foreground'
          }`}
        >
          {label}
        </Link>
      ))}
    </div>
  );
}