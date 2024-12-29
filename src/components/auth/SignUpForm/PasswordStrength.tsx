import { Check, X } from 'lucide-react';

interface PasswordStrengthProps {
  password: string;
}

const requirements = [
  {
    label: 'At least 8 characters',
    test: (password: string) => password.length >= 8
  },
  {
    label: 'Contains uppercase letter',
    test: (password: string) => /[A-Z]/.test(password)
  },
  {
    label: 'Contains lowercase letter',
    test: (password: string) => /[a-z]/.test(password)
  },
  {
    label: 'Contains number',
    test: (password: string) => /\d/.test(password)
  },
  {
    label: 'Contains special character',
    test: (password: string) => /[!@#$%^&*]/.test(password)
  }
];

export function PasswordStrength({ password }: PasswordStrengthProps) {
  return (
    <div className="mt-2 space-y-2">
      {requirements.map((req, index) => {
        const isMet = req.test(password);
        return (
          <div key={index} className="flex items-center text-sm">
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