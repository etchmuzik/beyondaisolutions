import { useCalculatorValues } from './useCalculatorValues';
import { calculateSavings } from '../utils/calculations';

export function useCalculator() {
  const { values, updateValue } = useCalculatorValues();
  const savings = calculateSavings(values);

  return {
    values,
    updateValue,
    savings
  };
}