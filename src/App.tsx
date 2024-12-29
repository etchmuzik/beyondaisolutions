import { BrowserRouter as Router } from 'react-router-dom';
import { ThemeProvider } from './contexts/ThemeContext';
import { AuthProvider } from './contexts/AuthContext';
import { AuthProviders } from './components/auth/providers/AuthProviders';
import { AppRoutes } from './routes';

export function App() {
  return (
    <ThemeProvider>
      <Router>
        <AuthProvider>
          <AuthProviders />
          <AppRoutes />
        </AuthProvider>
      </Router>
    </ThemeProvider>
  );
}