import { usePricingContext } from './PricingContext';

export function PricingToggle() {
  const { isYearly, setIsYearly } = usePricingContext();

  return (
    <div className="flex items-center justify-center gap-4 mb-12">
      <span className={`text-sm ${!isYearly ? 'text-foreground' : 'text-foreground/70'}`}>
        Monthly
      </span>
      <button
        onClick={() => setIsYearly(!isYearly)}
        className="relative w-14 h-7 bg-border rounded-full p-1 transition-colors focus:outline-none"
      >
        <span
          className={`block w-5 h-5 bg-primary rounded-full transition-transform ${
            isYearly ? 'translate-x-7' : ''
          }`}
        />
      </button>
      <div className="flex items-center gap-2">
        <span className={`text-sm ${isYearly ? 'text-foreground' : 'text-foreground/70'}`}>
          Yearly
        </span>
        <span className="text-xs px-2 py-1 bg-primary/20 text-primary rounded-full">
          Save 20%
        </span>
      </div>
    </div>
  );
}