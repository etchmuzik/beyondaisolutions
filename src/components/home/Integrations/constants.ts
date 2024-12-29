import { Mail, Video, HardDrive, Users, Building2, MessageSquare, Trello, FileText, Figma } from 'lucide-react';
import type { Integration } from './types';

export const INTEGRATIONS: Integration[] = [
  {
    name: 'Gmail',
    icon: Mail,
    description: 'Email integration'
  },
  {
    name: 'Zoom',
    icon: Video,
    description: 'Video conferencing'
  },
  {
    name: 'Google Drive',
    icon: HardDrive,
    description: 'Cloud storage'
  },
  {
    name: 'Microsoft Teams',
    icon: Users,
    description: 'Team collaboration'
  },
  {
    name: 'Salesforce',
    icon: Building2,
    description: 'CRM platform'
  },
  {
    name: 'Slack',
    icon: MessageSquare,
    description: 'Team messaging'
  },
  {
    name: 'Jira',
    icon: Trello,
    description: 'Project management'
  },
  {
    name: 'Notion',
    icon: FileText,
    description: 'Documentation'
  },
  {
    name: 'Figma',
    icon: Figma,
    description: 'Design tools'
  }
];