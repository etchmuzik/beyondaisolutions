import { useState } from 'react';
import { useAuth } from '../../../contexts/AuthContext';
import { validateEmail, validatePassword } from '../../../utils/auth/validation';

interface AuthFormState {
  email: string;
  password: string;
  loading: boolean;
  error: string | null;
}

export function useAuthForm(mode: 'login' | 'signup') {
  const { signIn, signUp } = useAuth();
  const [formState, setFormState] = useState<AuthFormState>({
    email: '',
    password: '',
    loading: false,
    error: null
  });

  const updateField = (field: keyof AuthFormState, value: string) => {
    setFormState(prev => ({ ...prev, [field]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validateEmail(formState.email)) {
      setFormState(prev => ({ ...prev, error: 'Please enter a valid email' }));
      return;
    }

    const { isValid, errors } = validatePassword(formState.password);
    if (!isValid) {
      setFormState(prev => ({ ...prev, error: errors[0] }));
      return;
    }

    try {
      setFormState(prev => ({ ...prev, loading: true, error: null }));
      
      if (mode === 'login') {
        await signIn(formState.email, formState.password);
      } else {
        await signUp(formState.email, formState.password, formState.email.split('@')[0]);
      }
    } catch (err) {
      setFormState(prev => ({
        ...prev,
        error: err instanceof Error ? err.message : 'An error occurred'
      }));
    } finally {
      setFormState(prev => ({ ...prev, loading: false }));
    }
  };

  return {
    formState,
    updateField,
    handleSubmit
  };
}