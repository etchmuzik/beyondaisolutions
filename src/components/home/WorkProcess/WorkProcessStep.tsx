import { StepIcon } from './components/StepIcon';
import { StepContent } from './components/StepContent';
import type { WorkProcessStep as WorkProcessStepType } from './types';

interface WorkProcessStepProps extends WorkProcessStepType {
  number: number;
}

export function WorkProcessStep({ icon, title, description, number }: WorkProcessStepProps) {
  return (
    <div className="relative text-center group">
      <StepIcon icon={icon} number={number} />
      <StepContent title={title} description={description} />
    </div>
  );
}