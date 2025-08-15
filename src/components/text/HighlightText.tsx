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

interface HighlightTextProps {
  text: string;
  className?: string;
  duration?: number;
  stagger?: number;
  start?: string;
  end?: string;
  variant?: 'scrub' | 'trigger' | 'words-scrub' | 'words-trigger';
  ariaLabel?: string;
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

const OPACITY_FROM = 0.25;
const OPACITY_TO = 1;

const HighlightText = ({
  text,
  className = '',
  duration = 1,
  start = 'top 80%',
  end = 'top 20%',
  variant = 'scrub',
  ariaLabel
}: HighlightTextProps) => {
  const textRef = useRef<HTMLDivElement>(null);
  const splitRef = useRef<SplitText | null>(null);

  useEffect(() => {
    if (!textRef.current) return;

    const ctx = gsap.context(() => {
      splitRef.current = new SplitText(textRef.current!, { 
        type: 'words,chars',
        wordsClass: 'highlight-word',
        charsClass: 'highlight-char'
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
          opacity: OPACITY_FROM,
        },
        {
          opacity: OPACITY_TO,
          duration: animationDuration,
          stagger: config.stagger,
          ease: 'power2.inOut',
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
  }, [text, duration, start, end, variant]);

  return (
    <div 
      ref={textRef}
      className={`highlight-text ${className}`}
      aria-label={ariaLabel || text}
    >
      {text}
    </div>
  );
};

HighlightText.displayName = 'HighlightText';

export default memo(HighlightText);