import { LucideIcon } from 'lucide-react';

export interface Integration {
  name: string;
  icon: LucideIcon;
  description: string;
}

export interface IntegrationCardProps extends Integration {}

export interface IntegrationGridProps {
  integrations: Integration[];
}