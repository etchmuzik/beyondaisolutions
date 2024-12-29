import { Upload, Phone, Calendar } from 'lucide-react';
import { Container } from '../ui/Container';

const steps = [
  {
    icon: Upload,
    title: 'Upload Your Lead List',
    description: 'Simply import your contacts and let our AI handle the rest.'
  },
  {
    icon: Phone,
    title: 'AI Makes the Calls',
    description: 'Our assistant engages leads with natural conversations.'
  },
  {
    icon: Calendar,
    title: 'Automatic Scheduling',
    description: 'Meetings are booked and synced with your calendar.'
  }
];

export function Workflow() {
  return (
    <section className="py-24 bg-card border-t border-border">
      <Container>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
          {steps.map((step, index) => (
            <div key={index} className="text-center">
              <div className="mb-6 inline-flex items-center justify-center w-16 h-16 rounded-full bg-primary/10">
                <step.icon className="h-8 w-8 text-primary" />
              </div>
              <h3 className="text-xl font-semibold text-foreground mb-3">
                {step.title}
              </h3>
              <p className="text-foreground/70">{step.description}</p>
            </div>
          ))}
        </div>
      </Container>
    </section>
  );
}