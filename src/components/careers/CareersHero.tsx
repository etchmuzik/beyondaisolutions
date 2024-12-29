import { Container } from '../ui/Container';

export function CareersHero() {
  return (
    <div className="relative py-20 mb-16 bg-gradient-to-b from-primary/10 to-transparent">
      <Container>
        <div className="max-w-3xl">
          <h1 className="text-4xl font-bold text-foreground mb-6">
            Join Our Mission to Transform Business with AI
          </h1>
          <p className="text-xl text-foreground/70 mb-8">
            Be part of a team that's revolutionizing how businesses operate through
            cutting-edge AI solutions and automation.
          </p>
          <div className="flex flex-wrap gap-8">
            <div className="flex items-center gap-2">
              <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center">
                <span className="text-xl font-bold text-primary">50+</span>
              </div>
              <div className="text-sm">
                <p className="text-foreground font-medium">Team Members</p>
                <p className="text-foreground/70">Globally</p>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center">
                <span className="text-xl font-bold text-primary">15+</span>
              </div>
              <div className="text-sm">
                <p className="text-foreground font-medium">Nationalities</p>
                <p className="text-foreground/70">Diverse Culture</p>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center">
                <span className="text-xl font-bold text-primary">4.8</span>
              </div>
              <div className="text-sm">
                <p className="text-foreground font-medium">Employee Rating</p>
                <p className="text-foreground/70">on Glassdoor</p>
              </div>
            </div>
          </div>
        </div>
      </Container>
    </div>
  );
}