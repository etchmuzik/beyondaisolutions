interface StatusBadgeProps {
  status: 'completed' | 'scheduled' | 'failed';
  className?: string;
}

export function StatusBadge({ status, className = '' }: StatusBadgeProps) {
  const styles = {
    completed: 'bg-green-400/10 text-green-400',
    scheduled: 'bg-blue-400/10 text-blue-400',
    failed: 'bg-red-400/10 text-red-400'
  };

  return (
    <span className={`text-sm px-3 py-1 rounded-full ${styles[status]} ${className}`}>
      {status}
    </span>
  );
}