import { useAuth } from '../../contexts/AuthContext';
import { Button } from '../ui/Button';
import { Plus } from 'lucide-react';

export function DashboardHeader() {
  const { user } = useAuth();
  
  return (
    <div className="flex items-center justify-between mb-8">
      <div>
        <h1 className="text-2xl font-bold text-white">
          Welcome back, {user?.email?.split('@')[0]}
        </h1>
        <p className="text-gray-400">Here's what's happening with your projects</p>
      </div>
      <Button className="group">
        <Plus className="h-4 w-4 mr-2" />
        New Project
      </Button>
    </div>
  );
}