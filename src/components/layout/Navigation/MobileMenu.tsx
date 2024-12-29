import { NavLinks } from './NavLinks';
import { Button } from '../../ui/Button';
import { useAuth } from '../../../contexts/AuthContext';

interface MobileMenuProps {
  isOpen: boolean;
  onClose: () => void;
}

export function MobileMenu({ isOpen, onClose }: MobileMenuProps) {
  const { user } = useAuth();

  if (!isOpen) return null;

  return (
    <div className="md:hidden border-t border-border bg-background">
      <div className="p-4 space-y-4">
        <NavLinks className="flex flex-col space-y-4 space-x-0" onClick={onClose} />
        
        {!user && (
          <div className="pt-4 space-y-2 border-t border-border">
            <Button variant="outline" to="/login" className="w-full" onClick={onClose}>
              Sign In
            </Button>
            <Button variant="primary" to="/register" className="w-full" onClick={onClose}>
              Get Started
            </Button>
          </div>
        )}
      </div>
    </div>
  );
}