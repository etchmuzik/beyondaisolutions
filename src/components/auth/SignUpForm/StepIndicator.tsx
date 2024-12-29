interface StepIndicatorProps {
  currentStep: number;
  totalSteps: number;
}

export function StepIndicator({ currentStep, totalSteps }: StepIndicatorProps) {
  return (
    <div className="mb-8">
      <div className="flex justify-between">
        {[...Array(totalSteps)].map((_, index) => (
          <div
            key={index}
            className={`w-1/3 h-2 rounded-full transition-colors ${
              index + 1 <= currentStep ? 'bg-primary' : 'bg-border'
            }`}
          />
        ))}
      </div>
      <div className="mt-4 text-center text-sm text-foreground/70">
        Step {currentStep} of {totalSteps}
      </div>
    </div>
  );
}