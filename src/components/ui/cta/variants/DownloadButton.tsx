import { Download } from 'lucide-react';
import { CTAButton } from '../CTAButton';
import type { CTAButtonProps } from '../types';

export function DownloadButton({ children = 'Download', ...props }: Partial<CTAButtonProps>) {
  return (
    <CTAButton
      icon={<Download className="h-4 w-4" />}
      {...props}
    >
      {children}
    </CTAButton>
  );
}