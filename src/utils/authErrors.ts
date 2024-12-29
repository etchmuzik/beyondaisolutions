export function getAuthErrorMessage(error: Error): string {
  const message = error.message.toLowerCase();
  
  if (message.includes('invalid_credentials')) {
    return 'Invalid email or password';
  }
  
  if (message.includes('email_taken')) {
    return 'This email is already registered';
  }
  
  if (message.includes('username_taken')) {
    return 'This username is already taken';
  }
  
  if (message.includes('too_many_attempts')) {
    return 'Too many login attempts. Please try again later.';
  }
  
  return 'An unexpected error occurred. Please try again.';
}

export function validatePassword(password: string): {
  isValid: boolean;
  errors: string[];
} {
  const errors: string[] = [];
  
  if (password.length < 8) {
    errors.push('Password must be at least 8 characters long');
  }
  
  if (!/[A-Z]/.test(password)) {
    errors.push('Password must contain at least one uppercase letter');
  }
  
  if (!/[a-z]/.test(password)) {
    errors.push('Password must contain at least one lowercase letter');
  }
  
  if (!/[0-9]/.test(password)) {
    errors.push('Password must contain at least one number');
  }
  
  if (!/[!@#$%^&*]/.test(password)) {
    errors.push('Password must contain at least one special character (!@#$%^&*)');
  }
  
  return {
    isValid: errors.length === 0,
    errors
  };
}