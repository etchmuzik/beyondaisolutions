import { useEffect, useState } from 'react';

interface SliderProps {
  label: string;
  value: number;
  onChange: (value: number) => void;
  min: number;
  max: number;
  step: number;
  prefix?: string;
  suffix?: string;
}

export function Slider({
  label,
  value,
  onChange,
  min,
  max,
  step,
  prefix,
  suffix
}: SliderProps) {
  const [displayValue, setDisplayValue] = useState(value);

  useEffect(() => {
    setDisplayValue(value);
  }, [value]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newValue = Number(e.target.value);
    setDisplayValue(newValue);
  };

  const handleBlur = () => {
    onChange(displayValue);
  };

  return (
    <div className="space-y-2">
      <div className="flex justify-between items-center">
        <label className="text-foreground/70 text-sm">{label}</label>
        <span className="text-foreground font-medium">
          {prefix && prefix + ' '}
          {displayValue.toLocaleString()}
          {suffix && ' ' + suffix}
        </span>
      </div>
      <input
        type="range"
        min={min}
        max={max}
        step={step}
        value={displayValue}
        onChange={handleChange}
        onBlur={handleBlur}
        className="w-full h-2 bg-border rounded-lg appearance-none cursor-pointer accent-primary"
      />
      <div className="flex justify-between text-xs text-foreground/50">
        <span>
          {prefix && prefix + ' '}
          {min.toLocaleString()}
          {suffix && ' ' + suffix}
        </span>
        <span>
          {prefix && prefix + ' '}
          {max.toLocaleString()}
          {suffix && ' ' + suffix}
        </span>
      </div>
    </div>
  );
}