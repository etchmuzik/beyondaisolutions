import { Link, useLocation } from 'react-router-dom';

const navigation = [
  { name: 'Solutions', href: '/solutions' },
  { name: 'Pricing', href: '/pricing' },
  { name: 'Contact', href: '/contact' }
];

export function MainNav() {
  const location = useLocation();

  return (
    <nav className="hidden md:flex items-center space-x-8">
      {navigation.map((item) => (
        <Link
          key={item.name}
          to={item.href}
          className={`text-sm font-medium transition-colors ${
            location.pathname === item.href
              ? 'text-primary'
              : 'text-white/70 hover:text-white'
          }`}
        >
          {item.name}
        </Link>
      ))}
    </nav>
  );
}