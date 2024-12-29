import { GoogleButton } from '../social/GoogleButton';
import { Divider } from '../social/Divider';

// ... existing imports and code ...

export function SignUpForm() {
  // ... existing code ...

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      {/* Existing form fields */}
      
      <Button
        type="submit"
        variant="primary"
        className="w-full"
        loading={loading}
      >
        Create Account
      </Button>

      <Divider />
      
      <GoogleButton mode="signup" />

      <p className="text-center text-sm text-foreground/70">
        Already have an account?{' '}
        <Link to="/login" className="text-primary hover:text-primary/90">
          Sign in
        </Link>
      </p>
    </form>
  );
}