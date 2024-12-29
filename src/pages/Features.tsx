import { Container } from '../components/ui/Container';
import { Header } from '../components/layout/Header';
import { Footer } from '../components/layout/Footer';
import { BackButton } from '../components/common/BackButton';
import { KeyFeatures } from '../components/home/KeyFeatures';
import { WorkProcess } from '../components/home/WorkProcess';

export function Features() {
  return (
    <main className="min-h-screen bg-background">
      <Header />
      <div className="pt-24">
        <Container>
          <BackButton className="mb-8" />
          <div className="max-w-3xl mx-auto text-center mb-16">
            <h1 className="text-4xl font-bold text-foreground mb-4">
              Powerful Features for Modern Business
            </h1>
            <p className="text-xl text-foreground/70">
              Discover how our AI-powered solutions can transform your operations
            </p>
          </div>
        </Container>
        <KeyFeatures />
        <WorkProcess />
      </div>
      <Footer />
    </main>
  );
}