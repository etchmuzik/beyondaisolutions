import { Check } from 'lucide-react';
import { usePricingContext } from './PricingContext';
import { Button } from '../ui/Button';

const tiers = [
  {
    name: 'Starter',
    description: 'Perfect for small businesses',
    monthlyPrice: 4999,
    features: [
      'Up to 10,000 minutes/month',
      'Basic analytics',
      'Email support',
      'Standard API access',
      'Up to 15 team members',
      'Core integrations',
      'Basic security features'
    ]
  },
  {
    name: 'Professional',
    description: 'Ideal for growing teams',
    monthlyPrice: 12999,
    popular: true,
    features: [
      'Up to 50,000 minutes/month',
      'Advanced analytics',
      'Priority support',
      'Full API access',
      'Up to 100 team members',
      'Premium integrations',
      'Dedicated account manager',
      'Custom workflows',
      'Advanced security'
    ]
  },
  {
    name: 'Enterprise',
    description: 'For large organizations',
    features: [
      'Unlimited minutes',
      'Custom AI models',
      '24/7 dedicated support',
      'Enterprise security',
      'Unlimited team members',
      'Custom development',
      'On-premise deployment',
      'SLA guarantees',
      'Compliance packages',
      'Custom integrations',
      'Advanced API features',
      'Priority feature access'
    ]
  }
];

export function PricingTiers() {
  const { isYearly } = usePricingContext();

  const getPrice = (monthlyPrice?: number) => {
    if (!monthlyPrice) return 'Contact Sales';
    const price = isYearly ? monthlyPrice * 0.8 : monthlyPrice;
    return `AED ${price.toLocaleString()}`;
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-7xl mx-auto">
      {tiers.map((tier) => (
        <div
          key={tier.name}
          className={`relative p-8 rounded-lg border ${
            tier.popular
              ? 'border-primary bg-card'
              : 'border-border bg-background'
          }`}
        >
          {tier.popular && (
            <div className="absolute -top-4 left-1/2 -translate-x-1/2">
              <span className="bg-primary text-primary-foreground text-sm font-medium px-3 py-1 rounded-full">
                Most Popular
              </span>
            </div>
          )}

          <div className="mb-8">
            <h3 className="text-xl font-semibold text-foreground mb-2">{tier.name}</h3>
            <p className="text-foreground/70 text-sm">{tier.description}</p>
          </div>

          <div className="mb-8">
            <div className="flex items-baseline">
              <span className="text-4xl font-bold text-foreground">{getPrice(tier.monthlyPrice)}</span>
              {tier.monthlyPrice && (
                <span className="text-foreground/70 ml-2">/{isYearly ? 'year' : 'month'}</span>
              )}
            </div>
          </div>

          <ul className="space-y-4 mb-8">
            {tier.features.map((feature) => (
              <li key={feature} className="flex items-start">
                <Check className="h-5 w-5 text-primary shrink-0 mr-3" />
                <span className="text-foreground/70">{feature}</span>
              </li>
            ))}
          </ul>

          <Button
            variant={tier.popular ? 'primary' : 'outline'}
            className="w-full"
            to={tier.monthlyPrice ? '/signup' : '/contact'}
          >
            {tier.monthlyPrice ? 'Get Started' : 'Contact Sales'}
          </Button>
        </div>
      ))}
    </div>
  );
}