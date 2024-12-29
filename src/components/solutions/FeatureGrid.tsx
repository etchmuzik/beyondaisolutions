import { Container } from '../ui/Container';
import { Bot, Brain, BarChart3, Users } from 'lucide-react';

const features = [
  {
    icon: Bot,
    title: 'AI Automation',
    description: 'Automate repetitive tasks and focus on what matters most - closing deals.',
  },
  {
    icon: Brain,
    title: 'Smart Insights',
    description: 'Get actionable insights from your sales data with advanced analytics.',
  },
  {
    icon: BarChart3,
    title: 'Performance Tracking',
    description: 'Monitor team performance and identify opportunities for improvement.',
  },
  {
    icon: Users,
    title: 'Team Collaboration',
    description: 'Foster seamless collaboration between sales teams and AI systems.',
  },
];

export function FeatureGrid() {
  return (
    <section className="py-20 border-t border-white/10">
      <Container>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {features.map((feature) => (
            <div
              key={feature.title}
              className="p-6 rounded-lg border border-white/10 hover:border-primary/50 transition-colors"
            >
              <feature.icon className="h-8 w-8 text-primary mb-4" />
              <h3 className="text-lg font-semibold text-white mb-2">{feature.title}</h3>
              <p className="text-gray-400">{feature.description}</p>
            </div>
          ))}
        </div>
      </Container>
    </section>
  );
}