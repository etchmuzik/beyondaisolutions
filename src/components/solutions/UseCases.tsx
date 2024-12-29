import { Container } from '../ui/Container';

const useCases = [
  {
    title: 'Lead Generation',
    description: 'Automatically identify and qualify potential leads using AI-powered algorithms.',
    image: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&q=80&w=800',
  },
  {
    title: 'Sales Analytics',
    description: 'Make data-driven decisions with comprehensive sales performance analytics.',
    image: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&q=80&w=800',
  },
];

export function UseCases() {
  return (
    <section className="py-20 border-t border-white/10">
      <Container>
        <h2 className="text-3xl font-bold text-white mb-12">Use Cases</h2>
        <div className="space-y-20">
          {useCases.map((useCase, index) => (
            <div
              key={useCase.title}
              className={`flex flex-col ${
                index % 2 === 0 ? 'lg:flex-row' : 'lg:flex-row-reverse'
              } gap-12 items-center`}
            >
              <div className="flex-1">
                <h3 className="text-2xl font-semibold text-white mb-4">{useCase.title}</h3>
                <p className="text-gray-400 text-lg">{useCase.description}</p>
              </div>
              <div className="flex-1">
                <img
                  src={useCase.image}
                  alt={useCase.title}
                  className="rounded-lg w-full object-cover aspect-video"
                />
              </div>
            </div>
          ))}
        </div>
      </Container>
    </section>
  );
}