'use client';

import React, { useEffect, useRef } from "react";
import Image from "next/image";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import type { ProcessTimelineProps } from "@/types/timeline";

gsap.registerPlugin(ScrollTrigger);

const ProcessTimeline: React.FC<ProcessTimelineProps> = ({ items, className = "" }) => {
  const processLineRef = useRef<HTMLDivElement>(null);
  const itemRefs = useRef<(HTMLLIElement | null)[]>([]);

  useEffect(() => {
    if (!processLineRef.current) return;

    gsap.fromTo(
      processLineRef.current,
      { yPercent: -100 },
      {
        yPercent: 0,
        ease: "none",
        scrollTrigger: {
          trigger: ".timeline-line",
          start: "top center",
          end: "bottom center",
          scrub: true
        }
      }
    );

    itemRefs.current.forEach((item) => {
      if (!item) return;
      
      gsap.to(item, {
        opacity: 1,
        duration: 1,
        ease: "power1",
        scrollTrigger: {
          trigger: item,
          start: "top 80%"
        }
      });
    });

    return () => {
      ScrollTrigger.getAll().forEach(trigger => trigger.kill());
    };
  }, []);

  return (
    <div className={`timeline-line h-fit p-0 ${className}`}>
      <ol className="relative flex flex-col gap-20 px-[var(--width-10)] overflow-hidden">
        <div className="timeline-line pointer-events-none absolute top-0 right-[var(--width-10)] md:right-auto md:left-1/2 md:-translate-x-1/2 w-px h-full bg-white z-0 overflow-hidden">
          <div
            className="w-full h-full bg-black"
            ref={processLineRef}
          />
        </div>

        {items.map((item, index) => (
          <li
            key={item.id}
            ref={el => { itemRefs.current[index] = el; }}
            className={`relative z-10 w-full flex flex-col gap-6 md:gap-0 md:flex-row justify-between opacity-0 ${item.reverse ? 'flex-col md:flex-row-reverse' : ''
              }`}
          >
            <div className="relative overflow-hidden w-70 md:w-30 h-80 rounded-lg">
              <Image
                src={item.image}
                alt={item.title}
                width={1000}
                height={1000}
                className="w-full h-full object-cover"
              />
            </div>
            <div className="absolute top-1/2 right-[calc(var(--height-8)/-2)] md:right-auto md:left-1/2 md:-translate-x-1/2 -translate-y-1/2 h-8 aspect-square rounded-full flex items-center justify-center bg-white shadow text-black z-10">
              <p className="text-sm">{item.id}</p>
            </div>
            <div className="w-70 md:w-30 h-fit flex flex-col justify-center gap-3 md:gap-6">
              <p className="text-xl md:text-2xl font-semibold leading-[100%]">{item.title}</p>
              <p className="text-base text-black leading-[120%]">{item.description}</p>
              <ul className="flex flex-col m-0 mt-1 p-0 list-none gap-3">
                {item.items.map((listItem, listIndex) => {
                  const Icon = listItem.icon;
                  return (
                    <li key={listIndex} className="flex items-center gap-3">
                      <div className="shrink-0 h-8 aspect-square flex items-center justify-center rounded bg-white shadow">
                        <Icon className="h-[45%] w-[45%] text-black" strokeWidth={1.25} />
                      </div>
                      <p className="text-lg">{listItem.text}</p>
                    </li>
                  );
                })}
              </ul>
            </div>
          </li>
        ))}
      </ol>
    </div>
  );
};

ProcessTimeline.displayName = 'ProcessTimeline';

export default React.memo(ProcessTimeline);