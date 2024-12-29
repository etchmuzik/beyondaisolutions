import { Button } from '../../ui/Button';
import { ThemeToggle } from './components/ThemeToggle';
import { LanguageToggle } from './components/LanguageToggle';

export function Actions() {
  return (
    <div className="flex items-center gap-4">
      <LanguageToggle />
      <ThemeToggle />
      
      <div className="flex items-center gap-3">
        <Button variant="outline" to="/login" size="sm">
          Sign In
        </Button>
        <Button variant="primary" to="/signup" size="sm">
          Get Started
        </Button>
      </div>
    </div>
  );
}