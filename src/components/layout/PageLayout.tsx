import { ReactNode } from 'react';
import { Header } from './Header';
import { Footer } from './Footer';
import { Container } from '../ui/Container';
import { BackButton } from '../common/BackButton';
import { VoiceAssistant } from '../common/VoiceAssistant';
import { WhatsAppWidget } from '../common/WhatsAppWidget';
import { useLocation } from 'react-router-dom';
import { CONTACT_INFO } from '../../constants/contact';

interface PageLayoutProps {
  children: ReactNode;
  showBackButton?: boolean;
  className?: string;
}

export function PageLayout({ children, showBackButton = true, className = '' }: PageLayoutProps) {
  const location = useLocation();
  const isHomePage = location.pathname === '/';

  // Format phone number for WhatsApp (remove spaces and +)
  const whatsappNumber = CONTACT_INFO.phone.replace(/[\s+]/g, '');

  return (
    <main className="min-h-screen bg-background">
      <Header />
      <div className="pt-24">
        <Container>
          {showBackButton && !isHomePage && <BackButton className="mb-8" />}
          <div className={className}>{children}</div>
        </Container>
      </div>
      <Footer />
      <VoiceAssistant />
      <WhatsAppWidget phoneNumber={whatsappNumber} />
    </main>
  );
}