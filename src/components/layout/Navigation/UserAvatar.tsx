import { useState } from 'react';
import { Link } from 'react-router-dom';
import { LogOut, Settings, User } from 'lucide-react';
import { useAuth } from '../../../contexts/AuthContext';
import type { User as AuthUser } from '@supabase/supabase-js';

interface UserAvatarProps {
  user: AuthUser;
  className?: string;
}

export function UserAvatar({ user, className = '' }: UserAvatarProps) {
  const [showMenu, setShowMenu] = useState(false);
  const { signOut } = useAuth();

  return (
    <div className={`relative ${className}`}>
      <button
        onClick={() => setShowMenu(!showMenu)}
        className="flex items-center space-x-2 p-2 rounded-lg hover:bg-card transition-colors"
      >
        <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center">
          <span className="text-sm font-medium text-primary">
            {user.email?.[0].toUpperCase()}
          </span>
        </div>
      </button>

      {showMenu && (
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
            onClick={signOut}
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