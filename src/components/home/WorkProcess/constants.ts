import { Map, Wrench, Settings } from 'lucide-react';

export const WORK_PROCESS_STEPS = [
  {
    icon: Map,
    title: 'Map out',
    description: 'We understand your systems and recommend solutions to help cut costs and scale revenue.'
  },
  {
    icon: Wrench,
    title: 'Integrate',
    description: 'We implement our solutions - custom coding, AI, Zapier, outsourced workflows.'
  },
  {
    icon: Settings,
    title: 'Manage',
    description: 'Our partners enjoy a defined step-by-step journey towards complete business automation.'
  }
] as const;