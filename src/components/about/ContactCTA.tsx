import { Button } from '../ui/Button';

export function ContactCTA() {
  return (
    <section className="bg-card border border-border rounded-lg p-12 text-center">
      <h2 className="text-2xl font-bold text-foreground mb-4">
        Ready to Transform Your Business?
      </h2>
      <p className="text-foreground/70 mb-8 max-w-2xl mx-auto">
        Get in touch with our team to learn how Beyond AI can help your business achieve new heights with AI-powered automation.
      </p>
      <div className="flex flex-col sm:flex-row justify-center gap-4">
        <Button variant="primary" to="/contact">
          Contact Us
        </Button>
        <Button variant="outline" to="/demo">
          Book a Demo
        </Button>
      </div>
    </section>
  );
}