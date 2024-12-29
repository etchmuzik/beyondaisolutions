import { ReactNode } from 'react';

interface FooterDividerProps {
  children: ReactNode;
}

export function FooterDivider({ children }: FooterDividerProps) {
  return (
    <div className="py-6 border-t border-border">
      <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
        {children}
      </div>
    </div>
  );
}