import { useState } from 'react';
import { ChevronDown, ChevronUp } from 'lucide-react';

const faqs = [
  {
    question: 'What is the hiring process like?',
    answer: 'Our hiring process typically includes: 1) Initial application review, 2) Phone screening, 3) Technical assessment (if applicable), 4) Team interviews, and 5) Final interview with leadership.'
  },
  {
    question: 'Do you offer remote work options?',
    answer: 'Yes, we offer flexible work arrangements including hybrid and fully remote options depending on the role and team requirements.'
  },
  {
    question: 'What opportunities are there for growth?',
    answer: 'We provide clear career progression paths, regular performance reviews, mentorship programs, and a dedicated L&D budget for each employee.'
  },
  {
    question: 'How do you support diversity and inclusion?',
    answer: 'We are committed to building a diverse and inclusive workplace through targeted recruitment, employee resource groups, unconscious bias training, and inclusive policies.'
  }
];

export function CareersFAQ() {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  return (
    <section className="mb-20">
      <h2 className="text-2xl font-bold text-foreground mb-8">
        Frequently Asked Questions
      </h2>
      <div className="space-y-4">
        {faqs.map((faq, index) => (
          <div
            key={index}
            className="bg-card border border-border rounded-lg overflow-hidden"
          >
            <button
              onClick={() => setOpenIndex(openIndex === index ? null : index)}
              className="w-full flex items-center justify-between p-6 text-left hover:bg-background/50 transition-colors"
            >
              <span className="font-medium text-foreground">{faq.question}</span>
              {openIndex === index ? (
                <ChevronUp className="h-5 w-5 text-foreground/70" />
              ) : (
                <ChevronDown className="h-5 w-5 text-foreground/70" />
              )}
            </button>
            {openIndex === index && (
              <div className="px-6 pb-6 text-foreground/70">
                {faq.answer}
              </div>
            )}
          </div>
        ))}
      </div>
    </section>
  );
}