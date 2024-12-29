import { NavLink } from './components/NavLink';
import { NAVIGATION_ITEMS } from './constants';

export function Navigation() {
  return (
    <nav className="hidden md:flex items-center gap-8">
      {NAVIGATION_ITEMS.map((item) => (
        <NavLink key={item.name} to={item.href}>
          {item.name}
        </NavLink>
      ))}
    </nav>
  );
}