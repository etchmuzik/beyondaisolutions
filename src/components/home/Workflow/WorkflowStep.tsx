import { LucideIcon } from 'lucide-react';

interface WorkflowStepProps {
  icon: LucideIcon;
  title: string;
  description: string;
}

export function WorkflowStep({ icon: Icon, title, description }: WorkflowStepProps) {
  return (
    <div className="text-center">
      <div className="mb-6 inline-flex items-center justify-center w-16 h-16 rounded-full bg-primary/10">
        <Icon className="h-8 w-8 text-primary" />
      </div>
      <h3 className="text-xl font-semibold text-foreground mb-3">
        {title}
      </h3>
      <p className="text-foreground/70">{description}</p>
    </div>
  );
}