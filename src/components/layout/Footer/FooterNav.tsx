import { Link } from 'react-router-dom';

interface NavSection {
  title: string;
  links: {
    label: string;
    href: string;
  }[];
}

const navigation: NavSection[] = [
  {
    title: 'Product',
    links: [
      { label: 'Features', href: '/features' },
      { label: 'Solutions', href: '/solutions' },
      { label: 'Pricing', href: '/pricing' },
      { label: 'Case Studies', href: '/case-studies' }
    ]
  },
  {
    title: 'Company',
    links: [
      { label: 'About', href: '/about' },
      { label: 'Blog', href: '/blog' },
      { label: 'Careers', href: '/careers' },
      { label: 'Contact', href: '/contact' }
    ]
  },
  {
    title: 'Resources',
    links: [
      { label: 'Documentation', href: '/docs' },
      { label: 'Help Center', href: '/help' },
      { label: 'API Status', href: '/status' },
      { label: 'Privacy Policy', href: '/privacy' }
    ]
  }
];

export function FooterNav() {
  return (
    <nav className="grid grid-cols-2 md:grid-cols-3 gap-8">
      {navigation.map((section) => (
        <div key={section.title}>
          <h3 className="text-lg font-semibold text-foreground mb-4">
            {section.title}
          </h3>
          <ul className="space-y-3">
            {section.links.map((link) => (
              <li key={link.label}>
                <Link
                  to={link.href}
                  className="text-foreground/70 hover:text-primary transition-colors"
                >
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>
      ))}
    </nav>
  );
}