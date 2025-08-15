'use client';

import React, { useRef, useEffect, memo } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { SplitText } from 'gsap/SplitText';

gsap.registerPlugin(ScrollTrigger, SplitText);

interface ScrollTriggerConfig {
  trigger: HTMLElement;
  start: string;
  end: string;
  markers: boolean;
  scrub?: boolean;
  toggleActions?: string;
}

interface SlideTextProps {
  text: string;
  className?: string;
  duration?: number;
  stagger?: number;
  start?: string;
  end?: string;
  variant?: 'scrub' | 'trigger' | 'words-scrub' | 'words-trigger';
}

const ANIMATION_CONFIG = {
  scrub: {
    stagger: 0.02,
    useDuration: true
  },
  trigger: {
    stagger: 0.0075,
    useDuration: false,
    duration: 0.6
  },
  'words-scrub': {
    stagger: 0.05,
    useDuration: true
  },
  'words-trigger': {
    stagger: 0.03,
    useDuration: false,
    duration: 0.6
  }
} as const;

const Y_PERCENT_FROM = 50;
const Y_PERCENT_TO = 0;

const SlideText = ({
  text,
  className = '',
  duration = 1,
  stagger,
  start = 'top 80%',
  end = 'top 20%',
  variant = 'scrub'
}: SlideTextProps) => {
  const textRef = useRef<HTMLDivElement>(null);
  const splitRef = useRef<SplitText | null>(null);

  useEffect(() => {
    if (!textRef.current) return;

    const ctx = gsap.context(() => {
      splitRef.current = new SplitText(textRef.current!, {
        type: 'lines,words,chars',
        linesClass: 'slide-line',
        wordsClass: 'slide-word',
        charsClass: 'slide-char'
      });

      const lines = splitRef.current.lines;
      gsap.set(lines, {
        overflow: 'hidden'
      });

      const words = splitRef.current.words;
      gsap.set(words, {
        display: 'inline-block',
        whiteSpace: 'nowrap'
      });

      const isWords = variant === 'words-scrub' || variant === 'words-trigger';
      const isScrub = variant === 'scrub' || variant === 'words-scrub';

      const animateTarget = isWords ? splitRef.current.words : splitRef.current.chars;
      const config = ANIMATION_CONFIG[variant];
      const animationDuration = config.useDuration ? duration : config.duration!;
      const animationStagger = stagger ?? config.stagger;

      const scrollTriggerConfig: ScrollTriggerConfig = {
        trigger: textRef.current!,
        start: start,
        end: end,
        markers: false
      };

      if (isScrub) {
        scrollTriggerConfig.scrub = true;
      } else {
        scrollTriggerConfig.toggleActions = 'play none none none';
      }

      gsap.fromTo(animateTarget,
        {
          opacity: 0,
          yPercent: Y_PERCENT_FROM
        },
        {
          opacity: 1,
          yPercent: Y_PERCENT_TO,
          duration: animationDuration,
          stagger: animationStagger,
          ease: 'power1',
          force3D: true,
          scrollTrigger: scrollTriggerConfig
        }
      );
    }, textRef);

    return () => {
      ctx.revert();
      if (splitRef.current) {
        splitRef.current.revert();
      }
    };
  }, [text, duration, stagger, start, end, variant]);

  return (
    <div
      ref={textRef}
      className={`slide-text ${className}`}
      aria-label={text}
    >
      {text}
    </div>
  );
};

SlideText.displayName = 'SlideText';

export default memo(SlideText);