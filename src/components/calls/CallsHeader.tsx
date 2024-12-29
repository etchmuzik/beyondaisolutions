import { Phone, Filter } from 'lucide-react';
import { Button } from '../ui/Button';
import { CallsFilter } from './CallsFilter';

export function CallsHeader() {
  return (
    <div className="mb-8">
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-3">
          <Phone className="h-8 w-8 text-primary" />
          <div>
            <h1 className="text-2xl font-bold text-white">AI-Powered Calls</h1>
            <p className="text-gray-400">Manage and monitor your automated calls</p>
          </div>
        </div>
        <Button>
          Start New Call
        </Button>
      </div>
      <CallsFilter />
    </div>
  );
}