import { Container } from '../ui/Container';
import { Button } from '../ui/Button';

export function CTA() {
  return (
    <section className="py-24 bg-gradient-to-b from-background to-card">
      <Container>
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-4xl font-bold text-foreground mb-6">
            Ready to Transform Your Sales Process?
          </h2>
          <div className="flex flex-col sm:flex-row justify-center gap-4">
            <Button 
              to="/signup" 
              variant="primary"
              className="group"
              showArrow
            >
              Get Started Now
            </Button>
            <Button 
              to="/demo" 
              variant="outline"
            >
              Book a Free Demo
            </Button>
          </div>
        </div>
      </Container>
    </section>
  );
}