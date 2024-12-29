import { LucideIcon } from 'lucide-react';

export interface NavItem {
  label: string;
  href: string;
  icon?: LucideIcon;
}

export interface NavigationState {
  items: readonly NavItem[];
  isActive: (href: string) => boolean;
  isDashboard: boolean;
}