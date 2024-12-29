import { useState, useCallback } from 'react';
import { Slide } from './components/Slide';
import { SlideControls } from './components/SlideControls';
import { HERO_SLIDES } from './constants';

export function HeroSlider() {
  const [currentSlide, setCurrentSlide] = useState(0);

  const nextSlide = useCallback(() => {
    setCurrentSlide((prev) => (prev + 1) % HERO_SLIDES.length);
  }, []);

  const previousSlide = useCallback(() => {
    setCurrentSlide((prev) => (prev - 1 + HERO_SLIDES.length) % HERO_SLIDES.length);
  }, []);

  return (
    <div className="relative h-screen bg-background">
      {HERO_SLIDES.map((slide, index) => (
        <Slide
          key={slide.title}
          {...slide}
          isActive={index === currentSlide}
        />
      ))}

      <SlideControls
        currentSlide={currentSlide}
        totalSlides={HERO_SLIDES.length}
        onPrevious={previousSlide}
        onNext={nextSlide}
        onSelect={setCurrentSlide}
      />
    </div>
  );
}