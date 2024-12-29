import { Bot, Heart, Users, Zap } from 'lucide-react';

const values = [
  {
    icon: Bot,
    title: 'Innovation First',
    description: 'We push the boundaries of AI technology to create solutions that transform businesses.'
  },
  {
    icon: Users,
    title: 'Collaborative Spirit',
    description: 'We believe in the power of teamwork and diverse perspectives to drive success.'
  },
  {
    icon: Heart,
    title: 'Human-Centric',
    description: 'We build technology that enhances human capabilities, not replaces them.'
  },
  {
    icon: Zap,
    title: 'Impact Driven',
    description: 'We measure our success by the positive change we create for our clients and society.'
  }
];

export function CompanyCulture() {
  return (
    <section className="mb-20">
      <h2 className="text-2xl font-bold text-foreground mb-8">Our Culture</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {values.map((value) => (
          <div
            key={value.title}
            className="bg-card border border-border rounded-lg p-6 hover:border-primary/50 transition-colors"
          >
            <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center mb-4">
              <value.icon className="h-6 w-6 text-primary" />
            </div>
            <h3 className="text-lg font-semibold text-foreground mb-2">
              {value.title}
            </h3>
            <p className="text-foreground/70">{value.description}</p>
          </div>
        ))}
      </div>
    </section>
  );
}