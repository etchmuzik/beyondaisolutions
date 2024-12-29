import { Link, useLocation } from 'react-router-dom';
import { routes } from '../../routes/config';

export function MainNav() {
  const location = useLocation();
  const mainRoutes = routes.filter(route => !route.protected);

  return (
    <nav className="hidden md:flex items-center space-x-8">
      {mainRoutes.map((route) => (
        <Link
          key={route.path}
          to={route.path}
          className={`text-sm font-medium transition-colors ${
            location.pathname === route.path
              ? 'text-primary'
              : 'text-foreground/70 hover:text-foreground'
          }`}
        >
          {route.label}
        </Link>
      ))}
    </nav>
  );
}