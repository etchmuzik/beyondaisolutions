import { Container } from '../../ui/Container';
import { FooterContent } from './components/FooterContent';
import { FooterDivider } from './components/FooterDivider';
import { Copyright } from './components/Copyright';
import { SocialLinks } from './components/SocialLinks';

export function Footer() {
  return (
    <footer className="bg-card mt-auto">
      <Container>
        <div className="py-12">
          <FooterContent />
        </div>
        <FooterDivider>
          <Copyright />
          <SocialLinks />
        </FooterDivider>
      </Container>
    </footer>
  );
}