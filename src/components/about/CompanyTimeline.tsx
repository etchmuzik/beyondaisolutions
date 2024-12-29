const timeline = [
  {
    year: '2020',
    title: 'Company Founded',
    description: 'Beyond AI was established with a vision to revolutionize business automation.'
  },
  {
    year: '2021',
    title: 'First Major Product Launch',
    description: 'Released our flagship AI-powered sales automation platform.'
  },
  {
    year: '2022',
    title: 'Global Expansion',
    description: 'Opened offices in Dubai and expanded operations across the Middle East.'
  },
  {
    year: '2023',
    title: 'Industry Recognition',
    description: 'Named one of the fastest-growing AI companies in the region.'
  }
];

export function CompanyTimeline() {
  return (
    <section className="mb-20">
      <h2 className="text-2xl font-bold text-foreground mb-8">Our Journey</h2>
      <div className="space-y-8">
        {timeline.map((item, index) => (
          <div
            key={item.year}
            className="relative flex items-start gap-8 group"
          >
            {/* Timeline line */}
            {index !== timeline.length - 1 && (
              <div className="absolute left-[2.4rem] top-14 w-px h-[calc(100%+2rem)] bg-border group-hover:bg-primary/50 transition-colors" />
            )}

            {/* Year marker */}
            <div className="w-20 h-12 rounded-lg bg-primary/10 flex items-center justify-center text-primary font-bold shrink-0">
              {item.year}
            </div>

            {/* Content */}
            <div className="bg-card border border-border rounded-lg p-6 flex-1 hover:border-primary/50 transition-colors">
              <h3 className="text-lg font-semibold text-foreground mb-2">
                {item.title}
              </h3>
              <p className="text-foreground/70">{item.description}</p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}