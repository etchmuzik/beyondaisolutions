import { Container } from '../ui/Container';

export function AboutHero() {
  return (
    <div className="relative py-20 mb-16 bg-gradient-to-b from-primary/10 to-transparent">
      <Container>
        <div className="max-w-3xl">
          <h1 className="text-4xl font-bold text-foreground mb-6">
            Transforming Business Through AI Innovation
          </h1>
          <p className="text-xl text-foreground/70">
            Beyond AI is on a mission to revolutionize how businesses operate by
            harnessing the power of artificial intelligence and automation.
          </p>
        </div>
      </Container>
    </div>
  );
}