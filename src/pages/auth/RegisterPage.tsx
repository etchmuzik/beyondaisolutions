import { SignUpForm } from '../../components/auth/SignUpForm';
import { AuthLayout } from '../../components/auth/AuthLayout';
import { AuthHeader } from '../../components/auth/AuthHeader';

export function RegisterPage() {
  return (
    <AuthLayout>
      <AuthHeader
        title="Create your account"
        subtitle="Get started with your free account today"
      />
      <SignUpForm />
    </AuthLayout>
  );
}