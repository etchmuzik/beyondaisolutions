interface ActivityItemProps {
  description: string;
  time: string;
  status: 'success' | 'pending';
}

export function ActivityItem({ description, time, status }: ActivityItemProps) {
  return (
    <div className="flex items-center justify-between p-4 rounded-lg bg-white/5">
      <div>
        <p className="text-white">{description}</p>
        <p className="text-sm text-gray-400">{time}</p>
      </div>
      <span className={`text-sm px-2 py-1 rounded ${
        status === 'success' ? 'bg-green-400/10 text-green-400' : 'bg-yellow-400/10 text-yellow-400'
      }`}>
        {status}
      </span>
    </div>
  );
}