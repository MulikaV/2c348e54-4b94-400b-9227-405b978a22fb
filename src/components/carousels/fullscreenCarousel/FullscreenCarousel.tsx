'use client';

import React, { useCallback } from 'react';
import Image from 'next/image';
import { useFullscreenCarousel } from './useFullscreenCarousel';

const slides = [
  '/images/placeholderwide1.jpg',
  '/images/placeholderwide2.jpg',
  '/images/placeholderwide3.jpg',
  '/images/placeholderwide4.jpg'
];

const FullscreenCarouselComponent = () => {
  
  const { 
    currentSlide, 
    progressRefs, 
    goToSlide
  } = useFullscreenCarousel({ 
    totalSlides: slides.length 
  });
  
  const setProgressRef = useCallback((el: HTMLDivElement | null, index: number) => {
    progressRefs.current[index] = el;
  }, [progressRefs]);

  return (
    <section 
      className="relative h-screen w-full overflow-hidden"
      aria-label="Fullscreen image carousel">
      <div 
        className="relative w-full h-full"
      >
        {slides.map((image, index) => (
          <div
            key={index}
            className={`absolute inset-0 transition-opacity duration-600 ${
              currentSlide === index ? 'opacity-100' : 'opacity-0'
            }`}
            aria-hidden={currentSlide !== index}
          >
            <Image 
              src={image} 
              alt={`Slide ${index + 1}`} 
              fill
              className="object-cover"
              priority={index === 0}
              loading={index === 0 ? 'eager' : 'lazy'}
            />
          </div>
        ))}
      </div>

      <div className="absolute bottom-0 left-0 p-12 w-full flex gap-3">
        {slides.map((_, index) => (
          <button
            key={index}
            className="relative cursor-pointer h-1 w-full rounded-full overflow-hidden bg-white/10 backdrop-blur-sm"
            onClick={() => goToSlide(index)}
            aria-label={`Go to slide ${index + 1}`}
            aria-current={currentSlide === index ? 'true' : 'false'}
          >
            <div
              ref={el => setProgressRef(el, index)}
              className="absolute inset-0 bg-white rounded-full"
              style={{ transform: 'translateX(-100%)' }}
            />
          </button>
        ))}
      </div>
    </section>
  );
};

export const FullscreenCarousel = React.memo(FullscreenCarouselComponent);