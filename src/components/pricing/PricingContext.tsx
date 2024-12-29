import { createContext, useContext, useState, ReactNode } from 'react';

interface PricingContextType {
  isYearly: boolean;
  setIsYearly: (value: boolean) => void;
}

const PricingContext = createContext<PricingContextType | undefined>(undefined);

export function PricingProvider({ children }: { children: ReactNode }) {
  const [isYearly, setIsYearly] = useState(false);

  return (
    <PricingContext.Provider value={{ isYearly, setIsYearly }}>
      {children}
    </PricingContext.Provider>
  );
}

export function usePricingContext() {
  const context = useContext(PricingContext);
  if (!context) {
    throw new Error('usePricingContext must be used within a PricingProvider');
  }
  return context;
}