import { Link } from 'react-router-dom';

interface FooterLinkProps {
  href: string;
  children: React.ReactNode;
  external?: boolean;
}

export function FooterLink({ href, children, external }: FooterLinkProps) {
  if (external) {
    return (
      <a 
        href={href}
        target="_blank"
        rel="noopener noreferrer"
        className="text-foreground/70 hover:text-primary transition-colors"
      >
        {children}
      </a>
    );
  }

  return (
    <Link
      to={href}
      className="text-foreground/70 hover:text-primary transition-colors"
    >
      {children}
    </Link>
  );
}