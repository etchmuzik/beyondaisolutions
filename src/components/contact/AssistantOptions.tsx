import { MessageSquare, Phone } from 'lucide-react';
import { Button } from '../ui/Button';

export function AssistantOptions() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
      <div className="bg-white/5 border border-white/10 rounded-lg p-6">
        <div className="flex items-center space-x-3 mb-4">
          <div className="p-2 bg-primary/10 rounded-lg">
            <Phone className="h-5 w-5 text-primary" />
          </div>
          <h3 className="text-lg font-medium text-white">AI Voice Assistant</h3>
        </div>
        <p className="text-gray-400 mb-6">Schedule a call with our AI expert</p>
        <Button variant="primary" className="w-full">
          Schedule Call
        </Button>
      </div>

      <div className="bg-white/5 border border-white/10 rounded-lg p-6">
        <div className="flex items-center space-x-3 mb-4">
          <div className="p-2 bg-primary/10 rounded-lg">
            <MessageSquare className="h-5 w-5 text-primary" />
          </div>
          <h3 className="text-lg font-medium text-white">AI Chat Assistant</h3>
        </div>
        <p className="text-gray-400 mb-6">Get instant answers to your questions</p>
        <Button variant="primary" className="w-full">
          Start Chat
        </Button>
      </div>
    </div>
  );
}