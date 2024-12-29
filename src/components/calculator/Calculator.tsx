import { Calculator as CalculatorIcon } from 'lucide-react';
import { Slider } from './Slider';
import { Results } from './Results';
import { useCalculator } from './hooks/useCalculator';
import { SLIDER_CONFIGS } from './types';

export function Calculator() {
  const { values, updateValue, savings } = useCalculator();

  return (
    <div className="bg-card rounded-lg p-8 border border-border">
      <div className="flex items-center gap-3 mb-8">
        <CalculatorIcon className="h-6 w-6 text-primary" />
        <h2 className="text-xl font-semibold text-foreground">ROI Calculator</h2>
      </div>

      <div className="space-y-8">
        {Object.entries(SLIDER_CONFIGS).map(([key, config]) => (
          <Slider
            key={key}
            {...config}
            value={values[key as keyof typeof values]}
            onChange={(value) => updateValue(key as keyof typeof values, value)}
          />
        ))}
      </div>

      <Results savings={savings} />
    </div>
  );
}