import { Container } from '../../ui/Container';
import { TestimonialCard } from './TestimonialCard';

const testimonials = [
  {
    name: 'David Miller',
    role: 'Sales Director',
    company: 'TechCorp',
    quote: 'Our sales team saves hours every day with this AI Assistant!',
    rating: 5
  },
  {
    name: 'Emily Chen',
    role: 'CEO',
    company: 'GrowthX',
    quote: "It's like having an extra employee who never takes a break.",
    rating: 5
  }
];

export function Testimonials() {
  return (
    <section className="py-20 bg-background border-t border-border">
      <Container>
        <div className="text-center mb-16">
          <h2 className="text-3xl font-bold text-foreground mb-4">
            Trusted by Industry Leaders
          </h2>
          <p className="text-xl text-foreground/70">
            See what our clients say about their experience
          </p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
          {testimonials.map((testimonial) => (
            <TestimonialCard key={testimonial.name} {...testimonial} />
          ))}
        </div>
      </Container>
    </section>
  );
}