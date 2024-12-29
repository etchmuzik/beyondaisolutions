import { Upload, Phone, Calendar } from 'lucide-react';

export const workflowSteps = [
  {
    icon: Upload,
    title: 'Upload Your Lead List',
    description: 'Simply import your contacts and let our AI handle the rest.'
  },
  {
    icon: Phone,
    title: 'AI Makes the Calls',
    description: 'Our assistant engages leads with natural conversations.'
  },
  {
    icon: Calendar,
    title: 'Automatic Scheduling',
    description: 'Meetings are booked and synced with your calendar.'
  }
] as const;