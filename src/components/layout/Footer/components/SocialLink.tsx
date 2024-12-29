interface SocialLinkProps {
  href: string;
  children: React.ReactNode;
  'aria-label': string;
}

export function SocialLink({ href, children, 'aria-label': ariaLabel }: SocialLinkProps) {
  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className="p-2 text-foreground/70 hover:text-primary transition-colors"
      aria-label={ariaLabel}
    >
      {children}
    </a>
  );
}