export interface CalculatorValues {
  callVolume: number;
  callDuration: number;
  employees: number;
  costPerHour: number;
}

export interface CalculatorSavings {
  monthly: number;
  yearly: number;
  employee: number;
}

export interface SliderConfig {
  label: string;
  min: number;
  max: number;
  step: number;
  prefix?: string;
  suffix?: string;
}

export const SLIDER_CONFIGS: Record<keyof CalculatorValues, SliderConfig> = {
  callVolume: {
    label: 'Monthly Call Volume',
    min: 100,
    max: 10000,
    step: 100,
    suffix: 'calls'
  },
  callDuration: {
    label: 'Average Call Duration',
    min: 1,
    max: 30,
    step: 1,
    suffix: 'minutes'
  },
  employees: {
    label: 'Number of Employees',
    min: 1,
    max: 100,
    step: 1,
    suffix: 'employees'
  },
  costPerHour: {
    label: 'Agent Cost per Hour',
    min: 20,
    max: 200,
    step: 5,
    prefix: 'AED'
  }
};