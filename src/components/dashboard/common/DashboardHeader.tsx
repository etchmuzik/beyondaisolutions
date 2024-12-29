import { useAuth } from '../../../contexts/AuthContext';
import { Button } from '../../ui/Button';
import { Plus } from 'lucide-react';

interface DashboardHeaderProps {
  title: string;
  showNewButton?: boolean;
  onNewClick?: () => void;
}

export function DashboardHeader({ title, showNewButton = true, onNewClick }: DashboardHeaderProps) {
  const { user } = useAuth();

  return (
    <div className="flex items-center justify-between">
      <div>
        <h1 className="text-2xl font-bold text-foreground">{title}</h1>
        <p className="text-foreground/70">Welcome back, {user?.email}</p>
      </div>
      {showNewButton && (
        <Button onClick={onNewClick} variant="primary">
          <Plus className="h-4 w-4 mr-2" />
          New Call
        </Button>
      )}
    </div>
  );
}