import { Activity } from 'lucide-react';

const activities = [
  {
    id: 1,
    type: 'call',
    description: 'Completed call with John Doe',
    time: '2 hours ago',
    status: 'success'
  },
  {
    id: 2,
    type: 'meeting',
    description: 'Scheduled meeting with Sarah Smith',
    time: '4 hours ago',
    status: 'pending'
  },
  {
    id: 3,
    type: 'email',
    description: 'Sent follow-up email to Mike Johnson',
    time: '5 hours ago',
    status: 'success'
  }
];

export function RecentActivity() {
  return (
    <div className="mt-8 p-6 rounded-lg border border-white/10 bg-white/5">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-lg font-semibold text-white">Recent Activity</h2>
        <Activity className="h-5 w-5 text-primary" />
      </div>
      <div className="space-y-4">
        {activities.map((activity) => (
          <div
            key={activity.id}
            className="flex items-center justify-between p-4 rounded-lg bg-white/5"
          >
            <div>
              <p className="text-white">{activity.description}</p>
              <p className="text-sm text-gray-400">{activity.time}</p>
            </div>
            <span className={`text-sm px-2 py-1 rounded ${
              activity.status === 'success' ? 'bg-green-400/10 text-green-400' : 'bg-yellow-400/10 text-yellow-400'
            }`}>
              {activity.status}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}