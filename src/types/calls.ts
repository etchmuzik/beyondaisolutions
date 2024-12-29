export interface Call {
  id: string;
  contactName: string;
  company: string;
  status: 'completed' | 'scheduled' | 'failed';
  timestamp: string;
  duration: number;
  assignedTo: string;
  notes?: string;
  transcription?: string;
  sentiment?: 'positive' | 'neutral' | 'negative';
}