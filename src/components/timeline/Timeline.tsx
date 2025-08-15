'use client';

import React, { useCallback } from 'react';
import Image from 'next/image';

interface TimelineItem {
  title: string;
  description: string;
  video?: string;
  image?: string;
}

interface TimelineProps {
  items: TimelineItem[];
  title?: string;
  className?: string;
}

const Timeline = ({
  items,
  title = 'Timeline',
  className = ''
}: TimelineProps) => {
  const getItemClasses = useCallback((index: number) => {
    const baseClasses = `relative overflow-hidden w-60 md:w-22_5 h-fit p-3 flex flex-col gap-3 rounded bg-white/20 shadow backdrop-blur-sm`;
    const alignmentClass = index % 2 === 0 ? 'self-end mr-0' : 'self-start ml-0';
    const marginClasses = [
      index % 4 === 0 ? 'md:mr-10' : '',
      index % 4 === 1 ? 'md:ml-20' : '',
      index % 4 === 2 ? 'md:mr-15' : '',
      index % 4 === 3 ? 'md:ml-0' : ''
    ].filter(Boolean).join(' ');
    
    return `${baseClasses} ${alignmentClass} ${marginClasses}`;
  }, []);
  return (
    <section className={`relative overflow-visible h-fit px-[var(--width-10)] ${className}`}>
      <div className="relative z-10 w-full flex flex-col gap-[var(--width-30)] md:gap-30">
        {items.map((item, index) => (
          <div
            key={index}
            className={getItemClasses(index)}
          >
            <div className="relative overflow-hidden w-full h-auto rounded flex items-center justify-center bg-white">
              {item.video ? (
                <video
                  src={item.video}
                  className="w-full h-auto"
                  autoPlay
                  muted
                  playsInline
                  loop
                />
              ) : item.image ? (
                <Image
                  src={item.image}
                  alt={item.title}
                  width={500}
                  height={300}
                  className="w-full h-auto"
                />
              ) : (
                <div className="w-full h-48 rounded" />
              )}
            </div>
            <div className="flex flex-col gap-1 px-3 mb-3">
              <h2 className="text-xl font-semibold leading-[110%]">{item.title}</h2>
              <h3 className="text-sm leading-[110%]">{item.description}</h3>
            </div>
          </div>
        ))}
      </div>
      <div className="absolute z-0 top-0 left-0 w-full h-full overflow-visible">
        <div className="sticky top-0 left-0 w-full h-screen flex items-center justify-center text-center">
          <h1 className="text-6xl font-bold">{title}</h1>
        </div>
      </div>
    </section>
  );
};

Timeline.displayName = 'Timeline';

export default React.memo(Timeline);