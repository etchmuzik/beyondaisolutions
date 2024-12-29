import { FooterSection } from './FooterSection';
import { FooterLink } from './FooterLink';

const navigation = {
  company: [
    { name: 'About', href: '/about' },
    { name: 'Careers', href: '/careers' },
    { name: 'Blog', href: '/blog' },
  ],
  solutions: [
    { name: 'Features', href: '/features' },
    { name: 'Pricing', href: '/pricing' },
    { name: 'ROI Calculator', href: '/roi-calculator' },
  ]
};

export function FooterNav() {
  return (
    <>
      <FooterSection title="Company">
        <ul className="space-y-2">
          {navigation.company.map((item) => (
            <li key={item.name}>
              <FooterLink href={item.href}>{item.name}</FooterLink>
            </li>
          ))}
        </ul>
      </FooterSection>

      <FooterSection title="Solutions">
        <ul className="space-y-2">
          {navigation.solutions.map((item) => (
            <li key={item.name}>
              <FooterLink href={item.href}>{item.name}</FooterLink>
            </li>
          ))}
        </ul>
      </FooterSection>
    </>
  );
}