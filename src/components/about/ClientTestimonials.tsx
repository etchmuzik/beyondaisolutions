const testimonials = [
  {
    quote: "Beyond AI has transformed how we handle customer interactions. The results have been incredible.",
    author: "John Smith",
    role: "CTO",
    company: "TechCorp Solutions",
    image: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=crop&q=80&w=200"
  },
  {
    quote: "The level of automation and efficiency we've achieved with Beyond AI is remarkable.",
    author: "Emma Watson",
    role: "Head of Sales",
    company: "Global Innovations",
    image: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?auto=format&fit=crop&q=80&w=200"
  }
];

export function ClientTestimonials() {
  return (
    <section className="mb-20">
      <h2 className="text-2xl font-bold text-foreground mb-8">Client Success Stories</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {testimonials.map((testimonial) => (
          <div
            key={testimonial.author}
            className="bg-card border border-border rounded-lg p-8 hover:border-primary/50 transition-colors"
          >
            <blockquote className="text-xl text-foreground/90 italic mb-6">
              "{testimonial.quote}"
            </blockquote>
            <div className="flex items-center gap-4">
              <img
                src={testimonial.image}
                alt={testimonial.author}
                className="w-12 h-12 rounded-full object-cover"
              />
              <div>
                <div className="font-medium text-foreground">
                  {testimonial.author}
                </div>
                <div className="text-sm text-primary">
                  {testimonial.role}, {testimonial.company}
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}