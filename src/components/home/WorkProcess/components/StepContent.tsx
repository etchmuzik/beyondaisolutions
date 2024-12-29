interface StepContentProps {
  title: string;
  description: string;
}

export function StepContent({ title, description }: StepContentProps) {
  return (
    <div>
      <h3 className="text-2xl font-bold text-white mb-4 group-hover:text-primary transition-colors duration-300">
        {title}
      </h3>
      <p className="text-gray-400 max-w-sm mx-auto text-lg">
        {description}
      </p>
    </div>
  );
}