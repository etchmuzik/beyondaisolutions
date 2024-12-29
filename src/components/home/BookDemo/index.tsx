import { Container } from '../../ui/Container';
import { CalendlyEmbed } from './CalendlyEmbed';

export function BookDemo() {
  return (
    <section className="py-20 bg-card">
      <Container>
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl font-bold text-card-foreground mb-4">
            Schedule a Meeting
          </h2>
          <p className="text-xl text-card-foreground/70 mb-12">
            Book a free consultation to learn how we can help your business
          </p>
          <div className="bg-background border border-border rounded-lg p-6">
            <CalendlyEmbed 
              url="https://calendly.com/beyondtech-eg/30min"
              className="w-full"
            />
          </div>
        </div>
      </Container>
    </section>
  );
}