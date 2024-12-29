import { Link } from 'react-router-dom';
import { Container } from '../components/ui/Container';
import { Button } from '../components/ui/Button';
import { Header } from '../components/layout/Header';
import { Footer } from '../components/layout/Footer';

export function NotFound() {
  return (
    <main className="min-h-screen bg-background">
      <Header />
      <Container>
        <div className="min-h-[60vh] flex flex-col items-center justify-center text-center">
          <h1 className="text-6xl font-bold text-foreground mb-4">404</h1>
          <h2 className="text-2xl font-semibold text-foreground mb-4">Page Not Found</h2>
          <p className="text-foreground/70 mb-8 max-w-md">
            The page you're looking for doesn't exist or has been moved.
          </p>
          <Button variant="primary" to="/">
            Return Home
          </Button>
        </div>
      </Container>
      <Footer />
    </main>
  );
}