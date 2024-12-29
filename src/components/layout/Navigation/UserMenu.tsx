import { useAuth } from '../../../contexts/AuthContext';
import { Button } from '../../ui/Button';
import { UserAvatar } from './UserAvatar';

interface UserMenuProps {
  className?: string;
}

export function UserMenu({ className = '' }: UserMenuProps) {
  const { user } = useAuth();

  if (!user) {
    return (
      <div className={`flex items-center gap-4 ${className}`}>
        <Button variant="outline" to="/login">
          Sign In
        </Button>
        <Button variant="primary" to="/register">
          Get Started
        </Button>
      </div>
    );
  }

  return <UserAvatar user={user} className={className} />;
}