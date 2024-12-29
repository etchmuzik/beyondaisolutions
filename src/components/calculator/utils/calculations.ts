import { CalculatorValues, CalculatorSavings } from '../types';

export function calculateSavings(values: CalculatorValues): CalculatorSavings {
  const monthlyHours = (values.callVolume * values.callDuration) / 60;
  const monthlyCost = monthlyHours * values.costPerHour;
  const monthlySavings = monthlyCost * 0.7; // Assuming 70% cost reduction
  const yearlySavings = monthlySavings * 12;
  const employeeCostSavings = values.employees * values.costPerHour * 160 * 0.2; // 20% efficiency gain

  return {
    monthly: Math.round(monthlySavings),
    yearly: Math.round(yearlySavings),
    employee: Math.round(employeeCostSavings)
  };
}