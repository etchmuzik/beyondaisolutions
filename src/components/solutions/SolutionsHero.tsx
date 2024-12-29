import { Container } from '../ui/Container';
import { Button } from '../ui/Button';
import { ArrowRight } from 'lucide-react';

export function SolutionsHero() {
  return (
    <div className="relative pt-32 pb-20">
      <Container>
        <div className="max-w-3xl">
          <h1 className="text-5xl font-bold tracking-tight text-white mb-6">
            AI-Powered Solutions for{' '}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-secondary">
              Modern Sales Teams
            </span>
          </h1>
          <p className="text-xl text-gray-300 mb-10">
            Transform your sales process with intelligent automation and data-driven insights
          </p>
          <div className="flex gap-4">
            <Button to="/demo" className="group">
              Schedule Demo
              <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
            </Button>
            <Button variant="outline" to="/contact">
              Contact Sales
            </Button>
          </div>
        </div>
      </Container>
    </div>
  );
}