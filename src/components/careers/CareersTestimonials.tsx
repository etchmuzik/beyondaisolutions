const testimonials = [
  {
    quote: "Working at Beyond AI has been an incredible journey. The team is supportive, the work is challenging, and there's always something new to learn.",
    author: "Sarah Chen",
    role: "Senior AI Engineer",
    image: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&q=80&w=200"
  },
  {
    quote: "The culture here is amazing. We're encouraged to innovate, take risks, and grow both personally and professionally.",
    author: "Michael Rodriguez",
    role: "Product Manager",
    image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&q=80&w=200"
  },
  {
    quote: "I love that we're working on cutting-edge technology while maintaining a strong focus on work-life balance.",
    author: "Aisha Patel",
    role: "ML Research Scientist",
    image: "https://images.unsplash.com/photo-1573497019940-1c28c88b4f3e?auto=format&fit=crop&q=80&w=200"
  }
];

export function CareersTestimonials() {
  return (
    <section className="mb-20">
      <h2 className="text-2xl font-bold text-foreground mb-8">
        What Our Team Says
      </h2>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {testimonials.map((testimonial) => (
          <div
            key={testimonial.author}
            className="bg-card border border-border rounded-lg p-6 hover:border-primary/50 transition-colors"
          >
            <div className="flex items-center gap-4 mb-4">
              <img
                src={testimonial.image}
                alt={testimonial.author}
                className="w-12 h-12 rounded-full object-cover"
              />
              <div>
                <h3 className="font-medium text-foreground">
                  {testimonial.author}
                </h3>
                <p className="text-sm text-primary">{testimonial.role}</p>
              </div>
            </div>
            <blockquote className="text-foreground/70 italic">
              "{testimonial.quote}"
            </blockquote>
          </div>
        ))}
      </div>
    </section>
  );
}