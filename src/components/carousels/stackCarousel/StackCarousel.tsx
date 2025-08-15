'use client';

import React, { useRef } from 'react';
import Image from 'next/image';
import { useStackCarousel } from './useStackCarousel';
import './StackCarousel.css';

const cardImages = [
  '/images/placeholder1.avif',
  '/images/placeholder2.avif',
  '/images/placeholder3.avif',
  '/images/placeholder4.avif',
  '/images/placeholder5.avif',
  '/images/placeholder6.avif',
  '/images/placeholder7.avif'
];

const StackCarouselComponent = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const listRef = useRef<HTMLDivElement>(null);

  const { dragStatus } = useStackCarousel(containerRef, listRef, cardImages.length);

  return (
    <section
      ref={containerRef}
      className="relative"
      data-flick-drag-status={dragStatus}
      aria-label="Stack carousel"
    >
      <div className="opacity-0 pointer-events-none relative h-90 lg:h-130 w-90 lg:w-50" />
      <div className="w-full h-full absolute top-0 left-0">
        <div ref={listRef} className="flex justify-center items-center w-full h-full relative">
          {cardImages.map((image, index) => (
            <div
              key={index}
              data-flick-cards-item=""
              data-flick-cards-item-status=""
              className="absolute"
            >
              <div className="select-none bg-black rounded flex justify-center items-center relative overflow-hidden flick-card h-90 lg:h-130 w-60 lg:w-25">
                <div className="flex justify-center items-center w-full h-full absolute top-0 left-0 flick-card__media">
                  <Image
                    width={400}
                    height={600}
                    alt={`Card ${index + 1}`}
                    src={image}
                    className="w-full h-full pointer-events-none object-cover"
                    priority={index < 3}
                    loading={index < 3 ? 'eager' : 'lazy'}
                  />
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export const StackCarousel = React.memo(StackCarouselComponent);