import { Globe } from 'lucide-react';
import { Button } from '../../ui/Button';
import { ThemeToggle } from '../../ui/ThemeToggle';
import { useAuth } from '../../../contexts/AuthContext';
import { Link } from 'react-router-dom';

export function UserSection() {
  const { user } = useAuth();

  return (
    <div className="flex items-center space-x-4">
      <button className="p-2 text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-100">
        <Globe className="h-5 w-5" />
      </button>
      <ThemeToggle />
      {user ? (
        <Link
          to="/dashboard"
          className="flex items-center justify-center w-8 h-8 rounded-full bg-primary text-primary-foreground font-medium"
        >
          {user.email[0].toUpperCase()}
        </Link>
      ) : (
        <div className="flex items-center space-x-3">
          <Button variant="outline" to="/login" className="text-sm">
            Sign In
          </Button>
          <Button variant="primary" to="/signup" className="text-sm">
            Get Started
          </Button>
        </div>
      )}
    </div>
  );
}