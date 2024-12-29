import { Award, Users, Building2, Globe } from 'lucide-react';

const achievements = [
  {
    icon: Award,
    metric: '15+',
    label: 'Industry Awards',
    description: 'Recognition for innovation and excellence'
  },
  {
    icon: Users,
    metric: '10,000+',
    label: 'Users Worldwide',
    description: 'Trusted by businesses globally'
  },
  {
    icon: Building2,
    metric: '500+',
    label: 'Enterprise Clients',
    description: 'Leading companies choose us'
  },
  {
    icon: Globe,
    metric: '20+',
    label: 'Countries',
    description: 'Global presence and impact'
  }
];

export function Achievements() {
  return (
    <section className="mb-20">
      <h2 className="text-2xl font-bold text-foreground mb-8">Our Impact</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
        {achievements.map((achievement) => (
          <div
            key={achievement.label}
            className="bg-card border border-border rounded-lg p-6 hover:border-primary/50 transition-colors"
          >
            <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center mb-4">
              <achievement.icon className="h-6 w-6 text-primary" />
            </div>
            <div className="text-3xl font-bold text-foreground mb-2">
              {achievement.metric}
            </div>
            <div className="text-lg font-medium text-foreground mb-1">
              {achievement.label}
            </div>
            <p className="text-sm text-foreground/70">
              {achievement.description}
            </p>
          </div>
        ))}
      </div>
    </section>
  );
}