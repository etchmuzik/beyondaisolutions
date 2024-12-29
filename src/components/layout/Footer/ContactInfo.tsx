import { Mail, Phone, MapPin } from 'lucide-react';

export function ContactInfo() {
  return (
    <div className="space-y-4">
      <h3 className="text-lg font-semibold text-foreground">Contact Us</h3>
      <ul className="space-y-3">
        <li className="flex items-center space-x-3 text-foreground/70">
          <MapPin className="h-5 w-5 text-primary" />
          <span>Dubai Internet City, Dubai, UAE</span>
        </li>
        <li className="flex items-center space-x-3 text-foreground/70">
          <Phone className="h-5 w-5 text-primary" />
          <span>+971 58 123 4567</span>
        </li>
        <li className="flex items-center space-x-3 text-foreground/70">
          <Mail className="h-5 w-5 text-primary" />
          <span>contact@beyondai.com</span>
        </li>
      </ul>
    </div>
  );
}