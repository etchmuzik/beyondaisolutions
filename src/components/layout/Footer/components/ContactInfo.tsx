import { MapPin, Phone, Mail } from 'lucide-react';
import { FooterSection } from './FooterSection';
import { CONTACT_INFO } from '../../../../constants/contact';

export function ContactInfo() {
  return (
    <FooterSection title="Contact Us">
      <ul className="space-y-3">
        <li className="flex items-center space-x-3 text-foreground/70">
          <MapPin className="h-5 w-5 text-primary" />
          <span>{CONTACT_INFO.address}</span>
        </li>
        <li className="flex items-center space-x-3 text-foreground/70">
          <Phone className="h-5 w-5 text-primary" />
          <span>{CONTACT_INFO.phone}</span>
        </li>
        <li className="flex items-center space-x-3 text-foreground/70">
          <Mail className="h-5 w-5 text-primary" />
          <span>{CONTACT_INFO.email}</span>
        </li>
      </ul>
    </FooterSection>
  );
}