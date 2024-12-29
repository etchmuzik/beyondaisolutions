import { Container } from '../components/ui/Container';
import { Header } from '../components/layout/Header';
import { Footer } from '../components/layout/Footer';
import { SignUpForm } from '../components/auth/SignUpForm';

export function Trial() {
  return (
    <main className="min-h-screen bg-background">
      <Header />
      <div className="pt-24">
        <Container>
          <div className="max-w-4xl mx-auto text-center mb-16">
            <h1 className="text-4xl font-bold text-foreground mb-4">
              Start Your Free Trial
            </h1>
            <p className="text-xl text-foreground/70">
              Experience the power of AI automation with a 14-day free trial
            </p>
          </div>
          <div className="max-w-md mx-auto">
            <SignUpForm trial={true} />
          </div>
        </Container>
      </div>
      <Footer />
    </main>
  );
}