import { Star } from 'lucide-react';

interface TestimonialCardProps {
  name: string;
  role: string;
  company: string;
  quote: string;
  rating: number;
}

export function TestimonialCard({ name, role, company, quote, rating }: TestimonialCardProps) {
  return (
    <div className="p-6 rounded-lg bg-card border border-border">
      <div className="flex items-center mb-4">
        <div className="mr-4">
          <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center text-primary font-bold">
            {name[0].toUpperCase()}
          </div>
        </div>
        <div>
          <h4 className="text-foreground font-medium">{name}</h4>
          <p className="text-sm text-foreground/70">{role}, {company}</p>
        </div>
      </div>
      <div className="flex mb-3">
        {[...Array(rating)].map((_, i) => (
          <Star key={i} className="h-4 w-4 text-primary fill-current" />
        ))}
      </div>
      <p className="text-foreground/70 italic">{quote}</p>
    </div>
  );
}