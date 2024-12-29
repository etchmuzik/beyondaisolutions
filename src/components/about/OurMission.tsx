import { Target, Lightbulb, Users } from 'lucide-react';

const missions = [
  {
    icon: Target,
    title: 'Our Mission',
    description: 'To empower businesses with intelligent automation solutions that drive growth and innovation.'
  },
  {
    icon: Lightbulb,
    title: 'Our Vision',
    description: 'To be the global leader in AI-powered business transformation, making advanced technology accessible to all.'
  },
  {
    icon: Users,
    title: 'Our Values',
    description: 'Innovation, integrity, collaboration, and a relentless focus on delivering value to our clients.'
  }
];

export function OurMission() {
  return (
    <section className="mb-20">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {missions.map((mission) => (
          <div
            key={mission.title}
            className="bg-card border border-border rounded-lg p-6 hover:border-primary/50 transition-colors"
          >
            <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center mb-4">
              <mission.icon className="h-6 w-6 text-primary" />
            </div>
            <h3 className="text-lg font-semibold text-foreground mb-2">
              {mission.title}
            </h3>
            <p className="text-foreground/70">{mission.description}</p>
          </div>
        ))}
      </div>
    </section>
  );
}