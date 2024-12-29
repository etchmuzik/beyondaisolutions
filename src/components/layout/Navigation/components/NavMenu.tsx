import { NavItem } from './NavItem';
import { useNavigation } from '../hooks/useNavigation';

interface NavMenuProps {
  className?: string;
  onItemClick?: () => void;
}

export function NavMenu({ className = '', onItemClick }: NavMenuProps) {
  const { items, isActive } = useNavigation();

  return (
    <nav className={`space-y-1 ${className}`}>
      {items.map((item) => (
        <NavItem
          key={item.href}
          {...item}
          isActive={isActive(item.href)}
          onClick={onItemClick}
        />
      ))}
    </nav>
  );
}