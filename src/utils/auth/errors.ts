import { AuthError } from '@supabase/supabase-js';

export function getAuthErrorMessage(error: AuthError | Error): string {
  // Handle Supabase auth errors
  if ('status' in error) {
    switch (error.status) {
      case 400:
        if (error.message.includes('invalid_credentials')) {
          return 'Invalid email or password. Please check your credentials and try again.';
        }
        if (error.message.includes('email_taken')) {
          return 'This email is already registered. Please try signing in instead.';
        }
        return 'Invalid request. Please check your input and try again.';
      case 422:
        return 'Invalid email or password format. Please check your input.';
      case 429:
        return 'Too many attempts. Please wait a moment and try again.';
      default:
        return 'An unexpected error occurred. Please try again later.';
    }
  }

  // Handle other errors
  return error.message || 'An unexpected error occurred. Please try again.';
}