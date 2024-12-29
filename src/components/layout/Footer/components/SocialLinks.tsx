import { Facebook, Twitter, Instagram, Linkedin, Youtube } from 'lucide-react';
import { SocialLink } from './SocialLink';

const SOCIAL_LINKS = [
  { name: 'Facebook', href: 'https://facebook.com', icon: Facebook },
  { name: 'Twitter', href: 'https://twitter.com', icon: Twitter },
  { name: 'Instagram', href: 'https://instagram.com', icon: Instagram },
  { name: 'LinkedIn', href: 'https://linkedin.com', icon: Linkedin },
  { name: 'YouTube', href: 'https://youtube.com', icon: Youtube }
] as const;

export function SocialLinks() {
  return (
    <div className="flex space-x-4">
      {SOCIAL_LINKS.map(({ name, href, icon: Icon }) => (
        <SocialLink key={name} href={href} aria-label={name}>
          <Icon className="h-5 w-5" />
        </SocialLink>
      ))}
    </div>
  );
}