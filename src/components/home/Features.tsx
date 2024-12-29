import { Bot, Brain, BarChart3, Users } from 'lucide-react';
import { Container } from '../ui/Container';
import { FeatureCard } from './FeatureCard';

const features = [
  {
    icon: Bot,
    title: 'AI Automation',
    description: 'Automate repetitive tasks and focus on closing deals with our intelligent AI system.'
  },
  {
    icon: Brain,
    title: 'Smart Insights',
    description: 'Get actionable insights from your sales data with advanced analytics and predictions.'
  },
  {
    icon: BarChart3,
    title: 'Performance Tracking',
    description: 'Monitor team performance and identify opportunities for improvement in real-time.'
  },
  {
    icon: Users,
    title: 'Team Collaboration',
    description: 'Foster seamless collaboration between sales teams and AI systems.'
  }
];

export function Features() {
  return (
    <section className="py-24 border-t border-white/10">
      <Container>
        <div className="text-center mb-16">
          <h2 className="text-3xl font-bold text-white mb-4">
            Powered by Advanced{' '}
            <span className="text-[#7CFBEE]">AI</span>
          </h2>
          <p className="text-gray-400 max-w-2xl mx-auto">
            Our platform combines cutting-edge AI with intuitive design to transform your business operations
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {features.map((feature) => (
            <FeatureCard key={feature.title} {...feature} />
          ))}
        </div>
      </Container>
    </section>
  );
}