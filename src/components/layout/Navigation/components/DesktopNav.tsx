import { NavMenu } from './NavMenu';
import { ThemeToggle } from './ThemeToggle';
import { UserDropdown } from './UserDropdown';
import { Button } from '../../../ui/Button';
import { useAuth } from '../../../../contexts/AuthContext';
import { CALL_TO_ACTION_BUTTONS } from '../constants';

export function DesktopNav() {
  const { user } = useAuth();
  const { primary: getStartedButton } = CALL_TO_ACTION_BUTTONS;

  return (
    <div className="hidden md:flex items-center gap-6">
      <NavMenu className="flex space-x-1 space-y-0" />
      <ThemeToggle />
      
      {user ? (
        <UserDropdown />
      ) : (
        <div className="flex items-center gap-4">
          <Button variant="outline" to="/login">
            Sign In
          </Button>
          <Button 
            variant="primary" 
            to="/register"
            className="group"
          >
            {getStartedButton.label}
          </Button>
        </div>
      )}
    </div>
  );
}