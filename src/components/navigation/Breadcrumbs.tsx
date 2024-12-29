import { Link, useLocation } from 'react-router-dom';
import { ChevronRight } from 'lucide-react';
import { routes } from '../../routes/config';
import type { BreadcrumbItem } from '../../routes/types';

export function Breadcrumbs() {
  const location = useLocation();
  const pathSegments = location.pathname.split('/').filter(Boolean);

  const breadcrumbs: BreadcrumbItem[] = pathSegments.map((segment, index) => {
    const path = `/${pathSegments.slice(0, index + 1).join('/')}`;
    const route = routes.find(r => r.path === path) || 
                 routes.find(r => r.children?.some(c => c.path === path));
    const childRoute = route?.children?.find(c => c.path === path);
    
    return {
      label: childRoute?.label || route?.label || segment,
      path
    };
  });

  if (breadcrumbs.length === 0) return null;

  return (
    <nav className="flex items-center space-x-2 text-sm text-foreground/70">
      <Link to="/" className="hover:text-foreground">Home</Link>
      {breadcrumbs.map((crumb, index) => (
        <div key={crumb.path} className="flex items-center space-x-2">
          <ChevronRight className="h-4 w-4" />
          <Link
            to={crumb.path}
            className={`hover:text-foreground ${
              index === breadcrumbs.length - 1 ? 'text-foreground' : ''
            }`}
          >
            {crumb.label}
          </Link>
        </div>
      ))}
    </nav>
  );
}