interface SocialLoginProps {
  className?: string;
}

export function SocialLogin({ className = '' }: SocialLoginProps) {
  return (
    <div className={className}>
      <div className="relative mb-6">
        <div className="absolute inset-0 flex items-center">
          <div className="w-full border-t border-border" />
        </div>
        <div className="relative flex justify-center text-sm">
          <span className="px-2 bg-background text-foreground/70">
            or continue with
          </span>
        </div>
      </div>

      <div className="grid grid-cols-3 gap-3">
        <button
          type="button"
          className="flex justify-center items-center px-4 py-2 border border-border rounded-lg hover:bg-card transition-colors"
        >
          <img src="/google.svg" alt="Google" className="h-5 w-5" />
        </button>
        <button
          type="button"
          className="flex justify-center items-center px-4 py-2 border border-border rounded-lg hover:bg-card transition-colors"
        >
          <img src="/github.svg" alt="GitHub" className="h-5 w-5" />
        </button>
        <button
          type="button"
          className="flex justify-center items-center px-4 py-2 border border-border rounded-lg hover:bg-card transition-colors"
        >
          <img src="/linkedin.svg" alt="LinkedIn" className="h-5 w-5" />
        </button>
      </div>
    </div>
  );
}