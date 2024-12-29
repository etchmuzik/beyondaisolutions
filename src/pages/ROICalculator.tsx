import { Container } from '../components/ui/Container';
import { Calculator } from '../components/calculator/Calculator';

export function ROICalculator() {
  return (
    <main className="bg-black min-h-screen py-24">
      <Container>
        <div className="max-w-4xl mx-auto">
          <h1 className="text-3xl font-bold text-white mb-4">ROI Calculator</h1>
          <p className="text-gray-400 mb-8">
            See how much you could save with AI automation
          </p>
          <Calculator />
        </div>
      </Container>
    </main>
  );
}