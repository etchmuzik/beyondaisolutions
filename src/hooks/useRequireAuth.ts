import { useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';

export function useRequireAuth(redirectTo = '/login') {
  const { user, loading } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    if (!loading && !user) {
      navigate(redirectTo, {
        state: { from: location.pathname },
        replace: true
      });
    }
  }, [user, loading, navigate, redirectTo, location]);

  return { user, loading };
}