import { LoginForm } from '../../components/auth/LoginForm';
import { AuthLayout } from '../../components/auth/AuthLayout';
import { AuthHeader } from '../../components/auth/AuthHeader';

export function LoginPage() {
  return (
    <AuthLayout>
      <AuthHeader
        title="Welcome back"
        subtitle="Sign in to your account to continue"
      />
      <LoginForm />
    </AuthLayout>
  );
}