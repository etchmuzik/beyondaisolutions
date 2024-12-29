export interface HeroSlide {
  title: string;
  subtitle: string;
  image: string;
}

export interface SlideProps extends HeroSlide {
  isActive: boolean;
}

export interface SlideControlsProps {
  currentSlide: number;
  totalSlides: number;
  onPrevious: () => void;
  onNext: () => void;
  onSelect: (index: number) => void;
}