import { Check } from 'lucide-react';
import { Button } from '../ui/Button';

interface PricingCardProps {
  name: string;
  price: number | null;
  features: string[];
  popular?: boolean;
}

export function PricingCard({ name, price, features, popular }: PricingCardProps) {
  return (
    <div className={`
      rounded-lg border ${popular ? 'border-cyan-500' : 'border-white/10'}
      p-8 relative
      ${popular ? 'bg-black/40' : 'bg-transparent'}
    `}>
      {popular && (
        <div className="absolute -top-4 left-1/2 -translate-x-1/2">
          <span className="bg-cyan-500 text-black text-sm font-medium px-3 py-1 rounded-full">
            Most Popular
          </span>
        </div>
      )}

      <h3 className="text-xl font-semibold text-white mb-4">{name}</h3>
      
      <div className="mb-6">
        {price ? (
          <div className="flex items-baseline">
            <span className="text-4xl font-bold text-white">AED {price}</span>
            <span className="text-gray-400 ml-2">/month</span>
          </div>
        ) : (
          <div className="text-2xl font-bold text-white">Custom Pricing</div>
        )}
      </div>

      <ul className="space-y-4 mb-8">
        {features.map((feature) => (
          <li key={feature} className="flex items-start">
            <Check className="h-5 w-5 text-cyan-400 mr-2 mt-0.5 shrink-0" />
            <span className="text-gray-300">{feature}</span>
          </li>
        ))}
      </ul>

      <Button 
        variant={popular ? 'primary' : 'outline'}
        to="/signup"
        className="w-full"
      >
        {price ? 'Start Free Trial' : 'Contact Sales'}
      </Button>
    </div>
  );
}