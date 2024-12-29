import { LucideIcon } from 'lucide-react';

interface CardHeaderProps {
  icon: LucideIcon;
  title: string;
  action?: React.ReactNode;
}

export function CardHeader({ icon: Icon, title, action }: CardHeaderProps) {
  return (
    <div className="flex items-center justify-between mb-6">
      <div className="flex items-center gap-2">
        <Icon className="h-5 w-5 text-primary" />
        <h2 className="text-lg font-semibold text-foreground">{title}</h2>
      </div>
      {action}
    </div>
  );
}