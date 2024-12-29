import { Calendar } from 'lucide-react';

export function CalendarWidget() {
  return (
    <div className="bg-white/5 border border-white/10 rounded-lg p-6">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h3 className="text-white font-medium">15-Mins Meeting</h3>
          <p className="text-sm text-gray-400">Dubai</p>
        </div>
        <Calendar className="h-5 w-5 text-primary" />
      </div>
      <div className="text-center p-12 border border-dashed border-white/10 rounded-lg">
        <p className="text-gray-400">Calendar integration coming soon</p>
      </div>
    </div>
  );
}