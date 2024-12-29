import { Container } from '../../ui/Container';
import { Logo } from './Logo';
import { Navigation } from './Navigation';
import { Actions } from './Actions';
import { MobileMenu } from './MobileMenu';

export function Header() {
  return (
    <header className="fixed w-full h-16 bg-black/80 backdrop-blur-lg border-b border-white/10 z-50">
      <Container>
        <div className="flex items-center justify-between h-full">
          <Logo />
          <Navigation />
          <div className="flex items-center gap-4">
            <Actions />
            <MobileMenu />
          </div>
        </div>
      </Container>
    </header>
  );
}