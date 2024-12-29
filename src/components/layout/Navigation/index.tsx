import { useState } from 'react';
import { Container } from '../../ui/Container';
import { Logo } from '../Logo';
import { DesktopNav } from './components/DesktopNav';
import { MobileNav } from './components/MobileNav';
import { SearchOverlay } from './components/SearchOverlay';
import { SearchButton } from './components/SearchButton';
import { MobileMenuButton } from './components/MobileMenuButton';
import { useSearch } from './hooks/useSearch';

export function Navigation() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const search = useSearch();

  return (
    <nav className="fixed w-full bg-background/80 backdrop-blur-lg border-b border-border z-50">
      <Container>
        <div className="flex h-16 items-center justify-between">
          <Logo />

          <div className="flex items-center gap-4">
            <SearchButton onClick={() => setIsSearchOpen(true)} />
            <DesktopNav />
            <MobileMenuButton onClick={() => setIsMobileMenuOpen(true)} />
          </div>
        </div>
      </Container>

      <MobileNav
        isOpen={isMobileMenuOpen}
        onClose={() => setIsMobileMenuOpen(false)}
      />

      <SearchOverlay
        isOpen={isSearchOpen}
        onClose={() => setIsSearchOpen(false)}
        {...search}
      />
    </nav>
  );
}