import { Button } from '../ui/Button';
import { useJobOpenings } from '../../hooks/useJobOpenings';

export function JobOpenings() {
  const { jobs, loading } = useJobOpenings();

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <section className="mb-20">
      <h2 className="text-2xl font-bold text-foreground mb-8">Open Positions</h2>
      <div className="space-y-4">
        {jobs.map((job) => (
          <div
            key={job.id}
            className="bg-card border border-border rounded-lg p-6 hover:border-primary/50 transition-colors"
          >
            <div className="flex items-start justify-between gap-4">
              <div>
                <h3 className="text-lg font-semibold text-foreground mb-2">
                  {job.title}
                </h3>
                <div className="flex flex-wrap gap-4 text-sm text-foreground/70 mb-4">
                  <span>{job.location}</span>
                  <span>{job.type}</span>
                  <span>{job.department}</span>
                </div>
                <p className="text-foreground/70">{job.description}</p>
              </div>
              <Button variant="primary" href={`/careers/${job.id}`}>
                Apply Now
              </Button>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}