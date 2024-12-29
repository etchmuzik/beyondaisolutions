import { PageLayout } from '../components/layout/PageLayout';
import { FeatureGrid } from '../components/solutions/FeatureGrid';
import { UseCases } from '../components/solutions/UseCases';
import { Integration } from '../components/solutions/Integration';
import { CTA } from '../components/solutions/CTA';

export function Solutions() {
  return (
    <PageLayout>
      <div className="max-w-3xl mx-auto text-center mb-16">
        <h1 className="text-4xl font-bold text-foreground mb-4">
          AI-Powered Solutions for Modern Business
        </h1>
        <p className="text-xl text-foreground/70">
          Transform your operations with intelligent automation and data-driven insights
        </p>
      </div>
      <FeatureGrid />
      <UseCases />
      <Integration />
      <CTA />
    </PageLayout>
  );
}