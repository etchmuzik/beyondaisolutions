import { GoogleButton } from '../social/GoogleButton';
import { Divider } from '../social/Divider';

// ... existing imports and code ...

export function LoginForm() {
  // ... existing code ...

  return (
    <div className="max-w-sm w-full mx-auto">
      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Existing form fields */}
        
        <Button
          type="submit"
          variant="primary"
          fullWidth
          loading={loading}
        >
          Sign In
        </Button>
      </form>

      <Divider />
      
      <GoogleButton mode="login" />

      <p className="text-center text-sm text-foreground/70 mt-6">
        Don't have an account?{' '}
        <Link to="/register" className="text-primary hover:text-primary/90">
          Create an account
        </Link>
      </p>
    </div>
  );
}