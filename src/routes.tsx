import { Routes, Route } from 'react-router-dom';
import { AuthGuard } from './components/auth/AuthGuard';
import { Home } from './pages/Home';
import { Features } from './pages/Features';
import { Solutions } from './pages/Solutions';
import { Pricing } from './pages/Pricing';
import { Contact } from './pages/Contact';
import { Demo } from './pages/Demo';
import { Trial } from './pages/Trial';
import { LoginPage } from './pages/auth/LoginPage';
import { RegisterPage } from './pages/auth/RegisterPage';
import { PasswordReset } from './pages/auth/PasswordReset';
import { VerifyEmail } from './pages/auth/VerifyEmail';
import { Dashboard } from './pages/Dashboard';
import { Analytics } from './pages/dashboard/Analytics';
import { Calls } from './pages/dashboard/Calls';
import { Schedule } from './pages/dashboard/Schedule';
import { Settings } from './pages/dashboard/Settings';
import { NotFound } from './pages/NotFound';

export function AppRoutes() {
  return (
    <Routes>
      {/* Public routes */}
      <Route path="/" element={<Home />} />
      <Route path="/features" element={<Features />} />
      <Route path="/solutions" element={<Solutions />} />
      <Route path="/pricing" element={<Pricing />} />
      <Route path="/contact" element={<Contact />} />
      <Route path="/demo" element={<Demo />} />
      <Route path="/trial" element={<Trial />} />

      {/* Auth routes */}
      <Route path="/login" element={<LoginPage />} />
      <Route path="/register" element={<RegisterPage />} />
      <Route path="/reset-password" element={<PasswordReset />} />
      <Route path="/verify-email" element={<VerifyEmail />} />

      {/* Protected routes */}
      <Route path="/dashboard" element={<AuthGuard><Dashboard /></AuthGuard>} />
      <Route path="/dashboard/analytics" element={<AuthGuard><Analytics /></AuthGuard>} />
      <Route path="/dashboard/calls" element={<AuthGuard><Calls /></AuthGuard>} />
      <Route path="/dashboard/schedule" element={<AuthGuard><Schedule /></AuthGuard>} />
      <Route path="/dashboard/settings" element={<AuthGuard><Settings /></AuthGuard>} />

      {/* 404 page */}
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
}