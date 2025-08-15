'use client';

import Image from 'next/image';
import React, { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import type { StackTimelineItem } from '@/types/timeline';

gsap.registerPlugin(ScrollTrigger);

const ANIMATION_CONFIG = {
  OPACITY_ACTIVE: 1,
  OPACITY_INACTIVE: 0,
} as const;

interface StackTimelineProps {
  items: StackTimelineItem[];
  className?: string;
}

const StackTimeline = ({ items, className = '' }: StackTimelineProps) => {
  const itemRefs = useRef<(HTMLDivElement | null)[]>([]);

  useEffect(() => {
    const ctx = gsap.context(() => {
      itemRefs.current.forEach((ref, position) => {
        if (!ref) return;

        const isLast = position === itemRefs.current.length - 1;

        const timeline = gsap.timeline({
          scrollTrigger: {
            trigger: ref,
            start: 'center center',
            end: '+=100%',
            scrub: true,
          },
        });

        timeline
          .set(ref, { willChange: "opacity" })
          .to(ref, {
            ease: 'none',
            opacity: isLast ? ANIMATION_CONFIG.OPACITY_ACTIVE : ANIMATION_CONFIG.OPACITY_INACTIVE,
          });
      });
    });

    return () => {
      ctx.revert();
    };
  }, [items]);

  if (!items || items.length === 0) {
    return null;
  }

  return (
    <div className={`relative overflow-visible h-fit p-[var(--width-10)] ${className}`}>
      <div className="w-full flex flex-col gap-[var(--width-25)] md:gap-[6.25vh]">
        {items.map((item, index) => (
          <div
            key={item.id}
            ref={el => { itemRefs.current[index] = el; }}
            className="sticky top-[20vw] md:top-[12.5vh] w-full h-[150vw] md:h-[75vh] bg-white shadow rounded p-[calc(var(--width-10)/2)] flex flex-col md:flex-row justify-between items-center gap-[calc(var(--width-10)/2)]"
          >
            <div className="w-full md:w-1/2 2xl:max-w-[40%] h-fit md:h-full flex flex-col justify-center">
              <div className="w-fit flex flex-col gap-3 md:gap-6">
                <div className="h-8 w-[var(--height-8)] rounded-full bg-black flex items-center justify-center">
                  <p className="text-sm text-white">{item.id}</p>
                </div>
                <h2 className="text-4xl md:text-5xl font-semibold leading-[100%]">
                  {item.title}
                </h2>
                <p className="text-base leading-[110%]">{item.description}</p>
              </div>
            </div>
            <div className="w-full md:w-1/2 h-full overflow-hidden rounded">
              <Image
                src={item.image}
                height={1000}
                width={1000}
                alt={item.title}
                className="w-full h-full object-cover"
                priority={index === 0}
              />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

StackTimeline.displayName = 'StackTimeline';

export default React.memo(StackTimeline);