import { Link } from 'react-router-dom';
import { LucideIcon } from 'lucide-react';

interface NavItemProps {
  href: string;
  label: string;
  icon?: LucideIcon;
  isActive: boolean;
  onClick?: () => void;
}

export function NavItem({ href, label, icon: Icon, isActive, onClick }: NavItemProps) {
  const baseStyles = "flex items-center gap-2 px-3 py-2 rounded-lg transition-colors";
  const activeStyles = isActive
    ? "bg-primary text-black"
    : "text-foreground/70 hover:text-foreground hover:bg-card";

  return (
    <Link
      to={href}
      onClick={onClick}
      className={`${baseStyles} ${activeStyles}`}
    >
      {Icon && <Icon className="h-5 w-5" />}
      <span className="text-sm font-medium">{label}</span>
    </Link>
  );
}