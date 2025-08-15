'use client';

import React, { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import AuroraBackground from "@/components/background/auroraBackground/AuroraBackground";

gsap.registerPlugin(ScrollTrigger);

export interface YearTimelineItem {
  year: string;
  title: string;
  description: string;
}

interface YearTimelineProps {
  items: YearTimelineItem[];
  className?: string;
}

const YearTimeline = ({ items, className = '' }: YearTimelineProps) => {
  const processLineRef = useRef<HTMLDivElement>(null);
  const timelineItemsRef = useRef<(HTMLLIElement | null)[]>([]);

  useEffect(() => {
    if (!processLineRef.current || !items?.length) return;

    const ctx = gsap.context(() => {
      gsap.fromTo(
        processLineRef.current,
        { yPercent: -100 },
        {
          yPercent: 0,
          ease: "none",
          scrollTrigger: {
            trigger: "#timeline-center-line",
            start: "top center",
            end: "bottom center",
            scrub: true
          }
        }
      );

      if (timelineItemsRef.current[0]) {
        gsap.set(timelineItemsRef.current[0], { opacity: 1 });
      }
      
      timelineItemsRef.current.slice(1).forEach(item => {
        if (item) gsap.set(item, { opacity: 0.25 });
      });

      timelineItemsRef.current.forEach((item) => {
        if (!item) return;
        ScrollTrigger.create({
          trigger: item,
          start: "center center",
          end: "center center",
          onEnter: () => {
            gsap.to(timelineItemsRef.current.filter(Boolean), { opacity: 0.25, duration: 0.3 });
            gsap.to(item, { opacity: 1, duration: 0.3 });
          },
          onEnterBack: () => {
            gsap.to(timelineItemsRef.current.filter(Boolean), { opacity: 0.25, duration: 0.3 });
            gsap.to(item, { opacity: 1, duration: 0.3 });
          }
        });
      });
    });

    return () => {
      ctx.revert();
      ScrollTrigger.getAll().forEach(trigger => trigger.kill());
    };
  }, [items]);

  const addToRefs = (el: HTMLLIElement | null) => {
    if (el && !timelineItemsRef.current.includes(el)) {
      timelineItemsRef.current.push(el);
    }
  };

  if (!items || items.length === 0) {
    return null;
  }

  return (
    <section 
      className={`h-fit overflow-visible px-[var(--width-10)] ${className}`}
      aria-label="Timeline"
    >
      <div className="relative overflow-hidden w-full h-fit rounded bg-blue flex flex-col gap-[var(--width-10)] md:gap-10 p-[calc(var(--width-10)/2)] pl-[var(--width-10)] md:pl-[calc(var(--width-10)/2)]">
        <AuroraBackground />
        <div 
          id="timeline-center-line"
          className="absolute z-10 overflow-hidden top-[calc(var(--width-10)/2)] left-[calc(var(--width-10)/2)] md:left-1/2 -translate-x-1/2 w-px h-[calc(100%-var(--width-10))] bg-white/10"
          aria-hidden="true"
        >
          <div className="w-full h-full bg-white" ref={processLineRef} />
        </div>
        <ol className="list-none m-0 p-0" role="list">
          {items.map((item, index) => (
            <li 
              className="relative z-10 flex flex-col md:flex-row justify-between items-start md:items-center mb-[var(--width-10)] md:mb-10 last:mb-0" 
              ref={addToRefs} 
              key={`timeline-item-${index}`}
              role="listitem"
              aria-label={`${item.year}: ${item.title}`}
            >
              <time 
                dateTime={item.year}
                className="text-8xl leading-[100%] text-white mb-3 md:mb-0 block"
              >
                {item.year}
              </time>
              <article className="w-full md:w-1/2 md:pl-[calc(var(--width-10)/2)] flex flex-col gap-1 md:gap-3">
                <div className="flex items-center gap-3">
                  <div className="h-3 aspect-square rounded-full" aria-hidden="true">
                    <div 
                      className="h-3 aspect-square rounded-full bg-white animate-pulse-scale"
                    />
                  </div>
                  <h2 className="text-xl text-white font-semibold leading-[120%]">{item.title}</h2>
                </div>
                <p className="text-sm md:text-base text-white max-w-full md:max-w-[85%] leading-[120%]">{item.description}</p>
              </article>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
};

YearTimeline.displayName = 'YearTimeline';

export default React.memo(YearTimeline);