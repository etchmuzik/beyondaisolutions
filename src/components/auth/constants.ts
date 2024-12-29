export const PASSWORD_REQUIREMENTS = [
  {
    label: 'At least 8 characters',
    test: (password: string) => password.length >= 8,
  },
  {
    label: 'Contains a number',
    test: (password: string) => /\d/.test(password),
  },
  {
    label: 'Contains a special character',
    test: (password: string) => /[!@#$%^&*(),.?":{}|<>]/.test(password),
  },
  {
    label: 'Contains uppercase & lowercase letters',
    test: (password: string) => /[a-z]/.test(password) && /[A-Z]/.test(password),
  },
] as const;

export const SOCIAL_PROVIDERS = [
  { name: 'Google', icon: '/google.svg' },
  { name: 'GitHub', icon: '/github.svg' },
  { name: 'LinkedIn', icon: '/linkedin.svg' },
] as const;