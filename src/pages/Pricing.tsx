import { PageLayout } from '../components/layout/PageLayout';
import { PricingToggle } from '../components/pricing/PricingToggle';
import { PricingTiers } from '../components/pricing/PricingTiers';
import { ROICalculatorSection } from '../components/pricing/ROICalculatorSection';

export function Pricing() {
  return (
    <PageLayout>
      <div className="text-center mb-16">
        <h1 className="text-4xl font-bold text-foreground mb-4">Simple Pricing</h1>
        <p className="text-xl text-foreground/70">Choose the plan that fits your needs</p>
      </div>
      <PricingToggle />
      <PricingTiers />
      <ROICalculatorSection />
    </PageLayout>
  );
}