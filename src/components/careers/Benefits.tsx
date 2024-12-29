import { Briefcase, Heart, Globe, GraduationCap } from 'lucide-react';

const benefits = [
  {
    icon: Briefcase,
    title: 'Competitive Package',
    items: [
      'Competitive salary',
      'Performance bonuses',
      'Stock options',
      'Annual salary reviews'
    ]
  },
  {
    icon: Heart,
    title: 'Health & Wellness',
    items: [
      'Comprehensive health insurance',
      'Mental health support',
      'Gym membership',
      'Wellness programs'
    ]
  },
  {
    icon: Globe,
    title: 'Work-Life Balance',
    items: [
      'Flexible working hours',
      'Remote work options',
      'Unlimited PTO',
      'Paid parental leave'
    ]
  },
  {
    icon: GraduationCap,
    title: 'Growth & Development',
    items: [
      'Learning & development budget',
      'Conference attendance',
      'Mentorship program',
      'Career progression framework'
    ]
  }
];

export function Benefits() {
  return (
    <section className="mb-20">
      <h2 className="text-2xl font-bold text-foreground mb-8">Benefits & Perks</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {benefits.map((benefit) => (
          <div
            key={benefit.title}
            className="bg-card border border-border rounded-lg p-6 hover:border-primary/50 transition-colors"
          >
            <div className="flex items-center gap-4 mb-4">
              <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center">
                <benefit.icon className="h-6 w-6 text-primary" />
              </div>
              <h3 className="text-lg font-semibold text-foreground">
                {benefit.title}
              </h3>
            </div>
            <ul className="space-y-2">
              {benefit.items.map((item) => (
                <li key={item} className="flex items-center gap-2 text-foreground/70">
                  <span className="w-1.5 h-1.5 rounded-full bg-primary" />
                  {item}
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </section>
  );
}