import { Container } from '../components/ui/Container';
import { Header } from '../components/layout/Header';
import { Footer } from '../components/layout/Footer';
import { CalendlyEmbed } from '../components/home/BookDemo/CalendlyEmbed';

export function Demo() {
  return (
    <main className="min-h-screen bg-background">
      <Header />
      <div className="pt-24">
        <Container>
          <div className="max-w-4xl mx-auto text-center mb-16">
            <h1 className="text-4xl font-bold text-foreground mb-4">
              Schedule a Demo
            </h1>
            <p className="text-xl text-foreground/70">
              Book a personalized demo to see how our AI solutions can transform your business
            </p>
          </div>
          <div className="bg-card border border-border rounded-lg p-6">
            <CalendlyEmbed 
              url="https://calendly.com/beyondtech-eg/30min"
              className="w-full h-[700px]"
            />
          </div>
        </Container>
      </div>
      <Footer />
    </main>
  );
}