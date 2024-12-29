interface RememberMeProps {
  checked: boolean;
  onChange: (checked: boolean) => void;
}

export function RememberMe({ checked, onChange }: RememberMeProps) {
  return (
    <label className="flex items-center">
      <input
        type="checkbox"
        checked={checked}
        onChange={(e) => onChange(e.target.checked)}
        className="h-4 w-4 text-primary border-border rounded focus:ring-primary"
      />
      <span className="ml-2 text-sm text-foreground/70">
        Remember me
      </span>
    </label>
  );
}