import { Calculator } from 'lucide-react';
import { Container } from '../ui/Container';
import { useState } from 'react';
import { Slider } from '../calculator/Slider';
import { SLIDER_CONFIGS } from '../calculator/types';
import { useCalculator } from '../calculator/hooks/useCalculator';
import { Button } from '../ui/Button';

export function ROICalculatorSection() {
  const { values, updateValue, savings } = useCalculator();

  return (
    <section className="py-20 border-t border-border">
      <Container>
        <div className="max-w-4xl mx-auto">
          <div className="bg-card rounded-lg p-8 border border-border">
            <div className="flex items-center gap-3 mb-6">
              <Calculator className="h-6 w-6 text-primary" />
              <h2 className="text-2xl font-semibold text-foreground">ROI Calculator</h2>
            </div>
            
            <p className="text-foreground/70 mb-8">
              See how much you could save with AI automation
            </p>

            <div className="space-y-8 mb-8">
              {Object.entries(SLIDER_CONFIGS).map(([key, config]) => (
                <Slider
                  key={key}
                  {...config}
                  value={values[key as keyof typeof values]}
                  onChange={(value) => updateValue(key as keyof typeof values, value)}
                />
              ))}
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
              <div className="bg-primary/10 p-6 rounded-lg border border-primary/20">
                <div className="text-primary mb-2">Monthly Savings</div>
                <div className="text-2xl font-bold text-foreground">
                  AED {savings.monthly.toLocaleString()}
                </div>
              </div>
              <div className="bg-primary/10 p-6 rounded-lg border border-primary/20">
                <div className="text-primary mb-2">Yearly Savings</div>
                <div className="text-2xl font-bold text-foreground">
                  AED {savings.yearly.toLocaleString()}
                </div>
              </div>
              <div className="bg-primary/10 p-6 rounded-lg border border-primary/20">
                <div className="text-primary mb-2">Employee Cost Savings</div>
                <div className="text-2xl font-bold text-foreground">
                  AED {savings.employee.toLocaleString()}
                </div>
              </div>
            </div>

            <div className="text-center">
              <Button to="/roi-calculator" variant="primary">
                Calculate Your Savings
              </Button>
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
}