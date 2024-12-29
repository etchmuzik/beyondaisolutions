import { Bell, Search } from 'lucide-react';
import { Logo } from '../ui/Logo';
import { useAuth } from '../../contexts/AuthContext';

export function TopBar() {
  const { user, signOut } = useAuth();

  return (
    <header className="h-16 border-b border-white/10">
      <div className="flex items-center justify-between h-full px-6">
        <Logo />
        
        <div className="flex items-center space-x-4">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
            <input
              type="text"
              placeholder="Search..."
              className="bg-white/5 border border-white/10 rounded-lg pl-10 pr-4 py-2 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-primary"
            />
          </div>
          
          <button className="relative p-2 text-gray-400 hover:text-white">
            <Bell className="h-5 w-5" />
            <span className="absolute top-1 right-1 w-2 h-2 bg-primary rounded-full" />
          </button>
          
          <button
            onClick={() => signOut()}
            className="flex items-center space-x-2 p-2 rounded-lg hover:bg-white/5"
          >
            <div className="w-8 h-8 rounded-full bg-primary flex items-center justify-center text-black font-medium">
              {user?.email?.[0].toUpperCase()}
            </div>
          </button>
        </div>
      </div>
    </header>
  );
}