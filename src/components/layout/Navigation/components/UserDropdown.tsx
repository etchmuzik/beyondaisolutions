import { useState } from 'react';
import { Link } from 'react-router-dom';
import { User, Settings, LogOut } from 'lucide-react';
import { useAuth } from '../../../../contexts/AuthContext';
import { useProfile } from '../../../../hooks/useProfile';

export function UserDropdown() {
  const [isOpen, setIsOpen] = useState(false);
  const { signOut } = useAuth();
  const { profile } = useProfile();

  const handleSignOut = async () => {
    try {
      await signOut();
    } catch (error) {
      console.error('Failed to sign out:', error);
    }
  };

  return (
    <div className="relative">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center gap-2 p-2 rounded-lg hover:bg-card transition-colors"
      >
        <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center">
          <span className="text-sm font-medium text-primary">
            {profile?.username?.[0].toUpperCase() ?? 'U'}
          </span>
        </div>
      </button>

      {isOpen && (
        <div className="absolute right-0 mt-2 w-48 bg-card border border-border rounded-lg shadow-lg py-1">
          <Link
            to="/dashboard"
            className="flex items-center px-4 py-2 text-sm text-foreground/70 hover:text-foreground hover:bg-background"
          >
            <User className="h-4 w-4 mr-2" />
            Dashboard
          </Link>
          <Link
            to="/settings"
            className="flex items-center px-4 py-2 text-sm text-foreground/70 hover:text-foreground hover:bg-background"
          >
            <Settings className="h-4 w-4 mr-2" />
            Settings
          </Link>
          <button
            onClick={handleSignOut}
            className="w-full flex items-center px-4 py-2 text-sm text-foreground/70 hover:text-foreground hover:bg-background"
          >
            <LogOut className="h-4 w-4 mr-2" />
            Sign Out
          </button>
        </div>
      )}
    </div>
  );
}