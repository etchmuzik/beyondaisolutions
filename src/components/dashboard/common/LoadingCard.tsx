interface LoadingCardProps {
  count?: number;
  height?: string;
}

export function LoadingCard({ count = 3, height = "h-24" }: LoadingCardProps) {
  return (
    <div className="space-y-4">
      {[...Array(count)].map((_, i) => (
        <div key={i} className={`${height} bg-background animate-pulse rounded-lg`} />
      ))}
    </div>
  );
}