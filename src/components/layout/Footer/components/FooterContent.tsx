import { ContactInfo } from './ContactInfo';
import { FooterNav } from './FooterNav';
import { Newsletter } from './Newsletter';

export function FooterContent() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
      <ContactInfo />
      <FooterNav />
      <Newsletter />
    </div>
  );
}