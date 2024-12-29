import { SelectHTMLAttributes } from 'react';

interface SelectProps extends SelectHTMLAttributes<HTMLSelectElement> {
  options: Array<{
    value: string;
    label: string;
  }>;
}

export function Select({ options, className = '', ...props }: SelectProps) {
  return (
    <select
      className={`bg-white/5 border border-white/10 rounded px-3 py-1 text-white ${className}`}
      {...props}
    >
      {options.map((option) => (
        <option key={option.value} value={option.value}>
          {option.label}
        </option>
      ))}
    </select>
  );
}