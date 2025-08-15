import { useState, useEffect, useRef, useCallback } from 'react';
import type { TimelineItem } from '@/types/timeline';

const ANIMATION_CONFIG = {
  PROGRESS_DURATION: 5000,
  IMAGE_TRANSITION_DELAY: 300,
  TRANSITION_CLEANUP_DELAY: 500,
  PROGRESS_TRANSITION_DURATION: 300,
  MIN_ITEMS: 2,
  MAX_ITEMS: 4,
  ANIMATION_START_DELAY: 10,
} as const;

interface UseHorizontalTimelineProps {
  items: TimelineItem[];
}

export const useHorizontalTimeline = ({ items }: UseHorizontalTimelineProps) => {
  const [isMobile, setIsMobile] = useState(() => {
    if (typeof window !== 'undefined') {
      return window.innerWidth < 768;
    }
    return false;
  });
  const [activeIndex, setActiveIndex] = useState(0);
  const [imageOpacity, setImageOpacity] = useState(0);
  const [currentImageSrc, setCurrentImageSrc] = useState('');
  const progressRefs = useRef<(HTMLDivElement | null)[]>([]);
  const animationFrameRef = useRef<ReturnType<typeof requestAnimationFrame> | null>(null);
  const imageTransitionTimeoutRef = useRef<NodeJS.Timeout | null>(null);
  const isMountedRef = useRef(true);

  const resetAllProgressBars = useCallback(() => {
    if (animationFrameRef.current) {
      cancelAnimationFrame(animationFrameRef.current);
    }
    
    progressRefs.current.forEach(bar => {
      if (bar) {
        bar.style.transition = 'transform 0.5s ease-in-out';
        bar.style.transform = 'scaleX(0)';
        
        setTimeout(() => {
          if (bar) {
            bar.style.transition = 'none';
          }
        }, ANIMATION_CONFIG.TRANSITION_CLEANUP_DELAY);
      }
    });
  }, []);

  const animateProgress = useCallback((index: number) => {
    if (!progressRefs.current[index]) return;
    
    if (animationFrameRef.current) {
      cancelAnimationFrame(animationFrameRef.current);
    }
    
    const progressBar = progressRefs.current[index];
    progressBar.style.transition = 'none';
    progressBar.style.transform = 'scaleX(0)';
    
    const easeInOut = (t: number): number => {
      return -(Math.cos(Math.PI * t) - 1) / 2;
    };
    
    setTimeout(() => {
      let startTime: number | null = null;
      
      const animate = (timestamp: number) => {
        if (!startTime) startTime = timestamp;
        const elapsed = timestamp - startTime;
        const linearProgress = Math.min(elapsed / ANIMATION_CONFIG.PROGRESS_DURATION, 1);
        const easedProgress = easeInOut(linearProgress);
        
        if (progressRefs.current[index]) {
          progressRefs.current[index].style.transform = `scaleX(${easedProgress})`;
        }
        
        if (linearProgress < 1) {
          animationFrameRef.current = requestAnimationFrame(animate);
        } else {
          setActiveIndex((prevIndex) => {
            const nextIndex = prevIndex + 1;
            if (nextIndex >= items.length) {
              resetAllProgressBars();
              return 0;
            }
            return nextIndex;
          });
        }
      };
      
      animationFrameRef.current = requestAnimationFrame(animate);
    }, ANIMATION_CONFIG.ANIMATION_START_DELAY);
  }, [items, resetAllProgressBars]);

  useEffect(() => {
    for (let i = 0; i < activeIndex; i++) {
      const bar = progressRefs.current[i];
      if (bar) {
        bar.style.transform = 'scaleX(1)';
      }
    }
    
    animateProgress(activeIndex);
    
    return () => {
      if (animationFrameRef.current) {
        cancelAnimationFrame(animationFrameRef.current);
      }
    };
  }, [activeIndex, animateProgress]);

  useEffect(() => {
    let resizeTimeout: NodeJS.Timeout;
    
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };
    
    const throttledCheckMobile = () => {
      clearTimeout(resizeTimeout);
      resizeTimeout = setTimeout(checkMobile, 150);
    };
    
    checkMobile();
    window.addEventListener('resize', throttledCheckMobile);
    
    return () => {
      window.removeEventListener('resize', throttledCheckMobile);
      clearTimeout(resizeTimeout);
      isMountedRef.current = false;
    };
  }, []);

  useEffect(() => {
    const currentItem = items[activeIndex];
    if (!currentItem) return;
    
    const newImageSrc = (isMobile && currentItem.mobileImage) ? currentItem.mobileImage : currentItem.image || '';
    
    if (!currentImageSrc && newImageSrc) {
      setCurrentImageSrc(newImageSrc);
      setImageOpacity(0);
    } else if (newImageSrc && newImageSrc !== currentImageSrc) {
      if (imageTransitionTimeoutRef.current) {
        clearTimeout(imageTransitionTimeoutRef.current);
      }
      
      setImageOpacity(0);
      
      imageTransitionTimeoutRef.current = setTimeout(() => {
        if (isMountedRef.current) {
          setCurrentImageSrc(newImageSrc);
        }
      }, ANIMATION_CONFIG.IMAGE_TRANSITION_DELAY);
    }
    
    return () => {
      if (imageTransitionTimeoutRef.current) {
        clearTimeout(imageTransitionTimeoutRef.current);
      }
    };
  }, [activeIndex, isMobile, items, currentImageSrc]);

  const getItemOpacity = useCallback((index: number) => {
    return index <= activeIndex ? '' : 'opacity-50';
  }, [activeIndex]);

  const handleItemClick = (index: number) => {
    if (index === activeIndex) return;
    
    if (animationFrameRef.current) {
      cancelAnimationFrame(animationFrameRef.current);
    }
    
    for (let i = 0; i < index; i++) {
      const bar = progressRefs.current[i];
      if (bar) {
        bar.style.transition = `transform ${ANIMATION_CONFIG.PROGRESS_TRANSITION_DURATION}ms ease-in-out`;
        bar.style.transform = 'scaleX(1)';
      }
    }
    
    for (let i = index; i < progressRefs.current.length; i++) {
      const bar = progressRefs.current[i];
      if (bar) {
        bar.style.transition = `transform ${ANIMATION_CONFIG.PROGRESS_TRANSITION_DURATION}ms ease-in-out`;
        bar.style.transform = 'scaleX(0)';
      }
    }
    
    setActiveIndex(index);
  };

  const handleImageLoad = () => {
    setImageOpacity(1);
  };

  return {
    activeIndex,
    imageOpacity,
    currentImageSrc,
    progressRefs,
    items,
    getItemOpacity,
    handleItemClick,
    handleImageLoad,
  };
};