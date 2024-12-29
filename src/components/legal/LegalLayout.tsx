import { Container } from '../ui/Container';
import { ReactNode } from 'react';

interface LegalLayoutProps {
  title: string;
  children: ReactNode;
}

export function LegalLayout({ title, children }: LegalLayoutProps) {
  return (
    <main className="bg-black min-h-screen pt-24">
      <Container>
        <div className="max-w-4xl mx-auto">
          <h1 className="text-3xl font-bold text-white mb-8">{title}</h1>
          <div className="bg-white/5 border border-white/10 rounded-lg p-8">
            {children}
          </div>
        </div>
      </Container>
    </main>
  );
}