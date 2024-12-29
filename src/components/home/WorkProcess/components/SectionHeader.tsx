interface SectionHeaderProps {
  title: string;
  description: string;
}

export function SectionHeader({ title, description }: SectionHeaderProps) {
  return (
    <div className="text-center mb-20">
      <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
        {title}
      </h2>
      <p className="text-xl text-gray-400 max-w-3xl mx-auto">
        {description}
      </p>
    </div>
  );
}