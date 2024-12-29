import { ArrowRight } from 'lucide-react';
import { Container } from '../ui/Container';
import { Button } from '../ui/Button';

export function Hero() {
  return (
    <div className="relative min-h-screen flex items-center pt-16">
      <div className="absolute inset-0">
        <img
          src="https://images.unsplash.com/photo-1451187580459-43490279c0fa?auto=format&fit=crop&q=80"
          alt="Technology Background"
          className="w-full h-full object-cover brightness-[0.2] grayscale"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-black via-black/95 to-black/90" />
      </div>
      
      <Container className="relative">
        <div className="max-w-3xl">
          <h1 className="text-5xl sm:text-6xl font-bold tracking-tight text-white">
            Transform Your Business with{' '}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#7CFBEE] to-[#44A094]">
              AI Automation
            </span>
          </h1>
          
          <p className="mt-6 text-xl text-gray-300">
            Elevate your operations with cutting-edge AI solutions, designed for the modern enterprise.
          </p>

          <div className="mt-10 flex flex-col sm:flex-row gap-4">
            <Button to="/signup" variant="primary" className="group">
              Start Free Trial
              <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
            </Button>
            <Button variant="outline" to="/demo">
              Book a Demo
            </Button>
          </div>
        </div>
      </Container>
    </div>
  );
}