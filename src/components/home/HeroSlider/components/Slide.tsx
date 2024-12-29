import { Button } from '../../../ui/Button';
import { CALL_TO_ACTION_BUTTONS } from '../../../layout/Navigation/constants';
import type { SlideProps } from '../types';

export function Slide({ title, subtitle, image, isActive }: SlideProps) {
  const { primary: getStartedButton, secondary: demoButton } = CALL_TO_ACTION_BUTTONS;

  return (
    <div 
      className={`absolute inset-0 transition-opacity duration-500 ${
        isActive ? 'opacity-100' : 'opacity-0'
      }`}
    >
      <div className="absolute inset-0">
        <img
          src={image}
          alt={title}
          className="w-full h-full object-cover brightness-[0.2] grayscale"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-background/80 via-background/60 to-background/80" />
      </div>

      <div className="relative h-full flex items-center justify-center text-center px-4">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-4xl md:text-6xl font-bold text-foreground mb-6">
            {title}
          </h1>
          <p className="text-xl md:text-2xl text-foreground/70 mb-10">
            {subtitle}
          </p>
          <div className="flex flex-col sm:flex-row justify-center gap-4">
            <Button 
              to="/register"
              variant="primary"
              className="group"
            >
              {getStartedButton.label}
            </Button>
            <Button 
              to={demoButton.href}
              variant="outline"
            >
              {demoButton.label}
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}