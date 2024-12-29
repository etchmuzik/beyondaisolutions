import { Check, X } from 'lucide-react';

interface PasswordStrengthMeterProps {
  password: string;
}

interface Requirement {
  label: string;
  test: (password: string) => boolean;
}

const requirements: Requirement[] = [
  {
    label: 'At least 8 characters',
    test: (password) => password.length >= 8,
  },
  {
    label: 'Contains a number',
    test: (password) => /\d/.test(password),
  },
  {
    label: 'Contains a special character',
    test: (password) => /[!@#$%^&*(),.?":{}|<>]/.test(password),
  },
  {
    label: 'Contains uppercase & lowercase letters',
    test: (password) => /[a-z]/.test(password) && /[A-Z]/.test(password),
  },
];

export function PasswordStrengthMeter({ password }: PasswordStrengthMeterProps) {
  return (
    <div className="mt-2 space-y-2">
      {requirements.map((req, index) => {
        const isMet = req.test(password);
        return (
          <div
            key={index}
            className="flex items-center text-sm"
          >
            {isMet ? (
              <Check className="h-4 w-4 text-green-500 mr-2" />
            ) : (
              <X className="h-4 w-4 text-red-500 mr-2" />
            )}
            <span className={isMet ? 'text-green-500' : 'text-red-500'}>
              {req.label}
            </span>
          </div>
        );
      })}
    </div>
  );
}