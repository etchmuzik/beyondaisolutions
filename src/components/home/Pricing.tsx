import { Check } from 'lucide-react';
import { Container } from '../ui/Container';
import { PricingCard } from './PricingCard';

const plans = [
  {
    name: 'Starter',
    price: 4999,
    features: [
      'AI-powered cold calls',
      'Basic analytics',
      'Email automation',
      '5 team members',
      '24/7 support'
    ]
  },
  {
    name: 'Professional',
    price: 12999,
    popular: true,
    features: [
      'Everything in Starter',
      'Advanced analytics',
      'Custom AI training',
      'Unlimited team members',
      'Priority support',
      'API access'
    ]
  },
  {
    name: 'Enterprise',
    price: null,
    features: [
      'Everything in Professional',
      'Custom solutions',
      'Dedicated account manager',
      'Custom integrations',
      'SLA guarantee',
      'On-premise deployment'
    ]
  }
];

export function Pricing() {
  return (
    <section className="py-24 border-t border-white/10">
      <Container>
        <div className="text-center mb-16">
          <h2 className="text-3xl font-bold text-white mb-4">
            Simple, Transparent Pricing
          </h2>
          <p className="text-gray-400 max-w-2xl mx-auto">
            Choose the perfect plan for your team. All plans include a 14-day free trial.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto">
          {plans.map((plan) => (
            <PricingCard key={plan.name} {...plan} />
          ))}
        </div>
      </Container>
    </section>
  );
}