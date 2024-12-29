export interface DashboardStats {
  totalCalls: number;
  activeUsers: number;
  conversionRate: number;
  averageCallDuration: number;
}

export interface UserRole {
  type: 'admin' | 'user';
  permissions: string[];
}

export interface DashboardUser {
  id: string;
  name: string;
  email: string;
  role: UserRole;
  lastActive: string;
  status: 'active' | 'inactive';
}