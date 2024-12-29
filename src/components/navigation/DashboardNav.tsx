import { Link, useLocation } from 'react-router-dom';
import { routes } from '../../routes/config';

export function DashboardNav() {
  const location = useLocation();
  const dashboardRoutes = routes.find(r => r.path === '/dashboard')?.children || [];

  return (
    <nav className="space-y-1">
      {dashboardRoutes.map((route) => (
        <Link
          key={route.path}
          to={route.path}
          className={`flex items-center px-3 py-2 rounded-lg transition-colors ${
            location.pathname === route.path
              ? 'bg-primary text-black'
              : 'text-foreground/70 hover:text-foreground hover:bg-card'
          }`}
        >
          {route.label}
        </Link>
      ))}
    </nav>
  );
}