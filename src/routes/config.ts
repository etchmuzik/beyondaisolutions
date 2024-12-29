import { RouteConfig } from './types';

export const routes: RouteConfig[] = [
  { path: '/', label: 'Home' },
  { path: '/features', label: 'Features' },
  { path: '/solutions', label: 'Solutions' },
  { path: '/pricing', label: 'Pricing' },
  { path: '/contact', label: 'Contact' },
  { path: '/demo', label: 'Demo' },
  { path: '/trial', label: 'Trial' },
  {
    path: '/dashboard',
    label: 'Dashboard',
    protected: true,
    children: [
      { path: '/dashboard/analytics', label: 'Analytics' },
      { path: '/dashboard/calls', label: 'Calls' },
      { path: '/dashboard/schedule', label: 'Schedule' },
      { path: '/dashboard/settings', label: 'Settings' }
    ]
  }
];

export const authRoutes: RouteConfig[] = [
  { path: '/login', label: 'Login' },
  { path: '/register', label: 'Register' },
  { path: '/reset-password', label: 'Reset Password' },
  { path: '/verify-email', label: 'Verify Email' }
];