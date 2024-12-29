import { Container } from '../../ui/Container';
import { WorkflowStep } from './WorkflowStep';
import { workflowSteps } from './workflow-data';

export function Workflow() {
  return (
    <section className="py-24 bg-card border-t border-border">
      <Container>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
          {workflowSteps.map((step, index) => (
            <WorkflowStep key={index} {...step} />
          ))}
        </div>
      </Container>
    </section>
  );
}