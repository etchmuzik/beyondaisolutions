import { NavMenu } from './NavMenu';
import { Button } from '../../../ui/Button';
import { useAuth } from '../../../../contexts/AuthContext';
import { CALL_TO_ACTION_BUTTONS } from '../constants';

interface MobileNavProps {
  isOpen: boolean;
  onClose: () => void;
}

export function MobileNav({ isOpen, onClose }: MobileNavProps) {
  const { user } = useAuth();
  const { primary: getStartedButton } = CALL_TO_ACTION_BUTTONS;

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 bg-background/80 backdrop-blur-sm md:hidden">
      <div className="fixed inset-y-0 right-0 w-full max-w-sm bg-background border-l border-border p-6">
        <div className="flex flex-col h-full">
          <div className="flex-1 space-y-2">
            <NavMenu onItemClick={onClose} />
          </div>

          {!user && (
            <div className="pt-6 space-y-2 border-t border-border">
              <Button variant="outline" to="/login" className="w-full" onClick={onClose}>
                Sign In
              </Button>
              <Button 
                variant="primary" 
                to={getStartedButton.href}
                className="w-full" 
                onClick={onClose}
              >
                {getStartedButton.label}
              </Button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}