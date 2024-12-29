import { useState } from 'react';
import { Search, Plus } from 'lucide-react';
import { UserList } from './UserList';
import { Button } from '../../ui/Button';
import { useUsers } from '../../../hooks/useUsers';

export function UserManagement() {
  const [search, setSearch] = useState('');
  const { users, loading } = useUsers();

  const filteredUsers = users.filter(user => 
    user.email.toLowerCase().includes(search.toLowerCase()) ||
    user.name.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="bg-card border border-border rounded-lg p-6">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-lg font-semibold text-foreground">User Management</h2>
        <Button variant="primary" className="flex items-center gap-2">
          <Plus className="h-4 w-4" />
          Add User
        </Button>
      </div>

      <div className="relative mb-4">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-foreground/40" />
        <input
          type="text"
          placeholder="Search users..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="w-full pl-10 pr-4 py-2 bg-background border border-border rounded-lg text-foreground"
        />
      </div>

      <UserList users={filteredUsers} loading={loading} />
    </div>
  );
}