import { Github, Twitter } from 'lucide-react';
import { Button } from '../../ui/cta/Button';

export function SocialSignUp() {
  return (
    <div className="space-y-4">
      <div className="relative">
        <div className="absolute inset-0 flex items-center">
          <div className="w-full border-t border-border" />
        </div>
        <div className="relative flex justify-center text-sm">
          <span className="px-2 bg-background text-foreground/70">
            Or continue with
          </span>
        </div>
      </div>

      <div className="grid grid-cols-2 gap-4">
        <Button
          variant="outline"
          fullWidth
          icon={<Github className="h-5 w-5" />}
        >
          GitHub
        </Button>
        <Button
          variant="outline"
          fullWidth
          icon={<Twitter className="h-5 w-5" />}
        >
          Twitter
        </Button>
      </div>
    </div>
  );
}