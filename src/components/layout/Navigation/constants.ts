export const MAIN_NAVIGATION = [
  { label: 'Features', href: '/features' },
  { label: 'Solutions', href: '/solutions' },
  { label: 'Pricing', href: '/pricing' },
  { label: 'Blog', href: '/blog' },
  { label: 'Careers', href: '/careers' },
  { label: 'About', href: '/about' },
  { label: 'Contact', href: '/contact' }
] as const;

export const CALL_TO_ACTION_BUTTONS = {
  primary: { label: 'Get Started', href: '/register' },
  secondary: { label: 'Book a Demo', href: '/demo' },
  trial: { label: 'Start Free Trial', href: '/register' }
} as const;