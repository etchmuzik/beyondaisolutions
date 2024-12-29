import { Container } from '../ui/Container';
import { Button } from '../ui/Button';
import { ArrowRight } from 'lucide-react';

export function CTA() {
  return (
    <section className="py-20 border-t border-white/10">
      <Container>
        <div className="max-w-3xl mx-auto text-center">
          <h2 className="text-4xl font-bold text-white mb-6">
            Ready to Transform Your Sales Process?
          </h2>
          <p className="text-xl text-gray-300 mb-10">
            Join leading companies using Beyond AI to accelerate their sales
          </p>
          <div className="flex justify-center gap-4">
            <Button to="/trial" className="group">
              Start Free Trial
              <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
            </Button>
            <Button variant="outline" to="/demo">
              Schedule Demo
            </Button>
          </div>
        </div>
      </Container>
    </section>
  );
}