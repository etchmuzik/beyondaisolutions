import { useState } from 'react';
import { CalculatorValues } from '../types';

export function useCalculatorValues() {
  const [values, setValues] = useState<CalculatorValues>({
    callVolume: 1000,
    callDuration: 5,
    employees: 5,
    costPerHour: 50
  });

  const updateValue = (key: keyof CalculatorValues, value: number) => {
    setValues(prev => ({ ...prev, [key]: value }));
  };

  return { values, updateValue };
}