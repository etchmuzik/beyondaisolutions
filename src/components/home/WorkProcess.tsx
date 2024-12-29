import { Map, Wrench, Settings } from 'lucide-react';
import { Container } from '../ui/Container';

const steps = [
  {
    number: '1',
    icon: Map,
    title: 'Map out',
    description: 'We understand your systems and recommend solutions to help cut costs and scale revenue.'
  },
  {
    number: '2',
    icon: Wrench,
    title: 'Integrate',
    description: 'We implement our solutions - custom coding, AI, Zapier, outsourced workflows.'
  },
  {
    number: '3',
    icon: Settings,
    title: 'Manage',
    description: 'Our partners enjoy a defined step-by-step journey towards complete business automation.'
  }
];

export function WorkProcess() {
  return (
    <section className="py-20 bg-black">
      <Container>
        <div className="text-center mb-16">
          <h2 className="text-3xl font-bold text-white mb-4">
            How our AI and Automation Agency Works
          </h2>
          <p className="text-xl text-gray-400">
            We work like your Chief AI Officer - we provide you with a hands-free solution to upgrade your business in sync with AI trends.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
          {steps.map((step) => (
            <div key={step.title} className="relative">
              <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-primary/10 mb-6">
                <step.icon className="h-8 w-8 text-primary" />
              </div>
              <h3 className="text-xl font-semibold text-white mb-3">{step.title}</h3>
              <p className="text-gray-400">{step.description}</p>
            </div>
          ))}
        </div>
      </Container>
    </section>
  );
}