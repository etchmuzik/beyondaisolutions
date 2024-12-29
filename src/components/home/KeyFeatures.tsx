import { Phone, Calendar, MessageSquare, Database } from 'lucide-react';
import { Container } from '../ui/Container';

const features = [
  {
    icon: Phone,
    title: 'Cold Call Automation',
    description: 'Reach out to leads efficiently and at scale.'
  },
  {
    icon: Calendar,
    title: 'Smart Scheduling',
    description: 'Book meetings directly into your calendar.'
  },
  {
    icon: MessageSquare,
    title: 'Natural Conversations',
    description: 'Human-like responses to engage your leads.'
  },
  {
    icon: Database,
    title: 'Data Integration',
    description: 'Sync with your CRM for seamless tracking.'
  }
];

export function KeyFeatures() {
  return (
    <section className="py-20 bg-background border-t border-border">
      <Container>
        <div className="text-center mb-16">
          <h2 className="text-3xl font-bold text-foreground mb-4">Key Features</h2>
          <p className="text-xl text-foreground/70">
            Everything you need to automate your sales outreach
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {features.map((feature) => (
            <div key={feature.title} className="text-center">
              <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-primary/10 mb-6">
                <feature.icon className="h-8 w-8 text-primary" />
              </div>
              <h3 className="text-xl font-semibold text-foreground mb-3">{feature.title}</h3>
              <p className="text-foreground/70">{feature.description}</p>
            </div>
          ))}
        </div>
      </Container>
    </section>
  );
}